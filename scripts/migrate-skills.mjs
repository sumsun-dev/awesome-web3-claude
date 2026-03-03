/**
 * migrate-skills.mjs
 * One-time migration: discover SKILL.md files in multi-skill repos
 * and inject `skills` array into repos.json.
 *
 * Target repos (6):
 *   - trailofbits/skills (skills-security, ~28 skills)
 *   - Uniswap/uniswap-ai (skills-protocol, 7 skills)
 *   - trustwallet/tw-agent-skills (skills-protocol, 5 skills)
 *   - austintgriffith/ethskills (skills-protocol, 18 skills)
 *   - BankrBot/openclaw-skills (skills-general, ?)
 *   - coinmarketcap-official/skills-for-ai-agents-by-CoinMarketCap (skills-general, ?)
 *
 * Also removes binance/binance-skills-hub from repos.json (reserved for bot /add test).
 *
 * Usage: node scripts/migrate-skills.mjs [--dry-run]
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { discoverSkillsInRepo, countTotalSkills } from './skill-utils.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DRY_RUN = process.argv.includes('--dry-run');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || null;

// Target repos for skill migration
const MIGRATION_TARGETS = [
  { owner: 'trailofbits', repo: 'skills' },
  { owner: 'Uniswap', repo: 'uniswap-ai' },
  { owner: 'trustwallet', repo: 'tw-agent-skills' },
  { owner: 'austintgriffith', repo: 'ethskills' },
  { owner: 'BankrBot', repo: 'openclaw-skills' },
  { owner: 'coinmarketcap-official', repo: 'skills-for-ai-agents-by-CoinMarketCap' },
];

// Repo to remove from repos.json (reserved for bot /add test)
const REMOVE_TARGET = { owner: 'binance', repo: 'binance-skills-hub' };

async function main() {
  console.log('=== Skill Migration: Discovering skills in multi-skill repos ===\n');

  if (!GITHUB_TOKEN) {
    console.log('⚠ GITHUB_TOKEN not set — API rate limit will be low (60 req/hr)');
    console.log('  Set GITHUB_TOKEN env var for higher limits.\n');
  }

  const reposPath = resolve(ROOT, 'data', 'repos.json');
  const data = JSON.parse(readFileSync(reposPath, 'utf-8'));

  // 1. Remove binance/binance-skills-hub
  console.log(`--- Removing ${REMOVE_TARGET.owner}/${REMOVE_TARGET.repo} ---`);
  let removed = false;
  for (const section of data.sections) {
    const idx = section.repos.findIndex(
      r => r.owner === REMOVE_TARGET.owner && r.repo === REMOVE_TARGET.repo,
    );
    if (idx !== -1) {
      section.repos.splice(idx, 1);
      removed = true;
      console.log(`  ✓ Removed from section: ${section.id}`);
      break;
    }
  }
  if (!removed) console.log('  (not found, already removed)');
  console.log('');

  // 2. Discover skills for each target repo
  for (const target of MIGRATION_TARGETS) {
    console.log(`--- ${target.owner}/${target.repo} ---`);

    // Find the repo entry in repos.json
    let repoEntry = null;
    for (const section of data.sections) {
      repoEntry = section.repos.find(
        r => r.owner.toLowerCase() === target.owner.toLowerCase()
          && r.repo.toLowerCase() === target.repo.toLowerCase(),
      );
      if (repoEntry) break;
    }

    if (!repoEntry) {
      console.log('  ⚠ Not found in repos.json, skipping');
      console.log('');
      continue;
    }

    // Discover skills via GitHub API
    const skills = await discoverSkillsInRepo(target.owner, target.repo, GITHUB_TOKEN);

    if (skills.length === 0) {
      console.log('  ⚠ No SKILL.md files found');
      console.log('');
      continue;
    }

    console.log(`  Found ${skills.length} skills:`);
    for (const skill of skills) {
      console.log(`    - ${skill.name} (${skill.path})`);
    }

    // Inject skills array into repo entry
    repoEntry.skills = skills;
    console.log(`  ✓ Injected ${skills.length} skills into repos.json entry`);
    console.log('');

    // Rate limit between repos
    await new Promise(r => setTimeout(r, 1000));
  }

  // 3. Update metadata
  data.metadata.totalEntries = data.sections.reduce((s, sec) => s + sec.repos.length, 0);
  data.metadata.totalSkills = countTotalSkills(data);
  data.metadata.lastUpdated = new Date().toISOString();

  console.log('=== Summary ===');
  console.log(`Total entries: ${data.metadata.totalEntries}`);
  console.log(`Total skills: ${data.metadata.totalSkills}`);
  console.log('');

  // 4. Write updated repos.json
  if (!DRY_RUN) {
    writeFileSync(reposPath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
    console.log('✓ Written data/repos.json');
  } else {
    console.log('(dry-run mode, not writing)');
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
