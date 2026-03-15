import React from 'react';
import { typography } from '../../tokens';
import './Button.css';

export type ButtonType = 'Primary' | 'Secondary' | 'Transparent' | 'White';
export type ButtonState = 'Default' | 'Hovered' | 'Disabled' | 'Loading';

export interface ButtonProps {
  /** Button text label */
  children: React.ReactNode;
  /** Visual variant type */
  type?: ButtonType;
  /** Interaction state */
  state?: ButtonState;
  /** Click handler */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Disabled state (overrides state prop) */
  disabled?: boolean;
  /** Loading state (overrides state prop) */
  loading?: boolean;
  /** Additional CSS class name */
  className?: string;
  /** HTML data attributes */
  'data-testid'?: string;
}

// Simple spinner SVG component
const Spinner: React.FC<{ size?: number; color?: string }> = ({ 
  size = 24, 
  color = 'var(--color-primitive-brand, #835de1)' 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="button__spinner"
    style={{ '--spinner-color': color } as React.CSSProperties}
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="31.416"
      strokeDashoffset="23.562"
    >
      <animate
        attributeName="stroke-dashoffset"
        values="31.416;0;31.416"
        dur="1s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

function getButtonClassNames(props: ButtonProps): string {
  const {
    type = 'Primary',
    state,
    disabled,
    loading,
    className,
  } = props;

  const classes = ['button', `button--type-${type.toLowerCase()}`];

  // Determine actual state (props take precedence over state prop)
  let actualState = state || 'Default';
  if (disabled) {
    actualState = 'Disabled';
  } else if (loading) {
    actualState = 'Loading';
  }

  classes.push(`button--state-${actualState.toLowerCase()}`);

  if (className) {
    classes.push(className);
  }

  return classes.join(' ');
}

function getSpinnerColor(type: ButtonType): string {
  switch (type) {
    case 'Primary':
      return 'var(--color-primitive-default-fixed, #ffffff)';
    case 'Secondary':
    case 'Transparent':
    case 'White':
      return 'var(--color-primitive-brand, #835de1)';
    default:
      return 'var(--color-primitive-brand, #835de1)';
  }
}

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const {
    children,
    type = 'Primary',
    state,
    disabled,
    loading,
    onClick,
    'data-testid': dataTestId,
  } = props;

  const classNames = getButtonClassNames(props);
  
  // Determine actual state
  const actualState = disabled ? 'Disabled' : loading ? 'Loading' : (state || 'Default');
  const isDisabled = disabled || loading || actualState === 'Disabled';
  const isLoading = loading || actualState === 'Loading';

  const textStyle = {
    fontFamily: typography.fontFamily.primary,
    fontWeight: typography.fontWeights.medium,
    fontSize: '18px',
    lineHeight: '22px',
    letterSpacing: '0px',
  } as const;

  return (
    <button
      type="button"
      className={classNames}
      disabled={isDisabled}
      onClick={onClick}
      data-testid={dataTestId}
    >
      {isLoading ? (
        <Spinner size={24} color={getSpinnerColor(type)} />
      ) : (
        <span className="button__label" style={textStyle}>
          {children}
        </span>
      )}
    </button>
  );
};

export default Button;

