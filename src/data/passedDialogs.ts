/**
 * Type for a completed (passed) dialog session.
 * Displayed in the right sidebar widget (last 3).
 */
import { homeSkills, type SkillPriority } from './homeSkills';
import type { SkillSessionMap } from '@/session/trainingSessionTypes';

export interface PassedDialog {
  id: string;
  skillTitle: string;
  completedAt: string;
  /** Result 0–100 from the training session */
  score?: number;
  /** Bucket for avatar icon and grade label */
  priority?: SkillPriority;
}

/** Map numeric result to the same priority bands as the skills catalog (avatars + labels). */
export function scoreToPriority(score: number): SkillPriority {
  if (score >= 70) return 'good';
  if (score >= 40) return 'attention';
  return 'attention';
}

/** All assessed skills from the session, newest first (for history / full history later). */
export function passedDialogsFromSession(session: SkillSessionMap): PassedDialog[] {
  const rows: PassedDialog[] = [];
  for (const skill of homeSkills) {
    const entry = session[skill.id];
    if (entry?.status !== 'assessed' || entry.score == null || entry.completedAt == null) {
      continue;
    }
    const priority = scoreToPriority(entry.score);
    rows.push({
      id: `${skill.id}-${entry.completedAt}`,
      skillTitle: skill.title,
      completedAt: new Date(entry.completedAt).toISOString(),
      score: entry.score,
      priority,
    });
  }
  return rows.sort(
    (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
  );
}
