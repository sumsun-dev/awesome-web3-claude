<div align="center">

**English** | **[한국어](./README.md)** | **[日本語](./README_JA.md)**

# Awesome Web3 Claude Code

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

Curated list of MCP servers, AI agent frameworks, skills, and dev tools for **Web3 development with Claude Code** and other AI coding agents.

This space is early-stage — entries are selected for functionality and official backing over star count.

</div>

## Contents

**Claude Code Native** — built specifically for Claude Code (Skills, MCP, config)

- [Skills & Plugins — Security & Auditing](#skills--plugins--security--auditing)
- [Skills & Plugins — Protocol-Specific](#skills--plugins--protocol-specific)
- [Skills & Plugins — General Web3 Rules](#skills--plugins--general-web3-rules)
- [MCP Servers — Onchain Data & Analytics](#mcp-servers--onchain-data--analytics)
- [MCP Servers — Smart Contract & DeFi](#mcp-servers--smart-contract--defi)

**Compatible Tools** — general-purpose tools with strong Claude Code synergy

- [Smart Contract Development Tools](#smart-contract-development-tools)
- [AI Agent Frameworks — Onchain](#ai-agent-frameworks--onchain)
- [Learning & Reference](#learning--reference)

---

# Claude Code Native

> Built for Claude Code — Skills (SKILL.md), MCP servers, and Claude Code configurations that integrate directly.

## Skills & Plugins — Security & Auditing

| Repository | Stars | Type | Last Updated | Description |
|:-----------|------:|:----:|:---:|:------------|
| [trailofbits/skills](https://github.com/trailofbits/skills) | ![](https://img.shields.io/github/stars/trailofbits/skills?style=flat-square&logo=github) | `Official` | '26.02 | 28 plugins for security auditing, smart contract analysis, static analysis (Semgrep, CodeQL), property-based testing, and vulnerability detection `60 skills` |
| [trailofbits/claude-code-config](https://github.com/trailofbits/claude-code-config) | ![](https://img.shields.io/github/stars/trailofbits/claude-code-config?style=flat-square&logo=github) | `Official` | '26.02 | Opinionated Claude Code defaults, documentation, and workflows |
| [trailofbits/claude-code-devcontainer](https://github.com/trailofbits/claude-code-devcontainer) | ![](https://img.shields.io/github/stars/trailofbits/claude-code-devcontainer?style=flat-square&logo=github) | `Official` | '26.02 | Sandboxed devcontainer for running Claude Code safely in bypass mode |
| [trailofbits/skills-curated](https://github.com/trailofbits/skills-curated) | ![](https://img.shields.io/github/stars/trailofbits/skills-curated?style=flat-square&logo=github) | `Official` | '26.02 | Curated marketplace, community-vetted plugins with code review (warns of backdoor risks) |
| [pashov/skills](https://github.com/pashov/skills) | ![](https://img.shields.io/github/stars/pashov/skills?style=flat-square&logo=github) | `Community` | '26.03 | Pashov Audit Group Skills `1 skills` |

<details><summary>trailofbits/skills skill details (60)</summary>

| Skill | Description |
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

<details><summary>pashov/skills skill details (1)</summary>

| Skill | Description |
|:-----|:------------|
| [solidity-auditor](https://github.com/pashov/skills/tree/main/solidity-auditor) | Security audit of Solidity code while you develop. Trigger on "audit", "check this contract", "review for security". |

</details>

## Skills & Plugins — Protocol-Specific

| Repository | Stars | Type | Last Updated | Description |
|:-----------|------:|:----:|:---:|:------------|
| [Uniswap/uniswap-ai](https://github.com/Uniswap/uniswap-ai) | ![](https://img.shields.io/github/stars/Uniswap/uniswap-ai?style=flat-square&logo=github) | `Official` | '26.02 | 7 skills: Swap Planner, Liquidity Planner, Swap Integration, V4 Security, CCA Configurator/Deployer, viem Integration `7 skills` |
| [austintgriffith/ethskills](https://github.com/austintgriffith/ethskills) | ![](https://img.shields.io/github/stars/austintgriffith/ethskills?style=flat-square&logo=github) | `Community` | '26.02 | 18 skills correcting LLM blind spots (gas, wallets, L2s, standards, addresses). [ethskills.com](https://ethskills.com/) `23 skills` |
| [trustwallet/tw-agent-skills](https://github.com/trustwallet/tw-agent-skills) | ![](https://img.shields.io/github/stars/trustwallet/tw-agent-skills?style=flat-square&logo=github) | `Official` | '26.02 | 5 skills: trust-web3-provider (multichain dApp integration), wallet-core (140+ chain wallet/signing), barz (ERC-4337 smart wallet), assets (token metadata), trust-developer (deep links/WalletConnect) `5 skills` |
| [ruvnet/ruflo](https://github.com/ruvnet/ruflo) | ![](https://img.shields.io/github/stars/ruvnet/ruflo?style=flat-square&logo=github) | `Community` | '26.03 | 🌊 The leading agent orchestration platform for Claude. Deploy intelligent multi-agent swarms, coordinate autonomous workflows, and build conversational AI systems. Features    enterprise-grade architecture, distributed swarm intelligence, RAG integration, and native Claude Code / Codex Integration |
| [nirholas/universal-crypto-mcp](https://github.com/nirholas/universal-crypto-mcp) | ![](https://img.shields.io/github/stars/nirholas/universal-crypto-mcp?style=flat-square&logo=github) | `Community` | '26.03 | Universal MCP server for AI agents to interact with any* blockchain via natural language and plugins. Supports swaps, bridges, gas, staking, lending, and more across Ethereum, Arbitrum, Base, Polygon, BSC, and testnets.  |
| [hashgraph-online/registry-broker-skills](https://github.com/hashgraph-online/registry-broker-skills) | ![](https://img.shields.io/github/stars/hashgraph-online/registry-broker-skills?style=flat-square&logo=github) | `Community` | '26.03 | AI agent skills for the Universal Registry - search, chat, and register 72,000+ agents across 14+ protocols. Works with Claude, Codex, Cursor, OpenClaw, and any AI assistant. |

<details><summary>Uniswap/uniswap-ai skill details (7)</summary>

| Skill | Description |
|:-----|:------------|
| [configurator](https://github.com/Uniswap/uniswap-ai/tree/main/packages/plugins/uniswap-cca/skills/configurator) | Configure CCA (Continuous Clearing Auction) smart contract parameters through an interactive bulk form flow. |
| [deployer](https://github.com/Uniswap/uniswap-ai/tree/main/packages/plugins/uniswap-cca/skills/deployer) | Deploy CCA (Continuous Clearing Auction) smart contracts using the Factory pattern. Use when user says "deploy auction", "deploy cca", "factory deployment", or wants to deploy a configured auction. |
| [liquidity-planner](https://github.com/Uniswap/uniswap-ai/tree/main/packages/plugins/uniswap-driver/skills/liquidity-planner) | This skill should be used when the user asks to "provide liquidity", "create LP position", "add liquidity to pool", "become a liquidity provider", "create v3 position", "create v4 position", "concentr... |
| [swap-planner](https://github.com/Uniswap/uniswap-ai/tree/main/packages/plugins/uniswap-driver/skills/swap-planner) | This skill should be used when the user asks to "swap tokens", "trade ETH for USDC", "exchange tokens on Uniswap", "buy tokens", "sell tokens", "convert ETH to stablecoins", "find memecoins", "discove... |
| [v4-security-foundations](https://github.com/Uniswap/uniswap-ai/tree/main/packages/plugins/uniswap-hooks/skills/v4-security-foundations) | Security-first Uniswap v4 hook development. Use when user mentions "v4 hooks", "hook security", "PoolManager", "beforeSwap", "afterSwap", or asks about V4 hook best practices, vulnerabilities, or audi... |
| [swap-integration](https://github.com/Uniswap/uniswap-ai/tree/main/packages/plugins/uniswap-trading/skills/swap-integration) | Integrate Uniswap swaps into applications. Use when user says "integrate swaps", "uniswap", "trading api", "add swap functionality", "build a swap frontend", "create a swap script", "smart contract sw... |
| [viem-integration](https://github.com/Uniswap/uniswap-ai/tree/main/packages/plugins/uniswap-viem/skills/viem-integration) | Integrate EVM blockchains using viem. Use when user says "read blockchain data", "send transaction", "interact with smart contract", "connect to Ethereum", "use viem", "use wagmi", "wallet integration... |

</details>

<details><summary>austintgriffith/ethskills skill details (23)</summary>

| Skill | Description |
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

<details><summary>trustwallet/tw-agent-skills skill details (5)</summary>

| Skill | Description |
|:-----|:------------|
| [assets](https://github.com/trustwallet/tw-agent-skills/tree/main/skills/assets) | Work with the Trust Wallet assets repository — look up token logos and metadata, list assets by blockchain, and contribute new assets (add logo, info.json, update tokenlist). |
| [barz](https://github.com/trustwallet/tw-agent-skills/tree/main/skills/barz) | Build with, use, and contribute to Barz — Trust Wallet's modular ERC-4337 smart contract wallet. Use when working with trustwallet/barz, implementing account abstraction, adding wallet facets, writing... |
| [trust-developer](https://github.com/trustwallet/tw-agent-skills/tree/main/skills/trust-developer) | Build on the Trust Wallet developer platform. Use when integrating Trust Wallet deep links, detecting the browser extension, or setting up WalletConnect. |
| [trust-web3-provider](https://github.com/trustwallet/tw-agent-skills/tree/main/skills/trust-web3-provider) | Integrate and build on Trust Wallet's Web3 provider library. Use when working with trust-web3-provider, @trustwallet/web3-provider-*, or adding blockchain provider support for Ethereum, Solana, Cosmos... |
| [wallet-core](https://github.com/trustwallet/tw-agent-skills/tree/main/skills/wallet-core) | Build with Trust Wallet Core — HD wallet creation, address derivation, and transaction signing across 140+ blockchains. |

</details>

## Skills & Plugins — General Web3 Rules

| Repository | Stars | Type | Last Updated | Description |
|:-----------|------:|:----:|:---:|:------------|
| [leerob/directories](https://github.com/leerob/directories) | ![](https://img.shields.io/github/stars/leerob/directories?style=flat-square&logo=github) | `Community` | '26.02 | Cursor & Windsurf community directory, discover Web3 rules and MCP servers |
| [BankrBot/openclaw-skills](https://github.com/BankrBot/openclaw-skills) | ![](https://img.shields.io/github/stars/BankrBot/openclaw-skills?style=flat-square&logo=github) | `Community` | '26.02 | OpenClaw skill library, includes crypto trading, DeFi operations, Polymarket, and automation skills `15 skills` |
| [nirholas/free-crypto-news](https://github.com/nirholas/free-crypto-news) | ![](https://img.shields.io/github/stars/nirholas/free-crypto-news?style=flat-square&logo=github) | `Community` | '26.03 | Free crypto news API - real-time aggregator for Bitcoin, Ethereum, DeFi, Solana & altcoins. No API key required. Claude MCP server, SDKs (Python, TypeScript, Go, React, PHP). |
| [heilcheng/awesome-agent-skills](https://github.com/heilcheng/awesome-agent-skills) | ![](https://img.shields.io/github/stars/heilcheng/awesome-agent-skills?style=flat-square&logo=github) | `Community` | '26.03 | A curated list of skills, tools, tutorials, and capabilities for AI coding agents (Claude, Codex, Antigravity, Copilot, VS Code) |
| [coinmarketcap-official/skills-for-ai-agents-by-CoinMarketCap](https://github.com/coinmarketcap-official/skills-for-ai-agents-by-CoinMarketCap) | ![](https://img.shields.io/github/stars/coinmarketcap-official/skills-for-ai-agents-by-CoinMarketCap?style=flat-square&logo=github) | `Community` | '26.03 | This repository contains all skills created by the CoinMarketCap team to power AI agents. `8 skills` |
| [binance/binance-skills-hub](https://github.com/binance/binance-skills-hub) | ![](https://img.shields.io/github/stars/binance/binance-skills-hub?style=flat-square&logo=github) | `Community` | '26.03 | Binance Skills Hub is an open skills marketplace that gives AI agents native access to crypto `7 skills` |
| [bitget-wallet-ai-lab/bitget-wallet-skill](https://github.com/bitget-wallet-ai-lab/bitget-wallet-skill) | ![](https://img.shields.io/github/stars/bitget-wallet-ai-lab/bitget-wallet-skill?style=flat-square&logo=github) | `Community` | '26.03 | AI agent skill for Bitget Wallet — token swap, cross-chain bridge, and gasless transactions via Order Mode API. Supports 7 EVM chains + Solana. |
| [quiknode-labs/blockchain-skills](https://github.com/quiknode-labs/blockchain-skills) | ![](https://img.shields.io/github/stars/quiknode-labs/blockchain-skills?style=flat-square&logo=github) | `Community` | '26.03 | Blockchain skills you can use with your coding agent, such as Claude Code, OpenCode, Codex, Cursor and more. `1 skills` |

<details><summary>BankrBot/openclaw-skills skill details (15)</summary>

| Skill | Description |
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

<details><summary>coinmarketcap-official/skills-for-ai-agents-by-CoinMarketCap skill details (8)</summary>

| Skill | Description |
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

<details><summary>binance/binance-skills-hub skill details (7)</summary>

| Skill | Description |
|:-----|:------------|
| [crypto-market-rank](https://github.com/binance/binance-skills-hub/tree/main/skills/binance-web3/crypto-market-rank) | Crypto market rankings and leaderboards. Query trending tokens, top searched tokens, Binance Alpha tokens, tokenized stocks, social hype sentiment ranks, smart money inflow token rankings, top meme to... |
| [meme-rush](https://github.com/binance/binance-skills-hub/tree/main/skills/binance-web3/meme-rush) | Meme token fast-trading assistant with two core capabilities: 1. Meme Rush - Real-time meme token lists from launchpads (Pump.fun, Four.meme, etc.) across new, finalizing, and migrated stages 2. |
| [query-address-info](https://github.com/binance/binance-skills-hub/tree/main/skills/binance-web3/query-address-info) | Query any on-chain wallet address token balances and positions. Retrieves all token holdings for a specified wallet address on a given chain, including token name, symbol, price, 24h price change, and... |
| [query-token-audit](https://github.com/binance/binance-skills-hub/tree/main/skills/binance-web3/query-token-audit) | Query token security audit to detect scams, honeypots, and malicious contracts before trading. Returns comprehensive security analysis including contract risks, trading risks, and scam detection. |
| [query-token-info](https://github.com/binance/binance-skills-hub/tree/main/skills/binance-web3/query-token-info) | Query token details by keyword, contract address, or chain. Search tokens, get metadata and social links, retrieve real-time market data (price, price trend, volume, holders, liquidity), and fetch K-L... |
| [trading-signal](https://github.com/binance/binance-skills-hub/tree/main/skills/binance-web3/trading-signal) | Subscribe and retrieve on-chain Smart Money signals. Monitor trading activities of smart money addresses, including buy/sell signals, trigger price, current price, max gain, and exit rate. |
| [spot](https://github.com/binance/binance-skills-hub/tree/main/skills/binance/spot) | Binance Spot request using the Binance API. Authentication requires API key and secret key. Supports testnet and mainnet. |

</details>

<details><summary>quiknode-labs/blockchain-skills skill details (1)</summary>

| Skill | Description |
|:-----|:------------|
| [quicknode-skill](https://github.com/quiknode-labs/blockchain-skills/tree/main/skills/quicknode-skill) | Quicknode blockchain infrastructure including RPC endpoints (80+ chains), Streams (real-time data), Webhooks, IPFS storage, Marketplace Add-ons (Token API, NFT API, DeFi tools), Solana DAS API (Digita... |

</details>

## MCP Servers — Onchain Data & Analytics

> MCP servers that let Claude Code query onchain data directly.

| Repository | Stars | Type | Last Updated | Description |
|:-----------|------:|:----:|:---:|:------------|
| [mcpdotdirect/evm-mcp-server](https://github.com/mcpdotdirect/evm-mcp-server) | ![](https://img.shields.io/github/stars/mcpdotdirect/evm-mcp-server?style=flat-square&logo=github) | `Community` | '25.11 | General-purpose EVM MCP, interact with Ethereum, Base, Arbitrum, Polygon and more |
| [aaronjmars/web3-research-mcp](https://github.com/aaronjmars/web3-research-mcp) | ![](https://img.shields.io/github/stars/aaronjmars/web3-research-mcp?style=flat-square&logo=github) | `Community` | '25.10 | Crypto deep research agent, local, free, protocol analysis automation |
| [alchemyplatform/alchemy-mcp-server](https://github.com/alchemyplatform/alchemy-mcp-server) | ![](https://img.shields.io/github/stars/alchemyplatform/alchemy-mcp-server?style=flat-square&logo=github) | `Official` | '26.01 | Balances, transactions, NFTs, and token data across 60+ networks |
| [Bankless/onchain-mcp](https://github.com/Bankless/onchain-mcp) | ![](https://img.shields.io/github/stars/Bankless/onchain-mcp?style=flat-square&logo=github) | `Official` | '26.02 | Smart contract interactions, tx queries, and token info via MCP |
| [solana-foundation/solana-mcp-official](https://github.com/solana-foundation/solana-mcp-official) | ![](https://img.shields.io/github/stars/solana-foundation/solana-mcp-official?style=flat-square&logo=github) | `Official` | '25.08 | Solana Foundation MCP server |
| [heurist-network/heurist-mesh-mcp-server](https://github.com/heurist-network/heurist-mesh-mcp-server) | ![](https://img.shields.io/github/stars/heurist-network/heurist-mesh-mcp-server?style=flat-square&logo=github) | `Official` | '26.02 | Web3 AI agent mesh, blockchain analysis, security audits, token metrics, DeFi analytics |
| [getAlby/mcp](https://github.com/getAlby/mcp) | ![](https://img.shields.io/github/stars/getAlby/mcp?style=flat-square&logo=github) | `Official` | '26.02 | Bitcoin Lightning wallet MCP, send and receive payments via Nostr Wallet Connect |
| [truss44/mcp-crypto-price](https://github.com/truss44/mcp-crypto-price) | ![](https://img.shields.io/github/stars/truss44/mcp-crypto-price?style=flat-square&logo=github) | `Community` | '26.02 | Real-time crypto price analysis via CoinCap API |
| [coinpaprika/dexpaprika-mcp](https://github.com/coinpaprika/dexpaprika-mcp) | ![](https://img.shields.io/github/stars/coinpaprika/dexpaprika-mcp?style=flat-square&logo=github) | `Official` | '25.10 | DEX data MCP, real-time prices, liquidity pools, OHLCV across 20+ chains |
| [noditlabs/nodit-mcp-server](https://github.com/noditlabs/nodit-mcp-server) | ![](https://img.shields.io/github/stars/noditlabs/nodit-mcp-server?style=flat-square&logo=github) | `Official` | '26.02 | Nodit Web3 Data API MCP, multi-chain blockchain data access for AI agents |
| [MoralisWeb3/moralis-mcp-server](https://github.com/MoralisWeb3/moralis-mcp-server) | ![](https://img.shields.io/github/stars/MoralisWeb3/moralis-mcp-server?style=flat-square&logo=github) | `Official` | '25.10 | Moralis Web3 API MCP, query blockchain data across multiple networks including NFTs, tokens, and DeFi |

## MCP Servers — Smart Contract & DeFi

> Smart contract analysis, decompilation, and DeFi protocol access.

| Repository | Stars | Type | Last Updated | Description |
|:-----------|------:|:----:|:---:|:------------|
| [PraneshASP/foundry-mcp-server](https://github.com/PraneshASP/foundry-mcp-server) | ![](https://img.shields.io/github/stars/PraneshASP/foundry-mcp-server?style=flat-square&logo=github) | `Community` | '26.01 | MCP server for Foundry, compile/test/deploy Solidity contracts via AI agents |
| [debridge-finance/debridge-mcp](https://github.com/debridge-finance/debridge-mcp) | ![](https://img.shields.io/github/stars/debridge-finance/debridge-mcp?style=flat-square&logo=github) | `Official` | '26.02 | Cross-chain swaps and transfers via deBridge protocol for AI agents |
| [nirholas/UCAI](https://github.com/nirholas/UCAI) | ![](https://img.shields.io/github/stars/nirholas/UCAI?style=flat-square&logo=github) | `Community` | '26.02 | Universal Contract AI Interface, ABI-to-MCP server generator for any smart contract |
| [thirdweb-dev/ai](https://github.com/thirdweb-dev/ai) | ![](https://img.shields.io/github/stars/thirdweb-dev/ai?style=flat-square&logo=github) | `Official` | '25.06 | All-in-one Web3 SDK (wallets, AA, RPC) for AI agents |
| [aibtcdev/aibtc-mcp-server](https://github.com/aibtcdev/aibtc-mcp-server) | ![](https://img.shields.io/github/stars/aibtcdev/aibtc-mcp-server?style=flat-square&logo=github) | `Community` | '26.03 | Bitcoin-native MCP server for AI agents: BTC/STX wallets, DeFi yield, sBTC peg, NFTs, and x402 payments. |
| [minhoyoo-iotrust/WAIaaS](https://github.com/minhoyoo-iotrust/WAIaaS) | ![](https://img.shields.io/github/stars/minhoyoo-iotrust/WAIaaS?style=flat-square&logo=github) | `Community` | '26.03 | Wallet-as-a-Service for all AI agents in the world |

---

# Compatible Tools

> General-purpose Web3 tools that work well with Claude Code — CLI-executable, agent-friendly, or useful as development context.

## Smart Contract Development Tools

> Core CLI tools directly executable by Claude Code via Bash.

| Repository | Stars | Type | Last Updated | Description |
|:-----------|------:|:----:|:---:|:------------|
| [OpenZeppelin/openzeppelin-contracts](https://github.com/OpenZeppelin/openzeppelin-contracts) | ![](https://img.shields.io/github/stars/OpenZeppelin/openzeppelin-contracts?style=flat-square&logo=github) | `Official` | '26.02 | The standard library, import patterns and security primitives for any contract |
| [foundry-rs/foundry](https://github.com/foundry-rs/foundry) | ![](https://img.shields.io/github/stars/foundry-rs/foundry?style=flat-square&logo=github) | `Official` | '26.02 | CLI-native toolkit, `forge test`, `cast call` are directly executable by agents |
| [NomicFoundation/hardhat](https://github.com/NomicFoundation/hardhat) | ![](https://img.shields.io/github/stars/NomicFoundation/hardhat?style=flat-square&logo=github) | `Official` | '26.02 | Ethereum development environment, compile/deploy/test/debug, `npx hardhat test` directly executable by agents |
| [crytic/slither](https://github.com/crytic/slither) | ![](https://img.shields.io/github/stars/crytic/slither?style=flat-square&logo=github) | `Official` | '26.02 | Static analysis, run `slither .` in Claude Code, analyze and fix vulnerabilities |
| [ConsenSysDiligence/mythril](https://github.com/ConsenSysDiligence/mythril) | ![](https://img.shields.io/github/stars/ConsenSysDiligence/mythril?style=flat-square&logo=github) | `Official` | '26.02 | Symbolic execution analyzer, run `myth analyze` to detect vulnerabilities |
| [crytic/echidna](https://github.com/crytic/echidna) | ![](https://img.shields.io/github/stars/crytic/echidna?style=flat-square&logo=github) | `Official` | '26.02 | Property-based fuzzing, write invariant tests, run echidna, analyze results |
| [protofire/solhint](https://github.com/protofire/solhint) | ![](https://img.shields.io/github/stars/protofire/solhint?style=flat-square&logo=github) | `Community` | '26.02 | Solidity linter, enforce style and security rules, `solhint .` directly executable by agents |
| [sc-forks/solidity-coverage](https://github.com/sc-forks/solidity-coverage) | ![](https://img.shields.io/github/stars/sc-forks/solidity-coverage?style=flat-square&logo=github) | `Community` | '25.12 | Code coverage for Solidity tests, identify untested contract paths |
| [a16z/halmos](https://github.com/a16z/halmos) | ![](https://img.shields.io/github/stars/a16z/halmos?style=flat-square&logo=github) | `Official` | '25.08 | Symbolic testing for EVM smart contracts, formal verification via CLI |
| [Cyfrin/aderyn](https://github.com/Cyfrin/aderyn) | ![](https://img.shields.io/github/stars/Cyfrin/aderyn?style=flat-square&logo=github) | `Official` | '26.02 | Rust-based Solidity static analyzer, complementary to Slither |
| [crytic/medusa](https://github.com/crytic/medusa) | ![](https://img.shields.io/github/stars/crytic/medusa?style=flat-square&logo=github) | `Official` | '26.02 | Parallelized coverage-guided Solidity fuzzer, faster alternative to Echidna |

## AI Agent Frameworks — Onchain

> Frameworks for AI agents that autonomously execute onchain transactions.

| Repository | Stars | Type | Last Updated | Description |
|:-----------|------:|:----:|:---:|:------------|
| [elizaOS/eliza](https://github.com/elizaOS/eliza) | ![](https://img.shields.io/github/stars/elizaOS/eliza?style=flat-square&logo=github) | `Community` | '26.02 | Autonomous AI agent, token swaps, NFT minting, onchain txs with plugin system |
| [sendaifun/solana-agent-kit](https://github.com/sendaifun/solana-agent-kit) | ![](https://img.shields.io/github/stars/sendaifun/solana-agent-kit?style=flat-square&logo=github) | `Community` | '26.01 | Solana AI agent framework, connect any AI agent to Solana protocols |
| [coinbase/agentkit](https://github.com/coinbase/agentkit) | ![](https://img.shields.io/github/stars/coinbase/agentkit?style=flat-square&logo=github) | `Official` | '26.02 | "Every AI Agent deserves a wallet." ERC-4337 account abstraction |
| [piotrostr/listen](https://github.com/piotrostr/listen) | ![](https://img.shields.io/github/stars/piotrostr/listen?style=flat-square&logo=github) | `Community` | '25.11 | DeFAI Swiss Army Knife, AI-powered DeFi agent toolkit for Solana and EVM |
| [goat-sdk/goat](https://github.com/goat-sdk/goat) | ![](https://img.shields.io/github/stars/goat-sdk/goat?style=flat-square&logo=github) | `Community` | '26.01 | Agentic finance toolkit, connect LLM agents to DeFi protocols across chains |

## Learning & Reference

> Resources for learning Web3 development with AI coding agents.

| Repository | Stars | Type | Last Updated | Description |
|:-----------|------:|:----:|:---:|:------------|
| [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) | ![](https://img.shields.io/github/stars/punkpeye/awesome-mcp-servers?style=flat-square&logo=github) | `Community` | '26.02 | MCP server mega-list, starting point for discovering new Web3 MCP servers |
| [ethereumbook/ethereumbook](https://github.com/ethereumbook/ethereumbook) | ![](https://img.shields.io/github/stars/ethereumbook/ethereumbook?style=flat-square&logo=github) | `Community` | '26.02 | "Mastering Ethereum" open-source book, comprehensive Ethereum/EVM reference for AI agents |
| [Cyfrin/foundry-full-course-cu](https://github.com/Cyfrin/foundry-full-course-cu) | ![](https://img.shields.io/github/stars/Cyfrin/foundry-full-course-cu?style=flat-square&logo=github) | `Official` | '26.02 | Foundry full course, learning reference for Solidity dev with Claude Code |
| [OpenZeppelin/ethernaut](https://github.com/OpenZeppelin/ethernaut) | ![](https://img.shields.io/github/stars/OpenZeppelin/ethernaut?style=flat-square&logo=github) | `Official` | '26.02 | Security CTF, learn smart contract security patterns by solving with Claude Code |
| [scaffold-eth/scaffold-eth-2](https://github.com/scaffold-eth/scaffold-eth-2) | ![](https://img.shields.io/github/stars/scaffold-eth/scaffold-eth-2?style=flat-square&logo=github) | `Community` | '26.02 | Forkable dApp dev stack with Next.js + Foundry/Hardhat for rapid prototyping |
| [solana-foundation/awesome-solana-ai](https://github.com/solana-foundation/awesome-solana-ai) | ![](https://img.shields.io/github/stars/solana-foundation/awesome-solana-ai?style=flat-square&logo=github) | `Official` | '26.02 | Solana Foundation's curated list of AI tooling for building on Solana |

---

## Contributing

Found a missing repo? Open an issue or submit a PR!

## License

[CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/)
