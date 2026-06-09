# CNYAN / ChallengeCAT

**CNYAN** is a Solana-based community challenge concept by **ChallengeCAT**.  
It connects missions, proof submissions, map-based bounties, and token rewards into one playful demo experience.

> This repository is written for the project brand only. It intentionally avoids personal names, operator identity, private contact details, or individual attribution.

## Contract Address

```text
Ayfr5kqa2VsXzo8D2CB59pUaLCeG5GnVHod4ixutpump
```

- Network: Solana
- Type: SPL-style token / pump.fun-launched mint
- Symbol: CNYAN
- Project: ChallengeCAT
- Verification: Always verify the mint address directly on Solana explorers before trading or integrating.

Useful explorer links:

- Solscan: `https://solscan.io/token/Ayfr5kqa2VsXzo8D2CB59pUaLCeG5GnVHod4ixutpump`
- Dexscreener: `https://dexscreener.com/solana/Ayfr5kqa2VsXzo8D2CB59pUaLCeG5GnVHod4ixutpump`
- pump.fun style CA suffix: `pump`

## What This Repository Contains

```text
.
├── src/                  # React demo application
├── public/               # CNYAN visual assets
├── docs/                 # Multilingual project documentation
├── metadata/             # Token metadata draft for Solana-style integrations
├── .github/profile/      # GitHub organization profile README draft
├── PROMPTS.md            # Production prompts for visuals, UI, copy, and animation
└── README.md             # Main repository overview
```

## Product Direction

CNYAN is designed as a community reward layer:

- Create a challenge.
- Submit proof.
- Review the result.
- Reward contributors with CNYAN or SOL.

The current demo includes:

- A CNYAN introduction site.
- A Challenge bounty map.
- A Perplex-style answer demo using Odyssey Network context.
- An Odyssey route challenge demo.
- PerpSquad-inspired motion translated into original CNYAN assets: loading splash, floating coins, split-letter headlines, animated panels, and map pins.

## Solana Token Elements

This repository includes common Solana token project elements:

- Mint / CA field.
- Token symbol and display name.
- Off-chain metadata draft.
- Explorer link templates.
- SPL Token and Metaplex Token Metadata references.
- Clear risk notice and no-personal-identity project language.

Solana notes:

- Solana tokens are identified by a mint account address.
- Standard SPL Tokens can use Metaplex Token Metadata for name, symbol, image, and off-chain JSON metadata.
- Wallets and explorers may depend on accessible metadata URIs to display token details.

References:

- Solana token docs: https://solana.com/docs/tokens
- Solana Metaplex metadata docs: https://solana.com/docs/tokens/metaplex
- Metaplex Token Metadata: https://www.metaplex.com/docs/token-metadata

## Local Development

```bash
npm install
npm run dev
npm run build
```

Default local URL:

```text
http://127.0.0.1:5174/
```

Routes:

- `/` - CNYAN introduction site
- `/#challenge` - Challenge bounty map
- `/#perplex` - Perplex-style Odyssey answer demo
- `/#odyssey` - Odyssey route challenge demo

## Privacy & Identity Policy

This repository should never include:

- Personal names.
- Private wallet ownership claims.
- Personal social media accounts.
- Private email addresses.
- Location, identity, or operator details.

Recommended wording:

- Use `ChallengeCAT`, `CNYAN`, `the project`, or `the community`.
- Avoid founder-centric or operator-centric copy.
- Keep claims focused on the token, demo, and product concept.

## Risk Notice

CNYAN is a crypto token concept and demo repository. Nothing here is financial advice, a guarantee of liquidity, a promise of returns, or an investment recommendation. Always verify the CA and review market risk independently.

---

## 日本語

**CNYAN** は、ChallengeCAT による Solana ベースのコミュニティチャレンジ構想です。  
ミッション、Proof提出、マップ型バウンティ、CNYAN/SOL報酬をひとつの体験として見せるためのデモリポジトリです。

### CA

```text
Ayfr5kqa2VsXzo8D2CB59pUaLCeG5GnVHod4ixutpump
```

このリポジトリでは、個人名、運営者の身元、私的な連絡先、個人ウォレット所有の断定を出さない方針です。主語は `CNYAN`、`ChallengeCAT`、`プロジェクト`、`コミュニティ` に統一します。

### 内容

- CNYAN紹介サイト
- Challengeバウンティマップ
- Odyssey Networkを使ったPerplex風デモ
- Odysseyルートチャレンジデモ
- Solanaトークン情報
- Token metadata draft
- 多言語ドキュメント
- 制作用プロンプト集

### 注意

このリポジトリは投資助言ではありません。CAは必ずSolanaエクスプローラーで確認してください。

---

## 中文

**CNYAN** 是 ChallengeCAT 的 Solana 社区挑战概念项目。  
它将任务、Proof 提交、地图赏金、CNYAN/SOL 奖励连接成一个可体验的演示项目。

### 合约地址 / Mint 地址

```text
Ayfr5kqa2VsXzo8D2CB59pUaLCeG5GnVHod4ixutpump
```

本仓库只使用项目品牌表达，不包含个人姓名、运营者身份、私人联系方式或个人钱包归属声明。

### 仓库内容

- CNYAN 介绍网站
- Challenge 赏金地图
- 基于 Odyssey Network 的 Perplex 风格演示
- Odyssey 路线挑战演示
- Solana Token 信息
- Token metadata 草案
- 多语言文档
- 视觉和文案生成提示词

### 风险提示

本项目不是投资建议。请始终在 Solana 浏览器中核对 CA，并自行判断风险。

---

## 한국어

**CNYAN**은 ChallengeCAT의 Solana 기반 커뮤니티 챌린지 콘셉트입니다.  
미션, Proof 제출, 지도형 바운티, CNYAN/SOL 보상을 하나의 데모 경험으로 연결합니다.

### CA / Mint Address

```text
Ayfr5kqa2VsXzo8D2CB59pUaLCeG5GnVHod4ixutpump
```

이 저장소는 프로젝트 브랜드 중심으로 작성되며 개인 이름, 운영자 신원, 개인 연락처, 개인 지갑 소유 주장 등을 포함하지 않습니다.

### 포함 내용

- CNYAN 소개 사이트
- Challenge 바운티 맵
- Odyssey Network 기반 Perplex 스타일 데모
- Odyssey 루트 챌린지 데모
- Solana 토큰 정보
- Token metadata draft
- 다국어 문서
- 제작용 프롬프트 모음

### 주의

이 저장소는 투자 조언이 아닙니다. CA는 반드시 Solana explorer에서 직접 확인하세요.
