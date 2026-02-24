<div align="center">

# Awesome Web3 Claude Code

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

**Claude Code** 및 기타 AI 코딩 에이전트를 활용한 **Web3 개발**을 위한 MCP 서버, AI 에이전트 프레임워크, 스킬, 개발 도구 큐레이션 목록.

이 분야는 초기 단계입니다 — 스타 수보다 기능성과 공식 지원 여부를 기준으로 선정합니다.

</div>

## 목차

- [MCP 서버 — 온체인 데이터 & 분석](#mcp-서버--온체인-데이터--분석)
- [MCP 서버 — 스마트 컨트랙트 & DeFi](#mcp-서버--스마트-컨트랙트--defi)
- [AI 에이전트 프레임워크 — 온체인](#ai-에이전트-프레임워크--온체인)
- [Claude Code Web3 스킬 & 플러그인](#claude-code-web3-스킬--플러그인)
- [스마트 컨트랙트 개발 도구](#스마트-컨트랙트-개발-도구)
- [학습 & 레퍼런스](#학습--레퍼런스)

---

## MCP 서버 — 온체인 데이터 & 분석

> Claude Code에서 온체인 데이터를 직접 조회할 수 있게 해주는 MCP 서버.

| 레포지토리 | 스타 | 설명 |
|:-----------|:-----:|:------------|
| [mcpdotdirect/evm-mcp-server](https://github.com/mcpdotdirect/evm-mcp-server) | ![](https://img.shields.io/github/stars/mcpdotdirect/evm-mcp-server?style=flat-square&logo=github) | 범용 EVM MCP — Ethereum, Base, Arbitrum, Polygon 등과 상호작용 |
| [base/base-mcp](https://github.com/base/base-mcp) | ![](https://img.shields.io/github/stars/base/base-mcp?style=flat-square&logo=github) | Coinbase 공식 — Base L2에서 지갑 관리, 전송, 스마트 컨트랙트, DeFi 운영 |
| [sendaifun/solana-mcp](https://github.com/sendaifun/solana-mcp) | ![](https://img.shields.io/github/stars/sendaifun/solana-mcp?style=flat-square&logo=github) | Solana MCP — Solana Agent Kit 기반, 토큰 운영 및 DeFi |
| [solana-foundation/solana-mcp-official](https://github.com/solana-foundation/solana-mcp-official) | ![](https://img.shields.io/github/stars/solana-foundation/solana-mcp-official?style=flat-square&logo=github) | 솔라나 재단 공식 MCP 서버 |
| [aaronjmars/web3-research-mcp](https://github.com/aaronjmars/web3-research-mcp) | ![](https://img.shields.io/github/stars/aaronjmars/web3-research-mcp?style=flat-square&logo=github) | 크립토 딥 리서치 에이전트 — 로컬, 무료, 프로토콜 분석 자동화 |
| [alchemyplatform/alchemy-mcp-server](https://github.com/alchemyplatform/alchemy-mcp-server) | ![](https://img.shields.io/github/stars/alchemyplatform/alchemy-mcp-server?style=flat-square&logo=github) | Alchemy 공식 — 60개 이상 네트워크에서 잔액, 트랜잭션, NFT, 토큰 데이터 |
| [Bankless/onchain-mcp](https://github.com/Bankless/onchain-mcp) | ![](https://img.shields.io/github/stars/Bankless/onchain-mcp?style=flat-square&logo=github) | Bankless 공식 — MCP를 통한 스마트 컨트랙트 상호작용, tx 조회, 토큰 정보 |
| [heurist-network/heurist-mesh-mcp-server](https://github.com/heurist-network/heurist-mesh-mcp-server) | ![](https://img.shields.io/github/stars/heurist-network/heurist-mesh-mcp-server?style=flat-square&logo=github) | Web3 AI 에이전트 메시 — 블록체인 분석, 보안 감사, 토큰 메트릭, DeFi 분석 |
| [demcp/demcp-defillama-mcp](https://github.com/demcp/demcp-defillama-mcp) | ![](https://img.shields.io/github/stars/demcp/demcp-defillama-mcp?style=flat-square&logo=github) | DefiLlama MCP — 멀티체인 DeFi 데이터 접근 (TVL, 수익률, 풀) |
| [getAlby/mcp](https://github.com/getAlby/mcp) | ![](https://img.shields.io/github/stars/getAlby/mcp?style=flat-square&logo=github) | 비트코인 라이트닝 지갑 MCP — Nostr Wallet Connect로 결제 송수신 |
| [nearai/near-mcp](https://github.com/nearai/near-mcp) | ![](https://img.shields.io/github/stars/nearai/near-mcp?style=flat-square&logo=github) | NEAR AI 공식 — NEAR 블록체인용 MCP 서버 |
| [coinpaprika/dexpaprika-mcp](https://github.com/coinpaprika/dexpaprika-mcp) | ![](https://img.shields.io/github/stars/coinpaprika/dexpaprika-mcp?style=flat-square&logo=github) | DEX 데이터 MCP — 20개 이상 체인에서 실시간 가격, 유동성 풀, OHLCV |
| [Codex-Data/codex-mcp](https://github.com/Codex-Data/codex-mcp) | ![](https://img.shields.io/github/stars/Codex-Data/codex-mcp?style=flat-square&logo=github) | Codex API MCP — 60개 이상 네트워크에서 실시간 시장 데이터 및 토큰 메트릭 |

## MCP 서버 — 스마트 컨트랙트 & DeFi

> 스마트 컨트랙트 분석, 디컴파일, DeFi 프로토콜 접근.

| 레포지토리 | 스타 | 설명 |
|:-----------|:-----:|:------------|
| [thirdweb-dev/ai](https://github.com/thirdweb-dev/ai) | ![](https://img.shields.io/github/stars/thirdweb-dev/ai?style=flat-square&logo=github) | Thirdweb 공식 — AI 에이전트용 올인원 Web3 SDK (지갑, AA, RPC) |
| [ahnlabio/bicscan-mcp](https://github.com/ahnlabio/bicscan-mcp) | ![](https://img.shields.io/github/stars/ahnlabio/bicscan-mcp?style=flat-square&logo=github) | AhnLab 공식 — EVM 주소 위험 점수 산정 및 자산 분석 |

## AI 에이전트 프레임워크 — 온체인

> 온체인 트랜잭션을 자율적으로 실행하는 AI 에이전트 프레임워크.

| 레포지토리 | 스타 | 설명 |
|:-----------|:-----:|:------------|
| [elizaOS/eliza](https://github.com/elizaOS/eliza) | ![](https://img.shields.io/github/stars/elizaOS/eliza?style=flat-square&logo=github) | 자율 AI 에이전트 — 토큰 스왑, NFT 민팅, 온체인 tx (플러그인 시스템) |
| [sendaifun/solana-agent-kit](https://github.com/sendaifun/solana-agent-kit) | ![](https://img.shields.io/github/stars/sendaifun/solana-agent-kit?style=flat-square&logo=github) | 솔라나 AI 에이전트 프레임워크 — 모든 AI 에이전트를 솔라나 프로토콜에 연결 |
| [coinbase/agentkit](https://github.com/coinbase/agentkit) | ![](https://img.shields.io/github/stars/coinbase/agentkit?style=flat-square&logo=github) | Coinbase 공식 — "모든 AI 에이전트에게는 지갑이 필요합니다." ERC-4337 계정 추상화 |
| [goat-sdk/goat](https://github.com/goat-sdk/goat) | ![](https://img.shields.io/github/stars/goat-sdk/goat?style=flat-square&logo=github) | 에이전틱 금융 툴킷 — LLM 에이전트를 DeFi 프로토콜에 크로스체인 연결 |

## Claude Code Web3 스킬 & 플러그인

> Claude Code 및 기타 AI 코딩 에이전트를 위한 Web3 스킬, 플러그인, 규칙.

### 보안 & 감사

| 레포지토리 | 스타 | 설명 |
|:-----------|:-----:|:------------|
| [trailofbits/skills](https://github.com/trailofbits/skills) | ![](https://img.shields.io/github/stars/trailofbits/skills?style=flat-square&logo=github) | Trail of Bits — 보안 감사, 스마트 컨트랙트 분석, 정적분석(Semgrep, CodeQL), 속성 기반 테스팅, 취약점 탐지용 28개 플러그인 |
| [trailofbits/skills-curated](https://github.com/trailofbits/skills-curated) | ![](https://img.shields.io/github/stars/trailofbits/skills-curated?style=flat-square&logo=github) | Trail of Bits 큐레이티드 마켓플레이스 — 코드 리뷰를 거친 커뮤니티 검증 플러그인 (백도어 위험 경고) |
| [trailofbits/claude-code-config](https://github.com/trailofbits/claude-code-config) | ![](https://img.shields.io/github/stars/trailofbits/claude-code-config?style=flat-square&logo=github) | Trail of Bits — Claude Code 설정 프레임워크 (오피니어니티드 디폴트 및 워크플로우) |
| [trailofbits/claude-code-devcontainer](https://github.com/trailofbits/claude-code-devcontainer) | ![](https://img.shields.io/github/stars/trailofbits/claude-code-devcontainer?style=flat-square&logo=github) | Trail of Bits — 바이패스 모드에서 안전하게 Claude Code를 실행하기 위한 샌드박스 devcontainer |

### 프로토콜별 스킬

| 레포지토리 | 스타 | 설명 |
|:-----------|:-----:|:------------|
| [Uniswap/uniswap-ai](https://github.com/Uniswap/uniswap-ai) | ![](https://img.shields.io/github/stars/Uniswap/uniswap-ai?style=flat-square&logo=github) | Uniswap 공식 — 7개 스킬: Swap Planner, Liquidity Planner, Swap Integration, V4 Security, CCA Configurator/Deployer, viem Integration |
| [austintgriffith/ethskills](https://github.com/austintgriffith/ethskills) | ![](https://img.shields.io/github/stars/austintgriffith/ethskills?style=flat-square&logo=github) | ETHSKILLS — LLM 사각지대(가스, 지갑, L2, 표준, 주소)를 교정하는 18개 스킬. [ethskills.com](https://ethskills.com/) |

### 범용 Web3 규칙

| 레포지토리 | 스타 | 설명 |
|:-----------|:-----:|:------------|
| [max-taylor/Claude-Solidity-Skills](https://github.com/max-taylor/Claude-Solidity-Skills) | ![](https://img.shields.io/github/stars/max-taylor/Claude-Solidity-Skills?style=flat-square&logo=github) | Claude Code용 Solidity 전용 SKILL.md |
| [sanjeed5/awesome-cursor-rules-mdc](https://github.com/sanjeed5/awesome-cursor-rules-mdc) | ![](https://img.shields.io/github/stars/sanjeed5/awesome-cursor-rules-mdc?style=flat-square&logo=github) | Cursor 규칙 큐레이션 (Solidity/Web3 포함) — CLAUDE.md로 변환 가능 |
| [leerob/directories](https://github.com/leerob/directories) | ![](https://img.shields.io/github/stars/leerob/directories?style=flat-square&logo=github) | Cursor & Windsurf 커뮤니티 디렉토리 — Web3 규칙 및 MCP 서버 탐색 |

## 스마트 컨트랙트 개발 도구

> Claude Code와 함께 사용할 때 강력한 시너지를 내는 핵심 CLI 도구.

| 레포지토리 | 스타 | 설명 |
|:-----------|:-----:|:------------|
| [foundry-rs/foundry](https://github.com/foundry-rs/foundry) | ![](https://img.shields.io/github/stars/foundry-rs/foundry?style=flat-square&logo=github) | CLI 네이티브 툴킷 — `forge test`, `cast call`을 에이전트가 직접 실행 가능 |
| [crytic/slither](https://github.com/crytic/slither) | ![](https://img.shields.io/github/stars/crytic/slither?style=flat-square&logo=github) | 정적 분석 — Claude Code에서 `slither .` 실행 후 취약점 분석 및 수정 |
| [crytic/echidna](https://github.com/crytic/echidna) | ![](https://img.shields.io/github/stars/crytic/echidna?style=flat-square&logo=github) | 속성 기반 퍼징 — 불변성 테스트 작성, echidna 실행, 결과 분석 |
| [OpenZeppelin/openzeppelin-contracts](https://github.com/OpenZeppelin/openzeppelin-contracts) | ![](https://img.shields.io/github/stars/OpenZeppelin/openzeppelin-contracts?style=flat-square&logo=github) | 표준 라이브러리 — 모든 컨트랙트를 위한 임포트 패턴 및 보안 프리미티브 |

## 학습 & 레퍼런스

> AI 코딩 에이전트를 활용한 Web3 개발 학습 자료.

| 레포지토리 | 스타 | 설명 |
|:-----------|:-----:|:------------|
| [Cyfrin/foundry-full-course-cu](https://github.com/Cyfrin/foundry-full-course-cu) | ![](https://img.shields.io/github/stars/Cyfrin/foundry-full-course-cu?style=flat-square&logo=github) | Foundry 전체 과정 — Claude Code를 활용한 Solidity 개발 학습 레퍼런스 |
| [OpenZeppelin/ethernaut](https://github.com/OpenZeppelin/ethernaut) | ![](https://img.shields.io/github/stars/OpenZeppelin/ethernaut?style=flat-square&logo=github) | 보안 CTF — Claude Code로 풀면서 스마트 컨트랙트 보안 패턴 학습 |
| [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) | ![](https://img.shields.io/github/stars/punkpeye/awesome-mcp-servers?style=flat-square&logo=github) | MCP 서버 메가 목록 — 새로운 Web3 MCP 서버 탐색 시작점 |

---

## 기여

빠진 레포를 찾으셨나요? 이슈를 열거나 PR을 제출해 주세요!

## 라이선스

[CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/)
