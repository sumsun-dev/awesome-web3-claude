/**
 * callbacks.mjs
 * Callback query handlers for both existing (discover) and new (command) flows
 */

import { SECTION_LABELS } from '../config.mjs';
import { answerCallback, editMessage, sendMessage, sendChatAction, escapeHtml } from './telegram-api.mjs';
import { getSession, setSession, clearSession } from './state.mjs';
import { sendSectionDetail } from './commands.mjs';
import { handleApproveCallback } from './approve-publish.mjs';

const VALID_GITHUB_NAME = /^[a-zA-Z0-9_.-]+$/;
const APPROVE_CALLBACKS = new Set(['ape', 'apr', 'apb', 'apc', 'psa', 'psn', 'pss']);
const APPROVE_PREFIXES = ['ap:', 'pst:', 'psp:'];

function isApproveCallback(data) {
  return APPROVE_CALLBACKS.has(data)
    || APPROVE_PREFIXES.some(p => data.startsWith(p));
}

/**
 * Route callback_query to appropriate handler
 * @param {object} callbackQuery - Telegram callback_query object
 * @param {object} deps - { triggerWorkflow, generateKoDescription, extractDescriptionKo }
 */
export async function routeCallback(callbackQuery, deps) {
  const data = callbackQuery.data;

  // approve-publish callbacks: ap:, ape, apr, apb, apc, pst:, psp:, psa, psn, pss
  if (isApproveCallback(data)) {
    return handleApproveCallback(callbackQuery);
  }

  if (data.startsWith('cmd_')) {
    return handleCommandCallback(callbackQuery, deps);
  }

  return handleDiscoverCallback(callbackQuery, deps);
}

// ---------------------------------------------------------------------------
// Legacy discover callbacks (add:owner/repo:sectionId, skip:, keep:, remove:)
// ---------------------------------------------------------------------------

async function handleDiscoverCallback(callbackQuery, { triggerWorkflow, generateKoDescription, extractDescriptionKo }) {
  const data = callbackQuery.data;
  const chatId = callbackQuery.message?.chat?.id;
  const messageId = callbackQuery.message?.message_id;
  const msgText = callbackQuery.message?.text || '';

  const parsed = parseDiscoverCallbackData(data);
  if (!parsed) {
    await answerCallback(callbackQuery.id, '\u274C \uD30C\uC2F1 \uC624\uB958');
    return;
  }

  try {
    switch (parsed.action) {
      case 'add': {
        if (parsed.isHash) {
          await answerCallback(callbackQuery.id, '\u274C \uD574\uC2DC \uCC38\uC870, \uC218\uB3D9 \uCC98\uB9AC \uD544\uC694');
          return;
        }

        let descKo = extractDescriptionKo(msgText);

        if (descKo) {
          await answerCallback(callbackQuery.id, '\u2705 \uCD94\uAC00 \uC694\uCCAD \uC804\uC1A1');
        } else {
          await answerCallback(callbackQuery.id, '\u23F3 \uD55C\uAD6D\uC5B4 \uC124\uBA85 \uC0DD\uC131 \uC911...');
          await editMessage(chatId, messageId,
            msgText + '\n\n\u23F3 <b>\uD55C\uAD6D\uC5B4 \uC124\uBA85 \uC0DD\uC131 \uC911...</b>');
          descKo = await generateKoDescription(parsed.owner, parsed.repo);
        }

        console.log(`[ADD] ${parsed.owner}/${parsed.repo} \u2192 ${parsed.sectionId} (ko: ${descKo || 'fallback'})`);
        await triggerWorkflow('add', parsed.owner, parsed.repo, parsed.sectionId, descKo);
        await editMessage(chatId, messageId,
          msgText +
          '\n\n\u2705 <b>\uCD94\uAC00 \uC2B9\uC778\uB428</b> \u2014 workflow \uC2E4\uD589 \uC911' +
          (descKo ? `\n\uD83D\uDCDD \uC124\uBA85: ${descKo}` : '\n\u26A0\uFE0F \uD55C\uAD6D\uC5B4 \uC124\uBA85 \uC0DD\uC131 \uC2E4\uD328, GitHub description \uC0AC\uC6A9'));
        break;
      }
      case 'remove': {
        if (parsed.isHash) {
          await answerCallback(callbackQuery.id, '\u274C \uD574\uC2DC \uCC38\uC870, \uC218\uB3D9 \uCC98\uB9AC \uD544\uC694');
          return;
        }
        await triggerWorkflow('remove', parsed.owner, parsed.repo, parsed.sectionId);
        await answerCallback(callbackQuery.id, '\uD83D\uDDD1 \uC0AD\uC81C \uC694\uCCAD \uC804\uC1A1');
        await editMessage(chatId, messageId,
          msgText + '\n\n\uD83D\uDDD1 <b>\uC0AD\uC81C \uC2B9\uC778\uB428</b> \u2014 workflow \uC2E4\uD589 \uC911');
        console.log(`[REMOVE] ${parsed.owner}/${parsed.repo}`);
        break;
      }
      case 'skip': {
        await answerCallback(callbackQuery.id, '\u274C \uC2A4\uD0B5 (7\uC77C\uAC04 \uC7AC\uCD94\uCC9C \uC548 \uD568)');
        if (!parsed.isHash && parsed.owner && parsed.repo) {
          await triggerWorkflow('skip', parsed.owner, parsed.repo, parsed.sectionId);
        }
        await editMessage(chatId, messageId,
          msgText + '\n\n\u274C <b>\uC2A4\uD0B5\uB428</b> (7\uC77C \uD6C4 \uC7AC\uCD94\uCC9C \uAC00\uB2A5)');
        console.log(`[SKIP] ${parsed.owner}/${parsed.repo}`);
        break;
      }
      case 'keep': {
        await answerCallback(callbackQuery.id, '\uD83D\uDC4D \uC720\uC9C0 (7\uC77C\uAC04 \uC7AC\uC54C\uB9BC \uC548 \uD568)');
        if (!parsed.isHash && parsed.owner && parsed.repo) {
          await triggerWorkflow('keep', parsed.owner, parsed.repo, parsed.sectionId);
        }
        await editMessage(chatId, messageId,
          msgText + '\n\n\uD83D\uDC4D <b>\uC720\uC9C0\uB428</b> (7\uC77C \uD6C4 \uC7AC\uAC80\uD1A0 \uAC00\uB2A5)');
        console.log(`[KEEP] ${parsed.owner}/${parsed.repo}`);
        break;
      }
      default:
        await answerCallback(callbackQuery.id, '\u2753 \uC54C \uC218 \uC5C6\uB294 \uC561\uC158');
    }
  } catch (err) {
    console.error(`Error handling callback: ${err.message}`);
    await answerCallback(callbackQuery.id, `\u274C \uC624\uB958: ${err.message.slice(0, 100)}`);
  }
}

// ---------------------------------------------------------------------------
// Command callbacks (cmd_*)
// ---------------------------------------------------------------------------

async function handleCommandCallback(callbackQuery, { triggerWorkflow, generateKoDescription }) {
  const data = callbackQuery.data;
  const chatId = callbackQuery.message?.chat?.id;
  const messageId = callbackQuery.message?.message_id;

  try {
    if (data.startsWith('cmd_view:')) {
      const sectionId = data.slice('cmd_view:'.length);
      await answerCallback(callbackQuery.id, SECTION_LABELS[sectionId] || sectionId);
      return sendSectionDetail(chatId, sectionId);
    }

    if (data.startsWith('cmd_confirm:')) {
      const answer = data.slice('cmd_confirm:'.length);
      const session = getSession(chatId);

      if (answer === 'no' || !session) {
        clearSession(chatId);
        await answerCallback(callbackQuery.id, '\uCDE8\uC18C\uB428');
        await editMessage(chatId, messageId,
          (callbackQuery.message?.text || '') + '\n\n\uCDE8\uC18C\uB428');
        return;
      }

      return executeSessionAction(callbackQuery, session, { triggerWorkflow });
    }

    if (data.startsWith('cmd_sec:')) {
      const sectionId = data.slice('cmd_sec:'.length);
      const session = getSession(chatId);

      if (!session) {
        await answerCallback(callbackQuery.id, '\uC138\uC158 \uB9CC\uB8CC\uB428. \uBA85\uB839\uC5B4\uB97C \uB2E4\uC2DC \uC2E4\uD589\uD558\uC138\uC694.');
        return;
      }

      if (session.command === 'add') {
        return handleAddSectionSelected(callbackQuery, session, sectionId, { triggerWorkflow, generateKoDescription });
      }

      if (session.command === 'move') {
        return handleMoveSectionSelected(callbackQuery, session, sectionId, { triggerWorkflow });
      }

      await answerCallback(callbackQuery.id, '\uC54C \uC218 \uC5C6\uB294 \uC138\uC158 \uC0C1\uD0DC');
    }

    if (data === 'cmd_edit:regen') {
      const session = getSession(chatId);
      if (!session || session.command !== 'edit') {
        await answerCallback(callbackQuery.id, '\uC138\uC158 \uB9CC\uB8CC\uB428');
        return;
      }
      return handleEditRegen(callbackQuery, session, { triggerWorkflow, generateKoDescription });
    }
  } catch (err) {
    console.error(`Error handling command callback: ${err.message}`);
    await answerCallback(callbackQuery.id, `\uC624\uB958: ${err.message.slice(0, 100)}`);
  }
}

// ---------------------------------------------------------------------------
// /add flow: section selected
// ---------------------------------------------------------------------------

async function handleAddSectionSelected(callbackQuery, session, sectionId, { triggerWorkflow, generateKoDescription }) {
  const chatId = callbackQuery.message?.chat?.id;
  const messageId = callbackQuery.message?.message_id;
  const { owner, repo, repoInfo } = session;
  const label = SECTION_LABELS[sectionId] || sectionId;

  await answerCallback(callbackQuery.id, `${label} \uC120\uD0DD\uB428`);
  await editMessage(chatId, messageId,
    `<b>${escapeHtml(owner)}/${escapeHtml(repo)}</b>\n\uC139\uC158: ${escapeHtml(label)}\n\n\uD55C\uAD6D\uC5B4 \uC124\uBA85 \uC0DD\uC131 \uC911...`);
  await sendChatAction(chatId);

  const context = repoInfo ? {
    description: repoInfo.description,
    topics: repoInfo.topics,
    language: repoInfo.language,
  } : null;
  const descKo = await generateKoDescription(owner, repo, context);

  setSession(chatId, { ...session, step: 'confirm', sectionId, descriptionKo: descKo });

  await editMessage(chatId, messageId,
    `<b>${escapeHtml(owner)}/${escapeHtml(repo)}</b>\n\uC139\uC158: ${escapeHtml(label)}\n\n\uD55C\uAD6D\uC5B4 \uC124\uBA85:\n${escapeHtml(descKo || '(\uC0DD\uC131 \uC2E4\uD328 \u2014 GitHub description \uC0AC\uC6A9)')}`,
    { inline_keyboard: [[
      { text: 'Yes, \uCD94\uAC00', callback_data: 'cmd_confirm:yes' },
      { text: '\uCDE8\uC18C', callback_data: 'cmd_confirm:no' },
    ]] },
  );
}

// ---------------------------------------------------------------------------
// /move flow: section selected
// ---------------------------------------------------------------------------

async function handleMoveSectionSelected(callbackQuery, session, sectionId, { triggerWorkflow }) {
  const chatId = callbackQuery.message?.chat?.id;
  const messageId = callbackQuery.message?.message_id;
  const { owner, repo, fromSectionId } = session;

  const fromLabel = SECTION_LABELS[fromSectionId] || fromSectionId;
  const toLabel = SECTION_LABELS[sectionId] || sectionId;

  await answerCallback(callbackQuery.id, `${toLabel} \uC120\uD0DD\uB428`);
  setSession(chatId, { ...session, step: 'confirm', sectionId });

  await editMessage(chatId, messageId,
    `<b>${escapeHtml(owner)}/${escapeHtml(repo)}</b>\n\uC774\uB3D9: ${escapeHtml(fromLabel)} \u2192 ${escapeHtml(toLabel)}\n\n\uC9C4\uD589\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?`,
    { inline_keyboard: [[
      { text: 'Yes, \uC774\uB3D9', callback_data: 'cmd_confirm:yes' },
      { text: '\uCDE8\uC18C', callback_data: 'cmd_confirm:no' },
    ]] },
  );
}

// ---------------------------------------------------------------------------
// /edit flow: AI regeneration
// ---------------------------------------------------------------------------

async function handleEditRegen(callbackQuery, session, { triggerWorkflow, generateKoDescription }) {
  const chatId = callbackQuery.message?.chat?.id;
  const messageId = callbackQuery.message?.message_id;
  const { owner, repo } = session;

  await answerCallback(callbackQuery.id, 'AI \uC124\uBA85 \uC7AC\uC0DD\uC131 \uC911...');
  await editMessage(chatId, messageId,
    `<b>${escapeHtml(owner)}/${escapeHtml(repo)}</b>\n\nAI \uC124\uBA85 \uC7AC\uC0DD\uC131 \uC911...`);
  await sendChatAction(chatId);

  const descKo = await generateKoDescription(owner, repo);

  setSession(chatId, { ...session, step: 'confirm', descriptionKo: descKo });

  await editMessage(chatId, messageId,
    `<b>${escapeHtml(owner)}/${escapeHtml(repo)}</b>\n\n\uC0C8 \uC124\uBA85:\n${escapeHtml(descKo || '(\uC0DD\uC131 \uC2E4\uD328)')}`,
    { inline_keyboard: [[
      { text: 'Yes, \uC801\uC6A9', callback_data: 'cmd_confirm:yes' },
      { text: '\uCDE8\uC18C', callback_data: 'cmd_confirm:no' },
    ]] },
  );
}

// ---------------------------------------------------------------------------
// Execute confirmed session action
// ---------------------------------------------------------------------------

async function executeSessionAction(callbackQuery, session, { triggerWorkflow }) {
  const chatId = callbackQuery.message?.chat?.id;
  const messageId = callbackQuery.message?.message_id;
  const { command, owner, repo, sectionId, fromSectionId, descriptionKo } = session;

  clearSession(chatId);

  switch (command) {
    case 'add': {
      await answerCallback(callbackQuery.id, '\uCD94\uAC00 \uC694\uCCAD \uC804\uC1A1');
      await triggerWorkflow('add', owner, repo, sectionId, descriptionKo);
      await editMessage(chatId, messageId,
        `<b>${escapeHtml(owner)}/${escapeHtml(repo)}</b>\n\n\u2705 <b>\uCD94\uAC00 \uC2B9\uC778\uB428</b> \u2014 workflow \uC2E4\uD589 \uC911` +
        (descriptionKo ? `\n\uC124\uBA85: ${escapeHtml(descriptionKo)}` : ''));
      console.log(`[CMD ADD] ${owner}/${repo} \u2192 ${sectionId}`);
      break;
    }
    case 'remove': {
      await answerCallback(callbackQuery.id, '\uC0AD\uC81C \uC694\uCCAD \uC804\uC1A1');
      await triggerWorkflow('remove', owner, repo);
      await editMessage(chatId, messageId,
        `<b>${escapeHtml(owner)}/${escapeHtml(repo)}</b>\n\n\uD83D\uDDD1 <b>\uC0AD\uC81C \uC2B9\uC778\uB428</b> \u2014 workflow \uC2E4\uD589 \uC911`);
      console.log(`[CMD REMOVE] ${owner}/${repo}`);
      break;
    }
    case 'move': {
      await answerCallback(callbackQuery.id, '\uC774\uB3D9 \uC694\uCCAD \uC804\uC1A1');
      await triggerWorkflow('move', owner, repo, sectionId, '', fromSectionId);
      await editMessage(chatId, messageId,
        `<b>${escapeHtml(owner)}/${escapeHtml(repo)}</b>\n\n\uD83D\uDD04 <b>\uC774\uB3D9 \uC2B9\uC778\uB428</b> \u2014 workflow \uC2E4\uD589 \uC911`);
      console.log(`[CMD MOVE] ${owner}/${repo} ${fromSectionId} \u2192 ${sectionId}`);
      break;
    }
    case 'edit': {
      await answerCallback(callbackQuery.id, '\uC124\uBA85 \uC5C5\uB370\uC774\uD2B8 \uC694\uCCAD \uC804\uC1A1');
      await triggerWorkflow('update-desc', owner, repo, '', descriptionKo);
      await editMessage(chatId, messageId,
        `<b>${escapeHtml(owner)}/${escapeHtml(repo)}</b>\n\n\u270F\uFE0F <b>\uC124\uBA85 \uC218\uC815 \uC2B9\uC778\uB428</b> \u2014 workflow \uC2E4\uD589 \uC911` +
        (descriptionKo ? `\n\uC0C8 \uC124\uBA85: ${escapeHtml(descriptionKo)}` : ''));
      console.log(`[CMD EDIT] ${owner}/${repo}`);
      break;
    }
    default:
      await answerCallback(callbackQuery.id, '\uC54C \uC218 \uC5C6\uB294 \uBA85\uB839');
  }
}

// ---------------------------------------------------------------------------
// Parse legacy callback data
// ---------------------------------------------------------------------------

function parseDiscoverCallbackData(data) {
  const parts = data.split(':');
  if (parts.length < 2) return null;

  const action = parts[0];
  if (!['add', 'skip', 'keep', 'remove'].includes(action)) return null;

  const repoOrHash = parts[1];
  const sectionId = parts[2] || null;

  if (/^[a-f0-9]{8}$/.test(repoOrHash)) {
    return { action, hash: repoOrHash, sectionId, isHash: true };
  }

  const slashIdx = repoOrHash.indexOf('/');
  if (slashIdx === -1) return null;

  const owner = repoOrHash.slice(0, slashIdx);
  const repo = repoOrHash.slice(slashIdx + 1);

  if (!VALID_GITHUB_NAME.test(owner) || !VALID_GITHUB_NAME.test(repo)) return null;

  return { action, owner, repo, sectionId, isHash: false };
}
