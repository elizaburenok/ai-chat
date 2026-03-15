/**
 * Type for a completed (passed) dialog session.
 * Displayed in the right sidebar widget (last 3).
 */
import type { SkillPriority } from './homeSkills';

export interface PassedDialog {
  id: string;
  skillTitle: string;
  completedAt: string;
  /** Performance/score bucket used to pick avatar icon in history widget */
  priority?: SkillPriority;
}
