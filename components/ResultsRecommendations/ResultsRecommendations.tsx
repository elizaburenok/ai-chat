import React from 'react';
import { Cell } from '@components/Cell';
import type { ResultsRecommendation } from '@/data/resultsCriteria';
import styles from './ResultsRecommendations.module.css';

const BULLET_ICON = '— ';

export interface ResultsRecommendationsProps {
  /** List of improvement recommendations */
  items: ResultsRecommendation[];
  /** Section title */
  title?: string;
  /** Additional CSS class name */
  className?: string;
}

export function ResultsRecommendations({
  items,
  title = 'Рекомендации',
  className,
}: ResultsRecommendationsProps) {
  if (items.length === 0) return null;

  return (
    <section
      className={styles.root}
      aria-labelledby="results-recommendations-title"
      data-testid="results-recommendations"
    >
      <h2 id="results-recommendations-title" className={styles.title}>
        {title}
      </h2>
      <div className={styles.list} role="list">
        {items.map((item) => (
          <div key={item.id} role="listitem">
            <Cell
              icon={<span className={styles.bulletIcon}>{BULLET_ICON}</span>}
              size="M"
              variant="default"
              className={styles.item}
            >
              {item.text}
            </Cell>
          </div>
        ))}
      </div>
    </section>
  );
}
