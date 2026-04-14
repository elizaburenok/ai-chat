import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { homeSkills } from '@/data/homeSkills';
import type { SkillSessionEntry, SkillSessionMap } from './trainingSessionTypes';

function buildInitialSkillMap(): SkillSessionMap {
  const map: SkillSessionMap = {};
  for (const skill of homeSkills) {
    map[skill.id] = {
      skillId: skill.id,
      status: 'not_assessed',
      score: null,
      completedAt: null,
    };
  }
  return map;
}

export interface TrainingSessionContextValue {
  /** Per-skill completion in this tab; each skill starts as not completed (`not_assessed`). */
  skills: SkillSessionMap;
  completeSkill: (skillId: string, score: number) => void;
}

const TrainingSessionContext = createContext<TrainingSessionContextValue | null>(null);

export function TrainingSessionProvider({ children }: { children: React.ReactNode }) {
  const [skills, setSkills] = useState<SkillSessionMap>(buildInitialSkillMap);

  const completeSkill = useCallback((skillId: string, score: number) => {
    const now = Date.now();
    setSkills((prev) => {
      const existing: SkillSessionEntry = prev[skillId] ?? {
        skillId,
        status: 'not_assessed',
        score: null,
        completedAt: null,
      };
      return {
        ...prev,
        [skillId]: {
          ...existing,
          skillId,
          status: 'assessed',
          score,
          completedAt: now,
        },
      };
    });
  }, []);

  const value = useMemo(
    () => ({ skills, completeSkill }),
    [skills, completeSkill]
  );

  return (
    <TrainingSessionContext.Provider value={value}>{children}</TrainingSessionContext.Provider>
  );
}

export function useTrainingSession(): TrainingSessionContextValue {
  const ctx = useContext(TrainingSessionContext);
  if (!ctx) {
    throw new Error('useTrainingSession must be used within TrainingSessionProvider');
  }
  return ctx;
}
