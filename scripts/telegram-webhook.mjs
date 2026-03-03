/**
 * telegram-webhook.mjs
 * Express server (port 3847) — Telegram webhook entry point
 * Routes messages to bot/commands.mjs and bot/callbacks.mjs
 */

import express from 'express';
import rateLimit from 'express-rate-limit';
import { spawn } from 'node:child_process';
import { routeCommand } from './bot/commands.mjs';
import { routeCallback } from './bot/callbacks.mjs';
import { answerCallback, sendMessage } from './bot/telegram-api.mjs';
import { initApproveFlow, handleApproveTextEdit } from './bot/approve-publish.mjs';
import { getSession } from './bot/state.mjs';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || 'anthropic-ai-study/awesome-web3-claude';
const API_SECRET = process.env.API_SECRET;
const WEBHOOK_SECRET = process.env.TELEGRAM_WEBHOOK_SECRET;
const PORT = process.env.PORT || 3847;

if (!BOT_TOKEN || !CHAT_ID || !GITHUB_TOKEN) {
  console.error('Required env vars: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, GITHUB_TOKEN');
  process.exit(1);
}
if (API_SECRET && API_SECRET.length < 32) {
  console.error('API_SECRET must be at least 32 characters');
  process.exit(1);
}

const app = express();
app.use(express.json());

// Rate limiting: /api/ endpoints — 30 requests per 15 minutes
app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, try again later' },
}));

// ---------------------------------------------------------------------------
// Claude Code headless — Korean description generation (5min timeout)
// ---------------------------------------------------------------------------

const VALID_GITHUB_NAME = /^[a-zA-Z0-9_.-]+$/;

async function generateKoDescription(owner, repo, context) {
  let prompt;
  const args = ['-p'];

  if (context) {
    prompt = `GitHub \uB808\uD3EC\uC9C0\uD1A0\uB9AC "${owner}/${repo}"\uC758 \uC815\uBCF4:
- \uC124\uBA85: ${context.description || 'N/A'}
- README \uBC1C\uCDB0: ${(context.readmeExcerpt || '').slice(0, 300)}
- \uD1A0\uD53D: ${(context.topics || []).join(', ')}
- \uC5B8\uC5B4: ${context.language || 'N/A'}

\uC774 \uB808\uD3EC\uAC00 Web3/\uBE14\uB85D\uCCB4\uC778 \uAC1C\uBC1C\uC5D0\uC11C \uC5B4\uB5A4 \uC5ED\uD560\uC744 \uD558\uB294\uC9C0, Claude Code/MCP\uC640 \uC5B4\uB5BB\uAC8C \uD65C\uC6A9\uD560 \uC218 \uC788\uB294\uC9C0 \uD55C\uAD6D\uC5B4 1~2\uBB38\uC7A5(100\uC790 \uC774\uB0B4)\uC73C\uB85C \uC124\uBA85\uD574\uC918. \uC124\uBA85\uB9CC \uCD9C\uB825\uD574.`;
    args.push(prompt, '--model', 'haiku');
  } else {
    prompt = `GitHub \uB808\uD3EC\uC9C0\uD1A0\uB9AC ${owner}/${repo}\uC758 README\uC640 description\uC744 \uD655\uC778\uD558\uACE0, awesome-web3-claude \uBAA9\uB85D\uC5D0 \uB123\uC744 \uD55C\uAD6D\uC5B4 \uC124\uBA85 1\uBB38\uC7A5(80\uC790 \uC774\uB0B4)\uC744 \uC791\uC131\uD574\uC918. Claude Code/MCP/Web3 \uAD00\uC810\uC5D0\uC11C \uC774 \uB3C4\uAD6C\uAC00 \uBB58 \uD558\uB294\uC9C0 \uAC04\uACB0\uD558\uAC8C. \uC124\uBA85\uB9CC \uCD9C\uB825\uD558\uACE0 \uB2E4\uB978 \uB9D0\uC740 \uD558\uC9C0 \uB9C8.`;
    args.push(prompt, '--model', 'haiku', '--allowedTools', 'WebFetch', 'WebSearch');
  }

  const TIMEOUT_MS = 300000; // 5 minutes

  return new Promise((resolve) => {
    let resolved = false;
    const done = (val) => { if (!resolved) { resolved = true; resolve(val); } };

    const child = spawn('claude', args, {
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env, HOME: process.env.HOME || '/root' },
    });

    let stdout = '';
    child.stdout.on('data', (d) => { stdout += d; });
    child.stderr.on('data', () => {});

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
async function triggerWorkflow(action, owner, repo, sectionId, descriptionKo, fromSectionId) {
  const [repoOwner, repoName] = GITHUB_REPO.split('/');
  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/actions/workflows/update-readme.yml/dispatches`;

  const inputs = {
    action,
    owner,
    repo,
    sectionId: sectionId || '',
    descriptionKo: descriptionKo || '',
  };
  if (fromSectionId) inputs.fromSectionId = fromSectionId;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ref: 'main', inputs }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub API error: ${res.status} ${err}`);
  }

  return true;
}

/**
 * Extract Korean description from notification message text
 */
function extractDescriptionKo(text) {
  const match = text.match(/\uD83D\uDCDD \uC124\uBA85\n(.+?)(?:\n\n|$)/s);
  if (!match) return null;
  const desc = match[1].trim();
  if (!desc || /^[a-zA-Z\s.,!?()-]+$/.test(desc)) return null;
  return desc;
}

// Dependencies injected into callback handlers
import { fetchReposJson } from './bot/repos-reader.mjs';
const deps = { triggerWorkflow, generateKoDescription, extractDescriptionKo, fetchReposJson };

// ---------------------------------------------------------------------------
// Webhook endpoint
// ---------------------------------------------------------------------------

app.post(`/webhook/${BOT_TOKEN}`, async (req, res) => {
  if (WEBHOOK_SECRET && req.headers['x-telegram-bot-api-secret-token'] !== WEBHOOK_SECRET) {
    return res.sendStatus(403);
  }

  res.sendStatus(200);

  const update = req.body;
  const fromId = String(
    update.callback_query?.from?.id
    || update.message?.from?.id
    || '',
  );

  // Auth: only allow admin
  if (fromId !== String(CHAT_ID)) {
    if (update.callback_query) {
      await answerCallback(update.callback_query.id, '\u26D4 \uAD8C\uD55C \uC5C6\uC74C');
    }
    return;
  }

  try {
    if (update.callback_query) {
      await routeCallback(update.callback_query, deps);
    } else if (update.message?.text) {
      const chatId = update.message.chat.id;
      const text = update.message.text;

      if (text.startsWith('/')) {
        await routeCommand(chatId, text);
      } else {
        // Route plain text to active edit-text session
        const session = getSession(chatId);
        if (session?.command === 'approve-publish' && session?.step === 'edit-text') {
          await handleApproveTextEdit(chatId, text);
        }
      }
    }
  } catch (err) {
    console.error(`Webhook error: ${err.message}`);
  }
});

// ---------------------------------------------------------------------------
// /api/describe — Claude Code headless Korean description (called by discover.mjs)
// ---------------------------------------------------------------------------

app.post('/api/describe', async (req, res) => {
  if (!API_SECRET || req.headers.authorization !== `Bearer ${API_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { owner, repo, context } = req.body;
  if (!owner || !repo) {
    return res.status(400).json({ error: 'owner and repo are required' });
  }
  if (!VALID_GITHUB_NAME.test(owner) || !VALID_GITHUB_NAME.test(repo)) {
    return res.status(400).json({ error: 'Invalid owner or repo name' });
  }

  try {
    const descKo = await generateKoDescription(owner, repo, context || null);
    res.json({ descriptionKo: descKo });
  } catch (err) {
    console.error(`[API] /api/describe error: ${err.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ---------------------------------------------------------------------------
// /api/approve — Trigger channel message approval flow (called by GitHub Actions)
// ---------------------------------------------------------------------------

app.post('/api/approve', async (req, res) => {
  if (!API_SECRET || req.headers.authorization !== `Bearer ${API_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { owner, repo, sectionId, descriptionKo, stars, skills, skillCount } = req.body;
  if (!owner || !repo) {
    return res.status(400).json({ error: 'owner and repo are required' });
  }
  if (!VALID_GITHUB_NAME.test(owner) || !VALID_GITHUB_NAME.test(repo)) {
    return res.status(400).json({ error: 'Invalid owner or repo name' });
  }

  res.json({ ok: true });

  // Async: run approval flow in background
  initApproveFlow(String(CHAT_ID), {
    owner, repo, sectionId, descriptionKo, stars,
    skills: skills || null,
    skillCount: skillCount || 0,
  }).catch(err => {
    console.error(`[API] /api/approve error: ${err.message}`);
    sendMessage(String(CHAT_ID),
      `\u274C \uC2B9\uC778 \uD50C\uB85C\uC6B0 \uC624\uB958: ${owner}/${repo}\n${err.message}`
    ).catch(() => {});
  });
});

// Health check (localhost only)
app.get('/health', (req, res) => {
  const ip = req.ip || req.socket.remoteAddress;
  if (ip !== '127.0.0.1' && ip !== '::1' && ip !== '::ffff:127.0.0.1') {
    return res.sendStatus(403);
  }
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.listen(PORT, () => {
  console.log(`AWC Webhook server running on port ${PORT}`);
  console.log(`Webhook: configured (token redacted)`);
  console.log(`Health: http://localhost:${PORT}/health`);
  console.log(`Bot commands: /help, /list, /stats, /section, /search, /find, /add, /remove, /move, /edit, /skills`);
});
