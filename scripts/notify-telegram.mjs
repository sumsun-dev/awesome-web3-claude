/**
 * notify-telegram.mjs
 * discover-results.json 읽어서 Telegram 관리자 DM에 구조화된 한국어 평가와 함께 전송
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

function buildCallbackData(action, fullName, sectionId) {
  const base = sectionId
    ? `${action}:${fullName}:${sectionId}`
    : `${action}:${fullName}`;

  if (Buffer.byteLength(base, 'utf-8') <= 64) return base;

  const hash = createHash('md5').update(fullName).digest('hex').slice(0, 8);
  return sectionId ? `${action}:${hash}:${sectionId}` : `${action}:${hash}`;
}

function escapeHtml(str) {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// ---------------------------------------------------------------------------
// 추천 등급 → 한국어 라벨 + 이모지
// ---------------------------------------------------------------------------
const REC_LABEL = {
  strong_add: '🟢 강력 추천',
  add: '🔵 추천',
  neutral: '🟡 검토 필요',
  skip: '🔴 스킵 권장',
};

// 섹션 ID → 한국어 섹션명
const SECTION_LABEL = {
  'skills-security': '스킬 — 보안/감사',
  'skills-protocol': '스킬 — 프로토콜별',
  'skills-general': '스킬 — 범용 Web3',
  'mcp-onchain-data': 'MCP — 온체인 데이터',
  'mcp-smart-contract': 'MCP — 스마트 컨트랙트',
  'dev-tools': '개발 도구',
  'ai-agents': 'AI 에이전트',
  'learning': '학습/레퍼런스',
};

// 신뢰도 점수 → 별 표시
function trustStars(score) {
  const full = Math.floor(score);
  const half = score % 1 >= 0.5;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - (half ? 1 : 0));
}

// ---------------------------------------------------------------------------
// 후보 분석 메시지 생성
// ---------------------------------------------------------------------------
function buildCandidateMessage(c) {
  const m = c.meta || {};
  const s = c.readmeSignals || {};
  const compat = c.claudeCompat || [];
  const rec = c.recommendation || 'neutral';
  const trust = c.trustScore ?? 0;

  const lines = [];

  // 헤더: 추천 등급 + 레포명
  lines.push(`${REC_LABEL[rec] || '🟡 검토 필요'}`);
  lines.push(`<b><a href="${c.url}">${c.fullName}</a></b>`);
  lines.push('');

  // 기본 정보
  lines.push(`<b>📊 기본 정보</b>`);
  lines.push(`⭐ ${c.stars} | 🍴 ${m.forks ?? '?'} | 🔤 ${c.language || 'N/A'}`);
  lines.push(`📅 최근 push: ${c.lastPush?.slice(0, 10) || '?'}`);
  lines.push(`👤 ${m.ownerType === 'Organization' ? '조직 계정' : '개인 계정'} | 기여자 ${m.contributors ?? '?'}명`);
  if (m.license) lines.push(`📜 라이선스: ${m.license}`);
  lines.push('');

  // 설명
  lines.push(`<b>📝 설명</b>`);
  lines.push(escapeHtml(c.description || 'No description'));
  if (c.readmeExcerpt) {
    lines.push(`<i>${escapeHtml(c.readmeExcerpt.slice(0, 250))}</i>`);
  }
  lines.push('');

  // Claude Code 호환성
  lines.push(`<b>🔧 Claude Code 호환</b>`);
  lines.push(compat.join(', ') || '미확인');
  const compatDetails = [];
  if (s.hasMcpConfig) compatDetails.push('✅ MCP 설정 감지');
  if (s.hasSkillMd) compatDetails.push('✅ SKILL.md 감지');
  if (s.hasInstallGuide) compatDetails.push('✅ 설치 가이드 있음');
  if (!s.hasMcpConfig && !s.hasSkillMd) compatDetails.push('⚠️ MCP/SKILL.md 미감지');
  if (compatDetails.length > 0) lines.push(compatDetails.join(' | '));
  lines.push('');

  // 신뢰도 평가
  lines.push(`<b>🛡 신뢰도: ${trustStars(trust)} (${trust}/5)</b>`);
  const trustDetails = [];
  if (TRUSTED_ORGS_SET.has(c.owner.toLowerCase())) {
    trustDetails.push('✅ 알려진 조직');
  } else if (m.ownerType === 'Organization') {
    trustDetails.push('✅ 조직 계정');
  } else {
    trustDetails.push('⚠️ 개인 계정');
  }
  if (m.contributors <= 1) trustDetails.push('⚠️ 단독 개발');
  else trustDetails.push(`✅ ${m.contributors}명 기여`);
  if (s.hasTests) trustDetails.push('✅ 테스트');
  else trustDetails.push('⚠️ 테스트 미확인');
  if (m.license) trustDetails.push(`✅ ${m.license}`);
  else trustDetails.push('⚠️ 라이선스 없음');
  lines.push(trustDetails.join(' | '));
  lines.push('');

  // 추천 섹션
  lines.push(`📂 추천 섹션: <b>${SECTION_LABEL[c.suggestedSection] || c.suggestedSection}</b>`);

  return lines.join('\n');
}

// 신뢰 조직 set (notify에서도 사용)
const TRUSTED_ORGS_SET = new Set([
  'trailofbits', 'openzeppelin', 'foundry-rs', 'crytic', 'consensys',
  'uniswap', 'aave', 'chainlink', 'solana-foundation', 'coinbase',
  'alchemyplatform', 'thirdweb-dev', 'cyfrin', 'a16z',
  'moralisweb3', 'bankless', 'getalby', 'debridge-finance',
  'noditlabs', 'heurist-network', 'trustwallet', 'goat-sdk',
  'scaffold-eth', 'elizaos', 'sendaifun',
]);

// ---------------------------------------------------------------------------
// 후보 알림
// ---------------------------------------------------------------------------
async function notifyCandidates(candidates) {
  if (candidates.length === 0) {
    await sendMessage(CHAT_ID, '✅ 신규 Web3 후보 없음 — 모두 최신 상태입니다.');
    console.log('No new candidates to notify');
    return;
  }

  // 추천 등급별 분류
  const strong = candidates.filter(c => c.recommendation === 'strong_add');
  const add = candidates.filter(c => c.recommendation === 'add');
  const neutral = candidates.filter(c => c.recommendation === 'neutral');
  const skip = candidates.filter(c => c.recommendation === 'skip');

  await sendMessage(CHAT_ID,
    `🔍 <b>신규 후보 ${candidates.length}개 분석 완료</b>\n\n` +
    `🟢 강력 추천: ${strong.length}개\n` +
    `🔵 추천: ${add.length}개\n` +
    `🟡 검토 필요: ${neutral.length}개\n` +
    `🔴 스킵 권장: ${skip.length}개\n\n` +
    `각 후보의 상세 분석을 확인하고 버튼으로 결정하세요.`,
  );

  // strong_add + add만 인라인 키보드로 전송
  const actionable = [...strong, ...add];

  for (const c of actionable) {
    const text = buildCandidateMessage(c);

    const keyboard = {
      inline_keyboard: [[
        { text: '✅ 추가', callback_data: buildCallbackData('add', c.fullName, c.suggestedSection) },
        { text: '❌ 스킵', callback_data: buildCallbackData('skip', c.fullName) },
      ]],
    };

    await sendMessage(CHAT_ID, text, keyboard);
    await new Promise(r => setTimeout(r, 300));
  }

  // neutral은 요약만 전송 (버튼 없음)
  if (neutral.length > 0) {
    const neutralList = neutral.map(c =>
      `• <a href="${c.url}">${c.fullName}</a> (⭐${c.stars}) — ${escapeHtml((c.description || '').slice(0, 60))}`
    ).join('\n');
    await sendMessage(CHAT_ID,
      `🟡 <b>검토 필요 ${neutral.length}개</b> (자동 스킵, 관심 시 수동 추가)\n\n${neutralList}`);
  }

  // skip은 자동 스킵 처리 (알림 없음)
  if (skip.length > 0) {
    console.log(`Auto-skipped ${skip.length} repos: ${skip.map(c => c.fullName).join(', ')}`);
  }
}

// ---------------------------------------------------------------------------
// 건강 이슈 알림
// ---------------------------------------------------------------------------
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
      `유형: ${issue.type} | 섹션: ${SECTION_LABEL[issue.sectionId] || issue.sectionId}`,
      `사유: ${issue.reason}`,
    ].join('\n');

    const keyboard = {
      inline_keyboard: [[
        { text: '👍 유지', callback_data: buildCallbackData('keep', issue.fullName) },
        { text: '🗑 삭제', callback_data: buildCallbackData('remove', issue.fullName) },
      ]],
    };

    await sendMessage(CHAT_ID, text, keyboard);
    await new Promise(r => setTimeout(r, 300));
  }
}

// ---------------------------------------------------------------------------
// 일일 요약
// ---------------------------------------------------------------------------
async function sendSummary(results) {
  const { stats } = results;
  const text = [
    `📊 <b>AWC 일일 리포트</b> (${new Date().toISOString().slice(0, 10)})`,
    '',
    `📁 현재 엔트리: ${stats.totalExisting}개`,
    `🔍 Web3 필터 통과: ${stats.totalCandidatesFiltered || 0}개 (상위 ${results.candidates.length}개 분석)`,
    `⚠️ 건강 이슈: ${stats.totalIssues}개 (archived: ${stats.archived}, stale: ${stats.stale}, 404: ${stats.notFound})`,
  ].join('\n');

  await sendMessage(CHAT_ID, text);
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

  await sendSummary(results);
  console.log('✓ Summary sent');

  await notifyCandidates(results.candidates);
  console.log(`✓ ${results.candidates.length} candidates notified`);

  await notifyIssues(results.issues);
  console.log(`✓ ${results.issues.length} issues notified`);

  console.log('\nDone!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
