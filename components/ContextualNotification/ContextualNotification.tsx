import React from 'react';
import './ContextualNotification.css';

export interface ContextualNotificationProps {
  /** Current number of employees without a meeting cycle */
  countWithoutCycle: number;
  /** Called when user wants to resolve missing cycles (opens modal on parent page) */
  onOpenAssignModal: () => void;
  /** When false, the action button is hidden (e.g. when viewing another coach's list) */
  showActionButton?: boolean;
  /** Additional CSS class name */
  className?: string;
  /** HTML data attributes */
  'data-testid'?: string;
}

function formatEmployeesWithoutCycle(count: number): string {
  // Simple Russian pluralization for "сотрудник"
  const lastTwo = count % 100;
  const last = count % 10;

  let noun = 'сотрудников';
  if (lastTwo < 11 || lastTwo > 19) {
    if (last === 1) noun = 'сотрудник';
    else if (last >= 2 && last <= 4) noun = 'сотрудника';
  }

  return `${count} ${noun} без активности`;
}

export const ContextualNotification: React.FC<ContextualNotificationProps> = (props) => {
  const { countWithoutCycle, onOpenAssignModal, showActionButton = true, className, 'data-testid': dataTestId } = props;

  if (countWithoutCycle <= 0) {
    return null;
  }

  const classes = ['contextual-notification'];
  if (className) {
    classes.push(className);
  }

  const subtitleText = formatEmployeesWithoutCycle(countWithoutCycle);

  return (
    <section
      className={classes.join(' ')}
      aria-label="Сотрудники без активности"
      data-testid={dataTestId}
    >
      <div className="contextual-notification__icon" aria-hidden="true">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.99992 3.33325L2.91659 16.6666H17.0833L9.99992 3.33325Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 8.33325V11.6666"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="10" cy="13.75" r="0.75" fill="currentColor" />
        </svg>
      </div>

      <div className="contextual-notification__content">
        <div className="contextual-notification__title">Обратите внимание</div>
        <div className="contextual-notification__subtitle">
          {subtitleText}
        </div>
      </div>

      {showActionButton && (
        <button
          type="button"
          className="contextual-notification__action"
          onClick={onOpenAssignModal}
        >
          Перейти к сотрудникам
        </button>
      )}
    </section>
  );
};

export default ContextualNotification;

