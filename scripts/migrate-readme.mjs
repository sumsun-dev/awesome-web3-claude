/**
 * migrate-readme.mjs
 * README.md (ko) + README_EN.md (en) 파싱 → data/repos.json 생성
 * 일회성 마이그레이션 스크립트
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Octokit } from '@octokit/rest';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// Section mapping: heading text → id + group
const SECTION_MAP_KO = {
  '스킬 & 플러그인 — 보안 & 감사': { id: 'skills-security', group: 'claude-code-native' },
  '스킬 & 플러그인 — 프로토콜별': { id: 'skills-protocol', group: 'claude-code-native' },
  '스킬 & 플러그인 — 범용 Web3 규칙': { id: 'skills-general', group: 'claude-code-native' },
  'MCP 서버 — 온체인 데이터 & 분석': { id: 'mcp-onchain-data', group: 'claude-code-native' },
  'MCP 서버 — 스마트 컨트랙트 & DeFi': { id: 'mcp-smart-contract', group: 'claude-code-native' },
  '스마트 컨트랙트 개발 도구': { id: 'dev-tools', group: 'compatible-tools' },
  'AI 에이전트 프레임워크 — 온체인': { id: 'ai-agents', group: 'compatible-tools' },
  '학습 & 레퍼런스': { id: 'learning', group: 'compatible-tools' },
};

const SECTION_MAP_EN = {
  'Skills & Plugins — Security & Auditing': 'skills-security',
  'Skills & Plugins — Protocol-Specific': 'skills-protocol',
  'Skills & Plugins — General Web3 Rules': 'skills-general',
  'MCP Servers — Onchain Data & Analytics': 'mcp-onchain-data',
  'MCP Servers — Smart Contract & DeFi': 'mcp-smart-contract',
  'Smart Contract Development Tools': 'dev-tools',
  'AI Agent Frameworks — Onchain': 'ai-agents',
  'Learning & Reference': 'learning',
};

// Section titles for generate
const SECTION_TITLES = {
  'skills-security': { ko: '스킬 & 플러그인 — 보안 & 감사', en: 'Skills & Plugins — Security & Auditing' },
  'skills-protocol': { ko: '스킬 & 플러그인 — 프로토콜별', en: 'Skills & Plugins — Protocol-Specific' },
  'skills-general': { ko: '스킬 & 플러그인 — 범용 Web3 규칙', en: 'Skills & Plugins — General Web3 Rules' },
  'mcp-onchain-data': { ko: 'MCP 서버 — 온체인 데이터 & 분석', en: 'MCP Servers — Onchain Data & Analytics' },
  'mcp-smart-contract': { ko: 'MCP 서버 — 스마트 컨트랙트 & DeFi', en: 'MCP Servers — Smart Contract & DeFi' },
  'dev-tools': { ko: '스마트 컨트랙트 개발 도구', en: 'Smart Contract Development Tools' },
  'ai-agents': { ko: 'AI 에이전트 프레임워크 — 온체인', en: 'AI Agent Frameworks — Onchain' },
  'learning': { ko: '학습 & 레퍼런스', en: 'Learning & Reference' },
};

/**
 * Parse a single README into sections with repos
 */
function parseReadme(content, sectionMap, lang) {
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const sections = [];
  let currentSection = null;
  let inTable = false;

  for (const line of lines) {
    // Detect ## headings (section titles)
    const headingMatch = line.match(/^## (.+)$/);
    if (headingMatch) {
      const heading = headingMatch[1].trim();
      const sectionInfo = sectionMap[heading];
      if (sectionInfo) {
        const { id, group } = typeof sectionInfo === 'string'
          ? { id: sectionInfo, group: null }
          : sectionInfo;
        currentSection = { id, group, repos: [] };
        sections.push(currentSection);
        inTable = false;
      } else {
        currentSection = null;
        inTable = false;
      }
      continue;
    }

    // Skip table header and separator
    if (!currentSection) continue;
    if (line.match(/^\|[\s:]*-+/)) { inTable = true; continue; }
    if (line.match(/^\|\s*(레포지토리|Repository)\s*\|/)) { inTable = false; continue; }

    // Parse table data rows
    if (inTable && line.startsWith('|')) {
      const repo = parseTableRow(line, lang);
      if (repo) currentSection.repos.push(repo);
    }
  }

  return sections;
}

/**
 * Parse a single table row into repo data
 */
function parseTableRow(line, lang) {
  // Split by | and trim
  const cells = line.split('|').slice(1, -1).map(c => c.trim());
  if (cells.length < 5) return null;

  const [repoCell, , typeCell, dateCell, descCell] = cells;

  // Extract owner/repo from link: [owner/repo](https://github.com/owner/repo)
  const linkMatch = repoCell.match(/\[([^\]]+)\]\(https:\/\/github\.com\/([^/]+)\/([^)]+)\)/);
  if (!linkMatch) return null;

  const owner = linkMatch[2];
  const repo = linkMatch[3];

  // Type: `Official` or `Community`
  const typeMatch = typeCell.match(/`(Official|Community)`/);
  const type = typeMatch ? typeMatch[1] : 'Community';

  // Date: '26.02 format
  const dateMatch = dateCell.match(/'(\d{2})\.(\d{2})/);
  const addedDate = dateMatch
    ? `20${dateMatch[1]}-${dateMatch[2]}-01`
    : '2026-01-01';

  return {
    owner,
    repo,
    type,
    addedDate,
    description: descCell,
    lang,
  };
}

/**
 * Merge ko and en parsed data into final repos.json structure
 */
function mergeLanguages(koSections, enSections) {
  const sections = [];

  for (const koSection of koSections) {
    const enSection = enSections.find(s => s.id === koSection.id);
    const title = SECTION_TITLES[koSection.id];

    const repos = koSection.repos.map((koRepo, i) => {
      const enRepo = enSection?.repos[i];
      return {
        owner: koRepo.owner,
        repo: koRepo.repo,
        type: koRepo.type,
        addedDate: koRepo.addedDate,
        description: {
          ko: koRepo.description,
          en: enRepo?.description || koRepo.description,
        },
        status: 'active',
        health: {
          stars: 0,
          starsPrev: 0,
          archived: false,
          lastPush: null,
          exists: true,
        },
      };
    });

    sections.push({
      id: koSection.id,
      group: koSection.group,
      title: title || { ko: koSection.id, en: koSection.id },
      description: { ko: null, en: null },
      repos,
    });
  }

  return sections;
}

/**
 * Fetch health data from GitHub API for all repos
 */
async function fetchHealthData(sections) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.log('⚠ GITHUB_TOKEN not set, skipping health data fetch');
    return;
  }

  const octokit = new Octokit({ auth: token });
  let count = 0;

  for (const section of sections) {
    for (const repo of section.repos) {
      try {
        const { data } = await octokit.rest.repos.get({
          owner: repo.owner,
          repo: repo.repo,
        });
        repo.health.stars = data.stargazers_count;
        repo.health.starsPrev = data.stargazers_count;
        repo.health.archived = data.archived;
        repo.health.lastPush = data.pushed_at;
        repo.health.exists = true;
        count++;
        if (count % 10 === 0) console.log(`  fetched ${count} repos...`);
      } catch (err) {
        if (err.status === 404) {
          repo.health.exists = false;
          console.log(`  ✗ ${repo.owner}/${repo.repo}: 404 Not Found`);
        } else {
          console.log(`  ✗ ${repo.owner}/${repo.repo}: ${err.message}`);
        }
        count++;
      }
    }
  }

  console.log(`✓ Fetched health data for ${count} repos`);
}

// Section descriptions (blockquote before table)
const SECTION_DESCRIPTIONS = {
  'mcp-onchain-data': {
    ko: 'Claude Code에서 온체인 데이터를 직접 조회할 수 있게 해주는 MCP 서버.',
    en: 'MCP servers that let Claude Code query onchain data directly.',
  },
  'mcp-smart-contract': {
    ko: '스마트 컨트랙트 분석, 디컴파일, DeFi 프로토콜 접근.',
    en: 'Smart contract analysis, decompilation, and DeFi protocol access.',
  },
  'dev-tools': {
    ko: 'Claude Code가 Bash를 통해 직접 실행 가능한 핵심 CLI 도구.',
    en: 'Core CLI tools directly executable by Claude Code via Bash.',
  },
  'ai-agents': {
    ko: '온체인 트랜잭션을 자율적으로 실행하는 AI 에이전트 프레임워크.',
    en: 'Frameworks for AI agents that autonomously execute onchain transactions.',
  },
  'learning': {
    ko: 'AI 코딩 에이전트를 활용한 Web3 개발 학습 자료.',
    en: 'Resources for learning Web3 development with AI coding agents.',
  },
};

async function main() {
  console.log('=== Migrating README → repos.json ===\n');

  const koContent = readFileSync(resolve(ROOT, 'README.md'), 'utf-8');
  const enContent = readFileSync(resolve(ROOT, 'README_EN.md'), 'utf-8');

  console.log('Parsing README.md (ko)...');
  const koSections = parseReadme(koContent, SECTION_MAP_KO, 'ko');
  const koTotal = koSections.reduce((sum, s) => sum + s.repos.length, 0);
  console.log(`  Found ${koSections.length} sections, ${koTotal} repos`);

  console.log('Parsing README_EN.md (en)...');
  const enSections = parseReadme(enContent, SECTION_MAP_EN, 'en');
  const enTotal = enSections.reduce((sum, s) => sum + s.repos.length, 0);
  console.log(`  Found ${enSections.length} sections, ${enTotal} repos`);

  if (koTotal !== enTotal) {
    console.error(`✗ Mismatch: ko=${koTotal}, en=${enTotal}`);
    process.exit(1);
  }

  console.log('\nMerging languages...');
  const sections = mergeLanguages(koSections, enSections);

  // Add section descriptions
  for (const section of sections) {
    const desc = SECTION_DESCRIPTIONS[section.id];
    if (desc) {
      section.description = desc;
    }
  }

  console.log('Fetching health data from GitHub API...');
  await fetchHealthData(sections);

  const totalEntries = sections.reduce((sum, s) => sum + s.repos.length, 0);
  const reposJson = {
    metadata: {
      lastUpdated: new Date().toISOString(),
      totalEntries,
    },
    sections,
  };

  const outPath = resolve(ROOT, 'data', 'repos.json');
  writeFileSync(outPath, JSON.stringify(reposJson, null, 2) + '\n', 'utf-8');
  console.log(`\n✓ Written ${outPath}`);
  console.log(`  Total: ${totalEntries} entries across ${sections.length} sections`);

  // Print summary
  for (const s of sections) {
    console.log(`  - ${s.id}: ${s.repos.length} repos (${s.group})`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
