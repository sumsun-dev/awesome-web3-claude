/**
 * repos-reader.mjs
 * Read repos.json from GitHub Contents API with ETag caching
 */

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || 'anthropic-ai-study/awesome-web3-claude';

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

let cache = { data: null, etag: null, fetchedAt: 0 };

/**
 * Fetch repos.json from GitHub Contents API (ETag cached)
 * @returns {Promise<object>} parsed repos.json
 */
export async function fetchReposJson() {
  const now = Date.now();
  if (cache.data && now - cache.fetchedAt < CACHE_TTL_MS) {
    return cache.data;
  }

  const [owner, repo] = GITHUB_REPO.split('/');
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/data/repos.json`;

  const headers = {
    Authorization: `token ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3.raw',
  };
  if (cache.etag) {
    headers['If-None-Match'] = cache.etag;
  }

  const res = await fetch(url, { headers });

  if (res.status === 304 && cache.data) {
    cache.fetchedAt = now;
    return cache.data;
  }

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status}`);
  }

  const data = await res.json();
  cache = {
    data,
    etag: res.headers.get('etag'),
    fetchedAt: now,
  };
  return data;
}

/**
 * Find a specific repo across all sections
 * @returns {{ repo: object, section: object } | null}
 */
export async function findRepo(owner, repo) {
  const data = await fetchReposJson();
  for (const section of data.sections) {
    const found = section.repos.find(
      r => r.owner.toLowerCase() === owner.toLowerCase()
        && r.repo.toLowerCase() === repo.toLowerCase(),
    );
    if (found) return { repo: found, section };
  }
  return null;
}

/**
 * Get Set of all "owner/repo" (lowercase) for duplicate checking
 */
export async function getExistingSet() {
  const data = await fetchReposJson();
  const set = new Set();
  for (const section of data.sections) {
    for (const r of section.repos) {
      set.add(`${r.owner}/${r.repo}`.toLowerCase());
    }
  }
  return set;
}
