/**
 * notify-telegram.mjs
 * discover-results.json 읽어서 Telegram 관리자 DM에 인라인 키보드로 전송
 */

import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

if (!BOT_TOKEN || !CHAT_ID) {
  console.error('✗ TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID are required');
  process.exit(1);
}

const API_BASE = `https://api.telegram.org/bot${BOT_TOKEN}`;

/**
 * Send a Telegram message with optional inline keyboard
 */
async function sendMessage(chatId, text, replyMarkup) {
  const body = {
    chat_id: chatId,
    text,
    parse_mode: 'HTML',
    disable_web_page_preview: true,
  };
  if (replyMarkup) {
    body.reply_markup = JSON.stringify(replyMarkup);
  }

  const res = await fetch(`${API_BASE}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Telegram API error: ${res.status} ${err}`);
  }

  return res.json();
}

/**
 * Build callback_data string, respecting 64 byte limit
 * Format: action:owner/repo:sectionId
 * If too long, use MD5 hash for repo identifier
 */
function buildCallbackData(action, fullName, sectionId) {
  const base = sectionId
    ? `${action}:${fullName}:${sectionId}`
    : `${action}:${fullName}`;

  if (Buffer.byteLength(base, 'utf-8') <= 64) {
    return base;
  }

  // Use short hash for long names
  const hash = createHash('md5').update(fullName).digest('hex').slice(0, 8);
  const short = sectionId
    ? `${action}:${hash}:${sectionId}`
    : `${action}:${hash}`;
  return short;
}

/**
 * Notify about new candidates
 */
async function notifyCandidates(candidates) {
  if (candidates.length === 0) {
    console.log('No new candidates to notify');
    return;
  }

  // Send header
  await sendMessage(CHAT_ID,
    `🔍 <b>신규 후보 ${candidates.length}개 발견</b>\n` +
    `아래 레포를 검토하고 추가/스킵을 선택하세요.`,
  );

  // Send each candidate with inline keyboard
  for (const c of candidates) {
    const lines = [
      `📦 <b><a href="${c.url}">${c.fullName}</a></b>`,
      `⭐ ${c.stars} | 🔤 ${c.language || 'N/A'} | 📅 ${c.lastPush?.slice(0, 10)} | 🎯 ${c.web3Score || 0}점`,
      `📝 ${escapeHtml(c.description || 'No description')}`,
    ];

    // README excerpt (더 자세한 설명)
    if (c.readmeExcerpt) {
      lines.push(`📖 ${escapeHtml(c.readmeExcerpt.slice(0, 200))}`);
    }

    lines.push(
      `🏷️ ${c.topics?.slice(0, 8).join(', ') || 'no topics'}`,
      `🎯 섹션: <b>${c.suggestedSection}</b> | 쿼리: ${c.matchedQueries.length}개`,
    );

    const text = lines.join('\n');

    const keyboard = {
      inline_keyboard: [[
        { text: 'Add ✅', callback_data: buildCallbackData('add', c.fullName, c.suggestedSection) },
        { text: 'Skip ❌', callback_data: buildCallbackData('skip', c.fullName) },
      ]],
    };

    await sendMessage(CHAT_ID, text, keyboard);
    await new Promise(r => setTimeout(r, 300)); // rate limit
  }
}

/**
 * Notify about health issues
 */
async function notifyIssues(issues) {
  if (issues.length === 0) {
    console.log('No health issues to notify');
    return;
  }

  await sendMessage(CHAT_ID,
    `⚠️ <b>건강 이슈 ${issues.length}개 발견</b>\n` +
    `기존 엔트리 중 문제가 있는 레포를 확인하세요.`,
  );

  for (const issue of issues) {
    const emoji = issue.type === 'not_found' ? '🔴' : issue.type === 'archived' ? '📦' : '⏳';
    const text = [
      `${emoji} <b>${issue.fullName}</b>`,
      `유형: ${issue.type} | 섹션: ${issue.sectionId}`,
      `사유: ${issue.reason}`,
    ].join('\n');

    const keyboard = {
      inline_keyboard: [[
        { text: 'Keep 👍', callback_data: buildCallbackData('keep', issue.fullName) },
        { text: 'Remove 🗑', callback_data: buildCallbackData('remove', issue.fullName) },
      ]],
    };

    await sendMessage(CHAT_ID, text, keyboard);
    await new Promise(r => setTimeout(r, 300));
  }
}

/**
 * Send daily summary
 */
async function sendSummary(results) {
  const { stats } = results;
  const text = [
    `📊 <b>일일 요약</b> (${new Date().toISOString().slice(0, 10)})`,
    '',
    `총 엔트리: ${stats.totalExisting}`,
    `신규 후보: ${stats.totalCandidatesFiltered || stats.totalCandidates || 0}개 (상위 ${results.candidates.length}개 표시)`,
    `건강 이슈: ${stats.totalIssues}개`,
    `  - Archived: ${stats.archived}`,
    `  - Stale (6개월+): ${stats.stale}`,
    `  - 404 Not Found: ${stats.notFound}`,
  ].join('\n');

  await sendMessage(CHAT_ID, text);
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

async function main() {
  console.log('=== Sending Telegram notifications ===\n');

  const resultsPath = resolve(ROOT, 'data', 'discover-results.json');
  let results;
  try {
    results = JSON.parse(readFileSync(resultsPath, 'utf-8'));
  } catch {
    console.error('✗ data/discover-results.json not found. Run `npm run discover` first.');
    process.exit(1);
  }

  // Send summary first
  await sendSummary(results);
  console.log('✓ Summary sent');

  // Notify candidates
  await notifyCandidates(results.candidates);
  console.log(`✓ ${results.candidates.length} candidates notified`);

  // Notify issues
  await notifyIssues(results.issues);
  console.log(`✓ ${results.issues.length} issues notified`);

  console.log('\nDone!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
