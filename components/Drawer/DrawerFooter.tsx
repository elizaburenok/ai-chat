import React from 'react';
import './DrawerFooter.css';

export type DrawerFooterType = '1 Button' | '2 Button' | 'Empty' | '2 Horisontal Buttons';

export interface DrawerFooterAction {
  /** Button label text */
  label: string;
  /** Click handler for the button */
  onClick?: () => void;
  /** Disabled state */
  disabled?: boolean;
  /** Optional data-testid for the button */
  'data-testid'?: string;
}

export interface DrawerFooterProps {
  /** Layout type: one button, two stacked buttons, two horizontal buttons, or empty spacer */
  type?: DrawerFooterType;
  /** Optional descriptive text above buttons */
  description?: React.ReactNode;
  /** Primary action button (brand-filled) */
  primaryAction?: DrawerFooterAction;
  /** Secondary action button (neutral/outline) */
  secondaryAction?: DrawerFooterAction;
  /** Additional CSS class name for the root container */
  className?: string;
  /** HTML data attributes for the root container */
  'data-testid'?: string;
}

export const DrawerFooter: React.FC<DrawerFooterProps> = (props: DrawerFooterProps) => {
  const {
    type = '1 Button',
    description,
    primaryAction,
    secondaryAction,
    className,
    'data-testid': dataTestId,
  } = props;

  // Empty variant: keep minimal height spacer, no buttons
  if (type === 'Empty') {
    return (
      <div
        className={['drawer-footer', 'drawer-footer--empty', className].filter(Boolean).join(' ')}
        data-testid={dataTestId}
      />
    );
  }

  const hasPrimary = !!primaryAction;
  const hasSecondary = !!secondaryAction;

  // If no actions at all, render nothing
  if (!hasPrimary && !hasSecondary) {
    return null;
  }

  const rootClasses = [
    'drawer-footer',
    type === '2 Horisontal Buttons' ? 'drawer-footer--row' : 'drawer-footer--column',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClasses} data-testid={dataTestId}>
      {description && (
        <div className="drawer-footer__description">
          {description}
        </div>
      )}

      <div
        className={
          [
            'drawer-footer__buttons',
            type === '2 Horisontal Buttons' ? 'drawer-footer__buttons--row' : 'drawer-footer__buttons--column',
          ].join(' ')
        }
      >
        {hasSecondary && (
          <button
            type="button"
            className="drawer-footer__button drawer-footer__button--secondary"
            onClick={secondaryAction?.onClick}
            disabled={secondaryAction?.disabled}
            data-testid={secondaryAction?.['data-testid']}
          >
            <span className="drawer-footer__button-label">
              {secondaryAction?.label}
            </span>
          </button>
        )}

        {hasPrimary && (
          <button
            type="button"
            className="drawer-footer__button drawer-footer__button--primary"
            onClick={primaryAction?.onClick}
            disabled={primaryAction?.disabled}
            data-testid={primaryAction?.['data-testid']}
          >
            <span className="drawer-footer__button-label">
              {primaryAction?.label}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default DrawerFooter;


