# Awesome Web3 Claude — Project Guide

## 개요

Web3 + Claude Code 생태계의 MCP 서버, 스킬, AI 에이전트, 개발 도구를 **반자동으로 큐레이션**하는 시스템.

매일 자동으로 신규 레포를 탐색하고, 관리자가 Telegram 버튼 하나로 승인하면 README가 자동 업데이트된다.

## 기술 스택

- **Runtime**: Node.js 20+ (ESM)
- **Dependencies**: `@octokit/rest`, `express`
- **Infra**: GitHub Actions + VPS Express 서버
- **AI**: Claude Code CLI headless (haiku) — VPS에서 실행

## 아키텍처

```
┌─────────────────────────────────────────────────────┐
│  GitHub Actions (daily-discover.yml, 매일 18:00 KST) │
│                                                      │
│  discover.mjs                                        │
│  ├─ GitHub Search API (15 쿼리)                      │
│  ├─ Web3 관련성 필터 (키워드 점수 50+)                │
│  ├─ 상위 10개 심층 분석                               │
│  │   ├─ README 분석, 신뢰도 평가, Claude 호환성       │
│  │   └─ POST VPS API → Claude Code haiku              │
│  │       → 한국어 설명 생성 (~5초/건)                 │
│  └─ discover-results.json 저장                       │
│                                                      │
│  notify-telegram.mjs                                 │
│  └─ 관리자 DM: 상세 평가 + [추가/스킵] 버튼           │
└──────────────────────────┬──────────────────────────┘
                           │
                    사용자가 "추가" 클릭
                           │
┌──────────────────────────▼──────────────────────────┐
│  VPS — telegram-webhook.mjs (Express)                 │
│  ├─ 메시지에서 한국어 설명 추출 (재생성 안 함)         │
│  └─ GitHub workflow_dispatch → update-readme.yml     │
└──────────────────────────┬──────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────┐
│  GitHub Actions (update-readme.yml)                   │
│  ├─ repos.json 수정 (add/remove/skip/keep)           │
│  ├─ generate-readme.mjs → README.md + README_EN.md   │
│  ├─ git commit & push                                │
│  └─ Telegram 공개 채널 + 관리자 DM 알림               │
└─────────────────────────────────────────────────────┘
```

## 디렉토리 구조

```
awesome-web3-claude/
├── .github/workflows/
│   ├── daily-discover.yml      # 일일 탐색 + 알림
│   └── update-readme.yml       # 승인 후 README 업데이트
├── scripts/
│   ├── config.mjs              # 공유 상수 (TRUSTED_ORGS, SECTION_ORDER, SECTION_LABELS)
│   ├── discover.mjs            # 신규 레포 탐색 + 분석
│   ├── notify-telegram.mjs     # Telegram 알림 (상세 평가)
│   ├── telegram-webhook.mjs    # VPS Express 서버
│   ├── generate-readme.mjs     # repos.json → README 생성
│   └── migrate-readme.mjs      # 초기 마이그레이션 (일회성)
├── data/
│   ├── repos.json              # 마스터 데이터 (전체 레포)
│   ├── skipped.json            # 스킵/유지 기록 (7일 쿨다운)
│   └── discover-results.json   # 일일 탐색 결과
├── README.md                   # 한국어 큐레이션 목록
└── README_EN.md                # 영어 큐레이션 목록
```

## 핵심 스크립트

### discover.mjs — 탐색 + 분석

| 단계 | 내용 |
|------|------|
| 검색 | GitHub Search API, 15개 쿼리 (SKILL.md, MCP, AI agent 등) |
| 필터 | Web3 키워드 점수 50+ (Web3 × 10 + Claude × 15, 최대 100) |
| 분석 | 상위 10개: README, 메타데이터, 신뢰도(0~5), Claude 호환성 |
| 등급 | `strong_add` / `add` / `neutral` / `skip` |
| 번역 | VPS API로 한국어 설명 생성 (skip 제외) |
| 건강 | 기존 레포 health check (archived, stale 6개월+, 404) |

**추천 등급 기준:**

| 등급 | 신뢰도 | Claude 호환 | 스타 |
|------|--------|------------|------|
| `strong_add` | 4+ | 직접 (MCP/SKILL) | 30+ |
| `add` | 3+ | 직접 | 15+ |
| `neutral` | 2+ | 간접 이상 | - |
| `skip` | 나머지 | - | - |

### telegram-webhook.mjs — VPS Express 서버

Telegram callback 처리 (add/skip/keep/remove), 한국어 설명 생성, 헬스 체크 엔드포인트 제공.

**한국어 설명 생성 흐름:**
1. `context` 있음 (discover.mjs): 프롬프트에 정보 포함 → ~5초
2. `context` 없음 (Telegram callback fallback): `--allowedTools WebFetch WebSearch` → ~14초
3. "추가" 버튼 클릭 시: 메시지에서 기존 설명 추출 (Claude Code 호출 안 함)

**중요 — Claude CLI systemd 실행 시:**
- `stdio: ['ignore', 'pipe', 'pipe']` 필수 (stdin pipe → hang)
- `spawn` 사용 (`execFile` 아님)

### generate-readme.mjs — README 생성

`repos.json` → `README.md` (한국어) + `README_EN.md` (영어) 자동 생성.
8개 섹션 순서 고정, 동적 스타 배지, 이중언어 설명.

## 데이터 구조

### repos.json (마스터)

```jsonc
{
  "metadata": { "lastUpdated": "...", "totalEntries": 50 },
  "sections": [{
    "id": "skills-security",        // 8개 섹션 ID
    "group": "claude-code-native",   // claude-code-native | compatible-tools
    "title": { "ko": "...", "en": "..." },
    "repos": [{
      "owner": "trailofbits",
      "repo": "skills",
      "type": "Official",            // Official | Community
      "addedDate": "2026-02-01",
      "description": { "ko": "...", "en": "..." },
      "status": "active",            // active | stale | flagged
      "health": { "stars": 123, "archived": false, "lastPush": "...", "exists": true }
    }]
  }]
}
```

**8개 섹션:**
- Claude Code Native: `skills-security`, `skills-protocol`, `skills-general`, `mcp-onchain-data`, `mcp-smart-contract`
- Compatible Tools: `dev-tools`, `ai-agents`, `learning`

## 환경 변수

### GitHub Actions

| 변수 | 소스 | 용도 |
|------|------|------|
| `GITHUB_TOKEN` | 자동 | GitHub API |
| `VPS_API_URL` | Secrets | VPS API 엔드포인트 |
| `VPS_API_SECRET` | Secrets | VPS API 인증 |
| `TELEGRAM_BOT_TOKEN` | Secrets | Telegram Bot API |
| `TELEGRAM_CHAT_ID` | Secrets | 관리자 DM |
| `TELEGRAM_CHANNEL_ID` | Secrets | 공개 채널 |

### VPS (.env)

| 변수 | 용도 |
|------|------|
| `TELEGRAM_BOT_TOKEN` | Bot API |
| `TELEGRAM_CHAT_ID` | 관리자 ID |
| `GITHUB_TOKEN` | workflow_dispatch 트리거 |
| `API_SECRET` | API 인증 |
| `PORT` | Express 포트 |

## npm 스크립트

```bash
npm run discover   # 신규 레포 탐색 (GitHub Actions에서 자동)
npm run notify     # Telegram 알림 전송
npm run generate   # repos.json → README 생성
npm run webhook    # VPS Express 서버 실행
npm run migrate    # 초기 마이그레이션 (일회성)
```

## 워크플로우 요약

1. **매일 18:00 KST** — `daily-discover.yml` 자동 실행
2. **탐색** — 15개 쿼리 → Web3 필터 → 상위 10개 심층 분석
3. **번역** — VPS Claude Code headless로 한국어 설명 생성
4. **알림** — Telegram 관리자 DM에 상세 평가 + 버튼
5. **승인** — 관리자가 "추가" 클릭 → 메시지에서 한국어 설명 추출
6. **업데이트** — `update-readme.yml` → repos.json 수정 → README 재생성 → 공개 채널 알림
