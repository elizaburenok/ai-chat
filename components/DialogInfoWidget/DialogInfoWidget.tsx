import React from 'react';
import { Widget } from '@components/Widget';
import { Cell } from '@components/Cell';
import { Button } from '@components/Button';
import { cn } from '@/lib/utils';
import styles from './DialogInfoWidget.module.css';

/** Matches Figma: widget heading is fixed; skill name is the selected competence in the body. */
const WIDGET_HEADING = 'Сценарий диалога';
const TOPIC_FIELD_LABEL = 'Тема';

export interface DialogInfoWidgetProps {
  /** Selected skill name (value under «Тема»). */
  title?: string;
  /** Optional control in the widget header (e.g. Figma title accessory). */
  headerAction?: React.ReactNode;
  /** When set, shown below the topic cell (e.g. results summary). */
  timerDisplay?: string;
  timerLabel?: string;
  showPauseButton?: boolean;
  className?: string;
}

export function DialogInfoWidget({
  title = 'Дебетовые карты',
  headerAction,
  timerDisplay,
  timerLabel = 'Время диалога',
  showPauseButton = true,
  className,
}: DialogInfoWidgetProps) {
  const showTimer = timerDisplay != null && timerDisplay !== '';

  return (
    <Widget
      title={WIDGET_HEADING}
      className={cn(styles.widget, className)}
      headerAction={headerAction}
      footerAction={
        showTimer && showPauseButton ? (
          <Button type="Transparent" className={styles.pauseButton}>
            Поставить на паузу
          </Button>
        ) : undefined
      }
    >
      <div className={styles.inner}>
        <Cell size="M" variant="default" subtitle={TOPIC_FIELD_LABEL} className={styles.topicCell}>
          {title}
        </Cell>
        {showTimer ? (
          <div className={styles.timerSection}>
            <div className={styles.timerValue}>{timerDisplay}</div>
            <div className={styles.timerLabel}>{timerLabel}</div>
          </div>
        ) : null}
      </div>
    </Widget>
  );
}
