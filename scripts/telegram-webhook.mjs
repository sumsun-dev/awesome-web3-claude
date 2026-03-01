/**
 * telegram-webhook.mjs
 * Express 서버 (port 3847) — Telegram callback 수신 → GitHub workflow_dispatch 트리거
 * VPS에 배포하여 사용
 */

import express from 'express';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { spawn } from 'node:child_process';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || 'anthropic-ai-study/awesome-web3-claude';
const API_SECRET = process.env.API_SECRET;
const PORT = process.env.PORT || 3847;

if (!BOT_TOKEN || !CHAT_ID || !GITHUB_TOKEN) {
  console.error('✗ Required env vars: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, GITHUB_TOKEN');
  process.exit(1);
}

const API_BASE = `https://api.telegram.org/bot${BOT_TOKEN}`;
const app = express();
app.use(express.json());

/**
 * Answer callback query (remove loading indicator)
 */
async function answerCallback(callbackQueryId, text) {
  await fetch(`${API_BASE}/answerCallbackQuery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      callback_query_id: callbackQueryId,
      text,
      show_alert: false,
    }),
  });
}

/**
 * Edit inline keyboard message to show result (removes buttons to prevent double-click)
 */
async function editMessage(chatId, messageId, text) {
  await fetch(`${API_BASE}/editMessageText`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      message_id: messageId,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
      reply_markup: JSON.stringify({ inline_keyboard: [] }),
    }),
  });
}

/**
 * Claude Code headless로 한국어 설명 생성 (5분 타임아웃)
 * stdin을 ignore해야 Claude CLI가 hang되지 않음
 *
 * @param {string} owner - GitHub owner
 * @param {string} repo - GitHub repo name
 * @param {object} [context] - 추가 컨텍스트 (description, readmeExcerpt, topics, language)
 */
async function generateKoDescription(owner, repo, context) {
  let prompt;
  const args = ['-p'];

  if (context) {
    // discover.mjs에서 호출: 컨텍스트 제공되므로 웹 접근 불필요
    prompt = `GitHub 레포지토리 "${owner}/${repo}"의 정보:
- 설명: ${context.description || 'N/A'}
- README 발췌: ${(context.readmeExcerpt || '').slice(0, 300)}
- 토픽: ${(context.topics || []).join(', ')}
- 언어: ${context.language || 'N/A'}

이 레포가 Web3/블록체인 개발에서 어떤 역할을 하는지, Claude Code/MCP와 어떻게 활용할 수 있는지 한국어 1~2문장(100자 이내)으로 설명해줘. 설명만 출력해.`;
    args.push(prompt, '--model', 'haiku');
  } else {
    // Telegram callback에서 호출: 웹 접근 필요
    prompt = `GitHub 레포지토리 ${owner}/${repo}의 README와 description을 확인하고, awesome-web3-claude 목록에 넣을 한국어 설명 1문장(80자 이내)을 작성해줘. Claude Code/MCP/Web3 관점에서 이 도구가 뭘 하는지 간결하게. 설명만 출력하고 다른 말은 하지 마.`;
    args.push(prompt, '--model', 'haiku', '--allowedTools', 'WebFetch', 'WebSearch');
  }

  const TIMEOUT_MS = 300000; // 5분

  return new Promise((resolve) => {
    let resolved = false;
    const done = (val) => { if (!resolved) { resolved = true; resolve(val); } };

    const child = spawn('claude', args, {
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env, HOME: process.env.HOME || '/root' },
    });

    let stdout = '';
    child.stdout.on('data', (d) => { stdout += d; });
    child.stderr.on('data', (d) => { /* discard stderr */ });

    const timer = setTimeout(() => {
      console.log('[CLAUDE] Timeout (5m), using fallback');
      child.kill('SIGTERM');
      done(null);
    }, TIMEOUT_MS);

    child.on('close', (code) => {
      clearTimeout(timer);
      if (code !== 0) {
        console.log(`[CLAUDE] Exit code: ${code}`);
        done(null);
        return;
      }
      const desc = stdout.trim().replace(/^["']|["']$/g, '');
      console.log(`[CLAUDE] Generated: ${desc}`);
      done(desc || null);
    });

    child.on('error', (err) => {
      clearTimeout(timer);
      console.log(`[CLAUDE] Error: ${err.message}`);
      done(null);
    });
  });
}

/**
 * Trigger GitHub workflow_dispatch
 */
async function triggerWorkflow(action, owner, repo, sectionId, descriptionKo) {
  const [repoOwner, repoName] = GITHUB_REPO.split('/');
  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/actions/workflows/update-readme.yml/dispatches`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ref: 'main',
      inputs: {
        action,
        owner,
        repo,
        sectionId: sectionId || '',
        descriptionKo: descriptionKo || '',
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub API error: ${res.status} ${err}`);
  }

  return true;
}

/**
 * Parse callback_data: "action:owner/repo:sectionId" or "action:hash:sectionId"
 */
function parseCallbackData(data) {
  const parts = data.split(':');
  if (parts.length < 2) return null;

  const action = parts[0]; // add, skip, keep, remove
  const repoOrHash = parts[1];
  const sectionId = parts[2] || null;

  // Check if it's a hash (8 hex chars)
  if (/^[a-f0-9]{8}$/.test(repoOrHash)) {
    return { action, hash: repoOrHash, sectionId, isHash: true };
  }

  // owner/repo format
  const slashIdx = repoOrHash.indexOf('/');
  if (slashIdx === -1) return { action, owner: repoOrHash, repo: '', sectionId, isHash: false };

  return {
    action,
    owner: repoOrHash.slice(0, slashIdx),
    repo: repoOrHash.slice(slashIdx + 1),
    sectionId,
    isHash: false,
  };
}

/**
 * Webhook endpoint for Telegram updates
 */
app.post(`/webhook/${BOT_TOKEN}`, async (req, res) => {
  res.sendStatus(200); // respond immediately

  const update = req.body;
  if (!update.callback_query) return;

  const { callback_query } = update;
  const fromId = String(callback_query.from.id);
  const callbackData = callback_query.data;
  const chatId = callback_query.message?.chat?.id;
  const messageId = callback_query.message?.message_id;

  // Auth: only allow admin
  if (fromId !== String(CHAT_ID)) {
    await answerCallback(callback_query.id, '⛔ 권한 없음');
    return;
  }

  const parsed = parseCallbackData(callbackData);
  if (!parsed) {
    await answerCallback(callback_query.id, '❌ 파싱 오류');
    return;
  }

  try {
    switch (parsed.action) {
      case 'add': {
        if (parsed.isHash) {
          await answerCallback(callback_query.id, '❌ 해시 참조, 수동 처리 필요');
          return;
        }
        await answerCallback(callback_query.id, '⏳ 한국어 설명 생성 중...');
        await editMessage(chatId, messageId,
          callback_query.message.text + '\n\n⏳ <b>한국어 설명 생성 중...</b>');

        const descKo = await generateKoDescription(parsed.owner, parsed.repo);
        console.log(`[ADD] ${parsed.owner}/${parsed.repo} → ${parsed.sectionId} (ko: ${descKo || 'fallback'})`);

        await triggerWorkflow('add', parsed.owner, parsed.repo, parsed.sectionId, descKo);
        await editMessage(chatId, messageId,
          callback_query.message.text +
          `\n\n✅ <b>추가 승인됨</b> — workflow 실행 중` +
          (descKo ? `\n📝 설명: ${descKo}` : '\n⚠️ 한국어 설명 생성 실패, GitHub description 사용'));
        break;
      }
      case 'remove': {
        if (parsed.isHash) {
          await answerCallback(callback_query.id, '❌ 해시 참조, 수동 처리 필요');
          return;
        }
        await triggerWorkflow('remove', parsed.owner, parsed.repo, parsed.sectionId);
        await answerCallback(callback_query.id, '🗑 삭제 요청 전송');
        await editMessage(chatId, messageId,
          callback_query.message.text + '\n\n🗑 <b>삭제 승인됨</b> — workflow 실행 중');
        console.log(`[REMOVE] ${parsed.owner}/${parsed.repo}`);
        break;
      }
      case 'skip': {
        await answerCallback(callback_query.id, '❌ 스킵 (7일간 재추천 안 함)');
        if (!parsed.isHash && parsed.owner && parsed.repo) {
          await triggerWorkflow('skip', parsed.owner, parsed.repo, parsed.sectionId);
        }
        await editMessage(chatId, messageId,
          callback_query.message.text + '\n\n❌ <b>스킵됨</b> (7일 후 재추천 가능)');
        console.log(`[SKIP] ${parsed.owner}/${parsed.repo}`);
        break;
      }
      case 'keep': {
        await answerCallback(callback_query.id, '👍 유지 (7일간 재알림 안 함)');
        if (!parsed.isHash && parsed.owner && parsed.repo) {
          await triggerWorkflow('keep', parsed.owner, parsed.repo, parsed.sectionId);
        }
        await editMessage(chatId, messageId,
          callback_query.message.text + '\n\n👍 <b>유지됨</b> (7일 후 재검토 가능)');
        console.log(`[KEEP] ${parsed.owner}/${parsed.repo}`);
        break;
      }
      default:
        await answerCallback(callback_query.id, '❓ 알 수 없는 액션');
    }
  } catch (err) {
    console.error(`Error handling callback: ${err.message}`);
    await answerCallback(callback_query.id, `❌ 오류: ${err.message.slice(0, 100)}`);
  }
});

// ---------------------------------------------------------------------------
// /api/describe — Claude Code headless로 한국어 설명 생성 (discover.mjs에서 호출)
// ---------------------------------------------------------------------------
app.post('/api/describe', async (req, res) => {
  if (!API_SECRET || req.headers.authorization !== `Bearer ${API_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { owner, repo, context } = req.body;
  if (!owner || !repo) {
    return res.status(400).json({ error: 'owner and repo are required' });
  }

  try {
    const descKo = await generateKoDescription(owner, repo, context || null);
    res.json({ descriptionKo: descKo });
  } catch (err) {
    console.error(`[API] /api/describe error: ${err.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.listen(PORT, () => {
  console.log(`AWC Webhook server running on port ${PORT}`);
  console.log(`Webhook URL: https://YOUR_DOMAIN/webhook/${BOT_TOKEN}`);
  console.log(`Health: http://localhost:${PORT}/health`);
});
