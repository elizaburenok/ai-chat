import React, { useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Chip } from '@components/Chip';
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
import styles from './SkillsList.module.css';

/** Avatar icons by priority: 1=Хорошо справляется, 2=Стоит поработать над этим, 3=Обратить внимание */
const PRIORITY_AVATARS: Record<SkillPriority, string> = {
  good: avatar1,
  attention: avatar2,
  not_evaluated: avatar3,
};

function SkillRowIcon({ priority }: { priority: SkillPriority }) {
  const src = PRIORITY_AVATARS[priority];
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
}

function sortSkillsByPriorityAndAlphabet(skills: SkillItem[]): SkillItem[] {
  const orderMap = Object.fromEntries(
    SKILL_PRIORITY_ORDER.map((p, i) => [p, i])
  ) as Record<string, number>;
  return [...skills].sort((a, b) => {
    const pa = orderMap[a.priority] ?? 999;
    const pb = orderMap[b.priority] ?? 999;
    if (pa !== pb) return pa - pb;
    return a.title.localeCompare(b.title, 'ru');
  });
}

function groupSkillsByTheme(
  skills: SkillItem[],
  themes: SkillTheme[]
): Map<string, SkillItem[]> {
  const map = new Map<string, SkillItem[]>();
  const themeIds = themes.filter((t) => t.id !== 'all').map((t) => t.id);
  for (const themeId of themeIds) {
    const themeSkills = skills.filter((s) => s.themeId === themeId);
    if (themeSkills.length > 0) {
      const theme = themes.find((t) => t.id === themeId)!;
      map.set(themeId, sortSkillsByPriorityAndAlphabet(themeSkills));
    }
  }
  return map;
}

export function SkillsList({ searchQuery = '' }: SkillsListProps) {
  const [selectedThemeId, setSelectedThemeId] = React.useState<string | null>(null);

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
    return groupSkillsByTheme(filtered, SKILL_THEMES);
  }, [selectedThemeId, searchQuery]);

  const handleThemeChipClick = useCallback((themeId: string) => {
    setSelectedThemeId((prev) => {
      if (themeId === 'all') return null;
      return prev === themeId ? null : themeId;
    });
  }, []);

  return (
    <div className={styles.root} data-testid="skills-list">
      <h2 className={styles.sectionHeader}>Все темы</h2>

      <div className={styles.chipCarouselWrapper}>
        <div className={styles.chipCarousel} role="group" aria-label="Фильтр по темам">
          {SKILL_THEMES.map((theme) => (
            <Chip
              key={theme.id}
              variant="chip"
              label={theme.label}
              selected={
                (theme.id === 'all' && selectedThemeId === null) ||
                selectedThemeId === theme.id
              }
              onClick={() => handleThemeChipClick(theme.id)}
            />
          ))}
        </div>
      </div>

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
                {skills.map((skill) => (
                  <Link
                    key={skill.id}
                    to={`/dialog/${skill.id}`}
                    className={styles.skillLink}
                    data-testid={`skill-${skill.id}`}
                  >
                    <Cell
                      size="L"
                      icon={<SkillRowIcon priority={skill.priority} />}
                      label={SKILL_PRIORITY_LABELS[skill.priority]}
                    >
                      {skill.title}
                    </Cell>
                  </Link>
                ))}
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
