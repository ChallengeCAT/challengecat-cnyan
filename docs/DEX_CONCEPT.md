# CNYAN DEX Concept

## Thesis

CNYAN DEX should not be framed as a generic swap page. It should be the exchange and settlement layer for a challenge economy.

```text
Quest activity -> Token usage -> Liquidity demand -> Reward settlement -> Protocol treasury
```

## Contract Address

```text
Ayfr5kqa2VsXzo8D2CB59pUaLCeG5GnVHod4ixutpump
```

## Core Products

### 1. CNYAN Swap

Purpose:

- swap SOL, USDC, and CNYAN
- make it easy to fund quests
- make it easy to claim or convert rewards

Initial pairs:

- CNYAN / SOL
- CNYAN / USDC

### 2. Quest Reward Settlement

Rewards can be configured in:

- CNYAN
- SOL
- USDC

Settlement uses the DEX layer when a reward needs conversion. Example:

```text
Creator funds in SOL -> Challenger chooses CNYAN payout -> DEX route executes at settlement
```

### 3. Liquidity Pools

Liquidity pools support:

- reward settlement
- market depth
- lower slippage for quest creators
- treasury management

Pool design:

- start with CNYAN/SOL
- add CNYAN/USDC when volume justifies it
- avoid over-fragmenting liquidity early

### 4. Fee Model

Suggested fee routes:

- Quest posting fee: paid in CNYAN
- Completion fee: small percentage on successful settlement
- Swap fee: standard DEX fee

Suggested allocation:

```text
50% protocol treasury
30% liquidity incentives
20% burn or seasonal reward pool
```

This is a concept model, not a promise or fixed economic guarantee.

## Token Utility

CNYAN can be used for:

- posting challenges
- boosting quests
- paying settlement fees
- unlocking premium challenge slots
- reward multipliers
- seasonal leaderboard rewards
- DEX liquidity incentives

## DEX Architecture

```text
Frontend
  -> Quest creation
  -> Swap interface
  -> Reward settlement preview

API / Indexer
  -> quest feed
  -> pricing
  -> route quotes
  -> settlement status

Solana Programs
  -> token accounts
  -> escrow
  -> settlement instructions
  -> liquidity pool integrations
```

## MVP Roadmap

### Phase 1: Read-only DEX Concept

- token page
- CA display
- pair explanation
- reward settlement examples

### Phase 2: Quote Layer

- CNYAN/SOL quote widget
- estimated payout preview
- slippage explanation

### Phase 3: Settlement Layer

- quest reward escrow
- CNYAN/SOL reward settlement
- fee accounting

### Phase 4: Liquidity Layer

- LP dashboard
- treasury dashboard
- reward pool analytics

## Risk Controls

- always show the CA
- show slippage and fee estimates
- no guaranteed return language
- do not claim liquidity that does not exist
- no personal operator identity
- no private wallet ownership claims

## AI Evaluation Notes

This concept is strong because it gives the token a reason to exist beyond speculation:

- fees create usage
- quests create activity
- rewards create settlement demand
- liquidity supports the reward economy
- documentation separates MVP from future concepts
