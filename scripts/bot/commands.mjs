/**
 * commands.mjs
 * Bot command handlers: /help, /list, /stats, /section, /search, /find, /add, /remove, /move, /edit
 */

import { SECTION_ORDER, SECTION_LABELS } from '../config.mjs';
import { sendMessage, sendLongMessage, sendChatAction, escapeHtml } from './telegram-api.mjs';
import { fetchReposJson, findRepo, getExistingSet } from './repos-reader.mjs';
import { setSession, clearSession } from './state.mjs';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const VALID_GITHUB_NAME = /^[a-zA-Z0-9_.-]+$/;

/**
 * Route incoming text command to handler
 */
export async function routeCommand(chatId, text) {
  const [cmd, ...args] = text.trim().split(/\s+/);
  const command = cmd.toLowerCase();
  const arg = args.join(' ');

  switch (command) {
    case '/start':
    case '/help':
      return handleHelp(chatId);
    case '/list':
      return handleList(chatId);
    case '/stats':
      return handleStats(chatId);
    case '/section':
      return handleSection(chatId, arg);
    case '/search':
      return handleSearch(chatId, arg);
    case '/find':
      return handleFind(chatId, arg);
    case '/add':
      return handleAdd(chatId, arg);
    case '/remove':
      return handleRemove(chatId, arg);
    case '/move':
      return handleMove(chatId, arg);
    case '/edit':
      return handleEdit(chatId, arg);
    default:
      return sendMessage(chatId, `알 수 없는 명령어입니다. /help 로 사용 가능한 명령어를 확인하세요.`);
  }
}

// ---------------------------------------------------------------------------
// /help
// ---------------------------------------------------------------------------

async function handleHelp(chatId) {
  const sectionList = SECTION_ORDER.map(id => `  <code>${id}</code> — ${escapeHtml(SECTION_LABELS[id])}`).join('\n');

  const text = `<b>awesome-web3-claude 관리 봇</b>

<b>조회</b>
/list — 전체 레포 목록
/stats — 통계 (섹션별 분포, 최근 추가)
/section [id] — 섹션별 상세 목록

<b>검색</b>
/search &lt;keyword&gt; — 기존 목록에서 검색
/find &lt;keyword&gt; — GitHub에서 실시간 검색

<b>관리</b>
/add &lt;owner/repo&gt; — 레포 추가
/remove &lt;owner/repo&gt; — 레포 삭제
/move &lt;owner/repo&gt; — 섹션 이동
/edit &lt;owner/repo&gt; — 설명 수정

<b>섹션 ID 목록</b>
${sectionList}`;

  return sendMessage(chatId, text);
}

// ---------------------------------------------------------------------------
// /list
// ---------------------------------------------------------------------------

async function handleList(chatId) {
  await sendChatAction(chatId);
  const data = await fetchReposJson();

  let text = `<b>awesome-web3-claude 전체 목록</b>\n`;
  text += `총 ${data.metadata.totalEntries}개 레포\n\n`;

  for (const sectionId of SECTION_ORDER) {
    const section = data.sections.find(s => s.id === sectionId);
    if (!section || section.repos.length === 0) continue;

    text += `<b>${escapeHtml(SECTION_LABELS[sectionId])}</b> (${section.repos.length})\n`;
    for (const r of section.repos) {
      const skillBadge = r.skills?.length ? ` (${r.skills.length} skills)` : '';
      text += `  <a href="https://github.com/${r.owner}/${r.repo}">${escapeHtml(r.owner)}/${escapeHtml(r.repo)}</a>${skillBadge}\n`;
    }
    text += '\n';
  }

  return sendLongMessage(chatId, text);
}

// ---------------------------------------------------------------------------
// /stats
// ---------------------------------------------------------------------------

async function handleStats(chatId) {
  await sendChatAction(chatId);
  const data = await fetchReposJson();

  let official = 0;
  let community = 0;
  let totalSkills = 0;
  const sectionCounts = {};
  const allRepos = [];

  for (const section of data.sections) {
    sectionCounts[section.id] = section.repos.length;
    for (const r of section.repos) {
      if (r.type === 'Official') official++;
      else community++;
      if (r.skills) totalSkills += r.skills.length;
      allRepos.push(r);
    }
  }

  // Recent 5 by addedDate
  allRepos.sort((a, b) => (b.addedDate || '').localeCompare(a.addedDate || ''));
  const recent = allRepos.slice(0, 5);

  let text = `<b>통계</b>\n\n`;
  text += `총 레포: <b>${data.metadata.totalEntries}</b>\n`;
  text += `총 스킬: <b>${totalSkills}</b>\n`;
  text += `Official: ${official} / Community: ${community}\n\n`;

  text += `<b>섹션별 분포</b>\n`;
  for (const sectionId of SECTION_ORDER) {
    const count = sectionCounts[sectionId] || 0;
    const bar = '█'.repeat(Math.min(count, 20));
    text += `${escapeHtml(SECTION_LABELS[sectionId])}: ${count} ${bar}\n`;
  }

  text += `\n<b>최근 추가 5개</b>\n`;
  for (const r of recent) {
    text += `  ${r.addedDate || '?'} <a href="https://github.com/${r.owner}/${r.repo}">${escapeHtml(r.owner)}/${escapeHtml(r.repo)}</a>\n`;
  }

  return sendMessage(chatId, text);
}

// ---------------------------------------------------------------------------
// /section [id]
// ---------------------------------------------------------------------------

async function handleSection(chatId, sectionId) {
  if (!sectionId) {
    // Show section selection keyboard
    const keyboard = SECTION_ORDER.map(id => ([{
      text: `${SECTION_LABELS[id]}`,
      callback_data: `cmd_view:${id}`,
    }]));
    return sendMessage(chatId, '섹션을 선택하세요:', { inline_keyboard: keyboard });
  }

  if (!SECTION_ORDER.includes(sectionId)) {
    return sendMessage(chatId, `알 수 없는 섹션 ID: <code>${escapeHtml(sectionId)}</code>\n/help 에서 섹션 목록을 확인하세요.`);
  }

  return sendSectionDetail(chatId, sectionId);
}

/**
 * Shared: render a section's detailed repo list
 */
export async function sendSectionDetail(chatId, sectionId) {
  await sendChatAction(chatId);
  const data = await fetchReposJson();
  const section = data.sections.find(s => s.id === sectionId);

  if (!section || section.repos.length === 0) {
    return sendMessage(chatId, `<b>${escapeHtml(SECTION_LABELS[sectionId])}</b>\n\n레포가 없습니다.`);
  }

  let text = `<b>${escapeHtml(SECTION_LABELS[sectionId])}</b> (${section.repos.length}개)\n\n`;
  for (const r of section.repos) {
    const stars = r.health?.stars ? ` ⭐${r.health.stars}` : '';
    const desc = r.description?.ko || r.description?.en || '';
    text += `<a href="https://github.com/${r.owner}/${r.repo}">${escapeHtml(r.owner)}/${escapeHtml(r.repo)}</a>${stars}\n`;
    if (desc) text += `  ${escapeHtml(desc)}\n`;
    if (r.skills && r.skills.length > 0) {
      text += `  🔧 ${r.skills.length} skills: ${r.skills.slice(0, 5).map(s => s.name).join(', ')}`;
      if (r.skills.length > 5) text += ` +${r.skills.length - 5}`;
      text += '\n';
    }
    text += '\n';
  }

  return sendLongMessage(chatId, text);
}

// ---------------------------------------------------------------------------
// /search <keyword>
// ---------------------------------------------------------------------------

async function handleSearch(chatId, keyword) {
  if (!keyword) {
    return sendMessage(chatId, '사용법: /search &lt;keyword&gt;');
  }

  await sendChatAction(chatId);
  const data = await fetchReposJson();
  const kw = keyword.toLowerCase();
  const results = [];

  for (const section of data.sections) {
    for (const r of section.repos) {
      const skillText = (r.skills || [])
        .map(s => `${s.name} ${s.description?.ko || ''} ${s.description?.en || ''}`)
        .join(' ');
      const haystack = [
        r.owner, r.repo,
        r.description?.ko || '', r.description?.en || '',
        skillText,
      ].join(' ').toLowerCase();

      if (haystack.includes(kw)) {
        results.push({ ...r, sectionId: section.id });
      }
    }
  }

  if (results.length === 0) {
    return sendMessage(chatId, `"${escapeHtml(keyword)}" 검색 결과 없음`);
  }

  let text = `<b>검색: "${escapeHtml(keyword)}"</b> (${results.length}건)\n\n`;
  for (const r of results) {
    const label = SECTION_LABELS[r.sectionId] || r.sectionId;
    const desc = r.description?.ko || r.description?.en || '';
    text += `<a href="https://github.com/${r.owner}/${r.repo}">${escapeHtml(r.owner)}/${escapeHtml(r.repo)}</a> [${escapeHtml(label)}]\n`;
    if (desc) text += `  ${escapeHtml(desc)}\n`;
    text += '\n';
  }

  return sendLongMessage(chatId, text);
}

// ---------------------------------------------------------------------------
// /find <keyword> — GitHub Search API
// ---------------------------------------------------------------------------

async function handleFind(chatId, keyword) {
  if (!keyword) {
    return sendMessage(chatId, '사용법: /find &lt;keyword&gt;\nGitHub에서 Web3+Claude 관련 레포를 실시간 검색합니다.');
  }

  await sendChatAction(chatId);

  const query = `${keyword} topic:web3 OR topic:mcp OR topic:claude`;
  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&per_page=10`;

  const res = await fetch(url, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!res.ok) {
    return sendMessage(chatId, `GitHub Search API 오류: ${res.status}`);
  }

  const result = await res.json();
  if (!result.items || result.items.length === 0) {
    return sendMessage(chatId, `"${escapeHtml(keyword)}" GitHub 검색 결과 없음`);
  }

  const existing = await getExistingSet();

  let text = `<b>GitHub 검색: "${escapeHtml(keyword)}"</b> (상위 ${result.items.length}개)\n\n`;
  for (const item of result.items) {
    const fullName = `${item.owner.login}/${item.name}`.toLowerCase();
    const badge = existing.has(fullName) ? ' [이미 등록]' : '';
    const desc = item.description || '';

    text += `<a href="${item.html_url}">${escapeHtml(item.full_name)}</a> ⭐${item.stargazers_count}${badge}\n`;
    if (desc) text += `  ${escapeHtml(desc.slice(0, 100))}\n`;
    if (!existing.has(fullName)) {
      text += `  /add ${escapeHtml(item.full_name)}\n`;
    }
    text += '\n';
  }

  return sendLongMessage(chatId, text);
}

// ---------------------------------------------------------------------------
// /add <owner/repo> or <github-url>
// ---------------------------------------------------------------------------

async function handleAdd(chatId, input) {
  if (!input) {
    return sendMessage(chatId, '사용법: /add &lt;owner/repo&gt; 또는 /add &lt;github-url&gt;');
  }

  const parsed = parseRepoInput(input);
  if (!parsed) {
    return sendMessage(chatId, '올바른 형식: /add owner/repo 또는 /add https://github.com/owner/repo');
  }
  const { owner, repo } = parsed;

  await sendChatAction(chatId);

  // Check duplicate
  const existingResult = await findRepo(owner, repo);
  if (existingResult) {
    const label = SECTION_LABELS[existingResult.section.id] || existingResult.section.id;
    return sendMessage(chatId, `이미 등록됨: <b>${escapeHtml(owner)}/${escapeHtml(repo)}</b>\n섹션: ${escapeHtml(label)}`);
  }

  // Verify repo exists on GitHub
  const ghRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!ghRes.ok) {
    return sendMessage(chatId, `GitHub에서 레포를 찾을 수 없음: ${escapeHtml(owner)}/${escapeHtml(repo)}`);
  }

  const repoInfo = await ghRes.json();

  // Save session and show section selection
  setSession(chatId, {
    command: 'add',
    step: 'select_section',
    owner,
    repo,
    repoInfo: {
      description: repoInfo.description,
      stars: repoInfo.stargazers_count,
      language: repoInfo.language,
      topics: repoInfo.topics,
    },
  });

  const keyboard = SECTION_ORDER.map(id => ([{
    text: SECTION_LABELS[id],
    callback_data: `cmd_sec:${id}`,
  }]));
  keyboard.push([{ text: '취소', callback_data: 'cmd_confirm:no' }]);

  const desc = repoInfo.description ? `\n${escapeHtml(repoInfo.description)}` : '';
  return sendMessage(chatId,
    `<b>${escapeHtml(owner)}/${escapeHtml(repo)}</b> ⭐${repoInfo.stargazers_count}${desc}\n\n섹션을 선택하세요:`,
    { inline_keyboard: keyboard },
  );
}

// ---------------------------------------------------------------------------
// /remove <owner/repo>
// ---------------------------------------------------------------------------

async function handleRemove(chatId, input) {
  if (!input) {
    return sendMessage(chatId, '사용법: /remove &lt;owner/repo&gt;');
  }

  const parsed = parseRepoInput(input);
  if (!parsed) {
    return sendMessage(chatId, '올바른 형식: /remove owner/repo');
  }
  const { owner, repo } = parsed;

  await sendChatAction(chatId);

  const result = await findRepo(owner, repo);
  if (!result) {
    return sendMessage(chatId, `등록되지 않은 레포: ${escapeHtml(owner)}/${escapeHtml(repo)}`);
  }

  const label = SECTION_LABELS[result.section.id] || result.section.id;
  setSession(chatId, { command: 'remove', step: 'confirm', owner, repo });

  return sendMessage(chatId,
    `<b>${escapeHtml(owner)}/${escapeHtml(repo)}</b>\n현재 섹션: ${escapeHtml(label)}\n\n삭제하시겠습니까?`,
    { inline_keyboard: [[
      { text: 'Yes, 삭제', callback_data: 'cmd_confirm:yes' },
      { text: '취소', callback_data: 'cmd_confirm:no' },
    ]] },
  );
}

// ---------------------------------------------------------------------------
// /move <owner/repo>
// ---------------------------------------------------------------------------

async function handleMove(chatId, input) {
  if (!input) {
    return sendMessage(chatId, '사용법: /move &lt;owner/repo&gt;');
  }

  const parsed = parseRepoInput(input);
  if (!parsed) {
    return sendMessage(chatId, '올바른 형식: /move owner/repo');
  }
  const { owner, repo } = parsed;

  await sendChatAction(chatId);

  const result = await findRepo(owner, repo);
  if (!result) {
    return sendMessage(chatId, `등록되지 않은 레포: ${escapeHtml(owner)}/${escapeHtml(repo)}`);
  }

  const currentLabel = SECTION_LABELS[result.section.id] || result.section.id;
  setSession(chatId, {
    command: 'move',
    step: 'select_section',
    owner,
    repo,
    fromSectionId: result.section.id,
  });

  const keyboard = SECTION_ORDER
    .filter(id => id !== result.section.id)
    .map(id => ([{ text: SECTION_LABELS[id], callback_data: `cmd_sec:${id}` }]));
  keyboard.push([{ text: '취소', callback_data: 'cmd_confirm:no' }]);

  return sendMessage(chatId,
    `<b>${escapeHtml(owner)}/${escapeHtml(repo)}</b>\n현재: ${escapeHtml(currentLabel)}\n\n이동할 섹션을 선택하세요:`,
    { inline_keyboard: keyboard },
  );
}

// ---------------------------------------------------------------------------
// /edit <owner/repo>
// ---------------------------------------------------------------------------

async function handleEdit(chatId, input) {
  if (!input) {
    return sendMessage(chatId, '사용법: /edit &lt;owner/repo&gt;');
  }

  const parsed = parseRepoInput(input);
  if (!parsed) {
    return sendMessage(chatId, '올바른 형식: /edit owner/repo');
  }
  const { owner, repo } = parsed;

  await sendChatAction(chatId);

  const result = await findRepo(owner, repo);
  if (!result) {
    return sendMessage(chatId, `등록되지 않은 레포: ${escapeHtml(owner)}/${escapeHtml(repo)}`);
  }

  const descKo = result.repo.description?.ko || '(없음)';
  const descEn = result.repo.description?.en || '(없음)';

  setSession(chatId, { command: 'edit', step: 'confirm', owner, repo });

  return sendMessage(chatId,
    `<b>${escapeHtml(owner)}/${escapeHtml(repo)}</b>\n\n현재 설명 (한국어):\n${escapeHtml(descKo)}\n\n현재 설명 (영어):\n${escapeHtml(descEn)}`,
    { inline_keyboard: [[
      { text: 'AI 재생성', callback_data: 'cmd_edit:regen' },
      { text: '취소', callback_data: 'cmd_confirm:no' },
    ]] },
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Parse "owner/repo" or "https://github.com/owner/repo" input
 * Returns { owner, repo } or null
 */
function parseRepoInput(input) {
  let owner, repo;

  // GitHub URL
  const urlMatch = input.match(/github\.com\/([^/\s]+)\/([^/\s#?]+)/);
  if (urlMatch) {
    owner = urlMatch[1];
    repo = urlMatch[2].replace(/\.git$/, '');
  } else if (input.includes('/')) {
    const parts = input.split('/');
    if (parts.length !== 2) return null;
    owner = parts[0].trim();
    repo = parts[1].trim();
  } else {
    return null;
  }

  if (!VALID_GITHUB_NAME.test(owner) || !VALID_GITHUB_NAME.test(repo)) return null;
  return { owner, repo };
}
