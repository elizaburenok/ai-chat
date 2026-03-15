import React from 'react';
import { Link } from 'react-router-dom';
import { RECOMMENDATIONS, type RecommendationItem } from '@/data/recommendations';
import styles from './Recommendations.module.css';

function IconTwoHands({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 65 65" fill="none" aria-hidden>
      <path
        d="M18 35c0-4 2-8 6-10l4-2c2-1 4-1 6 0l3 2c3 2 5 5 5 8v8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M47 35c0-4-2-8-6-10l-4-2c-2-1-4-1-6 0l-3 2c-3 2-5 5-5 8v8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 45h6v8c0 2-1 4-3 4s-3-2-3-4v-8zM43 45h-6v8c0 2 1 4 3 4s3-2 3-4v-8z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M28 38h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconTypewriter({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 65 65" fill="none" aria-hidden>
      <rect
        x="12"
        y="22"
        width="41"
        height="24"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 36h4M28 36h4M38 36h4M18 44h8M30 44h8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M12 46h41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <rect x="20" y="12" width="8" height="10" rx="1" stroke="currentColor" strokeWidth="2" />
      <path d="M32 12v10M44 12v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconTrack({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 65 65" fill="none" aria-hidden>
      <path
        d="M15 42l10-10 8 8 16-16 6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="25" cy="32" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="33" cy="40" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="51" cy="24" r="4" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function RecommendationIcon({ type }: { type: RecommendationItem['icon'] }) {
  const className = styles.icon;
  switch (type) {
    case 'two-hands':
      return <IconTwoHands className={className} />;
    case 'typewriter':
      return <IconTypewriter className={className} />;
    case 'track':
      return <IconTrack className={className} />;
  }
}

export function Recommendations() {
  return (
    <section className={styles.root} aria-labelledby="recommendations-title" data-testid="recommendations">
      <div className={styles.header}>
        <h2 id="recommendations-title" className={styles.title}>
          Рекомендовано для тебя
        </h2>
      </div>
      <div className={styles.cards}>
        {RECOMMENDATIONS.map((item) => (
          <Link
            key={item.skillId}
            to={`/dialog/${item.skillId}`}
            className={styles.card}
            data-testid={`recommendation-${item.skillId}`}
          >
            <div className={styles.cardHeader}>
              <RecommendationIcon type={item.icon} />
            </div>
            <div className={styles.textBlock}>
              <p className={styles.cardTitle}>{item.title}</p>
              {item.label && <p className={styles.cardLabel}>{item.label}</p>}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
