import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { MainNavBar } from '@components/MainNavBar';
import { NavigationBar } from '@components/NavigationBar';
import { Cell } from '@components/Cell';
import { AverageResultWidget } from '@components/AverageResultWidget';
import { SkillProgressResultsWidget } from '@components/SkillProgressResultsWidget';
import { CriteriaAccordion } from '@components/CriteriaAccordion';
import { ResultsRecommendations } from '@components/ResultsRecommendations';
import {
  DEFAULT_CRITERIA,
  DEFAULT_RECOMMENDATIONS,
  type CriterionItem,
  type ResultsRecommendation,
} from '@/data/resultsCriteria';
import { useTrainingSession } from '@/session';
import { homeSkills } from '@/data/homeSkills';
import summaryAvatarUrl from '@avatar-icons/1.png';
import styles from './ResultsPage.module.css';

/** Redo/Arrow rotation right icon for repeat button */
const RedoIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path
      d="M1 4v6h6M23 20v-6h-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export interface ResultsPageProps {
  /** Score percentage (0–100) */
  score?: number;
  /** Short grade label (e.g. "Хорошо справляется") */
  gradeLabel?: string;
  /** Full analysis text */
  analysisText?: string;
  /** Criteria for accordion (with title, status, and description) */
  criteria?: CriterionItem[];
  /** Improvement recommendations */
  recommendations?: ResultsRecommendation[];
}

const DEFAULT_ANALYSIS =
  'Ты хорошо знаешь продукт и умеешь давать развёрнутые, логичные ответы по большинству вопросов. Ты профессионален и вежлив, стремишься помочь клиенту. Однако необходимо уделять больше внимания полноте информации, не пропускать вопросы, а также соблюдать стандарты приветствия и обращения по имени. Текст стоит структурировать, избегать плотных блоков и использовать русские кавычки.';

export function ResultsPage({
  score = 88,
  gradeLabel = 'Хорошо справляется',
  analysisText = DEFAULT_ANALYSIS,
  criteria = DEFAULT_CRITERIA,
  recommendations = DEFAULT_RECOMMENDATIONS,
}: ResultsPageProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { skillId } = useParams<{ skillId: string }>();
  const { completeSkill } = useTrainingSession();
  const currentSkillTitle =
    (skillId && homeSkills.find((s) => s.id === skillId)?.title) ?? 'Тариф';

  useEffect(() => {
    if (!skillId) return;
    const state = location.state as { commitTraining?: boolean } | null;
    if (state?.commitTraining !== true) return;
    completeSkill(skillId, score);
  }, [skillId, score, completeSkill, location.state]);

  const handleBackToHome = () => {
    navigate('/home');
  };

  const handleRepeat = () => {
    if (skillId) {
      navigate(`/dialog/${skillId}`);
    } else {
      navigate('/home');
    }
  };

  const handleViewDialog = () => {
    if (skillId) {
      navigate(`/dialog/${skillId}`);
    }
  };

  return (
    <main className={styles.root} data-testid="results-page">
      <MainNavBar activeNavId="home" onSettingsClick={() => {}} />

      <div className={styles.body}>
        <aside className={styles.leftColumn} aria-label="Навигация">
          <NavigationBar
            hasBackButton
            onBackClick={handleBackToHome}
            backButtonAriaLabel="На главную тренажёра"
          />
        </aside>

        <section className={styles.centerColumn} aria-label="Результаты диалога">
          <header className={styles.header}>
            <h1 className={styles.pageTitle}>Диалог завершён</h1>
            <div className={styles.headerButtons}>
              <button type="button" className={styles.repeatButton} onClick={handleRepeat}>
                <RedoIcon />
                Повторить
              </button>
            </div>
          </header>

          <div className={styles.summary} role="region" aria-label="Итоговая оценка">
            <Cell
              size="M"
              variant="default"
              label="Результат"
              className={styles.summaryCell}
              icon={
                <span className={styles.summaryAvatar} aria-hidden>
                  <img src={summaryAvatarUrl} alt="" className={styles.summaryAvatarImg} />
                </span>
              }
            >
              {gradeLabel}
            </Cell>
            <p className={styles.summaryText}>{analysisText}</p>
          </div>

          <div className={styles.mainContent}>
            <ResultsRecommendations items={recommendations} />
            <CriteriaAccordion items={criteria} />
          </div>
        </section>

        <aside className={styles.rightColumn} aria-label="Информация о диалоге">
          <AverageResultWidget gradeLabel={gradeLabel} dialogsCount={1} className={styles.widget} />
          <SkillProgressResultsWidget
            topicTitle={currentSkillTitle}
            onViewDialog={handleViewDialog}
            className={styles.widget}
          />
        </aside>
      </div>
    </main>
  );
}
