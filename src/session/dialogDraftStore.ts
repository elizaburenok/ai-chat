/**
 * Client-side draft sessions for in-progress dialogs (simulates draft before DB commit).
 * Scores are applied only after explicit completion — see resultsCommit.ts.
 */

export type DialogDraftStatus = 'in_progress';

export interface DialogDraftState {
  status: DialogDraftStatus;
  messages: Array<{ role: 'client' | 'user'; text: string }>;
  isOnboardingVisible: boolean;
  updatedAt: number;
  version: 1;
}

const DRAFT_KEY = (skillId: string) => `ai-trainer:dialog-draft:${skillId}`;

export function readDraft(skillId: string): DialogDraftState | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY(skillId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DialogDraftState;
    if (parsed?.status !== 'in_progress' || parsed.version !== 1) return null;
    if (!Array.isArray(parsed.messages)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeDraft(skillId: string, draft: Omit<DialogDraftState, 'updatedAt' | 'version'>): void {
  const full: DialogDraftState = {
    ...draft,
    status: 'in_progress',
    updatedAt: Date.now(),
    version: 1,
  };
  try {
    localStorage.setItem(DRAFT_KEY(skillId), JSON.stringify(full));
  } catch {
    // ignore quota / private mode
  }
}

export function clearDraft(skillId: string): void {
  try {
    localStorage.removeItem(DRAFT_KEY(skillId));
  } catch {
    // ignore
  }
}

/** Raw storage flag — draft row exists (includes brand-new visit before any interaction). */
export function hasInProgressDraft(skillId: string): boolean {
  return readDraft(skillId)?.status === 'in_progress';
}

/**
 * Show incomplete-dialog recovery: user left mid-dialog (tab/window) and there is something to resume.
 * Ignores the auto-saved empty state right after opening a skill (no messages, still on onboarding).
 */
export function hasRecoverableDialogDraft(skillId: string): boolean {
  const draft = readDraft(skillId);
  if (!draft || draft.status !== 'in_progress') return false;
  if (draft.messages.length > 0) return true;
  if (!draft.isOnboardingVisible) return true;
  return false;
}
