/**
 * discover.mjs
 * GitHub Search API로 신규 Web3 Claude Code 레포 탐색 + 기존 엔트리 health check
 * 출력: data/discover-results.json
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

// Search queries for discovering new repos
const SEARCH_QUERIES = [
  'claude code web3',
  'claude code solidity',
  'claude code ethereum',
  'mcp server ethereum',
  'mcp server solana',
  'mcp server web3',
  'mcp server blockchain',
  'mcp server defi',
  'claude skills solidity',
  'claude skills web3',
  'claude skills blockchain',
  'topic:mcp web3',
  'topic:claude-code blockchain',
  'AI agent onchain MCP',
  'SKILL.md solidity',
];

// Minimum criteria
const MIN_STARS = 5;
const MAX_STALE_MONTHS = 3;
const HEALTH_STALE_MONTHS = 6;

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

  // Clean expired skipped entries (30 days)
  const now = Date.now();
  const cleaned = {};
  for (const [key, val] of Object.entries(skippedData.skippedRepos)) {
    if (now - new Date(val.skippedAt).getTime() < 30 * 24 * 60 * 60 * 1000) {
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
  const candidates = new Map(); // fullName → repoData
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

        // Filters
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

      // Rate limit respect: small delay between searches
      await new Promise(r => setTimeout(r, 500));
    } catch (err) {
      console.log(`  ⚠ Query "${query}" failed: ${err.message}`);
    }
  }

  console.log(`Searched ${searchCount} queries, found ${candidates.size} unique candidates`);

  // Sort by relevance (matched queries count) then stars
  return [...candidates.values()]
    .sort((a, b) => {
      const queryDiff = b.matchedQueries.length - a.matchedQueries.length;
      if (queryDiff !== 0) return queryDiff;
      return b.stars - a.stars;
    });
}

/**
 * Health check existing repos
 */
async function healthCheckExisting(reposData) {
  const issues = [];
  let checked = 0;

  for (const section of reposData.sections) {
    for (const repo of section.repos) {
      try {
        const { data } = await octokit.rest.repos.get({
          owner: repo.owner,
          repo: repo.repo,
        });

        // Update health data
        repo.health.starsPrev = repo.health.stars;
        repo.health.stars = data.stargazers_count;
        repo.health.archived = data.archived;
        repo.health.lastPush = data.pushed_at;
        repo.health.exists = true;

        // Check for issues
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
  return 'mcp-onchain-data'; // default
}

async function main() {
  console.log('=== Discovery: Searching for new repos + Health check ===\n');

  const { reposData, existing, skipped, skippedData } = loadExisting();
  console.log(`Existing: ${existing.size} repos, Skipped: ${skipped.size} repos\n`);

  // 1. Search for new candidates
  console.log('--- Searching for new candidates ---');
  const candidates = await searchNewRepos(existing, skipped);

  // Add suggested section to each candidate
  for (const c of candidates) {
    c.suggestedSection = suggestSection(c);
  }

  // 2. Health check existing repos
  console.log('\n--- Health checking existing repos ---');
  const issues = await healthCheckExisting(reposData);

  // 3. Save updated repos.json with health data
  reposData.metadata.lastUpdated = new Date().toISOString();
  writeFileSync(
    resolve(ROOT, 'data', 'repos.json'),
    JSON.stringify(reposData, null, 2) + '\n',
    'utf-8',
  );

  // 4. Save updated skipped.json
  writeFileSync(
    resolve(ROOT, 'data', 'skipped.json'),
    JSON.stringify(skippedData, null, 2) + '\n',
    'utf-8',
  );

  // 5. Save discovery results
  const results = {
    timestamp: new Date().toISOString(),
    candidates: candidates.slice(0, 20), // top 20
    issues,
    stats: {
      totalExisting: existing.size,
      totalCandidates: candidates.length,
      totalIssues: issues.length,
      archived: issues.filter(i => i.type === 'archived').length,
      stale: issues.filter(i => i.type === 'stale').length,
      notFound: issues.filter(i => i.type === 'not_found').length,
    },
  };

  const outPath = resolve(ROOT, 'data', 'discover-results.json');
  writeFileSync(outPath, JSON.stringify(results, null, 2) + '\n', 'utf-8');

  console.log(`\n=== Results ===`);
  console.log(`Candidates: ${results.stats.totalCandidates} found, top ${results.candidates.length} saved`);
  console.log(`Issues: ${results.stats.totalIssues} (archived: ${results.stats.archived}, stale: ${results.stats.stale}, 404: ${results.stats.notFound})`);
  console.log(`Written: ${outPath}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
