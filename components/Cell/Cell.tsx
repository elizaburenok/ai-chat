import React from 'react';
import { typography } from '../../tokens';
import './Cell.css';

export type CellAlign = 'left' | 'center' | 'right';
export type CellSize = 'S' | 'M' | 'L';
export type CellVariant = 'default' | 'primary' | 'secondary' | 'neutral' | 'success' | 'warning' | 'error';

export interface CellProps {
  /** Main content - can be string, number, or React node */
  children: React.ReactNode;
  /** Visual variant */
  variant?: CellVariant;
  /** Size of the cell */
  size?: CellSize;
  /** Text alignment */
  align?: CellAlign;
  /** Optional label/prefix text */
  label?: string;
  /** Optional subtitle text (hidden by default, same styles as description) */
  subtitle?: string;
  /** Optional suffix text */
  suffix?: string;
  /** Optional icon/element before content */
  icon?: React.ReactNode;
  /** Optional icon/element after content */
  iconRight?: React.ReactNode;
  /** Clickable cell */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  /** Disabled state */
  disabled?: boolean;
  /** Truncate text with ellipsis */
  truncate?: boolean;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Additional CSS class name */
  className?: string;
  /** HTML data attributes */
  'data-testid'?: string;
}

function getCellClassNames(props: CellProps): string {
  const {
    variant = 'default',
    size = 'S',
    align = 'left',
    disabled,
    truncate,
    onClick,
    className,
  } = props;

  const classes = ['cell', `cell--variant-${variant}`, `cell--size-${size}`, `cell--align-${align}`];

  if (disabled) {
    classes.push('cell--disabled');
  }

  if (truncate) {
    classes.push('cell--truncate');
  }

  if (onClick) {
    classes.push('cell--clickable');
  }

  if (className) {
    classes.push(className);
  }

  return classes.join(' ');
}

/**
 * Helper function to render content - converts bullet points to HTML lists
 */
function renderContent(children: React.ReactNode): React.ReactNode {
  if (typeof children === 'string' && children.includes('•')) {
    // Split by newlines and filter out empty lines
    const lines = children.split('\n').filter(line => line.trim());
    
    // Check if we have bullet points
    const hasBullets = lines.some(line => line.trim().startsWith('•'));
    
    if (hasBullets) {
      return (
        <ul className="cell__content-list">
          {lines.map((line, index) => {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('•')) {
              // Remove the bullet character and trim - browser will add its own bullet
              const text = trimmedLine.substring(1).trim();
              return (
                <li key={index} className="cell__content-list-item">
                  {text}
                </li>
              );
            }
            // If line doesn't start with bullet but is in a bulleted context, still add as list item
            return <li key={index} className="cell__content-list-item">{trimmedLine}</li>;
          })}
        </ul>
      );
    }
  }
  
  // Default: render as-is
  return children;
}

export const Cell: React.FC<CellProps> = (props: CellProps) => {
  const {
    children,
    label,
    subtitle,
    suffix,
    icon,
    iconRight,
    onClick,
    disabled,
    style,
    'data-testid': dataTestId,
  } = props;

  const classNames = getCellClassNames(props);

  const content = (
    <>
      {icon && <span className="cell__icon cell__icon--left" aria-hidden="true">{icon}</span>}
      
      <div className="cell__content-wrapper">
        {subtitle && <span className="cell__subtitle">{subtitle}</span>}
        <span className="cell__content">{renderContent(children)}</span>
        {label && <span className="cell__label">{label}</span>}
      </div>
      
      {suffix && <span className="cell__suffix">{suffix}</span>}
      
      {iconRight && <span className="cell__icon cell__icon--right" aria-hidden="true">{iconRight}</span>}
    </>
  );

  if (onClick) {
    return (
      <div
        className={classNames}
        style={style}
        onClick={disabled ? undefined : onClick}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        data-testid={dataTestId}
      >
        {content}
      </div>
    );
  }

  return (
    <div className={classNames} style={style} data-testid={dataTestId}>
      {content}
    </div>
  );
};

export default Cell;

