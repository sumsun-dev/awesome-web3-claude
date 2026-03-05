/**
 * approve-publish.mjs
 * Unified channel publish with admin approval
 * Handles both skill-based and no-skill repos
 *
 * Callback prefixes:
 *   ap: — approve flow entry (from workflow or manual)
 *   pst:/psp:/psa/psn/pss — skill toggle/page (preserved)
 *   ape — approve & send to channel
 *   apr — edit mode
 *   apb — back to skill select from preview
 *   apc — cancel/skip
 *
 * Flow:
 *   1. initApproveFlow(chatId, repoData) — entry point
 *   2. Skills? → AI recommend → toggle UI → preview → approve → channel
 *   3. No skills? → AI message → preview → approve → channel
 *   4. Edit mode: admin types replacement text → new preview
 */

import { spawn } from 'node:child_process';
import { sendMessage, editMessage, answerCallback, sendChatAction, escapeHtml, sendLongMessage } from './telegram-api.mjs';
import { fetchReposJson } from './repos-reader.mjs';
import { getSession, setSession, clearSession } from './state.mjs';

const PER_PAGE = 5;
const CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID;
const VALID_GITHUB_NAME = /^[a-zA-Z0-9_.-]+$/;
const AI_TIMEOUT_MS = 60_000;

function parseRepoInput(input) {
  const urlMatch = input.match(/github\.com\/([^/\s]+)\/([^/\s#?]+)/);
  if (urlMatch) {
    const owner = urlMatch[1];
    const repo = urlMatch[2].replace(/\.git$/, '');
    if (!VALID_GITHUB_NAME.test(owner) || !VALID_GITHUB_NAME.test(repo)) return null;
    return { owner, repo };
  }
  if (input.includes('/')) {
    const parts = input.split('/');
    if (parts.length !== 2) return null;
    const owner = parts[0].trim();
    const repo = parts[1].trim();
    if (!VALID_GITHUB_NAME.test(owner) || !VALID_GITHUB_NAME.test(repo)) return null;
    return { owner, repo };
  }
  return null;
}

// ---------------------------------------------------------------------------
// /skills command handler (preserved)
// ---------------------------------------------------------------------------

export async function handleSkills(chatId, input) {
  if (!input) {
    return sendMessage(chatId, '\uC0AC\uC6A9\uBC95: /skills &lt;owner/repo&gt;');
  }

  const parsed = parseRepoInput(input);
  if (!parsed) {
    return sendMessage(chatId, '\uC62C\uBC14\uB978 \uD615\uC2DD: /skills owner/repo');
  }

  await sendChatAction(chatId);

  const { owner, repo } = parsed;
  const data = await fetchReposJson();
  const skills = findSkillsInData(data, owner, repo);

  if (!skills || skills.length === 0) {
    return sendMessage(chatId, `\uC2A4\uD0AC \uC5C6\uC74C: <b>${escapeHtml(owner)}/${escapeHtml(repo)}</b>`);
  }

  await sendMessage(chatId, `<b>${escapeHtml(owner)}/${escapeHtml(repo)}</b> \u2014 ${skills.length}\uAC1C \uC2A4\uD0AC\nAI \uCD94\uCC9C \uBD84\uC11D \uC911...`);
  await sendChatAction(chatId);

  const selected = await getAiRecommendedIndices(owner, repo, skills);

  setSession(chatId, {
    command: 'approve-publish',
    step: 'skill-select',
    owner,
    repo,
    skills,
    selected,
    page: 0,
    perPage: PER_PAGE,
  });

  const aiNote = `AI \uCD94\uCC9C: ${selected.length}/${skills.length}\uAC1C \uC120\uD0DD\uB428\n`;
  const { text, keyboard } = renderSkillPage(owner, repo, skills, selected, 0, PER_PAGE);
  return sendMessage(chatId, aiNote + text, { inline_keyboard: keyboard });
}

// ---------------------------------------------------------------------------
// initApproveFlow — entry point from VPS API /api/approve
// ---------------------------------------------------------------------------

export async function initApproveFlow(chatId, repoData) {
  const { owner, repo, sectionId, descriptionKo, stars, skills, skillCount } = repoData;

  if (skills && skills.length > 0) {
    // Skill-based repo: AI recommend → toggle UI
    await sendMessage(chatId,
      `\uD83D\uDCCB <b>${escapeHtml(owner)}/${escapeHtml(repo)}</b> \uCC44\uB110 \uBC1C\uD589 \uC900\uBE44\n\n` +
      `[1/3] \uC2A4\uD0AC \uC120\uBCC4\n` +
      `${skills.length}\uAC1C \uC2A4\uD0AC\uC774 \uBC1C\uACAC\uB418\uC5C8\uC2B5\uB2C8\uB2E4. AI\uAC00 \uD575\uC2EC \uC2A4\uD0AC\uC744 \uCD94\uCC9C\uD569\uB2C8\uB2E4...`);
    await sendChatAction(chatId);

    const selected = await getAiRecommendedIndices(owner, repo, skills);

    setSession(chatId, {
      command: 'approve-publish',
      step: 'skill-select',
      owner,
      repo,
      sectionId,
      descriptionKo,
      stars,
      skills,
      selected,
      page: 0,
      perPage: PER_PAGE,
    });

    const aiNote = `\u2705 AI \uCD94\uCC9C \uC644\uB8CC: ${selected.length}/${skills.length}\uAC1C \uC120\uD0DD\uB428\n\uC544\uB798\uC5D0\uC11C \uBC1C\uD589\uD560 \uC2A4\uD0AC\uC744 \uC120\uD0DD/\uD574\uC81C\uD55C \uD6C4 "\uBBF8\uB9AC\uBCF4\uAE30"\uB97C \uB20C\uB7EC\uC8FC\uC138\uC694.\n`;
    const { text, keyboard } = renderSkillPage(owner, repo, skills, selected, 0, PER_PAGE);
    return sendMessage(chatId, aiNote + text, { inline_keyboard: keyboard });
  }

  // No-skill repo: generate AI channel message → preview
  await sendMessage(chatId,
    `\uD83D\uDCCB <b>${escapeHtml(owner)}/${escapeHtml(repo)}</b> \uCC44\uB110 \uBC1C\uD589 \uC900\uBE44\n\n` +
    `\uCC44\uB110 \uBA54\uC2DC\uC9C0 \uC0DD\uC131 \uC911...`);
  await sendChatAction(chatId);

  const channelMsg = await generateNoSkillChannelMessage(owner, repo, descriptionKo, stars, sectionId);

  setSession(chatId, {
    command: 'approve-publish',
    step: 'preview',
    owner,
    repo,
    sectionId,
    descriptionKo,
    stars,
    skills: null,
    selected: [],
    page: 0,
    perPage: PER_PAGE,
    channelMsg,
  });

  const previewText = `\uD83D\uDCCB <b>${escapeHtml(owner)}/${escapeHtml(repo)}</b> \uCC44\uB110 \uBC1C\uD589\n\n` +
    `[\uBBF8\uB9AC\uBCF4\uAE30] \uCC44\uB110\uC5D0 \uC804\uC1A1\uB420 \uBA54\uC2DC\uC9C0:\n` +
    `\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n${channelMsg}\n\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n` +
    `\uC544\uB798 \uBC84\uD2BC\uC73C\uB85C \uC2B9\uC778, \uC218\uC815, \uB610\uB294 \uC2A4\uD0B5\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.`;

  return sendMessage(chatId, previewText, {
    inline_keyboard: [
      [
        { text: '\uD83D\uDCE2 \uC2B9\uC778 \uC804\uC1A1', callback_data: 'ape' },
        { text: '\u270F\uFE0F \uC218\uC815', callback_data: 'apr' },
      ],
      [{ text: '\uC2A4\uD0B5', callback_data: 'apc' }],
    ],
  });
}

// ---------------------------------------------------------------------------
// Callback router
// ---------------------------------------------------------------------------

export async function handleApproveCallback(callbackQuery) {
  const data = callbackQuery.data;

  try {
    // ap:owner/repo — manual trigger from button
    if (data.startsWith('ap:')) return handleApproveInit(callbackQuery);

    // Skill toggle/page (preserved ps* callbacks)
    if (data.startsWith('pst:')) return handleSkillToggle(callbackQuery);
    if (data.startsWith('psp:')) return handleSkillPageChange(callbackQuery);
    if (data === 'psa') return handleSkillSelectAll(callbackQuery);
    if (data === 'psn') return handleSkillDeselectAll(callbackQuery);
    if (data === 'pss') return handleSkillPreview(callbackQuery);

    // Approve flow actions
    if (data === 'ape') return handleApproveSend(callbackQuery);
    if (data === 'apr') return handleApproveEdit(callbackQuery);
    if (data === 'apb') return handleApproveBackToSelect(callbackQuery);
    if (data === 'apc') return handleApproveCancel(callbackQuery);

    await answerCallback(callbackQuery.id, '\uC54C \uC218 \uC5C6\uB294 \uC561\uC158');
  } catch (err) {
    console.error(`[approve-publish] Error: ${err.message}`);
    await answerCallback(callbackQuery.id, `\uC624\uB958: ${err.message.slice(0, 100)}`);
  }
}

// ---------------------------------------------------------------------------
// handleApproveTextEdit — admin typed replacement text
// ---------------------------------------------------------------------------

export async function handleApproveTextEdit(chatId, text) {
  const session = getSession(chatId);
  if (!session || session.command !== 'approve-publish' || session.step !== 'edit-text') {
    return;
  }

  setSession(chatId, { ...session, step: 'preview', channelMsg: text });

  const { owner, repo } = session;
  const previewText = `\uD83D\uDCCB <b>${escapeHtml(owner)}/${escapeHtml(repo)}</b> \uCC44\uB110 \uBC1C\uD589\n\n` +
    `[\uBBF8\uB9AC\uBCF4\uAE30] \uCC44\uB110\uC5D0 \uC804\uC1A1\uB420 \uBA54\uC2DC\uC9C0:\n` +
    `\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n${text}\n\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n` +
    `\uC544\uB798 \uBC84\uD2BC\uC73C\uB85C \uC2B9\uC778, \uC218\uC815, \uB610\uB294 \uC2A4\uD0B5\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.`;

  const buttons = session.skills
    ? [
        [
          { text: '\uD83D\uDCE2 \uC2B9\uC778 \uC804\uC1A1', callback_data: 'ape' },
          { text: '\u270F\uFE0F \uC218\uC815', callback_data: 'apr' },
        ],
        [
          { text: '\u25C0\uFE0F \uB3CC\uC544\uAC00\uAE30', callback_data: 'apb' },
          { text: '\uC2A4\uD0B5', callback_data: 'apc' },
        ],
      ]
    : [
        [
          { text: '\uD83D\uDCE2 \uC2B9\uC778 \uC804\uC1A1', callback_data: 'ape' },
          { text: '\u270F\uFE0F \uC218\uC815', callback_data: 'apr' },
        ],
        [{ text: '\uC2A4\uD0B5', callback_data: 'apc' }],
      ];

  return sendMessage(chatId, previewText, { inline_keyboard: buttons });
}

// ---------------------------------------------------------------------------
// ap:owner/repo — Manual entry from button (fallback when VPS was down)
// ---------------------------------------------------------------------------

async function handleApproveInit(callbackQuery) {
  const data = callbackQuery.data;
  const chatId = callbackQuery.message?.chat?.id;
  const messageId = callbackQuery.message?.message_id;
  const fullName = data.slice(3); // ap:owner/repo

  const slashIdx = fullName.indexOf('/');
  if (slashIdx === -1) {
    await answerCallback(callbackQuery.id, '\uC798\uBABB\uB41C \uD615\uC2DD');
    return;
  }

  const owner = fullName.slice(0, slashIdx);
  const repo = fullName.slice(slashIdx + 1);

  await answerCallback(callbackQuery.id, '\uC2B9\uC778 \uD50C\uB85C\uC6B0 \uC2DC\uC791...');
  await editMessage(chatId, messageId,
    `<b>${escapeHtml(owner)}/${escapeHtml(repo)}</b>\n\uB370\uC774\uD130 \uB85C\uB529 \uC911...`);
  await sendChatAction(chatId);

  // Load repo data from repos.json
  const reposData = await fetchReposJson();
  let repoEntry = null;
  let sectionId = null;
  for (const section of reposData.sections) {
    const found = section.repos.find(
      r => r.owner.toLowerCase() === owner.toLowerCase()
        && r.repo.toLowerCase() === repo.toLowerCase(),
    );
    if (found) {
      repoEntry = found;
      sectionId = section.id;
      break;
    }
  }

  if (!repoEntry) {
    await editMessage(chatId, messageId, `\uB808\uD3EC \uC5C6\uC74C: <b>${escapeHtml(owner)}/${escapeHtml(repo)}</b>`);
    return;
  }

  const repoData = {
    owner,
    repo,
    sectionId,
    descriptionKo: repoEntry.description?.ko || '',
    stars: repoEntry.health?.stars || 0,
    skills: repoEntry.skills || null,
    skillCount: repoEntry.skills?.length || 0,
  };

  // Clear the original message, initApproveFlow sends new messages
  await editMessage(chatId, messageId,
    `<b>${escapeHtml(owner)}/${escapeHtml(repo)}</b> \u2014 \uC2B9\uC778 \uD50C\uB85C\uC6B0 \uC2DC\uC791`);

  return initApproveFlow(chatId, repoData);
}

// ---------------------------------------------------------------------------
// pst:N — Toggle skill selection
// ---------------------------------------------------------------------------

async function handleSkillToggle(callbackQuery) {
  const chatId = callbackQuery.message?.chat?.id;
  const messageId = callbackQuery.message?.message_id;
  const idx = parseInt(callbackQuery.data.slice(4), 10);

  const session = getSession(chatId);
  if (!session || session.command !== 'approve-publish') {
    await answerCallback(callbackQuery.id, '\uC138\uC158 \uB9CC\uB8CC\uB428');
    return;
  }

  const { owner, repo, skills, selected, page, perPage } = session;

  const newSelected = selected.includes(idx)
    ? selected.filter(i => i !== idx)
    : [...selected, idx];

  setSession(chatId, { ...session, selected: newSelected });
  await answerCallback(callbackQuery.id);

  const { text, keyboard } = renderSkillPage(owner, repo, skills, newSelected, page, perPage);
  await editMessage(chatId, messageId, text, { inline_keyboard: keyboard });
}

// ---------------------------------------------------------------------------
// psp:N — Page change
// ---------------------------------------------------------------------------

async function handleSkillPageChange(callbackQuery) {
  const chatId = callbackQuery.message?.chat?.id;
  const messageId = callbackQuery.message?.message_id;
  const newPage = parseInt(callbackQuery.data.slice(4), 10);

  const session = getSession(chatId);
  if (!session || session.command !== 'approve-publish') {
    await answerCallback(callbackQuery.id, '\uC138\uC158 \uB9CC\uB8CC\uB428');
    return;
  }

  setSession(chatId, { ...session, page: newPage });
  await answerCallback(callbackQuery.id);

  const { owner, repo, skills, selected, perPage } = session;
  const { text, keyboard } = renderSkillPage(owner, repo, skills, selected, newPage, perPage);
  await editMessage(chatId, messageId, text, { inline_keyboard: keyboard });
}

// ---------------------------------------------------------------------------
// psa — Select all
// ---------------------------------------------------------------------------

async function handleSkillSelectAll(callbackQuery) {
  const chatId = callbackQuery.message?.chat?.id;
  const messageId = callbackQuery.message?.message_id;

  const session = getSession(chatId);
  if (!session || session.command !== 'approve-publish') {
    await answerCallback(callbackQuery.id, '\uC138\uC158 \uB9CC\uB8CC\uB428');
    return;
  }

  const allSelected = session.skills.map((_, i) => i);
  setSession(chatId, { ...session, selected: allSelected });
  await answerCallback(callbackQuery.id, '\uC804\uCCB4 \uC120\uD0DD');

  const { owner, repo, skills, page, perPage } = session;
  const { text, keyboard } = renderSkillPage(owner, repo, skills, allSelected, page, perPage);
  await editMessage(chatId, messageId, text, { inline_keyboard: keyboard });
}

// ---------------------------------------------------------------------------
// psn — Deselect all
// ---------------------------------------------------------------------------

async function handleSkillDeselectAll(callbackQuery) {
  const chatId = callbackQuery.message?.chat?.id;
  const messageId = callbackQuery.message?.message_id;

  const session = getSession(chatId);
  if (!session || session.command !== 'approve-publish') {
    await answerCallback(callbackQuery.id, '\uC138\uC158 \uB9CC\uB8CC\uB428');
    return;
  }

  setSession(chatId, { ...session, selected: [] });
  await answerCallback(callbackQuery.id, '\uC804\uCCB4 \uD574\uC81C');

  const { owner, repo, skills, page, perPage } = session;
  const { text, keyboard } = renderSkillPage(owner, repo, skills, [], page, perPage);
  await editMessage(chatId, messageId, text, { inline_keyboard: keyboard });
}

// ---------------------------------------------------------------------------
// pss — Preview (AI Korean channel message → preview)
// ---------------------------------------------------------------------------

async function handleSkillPreview(callbackQuery) {
  const chatId = callbackQuery.message?.chat?.id;
  const messageId = callbackQuery.message?.message_id;

  const session = getSession(chatId);
  if (!session || session.command !== 'approve-publish') {
    await answerCallback(callbackQuery.id, '\uC138\uC158 \uB9CC\uB8CC\uB428');
    return;
  }

  const { owner, repo, skills, selected } = session;

  if (selected.length === 0) {
    await answerCallback(callbackQuery.id, '\uC120\uD0DD\uB41C \uC2A4\uD0AC\uC774 \uC5C6\uC2B5\uB2C8\uB2E4');
    return;
  }

  await answerCallback(callbackQuery.id, '\uD55C\uAE00 \uBA54\uC2DC\uC9C0 \uC0DD\uC131 \uC911...');
  await editMessage(chatId, messageId,
    `\uD83D\uDCCB <b>${escapeHtml(owner)}/${escapeHtml(repo)}</b> \uCC44\uB110 \uBC1C\uD589\n\n\uCC44\uB110 \uBA54\uC2DC\uC9C0 \uC0DD\uC131 \uC911...`);
  await sendChatAction(chatId);

  const selectedSkills = selected
    .sort((a, b) => a - b)
    .map(i => skills[i])
    .filter(Boolean);

  const channelMsg = await generateSkillChannelMessage(owner, repo, selectedSkills, skills.length, session.descriptionKo, session.stars);

  setSession(chatId, { ...session, step: 'preview', channelMsg });

  const previewText = `\uD83D\uDCCB <b>${escapeHtml(owner)}/${escapeHtml(repo)}</b> \uCC44\uB110 \uBC1C\uD589\n\n` +
    `[2/3] \uBBF8\uB9AC\uBCF4\uAE30 \u2014 \uCC44\uB110\uC5D0 \uC804\uC1A1\uB420 \uBA54\uC2DC\uC9C0:\n` +
    `\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n${channelMsg}\n\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n` +
    `\uC2B9\uC778\uD558\uBA74 \uCC44\uB110\uC5D0 \uBC14\uB85C \uC804\uC1A1\uB429\uB2C8\uB2E4.`;

  await editMessage(chatId, messageId, previewText, {
    inline_keyboard: [
      [
        { text: '\uD83D\uDCE2 \uC2B9\uC778 \uC804\uC1A1', callback_data: 'ape' },
        { text: '\u270F\uFE0F \uC218\uC815', callback_data: 'apr' },
      ],
      [
        { text: '\u25C0\uFE0F \uB3CC\uC544\uAC00\uAE30', callback_data: 'apb' },
        { text: '\uC2A4\uD0B5', callback_data: 'apc' },
      ],
    ],
  });
}

// ---------------------------------------------------------------------------
// ape — Approve & send to channel
// ---------------------------------------------------------------------------

async function handleApproveSend(callbackQuery) {
  const chatId = callbackQuery.message?.chat?.id;
  const messageId = callbackQuery.message?.message_id;

  const session = getSession(chatId);
  if (!session || session.command !== 'approve-publish' || !session.channelMsg) {
    await answerCallback(callbackQuery.id, '\uC138\uC158 \uB9CC\uB8CC\uB428');
    return;
  }

  if (!CHANNEL_ID) {
    await answerCallback(callbackQuery.id, 'TELEGRAM_CHANNEL_ID \uBBF8\uC124\uC815');
    return;
  }

  await answerCallback(callbackQuery.id, '\uCC44\uB110 \uC804\uC1A1 \uC911...');

  const { owner, repo, skills, selected, channelMsg } = session;

  if (channelMsg.length <= 4096) {
    await sendMessage(CHANNEL_ID, channelMsg);
  } else {
    await sendLongMessage(CHANNEL_ID, channelMsg);
  }

  clearSession(chatId);

  const summary = skills
    ? `(${selected.length}/${skills.length} \uC2A4\uD0AC)`
    : '';

  await editMessage(chatId, messageId,
    `\uD83D\uDCCB <b>${escapeHtml(owner)}/${escapeHtml(repo)}</b> \uCC44\uB110 \uBC1C\uD589\n\n` +
    `[3/3] \u2705 \uCC44\uB110 \uC804\uC1A1 \uC644\uB8CC ${summary}`);
}

// ---------------------------------------------------------------------------
// apr — Edit mode
// ---------------------------------------------------------------------------

async function handleApproveEdit(callbackQuery) {
  const chatId = callbackQuery.message?.chat?.id;
  const messageId = callbackQuery.message?.message_id;

  const session = getSession(chatId);
  if (!session || session.command !== 'approve-publish') {
    await answerCallback(callbackQuery.id, '\uC138\uC158 \uB9CC\uB8CC\uB428');
    return;
  }

  setSession(chatId, { ...session, step: 'edit-text' });
  await answerCallback(callbackQuery.id, '\uC218\uC815 \uBAA8\uB4DC');

  await editMessage(chatId, messageId,
    `\uD83D\uDCCB <b>${escapeHtml(session.owner)}/${escapeHtml(session.repo)}</b> \uCC44\uB110 \uBC1C\uD589\n\n` +
    `\u270F\uFE0F \uC218\uC815 \uBAA8\uB4DC\n` +
    `\uCC44\uB110 \uBA54\uC2DC\uC9C0\uB97C \uC9C1\uC811 \uC785\uB825\uD574\uC8FC\uC138\uC694.\n` +
    `\uD14D\uC2A4\uD2B8\uB97C \uBCF4\uB0B4\uBA74 \uBBF8\uB9AC\uBCF4\uAE30\uAC00 \uC5C5\uB370\uC774\uD2B8\uB429\uB2C8\uB2E4.`);
}

// ---------------------------------------------------------------------------
// apb — Back to skill select from preview
// ---------------------------------------------------------------------------

async function handleApproveBackToSelect(callbackQuery) {
  const chatId = callbackQuery.message?.chat?.id;
  const messageId = callbackQuery.message?.message_id;

  const session = getSession(chatId);
  if (!session || session.command !== 'approve-publish') {
    await answerCallback(callbackQuery.id, '\uC138\uC158 \uB9CC\uB8CC\uB428');
    return;
  }

  if (!session.skills) {
    await answerCallback(callbackQuery.id, '\uC2A4\uD0AC \uC5C6\uB294 \uB808\uD3EC');
    return;
  }

  setSession(chatId, { ...session, step: 'skill-select', channelMsg: undefined });
  await answerCallback(callbackQuery.id);

  const { owner, repo, skills, selected, page, perPage } = session;
  const { text, keyboard } = renderSkillPage(owner, repo, skills, selected, page, perPage);
  await editMessage(chatId, messageId, text, { inline_keyboard: keyboard });
}

// ---------------------------------------------------------------------------
// apc — Cancel/skip
// ---------------------------------------------------------------------------

async function handleApproveCancel(callbackQuery) {
  const chatId = callbackQuery.message?.chat?.id;
  const messageId = callbackQuery.message?.message_id;

  const session = getSession(chatId);
  const repoName = session ? `${session.owner}/${session.repo}` : '';

  clearSession(chatId);
  await answerCallback(callbackQuery.id, '\uC2A4\uD0B5\uB428');

  const skipText = repoName
    ? `\u23ED ${escapeHtml(repoName)} \uCC44\uB110 \uBC1C\uD589 \uC2A4\uD0B5\uB428\n\n` +
      `\u2139\uFE0F \uB808\uD3EC\uB294 \uBAA9\uB85D(repos.json)\uC5D0 \uC774\uBBF8 \uCD94\uAC00\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.\n` +
      `\uCC44\uB110 \uACF5\uC9C0\uB9CC \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.\n` +
      `\uB098\uC911\uC5D0 /skills ${repoName} \uB85C \uB2E4\uC2DC \uBC1C\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.`
    : `\u23ED \uCC44\uB110 \uBC1C\uD589 \uC2A4\uD0B5\uB428`;

  await editMessage(chatId, messageId, skipText);
}

// ---------------------------------------------------------------------------
// Render skill selection page
// ---------------------------------------------------------------------------

function renderSkillPage(owner, repo, skills, selected, page, perPage) {
  const totalPages = Math.ceil(skills.length / perPage);
  const start = page * perPage;
  const end = Math.min(start + perPage, skills.length);
  const pageSkills = skills.slice(start, end);

  let text = `<b>${escapeHtml(owner)}/${escapeHtml(repo)}</b> \uC2A4\uD0AC \uC120\uBCC4\n`;
  text += `${selected.length}/${skills.length} \uC120\uD0DD\uB428 | \uD398\uC774\uC9C0 ${page + 1}/${totalPages}\n\n`;

  for (let i = 0; i < pageSkills.length; i++) {
    const globalIdx = start + i;
    const skill = pageSkills[i];
    const icon = selected.includes(globalIdx) ? '\u2705' : '\u2B1C';
    const desc = skill.description?.ko || skill.description?.en || '';
    const shortDesc = desc.length > 100 ? desc.slice(0, 97) + '...' : desc;
    text += `${icon} <b>${escapeHtml(skill.name)}</b>\n`;
    if (shortDesc) text += `  ${escapeHtml(shortDesc)}\n`;
  }

  const keyboard = [];

  for (let i = 0; i < pageSkills.length; i++) {
    const globalIdx = start + i;
    const skill = pageSkills[i];
    const icon = selected.includes(globalIdx) ? '\u2705' : '\u2B1C';
    keyboard.push([{
      text: `${icon} ${skill.name}`,
      callback_data: `pst:${globalIdx}`,
    }]);
  }

  if (totalPages > 1) {
    const navRow = [];
    if (page > 0) navRow.push({ text: '\u25C0\uFE0F \uC774\uC804', callback_data: `psp:${page - 1}` });
    if (page < totalPages - 1) navRow.push({ text: '\uB2E4\uC74C \u25B6\uFE0F', callback_data: `psp:${page + 1}` });
    keyboard.push(navRow);
  }

  keyboard.push([
    { text: '\uC804\uCCB4 \uC120\uD0DD', callback_data: 'psa' },
    { text: '\uC804\uCCB4 \uD574\uC81C', callback_data: 'psn' },
  ]);

  keyboard.push([
    { text: `\uD83D\uDC41 \uBBF8\uB9AC\uBCF4\uAE30 (${selected.length})`, callback_data: 'pss' },
    { text: '\uC2A4\uD0B5', callback_data: 'apc' },
  ]);

  return { text, keyboard };
}

// ---------------------------------------------------------------------------
// AI: Generate Korean channel message for skill-based repos
// ---------------------------------------------------------------------------

async function generateSkillChannelMessage(owner, repo, selectedSkills, totalCount, descriptionKo, stars) {
  const skillLines = selectedSkills.map(s => {
    const desc = s.description?.ko || s.description?.en || '';
    return `- ${s.name}: ${desc}`;
  }).join('\n');

  const repoInfo = descriptionKo ? `\n\uB808\uD3EC \uC124\uBA85: ${descriptionKo}` : '';
  const starsInfo = stars ? `\n\uC2A4\uD0C0: ${stars}` : '';

  const prompt = `GitHub \uB808\uD3EC "${owner}/${repo}"\uC758 \uC2A4\uD0AC\uC744 Telegram \uCC44\uB110\uC5D0 \uC18C\uAC1C\uD558\uB294 \uD55C\uAD6D\uC5B4 \uBA54\uC2DC\uC9C0\uB97C \uC791\uC131\uD574\uC918.
${repoInfo}${starsInfo}

\uC120\uD0DD\uB41C \uC2A4\uD0AC (${selectedSkills.length}/${totalCount}\uAC1C):
${skillLines}

\uC791\uC131 \uADDC\uCE59:
- \uCCAB \uC904: \uD83D\uDD27 \uC774\uBAA8\uC9C0\uC640 \uB808\uD3EC \uC18C\uAC1C \uD5E4\uB354
- \uB458\uC9F8 \uC904: \uB808\uD3EC\uAC00 \uBB58 \uD558\uB294\uC9C0 1\uC904 \uC694\uC57D (\uC124\uBA85 \uCC38\uACE0)
- \uC774\uD6C4: \uAC01 \uC2A4\uD0AC\uC744 \u2022 \uBD88\uB9BF \uD3EC\uC778\uD2B8\uB85C \uB098\uC5F4
- \uAC01 \uC2A4\uD0AC\uC758 \uC124\uBA85\uC740 \uD55C\uAD6D\uC5B4 1\uBB38\uC7A5 (30\uC790 \uC774\uB0B4)
- \uB9C8\uC9C0\uB9C9\uC5D0 \uD558\uB2E8 \uB9C1\uD06C 2\uAC1C:
  \uD83D\uDD17 https://github.com/${owner}/${repo}
  \u2B50 https://github.com/sumsun-dev/awesome-web3-claude
- HTML \uD0DC\uADF8 \uC0AC\uC6A9 \uAE08\uC9C0 (plain text\uB9CC)
- \uBA54\uC2DC\uC9C0\uB9CC \uCD9C\uB825, \uB2E4\uB978 \uB9D0 \uC5C6\uC774`;

  const result = await runClaude(prompt);

  if (result) {
    if (descriptionKo) {
      const lines = result.split('\n');
      lines.splice(1, 0, descriptionKo);
      return lines.join('\n');
    }
    return result;
  }

  return buildSkillFallbackMessage(owner, repo, selectedSkills, totalCount, descriptionKo, stars);
}

function buildSkillFallbackMessage(owner, repo, selectedSkills, totalCount, descriptionKo, stars) {
  let text = `\uD83D\uDD27 ${owner}/${repo} \uC8FC\uC694 \uC2A4\uD0AC \uC18C\uAC1C (${selectedSkills.length}/${totalCount})\n`;
  if (descriptionKo) text += `${descriptionKo}\n`;
  text += '\n';

  for (const skill of selectedSkills) {
    const desc = skill.description?.ko || skill.description?.en || '';
    const shortDesc = desc.length > 80 ? desc.slice(0, 77) + '...' : desc;
    text += `\u2022 ${skill.name}`;
    if (shortDesc) text += ` \u2014 ${shortDesc}`;
    text += '\n';
  }

  text += `\n\uD83D\uDD17 https://github.com/${owner}/${repo}`;
  text += `\n\u2B50 https://github.com/sumsun-dev/awesome-web3-claude`;

  return text;
}

// ---------------------------------------------------------------------------
// AI: Generate Korean channel message for no-skill repos
// ---------------------------------------------------------------------------

async function generateNoSkillChannelMessage(owner, repo, descriptionKo, stars, sectionId) {
  const prompt = `GitHub \uB808\uD3EC "${owner}/${repo}"\uC744 Telegram \uCC44\uB110\uC5D0 \uC18C\uAC1C\uD558\uB294 \uD55C\uAD6D\uC5B4 \uBA54\uC2DC\uC9C0\uB97C \uC791\uC131\uD574\uC918.

\uC124\uBA85: ${descriptionKo || '(N/A)'}
\uC2A4\uD0C0: ${stars || 0}
\uC139\uC158: ${sectionId || '(N/A)'}

\uC791\uC131 \uADDC\uCE59:
- \uCCAB \uC904: \uD83C\uDD95 \uC774\uBAA8\uC9C0\uC640 \uB808\uD3EC \uC18C\uAC1C \uD5E4\uB354
- 2\u20143\uC904\uB85C \uD2B9\uC9D5\uACFC \uC6A9\uB3C4 \uC124\uBA85
- \uB9C8\uC9C0\uB9C9\uC5D0 \uD558\uB2E8 \uB9C1\uD06C 2\uAC1C:
  \uD83D\uDD17 https://github.com/${owner}/${repo}
  \u2B50 https://github.com/sumsun-dev/awesome-web3-claude
- HTML \uD0DC\uADF8 \uC0AC\uC6A9 \uAE08\uC9C0 (plain text\uB9CC)
- \uBA54\uC2DC\uC9C0\uB9CC \uCD9C\uB825, \uB2E4\uB978 \uB9D0 \uC5C6\uC774`;

  const result = await runClaude(prompt);

  if (result) return result;

  return buildNoSkillFallbackMessage(owner, repo, descriptionKo, stars);
}

function buildNoSkillFallbackMessage(owner, repo, descriptionKo, stars) {
  let text = `\uD83C\uDD95 ${owner}/${repo}`;
  if (stars) text += ` (\u2B50 ${stars})`;
  text += '\n\n';
  if (descriptionKo) text += `${descriptionKo}\n\n`;
  text += `\uD83D\uDD17 https://github.com/${owner}/${repo}`;
  text += `\n\u2B50 https://github.com/sumsun-dev/awesome-web3-claude`;
  return text;
}

// ---------------------------------------------------------------------------
// AI: Recommend skill indices (Claude CLI haiku)
// ---------------------------------------------------------------------------

async function getAiRecommendedIndices(owner, repo, skills) {
  const fallback = skills.map((_, i) => i);

  if (skills.length <= 5) return fallback;

  const skillList = skills.map((s, i) =>
    `${i}. ${s.name} \u2014 ${(s.description?.ko || s.description?.en || '(\uC124\uBA85 \uC5C6\uC74C)').slice(0, 80)}`
  ).join('\n');

  const prompt = `\uC544\uB798\uB294 GitHub \uB808\uD3EC "${owner}/${repo}"\uC758 \uC2A4\uD0AC \uBAA9\uB85D\uC774\uB2E4.
Telegram \uCC44\uB110\uC5D0 \uC18C\uAC1C\uD560 \uB9CC\uD55C \uD575\uC2EC \uC2A4\uD0AC\uB9CC \uACE8\uB77C\uC918.
- test, example, template, demo, sample \uAC19\uC740 \uBCF4\uC870 \uC2A4\uD0AC\uC740 \uC81C\uC678
- \uC124\uBA85\uC774 \uC5C6\uAC70\uB098 \uC911\uBCF5 \uAE30\uB2A5\uC778 \uC2A4\uD0AC\uC740 \uC81C\uC678
- \uC2E4\uC6A9\uC801\uC774\uACE0 \uB3C5\uB9BD\uC801\uC778 \uD575\uC2EC \uAE30\uB2A5 \uC2A4\uD0AC\uB9CC \uC120\uD0DD

\uC2A4\uD0AC \uBAA9\uB85D:
${skillList}

\uC751\uB2F5 \uD615\uC2DD: \uC120\uD0DD\uD55C \uC778\uB371\uC2A4 \uBC88\uD638\uB9CC \uC27C\uD45C\uB85C \uAD6C\uBD84\uD574\uC11C \uCD9C\uB825 (\uC608: 0,2,5,7)
\uB2E4\uB978 \uC124\uBA85 \uC5C6\uC774 \uC22B\uC790\uB9CC \uCD9C\uB825\uD574.`;

  const result = await runClaude(prompt);
  if (!result) return fallback;

  const indices = parseNumberList(result, skills.length);
  if (indices.length === 0) return fallback;

  console.log(`[AI-RECOMMEND] ${owner}/${repo}: ${indices.length}/${skills.length} selected`);
  return indices;
}

// ---------------------------------------------------------------------------
// Claude CLI runner (shared)
// ---------------------------------------------------------------------------

function runClaude(prompt) {
  return new Promise((resolve) => {
    let resolved = false;
    const done = (val) => { if (!resolved) { resolved = true; resolve(val); } };

    const child = spawn('claude', ['-p', prompt, '--model', 'haiku'], {
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env, HOME: process.env.HOME || '/root' },
    });

    let stdout = '';
    child.stdout.on('data', (d) => { stdout += d; });
    child.stderr.on('data', () => {});

    const timer = setTimeout(() => {
      console.log('[CLAUDE-APPROVE] Timeout');
      child.kill('SIGTERM');
      done(null);
    }, AI_TIMEOUT_MS);

    child.on('close', (code) => {
      clearTimeout(timer);
      if (code !== 0) {
        console.log(`[CLAUDE-APPROVE] Exit code: ${code}`);
        done(null);
        return;
      }
      const result = stdout.trim();
      console.log(`[CLAUDE-APPROVE] Result: ${result.slice(0, 200)}`);
      done(result || null);
    });

    child.on('error', (err) => {
      clearTimeout(timer);
      console.log(`[CLAUDE-APPROVE] Error: ${err.message}`);
      done(null);
    });
  });
}

function parseNumberList(text, maxIdx) {
  const numbers = text.match(/\d+/g);
  if (!numbers) return [];

  return [...new Set(numbers.map(Number))]
    .filter(n => n >= 0 && n < maxIdx)
    .sort((a, b) => a - b);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function findSkillsInData(data, owner, repo) {
  for (const section of data.sections) {
    const found = section.repos.find(
      r => r.owner.toLowerCase() === owner.toLowerCase()
        && r.repo.toLowerCase() === repo.toLowerCase(),
    );
    if (found && found.skills && found.skills.length > 0) {
      return found.skills;
    }
  }
  return null;
}
