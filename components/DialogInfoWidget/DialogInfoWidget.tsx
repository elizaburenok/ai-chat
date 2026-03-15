import React from 'react';
import { Widget } from '@components/Widget';
import { Button } from '@components/Button';
import { cn } from '@/lib/utils';
import styles from './DialogInfoWidget.module.css';

export interface DialogInfoWidgetProps {
  title?: string;
  timerDisplay: string;
  timerLabel?: string;
  showPauseButton?: boolean;
  className?: string;
}

export function DialogInfoWidget({
  title = 'Дебетовые карты',
  timerDisplay,
  timerLabel = 'Время диалога',
  showPauseButton = true,
  className,
}: DialogInfoWidgetProps) {
  return (
    <Widget
      title={title}
      className={cn(styles.widget, className)}
      footerAction={
        showPauseButton ? (
          <Button type="Transparent" className={styles.pauseButton}>
            Поставить на паузу
          </Button>
        ) : undefined
      }
    >
      <div>
        <div className={styles.timerValue}>{timerDisplay}</div>
        <div className={styles.timerLabel}>{timerLabel}</div>
      </div>
    </Widget>
  );
}
