import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import type { CriterionItem } from '@/data/resultsCriteria';
import { CRITERION_STATUS_LABELS } from '@/data/resultsCriteria';
import styles from './CriteriaAccordion.module.css';

const ChevronIcon: React.FC<{ expanded: boolean }> = ({ expanded }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    className={cn(styles.chevron, expanded && styles.chevronExpanded)}
  >
    <path
      d="M6 9l6 6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export interface CriteriaAccordionProps {
  /** List of criteria with title, status, and description */
  items: CriterionItem[];
  /** Allow multiple items expanded at once */
  allowMultiple?: boolean;
  /** Additional CSS class name */
  className?: string;
}

export function CriteriaAccordion({
  items,
  allowMultiple = false,
  className,
}: CriteriaAccordionProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={cn(styles.root, className)} role="region" aria-label="Критерии оценки">
      <ul className={styles.list}>
        {items.map((item) => {
          const isExpanded = expandedIds.has(item.id);
          return (
            <li key={item.id} className={styles.item}>
              <button
                type="button"
                className={styles.trigger}
                onClick={() => toggle(item.id)}
                aria-expanded={isExpanded}
                aria-controls={`criterion-body-${item.id}`}
                id={`criterion-trigger-${item.id}`}
              >
                <div className={styles.triggerContent}>
                  <div className={styles.triggerRow}>
                    <span className={styles.triggerTitle}>{item.title}</span>
                    <ChevronIcon expanded={isExpanded} />
                  </div>
                  <span className={styles.triggerSubtitle}>
                    {CRITERION_STATUS_LABELS[item.status]}
                  </span>
                </div>
              </button>
              <div
                id={`criterion-body-${item.id}`}
                role="region"
                aria-labelledby={`criterion-trigger-${item.id}`}
                className={cn(styles.body, isExpanded && styles.bodyExpanded)}
              >
                <div className={styles.bodyInner}>
                  <p className={styles.description}>{item.description}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
