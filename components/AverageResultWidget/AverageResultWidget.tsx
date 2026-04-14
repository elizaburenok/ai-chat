import React from 'react';
import { Widget } from '@components/Widget';
import { Cell } from '@components/Cell';
import { cn } from '@/lib/utils';
import avatarIcon from '@avatar-icons/1.png';
import styles from './AverageResultWidget.module.css';

const WIDGET_TITLE = 'Средний результат';

export interface AverageResultWidgetProps {
  /** Grade line (e.g. «Хорошо справляется») */
  gradeLabel: string;
  /** Number of dialogues aggregated */
  dialogsCount?: number;
  className?: string;
}

function formatDialogsLabel(count: number): string {
  const n = Math.max(0, Math.floor(count));
  if (n === 1) return '1 диалог';
  if (n >= 2 && n <= 4) return `${n} диалога`;
  return `${n} диалогов`;
}

export function AverageResultWidget({
  gradeLabel,
  dialogsCount = 1,
  className,
}: AverageResultWidgetProps) {
  return (
    <Widget title={WIDGET_TITLE} className={cn(styles.widget, className)}>
      <Cell
        size="M"
        variant="default"
        label={formatDialogsLabel(dialogsCount)}
        className={styles.cellRow}
        icon={
          <span className={styles.avatar} aria-hidden>
            <img src={avatarIcon} alt="" className={styles.avatarImage} />
          </span>
        }
      >
        {gradeLabel}
      </Cell>
    </Widget>
  );
}
