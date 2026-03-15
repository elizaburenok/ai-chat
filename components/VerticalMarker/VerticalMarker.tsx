import React from 'react';
import './VerticalMarker.css';

export type VerticalMarkerSize = '15' | '20' | '25' | '44';
export type VerticalMarkerQuantity = '1 Bar' | '2 Bars';
export type VerticalMarkerState = 'Default' | 'Selected' | 'Inactive';
export type ProgressLevel = '0%' | '10%' | '20%' | '30%' | '40%' | '50%' | '60%' | '70%' | '80%' | '90%' | '100%';

export interface VerticalMarkerProps {
  /** Label text displayed below the bars */
  text?: string;
  /** Show hover overlay */
  isHover?: boolean;
  /** Bar width size variant */
  size?: VerticalMarkerSize;
  /** Number of bars (1 or 2) */
  quantity?: VerticalMarkerQuantity;
  /** Visual state */
  state?: VerticalMarkerState;
  /** Show segmented bars with category colors */
  isSegmented?: boolean;
  /** Show saldo-style bars (split with empty space) */
  isSaldo?: boolean;
  /** Progress level for bar height (0-100%) */
  progressLevel?: ProgressLevel;
  /** Click handler */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  /** Mouse enter handler */
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  /** Mouse leave handler */
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}

function getVerticalMarkerClassNames(props: VerticalMarkerProps): string {
  const { size = '44', quantity = '1 Bar', state = 'Default', isSegmented = false, isSaldo = false, isHover = false } = props;

  const classes = ['vertical-marker'];
  
  classes.push(`vertical-marker--size-${size}`);
  classes.push(`vertical-marker--quantity-${quantity.replace(' ', '-').toLowerCase()}`);
  classes.push(`vertical-marker--state-${state.toLowerCase()}`);
  
  if (isSegmented) {
    classes.push('vertical-marker--segmented');
  }
  
  if (isSaldo) {
    classes.push('vertical-marker--saldo');
  }
  
  if (isHover) {
    classes.push('vertical-marker--hover');
  }

  return classes.join(' ');
}

// Category colors for segmented bars (in order from top to bottom)
const CATEGORY_COLORS = [
  'var(--color-category-sand, #de9c7e)',
  'var(--color-category-coral, #e59594)',
  'var(--color-category-flamingo, #d796c1)',
  'var(--color-category-orchid, #c799df)',
  'var(--color-category-amethyst, #b79fe9)',
  'var(--color-category-indigo, #95aee2)',
] as const;

function getProgressHeight(progressLevel: ProgressLevel): string {
  const percentage = parseInt(progressLevel.replace('%', ''), 10);
  return `${percentage}%`;
}

export const VerticalMarker: React.FC<VerticalMarkerProps> = (props: VerticalMarkerProps) => {
  const {
    text = 'Text XS',
    isHover = false,
    size = '44',
    quantity = '1 Bar',
    state = 'Default',
    isSegmented = false,
    isSaldo = false,
    progressLevel = '100%',
    onClick,
    onMouseEnter,
    onMouseLeave,
  } = props;

  const isInactive = state === 'Inactive';
  const isSelected = state === 'Selected';
  const hasTwoBars = quantity === '2 Bars';
  const barWidth = size;

  // Calculate gap between bars for 2-bar variant
  const barGap = size === '15' || size === '20' ? (size === '15' ? '3px' : '5px') : '0px';

  const renderBar = (isOld = false) => {
    if (isSegmented) {
      return (
        <div className="vertical-marker__bar vertical-marker__bar--segmented" style={{ width: `${barWidth}px` }}>
          <div className="vertical-marker__bar-fill vertical-marker__bar-fill--segmented">
            {CATEGORY_COLORS.map((color, index) => (
              <div
                key={index}
                className="vertical-marker__segment"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      );
    }

    if (isSaldo) {
      const progressPercent = parseInt(progressLevel.replace('%', ''), 10);
      return (
        <div className="vertical-marker__bar vertical-marker__bar--saldo" style={{ width: `${barWidth}px` }}>
          <div className="vertical-marker__saldo-container">
            <div className="vertical-marker__bar-fill vertical-marker__bar-fill--saldo" style={{ height: `${progressPercent}%` }} />
            <div className="vertical-marker__bar-empty" style={{ height: `${100 - progressPercent}%` }} />
          </div>
        </div>
      );
    }

    // Standard solid bar
    return (
      <div className="vertical-marker__bar" style={{ width: `${barWidth}px` }}>
        <div className="vertical-marker__bar-fill" style={{ height: getProgressHeight(progressLevel) }} />
      </div>
    );
  };

  return (
    <div
      className={getVerticalMarkerClassNames(props)}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isHover && (
        <div className="vertical-marker__hover-area" />
      )}
      
      <div className="vertical-marker__bars" style={{ gap: hasTwoBars ? barGap : '0px' }}>
        {hasTwoBars ? (
          <>
            <div className="vertical-marker__bar-wrapper vertical-marker__bar-wrapper--old">
              {renderBar(true)}
            </div>
            <div className="vertical-marker__bar-wrapper">
              {renderBar(false)}
            </div>
          </>
        ) : (
          <div className="vertical-marker__bar-wrapper">
            {renderBar(false)}
          </div>
        )}
      </div>
      
      <p className={`vertical-marker__text ${isSelected ? 'vertical-marker__text--selected' : ''}`}>
        {text}
      </p>
    </div>
  );
};

export default VerticalMarker;

