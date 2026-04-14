import React, { useMemo } from 'react';
import { Widget } from '@components/Widget';
import { Cell } from '@components/Cell';
import { BarGraph } from '@components/BarGraph';
import { PageAction } from '@components/PageAction';
import type { ProgressLevel } from '@components/VerticalMarker';
import type { SkillAssessmentHistoryItem } from '@components/SkillAssessmentDynamicsWidget';
import { cn } from '@/lib/utils';
import styles from './SkillProgressResultsWidget.module.css';

const WIDGET_TITLE = 'Прогресс по навыку';
const TOPIC_FIELD_LABEL = 'Тема';

/** Qualitative Y-axis — Figma 827:137958 (Bar graph legend) */
const RESULTS_BAR_Y_AXIS_LABELS = ['Хорошо справляется', 'Стоит обратить внимание', 'Поработать'];

/** Stroked bubble / chat icon (Figma 32px slot) */
const ChatBubbleIcon: React.FC = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path
      d="M8 10h16v10H12l-4 4v-14z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

function toProgressLevel(score: number): ProgressLevel {
  const boundedScore = Math.min(100, Math.max(0, score));
  const rounded = Math.round(boundedScore / 10) * 10;
  return `${rounded}%` as ProgressLevel;
}

const DEFAULT_HISTORY: SkillAssessmentHistoryItem[] = [
  { month: 'Окт', assessmentScore: 40, dialoguesPassed: 9 },
  { month: 'Ноя', assessmentScore: 50, dialoguesPassed: 11 },
  { month: 'Дек', assessmentScore: 60, dialoguesPassed: 12 },
  { month: 'Янв', assessmentScore: 70, dialoguesPassed: 14 },
  { month: 'Фев', assessmentScore: 80, dialoguesPassed: 16 },
  { month: 'Мар', assessmentScore: 90, dialoguesPassed: 18 },
];

export interface SkillProgressResultsWidgetProps {
  /** Widget heading (default: «Прогресс по навыку») */
  title?: string;
  topicTitle?: string;
  /** History for chart; last month is shown */
  history?: SkillAssessmentHistoryItem[];
  onViewDialog?: () => void;
  className?: string;
}

export function SkillProgressResultsWidget({
  title = WIDGET_TITLE,
  topicTitle = 'Тариф',
  history = DEFAULT_HISTORY,
  onViewDialog,
  className,
}: SkillProgressResultsWidgetProps) {
  const graphData = useMemo(() => {
    const last = history[history.length - 1];
    if (!last) return [];
    return [
      {
        label: last.month,
        progressLevel: toProgressLevel(last.assessmentScore),
        size: '44' as const,
      },
    ];
  }, [history]);

  return (
    <div className={cn(styles.stack, className)}>
      <Widget title={title} className={styles.widget}>
        <div className={styles.inner}>
          <Cell
            size="M"
            variant="default"
            subtitle={TOPIC_FIELD_LABEL}
            className={styles.topicCell}
          >
            {topicTitle}
          </Cell>
          {graphData.length > 0 ? (
            <div className={styles.graphWrap}>
              <BarGraph
                data={graphData}
                yAxisLabels={RESULTS_BAR_Y_AXIS_LABELS}
                gridLineCount={RESULTS_BAR_Y_AXIS_LABELS.length}
                className={styles.barGraph}
              />
            </div>
          ) : null}
        </div>
      </Widget>
      {onViewDialog ? (
        <PageAction
          title="Посмотреть диалог"
          iconLeft={<ChatBubbleIcon />}
          onClick={onViewDialog}
          className={styles.pageAction}
          data-testid="results-view-dialog"
        />
      ) : null}
    </div>
  );
}
