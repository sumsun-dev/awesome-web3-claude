<div align="center">

**[English](./README_EN.md)** | **한국어** | **[日本語](./README_JA.md)**

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
| [pashov/skills](https://github.com/pashov/skills) | ![](https://img.shields.io/github/stars/pashov/skills?style=flat-square&logo=github) | `Community` | '26.03 | 해당 레포지토리는 블록체인 보안 감사 전문 회사 Pashov Audit Group의 기술 스킬 저장소로, Web3 개발자나 보안 감사자들이 참고할 수 있는 리소스 모음입니다. `1개 스킬` |

<details><summary>trailofbits/skills 스킬 상세 (60개)</summary>

| 스킬 | 설명 |
|:-----|:------------|
| [agentic-actions-auditor](https://github.com/trailofbits/skills/tree/main/plugins/agentic-actions-auditor/skills/agentic-actions-auditor) | AI 에이전트 통합(Claude Code Action, Gemini CLI, OpenAI Codex, GitHub AI Inference)의 GitHub Actions 워크플로우 보안 취약점 감사 |
| [ask-questions-if-underspecified](https://github.com/trailofbits/skills/tree/main/plugins/ask-questions-if-underspecified/skills/ask-questions-if-underspecified) | 구현 전 요구사항 명확화. 심각한 의문이 있을 때 질문을 먼저 던지는 스킬 |
| [audit-context-building](https://github.com/trailofbits/skills/tree/main/plugins/audit-context-building/skills/audit-context-building) | 취약점/버그 탐지 전 줄 단위 초정밀 코드 분석으로 깊은 아키텍처 컨텍스트 구축 |
| [algorand-vulnerability-scanner](https://github.com/trailofbits/skills/tree/main/plugins/building-secure-contracts/skills/algorand-vulnerability-scanner) | Algorand 스마트 컨트랙트의 리키잉 공격, 미확인 트랜잭션 수수료, 필드 검증 누락 등 11개 취약점 스캔 |
| [audit-prep-assistant](https://github.com/trailofbits/skills/tree/main/plugins/building-secure-contracts/skills/audit-prep-assistant) | Trail of Bits 체크리스트 기반 보안 리뷰 준비. 리뷰 목표 설정, 정적 분석, 테스트 커버리지 향상, 데드 코드 제거 |
| [cairo-vulnerability-scanner](https://github.com/trailofbits/skills/tree/main/plugins/building-secure-contracts/skills/cairo-vulnerability-scanner) | Cairo/StarkNet 스마트 컨트랙트의 felt252 산술 오버플로, L1-L2 메시징, 주소 변환 등 6개 치명적 취약점 스캔 |
| [code-maturity-assessor](https://github.com/trailofbits/skills/tree/main/plugins/building-secure-contracts/skills/code-maturity-assessor) | Trail of Bits 9개 카테고리 프레임워크로 코드 성숙도 체계적 평가. 산술 안전성, 감사 관행, 접근 제어, 복잡도 분석 |
| [cosmos-vulnerability-scanner](https://github.com/trailofbits/skills/tree/main/plugins/building-secure-contracts/skills/cosmos-vulnerability-scanner) | Cosmos SDK 블록체인의 비결정성, 잘못된 서명자, ABCI 패닉, 반올림 오류 등 9개 합의 치명적 취약점 스캔 |
| [guidelines-advisor](https://github.com/trailofbits/skills/tree/main/plugins/building-secure-contracts/skills/guidelines-advisor) | Trail of Bits 모범 사례 기반 스마트 컨트랙트 개발 어드바이저. 문서 생성, 아키텍처 리뷰, 업그레이드 패턴 확인 |
| [secure-workflow-guide](https://github.com/trailofbits/skills/tree/main/plugins/building-secure-contracts/skills/secure-workflow-guide) | Trail of Bits 5단계 보안 개발 워크플로우 가이드. Slither 스캔, 업그레이드/ERC 적합성/토큰 통합 점검, 보안 다이어그램 생성 |
| [solana-vulnerability-scanner](https://github.com/trailofbits/skills/tree/main/plugins/building-secure-contracts/skills/solana-vulnerability-scanner) | Solana 프로그램의 임의 CPI, 부적절한 PDA 검증, 서명자/소유권 체크 누락, sysvar 스푸핑 등 6개 치명적 취약점 스캔 |
| [substrate-vulnerability-scanner](https://github.com/trailofbits/skills/tree/main/plugins/building-secure-contracts/skills/substrate-vulnerability-scanner) | Substrate/Polkadot 팔렛의 산술 오버플로, 패닉 DoS, 부정확한 가중치, 잘못된 origin 체크 등 7개 치명적 취약점 스캔 |
| [token-integration-analyzer](https://github.com/trailofbits/skills/tree/main/plugins/building-secure-contracts/skills/token-integration-analyzer) | Trail of Bits 토큰 통합 체크리스트 기반 분석. ERC20/ERC721 적합성 확인, 20개 이상 이상 토큰 패턴 감지 |
| [ton-vulnerability-scanner](https://github.com/trailofbits/skills/tree/main/plugins/building-secure-contracts/skills/ton-vulnerability-scanner) | TON 스마트 컨트랙트의 정수-불리언 오용, 가짜 Jetton 컨트랙트, 가스 체크 없는 TON 전송 등 3개 치명적 취약점 스캔 |
| [burpsuite-project-parser](https://github.com/trailofbits/skills/tree/main/plugins/burpsuite-project-parser/skills) | Burp Suite 프로젝트 파일(.burp) CLI 탐색. 정규식으로 응답 헤더/바디 검색, 보안 감사 결과 추출, 프록시 히스토리 덤프 |
| [claude-in-chrome-troubleshooting](https://github.com/trailofbits/skills/tree/main/plugins/claude-in-chrome-troubleshooting/skills/claude-in-chrome-troubleshooting) | Claude in Chrome MCP 확장 프로그램 연결 문제 진단 및 수정 |
| [constant-time-analysis](https://github.com/trailofbits/skills/tree/main/plugins/constant-time-analysis/skills/constant-time-analysis) | 암호화 코드의 타이밍 사이드 채널 취약점 탐지. 비밀 값에 대한 나눗셈, 비밀 의존 분기 검사 |
| [interpreting-culture-index](https://github.com/trailofbits/skills/tree/main/plugins/culture-index/skills/interpreting-culture-index) | Culture Index(CI) 설문, 행동 프로필, 성격 평가 데이터 해석. 팀 구성 분석, 번아웃 감지 지원 |
| [debug-buttercup](https://github.com/trailofbits/skills/tree/main/plugins/debug-buttercup/skills/debug-buttercup) | Buttercup 디버깅 스킬 |
| [devcontainer-setup](https://github.com/trailofbits/skills/tree/main/plugins/devcontainer-setup/skills/devcontainer-setup) | Claude Code, 언어별 도구(Python/Node/Rust/Go), 영구 볼륨이 포함된 devcontainer 생성 |
| [differential-review](https://github.com/trailofbits/skills/tree/main/plugins/differential-review/skills/differential-review) | 차분 코드 리뷰 스킬 |
| [dwarf-expert](https://github.com/trailofbits/skills/tree/main/plugins/dwarf-expert/skills/dwarf-expert) | DWARF 디버그 파일 분석 및 DWARF 디버그 포맷/표준(v3-v5) 전문 지식 제공 |
| [entry-point-analyzer](https://github.com/trailofbits/skills/tree/main/plugins/entry-point-analyzer/skills/entry-point-analyzer) | 보안 감사를 위한 스마트 컨트랙트 상태 변경 진입점 분석. 외부 호출 가능한 상태 수정 함수 감지 |
| [firebase-apk-scanner](https://github.com/trailofbits/skills/tree/main/plugins/firebase-apk-scanner/skills/firebase-apk-scanner) | Android APK의 Firebase 보안 설정 오류 스캔. 개방된 DB, 스토리지 버킷, 인증 문제, 노출된 클라우드 기능 감지 |
| [using-gh-cli](https://github.com/trailofbits/skills/tree/main/plugins/gh-cli/skills/using-gh-cli) | GitHub CLI(gh) 사용 가이드. GitHub 레포, PR, 이슈, API 작업에 활용 |
| [git-cleanup](https://github.com/trailofbits/skills/tree/main/plugins/git-cleanup/skills/git-cleanup) | 로컬 git 브랜치와 워크트리를 병합됨/스쿼시-병합됨/대체됨/활성 작업으로 분류하여 안전하게 정리 |
| [insecure-defaults](https://github.com/trailofbits/skills/tree/main/plugins/insecure-defaults/skills/insecure-defaults) | 하드코딩된 시크릿, 약한 인증, 허용적 보안 등 프로덕션에서 앱이 안전하지 않게 실행되는 fail-open 인시큐어 디폴트 감지 |
| [let-fate-decide](https://github.com/trailofbits/skills/tree/main/plugins/let-fate-decide/skills/let-fate-decide) | os.urandom()으로 타로 카드 4장을 뽑아 모호한 프롬프트에 엔트로피 주입 |
| [modern-python](https://github.com/trailofbits/skills/tree/main/plugins/modern-python/skills/modern-python) | 모던 Python 도구(uv, ruff, ty)로 프로젝트 설정. pip/Poetry/mypy에서 마이그레이션 지원 |
| [property-based-testing](https://github.com/trailofbits/skills/tree/main/plugins/property-based-testing/skills/property-based-testing) | 다국어 및 스마트 컨트랙트 속성 기반 테스팅 가이드. 직렬화/파싱 코드 리뷰 시 활용 |
| [seatbelt-sandboxer](https://github.com/trailofbits/skills/tree/main/plugins/seatbelt-sandboxer/skills/seatbelt-sandboxer) | 최소 macOS Seatbelt 샌드박스 설정 생성. 허용 목록 기반 프로필로 앱 격리 |
| [second-opinion](https://github.com/trailofbits/skills/tree/main/plugins/second-opinion/skills/second-opinion) | 커밋되지 않은 변경사항, 브랜치 diff, 특정 커밋에 대해 외부 LLM(OpenAI Codex, Google Gemini CLI) 코드 리뷰 실행 |
| [semgrep-rule-creator](https://github.com/trailofbits/skills/tree/main/plugins/semgrep-rule-creator/skills/semgrep-rule-creator) | 보안 취약점, 버그 패턴, 코드 패턴 감지를 위한 커스텀 Semgrep 규칙 생성 |
| [semgrep-rule-variant-creator](https://github.com/trailofbits/skills/tree/main/plugins/semgrep-rule-variant-creator/skills/semgrep-rule-variant-creator) | 기존 Semgrep 규칙의 언어 변형 생성. 규칙을 지정된 타겟 언어로 포팅 |
| [sharp-edges](https://github.com/trailofbits/skills/tree/main/plugins/sharp-edges/skills/sharp-edges) | 보안 실수를 유발하는 오류 유발 API, 위험한 설정, 풋건 설계 식별 |
| [skill-improver](https://github.com/trailofbits/skills/tree/main/plugins/skill-improver/skills/skill-improver) | Claude Code 스킬 품질 이슈를 기준 충족까지 반복적으로 리뷰하고 수정. skill-reviewer 에이전트 활용 자동화 사이클 |
| [spec-to-code-compliance](https://github.com/trailofbits/skills/tree/main/plugins/spec-to-code-compliance/skills/spec-to-code-compliance) | 블록체인 감사를 위해 코드가 문서에 명시된 사양을 정확히 구현했는지 검증. 화이트페이퍼와 코드 간 격차 발견 |
| [codeql](https://github.com/trailofbits/skills/tree/main/plugins/static-analysis/skills/codeql) | CodeQL 정적 분석 스킬 |
| [sarif-parsing](https://github.com/trailofbits/skills/tree/main/plugins/static-analysis/skills/sarif-parsing) | SARIF 결과 파일 파싱 스킬 |
| [semgrep](https://github.com/trailofbits/skills/tree/main/plugins/static-analysis/skills/semgrep) | Semgrep 정적 분석 스킬 |
| [supply-chain-risk-auditor](https://github.com/trailofbits/skills/tree/main/plugins/supply-chain-risk-auditor/skills/supply-chain-risk-auditor) | 악용 또는 탈취 위험이 높은 의존성 식별. 공급망 공격 표면 평가, 의존성 건강 상태 확인 |
| [address-sanitizer](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/address-sanitizer) | AddressSanitizer(ASan) 메모리 오류 감지 도구 활용 |
| [aflpp](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/aflpp) | AFL++ 퍼저 하네스 작성 및 실행 |
| [atheris](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/atheris) | Atheris Python 퍼징 프레임워크 활용 |
| [cargo-fuzz](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/cargo-fuzz) | Rust cargo-fuzz 퍼징 도구 활용 |
| [constant-time-testing](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/constant-time-testing) | 상수 시간 코드 테스팅 (타이밍 공격 방지 검증) |
| [coverage-analysis](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/coverage-analysis) | 코드 커버리지 분석 및 퍼징 효과 측정 |
| [fuzzing-dictionary](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/fuzzing-dictionary) | 퍼징 딕셔너리 생성 및 최적화 |
| [fuzzing-obstacles](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/fuzzing-obstacles) | 퍼징 장애물 식별 및 해결 |
| [harness-writing](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/harness-writing) | 퍼징 하네스 작성 가이드 |
| [libafl](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/libafl) | LibAFL 퍼징 프레임워크 활용 |
| [libfuzzer](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/libfuzzer) | libFuzzer 커버리지 기반 퍼저 활용 |
| [ossfuzz](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/ossfuzz) | OSS-Fuzz 연동 및 프로젝트 등록 |
| [ruzzy](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/ruzzy) | Ruzzy Ruby 퍼저 활용 |
| [testing-handbook-generator](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/testing-handbook-generator) | Trail of Bits Testing Handbook 기반 테스팅 가이드 생성 |
| [wycheproof](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/wycheproof) | Wycheproof 암호화 테스트 벡터 활용 |
| [variant-analysis](https://github.com/trailofbits/skills/tree/main/plugins/variant-analysis/skills/variant-analysis) | 패턴 기반 분석으로 코드베이스 전반의 유사 취약점/버그 탐색. CodeQL/Semgrep 쿼리 작성 지원 |
| [designing-workflow-skills](https://github.com/trailofbits/skills/tree/main/plugins/workflow-skill-design/skills/designing-workflow-skills) | 워크플로우 스킬 설계 가이드 |
| [yara-rule-authoring](https://github.com/trailofbits/skills/tree/main/plugins/yara-authoring/skills/yara-rule-authoring) | YARA 규칙 작성 스킬 |
| [zeroize-audit](https://github.com/trailofbits/skills/tree/main/plugins/zeroize-audit/skills/zeroize-audit) | 소스 코드의 민감 데이터 제로화 누락 감지 및 컴파일러 최적화로 제거된 제로화를 어셈블리 수준에서 분석 |

</details>

<details><summary>pashov/skills 스킬 상세 (1개)</summary>

| 스킬 | 설명 |
|:-----|:------------|
| [solidity-auditor](https://github.com/pashov/skills/tree/main/solidity-auditor) | Security audit of Solidity code while you develop. Trigger on "audit", "check this contract", "review for security". |

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
| [configurator](https://github.com/Uniswap/uniswap-ai/tree/main/packages/plugins/uniswap-cca/skills/configurator) | CCA(Continuous Clearing Auction) 스마트 컨트랙트 매개변수를 인터랙티브 폼으로 설정 |
| [deployer](https://github.com/Uniswap/uniswap-ai/tree/main/packages/plugins/uniswap-cca/skills/deployer) | Factory 패턴으로 CCA 스마트 컨트랙트 배포 |
| [liquidity-planner](https://github.com/Uniswap/uniswap-ai/tree/main/packages/plugins/uniswap-driver/skills/liquidity-planner) | Uniswap v3/v4 유동성 공급 계획. LP 포지션 생성, 집중 유동성 범위 설정 |
| [swap-planner](https://github.com/Uniswap/uniswap-ai/tree/main/packages/plugins/uniswap-driver/skills/swap-planner) | Uniswap 토큰 스왑 계획. ETH↔USDC, 토큰 매수/매도, 밈코인 검색 |
| [v4-security-foundations](https://github.com/Uniswap/uniswap-ai/tree/main/packages/plugins/uniswap-hooks/skills/v4-security-foundations) | Uniswap v4 훅 보안 중심 개발. PoolManager, beforeSwap/afterSwap 보안 모범 사례, 취약점, 감사 가이드 |
| [swap-integration](https://github.com/Uniswap/uniswap-ai/tree/main/packages/plugins/uniswap-trading/skills/swap-integration) | Uniswap 스왑을 애플리케이션에 통합. Trading API, 스왑 프론트엔드, 스마트 컨트랙트 스왑 구현 |
| [viem-integration](https://github.com/Uniswap/uniswap-ai/tree/main/packages/plugins/uniswap-viem/skills/viem-integration) | viem으로 EVM 블록체인 통합. 블록체인 데이터 읽기, 트랜잭션 전송, 스마트 컨트랙트 상호작용, wagmi 연동 |

</details>

<details><summary>austintgriffith/ethskills 스킬 상세 (23개)</summary>

| 스킬 | 설명 |
|:-----|:------------|
| [addresses](https://github.com/austintgriffith/ethskills/tree/main/addresses) | Ethereum 메인넷과 L2의 주요 프로토콜 검증된 컨트랙트 주소. 주소 추측/환각 방지용 |
| [audit](https://github.com/austintgriffith/ethskills/tree/main/audit) | EVM 스마트 컨트랙트 심층 보안 감사. 취약점 탐색, 코드 보안 리뷰, GitHub 보안 이슈 제출 |
| [building-blocks](https://github.com/austintgriffith/ethskills/tree/main/building-blocks) | DeFi 레고 및 프로토콜 조합성. 체인별 주요 프로토콜 — Base의 Aerodrome, Arbitrum의 GMX/Pendle, Optimism의 Velodrome |
| [concepts](https://github.com/austintgriffith/ethskills/tree/main/concepts) | 온체인 구축을 위한 핵심 멘탈 모델 — LLM이 틀리기 쉬운 것과 설명이 필요한 것에 집중 |
| [contracts](https://github.com/austintgriffith/ethskills/tree/main/contracts) | (사용 중단됨) addresses 스킬로 이동 |
| [defi](https://github.com/austintgriffith/ethskills/tree/main/defi) | (사용 중단됨) building-blocks 스킬로 이동 |
| [frontend-playbook](https://github.com/austintgriffith/ethskills/tree/main/frontend-playbook) | Ethereum dApp 빌드→프로덕션 완전 파이프라인. 포크 모드 설정, IPFS 배포, Vercel 설정, ENS 서브도메인 |
| [frontend-ux](https://github.com/austintgriffith/ethskills/tree/main/frontend-ux) | Ethereum dApp 프론트엔드 UX 규칙. 온체인 버튼, 토큰 승인 플로우, 주소 표시 등 AI 에이전트 UI 버그 방지 패턴 |
| [gas](https://github.com/austintgriffith/ethskills/tree/main/gas) | 현재 Ethereum 가스 가격, 트랜잭션 비용, Ethereum 구축의 실제 경제학 |
| [indexing](https://github.com/austintgriffith/ethskills/tree/main/indexing) | 온체인 데이터 읽기/쿼리 방법 — 이벤트, The Graph, 인덱싱 패턴. 블록 루프 대신 사용할 도구 |
| [l2](https://github.com/austintgriffith/ethskills/tree/main/l2) | (사용 중단됨) l2s 스킬로 이동 |
| [l2s](https://github.com/austintgriffith/ethskills/tree/main/l2s) | Ethereum L2 현황 — Arbitrum, Optimism, Base, zkSync, Scroll, Unichain, Celo 등. 작동 원리, 배포, 브릿지 방법 |
| [layer2](https://github.com/austintgriffith/ethskills/tree/main/layer2) | (사용 중단됨) l2s 스킬로 이동 |
| [ethskills](https://github.com/austintgriffith/ethskills/tree/main/openclaw-skill) | AI 에이전트를 위한 Ethereum 개발 지식 — 아이디어에서 배포된 dApp까지. 가스 비용, Solidity 패턴, Scaffold-ETH 2, L2 실시간 문서 |
| [orchestration](https://github.com/austintgriffith/ethskills/tree/main/orchestration) | AI 에이전트가 완전한 Ethereum dApp을 계획, 빌드, 배포하는 방법. Scaffold-ETH 2 프로젝트 3단계 빌드 시스템 |
| [qa](https://github.com/austintgriffith/ethskills/tree/main/qa) | Scaffold-ETH 2로 빌드한 Ethereum dApp 출시 전 감사 체크리스트. 빌드 완료 후 별도 리뷰어 에이전트에 전달 |
| [security](https://github.com/austintgriffith/ethskills/tree/main/security) | Solidity 보안 패턴, 일반적 취약점, 배포 전 감사 체크리스트. 실제 손실을 방지하는 구체적 코드 패턴 |
| [ship](https://github.com/austintgriffith/ethskills/tree/main/ship) | AI 에이전트를 위한 E2E 가이드 — dApp 아이디어에서 프로덕션 배포까지. 가장 먼저 가져올 스킬, 다른 모든 스킬로 라우팅 |
| [standards](https://github.com/austintgriffith/ethskills/tree/main/standards) | Ethereum 토큰 및 프로토콜 표준 — ERC-20, ERC-721, ERC-1155, ERC-4337, ERC-8004 등 |
| [testing](https://github.com/austintgriffith/ethskills/tree/main/testing) | Foundry로 스마트 컨트랙트 테스팅 — 유닛 테스트, 퍼즈 테스팅, 포크 테스팅, 불변성 테스팅 |
| [tools](https://github.com/austintgriffith/ethskills/tree/main/tools) | 현재 Ethereum 개발 도구, 프레임워크, 라이브러리, RPC, 블록 익스플로러. 오늘날 실제 작동하는 도구 |
| [wallets](https://github.com/austintgriffith/ethskills/tree/main/wallets) | Ethereum 지갑 생성, 관리, 사용. EOA, 스마트 컨트랙트 지갑, 멀티시그(Safe), 계정 추상화 |
| [why-ethereum](https://github.com/austintgriffith/ethskills/tree/main/why) | Ethereum에서 빌드하는 이유. AI 에이전트 관점 — ERC-8004, x402, 조합성, 무허가 배포 |

</details>

<details><summary>trustwallet/tw-agent-skills 스킬 상세 (5개)</summary>

| 스킬 | 설명 |
|:-----|:------------|
| [assets](https://github.com/trustwallet/tw-agent-skills/tree/main/skills/assets) | Trust Wallet 자산 저장소 — 토큰 로고/메타데이터 조회, 블록체인별 자산 목록, 새 자산 기여 |
| [barz](https://github.com/trustwallet/tw-agent-skills/tree/main/skills/barz) | Barz — Trust Wallet의 모듈식 ERC-4337 스마트 컨트랙트 지갑 빌드/사용/기여 |
| [trust-developer](https://github.com/trustwallet/tw-agent-skills/tree/main/skills/trust-developer) | Trust Wallet 개발자 플랫폼. 딥링크 통합, 브라우저 확장 감지, WalletConnect 설정 |
| [trust-web3-provider](https://github.com/trustwallet/tw-agent-skills/tree/main/skills/trust-web3-provider) | Trust Wallet Web3 프로바이더 라이브러리 통합. 멀티체인 dApp 연동, 블록체인 지원 추가 |
| [wallet-core](https://github.com/trustwallet/tw-agent-skills/tree/main/skills/wallet-core) | Trust Wallet Core — 140+ 블록체인에서 HD 지갑 생성, 주소 파생, 트랜잭션 서명 |

</details>

## 스킬 & 플러그인 — 범용 Web3 규칙

| 레포지토리 | 스타 | 유형 | 마지막 업데이트 | 설명 |
|:-----------|------:|:----:|:---:|:------------|
| [leerob/directories](https://github.com/leerob/directories) | ![](https://img.shields.io/github/stars/leerob/directories?style=flat-square&logo=github) | `Community` | '26.02 | Cursor & Windsurf 커뮤니티 디렉토리, Web3 규칙 및 MCP 서버 탐색 |
| [BankrBot/openclaw-skills](https://github.com/BankrBot/openclaw-skills) | ![](https://img.shields.io/github/stars/BankrBot/openclaw-skills?style=flat-square&logo=github) | `Community` | '26.02 | OpenClaw 스킬 라이브러리, 크립토 트레이딩, DeFi 운영, Polymarket, 자동화 스킬 포함 `15개 스킬` |
| [nirholas/free-crypto-news](https://github.com/nirholas/free-crypto-news) | ![](https://img.shields.io/github/stars/nirholas/free-crypto-news?style=flat-square&logo=github) | `Community` | '26.03 | 무료 암호화폐 뉴스 API — BTC, ETH, DeFi 실시간 집계, Claude MCP 서버 및 다국어 SDK 지원 |
| [heilcheng/awesome-agent-skills](https://github.com/heilcheng/awesome-agent-skills) | ![](https://img.shields.io/github/stars/heilcheng/awesome-agent-skills?style=flat-square&logo=github) | `Community` | '26.03 | AI 코딩 에이전트(Claude, Codex, Copilot 등)를 위한 스킬, 도구, 튜토리얼 큐레이션 목록 |
| [coinmarketcap-official/skills-for-ai-agents-by-CoinMarketCap](https://github.com/coinmarketcap-official/skills-for-ai-agents-by-CoinMarketCap) | ![](https://img.shields.io/github/stars/coinmarketcap-official/skills-for-ai-agents-by-CoinMarketCap?style=flat-square&logo=github) | `Community` | '26.03 | CoinMarketCap이 AI 에이전트용으로 만든 스킬 모음으로, Claude Code/MCP와 통합하여 암호화폐 시세·정보 조회 등 Web3 기능을 AI 워크플로우에 자동화할 수 있습니다. `8개 스킬` |
| [binance/binance-skills-hub](https://github.com/binance/binance-skills-hub) | ![](https://img.shields.io/github/stars/binance/binance-skills-hub?style=flat-square&logo=github) | `Community` | '26.03 | Binance Skills Hub는 AI 에이전트가 암호화폐 거래 및 블록체인 기능에 네이티브로 접근할 수 있는 스킬 마켓플레이스로, Claude나 MCP를 통해 AI가 직접 Binance 거래소와 상호작용하도록 확장할 수 있습니다. `7개 스킬` |

<details><summary>BankrBot/openclaw-skills 스킬 상세 (15개)</summary>

| 스킬 | 설명 |
|:-----|:------------|
| [bankr-signals](https://github.com/BankrBot/openclaw-skills/tree/main/bankr-signals) | Bankr 트레이딩 시그널 스킬 |
| [bankr](https://github.com/BankrBot/openclaw-skills/tree/main/bankr) | AI 기반 크립토 트레이딩 에이전트/LLM 게이트웨이. 자연어로 크립토 거래, 포트폴리오 잔고 확인, 토큰 가격 조회 |
| [base](https://github.com/BankrBot/openclaw-skills/tree/main/base) | Base 체인 스킬 (플레이스홀더) |
| [botchan](https://github.com/BankrBot/openclaw-skills/tree/main/botchan) | Base 블록체인 온체인 에이전트 메시징 CLI. 에이전트 탐색, 피드 게시, DM 전송, Net Protocol 기반 |
| [clanker](https://github.com/BankrBot/openclaw-skills/tree/main/clanker) | Clanker SDK로 Base, Ethereum, Arbitrum 등 EVM 체인에 ERC20 토큰 배포. 밈코인 런치 지원 |
| [endaoment](https://github.com/BankrBot/openclaw-skills/tree/main/endaoment) | Endaoment를 통한 온체인 자선 기부. 크립토로 비영리단체에 기부 |
| [ens-primary-name](https://github.com/BankrBot/openclaw-skills/tree/main/ens-primary-name) | Base 및 L2에서 ENS 기본 이름 설정. 역방향 해석 설정, 기본 이름 구성 |
| [erc-8004](https://github.com/BankrBot/openclaw-skills/tree/main/erc-8004) | ERC-8004(Trustless Agents)로 Ethereum 메인넷에 AI 에이전트 온체인 신원 등록 |
| [neynar](https://github.com/BankrBot/openclaw-skills/tree/main/neynar) | Neynar API로 Farcaster 상호작용. 피드 읽기, 사용자 조회, 캐스트 게시, 콘텐츠 검색 |
| [onchainkit](https://github.com/BankrBot/openclaw-skills/tree/main/onchainkit) | Coinbase OnchainKit으로 React 컴포넌트/TypeScript 유틸리티 기반 온체인 앱 빌드 |
| [qrcoin](https://github.com/BankrBot/openclaw-skills/tree/main/qrcoin) | Base의 QR Coin 경매 참여. qrcoin.fun QR 코드 경매 상태 확인, 입찰, 리더보드 조회 |
| [siwa](https://github.com/BankrBot/openclaw-skills/tree/main/siwa) | SIWA (Sign In With Account) 인증 스킬 |
| [veil](https://github.com/BankrBot/openclaw-skills/tree/main/veil) | Veil Cash를 통한 Base 프라이버시/차폐 거래. ZK 증명으로 ETH/USDC 비공개 입출금/전송 |
| [yoink](https://github.com/BankrBot/openclaw-skills/tree/main/yoink) | Yoink — Base 온체인 깃발뺏기 게임. 깃발 뺏기, 게임 통계/리더보드, 플레이어 점수 조회 |
| [zapper](https://github.com/BankrBot/openclaw-skills/tree/main/zapper) | Zapper 스킬 (플레이스홀더) |

</details>

<details><summary>coinmarketcap-official/skills-for-ai-agents-by-CoinMarketCap 스킬 상세 (8개)</summary>

| 스킬 | 설명 |
|:-----|:------------|
| [cmc-api-crypto](https://github.com/coinmarketcap-official/skills-for-ai-agents-by-CoinMarketCap/tree/main/skills/cmc-api-crypto) | CoinMarketCap 암호화폐 API — 시세, 상장 목록, OHLCV, 트렌딩, 카테고리 엔드포인트 |
| [cmc-api-dex](https://github.com/coinmarketcap-official/skills-for-ai-agents-by-CoinMarketCap/tree/main/skills/cmc-api-dex) | CoinMarketCap DEX API — 토큰 조회, 풀, 트랜잭션, 트렌딩, 보안 분석 엔드포인트 |
| [cmc-api-exchange](https://github.com/coinmarketcap-official/skills-for-ai-agents-by-CoinMarketCap/tree/main/skills/cmc-api-exchange) | CoinMarketCap 거래소 API — 거래소 정보, 거래량, 마켓 페어, 자산 엔드포인트 |
| [cmc-api-market](https://github.com/coinmarketcap-official/skills-for-ai-agents-by-CoinMarketCap/tree/main/skills/cmc-api-market) | CoinMarketCap 시장 전체 API — 글로벌 지표, 공포/탐욕 지수, 인덱스, 트렌딩 토픽, 차트 |
| [cmc-mcp](https://github.com/coinmarketcap-official/skills-for-ai-agents-by-CoinMarketCap/tree/main/skills/cmc-mcp) | CoinMarketCap MCP로 암호화폐 시세, 기술적 분석, 뉴스, 트렌드 데이터 가져오기 |
| [cmc-x402](https://github.com/coinmarketcap-official/skills-for-ai-agents-by-CoinMarketCap/tree/main/skills/cmc-x402) | x402 프로토콜(Base USDC 결제)로 CoinMarketCap 데이터 접근. API 키 없이 사용 가능 |
| [crypto-research](https://github.com/coinmarketcap-official/skills-for-ai-agents-by-CoinMarketCap/tree/main/skills/crypto-research) | CoinMarketCap MCP 데이터로 암호화폐 종합 실사(DD). 가격 외 특정 코인 상세 분석 |
| [market-report](https://github.com/coinmarketcap-official/skills-for-ai-agents-by-CoinMarketCap/tree/main/skills/market-report) | CoinMarketCap MCP 데이터로 종합 크립토 시장 리포트 생성. 시장 상황, 심리, 전반적 현황 분석 |

</details>

<details><summary>binance/binance-skills-hub 스킬 상세 (7개)</summary>

| 스킬 | 설명 |
|:-----|:------------|
| [crypto-market-rank](https://github.com/binance/binance-skills-hub/tree/main/skills/binance-web3/crypto-market-rank) | Crypto market rankings and leaderboards. Query trending tokens, top searched tokens, Binance Alpha tokens, tokenized stocks, social hype sentiment ranks, smart money inflow token rankings, top meme to... |
| [meme-rush](https://github.com/binance/binance-skills-hub/tree/main/skills/binance-web3/meme-rush) | Meme token fast-trading assistant with two core capabilities: 1. Meme Rush - Real-time meme token lists from launchpads (Pump.fun, Four.meme, etc.) across new, finalizing, and migrated stages 2. |
| [query-address-info](https://github.com/binance/binance-skills-hub/tree/main/skills/binance-web3/query-address-info) | Query any on-chain wallet address token balances and positions. Retrieves all token holdings for a specified wallet address on a given chain, including token name, symbol, price, 24h price change, and... |
| [query-token-audit](https://github.com/binance/binance-skills-hub/tree/main/skills/binance-web3/query-token-audit) | Query token security audit to detect scams, honeypots, and malicious contracts before trading. Returns comprehensive security analysis including contract risks, trading risks, and scam detection. |
| [query-token-info](https://github.com/binance/binance-skills-hub/tree/main/skills/binance-web3/query-token-info) | Query token details by keyword, contract address, or chain. Search tokens, get metadata and social links, retrieve real-time market data (price, price trend, volume, holders, liquidity), and fetch K-L... |
| [trading-signal](https://github.com/binance/binance-skills-hub/tree/main/skills/binance-web3/trading-signal) | Subscribe and retrieve on-chain Smart Money signals. Monitor trading activities of smart money addresses, including buy/sell signals, trigger price, current price, max gain, and exit rate. |
| [spot](https://github.com/binance/binance-skills-hub/tree/main/skills/binance/spot) | Binance Spot request using the Binance API. Authentication requires API key and secret key. Supports testnet and mainnet. |

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
