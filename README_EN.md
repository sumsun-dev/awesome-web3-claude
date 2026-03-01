<div align="center">

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
| [trailofbits/skills](https://github.com/trailofbits/skills) | ![](https://img.shields.io/github/stars/trailofbits/skills?style=flat-square&logo=github) | `Official` | '26.02 | 28 plugins for security auditing, smart contract analysis, static analysis (Semgrep, CodeQL), property-based testing, and vulnerability detection |
| [trailofbits/claude-code-config](https://github.com/trailofbits/claude-code-config) | ![](https://img.shields.io/github/stars/trailofbits/claude-code-config?style=flat-square&logo=github) | `Official` | '26.02 | Opinionated Claude Code defaults, documentation, and workflows |
| [trailofbits/claude-code-devcontainer](https://github.com/trailofbits/claude-code-devcontainer) | ![](https://img.shields.io/github/stars/trailofbits/claude-code-devcontainer?style=flat-square&logo=github) | `Official` | '26.02 | Sandboxed devcontainer for running Claude Code safely in bypass mode |
| [trailofbits/skills-curated](https://github.com/trailofbits/skills-curated) | ![](https://img.shields.io/github/stars/trailofbits/skills-curated?style=flat-square&logo=github) | `Official` | '26.02 | Curated marketplace, community-vetted plugins with code review (warns of backdoor risks) |

## Skills & Plugins — Protocol-Specific

| Repository | Stars | Type | Last Updated | Description |
|:-----------|------:|:----:|:---:|:------------|
| [Uniswap/uniswap-ai](https://github.com/Uniswap/uniswap-ai) | ![](https://img.shields.io/github/stars/Uniswap/uniswap-ai?style=flat-square&logo=github) | `Official` | '26.02 | 7 skills: Swap Planner, Liquidity Planner, Swap Integration, V4 Security, CCA Configurator/Deployer, viem Integration |
| [austintgriffith/ethskills](https://github.com/austintgriffith/ethskills) | ![](https://img.shields.io/github/stars/austintgriffith/ethskills?style=flat-square&logo=github) | `Community` | '26.02 | 18 skills correcting LLM blind spots (gas, wallets, L2s, standards, addresses). [ethskills.com](https://ethskills.com/) |
| [trustwallet/tw-agent-skills](https://github.com/trustwallet/tw-agent-skills) | ![](https://img.shields.io/github/stars/trustwallet/tw-agent-skills?style=flat-square&logo=github) | `Official` | '26.02 | 5 skills: trust-web3-provider (multichain dApp integration), wallet-core (140+ chain wallet/signing), barz (ERC-4337 smart wallet), assets (token metadata), trust-developer (deep links/WalletConnect) |
| [ruvnet/ruflo](https://github.com/ruvnet/ruflo) | ![](https://img.shields.io/github/stars/ruvnet/ruflo?style=flat-square&logo=github) | `Community` | '26.03 | 🌊 The leading agent orchestration platform for Claude. Deploy intelligent multi-agent swarms, coordinate autonomous workflows, and build conversational AI systems. Features    enterprise-grade architecture, distributed swarm intelligence, RAG integration, and native Claude Code / Codex Integration |

## Skills & Plugins — General Web3 Rules

| Repository | Stars | Type | Last Updated | Description |
|:-----------|------:|:----:|:---:|:------------|
| [leerob/directories](https://github.com/leerob/directories) | ![](https://img.shields.io/github/stars/leerob/directories?style=flat-square&logo=github) | `Community` | '26.02 | Cursor & Windsurf community directory, discover Web3 rules and MCP servers |
| [BankrBot/openclaw-skills](https://github.com/BankrBot/openclaw-skills) | ![](https://img.shields.io/github/stars/BankrBot/openclaw-skills?style=flat-square&logo=github) | `Community` | '26.02 | OpenClaw skill library, includes crypto trading, DeFi operations, Polymarket, and automation skills |
| [nirholas/free-crypto-news](https://github.com/nirholas/free-crypto-news) | ![](https://img.shields.io/github/stars/nirholas/free-crypto-news?style=flat-square&logo=github) | `Community` | '26.03 | Free crypto news API - real-time aggregator for Bitcoin, Ethereum, DeFi, Solana & altcoins. No API key required. Claude MCP server, SDKs (Python, TypeScript, Go, React, PHP). |
| [heilcheng/awesome-agent-skills](https://github.com/heilcheng/awesome-agent-skills) | ![](https://img.shields.io/github/stars/heilcheng/awesome-agent-skills?style=flat-square&logo=github) | `Community` | '26.03 | A curated list of skills, tools, tutorials, and capabilities for AI coding agents (Claude, Codex, Antigravity, Copilot, VS Code) |

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
