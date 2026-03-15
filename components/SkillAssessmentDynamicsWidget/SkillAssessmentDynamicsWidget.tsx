import React, { useMemo, useState } from 'react';
import { Widget } from '@components/Widget';
import { BarGraph } from '@components/BarGraph';
import { Cell } from '@components/Cell';
import type { ProgressLevel } from '@components/VerticalMarker';
import { cn } from '@/lib/utils';
import styles from './SkillAssessmentDynamicsWidget.module.css';

export interface SkillAssessmentHistoryItem {
  month: string;
  assessmentScore: number;
  dialoguesPassed: number;
}

export interface SkillAssessmentDynamicsWidgetProps {
  history?: SkillAssessmentHistoryItem[];
  visibleMonthsCount?: number;
  className?: string;
}

const DEFAULT_HISTORY: SkillAssessmentHistoryItem[] = [
  { month: 'Окт', assessmentScore: 40, dialoguesPassed: 9 },
  { month: 'Ноя', assessmentScore: 50, dialoguesPassed: 11 },
  { month: 'Дек', assessmentScore: 60, dialoguesPassed: 12 },
  { month: 'Янв', assessmentScore: 70, dialoguesPassed: 14 },
  { month: 'Фев', assessmentScore: 80, dialoguesPassed: 16 },
  { month: 'Мар', assessmentScore: 90, dialoguesPassed: 18 },
];

function toProgressLevel(score: number): ProgressLevel {
  const boundedScore = Math.min(100, Math.max(0, score));
  const rounded = Math.round(boundedScore / 10) * 10;
  return `${rounded}%` as ProgressLevel;
}

const ChevronLeftIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M11.25 4.5L6.75 9L11.25 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRightIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M6.75 4.5L11.25 9L6.75 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function SkillAssessmentDynamicsWidget({
  history = DEFAULT_HISTORY,
  visibleMonthsCount = 4,
  className,
}: SkillAssessmentDynamicsWidgetProps) {
  const initialStart = Math.max(0, history.length - visibleMonthsCount);
  const [windowStart, setWindowStart] = useState(initialStart);

  const visibleHistory = useMemo(
    () => history.slice(windowStart, windowStart + visibleMonthsCount),
    [history, windowStart, visibleMonthsCount],
  );

  const graphData = useMemo(
    () =>
      visibleHistory.map((item) => ({
        label: item.month,
        progressLevel: toProgressLevel(item.assessmentScore),
        size: '44' as const,
      })),
    [visibleHistory],
  );

  const passedDialogsCount = useMemo(
    () => visibleHistory.reduce((sum, item) => sum + item.dialoguesPassed, 0),
    [visibleHistory],
  );

  const canGoPrev = windowStart > 0;
  const canGoNext = windowStart + visibleMonthsCount < history.length;

  const handlePrev = () => {
    setWindowStart((current) => Math.max(0, current - visibleMonthsCount));
  };

  const handleNext = () => {
    setWindowStart((current) => Math.min(history.length - visibleMonthsCount, current + visibleMonthsCount));
  };

  return (
    <Widget
      title="Динамика оценки навыка"
      className={cn(styles.widget, className)}
      headerAction={
        <div className={styles.navigation}>
          <button type="button" className={styles.navButton} onClick={handlePrev} disabled={!canGoPrev} aria-label="Предыдущие месяцы">
            <ChevronLeftIcon />
          </button>
          <button type="button" className={styles.navButton} onClick={handleNext} disabled={!canGoNext} aria-label="Следующие месяцы">
            <ChevronRightIcon />
          </button>
        </div>
      }
    >
      <div className={styles.graphWrap}>
        <BarGraph data={graphData} />
      </div>
      <Cell size="M" subtitle="Пройдено диалогов за период">
        {passedDialogsCount}
      </Cell>
    </Widget>
  );
}

export default SkillAssessmentDynamicsWidget;
