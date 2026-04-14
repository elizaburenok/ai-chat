# Training session model (in-memory)

This document defines the session state used for per-skill tracking in the training simulator. It is **not** persisted: no database, tables, or browser storage for these entries.

## Mapping to the skill catalog

- **`skillId`** is the same string as **`SkillItem.id`** in [`src/data/homeSkills.ts`](src/data/homeSkills.ts) (`homeSkills`).

## Types

### `SkillSessionStatus`

```ts
type SkillSessionStatus = 'not_assessed' | 'assessed';
```

### `SkillSessionEntry`

Per skill within one browser session:

| Field         | Type                 | Meaning |
|---------------|----------------------|---------|
| `skillId`     | `string`             | Matches `SkillItem.id` from `homeSkills`. |
| `status`      | `SkillSessionStatus` | Whether this skill has been assessed in the current session. |
| `score`       | `number \| null`     | Result score when assessed; `null` until assessed. |
| `completedAt` | `number \| null`     | Unix timestamp in **milliseconds** (`Date.now()`); `null` until assessed. |

### Session aggregate

```ts
type SkillSessionMap = Record<string, SkillSessionEntry>;
```

Keyed by `skillId` for O(1) lookup. Display order still comes from iterating `homeSkills`.

**Note:** UI elsewhere uses `SkillPriority` (`not_evaluated` | `attention` | `good`) for labels and avatars. Session `status` describes **assessment completion in this session**, not that priority bucket.

## Initialization

When a new session starts (provider mounts, e.g. on app load):

- For **every** skill in `homeSkills`, ensure one entry:
  - `status: 'not_assessed'`
  - `score: null`
  - `completedAt: null`

## Completion transition

When the user completes a skill assessment (e.g. lands on results with a score):

- Set `status` to `'assessed'`.
- Set `score` to the numeric result.
- Set `completedAt` to the current time in milliseconds.

Completing the **same** skill again in the same session **overwrites** `score` and `completedAt` (last result wins).

## Lifecycle

- State lives **in memory** inside the React tree (e.g. context).
- A **full page reload** discards the session and re-initializes from `homeSkills`.
- No `localStorage`, `sessionStorage`, IndexedDB, or server persistence for this map.
