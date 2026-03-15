import React from 'react';
import './PageAction.css';

export interface PageActionProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  /** Main title text */
  title: string;
  /** Optional description text below title */
  description?: string;
  /** Optional left icon */
  iconLeft?: React.ReactNode;
  /** Click handler - opens sidebar */
  onClick?: () => void;
  /** Disabled state */
  disabled?: boolean;
  /** Additional CSS class name */
  className?: string;
  /** HTML data attributes */
  'data-testid'?: string;
}

function getPageActionClassNames(props: PageActionProps): string {
  const {
    disabled,
    className,
  } = props;

  const classes = ['page-action'];

  if (disabled) {
    classes.push('page-action--disabled');
  }

  if (className) {
    classes.push(className);
  }

  return classes.join(' ');
}

export const PageAction: React.FC<PageActionProps> = (props: PageActionProps) => {
  const {
    title,
    description,
    iconLeft,
    disabled,
    onClick,
    'data-testid': dataTestId,
    className,
    ...buttonProps
  } = props;

  const classNames = getPageActionClassNames(props);

  return (
    <button
      type="button"
      className={classNames}
      disabled={disabled}
      onClick={onClick}
      data-testid={dataTestId}
      {...buttonProps}
    >
      {iconLeft && (
        <span className="page-action__icon page-action__icon--left" aria-hidden="true">
          {iconLeft}
        </span>
      )}

      <div className="page-action__content">
        <span className="page-action__title">{title}</span>
        {description && (
          <span className="page-action__description">{description}</span>
        )}
      </div>
    </button>
  );
};

export default PageAction;
