/**
 * config.mjs
 * Shared constants used across discover, notify-telegram, and generate-readme scripts.
 */

export const TRUSTED_ORGS = new Set([
  'trailofbits', 'openzeppelin', 'foundry-rs', 'crytic', 'consensys',
  'uniswap', 'aave', 'chainlink', 'solana-foundation', 'coinbase',
  'alchemyplatform', 'thirdweb-dev', 'cyfrin', 'a16z',
  'moralisweb3', 'bankless', 'getalby', 'debridge-finance',
  'noditlabs', 'heurist-network', 'trustwallet', 'goat-sdk',
  'scaffold-eth', 'elizaos', 'sendaifun',
]);

export const SECTION_ORDER = [
  'skills-security', 'skills-protocol', 'skills-general',
  'mcp-onchain-data', 'mcp-smart-contract',
  'dev-tools', 'ai-agents', 'learning',
];

export const SECTION_LABELS = {
  'skills-security': '스킬 — 보안/감사',
  'skills-protocol': '스킬 — 프로토콜별',
  'skills-general': '스킬 — 범용 Web3',
  'mcp-onchain-data': 'MCP — 온체인 데이터',
  'mcp-smart-contract': 'MCP — 스마트 컨트랙트',
  'dev-tools': '개발 도구',
  'ai-agents': 'AI 에이전트',
  'learning': '학습/레퍼런스',
};
