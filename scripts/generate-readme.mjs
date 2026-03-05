/**
 * generate-readme.mjs
 * data/repos.json → README.md (ko) + README_EN.md (en) + README_JA.md (ja) 재생성
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
  ja: {
    native: '> Claude Code専用 — Skills (SKILL.md)、MCPサーバー、Claude Code設定など直接統合されるツール。',
    compatible: '> Claude Codeとの相乗効果が高い汎用Web3ツール — CLI実行可能、エージェント対応、または開発コンテキストとして有用。',
  },
};

// Table headers per language
const TABLE_HEADER = {
  ko: '| 레포지토리 | 스타 | 유형 | 마지막 업데이트 | 설명 |',
  en: '| Repository | Stars | Type | Last Updated | Description |',
  ja: '| リポジトリ | スター | タイプ | 最終更新 | 説明 |',
};
const TABLE_SEP = '|:-----------|------:|:----:|:---:|:------------|';

// TOC entry builder
function tocEntry(section, lang) {
  const title = section.title[lang];
  // GitHub anchor generation: matches GitHub's actual algorithm
  // 1. lowercase 2. remove non-word chars (except spaces, hyphens, CJK) 3. spaces to hyphens
  // GitHub keeps -- when & or — produces empty between words
  const anchor = title
    .toLowerCase()
    .replace(/[^\w\s가-힣\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF-]/g, '')
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

/** Escape pipe characters in markdown table cells */
function escapePipe(str) {
  return (str || '').replace(/\|/g, '\\|');
}

function repoRow(repo, lang) {
  const fullName = `${repo.owner}/${repo.repo}`;
  const link = `[${fullName}](https://github.com/${fullName})`;
  const stars = `![](https://img.shields.io/github/stars/${fullName}?style=flat-square&logo=github)`;
  const type = `\`${repo.type}\``;
  const date = formatDate(repo.addedDate);
  let desc = (repo.description && (repo.description[lang] || repo.description.en)) || '';

  // Add skill count badge if repo has skills
  const skillCount = repo.skills?.length || 0;
  if (skillCount > 0) {
    const badgeMap = { ko: `\`${skillCount}개 스킬\``, en: `\`${skillCount} skills\``, ja: `\`${skillCount}個スキル\`` };
    desc += ` ${badgeMap[lang] || badgeMap.en}`;
  }

  return `| ${link} | ${stars} | ${type} | ${date} | ${escapePipe(desc)} |`;
}

/**
 * Generate <details> collapsible block for repos with skills.
 * Returns an array of lines (empty if no skills).
 */
function skillsDetails(repo, lang) {
  const skills = repo.skills;
  if (!skills || skills.length === 0) return [];

  const fullName = `${repo.owner}/${repo.repo}`;
  const summaryMap = {
    ko: `${fullName} 스킬 상세 (${skills.length}개)`,
    en: `${fullName} skill details (${skills.length})`,
    ja: `${fullName} スキル詳細 (${skills.length}個)`,
  };
  const summary = summaryMap[lang] || summaryMap.en;

  const skillLabelMap = { ko: '스킬', en: 'Skill', ja: 'スキル' };
  const descLabelMap = { ko: '설명', en: 'Description', ja: '説明' };
  const skillLabel = skillLabelMap[lang] || skillLabelMap.en;
  const descLabel = descLabelMap[lang] || descLabelMap.en;

  const lines = [];
  lines.push(`<details><summary>${summary}</summary>`);
  lines.push('');
  lines.push(`| ${skillLabel} | ${descLabel} |`);
  lines.push('|:-----|:------------|');

  for (const skill of skills) {
    const skillLink = `[${skill.name}](https://github.com/${fullName}/tree/main/${skill.path})`;
    const desc = (skill.description[lang])
      || skill.description.en
      || skill.name;
    lines.push(`| ${skillLink} | ${escapePipe(desc)} |`);
  }

  lines.push('');
  lines.push('</details>');
  lines.push('');
  return lines;
}

function generateReadme(data, lang) {
  const lines = [];

  // Header
  lines.push('<div align="center">');
  lines.push('');
  const langSwitch = {
    ko: '**[English](./README_EN.md)** | **한국어** | **[日本語](./README_JA.md)**',
    en: '**English** | **[한국어](./README.md)** | **[日本語](./README_JA.md)**',
    ja: '**[English](./README_EN.md)** | **[한국어](./README.md)** | **日本語**',
  };
  lines.push(langSwitch[lang]);
  lines.push('');
  lines.push('# Awesome Web3 Claude Code');
  lines.push('');
  lines.push('[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)');
  lines.push('');
  const introLine1 = {
    ko: '**Claude Code** 및 기타 AI 코딩 에이전트를 활용한 **Web3 개발**을 위한 MCP 서버, AI 에이전트 프레임워크, 스킬, 개발 도구 큐레이션 목록.',
    en: 'Curated list of MCP servers, AI agent frameworks, skills, and dev tools for **Web3 development with Claude Code** and other AI coding agents.',
    ja: '**Claude Code**およびその他のAIコーディングエージェントを活用した**Web3開発**のためのMCPサーバー、AIエージェントフレームワーク、スキル、開発ツールのキュレーションリスト。',
  };
  const introLine2 = {
    ko: '이 분야는 초기 단계입니다 — 스타 수보다 기능성과 공식 지원 여부를 기준으로 선정합니다.',
    en: 'This space is early-stage — entries are selected for functionality and official backing over star count.',
    ja: 'この分野は初期段階です — スター数よりも機能性と公式サポートの有無を基準に選定しています。',
  };
  lines.push(introLine1[lang]);
  lines.push('');
  lines.push(introLine2[lang]);
  lines.push('');
  lines.push('</div>');
  lines.push('');

  // TOC
  const tocTitle = { ko: '## 목차', en: '## Contents', ja: '## 目次' };
  lines.push(tocTitle[lang]);
  lines.push('');
  const nativeDesc = {
    ko: '**Claude Code Native** — Claude Code 전용으로 제작된 것 (Skills, MCP, 설정)',
    en: '**Claude Code Native** — built specifically for Claude Code (Skills, MCP, config)',
    ja: '**Claude Code Native** — Claude Code専用に構築されたもの (Skills, MCP, 設定)',
  };
  lines.push(nativeDesc[lang]);
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

  const compatDesc = {
    ko: '**Compatible Tools** — Claude Code와 시너지가 높은 범용 도구',
    en: '**Compatible Tools** — general-purpose tools with strong Claude Code synergy',
    ja: '**Compatible Tools** — Claude Codeとの相乗効果が高い汎用ツール',
  };
  lines.push(compatDesc[lang]);
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

    // Skill details blocks after each section's table
    for (const repo of section.repos) {
      lines.push(...skillsDetails(repo, lang));
    }
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

    // Skill details blocks after each section's table
    for (const repo of section.repos) {
      lines.push(...skillsDetails(repo, lang));
    }
  }

  lines.push('---');
  lines.push('');

  // Footer
  const contribTitle = { ko: '## 기여', en: '## Contributing', ja: '## コントリビュート' };
  const contribText = {
    ko: '빠진 레포를 찾으셨나요? 이슈를 열거나 PR을 제출해 주세요!',
    en: 'Found a missing repo? Open an issue or submit a PR!',
    ja: '掲載されていないリポジトリを見つけましたか？Issueを開くか、PRを提出してください！',
  };
  const licenseTitle = { ko: '## 라이선스', en: '## License', ja: '## ライセンス' };

  lines.push(contribTitle[lang]);
  lines.push('');
  lines.push(contribText[lang]);
  lines.push('');
  lines.push(licenseTitle[lang]);
  lines.push('');
  lines.push('[CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/)');
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
  console.log(`Source: ${data.metadata.totalEntries} entries, ${data.metadata.totalSkills || 0} skills, last updated: ${data.metadata.lastUpdated}\n`);

  // Generate
  const koReadme = generateReadme(data, 'ko');
  const enReadme = generateReadme(data, 'en');
  const jaReadme = generateReadme(data, 'ja');

  // Diff check (optional, for verification)
  const verify = process.argv.includes('--verify');
  if (verify) {
    console.log('Verifying against existing READMEs...');
    const koOrig = readFileSync(resolve(ROOT, 'README.md'), 'utf-8').replace(/\r\n/g, '\n');
    const enOrig = readFileSync(resolve(ROOT, 'README_EN.md'), 'utf-8').replace(/\r\n/g, '\n');
    diffCheck(koReadme, koOrig, 'README.md');
    diffCheck(enReadme, enOrig, 'README_EN.md');
    try {
      const jaOrig = readFileSync(resolve(ROOT, 'README_JA.md'), 'utf-8').replace(/\r\n/g, '\n');
      diffCheck(jaReadme, jaOrig, 'README_JA.md');
    } catch { /* first run, no existing JA file */ }
    console.log('');
  }

  // Write
  if (!process.argv.includes('--dry-run')) {
    writeFileSync(resolve(ROOT, 'README.md'), koReadme, 'utf-8');
    writeFileSync(resolve(ROOT, 'README_EN.md'), enReadme, 'utf-8');
    writeFileSync(resolve(ROOT, 'README_JA.md'), jaReadme, 'utf-8');
    console.log('✓ Written README.md');
    console.log('✓ Written README_EN.md');
    console.log('✓ Written README_JA.md');
  } else {
    console.log('(dry-run mode, not writing files)');
  }
}

main();
