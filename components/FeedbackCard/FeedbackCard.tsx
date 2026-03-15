import React from 'react';
import { Cell } from '../Cell';
import { PageAction } from '../PageAction';
import { skillsData, competenciesData } from '../../data/skills';
import successAvatar from '../../assets/images/Success-Avatar.svg';
import './FeedbackCard.css';

export interface MatchedSkill {
  id: string;
  label: string;
}

export interface FeedbackCardProps {
  /** Card name and date in description */
  name: string;
  /** Date/time of feedback */
  date: string | Date;
  /** Author name (От кого обратная связь) */
  author: string;
  /** Strengths (Сильные стороны) */
  strengths: string;
  /** Growth zone (Зоны роста) */
  growthZone: string;
  /** Rating (Оценка) - text like "Хорошо справляется", "Обратить внимание", "Поработать над этим" */
  rating?: string;
  /** Associated skill IDs */
  skillIds?: string[];
  /** Matched skills from filter (for contextual notification) */
  matchedSkills?: MatchedSkill[];
  /** Additional CSS class name */
  className?: string;
  /** HTML data attributes */
  'data-testid'?: string;
  /** Primary action button */
  primaryAction?: {
    label: string;
    onClick: () => void;
    loading?: boolean;
    disabled?: boolean;
    iconLeft?: React.ReactNode;
  };
  /** Secondary action button */
  secondaryAction?: {
    label: string;
    onClick: () => void;
    loading?: boolean;
    disabled?: boolean;
    iconLeft?: React.ReactNode;
  };
}

const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
};

export const FeedbackCard: React.FC<FeedbackCardProps> = (props: FeedbackCardProps) => {
  const {
    name,
    date,
    author,
    strengths,
    growthZone,
    rating,
    skillIds,
    matchedSkills,
    primaryAction,
    secondaryAction,
    className,
    'data-testid': dataTestId,
  } = props;

  const classNames = [
    'feedback-card',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Process skills if skillIds are provided
  const renderSkills = () => {
    // Hidden: skill cells are not displayed
    return null;
  };

  // Information Circle Icon Component
  const InformationCircleIcon: React.FC = () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="9" cy="9" r="9" fill="#835de1" />
      {/* Dot of 'i' */}
      <circle cx="9" cy="6" r="1.5" fill="white" />
      {/* Stem of 'i' */}
      <rect x="7.5" y="7.5" width="3" height="5" rx="0.5" fill="white" />
    </svg>
  );

  // Render contextual notification for matched skills
  const renderContextualNotification = () => {
    if (!matchedSkills || matchedSkills.length === 0) {
      return null;
    }

    const skillCount = matchedSkills.length;
    const isPlural = skillCount > 1;
    const titlePrefix = isPlural ? 'Найдены навыки' : 'Найден навык';
    const skillLabels = matchedSkills.map(skill => skill.label).join(', ');
    const title = `${titlePrefix} «${skillLabels}»`;

    return (
      <div className="feedback-card__contextual-notification">
        <div className="feedback-card__notification-icon-wrapper">
          <InformationCircleIcon />
        </div>
        <div className="feedback-card__notification-content">
          <div className="feedback-card__notification-title">{title}</div>
          {primaryAction && (
            <PageAction
              title={primaryAction.label}
              onClick={primaryAction.onClick}
              disabled={primaryAction.disabled}
              className="feedback-card__notification-action"
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className={classNames}
      data-testid={dataTestId}
    >
      {/* Cell 1: Card Name and Date */}
      <Cell size="L" variant="default" label={formatDate(date)}>
        {name}
      </Cell>

      {/* Cell 2: Author (От кого обратная связь) */}
      <Cell size="S" variant="default" subtitle="От кого обратная связь">
        {author}
      </Cell>

      {/* Cell 3: Strengths (Сильные стороны) */}
      <Cell size="S" variant="default" subtitle="Сильные стороны">
        {strengths}
      </Cell>

      {/* Cell 4: Growth Zone (Зоны роста) */}
      <Cell size="S" variant="default" subtitle="Зоны роста">
        {growthZone}
      </Cell>

      {/* Cell 5: Rating (Оценка) */}
      {rating && (
        <Cell 
          size="L" 
          variant="default" 
          subtitle="Оценка"
          icon={
            <div className="feedback-card__rating-icon">
              <img 
                src={successAvatar} 
                alt="Success avatar" 
                width="44" 
                height="44"
              />
            </div>
          }
        >
          {rating}
        </Cell>
      )}

      {/* Skills Section */}
      {renderSkills()}

      {/* Contextual Notification Section */}
      {renderContextualNotification()}

      {/* PageAction Section */}
      {(primaryAction || secondaryAction) && (!matchedSkills || matchedSkills.length === 0) && (
        <div className="feedback-card__footer">
          {secondaryAction && (
            <PageAction
              title={secondaryAction.label}
              iconLeft={secondaryAction.iconLeft}
              onClick={secondaryAction.onClick}
              disabled={secondaryAction.disabled}
            />
          )}
          {primaryAction && (
            <PageAction
              title={primaryAction.label}
              iconLeft={primaryAction.iconLeft}
              onClick={primaryAction.onClick}
              disabled={primaryAction.disabled}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default FeedbackCard;

