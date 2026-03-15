import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MainNavBar } from '@components/MainNavBar';
import { DialogInfoWidget } from '@components/DialogInfoWidget';
import { SkillAssessmentDynamicsWidget } from '@components/SkillAssessmentDynamicsWidget';
import { CriteriaAccordion } from '@components/CriteriaAccordion';
import { ResultsRecommendations } from '@components/ResultsRecommendations';
import {
  DEFAULT_CRITERIA,
  DEFAULT_RECOMMENDATIONS,
  type CriterionItem,
  type ResultsRecommendation,
} from '@/data/resultsCriteria';
import styles from './ResultsPage.module.css';

/** Chevron-left icon for back button */
const ChevronLeftIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path
      d="M15 18l-6-6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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

/** Face happy + check icon for success avatar */
const SuccessFaceIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M9 9h.01M15 9h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export interface ResultsPageProps {
  /** Score percentage (0–100) */
  score?: number;
  /** Short grade label (e.g. "Хорошо справляется") */
  gradeLabel?: string;
  /** Full analysis text */
  analysisText?: string;
  /** Criteria for accordion (with title, status, description) */
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
  const { skillId } = useParams<{ skillId: string }>();
  const dialogDurationSeconds = 61;
  const dialogTimerDisplay = `${String(Math.floor(dialogDurationSeconds / 60)).padStart(2, '0')}:${String(dialogDurationSeconds % 60).padStart(2, '0')}`;

  const handleBack = () => {
    navigate(-1);
  };

  const handleRepeat = () => {
    if (skillId) {
      navigate(`/dialog/${skillId}`);
    } else {
      navigate('/');
    }
  };

  return (
    <main className={styles.root} data-testid="results-page">
      <MainNavBar activeNavId="home" onSettingsClick={() => {}} />

      <div className={styles.body}>
        <aside className={styles.leftColumn} aria-label="Навигация">
          <button
            type="button"
            className={styles.backButton}
            onClick={handleBack}
            aria-label="Назад"
          >
            <ChevronLeftIcon />
          </button>
        </aside>

        <section className={styles.centerColumn} aria-label="Результаты диалога">
          <header className={styles.header}>
            <h1 className={styles.pageTitle}>Диалог завершён</h1>
            <div className={styles.headerButtons}>
              <button
                type="button"
                className={styles.repeatButton}
                onClick={handleRepeat}
              >
                <RedoIcon />
                Повторить
              </button>
            </div>
          </header>

          <div className={styles.summary} role="region" aria-label="Итоговая оценка">
            <div className={styles.summaryRow}>
              <div className={styles.summaryAvatar} aria-hidden>
                <SuccessFaceIcon />
              </div>
              <div className={styles.summaryContent}>
                <span className={styles.summaryTitle}>Результат</span>
                <span className={styles.summarySubtitle}>{gradeLabel}</span>
              </div>
              <span className={styles.summaryScore}>{score}% выполнено</span>
            </div>
            <p className={styles.summaryText}>{analysisText}</p>
          </div>

          <div className={styles.mainContent}>
            <ResultsRecommendations items={recommendations} />
            <CriteriaAccordion items={criteria} />
          </div>
        </section>

        <aside className={styles.rightColumn} aria-label="Информация о диалоге">
          <DialogInfoWidget timerDisplay={dialogTimerDisplay} className={styles.widget} showPauseButton={false} />
          <SkillAssessmentDynamicsWidget className={styles.widget} />
        </aside>
      </div>
    </main>
  );
}
