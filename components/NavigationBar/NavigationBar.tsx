import React from 'react';
import { Cell } from '../Cell/Cell';
import './NavigationBar.css';

export interface NavigationItem {
  id: string;
  label: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
}

export interface NavigationBarProps {
  /** Show/hide back button group */
  hasBackButton?: boolean;
  /** Show/hide text block (root link + title) */
  hasTextBlock?: boolean;
  /** Show/hide navigation items */
  hasItems?: boolean;
  
  // Back Button Props
  /** Back button click handler */
  onBackClick?: () => void;
  
  // Text Block Props
  /** Show root link in text block */
  hasRootLink?: boolean;
  /** Root link text */
  rootLinkText?: string;
  /** Root link click handler */
  onRootLinkClick?: () => void;
  /** Main title text */
  title?: string;
  /** Subtitle text below title */
  subtitle?: string;
  
  // Navigation Items Props
  /** Array of navigation items */
  items?: NavigationItem[];
  
  // Common Props
  /** Additional CSS class name */
  className?: string;
  /** HTML data attributes */
  'data-testid'?: string;
}

function getNavigationBarClassNames(props: NavigationBarProps): string {
  const { className } = props;
  const classes = ['navigation-bar'];
  
  if (className) {
    classes.push(className);
  }
  
  return classes.join(' ');
}

export const NavigationBar: React.FC<NavigationBarProps> = (props: NavigationBarProps) => {
  const {
    hasBackButton = false,
    hasTextBlock = false,
    hasItems = false,
    onBackClick,
    hasRootLink = false,
    rootLinkText,
    onRootLinkClick,
    title,
    subtitle,
    items = [],
    className,
    'data-testid': dataTestId,
  } = props;

  const classNames = getNavigationBarClassNames(props);

  return (
    <nav className={classNames} data-testid={dataTestId}>
      {/* Back Button Section */}
      {hasBackButton && (
        <div className="navigation-bar__button-section">
          <button
            type="button"
            className="navigation-bar__back-button"
            onClick={onBackClick}
            aria-label="Go back"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Text Block Section */}
      {hasTextBlock && (
        <div className="navigation-bar__text-block">
          {hasRootLink && rootLinkText && (
            <div className="navigation-bar__root-link" onClick={onRootLinkClick}>
              <span className="navigation-bar__root-link-text">{rootLinkText}</span>
              <svg
                className="navigation-bar__root-link-chevron"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 5L7 2L10 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
          {title && (
            <div className="navigation-bar__title-wrapper">
              <h1 className="navigation-bar__title">{title}</h1>
              {subtitle && (
                <p className="navigation-bar__subtitle">{subtitle}</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Navigation Items Section */}
      {hasItems && items.length > 0 && (
        <div className="navigation-bar__items">
          {items.map((item) => (
            <Cell
              key={item.id}
              size="M"
              variant={item.active ? 'primary' : 'default'}
              disabled={item.disabled}
              onClick={item.disabled ? undefined : item.onClick}
            >
              {item.label}
            </Cell>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;

