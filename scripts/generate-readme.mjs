/**
 * generate-readme.mjs
 * data/repos.json → README.md (ko) + README_EN.md (en) 재생성
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SECTION_ORDER } from './config.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const NATIVE_SECTIONS = new Set([
  'skills-security', 'skills-protocol', 'skills-general',
  'mcp-onchain-data', 'mcp-smart-contract',
]);

// Group description lines
const GROUP_HEADER = {
  ko: {
    native: '> Claude Code 전용 — Skills (SKILL.md), MCP 서버, Claude Code 설정 등 직접 통합되는 도구.',
    compatible: '> Claude Code와 함께 쓸 때 시너지가 높은 범용 Web3 도구 — CLI 실행 가능, 에이전트 친화적, 또는 개발 컨텍스트로 유용.',
  },
  en: {
    native: '> Built for Claude Code — Skills (SKILL.md), MCP servers, and Claude Code configurations that integrate directly.',
    compatible: '> General-purpose Web3 tools that work well with Claude Code — CLI-executable, agent-friendly, or useful as development context.',
  },
};

// Table headers per language
const TABLE_HEADER = {
  ko: '| 레포지토리 | 스타 | 유형 | 마지막 업데이트 | 설명 |',
  en: '| Repository | Stars | Type | Last Updated | Description |',
};
const TABLE_SEP = '|:-----------|------:|:----:|:---:|:------------|';

// TOC entry builder
function tocEntry(section, lang) {
  const title = section.title[lang];
  // GitHub anchor generation: matches GitHub's actual algorithm
  // 1. lowercase 2. remove non-word chars (except spaces, hyphens, Korean) 3. spaces to hyphens
  // GitHub keeps -- when & or — produces empty between words
  const anchor = title
    .toLowerCase()
    .replace(/[^\w\s가-힣-]/g, '')
    .replace(/ /g, '-');
  return `- [${title}](#${anchor})`;
}

function formatDate(dateStr) {
  if (!dateStr) return "'26.01";
  // dateStr is "2026-02-01" format
  const parts = dateStr.split('-');
  if (parts.length < 2) return "'26.01";
  const yy = parts[0].slice(2);
  const mm = parts[1];
  return `'${yy}.${mm}`;
}

function repoRow(repo, lang) {
  const fullName = `${repo.owner}/${repo.repo}`;
  const link = `[${fullName}](https://github.com/${fullName})`;
  const stars = `![](https://img.shields.io/github/stars/${fullName}?style=flat-square&logo=github)`;
  const type = `\`${repo.type}\``;
  const date = formatDate(repo.addedDate);
  const desc = repo.description[lang];
  return `| ${link} | ${stars} | ${type} | ${date} | ${desc} |`;
}

function generateReadme(data, lang) {
  const lines = [];

  // Header
  lines.push('<div align="center">');
  lines.push('');
  lines.push('# Awesome Web3 Claude Code');
  lines.push('');
  lines.push('[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)');
  lines.push('');
  if (lang === 'ko') {
    lines.push('**Claude Code** 및 기타 AI 코딩 에이전트를 활용한 **Web3 개발**을 위한 MCP 서버, AI 에이전트 프레임워크, 스킬, 개발 도구 큐레이션 목록.');
    lines.push('');
    lines.push('이 분야는 초기 단계입니다 — 스타 수보다 기능성과 공식 지원 여부를 기준으로 선정합니다.');
  } else {
    lines.push('Curated list of MCP servers, AI agent frameworks, skills, and dev tools for **Web3 development with Claude Code** and other AI coding agents.');
    lines.push('');
    lines.push('This space is early-stage — entries are selected for functionality and official backing over star count.');
  }
  lines.push('');
  lines.push('</div>');
  lines.push('');

  // TOC
  lines.push(lang === 'ko' ? '## 목차' : '## Contents');
  lines.push('');
  if (lang === 'ko') {
    lines.push('**Claude Code Native** — Claude Code 전용으로 제작된 것 (Skills, MCP, 설정)');
  } else {
    lines.push('**Claude Code Native** — built specifically for Claude Code (Skills, MCP, config)');
  }
  lines.push('');

  const nativeSections = SECTION_ORDER.filter(id => NATIVE_SECTIONS.has(id))
    .map(id => data.sections.find(s => s.id === id))
    .filter(Boolean);
  const compatSections = SECTION_ORDER.filter(id => !NATIVE_SECTIONS.has(id))
    .map(id => data.sections.find(s => s.id === id))
    .filter(Boolean);

  for (const section of nativeSections) {
    lines.push(tocEntry(section, lang));
  }
  lines.push('');

  if (lang === 'ko') {
    lines.push('**Compatible Tools** — Claude Code와 시너지가 높은 범용 도구');
  } else {
    lines.push('**Compatible Tools** — general-purpose tools with strong Claude Code synergy');
  }
  lines.push('');
  for (const section of compatSections) {
    lines.push(tocEntry(section, lang));
  }
  lines.push('');
  lines.push('---');
  lines.push('');

  // Claude Code Native group
  lines.push('# Claude Code Native');
  lines.push('');
  lines.push(GROUP_HEADER[lang].native);
  lines.push('');

  for (let i = 0; i < nativeSections.length; i++) {
    const section = nativeSections[i];
    lines.push(`## ${section.title[lang]}`);
    lines.push('');

    // Section description (blockquote)
    if (section.description[lang]) {
      lines.push(`> ${section.description[lang]}`);
      lines.push('');
    }

    lines.push(TABLE_HEADER[lang]);
    lines.push(TABLE_SEP);
    for (const repo of section.repos) {
      lines.push(repoRow(repo, lang));
    }
    lines.push('');
  }

  lines.push('---');
  lines.push('');

  // Compatible Tools group
  lines.push('# Compatible Tools');
  lines.push('');
  lines.push(GROUP_HEADER[lang].compatible);
  lines.push('');

  for (let i = 0; i < compatSections.length; i++) {
    const section = compatSections[i];
    lines.push(`## ${section.title[lang]}`);
    lines.push('');

    if (section.description[lang]) {
      lines.push(`> ${section.description[lang]}`);
      lines.push('');
    }

    lines.push(TABLE_HEADER[lang]);
    lines.push(TABLE_SEP);
    for (const repo of section.repos) {
      lines.push(repoRow(repo, lang));
    }
    lines.push('');
  }

  lines.push('---');
  lines.push('');

  // Footer
  if (lang === 'ko') {
    lines.push('## 기여');
    lines.push('');
    lines.push('빠진 레포를 찾으셨나요? 이슈를 열거나 PR을 제출해 주세요!');
    lines.push('');
    lines.push('## 라이선스');
    lines.push('');
    lines.push('[CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/)');
  } else {
    lines.push('## Contributing');
    lines.push('');
    lines.push('Found a missing repo? Open an issue or submit a PR!');
    lines.push('');
    lines.push('## License');
    lines.push('');
    lines.push('[CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/)');
  }
  lines.push('');

  return lines.join('\n');
}

function diffCheck(generated, original, label) {
  const genLines = generated.split('\n');
  const origLines = original.split('\n');

  let diffs = 0;
  const maxLen = Math.max(genLines.length, origLines.length);

  for (let i = 0; i < maxLen; i++) {
    const g = genLines[i] || '';
    const o = origLines[i] || '';
    if (g !== o) {
      if (diffs < 10) {
        console.log(`  ${label} line ${i + 1}:`);
        console.log(`    - orig: ${o.substring(0, 120)}`);
        console.log(`    + gen:  ${g.substring(0, 120)}`);
      }
      diffs++;
    }
  }

  if (diffs === 0) {
    console.log(`  ✓ ${label}: EXACT MATCH`);
  } else {
    console.log(`  ✗ ${label}: ${diffs} lines differ`);
  }

  return diffs;
}

function main() {
  const reposPath = resolve(ROOT, 'data', 'repos.json');
  let data;
  try {
    data = JSON.parse(readFileSync(reposPath, 'utf-8'));
  } catch {
    console.error('✗ data/repos.json not found. Run `npm run migrate` first.');
    process.exit(1);
  }

  console.log('=== Generating README files from repos.json ===\n');
  console.log(`Source: ${data.metadata.totalEntries} entries, last updated: ${data.metadata.lastUpdated}\n`);

  // Generate
  const koReadme = generateReadme(data, 'ko');
  const enReadme = generateReadme(data, 'en');

  // Diff check (optional, for verification)
  const verify = process.argv.includes('--verify');
  if (verify) {
    console.log('Verifying against existing READMEs...');
    const koOrig = readFileSync(resolve(ROOT, 'README.md'), 'utf-8').replace(/\r\n/g, '\n');
    const enOrig = readFileSync(resolve(ROOT, 'README_EN.md'), 'utf-8').replace(/\r\n/g, '\n');
    diffCheck(koReadme, koOrig, 'README.md');
    diffCheck(enReadme, enOrig, 'README_EN.md');
    console.log('');
  }

  // Write
  if (!process.argv.includes('--dry-run')) {
    writeFileSync(resolve(ROOT, 'README.md'), koReadme, 'utf-8');
    writeFileSync(resolve(ROOT, 'README_EN.md'), enReadme, 'utf-8');
    console.log('✓ Written README.md');
    console.log('✓ Written README_EN.md');
  } else {
    console.log('(dry-run mode, not writing files)');
  }
}

main();
