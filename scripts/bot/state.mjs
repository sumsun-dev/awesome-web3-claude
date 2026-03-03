/**
 * state.mjs
 * In-memory session management for multi-step bot commands
 * Single admin bot — Map-based storage is sufficient
 */

const SESSION_TTL_MS = 10 * 60 * 1000; // 10 minutes

/** @type {Map<string, { command: string, step: string, owner?: string, repo?: string, sectionId?: string, fromSectionId?: string, descriptionKo?: string, repoInfo?: object, createdAt: number }>} */
const sessions = new Map();

export function setSession(chatId, data) {
  sessions.set(String(chatId), { ...data, createdAt: Date.now() });
}

export function getSession(chatId) {
  const session = sessions.get(String(chatId));
  if (!session) return null;

  if (Date.now() - session.createdAt > SESSION_TTL_MS) {
    sessions.delete(String(chatId));
    return null;
  }
  return session;
}

export function clearSession(chatId) {
  sessions.delete(String(chatId));
}

// Cleanup expired sessions every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, session] of sessions) {
    if (now - session.createdAt > SESSION_TTL_MS) {
      sessions.delete(key);
    }
  }
}, 5 * 60 * 1000).unref();
