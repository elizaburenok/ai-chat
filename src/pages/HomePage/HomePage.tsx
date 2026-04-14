import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainNavBar } from '@components/MainNavBar';
import { NavigationBar } from '@components/NavigationBar';
import { Widget } from '@components/Widget';
import { SkillsList } from '@components/SkillsList';
import { Chip } from '@components/Chip';
import { SearchInput } from '@components/SearchInput';
import { Button } from '@components/Button';
import { Cell } from '@components/Cell';
import { passedDialogsFromSession, type PassedDialog } from '@/data/passedDialogs';
import { SKILL_PRIORITY_LABELS, SKILL_THEMES, type SkillPriority } from '@/data/homeSkills';
import { useTrainingSession } from '@/session';
import avatar1 from '@avatar-icons/1.png';
import avatar2 from '@avatar-icons/2.png';
import avatar3 from '@avatar-icons/3.png';
import styles from './HomePage.module.css';

/** Document list icon for empty state (Figma Stroked 2px/Document List) */
const DocumentListIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const PRIORITY_AVATARS: Record<SkillPriority, string> = {
  good: avatar1,
  attention: avatar2,
  not_evaluated: avatar3,
};

function HistoryRowIcon({ priority }: { priority?: SkillPriority }) {
  const src = priority ? PRIORITY_AVATARS[priority] : avatar3;
  return (
    <img
      src={src}
      alt=""
      width={34}
      height={34}
      className={styles.historyIcon}
      aria-hidden
    />
  );
}

export interface HomePageProps {
  /** Override list for tests; default is built from training session (scores + completion times). */
  passedDialogs?: PassedDialog[];
}

export function HomePage({ passedDialogs: passedDialogsProp }: HomePageProps) {
  const navigate = useNavigate();
  const { skills } = useTrainingSession();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);

  const fromSession = useMemo(() => passedDialogsFromSession(skills), [skills]);
  const passedDialogs = passedDialogsProp ?? fromSession;
  const lastThree = passedDialogs.slice(0, 3);

  const handleThemeChipClick = useCallback((themeId: string) => {
    setSelectedThemeId((prev) => {
      if (themeId === 'all') return null;
      return prev === themeId ? null : themeId;
    });
  }, []);

  const handleHistoryClick = () => {
    navigate('/history');
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleMainNav = useCallback(
    (id: string) => {
      if (id === 'services') {
        navigate('/');
      }
    },
    [navigate]
  );

  return (
    <main className={styles.root} data-testid="home-page">
      <MainNavBar
        activeNavId="home"
        onNavClick={handleMainNav}
        onSettingsClick={() => {}}
      />

      <div className={styles.body}>
        <aside className={styles.leftColumn}>
          <NavigationBar
            hasBackButton
            hasTextBlock
            title="Тренажёр"
            onBackClick={handleBackClick}
          />
        </aside>

        <section className={styles.centerColumn} aria-label="Навыки для выбора">
          <div className={styles.searchBlock}>
            <div className={styles.searchWrapper}>
              <SearchInput
                placeholder="Поиск по навыкам"
                variant="filled"
                size="s"
                value={searchQuery}
                onValueChange={setSearchQuery}
                showClearButton
                data-testid="home-search"
              />
            </div>
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
          </div>
          <SkillsList searchQuery={searchQuery} selectedThemeId={selectedThemeId} />
        </section>

        <aside className={styles.rightColumn}>
          <Widget
            title="Последние диалоги"
            className={styles.widget}
            footerAction={
              lastThree.length > 0 ? (
                <Button type="Transparent" onClick={handleHistoryClick}>
                  Посмотреть всё
                </Button>
              ) : undefined
            }
          >
            {lastThree.length > 0 ? (
              <div className={styles.passedList}>
                {lastThree.map((d) => {
                  const historyLabel =
                    d.priority != null ? SKILL_PRIORITY_LABELS[d.priority] : undefined;
                  return (
                    <div key={d.id} className={styles.passedItem}>
                      <Cell
                        size="M"
                        variant="default"
                        label={historyLabel}
                        icon={<HistoryRowIcon priority={d.priority} />}
                        className={styles.passedItemCell}
                      >
                        {d.skillTitle}
                      </Cell>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <DocumentListIcon className={styles.emptyStateIcon} />
                <div className={styles.emptyStateText}>
                  <p className={styles.emptyStateTitle}>Диалоги пока не пройдены</p>
                  <p className={styles.emptyStateSubtitle}>Здесь появятся пройденные темы</p>
                </div>
              </div>
            )}
          </Widget>
        </aside>
      </div>
    </main>
  );
}
