/**
 * telegram-webhook.mjs
 * Express 서버 (port 3847) — Telegram callback 수신 → GitHub workflow_dispatch 트리거
 * VPS에 배포하여 사용
 */

import express from 'express';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || 'anthropic-ai-study/awesome-web3-claude';
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
 * Edit inline keyboard message to show result
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
    }),
  });
}

/**
 * Trigger GitHub workflow_dispatch
 */
async function triggerWorkflow(action, owner, repo, sectionId) {
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
        await triggerWorkflow('add', parsed.owner, parsed.repo, parsed.sectionId);
        await answerCallback(callback_query.id, '✅ 추가 요청 전송');
        await editMessage(chatId, messageId,
          callback_query.message.text + '\n\n✅ <b>추가 승인됨</b> — workflow 실행 중');
        console.log(`[ADD] ${parsed.owner}/${parsed.repo} → ${parsed.sectionId}`);
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
        await answerCallback(callback_query.id, '❌ 스킵됨');
        await editMessage(chatId, messageId,
          callback_query.message.text + '\n\n❌ <b>스킵됨</b>');
        console.log(`[SKIP] ${callbackData}`);
        break;
      }
      case 'keep': {
        await answerCallback(callback_query.id, '👍 유지');
        await editMessage(chatId, messageId,
          callback_query.message.text + '\n\n👍 <b>유지됨</b>');
        console.log(`[KEEP] ${callbackData}`);
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

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.listen(PORT, () => {
  console.log(`AWC Webhook server running on port ${PORT}`);
  console.log(`Webhook URL: https://YOUR_DOMAIN/webhook/${BOT_TOKEN}`);
  console.log(`Health: http://localhost:${PORT}/health`);
});
