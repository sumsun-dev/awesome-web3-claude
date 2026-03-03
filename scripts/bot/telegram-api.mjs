/**
 * telegram-api.mjs
 * Telegram Bot API wrapper functions
 */

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const API_BASE = `https://api.telegram.org/bot${BOT_TOKEN}`;

const MAX_MESSAGE_LENGTH = 4096;

/**
 * Send a message with HTML parse mode
 */
export async function sendMessage(chatId, text, replyMarkup) {
  const body = {
    chat_id: chatId,
    text,
    parse_mode: 'HTML',
    disable_web_page_preview: true,
  };
  if (replyMarkup) body.reply_markup = JSON.stringify(replyMarkup);

  const res = await fetch(`${API_BASE}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json();
}

/**
 * Edit an existing message (supports inline keyboard replacement)
 */
export async function editMessage(chatId, messageId, text, replyMarkup) {
  const body = {
    chat_id: chatId,
    message_id: messageId,
    text,
    parse_mode: 'HTML',
    disable_web_page_preview: true,
    reply_markup: JSON.stringify(replyMarkup || { inline_keyboard: [] }),
  };

  const res = await fetch(`${API_BASE}/editMessageText`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json();
}

/**
 * Answer a callback query (removes loading indicator)
 */
export async function answerCallback(callbackQueryId, text) {
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
 * Send a chat action (e.g., 'typing')
 */
export async function sendChatAction(chatId, action = 'typing') {
  await fetch(`${API_BASE}/sendChatAction`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, action }),
  });
}

/**
 * Send a long message, splitting at 4096 chars if needed
 */
export async function sendLongMessage(chatId, text, replyMarkup) {
  if (text.length <= MAX_MESSAGE_LENGTH) {
    return sendMessage(chatId, text, replyMarkup);
  }

  const chunks = splitMessage(text);
  for (let i = 0; i < chunks.length; i++) {
    const isLast = i === chunks.length - 1;
    await sendMessage(chatId, chunks[i], isLast ? replyMarkup : undefined);
  }
}

/**
 * Split text into chunks respecting newline boundaries
 */
function splitMessage(text) {
  const chunks = [];
  let remaining = text;

  while (remaining.length > MAX_MESSAGE_LENGTH) {
    let splitIdx = remaining.lastIndexOf('\n', MAX_MESSAGE_LENGTH);
    if (splitIdx === -1 || splitIdx < MAX_MESSAGE_LENGTH * 0.5) {
      splitIdx = MAX_MESSAGE_LENGTH;
    }
    chunks.push(remaining.slice(0, splitIdx));
    remaining = remaining.slice(splitIdx).replace(/^\n/, '');
  }

  if (remaining) chunks.push(remaining);
  return chunks;
}

/**
 * Escape HTML special characters for Telegram HTML parse mode
 */
export function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
