import React, { useMemo } from 'react';
import { Widget } from '../Widget';
import { completionReward } from '../../data/completionReward';
import type { TopicProgressStats } from '@/lib/resultsAggregates';
import './TopicProgressWidget.css';

export interface TopicProgressWidgetProps {
  topicName?: string;
  topicStats?: TopicProgressStats | null;
  totalSessionsCompleted: number;
  className?: string;
  showCompletionReward?: boolean;
}

const MOTIVATION_PHRASES: string[] = [
  'Каждая пройденная тема делает вас увереннее в общении с клиентами.',
  'Даже небольшой прогресс сегодня — это основа больших результатов завтра.',
  'Продолжайте в том же духе: практика — лучший способ закрепить навыки.',
  'Вы уже сделали шаг вперёд — закрепите успех следующей сессией.',
  'Стабильность важнее идеала: главное — не останавливаться.',
];

export const TopicProgressWidget: React.FC<TopicProgressWidgetProps> = ({
  topicName,
  topicStats,
  totalSessionsCompleted,
  className,
  showCompletionReward,
}) => {
  const motivationPhrase = useMemo(() => {
    const index = Math.floor(Math.random() * MOTIVATION_PHRASES.length);
    return MOTIVATION_PHRASES[index];
  }, []);

  const hasTopicStats = topicName && topicStats;

  return (
    <Widget title="Ваш прогресс" className={['topic-progress-widget', className].filter(Boolean).join(' ')}>
      <div className="topic-progress-widget__stat">
        <div className="topic-progress-widget__label">Завершённых сессий</div>
        <div className="topic-progress-widget__value">{totalSessionsCompleted}</div>
      </div>

      {hasTopicStats ? (
        <>
          <div className="topic-progress-widget__divider" />
          <div className="topic-progress-widget__stat">
            <div className="topic-progress-widget__label">Текущий результат</div>
            <div className="topic-progress-widget__value">
              {topicStats.latestAttemptScore}
              <span className="topic-progress-widget__value-suffix"> из 5</span>
            </div>
          </div>

          <div className="topic-progress-widget__progress">
            <div className="topic-progress-widget__label">Прогресс по теме</div>
            <div className="topic-progress-widget__progress-value">
              {topicStats.improvementDelta > 0 && (
                <>
                  +{topicStats.improvementDelta}
                  <span className="topic-progress-widget__value-suffix"> балла(ов)</span>
                </>
              )}
              {topicStats.improvementDelta === 0 && 'Без изменений'}
              {topicStats.improvementDelta < 0 && (
                <>
                  {topicStats.improvementDelta}
                  <span className="topic-progress-widget__value-suffix"> балла(ов)</span>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <p className="topic-progress-widget__placeholder">
          Это ваш первый результат по этой теме. Продолжайте практику, чтобы увидеть динамику.
        </p>
      )}

      {showCompletionReward && (
        <div className="topic-progress-widget__reward" aria-labelledby="topic-progress-reward-heading">
          <h4 id="topic-progress-reward-heading" className="topic-progress-widget__reward-title">
            Награда за прохождение
          </h4>
          <div className="topic-progress-widget__reward-body">
            <img
              src={completionReward.image}
              alt=""
              width={91}
              height={106}
              className="topic-progress-widget__reward-image"
            />
            <p className="topic-progress-widget__reward-description">{completionReward.description}</p>
          </div>
        </div>
      )}

      <p className="topic-progress-widget__motivation">{motivationPhrase}</p>
    </Widget>
  );
};

export default TopicProgressWidget;

