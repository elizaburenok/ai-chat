import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainNavBar } from '@components/MainNavBar';
import { NavigationBar } from '@components/NavigationBar';
import { Widget } from '@components/Widget';
import { SkillsList } from '@components/SkillsList';
import { SearchInput } from '@components/SearchInput';
import { Recommendations } from '@components/Recommendations';
import { Button } from '@components/Button';
import { Cell } from '@components/Cell';
import type { PassedDialog } from '@/data/passedDialogs';
import { SKILL_PRIORITY_LABELS, type SkillPriority } from '@/data/homeSkills';
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
  /** Last 3 passed dialogs; empty array for new user */
  passedDialogs?: PassedDialog[];
}

export function HomePage({ passedDialogs = [] }: HomePageProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const lastThree = passedDialogs.slice(0, 3);

  const handleHistoryClick = () => {
    navigate('/history');
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <main className={styles.root} data-testid="home-page">
      <MainNavBar
        activeNavId="home"
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
          <div className={styles.searchWrapper}>
            <SearchInput
              placeholder="Поиск по темам"
              variant="filled"
              size="s"
              value={searchQuery}
              onValueChange={setSearchQuery}
              showClearButton
              data-testid="home-search"
            />
          </div>
          <Recommendations />
          <SkillsList searchQuery={searchQuery} />
        </section>

        <aside className={styles.rightColumn}>
          <Widget
            title="Последние диалоги"
            className={styles.widget}
            footerAction={
              lastThree.length > 0 ? (
                <Button type="Transparent" onClick={handleHistoryClick}>
                  Показать все
                </Button>
              ) : undefined
            }
          >
            {lastThree.length > 0 ? (
              <div className={styles.passedList}>
                {lastThree.map((d) => (
                  <div key={d.id} className={styles.passedItem}>
                    <Cell
                      size="M"
                      variant="default"
                      label={d.priority ? SKILL_PRIORITY_LABELS[d.priority] : undefined}
                      icon={<HistoryRowIcon priority={d.priority} />}
                      className={styles.passedItemCell}
                    >
                      {d.skillTitle}
                    </Cell>
                  </div>
                ))}
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
