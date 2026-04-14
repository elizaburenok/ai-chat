/**
 * Session skill state — see session-model.md at repo root.
 */

export type SkillSessionStatus = 'not_assessed' | 'assessed';

export interface SkillSessionEntry {
  skillId: string;
  status: SkillSessionStatus;
  score: number | null;
  /** Unix timestamp in milliseconds */
  completedAt: number | null;
}

export type SkillSessionMap = Record<string, SkillSessionEntry>;
