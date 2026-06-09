# CNYAN Quest Protocol

This document adapts social challenge protocol patterns into an original CNYAN design. It does not copy code, text, or brand assets from any referenced repository.

## Core Loop

```text
Post Quest -> Claim Quest -> Submit Proof -> Verify -> Settle Reward
```

## Why It Matters

CNYAN needs more than a static token page. A strong repository should explain how token demand, user activity, proof, and settlement connect. The Quest Protocol gives CNYAN a clear utility loop:

- creators post challenges with CNYAN fees
- participants claim missions and submit proof
- AI or community review verifies completion
- approved contributors receive CNYAN, SOL, or approved reward tokens

## Roles

| Role | Description |
| --- | --- |
| Quest Creator | Posts a challenge and funds the reward. |
| Challenger | Claims a quest and submits proof. |
| Verifier | AI, creator review, or community review layer. |
| Treasury | Receives protocol fees for operations and liquidity. |

## Quest Lifecycle

### 1. Post Quest

Required fields:

- description
- reward amount
- reward token: CNYAN, SOL, or USDC
- quest type: open or direct
- proof requirement
- deadline

Protocol effects:

- reward is reserved for settlement
- CNYAN posting fee is charged
- quest is indexed for feed, map, and profile views

### 2. Claim Quest

Claim rules:

- cannot claim your own quest
- active claim count is limited
- claim deposit may be required to reduce spam
- proof deadline starts at claim time

### 3. Submit Proof

Proof may include:

- video
- image
- post URL
- route check-in
- translation or written output
- route node completion

Only hashes and status should be stored on-chain in an MVP. Large media should stay off-chain.

### 4. Verify

Verification layers:

1. automated AI review
2. creator review when confidence is unclear
3. community vote for disputes

Suggested AI result:

```json
{
  "decision": "APPROVE | REJECT | REVIEW",
  "confidence": 0,
  "reasoning": "short explanation",
  "proof_matches_task": true,
  "safety_flags": []
}
```

### 5. Settle Reward

Settlement outcomes:

- approved: reward paid to challenger, deposit returned
- rejected: reward remains with creator or returns by rule
- abandoned: deposit can be redirected according to the quest terms
- expired: quest can be closed by a permissionless timeout action

## Abuse Controls

- posting fee
- claim deposit
- max active claims
- proof deadline
- moderation before quest creation
- proof safety review
- suspicious account flags
- creator/challenger repeat-pattern detection

## On-chain / Off-chain Boundary

On-chain:

- quest id
- creator
- reward token
- escrow state
- claim state
- proof hash
- settlement status

Off-chain:

- media files
- AI verification
- notifications
- feed ranking
- moderation logs
- human review UI

## MVP Scope

Build first:

- open quests
- direct quests
- CNYAN/SOL rewards
- proof hash
- AI review stub
- creator review fallback
- basic escrow model

Delay:

- guild quests
- complex chains
- XP seasons
- DAO governance
- fully decentralized oracle network
