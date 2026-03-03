/**
 * skill-utils.mjs
 * Shared utilities for discovering and parsing SKILL.md files in GitHub repos.
 * Used by: migrate-skills.mjs, discover.mjs, update-readme.yml (inline)
 */

/**
 * Discover all SKILL.md files in a GitHub repo using the git tree API.
 * Returns an array of skill objects: { name, path, description }
 *
 * @param {string} owner - GitHub repo owner
 * @param {string} repo - GitHub repo name
 * @param {string} [token] - GitHub token (optional, increases rate limit)
 * @returns {Promise<Array<{name: string, path: string, description: {ko: string|null, en: string}}>>}
 */
export async function discoverSkillsInRepo(owner, repo, token) {
  const headers = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'awesome-web3-claude',
  };
  if (token) headers.Authorization = `token ${token}`;

  // 1. Get recursive tree to find all SKILL.md files
  const treeUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1`;
  let treeRes = await fetch(treeUrl, { headers });

  // Fallback to master branch if main doesn't exist
  if (!treeRes.ok) {
    const fallbackUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees/master?recursive=1`;
    treeRes = await fetch(fallbackUrl, { headers });
  }

  if (!treeRes.ok) {
    console.log(`  [skill-utils] Failed to get tree for ${owner}/${repo}: ${treeRes.status}`);
    return [];
  }

  const tree = await treeRes.json();
  const skillPaths = (tree.tree || [])
    .filter(item => item.type === 'blob' && item.path.endsWith('/SKILL.md'))
    .map(item => item.path);

  if (skillPaths.length === 0) return [];

  // 2. Fetch and parse each SKILL.md
  const skills = [];
  for (const filePath of skillPaths) {
    const contentUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${filePath}`;
    let contentRes = await fetch(contentUrl, { headers: { 'User-Agent': 'awesome-web3-claude' } });

    if (!contentRes.ok) {
      const fallbackContentUrl = `https://raw.githubusercontent.com/${owner}/${repo}/master/${filePath}`;
      contentRes = await fetch(fallbackContentUrl, { headers: { 'User-Agent': 'awesome-web3-claude' } });
    }

    if (!contentRes.ok) continue;

    const content = await contentRes.text();
    const parsed = parseSkillFrontmatter(content);
    if (!parsed) continue;

    // Derive path relative to repo root (parent directory of SKILL.md)
    const skillDir = filePath.replace(/\/SKILL\.md$/, '');

    skills.push({
      name: parsed.name,
      path: skillDir,
      description: { ko: null, en: parsed.description },
    });

    // Rate limit courtesy
    await new Promise(r => setTimeout(r, 100));
  }

  return skills;
}

/**
 * Parse YAML frontmatter from SKILL.md content.
 * Extracts `name` and `description` fields.
 *
 * @param {string} content - Raw SKILL.md file content
 * @returns {{name: string, description: string} | null}
 */
export function parseSkillFrontmatter(content) {
  // Use line-based parsing to find exact frontmatter boundaries
  const lines = content.split(/\r?\n/);
  let startIdx = -1;
  let endIdx = -1;

  for (let i = 0; i < lines.length; i++) {
    if (/^---\s*$/.test(lines[i])) {
      if (startIdx === -1) startIdx = i;
      else { endIdx = i; break; }
    }
  }

  if (startIdx === -1 || endIdx === -1) return null;

  const fmLines = lines.slice(startIdx + 1, endIdx);
  const frontmatter = fmLines.join('\n');

  // Extract name (single line value)
  const nameMatch = frontmatter.match(/^name:\s*(.+)$/m);
  const name = nameMatch ? nameMatch[1].trim().replace(/^["']|["']$/g, '') : null;

  if (!name) return null;

  // Extract description — handles block scalar (|), quoted, and plain inline
  let description = null;

  // 1. Block scalar: description: |
  const descBlockMatch = frontmatter.match(/^description:\s*\|\s*\n([\s\S]*?)(?=\n[a-zA-Z][\w-]*:|\n$)/m);
  if (descBlockMatch) {
    description = descBlockMatch[1]
      .split('\n')
      .map(l => l.trim())
      .filter(Boolean)
      .join(' ')
      .trim();
  }

  // 2. Inline value (quoted or plain)
  if (!description) {
    const inlineMatch = frontmatter.match(/^description:\s*(.+)$/m);
    if (inlineMatch) {
      description = inlineMatch[1].trim().replace(/^["']|["']$/g, '');
    }
  }

  // Truncate overly long descriptions (some include trigger keywords)
  if (description && description.length > 200) {
    const sentenceEnd = description.indexOf('. ', 100);
    if (sentenceEnd > 0 && sentenceEnd < 200) {
      description = description.slice(0, sentenceEnd + 1);
    } else {
      description = description.slice(0, 200).trimEnd() + '...';
    }
  }

  return { name, description: description || name };
}

/**
 * Count total skills across all sections in repos.json data.
 *
 * @param {object} data - repos.json parsed data
 * @returns {number}
 */
export function countTotalSkills(data) {
  let total = 0;
  for (const section of data.sections) {
    for (const repo of section.repos) {
      if (repo.skills && repo.skills.length > 0) {
        total += repo.skills.length;
      }
    }
  }
  return total;
}
