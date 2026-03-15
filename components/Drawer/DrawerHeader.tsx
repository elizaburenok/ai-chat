import React from 'react';
import './DrawerHeader.css';

export interface DrawerHeaderProps {
  /** Title content. Can be text or any React node */
  children?: React.ReactNode;
  /** Close button click handler */
  onClose?: () => void;
  /** Additional CSS class name */
  className?: string;
  /** HTML data attributes */
  'data-testid'?: string;
}

export const DrawerHeader: React.FC<DrawerHeaderProps> = (props: DrawerHeaderProps) => {
  const {
    children,
    onClose,
    className,
    'data-testid': dataTestId,
  } = props;

  const classes = ['drawer-header', className].filter(Boolean).join(' ');

  return (
    <div className={classes} data-testid={dataTestId}>
      <div className="drawer-header__title">
        {children}
      </div>

      {onClose && (
        <button
          type="button"
          className="drawer-header__close"
          onClick={onClose}
          aria-label="Закрыть панель"
        >
          <span aria-hidden="true" className="drawer-header__close-icon">
            ×
          </span>
        </button>
      )}
    </div>
  );
};

export default DrawerHeader;


