<div align="center">

# Awesome Web3 Claude Code

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

**Claude Code** 및 기타 AI 코딩 에이전트를 활용한 **Web3 개발**을 위한 MCP 서버, AI 에이전트 프레임워크, 스킬, 개발 도구 큐레이션 목록.

이 분야는 초기 단계입니다 — 스타 수보다 기능성과 공식 지원 여부를 기준으로 선정합니다.

</div>

## 목차

**Claude Code Native** — Claude Code 전용으로 제작된 것 (Skills, MCP, 설정)

- [스킬 & 플러그인 — 보안 & 감사](#스킬--플러그인--보안--감사)
- [스킬 & 플러그인 — 프로토콜별](#스킬--플러그인--프로토콜별)
- [스킬 & 플러그인 — 범용 Web3 규칙](#스킬--플러그인--범용-web3-규칙)
- [MCP 서버 — 온체인 데이터 & 분석](#mcp-서버--온체인-데이터--분석)
- [MCP 서버 — 스마트 컨트랙트 & DeFi](#mcp-서버--스마트-컨트랙트--defi)

**Compatible Tools** — Claude Code와 시너지가 높은 범용 도구

- [스마트 컨트랙트 개발 도구](#스마트-컨트랙트-개발-도구)
- [AI 에이전트 프레임워크 — 온체인](#ai-에이전트-프레임워크--온체인)
- [학습 & 레퍼런스](#학습--레퍼런스)

---

# Claude Code Native

> Claude Code 전용 — Skills (SKILL.md), MCP 서버, Claude Code 설정 등 직접 통합되는 도구.

## 스킬 & 플러그인 — 보안 & 감사

| 레포지토리 | 스타 | 유형 | 마지막 업데이트 | 설명 |
|:-----------|------:|:----:|:---:|:------------|
| [trailofbits/skills](https://github.com/trailofbits/skills) | ![](https://img.shields.io/github/stars/trailofbits/skills?style=flat-square&logo=github) | `Official` | '26.02 | 보안 감사, 스마트 컨트랙트 분석, 정적분석(Semgrep, CodeQL), 속성 기반 테스팅, 취약점 탐지용 28개 플러그인 `60개 스킬` |
| [trailofbits/claude-code-config](https://github.com/trailofbits/claude-code-config) | ![](https://img.shields.io/github/stars/trailofbits/claude-code-config?style=flat-square&logo=github) | `Official` | '26.02 | Claude Code 설정 프레임워크 (오피니어니티드 디폴트 및 워크플로우) |
| [trailofbits/claude-code-devcontainer](https://github.com/trailofbits/claude-code-devcontainer) | ![](https://img.shields.io/github/stars/trailofbits/claude-code-devcontainer?style=flat-square&logo=github) | `Official` | '26.02 | 바이패스 모드에서 안전하게 Claude Code를 실행하기 위한 샌드박스 devcontainer |
| [trailofbits/skills-curated](https://github.com/trailofbits/skills-curated) | ![](https://img.shields.io/github/stars/trailofbits/skills-curated?style=flat-square&logo=github) | `Official` | '26.02 | 큐레이티드 마켓플레이스, 코드 리뷰를 거친 커뮤니티 검증 플러그인 (백도어 위험 경고) |

<details><summary>trailofbits/skills 스킬 상세 (60개)</summary>

| 스킬 | 설명 |
|:-----|:------------|
| [agentic-actions-auditor](https://github.com/trailofbits/skills/tree/main/plugins/agentic-actions-auditor/skills/agentic-actions-auditor) | Audits GitHub Actions workflows for security vulnerabilities in AI agent integrations including Claude Code Action, Gemini CLI, OpenAI Codex, and GitHub AI Inference. |
| [ask-questions-if-underspecified](https://github.com/trailofbits/skills/tree/main/plugins/ask-questions-if-underspecified/skills/ask-questions-if-underspecified) | Clarify requirements before implementing. Use when serious doubts arise. |
| [audit-context-building](https://github.com/trailofbits/skills/tree/main/plugins/audit-context-building/skills/audit-context-building) | Enables ultra-granular, line-by-line code analysis to build deep architectural context before vulnerability or bug finding. |
| [algorand-vulnerability-scanner](https://github.com/trailofbits/skills/tree/main/plugins/building-secure-contracts/skills/algorand-vulnerability-scanner) | Scans Algorand smart contracts for 11 common vulnerabilities including rekeying attacks, unchecked transaction fees, missing field validations, and access control issues. |
| [audit-prep-assistant](https://github.com/trailofbits/skills/tree/main/plugins/building-secure-contracts/skills/audit-prep-assistant) | Prepares codebases for security review using Trail of Bits' checklist. Helps set review goals, runs static analysis tools, increases test coverage, removes dead code, ensures accessibility, and genera... |
| [cairo-vulnerability-scanner](https://github.com/trailofbits/skills/tree/main/plugins/building-secure-contracts/skills/cairo-vulnerability-scanner) | Scans Cairo/StarkNet smart contracts for 6 critical vulnerabilities including felt252 arithmetic overflow, L1-L2 messaging issues, address conversion problems, and signature replay. |
| [code-maturity-assessor](https://github.com/trailofbits/skills/tree/main/plugins/building-secure-contracts/skills/code-maturity-assessor) | Systematic code maturity assessment using Trail of Bits' 9-category framework. Analyzes codebase for arithmetic safety, auditing practices, access controls, complexity, decentralization, documentation... |
| [cosmos-vulnerability-scanner](https://github.com/trailofbits/skills/tree/main/plugins/building-secure-contracts/skills/cosmos-vulnerability-scanner) | Scans Cosmos SDK blockchains for 9 consensus-critical vulnerabilities including non-determinism, incorrect signers, ABCI panics, and rounding errors. |
| [guidelines-advisor](https://github.com/trailofbits/skills/tree/main/plugins/building-secure-contracts/skills/guidelines-advisor) | Smart contract development advisor based on Trail of Bits' best practices. Analyzes codebase to generate documentation/specifications, review architecture, check upgradeability patterns, assess implem... |
| [secure-workflow-guide](https://github.com/trailofbits/skills/tree/main/plugins/building-secure-contracts/skills/secure-workflow-guide) | Guides through Trail of Bits' 5-step secure development workflow. Runs Slither scans, checks special features (upgradeability/ERC conformance/token integration), generates visual security diagrams, he... |
| [solana-vulnerability-scanner](https://github.com/trailofbits/skills/tree/main/plugins/building-secure-contracts/skills/solana-vulnerability-scanner) | Scans Solana programs for 6 critical vulnerabilities including arbitrary CPI, improper PDA validation, missing signer/ownership checks, and sysvar spoofing. Use when auditing Solana/Anchor programs. |
| [substrate-vulnerability-scanner](https://github.com/trailofbits/skills/tree/main/plugins/building-secure-contracts/skills/substrate-vulnerability-scanner) | Scans Substrate/Polkadot pallets for 7 critical vulnerabilities including arithmetic overflow, panic DoS, incorrect weights, and bad origin checks. |
| [token-integration-analyzer](https://github.com/trailofbits/skills/tree/main/plugins/building-secure-contracts/skills/token-integration-analyzer) | Token integration and implementation analyzer based on Trail of Bits' token integration checklist. Analyzes token implementations for ERC20/ERC721 conformity, checks for 20+ weird token patterns, asse... |
| [ton-vulnerability-scanner](https://github.com/trailofbits/skills/tree/main/plugins/building-secure-contracts/skills/ton-vulnerability-scanner) | Scans TON (The Open Network) smart contracts for 3 critical vulnerabilities including integer-as-boolean misuse, fake Jetton contracts, and forward TON without gas checks. |
| [burpsuite-project-parser](https://github.com/trailofbits/skills/tree/main/plugins/burpsuite-project-parser/skills) | Searches and explores Burp Suite project files (.burp) from the command line. Use when searching response headers or bodies with regex patterns, extracting security audit findings, dumping proxy histo... |
| [claude-in-chrome-troubleshooting](https://github.com/trailofbits/skills/tree/main/plugins/claude-in-chrome-troubleshooting/skills/claude-in-chrome-troubleshooting) | Diagnose and fix Claude in Chrome MCP extension connectivity issues. Use when mcp__claude-in-chrome__* tools fail, return "Browser extension is not connected", or behave erratically. |
| [constant-time-analysis](https://github.com/trailofbits/skills/tree/main/plugins/constant-time-analysis/skills/constant-time-analysis) | Detects timing side-channel vulnerabilities in cryptographic code. Use when implementing or reviewing crypto code, encountering division on secrets, secret-dependent branches, or constant-time program... |
| [interpreting-culture-index](https://github.com/trailofbits/skills/tree/main/plugins/culture-index/skills/interpreting-culture-index) | Interprets Culture Index (CI) surveys, behavioral profiles, and personality assessment data. Supports individual profile interpretation, team composition analysis (gas/brake/glue), burnout detection, ... |
| [debug-buttercup](https://github.com/trailofbits/skills/tree/main/plugins/debug-buttercup/skills/debug-buttercup) | debug-buttercup |
| [devcontainer-setup](https://github.com/trailofbits/skills/tree/main/plugins/devcontainer-setup/skills/devcontainer-setup) | Creates devcontainers with Claude Code, language-specific tooling (Python/Node/Rust/Go), and persistent volumes. |
| [differential-review](https://github.com/trailofbits/skills/tree/main/plugins/differential-review/skills/differential-review) | differential-review |
| [dwarf-expert](https://github.com/trailofbits/skills/tree/main/plugins/dwarf-expert/skills/dwarf-expert) | Provides expertise for analyzing DWARF debug files and understanding the DWARF debug format/standard (v3-v5). |
| [entry-point-analyzer](https://github.com/trailofbits/skills/tree/main/plugins/entry-point-analyzer/skills/entry-point-analyzer) | Analyzes smart contract codebases to identify state-changing entry points for security auditing. Detects externally callable functions that modify state, categorizes them by access level (public, admi... |
| [firebase-apk-scanner](https://github.com/trailofbits/skills/tree/main/plugins/firebase-apk-scanner/skills/firebase-apk-scanner) | Scans Android APKs for Firebase security misconfigurations including open databases, storage buckets, authentication issues, and exposed cloud functions. |
| [using-gh-cli](https://github.com/trailofbits/skills/tree/main/plugins/gh-cli/skills/using-gh-cli) | Guides usage of the GitHub CLI (gh) for interacting with GitHub repositories, PRs, issues, and API. Use when working with GitHub resources instead of WebFetch or curl. |
| [git-cleanup](https://github.com/trailofbits/skills/tree/main/plugins/git-cleanup/skills/git-cleanup) | Safely analyzes and cleans up local git branches and worktrees by categorizing them as merged, squash-merged, superseded, or active work. |
| [insecure-defaults](https://github.com/trailofbits/skills/tree/main/plugins/insecure-defaults/skills/insecure-defaults) | Detects fail-open insecure defaults (hardcoded secrets, weak auth, permissive security) that allow apps to run insecurely in production. |
| [let-fate-decide](https://github.com/trailofbits/skills/tree/main/plugins/let-fate-decide/skills/let-fate-decide) | Draws 4 Tarot cards using os.urandom() to inject entropy into planning when prompts are vague or underspecified. |
| [modern-python](https://github.com/trailofbits/skills/tree/main/plugins/modern-python/skills/modern-python) | Configures Python projects with modern tooling (uv, ruff, ty). Use when creating projects, writing standalone scripts, or migrating from pip/Poetry/mypy/black. |
| [property-based-testing](https://github.com/trailofbits/skills/tree/main/plugins/property-based-testing/skills/property-based-testing) | Provides guidance for property-based testing across multiple languages and smart contracts. Use when writing tests, reviewing code with serialization/validation/parsing patterns, designing features, o... |
| [seatbelt-sandboxer](https://github.com/trailofbits/skills/tree/main/plugins/seatbelt-sandboxer/skills/seatbelt-sandboxer) | Generates minimal macOS Seatbelt sandbox configurations. Use when sandboxing, isolating, or restricting macOS applications with allowlist-based profiles. |
| [second-opinion](https://github.com/trailofbits/skills/tree/main/plugins/second-opinion/skills/second-opinion) | Runs external LLM code reviews (OpenAI Codex or Google Gemini CLI) on uncommitted changes, branch diffs, or specific commits. |
| [semgrep-rule-creator](https://github.com/trailofbits/skills/tree/main/plugins/semgrep-rule-creator/skills/semgrep-rule-creator) | Creates custom Semgrep rules for detecting security vulnerabilities, bug patterns, and code patterns. Use when writing Semgrep rules or building custom static analysis detections. |
| [semgrep-rule-variant-creator](https://github.com/trailofbits/skills/tree/main/plugins/semgrep-rule-variant-creator/skills/semgrep-rule-variant-creator) | Creates language variants of existing Semgrep rules. Use when porting a Semgrep rule to specified target languages. |
| [sharp-edges](https://github.com/trailofbits/skills/tree/main/plugins/sharp-edges/skills/sharp-edges) | Identifies error-prone APIs, dangerous configurations, and footgun designs that enable security mistakes. |
| [skill-improver](https://github.com/trailofbits/skills/tree/main/plugins/skill-improver/skills/skill-improver) | Iteratively reviews and fixes Claude Code skill quality issues until they meet standards. Runs automated fix-review cycles using the skill-reviewer agent. |
| [spec-to-code-compliance](https://github.com/trailofbits/skills/tree/main/plugins/spec-to-code-compliance/skills/spec-to-code-compliance) | Verifies code implements exactly what documentation specifies for blockchain audits. Use when comparing code against whitepapers, finding gaps between specs and implementation, or performing complianc... |
| [codeql](https://github.com/trailofbits/skills/tree/main/plugins/static-analysis/skills/codeql) | >- |
| [sarif-parsing](https://github.com/trailofbits/skills/tree/main/plugins/static-analysis/skills/sarif-parsing) | >- |
| [semgrep](https://github.com/trailofbits/skills/tree/main/plugins/static-analysis/skills/semgrep) | >- |
| [supply-chain-risk-auditor](https://github.com/trailofbits/skills/tree/main/plugins/supply-chain-risk-auditor/skills/supply-chain-risk-auditor) | Identifies dependencies at heightened risk of exploitation or takeover. Use when assessing supply chain attack surface, evaluating dependency health, or scoping security engagements. |
| [address-sanitizer](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/address-sanitizer) | address-sanitizer |
| [aflpp](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/aflpp) | aflpp |
| [atheris](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/atheris) | atheris |
| [cargo-fuzz](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/cargo-fuzz) | cargo-fuzz |
| [constant-time-testing](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/constant-time-testing) | constant-time-testing |
| [coverage-analysis](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/coverage-analysis) | coverage-analysis |
| [fuzzing-dictionary](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/fuzzing-dictionary) | fuzzing-dictionary |
| [fuzzing-obstacles](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/fuzzing-obstacles) | fuzzing-obstacles |
| [harness-writing](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/harness-writing) | harness-writing |
| [libafl](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/libafl) | libafl |
| [libfuzzer](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/libfuzzer) | libfuzzer |
| [ossfuzz](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/ossfuzz) | ossfuzz |
| [ruzzy](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/ruzzy) | ruzzy |
| [testing-handbook-generator](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/testing-handbook-generator) | testing-handbook-generator |
| [wycheproof](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/wycheproof) | wycheproof |
| [variant-analysis](https://github.com/trailofbits/skills/tree/main/plugins/variant-analysis/skills/variant-analysis) | Find similar vulnerabilities and bugs across codebases using pattern-based analysis. Use when hunting bug variants, building CodeQL/Semgrep queries, analyzing security vulnerabilities, or performing s... |
| [designing-workflow-skills](https://github.com/trailofbits/skills/tree/main/plugins/workflow-skill-design/skills/designing-workflow-skills) | >- |
| [yara-rule-authoring](https://github.com/trailofbits/skills/tree/main/plugins/yara-authoring/skills/yara-rule-authoring) | yara-rule-authoring |
| [zeroize-audit](https://github.com/trailofbits/skills/tree/main/plugins/zeroize-audit/skills/zeroize-audit) | Detects missing zeroization of sensitive data in source code and identifies zeroization removed by compiler optimizations, with assembly-level analysis, and control-flow verification. |

</details>

## 스킬 & 플러그인 — 프로토콜별

| 레포지토리 | 스타 | 유형 | 마지막 업데이트 | 설명 |
|:-----------|------:|:----:|:---:|:------------|
| [Uniswap/uniswap-ai](https://github.com/Uniswap/uniswap-ai) | ![](https://img.shields.io/github/stars/Uniswap/uniswap-ai?style=flat-square&logo=github) | `Official` | '26.02 | 7개 스킬: Swap Planner, Liquidity Planner, Swap Integration, V4 Security, CCA Configurator/Deployer, viem Integration `7개 스킬` |
| [austintgriffith/ethskills](https://github.com/austintgriffith/ethskills) | ![](https://img.shields.io/github/stars/austintgriffith/ethskills?style=flat-square&logo=github) | `Community` | '26.02 | LLM 사각지대(가스, 지갑, L2, 표준, 주소)를 교정하는 18개 스킬. [ethskills.com](https://ethskills.com/) `23개 스킬` |
| [trustwallet/tw-agent-skills](https://github.com/trustwallet/tw-agent-skills) | ![](https://img.shields.io/github/stars/trustwallet/tw-agent-skills?style=flat-square&logo=github) | `Official` | '26.02 | 5개 스킬: trust-web3-provider (멀티체인 dApp 연동), wallet-core (140+ 체인 지갑/서명), barz (ERC-4337 스마트 지갑), assets (토큰 메타데이터), trust-developer (딥링크/WalletConnect) `5개 스킬` |
| [ruvnet/ruflo](https://github.com/ruvnet/ruflo) | ![](https://img.shields.io/github/stars/ruvnet/ruflo?style=flat-square&logo=github) | `Community` | '26.03 | Claude Code와 MCP를 통해 여러 AI 에이전트를 조율하여 소프트웨어 엔지니어링 작업을 자동화하는 기업용 에이전트 오케스트레이션 플랫폼. |

<details><summary>Uniswap/uniswap-ai 스킬 상세 (7개)</summary>

| 스킬 | 설명 |
|:-----|:------------|
| [configurator](https://github.com/Uniswap/uniswap-ai/tree/main/packages/plugins/uniswap-cca/skills/configurator) | Configure CCA (Continuous Clearing Auction) smart contract parameters through an interactive bulk form flow. |
| [deployer](https://github.com/Uniswap/uniswap-ai/tree/main/packages/plugins/uniswap-cca/skills/deployer) | Deploy CCA (Continuous Clearing Auction) smart contracts using the Factory pattern. Use when user says "deploy auction", "deploy cca", "factory deployment", or wants to deploy a configured auction. |
| [liquidity-planner](https://github.com/Uniswap/uniswap-ai/tree/main/packages/plugins/uniswap-driver/skills/liquidity-planner) | This skill should be used when the user asks to "provide liquidity", "create LP position", "add liquidity to pool", "become a liquidity provider", "create v3 position", "create v4 position", "concentr... |
| [swap-planner](https://github.com/Uniswap/uniswap-ai/tree/main/packages/plugins/uniswap-driver/skills/swap-planner) | This skill should be used when the user asks to "swap tokens", "trade ETH for USDC", "exchange tokens on Uniswap", "buy tokens", "sell tokens", "convert ETH to stablecoins", "find memecoins", "discove... |
| [v4-security-foundations](https://github.com/Uniswap/uniswap-ai/tree/main/packages/plugins/uniswap-hooks/skills/v4-security-foundations) | Security-first Uniswap v4 hook development. Use when user mentions "v4 hooks", "hook security", "PoolManager", "beforeSwap", "afterSwap", or asks about V4 hook best practices, vulnerabilities, or audi... |
| [swap-integration](https://github.com/Uniswap/uniswap-ai/tree/main/packages/plugins/uniswap-trading/skills/swap-integration) | Integrate Uniswap swaps into applications. Use when user says "integrate swaps", "uniswap", "trading api", "add swap functionality", "build a swap frontend", "create a swap script", "smart contract sw... |
| [viem-integration](https://github.com/Uniswap/uniswap-ai/tree/main/packages/plugins/uniswap-viem/skills/viem-integration) | Integrate EVM blockchains using viem. Use when user says "read blockchain data", "send transaction", "interact with smart contract", "connect to Ethereum", "use viem", "use wagmi", "wallet integration... |

</details>

<details><summary>austintgriffith/ethskills 스킬 상세 (23개)</summary>

| 스킬 | 설명 |
|:-----|:------------|
| [addresses](https://github.com/austintgriffith/ethskills/tree/main/addresses) | Verified contract addresses for major Ethereum protocols across mainnet and L2s. Use this instead of guessing or hallucinating addresses. |
| [audit](https://github.com/austintgriffith/ethskills/tree/main/audit) | Deep EVM smart contract security audit system. Use when asked to audit a contract, find vulnerabilities, review code for security issues, or file security issues on a GitHub repo. |
| [building-blocks](https://github.com/austintgriffith/ethskills/tree/main/building-blocks) | DeFi legos and protocol composability on Ethereum and L2s. Major protocols per chain — Aerodrome on Base, GMX/Pendle on Arbitrum, Velodrome on Optimism — plus mainnet primitives (Uniswap, Aave, Compou... |
| [concepts](https://github.com/austintgriffith/ethskills/tree/main/concepts) | The essential mental models for building onchain — focused on what LLMs get wrong and what humans need explained. |
| [contracts](https://github.com/austintgriffith/ethskills/tree/main/contracts) | Deprecated: this skill has moved to addresses. |
| [defi](https://github.com/austintgriffith/ethskills/tree/main/defi) | Deprecated: this skill has moved to building-blocks. |
| [frontend-playbook](https://github.com/austintgriffith/ethskills/tree/main/frontend-playbook) | The complete build-to-production pipeline for Ethereum dApps. Fork mode setup, IPFS deployment, Vercel config, ENS subdomain setup, and the full production checklist. |
| [frontend-ux](https://github.com/austintgriffith/ethskills/tree/main/frontend-ux) | Frontend UX rules for Ethereum dApps that prevent the most common AI agent UI bugs. Mandatory patterns for onchain buttons, token approval flows, address display, USD values, RPC configuration, and pr... |
| [gas](https://github.com/austintgriffith/ethskills/tree/main/gas) | Current Ethereum gas prices, transaction costs, and the real economics of building on Ethereum today. |
| [indexing](https://github.com/austintgriffith/ethskills/tree/main/indexing) | How to read and query onchain data — events, The Graph, indexing patterns. Why you cannot just loop through blocks, and what to use instead. |
| [l2](https://github.com/austintgriffith/ethskills/tree/main/l2) | Deprecated: this skill has moved to l2s. |
| [l2s](https://github.com/austintgriffith/ethskills/tree/main/l2s) | Ethereum Layer 2 landscape — Arbitrum, Optimism, Base, zkSync, Scroll, Unichain, Celo, and more. How they work, how to deploy on them, how to bridge, when to use which. |
| [layer2](https://github.com/austintgriffith/ethskills/tree/main/layer2) | Deprecated: this skill has moved to l2s. |
| [ethskills](https://github.com/austintgriffith/ethskills/tree/main/openclaw-skill) | Ethereum development knowledge for AI agents — from idea to deployed dApp. Fetch real-time docs on gas costs, Solidity patterns, Scaffold-ETH 2, Layer 2s, DeFi composability, security, testing, and pr... |
| [orchestration](https://github.com/austintgriffith/ethskills/tree/main/orchestration) | How an AI agent plans, builds, and deploys a complete Ethereum dApp. The three-phase build system for Scaffold-ETH 2 projects. |
| [qa](https://github.com/austintgriffith/ethskills/tree/main/qa) | Pre-ship audit checklist for Ethereum dApps built with Scaffold-ETH 2. Give this to a separate reviewer agent (or fresh context) AFTER the build is complete. |
| [security](https://github.com/austintgriffith/ethskills/tree/main/security) | Solidity security patterns, common vulnerabilities, and pre-deploy audit checklist. The specific code patterns that prevent real losses — not just warnings, but defensive implementations. |
| [ship](https://github.com/austintgriffith/ethskills/tree/main/ship) | End-to-end guide for AI agents — from a dApp idea to deployed production app. Fetch this FIRST, it routes you through all other skills. |
| [standards](https://github.com/austintgriffith/ethskills/tree/main/standards) | Ethereum token and protocol standards — ERC-20, ERC-721, ERC-1155, ERC-4337, ERC-8004, and newer standards. |
| [testing](https://github.com/austintgriffith/ethskills/tree/main/testing) | Smart contract testing with Foundry — unit tests, fuzz testing, fork testing, invariant testing. What to test, what not to test, and what LLMs get wrong. |
| [tools](https://github.com/austintgriffith/ethskills/tree/main/tools) | Current Ethereum development tools, frameworks, libraries, RPCs, and block explorers. What actually works today for building on Ethereum. |
| [wallets](https://github.com/austintgriffith/ethskills/tree/main/wallets) | How to create, manage, and use Ethereum wallets. Covers EOAs, smart contract wallets, multisig (Safe), and account abstraction. |
| [why-ethereum](https://github.com/austintgriffith/ethskills/tree/main/why) | Why build on Ethereum specifically. The AI agent angle — ERC-8004, x402, composability, permissionless deployment. |

</details>

<details><summary>trustwallet/tw-agent-skills 스킬 상세 (5개)</summary>

| 스킬 | 설명 |
|:-----|:------------|
| [assets](https://github.com/trustwallet/tw-agent-skills/tree/main/skills/assets) | Work with the Trust Wallet assets repository — look up token logos and metadata, list assets by blockchain, and contribute new assets (add logo, info.json, update tokenlist). |
| [barz](https://github.com/trustwallet/tw-agent-skills/tree/main/skills/barz) | Build with, use, and contribute to Barz — Trust Wallet's modular ERC-4337 smart contract wallet. Use when working with trustwallet/barz, implementing account abstraction, adding wallet facets, writing... |
| [trust-developer](https://github.com/trustwallet/tw-agent-skills/tree/main/skills/trust-developer) | Build on the Trust Wallet developer platform. Use when integrating Trust Wallet deep links, detecting the browser extension, or setting up WalletConnect. |
| [trust-web3-provider](https://github.com/trustwallet/tw-agent-skills/tree/main/skills/trust-web3-provider) | Integrate and build on Trust Wallet's Web3 provider library. Use when working with trust-web3-provider, @trustwallet/web3-provider-*, or adding blockchain provider support for Ethereum, Solana, Cosmos... |
| [wallet-core](https://github.com/trustwallet/tw-agent-skills/tree/main/skills/wallet-core) | Build with Trust Wallet Core — HD wallet creation, address derivation, and transaction signing across 140+ blockchains. |

</details>

## 스킬 & 플러그인 — 범용 Web3 규칙

| 레포지토리 | 스타 | 유형 | 마지막 업데이트 | 설명 |
|:-----------|------:|:----:|:---:|:------------|
| [leerob/directories](https://github.com/leerob/directories) | ![](https://img.shields.io/github/stars/leerob/directories?style=flat-square&logo=github) | `Community` | '26.02 | Cursor & Windsurf 커뮤니티 디렉토리, Web3 규칙 및 MCP 서버 탐색 |
| [BankrBot/openclaw-skills](https://github.com/BankrBot/openclaw-skills) | ![](https://img.shields.io/github/stars/BankrBot/openclaw-skills?style=flat-square&logo=github) | `Community` | '26.02 | OpenClaw 스킬 라이브러리, 크립토 트레이딩, DeFi 운영, Polymarket, 자동화 스킬 포함 `15개 스킬` |
| [nirholas/free-crypto-news](https://github.com/nirholas/free-crypto-news) | ![](https://img.shields.io/github/stars/nirholas/free-crypto-news?style=flat-square&logo=github) | `Community` | '26.03 | 무료 암호화폐 뉴스 API — BTC, ETH, DeFi 실시간 집계, Claude MCP 서버 및 다국어 SDK 지원 |
| [heilcheng/awesome-agent-skills](https://github.com/heilcheng/awesome-agent-skills) | ![](https://img.shields.io/github/stars/heilcheng/awesome-agent-skills?style=flat-square&logo=github) | `Community` | '26.03 | AI 코딩 에이전트(Claude, Codex, Copilot 등)를 위한 스킬, 도구, 튜토리얼 큐레이션 목록 |
| [coinmarketcap-official/skills-for-ai-agents-by-CoinMarketCap](https://github.com/coinmarketcap-official/skills-for-ai-agents-by-CoinMarketCap) | ![](https://img.shields.io/github/stars/coinmarketcap-official/skills-for-ai-agents-by-CoinMarketCap?style=flat-square&logo=github) | `Community` | '26.03 | CoinMarketCap이 AI 에이전트용으로 만든 스킬 모음으로, Claude Code/MCP와 통합하여 암호화폐 시세·정보 조회 등 Web3 기능을 AI 워크플로우에 자동화할 수 있습니다. `8개 스킬` |

<details><summary>BankrBot/openclaw-skills 스킬 상세 (15개)</summary>

| 스킬 | 설명 |
|:-----|:------------|
| [bankr-signals](https://github.com/BankrBot/openclaw-skills/tree/main/bankr-signals) | bankr-signals |
| [bankr](https://github.com/BankrBot/openclaw-skills/tree/main/bankr) | AI-powered crypto trading agent and LLM gateway via natural language. Use when the user wants to trade crypto, check portfolio balances, view token prices, transfer crypto, manage NFTs, use leverage, ... |
| [base](https://github.com/BankrBot/openclaw-skills/tree/main/base) | Placeholder for Base skill. |
| [botchan](https://github.com/BankrBot/openclaw-skills/tree/main/botchan) | CLI for the onchain agent messaging layer on the Base blockchain, built on Net Protocol. Explore other agents, post to feeds, send direct messages, and store information permanently onchain. |
| [clanker](https://github.com/BankrBot/openclaw-skills/tree/main/clanker) | Deploy ERC20 tokens on Base, Ethereum, Arbitrum, and other EVM chains using the Clanker SDK. Use when the user wants to deploy a new token, create a memecoin, set up token vesting, configure airdrops,... |
| [endaoment](https://github.com/BankrBot/openclaw-skills/tree/main/endaoment) | Donate to charities onchain via Endaoment. Use when the user wants to donate crypto to charity, make a charitable contribution, give to nonprofits, support a cause, or donate to a 501(c)(3). |
| [ens-primary-name](https://github.com/BankrBot/openclaw-skills/tree/main/ens-primary-name) | Set your primary ENS name on Base and other L2s. Use when user wants to set their ENS name, configure reverse resolution, set primary name, or make their address resolve to an ENS name. |
| [erc-8004](https://github.com/BankrBot/openclaw-skills/tree/main/erc-8004) | Register AI agents on Ethereum mainnet using ERC-8004 (Trustless Agents). Use when the user wants to register their agent identity on-chain, create an agent profile, claim an agent NFT, set up agent r... |
| [neynar](https://github.com/BankrBot/openclaw-skills/tree/main/neynar) | Interact with Farcaster via Neynar API. Use when the user wants to read Farcaster feeds, look up users, post casts, search content, or interact with the Farcaster social protocol. |
| [onchainkit](https://github.com/BankrBot/openclaw-skills/tree/main/onchainkit) | Build onchain applications with React components and TypeScript utilities from Coinbase's OnchainKit. |
| [qrcoin](https://github.com/BankrBot/openclaw-skills/tree/main/qrcoin) | Interact with QR Coin auctions on Base. Use when the user wants to participate in qrcoin.fun QR code auctions — check auction status, view current bids, create new bids, or contribute to existing bids... |
| [siwa](https://github.com/BankrBot/openclaw-skills/tree/main/siwa) | siwa |
| [veil](https://github.com/BankrBot/openclaw-skills/tree/main/veil) | Privacy and shielded transactions on Base via Veil Cash (veil.cash). Deposit ETH or USDC into private pools, withdraw/transfer privately using ZK proofs. |
| [yoink](https://github.com/BankrBot/openclaw-skills/tree/main/yoink) | Play Yoink, an onchain capture-the-flag game on Base. Yoink the flag from the current holder, check game stats and leaderboards, view player scores, and compete for the trophy. |
| [zapper](https://github.com/BankrBot/openclaw-skills/tree/main/zapper) | Placeholder for Zapper skill. |

</details>

<details><summary>coinmarketcap-official/skills-for-ai-agents-by-CoinMarketCap 스킬 상세 (8개)</summary>

| 스킬 | 설명 |
|:-----|:------------|
| [cmc-api-crypto](https://github.com/coinmarketcap-official/skills-for-ai-agents-by-CoinMarketCap/tree/main/skills/cmc-api-crypto) | API reference for CoinMarketCap cryptocurrency endpoints including quotes, listings, OHLCV, trending, and categories. |
| [cmc-api-dex](https://github.com/coinmarketcap-official/skills-for-ai-agents-by-CoinMarketCap/tree/main/skills/cmc-api-dex) | API reference for CoinMarketCap DEX endpoints including token lookup, pools, transactions, trending, and security analysis. |
| [cmc-api-exchange](https://github.com/coinmarketcap-official/skills-for-ai-agents-by-CoinMarketCap/tree/main/skills/cmc-api-exchange) | API reference for CoinMarketCap exchange endpoints including exchange info, volume, market pairs, and assets. |
| [cmc-api-market](https://github.com/coinmarketcap-official/skills-for-ai-agents-by-CoinMarketCap/tree/main/skills/cmc-api-market) | API reference for CoinMarketCap market-wide endpoints including global metrics, fear/greed, indices, trending topics, and charts. |
| [cmc-mcp](https://github.com/coinmarketcap-official/skills-for-ai-agents-by-CoinMarketCap/tree/main/skills/cmc-mcp) | Fetches cryptocurrency market data, prices, technical analysis, news, and trends using the CoinMarketCap MCP. |
| [cmc-x402](https://github.com/coinmarketcap-official/skills-for-ai-agents-by-CoinMarketCap/tree/main/skills/cmc-x402) | Access CoinMarketCap data via x402 pay-per-request protocol with USDC payments on Base. Use when users mention x402, want CMC data without API keys, ask about pay-per-request APIs, or need to integrat... |
| [crypto-research](https://github.com/coinmarketcap-official/skills-for-ai-agents-by-CoinMarketCap/tree/main/skills/crypto-research) | Performs comprehensive due diligence on a cryptocurrency using CoinMarketCap MCP data. Use when users ask about a specific coin beyond just its price. |
| [market-report](https://github.com/coinmarketcap-official/skills-for-ai-agents-by-CoinMarketCap/tree/main/skills/market-report) | Generates a comprehensive crypto market report using CoinMarketCap MCP data. Use when users ask about overall market conditions, sentiment, or want a summary. |

</details>

## MCP 서버 — 온체인 데이터 & 분석

> Claude Code에서 온체인 데이터를 직접 조회할 수 있게 해주는 MCP 서버.

| 레포지토리 | 스타 | 유형 | 마지막 업데이트 | 설명 |
|:-----------|------:|:----:|:---:|:------------|
| [mcpdotdirect/evm-mcp-server](https://github.com/mcpdotdirect/evm-mcp-server) | ![](https://img.shields.io/github/stars/mcpdotdirect/evm-mcp-server?style=flat-square&logo=github) | `Community` | '25.11 | 범용 EVM MCP, Ethereum, Base, Arbitrum, Polygon 등과 상호작용 |
| [aaronjmars/web3-research-mcp](https://github.com/aaronjmars/web3-research-mcp) | ![](https://img.shields.io/github/stars/aaronjmars/web3-research-mcp?style=flat-square&logo=github) | `Community` | '25.10 | 크립토 딥 리서치 에이전트, 로컬, 무료, 프로토콜 분석 자동화 |
| [alchemyplatform/alchemy-mcp-server](https://github.com/alchemyplatform/alchemy-mcp-server) | ![](https://img.shields.io/github/stars/alchemyplatform/alchemy-mcp-server?style=flat-square&logo=github) | `Official` | '26.01 | 60개 이상 네트워크에서 잔액, 트랜잭션, NFT, 토큰 데이터 |
| [Bankless/onchain-mcp](https://github.com/Bankless/onchain-mcp) | ![](https://img.shields.io/github/stars/Bankless/onchain-mcp?style=flat-square&logo=github) | `Official` | '26.02 | MCP를 통한 스마트 컨트랙트 상호작용, tx 조회, 토큰 정보 |
| [solana-foundation/solana-mcp-official](https://github.com/solana-foundation/solana-mcp-official) | ![](https://img.shields.io/github/stars/solana-foundation/solana-mcp-official?style=flat-square&logo=github) | `Official` | '25.08 | 솔라나 재단 공식 MCP 서버 |
| [heurist-network/heurist-mesh-mcp-server](https://github.com/heurist-network/heurist-mesh-mcp-server) | ![](https://img.shields.io/github/stars/heurist-network/heurist-mesh-mcp-server?style=flat-square&logo=github) | `Official` | '26.02 | Web3 AI 에이전트 메시, 블록체인 분석, 보안 감사, 토큰 메트릭, DeFi 분석 |
| [getAlby/mcp](https://github.com/getAlby/mcp) | ![](https://img.shields.io/github/stars/getAlby/mcp?style=flat-square&logo=github) | `Official` | '26.02 | 비트코인 라이트닝 지갑 MCP, Nostr Wallet Connect로 결제 송수신 |
| [truss44/mcp-crypto-price](https://github.com/truss44/mcp-crypto-price) | ![](https://img.shields.io/github/stars/truss44/mcp-crypto-price?style=flat-square&logo=github) | `Community` | '26.02 | CoinCap API를 통한 실시간 암호화폐 가격 분석 |
| [coinpaprika/dexpaprika-mcp](https://github.com/coinpaprika/dexpaprika-mcp) | ![](https://img.shields.io/github/stars/coinpaprika/dexpaprika-mcp?style=flat-square&logo=github) | `Official` | '25.10 | DEX 데이터 MCP, 20개 이상 체인에서 실시간 가격, 유동성 풀, OHLCV |
| [noditlabs/nodit-mcp-server](https://github.com/noditlabs/nodit-mcp-server) | ![](https://img.shields.io/github/stars/noditlabs/nodit-mcp-server?style=flat-square&logo=github) | `Official` | '26.02 | Nodit Web3 Data API MCP, AI 에이전트를 위한 멀티체인 블록체인 데이터 접근 |
| [MoralisWeb3/moralis-mcp-server](https://github.com/MoralisWeb3/moralis-mcp-server) | ![](https://img.shields.io/github/stars/MoralisWeb3/moralis-mcp-server?style=flat-square&logo=github) | `Official` | '25.10 | Moralis Web3 API MCP, NFT, 토큰, DeFi 등 멀티 네트워크 블록체인 데이터 조회 |

## MCP 서버 — 스마트 컨트랙트 & DeFi

> 스마트 컨트랙트 분석, 디컴파일, DeFi 프로토콜 접근.

| 레포지토리 | 스타 | 유형 | 마지막 업데이트 | 설명 |
|:-----------|------:|:----:|:---:|:------------|
| [PraneshASP/foundry-mcp-server](https://github.com/PraneshASP/foundry-mcp-server) | ![](https://img.shields.io/github/stars/PraneshASP/foundry-mcp-server?style=flat-square&logo=github) | `Community` | '26.01 | Foundry용 MCP 서버, AI 에이전트를 통한 Solidity 컨트랙트 컴파일/테스트/배포 |
| [debridge-finance/debridge-mcp](https://github.com/debridge-finance/debridge-mcp) | ![](https://img.shields.io/github/stars/debridge-finance/debridge-mcp?style=flat-square&logo=github) | `Official` | '26.02 | deBridge 프로토콜을 통한 크로스체인 스왑 및 전송을 AI 에이전트에서 실행 |
| [nirholas/UCAI](https://github.com/nirholas/UCAI) | ![](https://img.shields.io/github/stars/nirholas/UCAI?style=flat-square&logo=github) | `Community` | '26.02 | 범용 컨트랙트 AI 인터페이스, 모든 스마트 컨트랙트용 ABI-to-MCP 서버 생성기 |
| [thirdweb-dev/ai](https://github.com/thirdweb-dev/ai) | ![](https://img.shields.io/github/stars/thirdweb-dev/ai?style=flat-square&logo=github) | `Official` | '25.06 | AI 에이전트용 올인원 Web3 SDK (지갑, AA, RPC) |
| [aibtcdev/aibtc-mcp-server](https://github.com/aibtcdev/aibtc-mcp-server) | ![](https://img.shields.io/github/stars/aibtcdev/aibtc-mcp-server?style=flat-square&logo=github) | `Community` | '26.03 | Bitcoin-native MCP server for AI agents: BTC/STX wallets, DeFi yield, sBTC peg, NFTs, and x402 payments. |

---

# Compatible Tools

> Claude Code와 함께 쓸 때 시너지가 높은 범용 Web3 도구 — CLI 실행 가능, 에이전트 친화적, 또는 개발 컨텍스트로 유용.

## 스마트 컨트랙트 개발 도구

> Claude Code가 Bash를 통해 직접 실행 가능한 핵심 CLI 도구.

| 레포지토리 | 스타 | 유형 | 마지막 업데이트 | 설명 |
|:-----------|------:|:----:|:---:|:------------|
| [OpenZeppelin/openzeppelin-contracts](https://github.com/OpenZeppelin/openzeppelin-contracts) | ![](https://img.shields.io/github/stars/OpenZeppelin/openzeppelin-contracts?style=flat-square&logo=github) | `Official` | '26.02 | 표준 라이브러리, 모든 컨트랙트를 위한 임포트 패턴 및 보안 프리미티브 |
| [foundry-rs/foundry](https://github.com/foundry-rs/foundry) | ![](https://img.shields.io/github/stars/foundry-rs/foundry?style=flat-square&logo=github) | `Official` | '26.02 | CLI 네이티브 툴킷, `forge test`, `cast call`을 에이전트가 직접 실행 가능 |
| [NomicFoundation/hardhat](https://github.com/NomicFoundation/hardhat) | ![](https://img.shields.io/github/stars/NomicFoundation/hardhat?style=flat-square&logo=github) | `Official` | '26.02 | Ethereum 개발 환경, 컴파일/배포/테스트/디버그, `npx hardhat test` 에이전트 직접 실행 가능 |
| [crytic/slither](https://github.com/crytic/slither) | ![](https://img.shields.io/github/stars/crytic/slither?style=flat-square&logo=github) | `Official` | '26.02 | 정적 분석, Claude Code에서 `slither .` 실행 후 취약점 분석 및 수정 |
| [ConsenSysDiligence/mythril](https://github.com/ConsenSysDiligence/mythril) | ![](https://img.shields.io/github/stars/ConsenSysDiligence/mythril?style=flat-square&logo=github) | `Official` | '26.02 | 심볼릭 실행 분석기, `myth analyze` 실행으로 취약점 탐지 |
| [crytic/echidna](https://github.com/crytic/echidna) | ![](https://img.shields.io/github/stars/crytic/echidna?style=flat-square&logo=github) | `Official` | '26.02 | 속성 기반 퍼징, 불변성 테스트 작성, echidna 실행, 결과 분석 |
| [protofire/solhint](https://github.com/protofire/solhint) | ![](https://img.shields.io/github/stars/protofire/solhint?style=flat-square&logo=github) | `Community` | '26.02 | Solidity 린터, 스타일 및 보안 규칙 적용, `solhint .` 에이전트 직접 실행 가능 |
| [sc-forks/solidity-coverage](https://github.com/sc-forks/solidity-coverage) | ![](https://img.shields.io/github/stars/sc-forks/solidity-coverage?style=flat-square&logo=github) | `Community` | '25.12 | Solidity 테스트 코드 커버리지, 미테스트 컨트랙트 경로 식별 |
| [a16z/halmos](https://github.com/a16z/halmos) | ![](https://img.shields.io/github/stars/a16z/halmos?style=flat-square&logo=github) | `Official` | '25.08 | EVM 스마트 컨트랙트 심볼릭 테스팅, CLI 기반 정형 검증 |
| [Cyfrin/aderyn](https://github.com/Cyfrin/aderyn) | ![](https://img.shields.io/github/stars/Cyfrin/aderyn?style=flat-square&logo=github) | `Official` | '26.02 | Rust 기반 Solidity 정적 분석기, Slither 보완용 |
| [crytic/medusa](https://github.com/crytic/medusa) | ![](https://img.shields.io/github/stars/crytic/medusa?style=flat-square&logo=github) | `Official` | '26.02 | 병렬 커버리지 기반 Solidity 퍼저, Echidna보다 빠른 대안 |

## AI 에이전트 프레임워크 — 온체인

> 온체인 트랜잭션을 자율적으로 실행하는 AI 에이전트 프레임워크.

| 레포지토리 | 스타 | 유형 | 마지막 업데이트 | 설명 |
|:-----------|------:|:----:|:---:|:------------|
| [elizaOS/eliza](https://github.com/elizaOS/eliza) | ![](https://img.shields.io/github/stars/elizaOS/eliza?style=flat-square&logo=github) | `Community` | '26.02 | 자율 AI 에이전트, 토큰 스왑, NFT 민팅, 온체인 tx (플러그인 시스템) |
| [sendaifun/solana-agent-kit](https://github.com/sendaifun/solana-agent-kit) | ![](https://img.shields.io/github/stars/sendaifun/solana-agent-kit?style=flat-square&logo=github) | `Community` | '26.01 | 솔라나 AI 에이전트 프레임워크, 모든 AI 에이전트를 솔라나 프로토콜에 연결 |
| [coinbase/agentkit](https://github.com/coinbase/agentkit) | ![](https://img.shields.io/github/stars/coinbase/agentkit?style=flat-square&logo=github) | `Official` | '26.02 | "모든 AI 에이전트에게는 지갑이 필요합니다." ERC-4337 계정 추상화 |
| [piotrostr/listen](https://github.com/piotrostr/listen) | ![](https://img.shields.io/github/stars/piotrostr/listen?style=flat-square&logo=github) | `Community` | '25.11 | DeFAI 스위스 아미 나이프, Solana 및 EVM용 AI 기반 DeFi 에이전트 툴킷 |
| [goat-sdk/goat](https://github.com/goat-sdk/goat) | ![](https://img.shields.io/github/stars/goat-sdk/goat?style=flat-square&logo=github) | `Community` | '26.01 | 에이전틱 금융 툴킷, LLM 에이전트를 DeFi 프로토콜에 크로스체인 연결 |

## 학습 & 레퍼런스

> AI 코딩 에이전트를 활용한 Web3 개발 학습 자료.

| 레포지토리 | 스타 | 유형 | 마지막 업데이트 | 설명 |
|:-----------|------:|:----:|:---:|:------------|
| [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) | ![](https://img.shields.io/github/stars/punkpeye/awesome-mcp-servers?style=flat-square&logo=github) | `Community` | '26.02 | MCP 서버 메가 목록, 새로운 Web3 MCP 서버 탐색 시작점 |
| [ethereumbook/ethereumbook](https://github.com/ethereumbook/ethereumbook) | ![](https://img.shields.io/github/stars/ethereumbook/ethereumbook?style=flat-square&logo=github) | `Community` | '26.02 | "Mastering Ethereum" 오픈소스 도서, AI 에이전트를 위한 포괄적 Ethereum/EVM 레퍼런스 |
| [Cyfrin/foundry-full-course-cu](https://github.com/Cyfrin/foundry-full-course-cu) | ![](https://img.shields.io/github/stars/Cyfrin/foundry-full-course-cu?style=flat-square&logo=github) | `Official` | '26.02 | Foundry 전체 과정, Claude Code를 활용한 Solidity 개발 학습 레퍼런스 |
| [OpenZeppelin/ethernaut](https://github.com/OpenZeppelin/ethernaut) | ![](https://img.shields.io/github/stars/OpenZeppelin/ethernaut?style=flat-square&logo=github) | `Official` | '26.02 | 보안 CTF, Claude Code로 풀면서 스마트 컨트랙트 보안 패턴 학습 |
| [scaffold-eth/scaffold-eth-2](https://github.com/scaffold-eth/scaffold-eth-2) | ![](https://img.shields.io/github/stars/scaffold-eth/scaffold-eth-2?style=flat-square&logo=github) | `Community` | '26.02 | Next.js + Foundry/Hardhat 기반 포크 가능한 dApp 개발 스택, 빠른 프로토타이핑용 |
| [solana-foundation/awesome-solana-ai](https://github.com/solana-foundation/awesome-solana-ai) | ![](https://img.shields.io/github/stars/solana-foundation/awesome-solana-ai?style=flat-square&logo=github) | `Official` | '26.02 | 솔라나 재단의 Solana 빌드를 위한 AI 툴링 큐레이션 목록 |

---

## 기여

빠진 레포를 찾으셨나요? 이슈를 열거나 PR을 제출해 주세요!

## 라이선스

[CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/)
