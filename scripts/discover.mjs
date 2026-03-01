/**
 * discover.mjs
 * GitHub Search API로 신규 Web3 Claude Code 레포 탐색 + 기존 엔트리 health check
 * 출력: data/discover-results.json
 *
 * 핵심 필터: Web3/블록체인 관련성 + Claude Code 활용 가능성
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Octokit } from '@octokit/rest';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
if (!GITHUB_TOKEN) {
  console.error('✗ GITHUB_TOKEN is required');
  process.exit(1);
}

const octokit = new Octokit({ auth: GITHUB_TOKEN });

// ---------------------------------------------------------------------------
// 검색 쿼리 — Web3 + Claude Code/MCP 교집합에 집중
// ---------------------------------------------------------------------------
const SEARCH_QUERIES = [
  // Claude Code Skills (Web3 특화)
  'SKILL.md solidity',
  'SKILL.md ethereum',
  'SKILL.md web3',
  'claude skills smart contract',
  'claude-code blockchain topic:claude-code',
  // MCP 서버 (Web3 특화)
  'mcp server ethereum solidity',
  'mcp server blockchain onchain',
  'mcp server defi swap',
  'mcp server solana token',
  'mcp server web3 wallet',
  'mcp-server topic:ethereum',
  'mcp-server topic:solana',
  'mcp-server topic:defi',
  'mcp-server topic:web3',
  // AI 에이전트 (온체인)
  'AI agent onchain transaction',
];

// Minimum criteria
const MIN_STARS = 5;
const MAX_STALE_MONTHS = 3;
const HEALTH_STALE_MONTHS = 6;

// ---------------------------------------------------------------------------
// Web3 관련성 판단 — description, topics, README에서 키워드 매칭
// ---------------------------------------------------------------------------

// Web3/블록체인 필수 키워드 (하나 이상 포함해야 함)
const WEB3_KEYWORDS = [
  'web3', 'blockchain', 'ethereum', 'solana', 'solidity',
  'smart contract', 'smartcontract', 'defi', 'nft', 'evm',
  'onchain', 'on-chain', 'dapp', 'dex', 'token', 'wallet',
  'crypto', 'cryptocurrency', 'layer2', 'l2', 'rollup',
  'zk-proof', 'zkp', 'foundry', 'hardhat', 'vyper', 'openzeppelin',
  'erc-20', 'erc20', 'erc-721', 'erc721', 'erc-4337',
  'uniswap', 'aave', 'chainlink', 'ipfs', 'abi',
  'metamask', 'wagmi', 'viem', 'ethers', 'web3.js',
  'bitcoin', 'lightning', 'staking', 'bridge', 'cross-chain',
  'cosmos', 'polkadot', 'avalanche', 'arbitrum', 'optimism', 'base',
  'polygon', 'bnb', 'binance',
];

// Claude Code / MCP / AI Agent 키워드 (하나 이상 포함 시 가산점)
const CLAUDE_KEYWORDS = [
  'claude', 'claude-code', 'mcp', 'model context protocol',
  'skill.md', 'skills', 'ai agent', 'ai-agent', 'llm',
  'copilot', 'codex', 'coding agent',
];

// 명시적 제외 패턴 (Web3와 무관한 레포)
const EXCLUDE_PATTERNS = [
  /badge/i, /readme.*profile/i, /free-for-dev/i,
  /awesome-rust$/i, /awesome-python$/i, /awesome-go$/i,
  /chatgpt.*repositor/i, /scraping/i, /markdown-badge/i,
];

/**
 * Web3 관련성 점수 계산 (0~100)
 * description + topics + repo name 기반
 */
function calcWeb3Score(candidate) {
  const text = [
    candidate.description,
    candidate.topics.join(' '),
    candidate.fullName,
  ].join(' ').toLowerCase();

  // 제외 패턴 체크
  for (const pat of EXCLUDE_PATTERNS) {
    if (pat.test(text) || pat.test(candidate.fullName)) return -1;
  }

  let web3Hits = 0;
  let claudeHits = 0;

  for (const kw of WEB3_KEYWORDS) {
    if (text.includes(kw.toLowerCase())) web3Hits++;
  }
  for (const kw of CLAUDE_KEYWORDS) {
    if (text.includes(kw.toLowerCase())) claudeHits++;
  }

  // Web3 키워드 0개면 무조건 탈락
  if (web3Hits === 0) return 0;

  // 점수: Web3 키워드 히트 * 10 + Claude 키워드 히트 * 15 (최대 100)
  const score = Math.min(100, web3Hits * 10 + claudeHits * 15);
  return score;
}

// ---------------------------------------------------------------------------
// 신뢰 지표용 알려진 조직
// ---------------------------------------------------------------------------
const TRUSTED_ORGS = new Set([
  'trailofbits', 'openzeppelin', 'foundry-rs', 'crytic', 'consensys',
  'uniswap', 'aave', 'chainlink', 'solana-foundation', 'coinbase',
  'alchemyplatform', 'thirdweb-dev', 'cyfrin', 'a16z',
  'moralisweb3', 'bankless', 'getAlby', 'debridge-finance',
  'noditlabs', 'heurist-network', 'trustwallet', 'goat-sdk',
  'scaffold-eth', 'elizaos', 'sendaifun',
]);

// ---------------------------------------------------------------------------
// README 분석 — 설명 추출 + 기능 키워드 감지
// ---------------------------------------------------------------------------
async function analyzeReadme(owner, repo) {
  try {
    const { data } = await octokit.rest.repos.getReadme({ owner, repo });
    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    const lines = content.split('\n');

    // 1. 첫 의미있는 텍스트 단락 추출
    const textLines = [];
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) { if (textLines.length > 0) break; continue; }
      if (trimmed.startsWith('#')) continue;
      if (trimmed.startsWith('[![')) continue;
      if (trimmed.startsWith('![')) continue;
      if (/^<[a-z]/.test(trimmed)) continue;
      if (trimmed.startsWith('---')) continue;
      if (/^[═╔║╚█▓░┌│└─┐┘]/.test(trimmed)) continue; // ASCII art
      if (trimmed.startsWith('```')) continue;
      textLines.push(trimmed);
      if (textLines.length >= 4) break;
    }
    const excerpt = textLines.join(' ').replace(/[*_`>]/g, '').slice(0, 400) || null;

    // 2. README 전체 텍스트에서 기능 신호 감지
    const lower = content.toLowerCase();
    const signals = {
      hasMcpConfig: /mcp|model.context.protocol/.test(lower),
      hasSkillMd: /skill\.md/.test(lower),
      hasInstallGuide: /install|npm install|pip install|cargo install|getting started/.test(lower),
      hasTests: /test|jest|mocha|vitest|pytest/.test(lower),
      hasCI: /github.actions|\.github\/workflows|ci\/cd/.test(lower),
      hasSecurity: /security|audit|vulnerability|slither|mythril/.test(lower),
      hasLicense: /license|mit|apache|gpl|isc|bsd/.test(lower),
      lineCount: lines.length,
    };

    return { excerpt, signals };
  } catch {
    return { excerpt: null, signals: {} };
  }
}

// ---------------------------------------------------------------------------
// 후보 심층 분석 — GitHub API 메타데이터 + README 분석 + 신뢰 평가
// ---------------------------------------------------------------------------
async function deepAnalyze(candidate) {
  const { owner, repo } = candidate;

  // 1. 상세 레포 정보
  try {
    const { data } = await octokit.rest.repos.get({ owner, repo });
    candidate.meta = {
      forks: data.forks_count,
      openIssues: data.open_issues_count,
      watchers: data.watchers_count,
      license: data.license?.spdx_id || null,
      ownerType: data.owner.type, // 'Organization' or 'User'
      defaultBranch: data.default_branch,
      createdAt: data.created_at,
      size: data.size,
    };
  } catch {
    candidate.meta = {};
  }

  // 2. 기여자 수 (가볍게)
  try {
    const { data: contribs } = await octokit.rest.repos.listContributors({
      owner, repo, per_page: 5,
    });
    candidate.meta.contributors = contribs.length;
    candidate.meta.topContributor = contribs[0]?.login || null;
  } catch {
    candidate.meta.contributors = 0;
  }

  // 3. README 분석
  const { excerpt, signals } = await analyzeReadme(owner, repo);
  candidate.readmeExcerpt = excerpt;
  candidate.readmeSignals = signals;

  // 4. 신뢰도 점수 계산 (0~5)
  candidate.trustScore = calcTrustScore(candidate);

  // 5. Claude Code 호환성 평가
  candidate.claudeCompat = assessClaudeCompat(candidate);

  // 6. 추천 등급
  candidate.recommendation = calcRecommendation(candidate);

  await new Promise(r => setTimeout(r, 300));
}

/**
 * 신뢰도 점수 (0~5)
 */
function calcTrustScore(c) {
  let score = 0;
  const m = c.meta || {};
  const s = c.readmeSignals || {};

  // 조직 계정 (+1)
  if (m.ownerType === 'Organization') score++;
  // 알려진 조직 (+1)
  if (TRUSTED_ORGS.has(c.owner.toLowerCase())) score++;
  // 라이선스 있음 (+1)
  if (m.license && m.license !== 'NOASSERTION') score++;
  // 기여자 2명 이상 (+0.5)
  if (m.contributors >= 2) score += 0.5;
  // 스타 50+ (+0.5)
  if (c.stars >= 50) score += 0.5;
  // README에 테스트/CI 언급 (+0.5)
  if (s.hasTests || s.hasCI) score += 0.5;
  // 설치 가이드 있음 (+0.5)
  if (s.hasInstallGuide) score += 0.5;

  return Math.min(5, Math.round(score * 2) / 2);
}

/**
 * Claude Code 호환성 평가
 */
function assessClaudeCompat(c) {
  const s = c.readmeSignals || {};
  const text = `${c.description} ${c.topics.join(' ')}`.toLowerCase();

  const compat = [];
  if (s.hasMcpConfig) compat.push('MCP 서버');
  if (s.hasSkillMd) compat.push('SKILL.md');
  if (text.includes('claude-code') || text.includes('claude code')) compat.push('Claude Code 전용');
  if (text.includes('cli') || text.includes('command')) compat.push('CLI 실행');
  if (text.includes('sdk') || text.includes('library')) compat.push('SDK/라이브러리');

  if (compat.length === 0) {
    if (text.includes('mcp')) compat.push('MCP 호환 가능');
    else compat.push('간접 활용');
  }

  return compat;
}

/**
 * 추천 등급: strong_add, add, neutral, skip
 *
 * 강화된 기준:
 * - strong_add: 신뢰도 4+, Claude Code/MCP 직접 호환, stars 30+
 * - add: 신뢰도 3+, 직접 호환, stars 15+
 * - neutral: 신뢰도 2+ AND 직접 호환 (하나만으로는 부족)
 * - skip: 나머지
 */
function calcRecommendation(c) {
  const trust = c.trustScore;
  const compat = c.claudeCompat || [];
  const hasDirect = compat.some(x =>
    x.includes('MCP 서버') || x.includes('SKILL') || x.includes('Claude Code'));
  const hasAny = compat.some(x =>
    x.includes('MCP') || x.includes('SKILL') || x.includes('Claude Code'));

  if (trust >= 4 && hasDirect && c.stars >= 30) return 'strong_add';
  if (trust >= 3 && hasDirect && c.stars >= 15) return 'add';
  if (trust >= 2 && hasAny) return 'neutral';
  return 'skip';
}

function monthsAgo(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  return (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth());
}

/**
 * Load existing repos and skipped repos
 */
function loadExisting() {
  const reposData = JSON.parse(readFileSync(resolve(ROOT, 'data', 'repos.json'), 'utf-8'));
  const existing = new Set();
  for (const section of reposData.sections) {
    for (const repo of section.repos) {
      existing.add(`${repo.owner}/${repo.repo}`.toLowerCase());
    }
  }

  let skippedData;
  try {
    skippedData = JSON.parse(readFileSync(resolve(ROOT, 'data', 'skipped.json'), 'utf-8'));
  } catch {
    skippedData = { skippedRepos: {} };
  }

  // Clean expired skipped entries (7 days)
  const now = Date.now();
  const cleaned = {};
  for (const [key, val] of Object.entries(skippedData.skippedRepos)) {
    if (now - new Date(val.skippedAt).getTime() < 7 * 24 * 60 * 60 * 1000) {
      cleaned[key] = val;
    }
  }
  skippedData.skippedRepos = cleaned;

  const skipped = new Set(Object.keys(cleaned).map(k => k.toLowerCase()));

  return { reposData, existing, skipped, skippedData };
}

/**
 * Search GitHub for new candidate repos
 */
async function searchNewRepos(existing, skipped) {
  const candidates = new Map();
  let searchCount = 0;

  for (const query of SEARCH_QUERIES) {
    try {
      const { data } = await octokit.rest.search.repos({
        q: `${query} in:name,description,readme`,
        sort: 'stars',
        order: 'desc',
        per_page: 30,
      });
      searchCount++;

      for (const repo of data.items) {
        const fullName = repo.full_name.toLowerCase();

        // Basic filters
        if (repo.fork) continue;
        if (repo.archived) continue;
        if (repo.stargazers_count < MIN_STARS) continue;
        if (existing.has(fullName)) continue;
        if (skipped.has(fullName)) continue;
        if (monthsAgo(repo.pushed_at) > MAX_STALE_MONTHS) continue;

        if (!candidates.has(fullName)) {
          candidates.set(fullName, {
            owner: repo.owner.login,
            repo: repo.name,
            fullName: repo.full_name,
            description: repo.description || '',
            stars: repo.stargazers_count,
            lastPush: repo.pushed_at,
            language: repo.language,
            topics: repo.topics || [],
            url: repo.html_url,
            matchedQueries: [query],
          });
        } else {
          candidates.get(fullName).matchedQueries.push(query);
        }
      }

      await new Promise(r => setTimeout(r, 500));
    } catch (err) {
      console.log(`  ⚠ Query "${query}" failed: ${err.message}`);
    }
  }

  console.log(`Searched ${searchCount} queries, found ${candidates.size} raw candidates`);

  // -----------------------------------------------------------------------
  // Web3 관련성 필터 적용
  // -----------------------------------------------------------------------
  const scored = [...candidates.values()].map(c => ({
    ...c,
    web3Score: calcWeb3Score(c),
  }));

  const filtered = scored.filter(c => c.web3Score >= 20);
  const rejected = scored.length - filtered.length;
  console.log(`Web3 relevance filter: ${filtered.length} passed, ${rejected} rejected`);

  // Sort: web3Score (desc) → matchedQueries count (desc) → stars (desc)
  filtered.sort((a, b) => {
    if (b.web3Score !== a.web3Score) return b.web3Score - a.web3Score;
    if (b.matchedQueries.length !== a.matchedQueries.length)
      return b.matchedQueries.length - a.matchedQueries.length;
    return b.stars - a.stars;
  });

  return filtered;
}

/**
 * Enrich candidates with deep analysis
 */
async function enrichCandidates(candidates) {
  console.log(`Deep analyzing ${candidates.length} candidates...`);
  for (let i = 0; i < candidates.length; i++) {
    await deepAnalyze(candidates[i]);
    console.log(`  [${i + 1}/${candidates.length}] ${candidates[i].fullName} → trust:${candidates[i].trustScore} rec:${candidates[i].recommendation}`);
  }
}

/**
 * Health check existing repos
 */
async function healthCheckExisting(reposData, skipped) {
  const issues = [];
  let checked = 0;

  for (const section of reposData.sections) {
    for (const repo of section.repos) {
      // Skip repos that were recently "kept" (7-day cooldown)
      const fullNameLower = `${repo.owner}/${repo.repo}`.toLowerCase();
      if (skipped.has(fullNameLower)) {
        checked++;
        continue;
      }
      try {
        const { data } = await octokit.rest.repos.get({
          owner: repo.owner,
          repo: repo.repo,
        });

        repo.health.starsPrev = repo.health.stars;
        repo.health.stars = data.stargazers_count;
        repo.health.archived = data.archived;
        repo.health.lastPush = data.pushed_at;
        repo.health.exists = true;

        if (data.archived) {
          issues.push({
            type: 'archived',
            owner: repo.owner,
            repo: repo.repo,
            fullName: `${repo.owner}/${repo.repo}`,
            sectionId: section.id,
            reason: 'Repository is archived',
          });
          repo.status = 'flagged';
        } else if (monthsAgo(data.pushed_at) > HEALTH_STALE_MONTHS) {
          issues.push({
            type: 'stale',
            owner: repo.owner,
            repo: repo.repo,
            fullName: `${repo.owner}/${repo.repo}`,
            sectionId: section.id,
            reason: `No push for ${monthsAgo(data.pushed_at)} months`,
            lastPush: data.pushed_at,
          });
          repo.status = 'stale';
        } else {
          repo.status = 'active';
        }

        checked++;
        if (checked % 10 === 0) console.log(`  checked ${checked} repos...`);
      } catch (err) {
        if (err.status === 404) {
          issues.push({
            type: 'not_found',
            owner: repo.owner,
            repo: repo.repo,
            fullName: `${repo.owner}/${repo.repo}`,
            sectionId: section.id,
            reason: 'Repository not found (404)',
          });
          repo.health.exists = false;
          repo.status = 'flagged';
        } else {
          console.log(`  ⚠ ${repo.owner}/${repo.repo}: ${err.message}`);
        }
        checked++;
      }
    }
  }

  console.log(`Health checked ${checked} repos, found ${issues.length} issues`);
  return issues;
}

/**
 * Suggest which section a new repo might belong to
 */
function suggestSection(candidate) {
  const text = `${candidate.description} ${candidate.topics.join(' ')}`.toLowerCase();

  if (text.includes('skill') || text.includes('plugin')) {
    if (text.includes('security') || text.includes('audit')) return 'skills-security';
    if (text.includes('uniswap') || text.includes('aave') || text.includes('protocol')) return 'skills-protocol';
    return 'skills-general';
  }
  if (text.includes('mcp') || text.includes('model context protocol')) {
    if (text.includes('defi') || text.includes('contract') || text.includes('swap')) return 'mcp-smart-contract';
    return 'mcp-onchain-data';
  }
  if (text.includes('agent') && (text.includes('onchain') || text.includes('wallet') || text.includes('transaction'))) {
    return 'ai-agents';
  }
  if (text.includes('foundry') || text.includes('hardhat') || text.includes('solidity') || text.includes('slither')) {
    return 'dev-tools';
  }
  if (text.includes('learn') || text.includes('tutorial') || text.includes('course') || text.includes('awesome')) {
    return 'learning';
  }
  return 'mcp-onchain-data';
}

async function main() {
  console.log('=== Discovery: Searching for new repos + Health check ===\n');

  const { reposData, existing, skipped, skippedData } = loadExisting();
  console.log(`Existing: ${existing.size} repos, Skipped: ${skipped.size} repos\n`);

  // 1. Search for new candidates
  console.log('--- Searching for new candidates ---');
  const candidates = await searchNewRepos(existing, skipped);

  // Add suggested section
  for (const c of candidates) {
    c.suggestedSection = suggestSection(c);
  }

  // 2. Enrich top candidates with README excerpt
  const topCandidates = candidates.slice(0, 10);
  await enrichCandidates(topCandidates);

  // 3. Health check existing repos
  console.log('\n--- Health checking existing repos ---');
  const issues = await healthCheckExisting(reposData, skipped);

  // 4. Save updated repos.json
  reposData.metadata.lastUpdated = new Date().toISOString();
  writeFileSync(
    resolve(ROOT, 'data', 'repos.json'),
    JSON.stringify(reposData, null, 2) + '\n',
    'utf-8',
  );

  // 5. Save updated skipped.json
  writeFileSync(
    resolve(ROOT, 'data', 'skipped.json'),
    JSON.stringify(skippedData, null, 2) + '\n',
    'utf-8',
  );

  // 6. Save discovery results
  const results = {
    timestamp: new Date().toISOString(),
    candidates: topCandidates,
    issues,
    stats: {
      totalExisting: existing.size,
      totalCandidatesRaw: candidates.length + (candidates.length > 0 ? 0 : 0),
      totalCandidatesFiltered: candidates.length,
      totalShown: topCandidates.length,
      totalIssues: issues.length,
      archived: issues.filter(i => i.type === 'archived').length,
      stale: issues.filter(i => i.type === 'stale').length,
      notFound: issues.filter(i => i.type === 'not_found').length,
    },
  };

  const outPath = resolve(ROOT, 'data', 'discover-results.json');
  writeFileSync(outPath, JSON.stringify(results, null, 2) + '\n', 'utf-8');

  console.log(`\n=== Results ===`);
  console.log(`Candidates: ${results.stats.totalCandidatesFiltered} passed filter, top ${results.stats.totalShown} saved`);
  console.log(`Issues: ${results.stats.totalIssues} (archived: ${results.stats.archived}, stale: ${results.stats.stale}, 404: ${results.stats.notFound})`);
  console.log(`Written: ${outPath}`);

  // Print top candidates for log
  for (const c of topCandidates.slice(0, 5)) {
    console.log(`  ${c.fullName} (⭐${c.stars}, score:${c.web3Score}) → ${c.suggestedSection}`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
