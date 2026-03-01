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
| [trailofbits/skills](https://github.com/trailofbits/skills) | ![](https://img.shields.io/github/stars/trailofbits/skills?style=flat-square&logo=github) | `Official` | '26.02 | 보안 감사, 스마트 컨트랙트 분석, 정적분석(Semgrep, CodeQL), 속성 기반 테스팅, 취약점 탐지용 28개 플러그인 |
| [trailofbits/claude-code-config](https://github.com/trailofbits/claude-code-config) | ![](https://img.shields.io/github/stars/trailofbits/claude-code-config?style=flat-square&logo=github) | `Official` | '26.02 | Claude Code 설정 프레임워크 (오피니어니티드 디폴트 및 워크플로우) |
| [trailofbits/claude-code-devcontainer](https://github.com/trailofbits/claude-code-devcontainer) | ![](https://img.shields.io/github/stars/trailofbits/claude-code-devcontainer?style=flat-square&logo=github) | `Official` | '26.02 | 바이패스 모드에서 안전하게 Claude Code를 실행하기 위한 샌드박스 devcontainer |
| [trailofbits/skills-curated](https://github.com/trailofbits/skills-curated) | ![](https://img.shields.io/github/stars/trailofbits/skills-curated?style=flat-square&logo=github) | `Official` | '26.02 | 큐레이티드 마켓플레이스, 코드 리뷰를 거친 커뮤니티 검증 플러그인 (백도어 위험 경고) |

## 스킬 & 플러그인 — 프로토콜별

| 레포지토리 | 스타 | 유형 | 마지막 업데이트 | 설명 |
|:-----------|------:|:----:|:---:|:------------|
| [Uniswap/uniswap-ai](https://github.com/Uniswap/uniswap-ai) | ![](https://img.shields.io/github/stars/Uniswap/uniswap-ai?style=flat-square&logo=github) | `Official` | '26.02 | 7개 스킬: Swap Planner, Liquidity Planner, Swap Integration, V4 Security, CCA Configurator/Deployer, viem Integration |
| [austintgriffith/ethskills](https://github.com/austintgriffith/ethskills) | ![](https://img.shields.io/github/stars/austintgriffith/ethskills?style=flat-square&logo=github) | `Community` | '26.02 | LLM 사각지대(가스, 지갑, L2, 표준, 주소)를 교정하는 18개 스킬. [ethskills.com](https://ethskills.com/) |
| [trustwallet/tw-agent-skills](https://github.com/trustwallet/tw-agent-skills) | ![](https://img.shields.io/github/stars/trustwallet/tw-agent-skills?style=flat-square&logo=github) | `Official` | '26.02 | 5개 스킬: trust-web3-provider (멀티체인 dApp 연동), wallet-core (140+ 체인 지갑/서명), barz (ERC-4337 스마트 지갑), assets (토큰 메타데이터), trust-developer (딥링크/WalletConnect) |

## 스킬 & 플러그인 — 범용 Web3 규칙

| 레포지토리 | 스타 | 유형 | 마지막 업데이트 | 설명 |
|:-----------|------:|:----:|:---:|:------------|
| [leerob/directories](https://github.com/leerob/directories) | ![](https://img.shields.io/github/stars/leerob/directories?style=flat-square&logo=github) | `Community` | '26.02 | Cursor & Windsurf 커뮤니티 디렉토리, Web3 규칙 및 MCP 서버 탐색 |
| [BankrBot/openclaw-skills](https://github.com/BankrBot/openclaw-skills) | ![](https://img.shields.io/github/stars/BankrBot/openclaw-skills?style=flat-square&logo=github) | `Community` | '26.02 | OpenClaw 스킬 라이브러리, 크립토 트레이딩, DeFi 운영, Polymarket, 자동화 스킬 포함 |
| [nirholas/free-crypto-news](https://github.com/nirholas/free-crypto-news) | ![](https://img.shields.io/github/stars/nirholas/free-crypto-news?style=flat-square&logo=github) | `Community` | '26.03 | 무료 암호화폐 뉴스 API — BTC, ETH, DeFi 실시간 집계, Claude MCP 서버 및 다국어 SDK 지원 |
| [heilcheng/awesome-agent-skills](https://github.com/heilcheng/awesome-agent-skills) | ![](https://img.shields.io/github/stars/heilcheng/awesome-agent-skills?style=flat-square&logo=github) | `Community` | '26.03 | AI 코딩 에이전트(Claude, Codex, Copilot 등)를 위한 스킬, 도구, 튜토리얼 큐레이션 목록 |

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
