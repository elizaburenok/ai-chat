import React from 'react';
import './Navigator.css';

export interface NavigatorItem {
  id: string;
  label: string;
  /** Single character shown in the avatar circle (e.g. "T") */
  avatarLetter?: string;
  /** Background color for avatar circle (default from design: #E0BBE4) */
  avatarBgColor?: string;
  /** Text color for avatar letter (default from design: #6F3899) */
  avatarLetterColor?: string;
  disabled?: boolean;
}

export interface NavigatorProps {
  /** Header title (e.g. "Text XL") */
  title: string;
  /** List of selectable options */
  items: NavigatorItem[];
  /** ID of the currently selected item */
  selectedId: string | null;
  /** Label for the bottom action button (e.g. "Text S") */
  buttonLabel: string;
  /** Callback when an option row is selected */
  onSelect?: (item: NavigatorItem) => void;
  /** Callback when the bottom button is clicked */
  onConfirm?: () => void;
  /** Callback when header (or chevron) is clicked (e.g. expand/collapse) */
  onHeaderClick?: () => void;
  /** Additional CSS class name */
  className?: string;
  /** HTML data attributes */
  'data-testid'?: string;
}

function getClassNames(props: NavigatorProps): string {
  const { className } = props;
  const classes = ['navigator'];
  if (className) classes.push(className);
  return classes.join(' ');
}

const ChevronRight: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden
  >
    <path
      d="M8 5l5 5-5 5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Navigator: React.FC<NavigatorProps> = (props) => {
  const {
    title,
    items,
    selectedId,
    buttonLabel,
    onSelect,
    onConfirm,
    onHeaderClick,
    'data-testid': dataTestId,
  } = props;

  const classNames = getClassNames(props);

  return (
    <div className={classNames} role="group" aria-label={title} data-testid={dataTestId}>
      <div
        className="navigator__header"
        onClick={onHeaderClick}
        role={onHeaderClick ? 'button' : undefined}
        tabIndex={onHeaderClick ? 0 : undefined}
        onKeyDown={
          onHeaderClick
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onHeaderClick();
                }
              }
            : undefined
        }
      >
        <span className="navigator__title">{title}</span>
        {onHeaderClick && (
          <span className="navigator__chevron">
            <ChevronRight className="navigator__chevron-icon" />
          </span>
        )}
      </div>

      <div className="navigator__list" role="list" aria-label={title}>
        {items.map((item) => {
          const isSelected = selectedId === item.id;
          const isDisabled = item.disabled;
          const bg = item.avatarBgColor ?? '#E0BBE4';
          const letterColor = item.avatarLetterColor ?? '#6F3899';
          const letter = item.avatarLetter ?? (item.label.charAt(0) || '?');

          return (
            <div
              key={item.id}
              className="navigator__row"
              onClick={() => !isDisabled && onSelect?.(item)}
              role="button"
              aria-pressed={isSelected}
              aria-disabled={isDisabled}
              tabIndex={isDisabled ? -1 : 0}
              onKeyDown={(e) => {
                if (isDisabled) return;
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelect?.(item);
                }
              }}
            >
              <div
                className="navigator__avatar"
                style={{ backgroundColor: bg }}
                aria-hidden
              >
                <span className="navigator__avatar-letter" style={{ color: letterColor }}>
                  {letter}
                </span>
              </div>
              <span className="navigator__label">{item.label}</span>
            </div>
          );
        })}
      </div>

      {buttonLabel && (
        <button
          type="button"
          className="navigator__button"
          onClick={onConfirm}
        >
          {buttonLabel}
        </button>
      )}
    </div>
  );
};

export default Navigator;
