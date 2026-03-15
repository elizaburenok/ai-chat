import React from 'react';
import { typography } from '../../tokens';
import './Chip.css';

export type ChipVariant = 'chip' | 'dropdown' | 'tab' | 'action';

export type ChipSize = 's';

export type ChipState = 'default' | 'hovered' | 'pressed' | 'disabled';

export interface ChipProps {
  /** Visual variant from the Figma component */
  variant?: ChipVariant;
  /** Label text */
  label: string;
  /** Chip size – Figma shows only S for this set */
  size?: ChipSize;
  /** Selected state (brand background / outlined etc.) */
  selected?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Show left accessory avatar/icon */
  hasLeftAccessory?: boolean;
  /** Counter for tab variant (right accessory) */
  count?: number;
  /** For dropdown variant: whether menu is open (controls chevron up/down) */
  dropdownOpen?: boolean;
  /** For dropdown/action: show reset (×) icon when selected */
  showResetIcon?: boolean;
  /** Click handler */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Reset icon click handler (separate from main onClick) */
  onReset?: React.MouseEventHandler<HTMLSpanElement>;
}

function getChipClassNames(props: ChipProps): string {
  const {
    variant = 'chip',
    selected,
    disabled,
    dropdownOpen,
    showResetIcon,
  } = props;

  const classes = ['chip', `chip--variant-${variant}`];

  if (disabled) {
    classes.push('chip--disabled');
  }

  if (selected) {
    classes.push('chip--selected');
  }

  if (variant === 'dropdown' && dropdownOpen) {
    classes.push('chip--dropdown-open');
  }

  if (showResetIcon) {
    classes.push('chip--has-reset');
  }

  if (!selected && !disabled && variant !== 'action') {
    classes.push('chip--elevated');
  }

  return classes.join(' ');
}

export const Chip: React.FC<ChipProps> = (props: ChipProps) => {
  const {
    variant = 'chip',
    label,
    size = 's',
    hasLeftAccessory,
    count,
    dropdownOpen,
    showResetIcon,
    disabled,
    onClick,
    onReset,
  } = props;

  const textStyle = {
    fontFamily: typography.styles['TTN-500-M-01'].fontFamily,
    fontWeight: typography.styles['TTN-500-M-01'].fontWeight,
    fontSize: '14px',
    lineHeight: '18px',
    letterSpacing: '0.14px',
  } as const;

  const textClassNames = ['chip__label'];
  if (variant === 'action') {
    textClassNames.push('chip__label--brand');
  }

  const counterVisible = variant === 'tab' && typeof count === 'number' && count > 0;

  const resetVisible =
    (variant === 'dropdown' || variant === 'action') && !!showResetIcon;

  const dropdownIconVisible = variant === 'dropdown';

  return (
    <button
      type="button"
      className={getChipClassNames(props)}
      disabled={disabled}
      onClick={onClick}
    >
      {hasLeftAccessory && (
        <div className="chip__left-accessory" aria-hidden="true" />
      )}
      <span className={textClassNames.join(' ')} style={textStyle}>
        {label}
      </span>

      {counterVisible && (
        <span className="chip__counter" aria-hidden="true">
          {count}
        </span>
      )}

      {dropdownIconVisible && !resetVisible && (
        <span
          className={`chip__dropdown-icon ${
            dropdownOpen ? 'chip__dropdown-icon--up' : 'chip__dropdown-icon--down'
          }`}
          aria-hidden="true"
        />
      )}

      {resetVisible && (
        <span 
          className="chip__reset-icon" 
          aria-hidden="true"
          onClick={(e) => {
            e.stopPropagation();
            onReset?.(e);
          }}
        >
          ×
        </span>
      )}
    </button>
  );
};

export default Chip;


