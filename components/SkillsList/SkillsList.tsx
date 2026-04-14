import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Cell } from '@components/Cell';
import {
  homeSkills,
  SKILL_THEMES,
  SKILL_PRIORITY_ORDER,
  SKILL_PRIORITY_LABELS,
  type SkillItem,
  type SkillTheme,
  type SkillPriority,
} from '@/data/homeSkills';
import avatar1 from '@avatar-icons/1.png';
import avatar2 from '@avatar-icons/2.png';
import avatar3 from '@avatar-icons/3.png';
import notAssessedAvatar from '@avatar-icons/notassesed.svg';
import { useTrainingSession } from '@/session';
import type { SkillSessionMap } from '@/session/trainingSessionTypes';
import styles from './SkillsList.module.css';

/** Avatar icons by priority: 1=Хорошо справляется, 2=Стоит поработать над этим, 3=Обратить внимание */
const PRIORITY_AVATARS: Record<SkillPriority, string> = {
  good: avatar1,
  attention: avatar2,
  not_evaluated: avatar3,
};

function SkillRowIcon({
  priority,
  sessionNotAssessed,
}: {
  priority: SkillPriority;
  /** When true, use not-assessed SVG regardless of catalog priority */
  sessionNotAssessed: boolean;
}) {
  const src = sessionNotAssessed ? notAssessedAvatar : PRIORITY_AVATARS[priority];
  return (
    <img
      src={src}
      alt=""
      width={44}
      height={44}
      className={styles.skillIcon}
      aria-hidden
    />
  );
}

export interface SkillsListProps {
  /** Search query to filter skills by title */
  searchQuery?: string;
  /** Active theme filter from chips (null = all) */
  selectedThemeId: string | null;
  /**
   * When true, training session completion is ignored: every skill uses catalog priority
   * and not-assessed styling (home page default — «не освоено» / not yet evaluated).
   */
  ignoreSessionAssessment?: boolean;
}

function effectiveSkillPriority(
  skill: SkillItem,
  session: SkillSessionMap,
  ignoreSessionAssessment: boolean
): SkillPriority {
  if (ignoreSessionAssessment) return skill.priority;
  const entry = session[skill.id];
  if (entry?.status === 'assessed') return 'good';
  return skill.priority;
}

function sortSkillsByPriorityAndAlphabet(
  skills: SkillItem[],
  session: SkillSessionMap,
  ignoreSessionAssessment: boolean
): SkillItem[] {
  const orderMap = Object.fromEntries(
    SKILL_PRIORITY_ORDER.map((p, i) => [p, i])
  ) as Record<string, number>;
  return [...skills].sort((a, b) => {
    const pa =
      orderMap[effectiveSkillPriority(a, session, ignoreSessionAssessment)] ?? 999;
    const pb =
      orderMap[effectiveSkillPriority(b, session, ignoreSessionAssessment)] ?? 999;
    if (pa !== pb) return pa - pb;
    return a.title.localeCompare(b.title, 'ru');
  });
}

function groupSkillsByTheme(
  skills: SkillItem[],
  themes: SkillTheme[],
  session: SkillSessionMap,
  ignoreSessionAssessment: boolean
): Map<string, SkillItem[]> {
  const map = new Map<string, SkillItem[]>();
  const themeIds = themes.filter((t) => t.id !== 'all').map((t) => t.id);
  for (const themeId of themeIds) {
    const themeSkills = skills.filter((s) => s.themeId === themeId);
    if (themeSkills.length > 0) {
      const theme = themes.find((t) => t.id === themeId)!;
      map.set(
        themeId,
        sortSkillsByPriorityAndAlphabet(themeSkills, session, ignoreSessionAssessment)
      );
    }
  }
  return map;
}

export function SkillsList({
  searchQuery = '',
  selectedThemeId,
  ignoreSessionAssessment = false,
}: SkillsListProps) {
  const { skills: sessionSkills } = useTrainingSession();

  const filteredAndGrouped = useMemo(() => {
    let filtered = homeSkills;
    if (selectedThemeId) {
      filtered = filtered.filter((s) => s.themeId === selectedThemeId);
    }
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      filtered = filtered.filter((s) =>
        s.title.toLowerCase().includes(q) ||
        (SKILL_THEMES.find((t) => t.id === s.themeId)?.label ?? '').toLowerCase().includes(q)
      );
    }
    return groupSkillsByTheme(
      filtered,
      SKILL_THEMES,
      sessionSkills,
      ignoreSessionAssessment
    );
  }, [selectedThemeId, searchQuery, sessionSkills, ignoreSessionAssessment]);

  return (
    <div className={styles.root} data-testid="skills-list">
      <div className={styles.groups}>
        {Array.from(filteredAndGrouped.entries()).map(([themeId, skills]) => {
          const theme = SKILL_THEMES.find((t) => t.id === themeId)!;
          return (
            <section
              key={themeId}
              className={styles.group}
              aria-labelledby={`group-${themeId}`}
              data-testid={`skill-group-${themeId}`}
            >
              <h3 id={`group-${themeId}`} className={styles.groupTitle}>
                {theme.label}
              </h3>
              <div className={styles.skillsList}>
                {skills.map((skill) => {
                  const entry = sessionSkills[skill.id];
                  const sessionNotAssessed =
                    ignoreSessionAssessment || !entry || entry.status === 'not_assessed';
                  /** After a finished dialog (results), show catalog «Хорошо справляется» + avatar 1.png */
                  const displayPriority: SkillPriority = sessionNotAssessed
                    ? skill.priority
                    : 'good';
                  return (
                    <Link
                      key={skill.id}
                      to={`/dialog/${skill.id}`}
                      className={styles.skillLink}
                      data-testid={`skill-${skill.id}`}
                    >
                      <Cell
                        size="L"
                        icon={
                          <SkillRowIcon
                            priority={displayPriority}
                            sessionNotAssessed={sessionNotAssessed}
                          />
                        }
                        label={SKILL_PRIORITY_LABELS[displayPriority]}
                      >
                        {skill.title}
                      </Cell>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {filteredAndGrouped.size === 0 && (
        <p className={styles.emptyState} data-testid="skills-empty">
          Ничего не найдено. Попробуйте изменить фильтр.
        </p>
      )}
    </div>
  );
}
