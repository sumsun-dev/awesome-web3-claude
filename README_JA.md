<div align="center">

**[English](./README_EN.md)** | **[한국어](./README.md)** | **日本語**

# Awesome Web3 Claude Code

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

**Claude Code**およびその他のAIコーディングエージェントを活用した**Web3開発**のためのMCPサーバー、AIエージェントフレームワーク、スキル、開発ツールのキュレーションリスト。

この分野は初期段階です — スター数よりも機能性と公式サポートの有無を基準に選定しています。

</div>

## 目次

**Claude Code Native** — Claude Code専用に構築されたもの (Skills, MCP, 設定)

- [スキル & プラグイン — セキュリティ & 監査](#スキル--プラグイン--セキュリティ--監査)
- [スキル & プラグイン — プロトコル別](#スキル--プラグイン--プロトコル別)
- [スキル & プラグイン — 汎用 Web3 ルール](#スキル--プラグイン--汎用-web3-ルール)
- [MCP サーバー — オンチェーンデータ & 分析](#mcp-サーバー--オンチェーンデータ--分析)
- [MCP サーバー — スマートコントラクト & DeFi](#mcp-サーバー--スマートコントラクト--defi)

**Compatible Tools** — Claude Codeとの相乗効果が高い汎用ツール

- [スマートコントラクト開発ツール](#スマートコントラクト開発ツール)
- [AI エージェントフレームワーク — オンチェーン](#ai-エージェントフレームワーク--オンチェーン)
- [学習 & リファレンス](#学習--リファレンス)

---

# Claude Code Native

> Claude Code専用 — Skills (SKILL.md)、MCPサーバー、Claude Code設定など直接統合されるツール。

## スキル & プラグイン — セキュリティ & 監査

| リポジトリ | スター | タイプ | 最終更新 | 説明 |
|:-----------|------:|:----:|:---:|:------------|
| [trailofbits/skills](https://github.com/trailofbits/skills) | ![](https://img.shields.io/github/stars/trailofbits/skills?style=flat-square&logo=github) | `Official` | '26.02 | セキュリティ監査、スマートコントラクト分析、静的解析(Semgrep, CodeQL)、プロパティベーステスト、脆弱性検出用28個プラグイン `60個スキル` |
| [trailofbits/claude-code-config](https://github.com/trailofbits/claude-code-config) | ![](https://img.shields.io/github/stars/trailofbits/claude-code-config?style=flat-square&logo=github) | `Official` | '26.02 | Claude Code設定フレームワーク（独自のデフォルトとワークフロー） |
| [trailofbits/claude-code-devcontainer](https://github.com/trailofbits/claude-code-devcontainer) | ![](https://img.shields.io/github/stars/trailofbits/claude-code-devcontainer?style=flat-square&logo=github) | `Official` | '26.02 | バイパスモードでClaude Codeを安全に実行するためのサンドボックスdevcontainer |
| [trailofbits/skills-curated](https://github.com/trailofbits/skills-curated) | ![](https://img.shields.io/github/stars/trailofbits/skills-curated?style=flat-square&logo=github) | `Official` | '26.02 | キュレーテッドマーケットプレイス、コードレビュー済みコミュニティ検証プラグイン（バックドアリスク警告付き） |
| [pashov/skills](https://github.com/pashov/skills) | ![](https://img.shields.io/github/stars/pashov/skills?style=flat-square&logo=github) | `Community` | '26.03 | Pashov Audit Groupのスキルリポジトリであり、スマートコントラクト監査およびWeb3セキュリティ評価に必要なツールと方法論を提供します。Claude CodeからMCPを通じてアクセスすると、セキュリティ監査の自動化およびコード分析をサポートできます。 `1個スキル` |
| [shuvonsec/web3-bug-bounty-hunting-ai-skills](https://github.com/shuvonsec/web3-bug-bounty-hunting-ai-skills) | ![](https://img.shields.io/github/stars/shuvonsec/web3-bug-bounty-hunting-ai-skills?style=flat-square&logo=github) | `Community` | '26.03 | このリポジトリはImmunefiレポートと実際のハッキング事例に基づいた18個のClaude Codeスキルで構成されており、スマートコントラクトセキュリティ監査とバグバウンティハンティングを自動化します。Claude Codeでこれらのスキルを活用すれば、脆弱性検出、コード分析、エクスプロイト開発を迅速に実行できます。 `11個スキル` |

<details><summary>trailofbits/skills スキル詳細 (60個)</summary>

| スキル | 説明 |
|:-----|:------------|
| [agentic-actions-auditor](https://github.com/trailofbits/skills/tree/main/plugins/agentic-actions-auditor/skills/agentic-actions-auditor) | AIエージェント統合（Claude Code Action, Gemini CLI, OpenAI Codex, GitHub AI Inference）のGitHub Actionsワークフローセキュリティ脆弱性監査 |
| [ask-questions-if-underspecified](https://github.com/trailofbits/skills/tree/main/plugins/ask-questions-if-underspecified/skills/ask-questions-if-underspecified) | 実装前の要件明確化。深刻な疑問がある時に質問を先に投げるスキル |
| [audit-context-building](https://github.com/trailofbits/skills/tree/main/plugins/audit-context-building/skills/audit-context-building) | 脆弱性/バグ検出前の行単位超精密コード分析による深いアーキテクチャコンテキスト構築 |
| [algorand-vulnerability-scanner](https://github.com/trailofbits/skills/tree/main/plugins/building-secure-contracts/skills/algorand-vulnerability-scanner) | Algorandスマートコントラクトのリキーイング攻撃、未確認トランザクション手数料、フィールド検証欠落など11個の脆弱性スキャン |
| [audit-prep-assistant](https://github.com/trailofbits/skills/tree/main/plugins/building-secure-contracts/skills/audit-prep-assistant) | Trail of Bitsチェックリスト基盤のセキュリティレビュー準備。レビュー目標設定、静的解析、テストカバレッジ向上、デッドコード除去 |
| [cairo-vulnerability-scanner](https://github.com/trailofbits/skills/tree/main/plugins/building-secure-contracts/skills/cairo-vulnerability-scanner) | Cairo/StarkNetスマートコントラクトのfelt252算術オーバーフロー、L1-L2メッセージング、アドレス変換など6個の致命的脆弱性スキャン |
| [code-maturity-assessor](https://github.com/trailofbits/skills/tree/main/plugins/building-secure-contracts/skills/code-maturity-assessor) | Trail of Bitsの9カテゴリフレームワークによるコード成熟度の体系的評価。算術安全性、監査慣行、アクセス制御、複雑度分析 |
| [cosmos-vulnerability-scanner](https://github.com/trailofbits/skills/tree/main/plugins/building-secure-contracts/skills/cosmos-vulnerability-scanner) | Cosmos SDKブロックチェーンの非決定性、誤った署名者、ABCIパニック、丸めエラーなど9個のコンセンサス致命的脆弱性スキャン |
| [guidelines-advisor](https://github.com/trailofbits/skills/tree/main/plugins/building-secure-contracts/skills/guidelines-advisor) | Trail of Bitsベストプラクティス基盤のスマートコントラクト開発アドバイザー。ドキュメント生成、アーキテクチャレビュー、アップグレードパターン確認 |
| [secure-workflow-guide](https://github.com/trailofbits/skills/tree/main/plugins/building-secure-contracts/skills/secure-workflow-guide) | Trail of Bitsの5段階セキュア開発ワークフローガイド。Slitherスキャン、アップグレード/ERC適合性/トークン統合チェック、セキュリティダイアグラム生成 |
| [solana-vulnerability-scanner](https://github.com/trailofbits/skills/tree/main/plugins/building-secure-contracts/skills/solana-vulnerability-scanner) | Solanaプログラムの任意CPI、不適切なPDA検証、署名者/所有権チェック欠落、sysvarスプーフィングなど6個の致命的脆弱性スキャン |
| [substrate-vulnerability-scanner](https://github.com/trailofbits/skills/tree/main/plugins/building-secure-contracts/skills/substrate-vulnerability-scanner) | Substrate/Polkadotパレットの算術オーバーフロー、パニックDoS、不正確なウェイト、不正なoriginチェックなど7個の致命的脆弱性スキャン |
| [token-integration-analyzer](https://github.com/trailofbits/skills/tree/main/plugins/building-secure-contracts/skills/token-integration-analyzer) | Trail of Bitsトークン統合チェックリスト基盤の分析。ERC20/ERC721適合性確認、20以上の異常トークンパターン検出 |
| [ton-vulnerability-scanner](https://github.com/trailofbits/skills/tree/main/plugins/building-secure-contracts/skills/ton-vulnerability-scanner) | TONスマートコントラクトの整数-ブーリアン誤用、偽Jettonコントラクト、ガスチェックなしのTON転送など3個の致命的脆弱性スキャン |
| [burpsuite-project-parser](https://github.com/trailofbits/skills/tree/main/plugins/burpsuite-project-parser/skills) | Burp Suiteプロジェクトファイル(.burp) CLI探索。正規表現でレスポンスヘッダー/ボディ検索、セキュリティ監査結果抽出、プロキシ履歴ダンプ |
| [claude-in-chrome-troubleshooting](https://github.com/trailofbits/skills/tree/main/plugins/claude-in-chrome-troubleshooting/skills/claude-in-chrome-troubleshooting) | Claude in Chrome MCP拡張機能の接続問題診断と修正 |
| [constant-time-analysis](https://github.com/trailofbits/skills/tree/main/plugins/constant-time-analysis/skills/constant-time-analysis) | 暗号コードのタイミングサイドチャネル脆弱性検出。秘密値の除算、秘密依存分岐の検査 |
| [interpreting-culture-index](https://github.com/trailofbits/skills/tree/main/plugins/culture-index/skills/interpreting-culture-index) | Culture Index(CI)アンケート、行動プロファイル、性格評価データ解釈。チーム構成分析、バーンアウト検知サポート |
| [debug-buttercup](https://github.com/trailofbits/skills/tree/main/plugins/debug-buttercup/skills/debug-buttercup) | Buttercupデバッグスキル |
| [devcontainer-setup](https://github.com/trailofbits/skills/tree/main/plugins/devcontainer-setup/skills/devcontainer-setup) | Claude Code、言語別ツール（Python/Node/Rust/Go）、永続ボリューム付きdevcontainer生成 |
| [differential-review](https://github.com/trailofbits/skills/tree/main/plugins/differential-review/skills/differential-review) | 差分コードレビュースキル |
| [dwarf-expert](https://github.com/trailofbits/skills/tree/main/plugins/dwarf-expert/skills/dwarf-expert) | DWARFデバッグファイル分析およびDWARFデバッグフォーマット/標準(v3-v5)の専門知識提供 |
| [entry-point-analyzer](https://github.com/trailofbits/skills/tree/main/plugins/entry-point-analyzer/skills/entry-point-analyzer) | セキュリティ監査のためのスマートコントラクト状態変更エントリポイント分析。外部呼び出し可能な状態変更関数の検出 |
| [firebase-apk-scanner](https://github.com/trailofbits/skills/tree/main/plugins/firebase-apk-scanner/skills/firebase-apk-scanner) | Android APKのFirebaseセキュリティ設定エラースキャン。開放DB、ストレージバケット、認証問題、露出クラウド機能の検出 |
| [using-gh-cli](https://github.com/trailofbits/skills/tree/main/plugins/gh-cli/skills/using-gh-cli) | GitHub CLI(gh)使用ガイド。GitHubリポジトリ、PR、Issue、API操作に活用 |
| [git-cleanup](https://github.com/trailofbits/skills/tree/main/plugins/git-cleanup/skills/git-cleanup) | ローカルgitブランチとワークツリーをマージ済み/スカッシュマージ済み/置換済み/アクティブ作業に分類して安全にクリーンアップ |
| [insecure-defaults](https://github.com/trailofbits/skills/tree/main/plugins/insecure-defaults/skills/insecure-defaults) | ハードコードされたシークレット、弱い認証、許容的セキュリティなどプロダクションでアプリが安全でなく実行されるfail-openインセキュアデフォルトの検出 |
| [let-fate-decide](https://github.com/trailofbits/skills/tree/main/plugins/let-fate-decide/skills/let-fate-decide) | os.urandom()でタロットカード4枚を引いて曖昧なプロンプトにエントロピーを注入 |
| [modern-python](https://github.com/trailofbits/skills/tree/main/plugins/modern-python/skills/modern-python) | モダンPythonツール（uv, ruff, ty）でプロジェクト設定。pip/Poetry/mypyからのマイグレーションサポート |
| [property-based-testing](https://github.com/trailofbits/skills/tree/main/plugins/property-based-testing/skills/property-based-testing) | 多言語およびスマートコントラクトのプロパティベーステストガイド。シリアライゼーション/パーシングコードレビュー時に活用 |
| [seatbelt-sandboxer](https://github.com/trailofbits/skills/tree/main/plugins/seatbelt-sandboxer/skills/seatbelt-sandboxer) | 最小macOS Seatbeltサンドボックス設定生成。許可リストベースのプロファイルでアプリ隔離 |
| [second-opinion](https://github.com/trailofbits/skills/tree/main/plugins/second-opinion/skills/second-opinion) | コミットされていない変更、ブランチdiff、特定コミットに対する外部LLM（OpenAI Codex, Google Gemini CLI）コードレビュー実行 |
| [semgrep-rule-creator](https://github.com/trailofbits/skills/tree/main/plugins/semgrep-rule-creator/skills/semgrep-rule-creator) | セキュリティ脆弱性、バグパターン、コードパターン検出のためのカスタムSemgrepルール生成 |
| [semgrep-rule-variant-creator](https://github.com/trailofbits/skills/tree/main/plugins/semgrep-rule-variant-creator/skills/semgrep-rule-variant-creator) | 既存Semgrepルールの言語バリアント生成。ルールを指定ターゲット言語にポーティング |
| [sharp-edges](https://github.com/trailofbits/skills/tree/main/plugins/sharp-edges/skills/sharp-edges) | セキュリティミスを引き起こすエラー誘発API、危険な設定、フットガン設計の特定 |
| [skill-improver](https://github.com/trailofbits/skills/tree/main/plugins/skill-improver/skills/skill-improver) | Claude Codeスキルの品質問題を基準達成まで反復的にレビュー・修正。skill-reviewerエージェント活用の自動化サイクル |
| [spec-to-code-compliance](https://github.com/trailofbits/skills/tree/main/plugins/spec-to-code-compliance/skills/spec-to-code-compliance) | ブロックチェーン監査のためにコードがドキュメントに明示された仕様を正確に実装しているか検証。ホワイトペーパーとコード間のギャップ発見 |
| [codeql](https://github.com/trailofbits/skills/tree/main/plugins/static-analysis/skills/codeql) | CodeQL静的解析スキル |
| [sarif-parsing](https://github.com/trailofbits/skills/tree/main/plugins/static-analysis/skills/sarif-parsing) | SARIF結果ファイルパーシングスキル |
| [semgrep](https://github.com/trailofbits/skills/tree/main/plugins/static-analysis/skills/semgrep) | Semgrep静的解析スキル |
| [supply-chain-risk-auditor](https://github.com/trailofbits/skills/tree/main/plugins/supply-chain-risk-auditor/skills/supply-chain-risk-auditor) | 悪用またはテイクオーバーリスクの高い依存関係の特定。サプライチェーン攻撃面評価、依存関係ヘルスチェック |
| [address-sanitizer](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/address-sanitizer) | AddressSanitizer(ASan)メモリエラー検出ツール活用 |
| [aflpp](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/aflpp) | AFL++ファザーハーネス作成と実行 |
| [atheris](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/atheris) | Atheris Pythonファジングフレームワーク活用 |
| [cargo-fuzz](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/cargo-fuzz) | Rust cargo-fuzzファジングツール活用 |
| [constant-time-testing](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/constant-time-testing) | 定数時間コードテスト（タイミング攻撃防止検証） |
| [coverage-analysis](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/coverage-analysis) | コードカバレッジ分析とファジング効果測定 |
| [fuzzing-dictionary](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/fuzzing-dictionary) | ファジングディクショナリ生成と最適化 |
| [fuzzing-obstacles](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/fuzzing-obstacles) | ファジング障害の特定と解決 |
| [harness-writing](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/harness-writing) | ファジングハーネス作成ガイド |
| [libafl](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/libafl) | LibAFLファジングフレームワーク活用 |
| [libfuzzer](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/libfuzzer) | libFuzzerカバレッジベースファザー活用 |
| [ossfuzz](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/ossfuzz) | OSS-Fuzz連携とプロジェクト登録 |
| [ruzzy](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/ruzzy) | Ruzzy Rubyファザー活用 |
| [testing-handbook-generator](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/testing-handbook-generator) | Trail of Bits Testing Handbook基盤のテストガイド生成 |
| [wycheproof](https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills/skills/wycheproof) | Wycheproof暗号テストベクター活用 |
| [variant-analysis](https://github.com/trailofbits/skills/tree/main/plugins/variant-analysis/skills/variant-analysis) | パターンベース分析によるコードベース全体の類似脆弱性/バグ探索。CodeQL/Semgrepクエリ作成サポート |
| [designing-workflow-skills](https://github.com/trailofbits/skills/tree/main/plugins/workflow-skill-design/skills/designing-workflow-skills) | ワークフロースキル設計ガイド |
| [yara-rule-authoring](https://github.com/trailofbits/skills/tree/main/plugins/yara-authoring/skills/yara-rule-authoring) | YARAルール作成スキル |
| [zeroize-audit](https://github.com/trailofbits/skills/tree/main/plugins/zeroize-audit/skills/zeroize-audit) | ソースコードの機密データゼロ化漏れ検出およびコンパイラ最適化で除去されたゼロ化をアセンブリレベルで分析 |

</details>

<details><summary>pashov/skills スキル詳細 (1個)</summary>

| スキル | 説明 |
|:-----|:------------|
| [solidity-auditor](https://github.com/pashov/skills/tree/main/solidity-auditor) | Security audit of Solidity code while you develop. Trigger on "audit", "check this contract", "review for security". |

</details>

<details><summary>shuvonsec/web3-bug-bounty-hunting-ai-skills スキル詳細 (11個)</summary>

| スキル | 説明 |
|:-----|:------------|
| [web3-ai-tools](https://github.com/shuvonsec/web3-bug-bounty-hunting-ai-skills/tree/main/web3-ai-tools) | AI-powered tools for Web3 bug bounty automation. Use when you want to automate recon, run autonomous audits, or use AI agents for vulnerability discovery. |
| [web3-bug-classes](https://github.com/shuvonsec/web3-bug-bounty-hunting-ai-skills/tree/main/web3-bug-classes) | Complete reference for all 10 DeFi smart contract bug classes. Use this when hunting for specific vulnerability types, need attack patterns for accounting desync, access control, incomplete path, off-... |
| [web3-case-study-role-misconfig](https://github.com/shuvonsec/web3-bug-bounty-hunting-ai-skills/tree/main/web3-case-study-role-misconfig) | Case study - role misconfiguration bug class applied to a yield aggregator protocol. Use as a template for applying all 10 bug classes to a single target. |
| [web3-grep-arsenal](https://github.com/shuvonsec/web3-bug-bounty-hunting-ai-skills/tree/main/web3-grep-arsenal) | Master grep command arsenal for Web3 smart contract auditing. Use when starting a new protocol scan, before deep code review, or when hunting specific vulnerability classes. |
| [web3-hunt-foundation](https://github.com/shuvonsec/web3-bug-bounty-hunting-ai-skills/tree/main/web3-hunt-foundation) | Hunter mindset, recon setup, and target scoring for Web3 bug bounty. Use at the START of any new protocol hunt - scoring targets, setting up environment, understanding architecture. |
| [web3-hunt-zksync-era](https://github.com/shuvonsec/web3-bug-bounty-hunting-ai-skills/tree/main/web3-hunt-zksync-era) | ZKsync Era (Immunefi) completed hunt — 0 findings after exhaustive 5-session audit. Use as a DEFENSE STUDY — learn what makes a protocol unhuntable, which patterns block all 10 bug classes, and when t... |
| [web3-methodology-research](https://github.com/shuvonsec/web3-bug-bounty-hunting-ai-skills/tree/main/web3-methodology-research) | External research synthesis from Trail of Bits, SlowMist, ConsenSys, Immunefi, and Cyfrin. Use this for advanced audit methodology, Echidna/Medusa fuzzing setup, Slither custom detector writing, attac... |
| [web3-poc-foundry](https://github.com/shuvonsec/web3-bug-bounty-hunting-ai-skills/tree/main/web3-poc-foundry) | Complete Foundry PoC writing guide + all cheatcodes + DeFiHackLabs reproduction patterns. Use this when building a proof of concept exploit, setting up a fork test, using Foundry cheatcodes, or reprod... |
| [web3-solidity-audit-mcp](https://github.com/shuvonsec/web3-bug-bounty-hunting-ai-skills/tree/main/web3-solidity-audit-mcp) | MCP server integrating Slither + Aderyn + SWC patterns into Claude Code for smart contract auditing. Use when analyzing Solidity files, running DeFi-specific detectors, or generating invariants. |
| [web3-start-here](https://github.com/shuvonsec/web3-bug-bounty-hunting-ai-skills/tree/main/web3-start-here) | Master index for the web3 smart contract security knowledge base. Use this to navigate the skill chain. Read files in order — each ends with NEXT. |
| [web3-triage-report](https://github.com/shuvonsec/web3-bug-bounty-hunting-ai-skills/tree/main/web3-triage-report) | Bug triage validation system, Immunefi report format, and 20 real paid bounty examples dissected. Use this when validating a finding before submitting, writing an Immunefi report, checking if a bug is... |

</details>

## スキル & プラグイン — プロトコル別

| リポジトリ | スター | タイプ | 最終更新 | 説明 |
|:-----------|------:|:----:|:---:|:------------|
| [Uniswap/uniswap-ai](https://github.com/Uniswap/uniswap-ai) | ![](https://img.shields.io/github/stars/Uniswap/uniswap-ai?style=flat-square&logo=github) | `Official` | '26.02 | 7つのスキル: Swap Planner, Liquidity Planner, Swap Integration, V4 Security, CCA Configurator/Deployer, viem Integration `7個スキル` |
| [austintgriffith/ethskills](https://github.com/austintgriffith/ethskills) | ![](https://img.shields.io/github/stars/austintgriffith/ethskills?style=flat-square&logo=github) | `Community` | '26.02 | LLMの盲点（ガス、ウォレット、L2、規格、アドレス）を修正する18個のスキル。[ethskills.com](https://ethskills.com/) `23個スキル` |
| [trustwallet/tw-agent-skills](https://github.com/trustwallet/tw-agent-skills) | ![](https://img.shields.io/github/stars/trustwallet/tw-agent-skills?style=flat-square&logo=github) | `Official` | '26.02 | 5つのスキル: trust-web3-provider（マルチチェーンdApp連携）、wallet-core（140+チェーンウォレット/署名）、barz（ERC-4337スマートウォレット）、assets（トークンメタデータ）、trust-developer（ディープリンク/WalletConnect） `5個スキル` |
| [ruvnet/ruflo](https://github.com/ruvnet/ruflo) | ![](https://img.shields.io/github/stars/ruvnet/ruflo?style=flat-square&logo=github) | `Community` | '26.03 | Claude CodeとMCPを通じて複数のAIエージェントを調整し、ソフトウェアエンジニアリングタスクを自動化するエンタープライズエージェントオーケストレーションプラットフォーム。 |
| [nirholas/universal-crypto-mcp](https://github.com/nirholas/universal-crypto-mcp) | ![](https://img.shields.io/github/stars/nirholas/universal-crypto-mcp?style=flat-square&logo=github) | `Community` | '26.03 | このMCPサーバーは、AIエージェントが自然言語でブロックチェーンと相互作用できるようにし、スワップ、ブリッジ、ステーキングなど様々なWeb3タスクを自動化します。Claudeに接続すると、複雑な暗号資産操作を簡単な会話で実行できます。 |
| [hashgraph-online/registry-broker-skills](https://github.com/hashgraph-online/registry-broker-skills) | ![](https://img.shields.io/github/stars/hashgraph-online/registry-broker-skills?style=flat-square&logo=github) | `Community` | '26.03 | このリポジトリは、72,000個以上のAIエージェントを複数のブロックチェーンプロトコルで検索および登録できるユニバーサルレジストリを提供し、Claudeを含むAIコーディングアシスタントでMCPベースのスキルとして活用して、Web3エージェントエコシステムにアクセスできるようにします。 |

<details><summary>Uniswap/uniswap-ai スキル詳細 (7個)</summary>

| スキル | 説明 |
|:-----|:------------|
| [configurator](https://github.com/Uniswap/uniswap-ai/tree/main/packages/plugins/uniswap-cca/skills/configurator) | CCA（Continuous Clearing Auction）スマートコントラクトパラメータをインタラクティブフォームで設定 |
| [deployer](https://github.com/Uniswap/uniswap-ai/tree/main/packages/plugins/uniswap-cca/skills/deployer) | FactoryパターンでCCAスマートコントラクトをデプロイ |
| [liquidity-planner](https://github.com/Uniswap/uniswap-ai/tree/main/packages/plugins/uniswap-driver/skills/liquidity-planner) | Uniswap v3/v4流動性供給プラン。LPポジション作成、集中流動性範囲設定 |
| [swap-planner](https://github.com/Uniswap/uniswap-ai/tree/main/packages/plugins/uniswap-driver/skills/swap-planner) | Uniswapトークンスワッププラン。ETH↔USDC、トークン売買、ミームコイン検索 |
| [v4-security-foundations](https://github.com/Uniswap/uniswap-ai/tree/main/packages/plugins/uniswap-hooks/skills/v4-security-foundations) | Uniswap v4フックセキュリティ中心開発。PoolManager、beforeSwap/afterSwapセキュリティベストプラクティス、脆弱性、監査ガイド |
| [swap-integration](https://github.com/Uniswap/uniswap-ai/tree/main/packages/plugins/uniswap-trading/skills/swap-integration) | Uniswapスワップをアプリケーションに統合。Trading API、スワップフロントエンド、スマートコントラクトスワップ実装 |
| [viem-integration](https://github.com/Uniswap/uniswap-ai/tree/main/packages/plugins/uniswap-viem/skills/viem-integration) | viemでEVMブロックチェーン統合。ブロックチェーンデータ読み取り、トランザクション送信、スマートコントラクトインタラクション、wagmi連携 |

</details>

<details><summary>austintgriffith/ethskills スキル詳細 (23個)</summary>

| スキル | 説明 |
|:-----|:------------|
| [addresses](https://github.com/austintgriffith/ethskills/tree/main/addresses) | EthereumメインネットとL2の主要プロトコル検証済みコントラクトアドレス。アドレス推測/幻覚防止用 |
| [audit](https://github.com/austintgriffith/ethskills/tree/main/audit) | EVMスマートコントラクト深層セキュリティ監査。脆弱性探索、コードセキュリティレビュー、GitHubセキュリティIssue提出 |
| [building-blocks](https://github.com/austintgriffith/ethskills/tree/main/building-blocks) | DeFiレゴとプロトコルコンポーザビリティ。チェーン別主要プロトコル — BaseのAerodrome、ArbitrumのGMX/Pendle、OptimismのVelodrome |
| [concepts](https://github.com/austintgriffith/ethskills/tree/main/concepts) | オンチェーン構築のためのコアメンタルモデル — LLMが間違えやすいことと説明が必要なことに集中 |
| [contracts](https://github.com/austintgriffith/ethskills/tree/main/contracts) | （非推奨）addressesスキルに移行 |
| [defi](https://github.com/austintgriffith/ethskills/tree/main/defi) | （非推奨）building-blocksスキルに移行 |
| [frontend-playbook](https://github.com/austintgriffith/ethskills/tree/main/frontend-playbook) | Ethereum dAppビルド→プロダクション完全パイプライン。フォークモード設定、IPFSデプロイ、Vercel設定、ENSサブドメイン |
| [frontend-ux](https://github.com/austintgriffith/ethskills/tree/main/frontend-ux) | Ethereum dAppフロントエンドUXルール。オンチェーンボタン、トークン承認フロー、アドレス表示などAIエージェントUIバグ防止パターン |
| [gas](https://github.com/austintgriffith/ethskills/tree/main/gas) | 現在のEthereumガス価格、トランザクションコスト、Ethereum構築のリアルな経済学 |
| [indexing](https://github.com/austintgriffith/ethskills/tree/main/indexing) | オンチェーンデータ読み取り/クエリ方法 — イベント、The Graph、インデキシングパターン。ブロックループの代わりに使うツール |
| [l2](https://github.com/austintgriffith/ethskills/tree/main/l2) | （非推奨）l2sスキルに移行 |
| [l2s](https://github.com/austintgriffith/ethskills/tree/main/l2s) | Ethereum L2現況 — Arbitrum, Optimism, Base, zkSync, Scroll, Unichain, Celo等。動作原理、デプロイ、ブリッジ方法 |
| [layer2](https://github.com/austintgriffith/ethskills/tree/main/layer2) | （非推奨）l2sスキルに移行 |
| [ethskills](https://github.com/austintgriffith/ethskills/tree/main/openclaw-skill) | AIエージェントのためのEthereum開発知識 — アイデアからデプロイ済みdAppまで。ガスコスト、Solidityパターン、Scaffold-ETH 2、L2リアルタイムドキュメント |
| [orchestration](https://github.com/austintgriffith/ethskills/tree/main/orchestration) | AIエージェントが完全なEthereum dAppを計画、ビルド、デプロイする方法。Scaffold-ETH 2プロジェクト3段階ビルドシステム |
| [qa](https://github.com/austintgriffith/ethskills/tree/main/qa) | Scaffold-ETH 2でビルドしたEthereum dAppリリース前監査チェックリスト。ビルド完了後に別のレビューエージェントに引き渡し |
| [security](https://github.com/austintgriffith/ethskills/tree/main/security) | Solidityセキュリティパターン、一般的な脆弱性、デプロイ前監査チェックリスト。実際の損失を防ぐ具体的なコードパターン |
| [ship](https://github.com/austintgriffith/ethskills/tree/main/ship) | AIエージェントのためのE2Eガイド — dAppアイデアからプロダクションデプロイまで。最初にフェッチするスキル、他のすべてのスキルへルーティング |
| [standards](https://github.com/austintgriffith/ethskills/tree/main/standards) | Ethereumトークンおよびプロトコル標準 — ERC-20, ERC-721, ERC-1155, ERC-4337, ERC-8004等 |
| [testing](https://github.com/austintgriffith/ethskills/tree/main/testing) | Foundryでスマートコントラクトテスト — ユニットテスト、ファズテスト、フォークテスト、不変条件テスト |
| [tools](https://github.com/austintgriffith/ethskills/tree/main/tools) | 現在のEthereum開発ツール、フレームワーク、ライブラリ、RPC、ブロックエクスプローラー。今日実際に動作するツール |
| [wallets](https://github.com/austintgriffith/ethskills/tree/main/wallets) | Ethereumウォレット作成、管理、使用。EOA、スマートコントラクトウォレット、マルチシグ(Safe)、アカウント抽象化 |
| [why-ethereum](https://github.com/austintgriffith/ethskills/tree/main/why) | Ethereumでビルドする理由。AIエージェント視点 — ERC-8004, x402, コンポーザビリティ, パーミッションレスデプロイ |

</details>

<details><summary>trustwallet/tw-agent-skills スキル詳細 (5個)</summary>

| スキル | 説明 |
|:-----|:------------|
| [assets](https://github.com/trustwallet/tw-agent-skills/tree/main/skills/assets) | Trust Walletアセットリポジトリ — トークンロゴ/メタデータ照会、ブロックチェーン別アセット一覧、新規アセット貢献 |
| [barz](https://github.com/trustwallet/tw-agent-skills/tree/main/skills/barz) | Barz — Trust Walletのモジュラー型ERC-4337スマートコントラクトウォレットのビルド/使用/貢献 |
| [trust-developer](https://github.com/trustwallet/tw-agent-skills/tree/main/skills/trust-developer) | Trust Wallet開発者プラットフォーム。ディープリンク統合、ブラウザ拡張検出、WalletConnect設定 |
| [trust-web3-provider](https://github.com/trustwallet/tw-agent-skills/tree/main/skills/trust-web3-provider) | Trust Wallet Web3プロバイダーライブラリ統合。マルチチェーンdApp連携、ブロックチェーンサポート追加 |
| [wallet-core](https://github.com/trustwallet/tw-agent-skills/tree/main/skills/wallet-core) | Trust Wallet Core — 140以上のブロックチェーンでHDウォレット作成、アドレス導出、トランザクション署名 |

</details>

## スキル & プラグイン — 汎用 Web3 ルール

| リポジトリ | スター | タイプ | 最終更新 | 説明 |
|:-----------|------:|:----:|:---:|:------------|
| [leerob/directories](https://github.com/leerob/directories) | ![](https://img.shields.io/github/stars/leerob/directories?style=flat-square&logo=github) | `Community` | '26.02 | Cursor & Windsurfコミュニティディレクトリ、Web3ルールとMCPサーバーの探索 |
| [BankrBot/openclaw-skills](https://github.com/BankrBot/openclaw-skills) | ![](https://img.shields.io/github/stars/BankrBot/openclaw-skills?style=flat-square&logo=github) | `Community` | '26.02 | OpenClawスキルライブラリ、暗号資産トレーディング、DeFi運用、Polymarket、自動化スキルを含む `15個スキル` |
| [nirholas/free-crypto-news](https://github.com/nirholas/free-crypto-news) | ![](https://img.shields.io/github/stars/nirholas/free-crypto-news?style=flat-square&logo=github) | `Community` | '26.03 | 無料暗号資産ニュースAPI — BTC、ETH、DeFiリアルタイム集約、Claude MCPサーバーおよび多言語SDK対応 |
| [heilcheng/awesome-agent-skills](https://github.com/heilcheng/awesome-agent-skills) | ![](https://img.shields.io/github/stars/heilcheng/awesome-agent-skills?style=flat-square&logo=github) | `Community` | '26.03 | AIコーディングエージェント（Claude, Codex, Copilot等）のためのスキル、ツール、チュートリアルキュレーションリスト |
| [coinmarketcap-official/skills-for-ai-agents-by-CoinMarketCap](https://github.com/coinmarketcap-official/skills-for-ai-agents-by-CoinMarketCap) | ![](https://img.shields.io/github/stars/coinmarketcap-official/skills-for-ai-agents-by-CoinMarketCap?style=flat-square&logo=github) | `Community` | '26.03 | CoinMarketCapがAIエージェント向けに作成したスキルコレクション。Claude Code/MCPと統合して暗号資産の相場・情報照会などWeb3機能をAIワークフローに自動化可能。 `8個スキル` |
| [binance/binance-skills-hub](https://github.com/binance/binance-skills-hub) | ![](https://img.shields.io/github/stars/binance/binance-skills-hub?style=flat-square&logo=github) | `Community` | '26.03 | Binance Skills Hub is an open skills marketplace that gives AI agents native access to crypto `7個スキル` |
| [bitget-wallet-ai-lab/bitget-wallet-skill](https://github.com/bitget-wallet-ai-lab/bitget-wallet-skill) | ![](https://img.shields.io/github/stars/bitget-wallet-ai-lab/bitget-wallet-skill?style=flat-square&logo=github) | `Community` | '26.03 | Bitget Wallet APIをラップしたAIエージェントスキルで、自然言語コマンドでトークンスワップ、クロスチェーンブリッジ、ガスレストランザクションを実行できます。ClaudeとMCPを通じてWeb3アプリケーションにブロックチェーン機能を自動化された方法で統合できます。 |
| [quiknode-labs/blockchain-skills](https://github.com/quiknode-labs/blockchain-skills) | ![](https://img.shields.io/github/stars/quiknode-labs/blockchain-skills?style=flat-square&logo=github) | `Community` | '26.03 | ブロックチェーン開発者向けのClaude Code、Cursor等のコーディングエージェントで使用可能なWeb3/ブロックチェーン関連スキルをまとめたリポジトリです。Ethereum、Solana等の様々なブロックチェーン環境でスマートコントラクト開発と暗号資産関連作業をより効率的に実行できるよう支援します。 `1個スキル` |
| [bitrouter/bitrouter](https://github.com/bitrouter/bitrouter) | ![](https://img.shields.io/github/stars/bitrouter/bitrouter?style=flat-square&logo=github) | `Community` | '26.04 | bitrrouterは、AI エージェントの LLM、ツール、エージェント間のルーティングを管理するプロキシであり、Web3 環境でエージェント ベースの自動化を安全に制御します。Claude Code と MCP を通じてエージェント ワークフローを構成し、ブロックチェーン タスクを自動化できます。 |
| [nirholas/cryptocurrency.cv](https://github.com/nirholas/cryptocurrency.cv) | ![](https://img.shields.io/github/stars/nirholas/cryptocurrency.cv?style=flat-square&logo=github) | `Community` | '26.04 | 暗号資産市場ニュースをリアルタイムで収集する無料APIで、Claude MCPサーバーと連携され、AIエージェントが直接最新ブロックチェーン/暗号資産情報を照会できるようにしてくれます。 |
| [asksurf-ai/surf-skills](https://github.com/asksurf-ai/surf-skills) | ![](https://img.shields.io/github/stars/asksurf-ai/surf-skills?style=flat-square&logo=github) | `Community` | '26.04 | Claude Codeエージェントに、暗号資産価格、ウォレット、オンチェーンデータなど83以上のWeb3エンドポイントを提供するスキルライブラリであり、MCPを通じてブロックチェーン開発時に様々なクリプトデータに直接アクセスできるようにします。 `1個スキル` |
| [drpcorg/drpc-agent-skills](https://github.com/drpcorg/drpc-agent-skills) | ![](https://img.shields.io/github/stars/drpcorg/drpc-agent-skills?style=flat-square&logo=github) | `Community` | '26.04 | DRPC エージェント スキルは、AI コーディング エージェントに 200 以上のブロックチェーン ネットワークへの RPC アクセスを可能にする MCP ツールです。Claude Code や Cursor などの AI エージェントで Web3 開発を行う際、追加設定なしに即座にブロックチェーン データを照会し、相互作用することができます。 `1個スキル` |

<details><summary>BankrBot/openclaw-skills スキル詳細 (15個)</summary>

| スキル | 説明 |
|:-----|:------------|
| [bankr-signals](https://github.com/BankrBot/openclaw-skills/tree/main/bankr-signals) | Bankrトレーディングシグナルスキル |
| [bankr](https://github.com/BankrBot/openclaw-skills/tree/main/bankr) | AI搭載暗号資産トレーディングエージェント/LLMゲートウェイ。自然言語で暗号取引、ポートフォリオ残高確認、トークン価格照会 |
| [base](https://github.com/BankrBot/openclaw-skills/tree/main/base) | Baseチェーンスキル（プレースホルダー） |
| [botchan](https://github.com/BankrBot/openclaw-skills/tree/main/botchan) | BaseブロックチェーンオンチェーンエージェントメッセージングCLI。エージェント探索、フィード投稿、DM送信、Net Protocolベース |
| [clanker](https://github.com/BankrBot/openclaw-skills/tree/main/clanker) | Clanker SDKでBase、Ethereum、Arbitrum等EVMチェーンにERC20トークンデプロイ。ミームコインローンチサポート |
| [endaoment](https://github.com/BankrBot/openclaw-skills/tree/main/endaoment) | Endaomentを通じたオンチェーン慈善寄付。暗号資産で非営利団体に寄付 |
| [ens-primary-name](https://github.com/BankrBot/openclaw-skills/tree/main/ens-primary-name) | BaseおよびL2でのENSプライマリ名設定。逆引き解決設定、プライマリ名構成 |
| [erc-8004](https://github.com/BankrBot/openclaw-skills/tree/main/erc-8004) | ERC-8004（Trustless Agents）でEthereumメインネットにAIエージェントオンチェーンID登録 |
| [neynar](https://github.com/BankrBot/openclaw-skills/tree/main/neynar) | Neynar APIでFarcasterインタラクション。フィード読み取り、ユーザー照会、キャスト投稿、コンテンツ検索 |
| [onchainkit](https://github.com/BankrBot/openclaw-skills/tree/main/onchainkit) | Coinbase OnchainKitでReactコンポーネント/TypeScriptユーティリティベースのオンチェーンアプリビルド |
| [qrcoin](https://github.com/BankrBot/openclaw-skills/tree/main/qrcoin) | BaseのQR Coinオークション参加。qrcoin.fun QRコードオークション状況確認、入札、リーダーボード照会 |
| [siwa](https://github.com/BankrBot/openclaw-skills/tree/main/siwa) | SIWA（Sign In With Account）認証スキル |
| [veil](https://github.com/BankrBot/openclaw-skills/tree/main/veil) | Veil Cashを通じたBaseプライバシー/シールドトランザクション。ZK証明でETH/USDCプライベート入出金/転送 |
| [yoink](https://github.com/BankrBot/openclaw-skills/tree/main/yoink) | Yoink — Baseオンチェーンキャプチャー・ザ・フラッグゲーム。フラッグ奪取、ゲーム統計/リーダーボード、プレイヤースコア照会 |
| [zapper](https://github.com/BankrBot/openclaw-skills/tree/main/zapper) | Zapperスキル（プレースホルダー） |

</details>

<details><summary>coinmarketcap-official/skills-for-ai-agents-by-CoinMarketCap スキル詳細 (8個)</summary>

| スキル | 説明 |
|:-----|:------------|
| [cmc-api-crypto](https://github.com/coinmarketcap-official/skills-for-ai-agents-by-CoinMarketCap/tree/main/skills/cmc-api-crypto) | CoinMarketCap暗号資産API — 相場、上場一覧、OHLCV、トレンド、カテゴリエンドポイント |
| [cmc-api-dex](https://github.com/coinmarketcap-official/skills-for-ai-agents-by-CoinMarketCap/tree/main/skills/cmc-api-dex) | CoinMarketCap DEX API — トークン照会、プール、トランザクション、トレンド、セキュリティ分析エンドポイント |
| [cmc-api-exchange](https://github.com/coinmarketcap-official/skills-for-ai-agents-by-CoinMarketCap/tree/main/skills/cmc-api-exchange) | CoinMarketCap取引所API — 取引所情報、取引量、マーケットペア、アセットエンドポイント |
| [cmc-api-market](https://github.com/coinmarketcap-official/skills-for-ai-agents-by-CoinMarketCap/tree/main/skills/cmc-api-market) | CoinMarketCap市場全体API — グローバル指標、恐怖/貪欲指数、インデックス、トレンドトピック、チャート |
| [cmc-mcp](https://github.com/coinmarketcap-official/skills-for-ai-agents-by-CoinMarketCap/tree/main/skills/cmc-mcp) | CoinMarketCap MCPで暗号資産の相場、テクニカル分析、ニュース、トレンドデータ取得 |
| [cmc-x402](https://github.com/coinmarketcap-official/skills-for-ai-agents-by-CoinMarketCap/tree/main/skills/cmc-x402) | x402プロトコル（Base USDC決済）でCoinMarketCapデータアクセス。APIキー不要で使用可能 |
| [crypto-research](https://github.com/coinmarketcap-official/skills-for-ai-agents-by-CoinMarketCap/tree/main/skills/crypto-research) | CoinMarketCap MCPデータで暗号資産の総合デューデリジェンス(DD)。価格以外の特定コイン詳細分析 |
| [market-report](https://github.com/coinmarketcap-official/skills-for-ai-agents-by-CoinMarketCap/tree/main/skills/market-report) | CoinMarketCap MCPデータで総合暗号市場レポート生成。市場状況、センチメント、全体的な現況分析 |

</details>

<details><summary>binance/binance-skills-hub スキル詳細 (7個)</summary>

| スキル | 説明 |
|:-----|:------------|
| [crypto-market-rank](https://github.com/binance/binance-skills-hub/tree/main/skills/binance-web3/crypto-market-rank) | Crypto market rankings and leaderboards. Query trending tokens, top searched tokens, Binance Alpha tokens, tokenized stocks, social hype sentiment ranks, smart money inflow token rankings, top meme to... |
| [meme-rush](https://github.com/binance/binance-skills-hub/tree/main/skills/binance-web3/meme-rush) | Meme token fast-trading assistant with two core capabilities: 1. Meme Rush - Real-time meme token lists from launchpads (Pump.fun, Four.meme, etc.) across new, finalizing, and migrated stages 2. |
| [query-address-info](https://github.com/binance/binance-skills-hub/tree/main/skills/binance-web3/query-address-info) | Query any on-chain wallet address token balances and positions. Retrieves all token holdings for a specified wallet address on a given chain, including token name, symbol, price, 24h price change, and... |
| [query-token-audit](https://github.com/binance/binance-skills-hub/tree/main/skills/binance-web3/query-token-audit) | Query token security audit to detect scams, honeypots, and malicious contracts before trading. Returns comprehensive security analysis including contract risks, trading risks, and scam detection. |
| [query-token-info](https://github.com/binance/binance-skills-hub/tree/main/skills/binance-web3/query-token-info) | Query token details by keyword, contract address, or chain. Search tokens, get metadata and social links, retrieve real-time market data (price, price trend, volume, holders, liquidity), and fetch K-L... |
| [trading-signal](https://github.com/binance/binance-skills-hub/tree/main/skills/binance-web3/trading-signal) | Subscribe and retrieve on-chain Smart Money signals. Monitor trading activities of smart money addresses, including buy/sell signals, trigger price, current price, max gain, and exit rate. |
| [spot](https://github.com/binance/binance-skills-hub/tree/main/skills/binance/spot) | Binance Spot request using the Binance API. Authentication requires API key and secret key. Supports testnet and mainnet. |

</details>

<details><summary>quiknode-labs/blockchain-skills スキル詳細 (1個)</summary>

| スキル | 説明 |
|:-----|:------------|
| [quicknode-skill](https://github.com/quiknode-labs/blockchain-skills/tree/main/skills/quicknode-skill) | Quicknode blockchain infrastructure including RPC endpoints (80+ chains), Streams (real-time data), Webhooks, IPFS storage, Marketplace Add-ons (Token API, NFT API, DeFi tools), Solana DAS API (Digita... |

</details>

<details><summary>asksurf-ai/surf-skills スキル詳細 (1個)</summary>

| スキル | 説明 |
|:-----|:------------|
| [surf](https://github.com/asksurf-ai/surf-skills/tree/main/skills/surf) | >- |

</details>

<details><summary>drpcorg/drpc-agent-skills スキル詳細 (1個)</summary>

| スキル | 説明 |
|:-----|:------------|
| [drpc-rpc](https://github.com/drpcorg/drpc-agent-skills/tree/main/skills/drpc-rpc) | Use when the user needs blockchain data (balances, transactions, blocks, gas prices, contract reads), wants to set up blockchain RPC access, or mentions DRPC, Web3, or Ethereum RPC. |

</details>

## MCP サーバー — オンチェーンデータ & 分析

> Claude Codeからオンチェーンデータを直接クエリできるMCPサーバー。

| リポジトリ | スター | タイプ | 最終更新 | 説明 |
|:-----------|------:|:----:|:---:|:------------|
| [mcpdotdirect/evm-mcp-server](https://github.com/mcpdotdirect/evm-mcp-server) | ![](https://img.shields.io/github/stars/mcpdotdirect/evm-mcp-server?style=flat-square&logo=github) | `Community` | '25.11 | 汎用EVM MCP、Ethereum、Base、Arbitrum、Polygonなどとインタラクション |
| [aaronjmars/web3-research-mcp](https://github.com/aaronjmars/web3-research-mcp) | ![](https://img.shields.io/github/stars/aaronjmars/web3-research-mcp?style=flat-square&logo=github) | `Community` | '25.10 | 暗号資産ディープリサーチエージェント、ローカル、無料、プロトコル分析自動化 |
| [alchemyplatform/alchemy-mcp-server](https://github.com/alchemyplatform/alchemy-mcp-server) | ![](https://img.shields.io/github/stars/alchemyplatform/alchemy-mcp-server?style=flat-square&logo=github) | `Official` | '26.01 | 60以上のネットワークで残高、トランザクション、NFT、トークンデータ |
| [Bankless/onchain-mcp](https://github.com/Bankless/onchain-mcp) | ![](https://img.shields.io/github/stars/Bankless/onchain-mcp?style=flat-square&logo=github) | `Official` | '26.02 | MCP経由のスマートコントラクトインタラクション、tx照会、トークン情報 |
| [solana-foundation/solana-mcp-official](https://github.com/solana-foundation/solana-mcp-official) | ![](https://img.shields.io/github/stars/solana-foundation/solana-mcp-official?style=flat-square&logo=github) | `Official` | '25.08 | Solana Foundation公式MCPサーバー |
| [heurist-network/heurist-mesh-mcp-server](https://github.com/heurist-network/heurist-mesh-mcp-server) | ![](https://img.shields.io/github/stars/heurist-network/heurist-mesh-mcp-server?style=flat-square&logo=github) | `Official` | '26.02 | Web3 AIエージェントメッシュ、ブロックチェーン分析、セキュリティ監査、トークンメトリクス、DeFi分析 |
| [getAlby/mcp](https://github.com/getAlby/mcp) | ![](https://img.shields.io/github/stars/getAlby/mcp?style=flat-square&logo=github) | `Official` | '26.02 | ビットコインLightningウォレットMCP、Nostr Wallet Connectで決済の送受信 |
| [truss44/mcp-crypto-price](https://github.com/truss44/mcp-crypto-price) | ![](https://img.shields.io/github/stars/truss44/mcp-crypto-price?style=flat-square&logo=github) | `Community` | '26.02 | CoinCap API経由のリアルタイム暗号資産価格分析 |
| [coinpaprika/dexpaprika-mcp](https://github.com/coinpaprika/dexpaprika-mcp) | ![](https://img.shields.io/github/stars/coinpaprika/dexpaprika-mcp?style=flat-square&logo=github) | `Official` | '25.10 | DEXデータMCP、20以上のチェーンでリアルタイム価格、流動性プール、OHLCV |
| [noditlabs/nodit-mcp-server](https://github.com/noditlabs/nodit-mcp-server) | ![](https://img.shields.io/github/stars/noditlabs/nodit-mcp-server?style=flat-square&logo=github) | `Official` | '26.02 | Nodit Web3 Data API MCP、AIエージェントのためのマルチチェーンブロックチェーンデータアクセス |
| [Cortex-AI-Software/Autonomous-AI-Trading-Agent-MCP-Flash-Arb-Engine](https://github.com/Cortex-AI-Software/Autonomous-AI-Trading-Agent-MCP-Flash-Arb-Engine) | ![](https://img.shields.io/github/stars/Cortex-AI-Software/Autonomous-AI-Trading-Agent-MCP-Flash-Arb-Engine?style=flat-square&logo=github) | `Community` | '26.03 | このレポはMCPプロトコルとLLMを活用した自動化取引エージェントで、ソラナとEVMチェーンでフラッシュローンを利用したアービトラージを実行します。Claude CodeからMCPサーバーとして連携して、AI基盤のブロックチェーン取引自動化を実装できます。 |

## MCP サーバー — スマートコントラクト & DeFi

> スマートコントラクト分析、デコンパイル、DeFiプロトコルアクセス。

| リポジトリ | スター | タイプ | 最終更新 | 説明 |
|:-----------|------:|:----:|:---:|:------------|
| [PraneshASP/foundry-mcp-server](https://github.com/PraneshASP/foundry-mcp-server) | ![](https://img.shields.io/github/stars/PraneshASP/foundry-mcp-server?style=flat-square&logo=github) | `Community` | '26.01 | Foundry用MCPサーバー、AIエージェントによるSolidityコントラクトのコンパイル/テスト/デプロイ |
| [debridge-finance/debridge-mcp](https://github.com/debridge-finance/debridge-mcp) | ![](https://img.shields.io/github/stars/debridge-finance/debridge-mcp?style=flat-square&logo=github) | `Official` | '26.02 | deBridgeプロトコル経由のクロスチェーンスワップと転送をAIエージェントで実行 |
| [nirholas/UCAI](https://github.com/nirholas/UCAI) | ![](https://img.shields.io/github/stars/nirholas/UCAI?style=flat-square&logo=github) | `Community` | '26.02 | 汎用コントラクトAIインターフェース、あらゆるスマートコントラクト用ABI-to-MCPサーバージェネレーター |
| [thirdweb-dev/ai](https://github.com/thirdweb-dev/ai) | ![](https://img.shields.io/github/stars/thirdweb-dev/ai?style=flat-square&logo=github) | `Official` | '25.06 | AIエージェント用オールインワンWeb3 SDK（ウォレット、AA、RPC） |
| [aibtcdev/aibtc-mcp-server](https://github.com/aibtcdev/aibtc-mcp-server) | ![](https://img.shields.io/github/stars/aibtcdev/aibtc-mcp-server?style=flat-square&logo=github) | `Community` | '26.03 | AIエージェント用Bitcoin-native MCPサーバー: BTC/STXウォレット、DeFiイールド、sBTCペグ、NFT、x402決済 |
| [minhoyoo-iotrust/WAIaaS](https://github.com/minhoyoo-iotrust/WAIaaS) | ![](https://img.shields.io/github/stars/minhoyoo-iotrust/WAIaaS?style=flat-square&logo=github) | `Community` | '26.03 | このレポはAIエージェントがブロックチェーン資産を自動的に管理できるようにするウォレットサービスであり、MCP標準を通じてClaudeのようなLLMエージェントに直接統合されてWeb3タスクを実行します。 |

---

# Compatible Tools

> Claude Codeとの相乗効果が高い汎用Web3ツール — CLI実行可能、エージェント対応、または開発コンテキストとして有用。

## スマートコントラクト開発ツール

> Claude CodeがBash経由で直接実行可能なコアCLIツール。

| リポジトリ | スター | タイプ | 最終更新 | 説明 |
|:-----------|------:|:----:|:---:|:------------|
| [OpenZeppelin/openzeppelin-contracts](https://github.com/OpenZeppelin/openzeppelin-contracts) | ![](https://img.shields.io/github/stars/OpenZeppelin/openzeppelin-contracts?style=flat-square&logo=github) | `Official` | '26.02 | 標準ライブラリ、あらゆるコントラクトのためのインポートパターンとセキュリティプリミティブ |
| [foundry-rs/foundry](https://github.com/foundry-rs/foundry) | ![](https://img.shields.io/github/stars/foundry-rs/foundry?style=flat-square&logo=github) | `Official` | '26.02 | CLIネイティブツールキット、`forge test`、`cast call`をエージェントが直接実行可能 |
| [NomicFoundation/hardhat](https://github.com/NomicFoundation/hardhat) | ![](https://img.shields.io/github/stars/NomicFoundation/hardhat?style=flat-square&logo=github) | `Official` | '26.02 | Ethereum開発環境、コンパイル/デプロイ/テスト/デバッグ、`npx hardhat test`をエージェントが直接実行可能 |
| [crytic/slither](https://github.com/crytic/slither) | ![](https://img.shields.io/github/stars/crytic/slither?style=flat-square&logo=github) | `Official` | '26.02 | 静的解析、Claude Codeで`slither .`を実行して脆弱性分析と修正 |
| [ConsenSysDiligence/mythril](https://github.com/ConsenSysDiligence/mythril) | ![](https://img.shields.io/github/stars/ConsenSysDiligence/mythril?style=flat-square&logo=github) | `Official` | '26.02 | シンボリック実行アナライザー、`myth analyze`実行で脆弱性検出 |
| [crytic/echidna](https://github.com/crytic/echidna) | ![](https://img.shields.io/github/stars/crytic/echidna?style=flat-square&logo=github) | `Official` | '26.02 | プロパティベースファジング、不変条件テスト作成、echidna実行、結果分析 |
| [protofire/solhint](https://github.com/protofire/solhint) | ![](https://img.shields.io/github/stars/protofire/solhint?style=flat-square&logo=github) | `Community` | '26.02 | Solidityリンター、スタイルとセキュリティルール適用、`solhint .`をエージェントが直接実行可能 |
| [sc-forks/solidity-coverage](https://github.com/sc-forks/solidity-coverage) | ![](https://img.shields.io/github/stars/sc-forks/solidity-coverage?style=flat-square&logo=github) | `Community` | '25.12 | Solidityテストコードカバレッジ、未テストのコントラクトパス特定 |
| [a16z/halmos](https://github.com/a16z/halmos) | ![](https://img.shields.io/github/stars/a16z/halmos?style=flat-square&logo=github) | `Official` | '25.08 | EVMスマートコントラクトのシンボリックテスト、CLIベースの形式検証 |
| [Cyfrin/aderyn](https://github.com/Cyfrin/aderyn) | ![](https://img.shields.io/github/stars/Cyfrin/aderyn?style=flat-square&logo=github) | `Official` | '26.02 | RustベースのSolidity静的アナライザー、Slither補完用 |
| [crytic/medusa](https://github.com/crytic/medusa) | ![](https://img.shields.io/github/stars/crytic/medusa?style=flat-square&logo=github) | `Official` | '26.02 | 並列カバレッジベースSolidityファザー、Echidnaより高速な代替 |

## AI エージェントフレームワーク — オンチェーン

> オンチェーントランザクションを自律的に実行するAIエージェントフレームワーク。

| リポジトリ | スター | タイプ | 最終更新 | 説明 |
|:-----------|------:|:----:|:---:|:------------|
| [elizaOS/eliza](https://github.com/elizaOS/eliza) | ![](https://img.shields.io/github/stars/elizaOS/eliza?style=flat-square&logo=github) | `Community` | '26.02 | 自律AIエージェント、トークンスワップ、NFTミント、オンチェーンtx（プラグインシステム） |
| [sendaifun/solana-agent-kit](https://github.com/sendaifun/solana-agent-kit) | ![](https://img.shields.io/github/stars/sendaifun/solana-agent-kit?style=flat-square&logo=github) | `Community` | '26.01 | Solana AIエージェントフレームワーク、あらゆるAIエージェントをSolanaプロトコルに接続 |
| [coinbase/agentkit](https://github.com/coinbase/agentkit) | ![](https://img.shields.io/github/stars/coinbase/agentkit?style=flat-square&logo=github) | `Official` | '26.02 | 「すべてのAIエージェントにウォレットを。」ERC-4337アカウント抽象化 |
| [piotrostr/listen](https://github.com/piotrostr/listen) | ![](https://img.shields.io/github/stars/piotrostr/listen?style=flat-square&logo=github) | `Community` | '25.11 | DeFAIスイスアーミーナイフ、SolanaとEVM用AI駆動DeFiエージェントツールキット |
| [goat-sdk/goat](https://github.com/goat-sdk/goat) | ![](https://img.shields.io/github/stars/goat-sdk/goat?style=flat-square&logo=github) | `Community` | '26.01 | エージェンティックファイナンスツールキット、LLMエージェントをDeFiプロトコルにクロスチェーン接続 |
| [swapperfinance/swapper-toolkit](https://github.com/swapperfinance/swapper-toolkit) | ![](https://img.shields.io/github/stars/swapperfinance/swapper-toolkit?style=flat-square&logo=github) | `Community` | '26.04 | AI エージェントが直接暗号資産ウォレットを管理し、トークンを取引できるようにする DeFi ツールキットで、Claude Code のような AI コーディング アシスタントに統合され、自動化されたブロックチェーン処理を実行します。 |

## 学習 & リファレンス

> AIコーディングエージェントを活用したWeb3開発の学習リソース。

| リポジトリ | スター | タイプ | 最終更新 | 説明 |
|:-----------|------:|:----:|:---:|:------------|
| [ethereumbook/ethereumbook](https://github.com/ethereumbook/ethereumbook) | ![](https://img.shields.io/github/stars/ethereumbook/ethereumbook?style=flat-square&logo=github) | `Community` | '26.02 | 「Mastering Ethereum」オープンソース書籍、AIエージェントのための包括的Ethereum/EVMリファレンス |
| [Cyfrin/foundry-full-course-cu](https://github.com/Cyfrin/foundry-full-course-cu) | ![](https://img.shields.io/github/stars/Cyfrin/foundry-full-course-cu?style=flat-square&logo=github) | `Official` | '26.02 | Foundry完全コース、Claude Codeを活用したSolidity開発学習リファレンス |
| [OpenZeppelin/ethernaut](https://github.com/OpenZeppelin/ethernaut) | ![](https://img.shields.io/github/stars/OpenZeppelin/ethernaut?style=flat-square&logo=github) | `Official` | '26.02 | セキュリティCTF、Claude Codeで解きながらスマートコントラクトセキュリティパターンを学習 |
| [scaffold-eth/scaffold-eth-2](https://github.com/scaffold-eth/scaffold-eth-2) | ![](https://img.shields.io/github/stars/scaffold-eth/scaffold-eth-2?style=flat-square&logo=github) | `Community` | '26.02 | Next.js + Foundry/HardhatベースのフォーカブルdApp開発スタック、高速プロトタイピング用 |
| [solana-foundation/awesome-solana-ai](https://github.com/solana-foundation/awesome-solana-ai) | ![](https://img.shields.io/github/stars/solana-foundation/awesome-solana-ai?style=flat-square&logo=github) | `Official` | '26.02 | Solana FoundationのSolana構築のためのAIツーリングキュレーションリスト |

---

## コントリビュート

掲載されていないリポジトリを見つけましたか？Issueを開くか、PRを提出してください！

## ライセンス

[CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/)
