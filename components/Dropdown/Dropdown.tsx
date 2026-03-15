import React, { useEffect, useRef } from 'react';
import { Cell } from '../Cell';
import './Dropdown.css';

export type DropdownType = 'list' | 'list-groups' | 'empty' | 'loading';
export type DropdownMode = 'desktop' | 'adaptive';

export interface DropdownItem {
  id: string;
  label: string;        // Main text (maps to Cell children)
  subtitle?: string;    // Optional subtitle (maps to Cell label prop)
  icon?: React.ReactNode; // Optional left accessory
  disabled?: boolean;
  checked?: boolean;    // Checkbox checked state (when showCheckbox is enabled)
  groupId?: string;     // For grouped lists
  groupLabel?: string;  // Group header text
}

export interface DropdownProps {
  /** Dropdown variant type */
  type?: DropdownType;
  /** Display mode - desktop or mobile/adaptive */
  mode?: DropdownMode;
  /** Array of items to display */
  items?: DropdownItem[];
  /** Optional title for mobile bottom sheet */
  title?: string;
  /** Empty state message */
  emptyMessage?: string;
  /** Whether dropdown is open */
  open?: boolean;
  /** Show checkbox as right accessory (default: false) */
  showCheckbox?: boolean;
  /** Callback when item is selected */
  onSelect?: (item: DropdownItem) => void;
  /** Callback when dropdown should close */
  onClose?: () => void;
  /** Additional CSS class name */
  className?: string;
  /** HTML data attributes */
  'data-testid'?: string;
}

interface GroupedItems {
  [groupId: string]: {
    label?: string;
    items: DropdownItem[];
  };
}

function getDropdownClassNames(props: DropdownProps): string {
  const {
    type = 'list',
    mode = 'desktop',
    open,
    showCheckbox,
    className,
  } = props;

  const classes = ['dropdown', `dropdown--type-${type}`, `dropdown--mode-${mode}`];

  if (open) {
    classes.push('dropdown--open');
  }

  if (showCheckbox) {
    classes.push('dropdown--has-checkbox');
  }

  if (className) {
    classes.push(className);
  }

  return classes.join(' ');
}

function groupItems(items: DropdownItem[]): GroupedItems {
  const grouped: GroupedItems = {};

  items.forEach((item) => {
    const groupId = item.groupId || 'default';
    if (!grouped[groupId]) {
      grouped[groupId] = {
        label: item.groupLabel,
        items: [],
      };
    }
    grouped[groupId].items.push(item);
  });

  return grouped;
}

// Simple spinner SVG component
const Spinner: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="dropdown__spinner"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="var(--color-primitive-brand, #835de1)"
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
      <animateTransform
        attributeName="transform"
        type="rotate"
        values="0 12 12;360 12 12"
        dur="1s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

// Checkbox component for right accessory
const Checkbox: React.FC<{ checked?: boolean; disabled?: boolean }> = ({ checked = false, disabled = false }) => (
  <div
    className={`dropdown__checkbox ${checked ? 'dropdown__checkbox--checked' : ''} ${disabled ? 'dropdown__checkbox--disabled' : ''}`}
    aria-checked={checked}
    aria-disabled={disabled}
    role="checkbox"
  >
    {checked && (
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="dropdown__checkbox-icon"
      >
        <path
          d="M2 6L5 9L10 3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )}
  </div>
);

export const Dropdown: React.FC<DropdownProps> = (props: DropdownProps) => {
  const {
    type = 'list',
    mode = 'desktop',
    items = [],
    title,
    emptyMessage = 'Text M',
    open = false,
    showCheckbox = false,
    onSelect,
    onClose,
    'data-testid': dataTestId,
  } = props;

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose?.();
      }
    };

    // Handle Escape key
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, onClose]);

  const classNames = getDropdownClassNames(props);

  // Render loading state
  if (type === 'loading') {
    return (
      <div
        ref={dropdownRef}
        className={classNames}
        role="status"
        aria-label="Loading"
        data-testid={dataTestId}
      >
        {mode === 'adaptive' && (
          <div className="dropdown__header">
            <div className="dropdown__grip" />
            {title && (
              <div className="dropdown__title-section">
                <h2 className="dropdown__title">{title}</h2>
              </div>
            )}
          </div>
        )}
        <div className="dropdown__loading">
          <Spinner size={mode === 'adaptive' ? 34 : 24} />
        </div>
      </div>
    );
  }

  // Render empty state
  if (type === 'empty' || items.length === 0) {
    return (
      <div
        ref={dropdownRef}
        className={classNames}
        role="status"
        aria-label="Empty"
        data-testid={dataTestId}
      >
        {mode === 'adaptive' && (
          <div className="dropdown__header">
            <div className="dropdown__grip" />
            {title && (
              <div className="dropdown__title-section">
                <h2 className="dropdown__title">{title}</h2>
              </div>
            )}
          </div>
        )}
        <div className="dropdown__empty">
          <p className="dropdown__empty-message">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  // Render grouped list
  if (type === 'list-groups') {
    const grouped = groupItems(items);

    return (
      <div
        ref={dropdownRef}
        className={classNames}
        role="listbox"
        data-testid={dataTestId}
      >
        {mode === 'adaptive' && (
          <div className="dropdown__header">
            <div className="dropdown__grip" />
            {title && (
              <div className="dropdown__title-section">
                <h2 className="dropdown__title">{title}</h2>
              </div>
            )}
          </div>
        )}
        <div className="dropdown__content">
          {Object.entries(grouped).map(([groupId, group]) => (
            <div key={groupId} className="dropdown__group">
              {group.label && (
                <div className="dropdown__group-header">
                  <Cell size="M" variant="secondary" className="dropdown__group-header-cell">
                    {group.label}
                  </Cell>
                </div>
              )}
              {group.items.map((item) => (
                <div key={item.id} className="dropdown__cell-wrapper">
                  <Cell
                    size="M"
                    icon={item.icon}
                    label={item.subtitle}
                    disabled={item.disabled}
                    iconRight={showCheckbox ? <Checkbox checked={item.checked} disabled={item.disabled} /> : undefined}
                    onClick={() => {
                      if (!item.disabled) {
                        onSelect?.(item);
                        onClose?.();
                      }
                    }}
                    className="dropdown__cell"
                  >
                    {item.label}
                  </Cell>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Render standard list
  return (
    <div
      ref={dropdownRef}
      className={classNames}
      role="listbox"
      data-testid={dataTestId}
    >
      {mode === 'adaptive' && (
        <div className="dropdown__header">
          <div className="dropdown__grip" />
          {title && (
            <div className="dropdown__title-section">
              <h2 className="dropdown__title">{title}</h2>
            </div>
          )}
        </div>
      )}
      <div className="dropdown__content">
        {items.map((item) => (
          <div key={item.id} className="dropdown__cell-wrapper">
            <Cell
              size="M"
              icon={item.icon}
              label={item.subtitle}
              disabled={item.disabled}
              iconRight={showCheckbox ? <Checkbox checked={item.checked} disabled={item.disabled} /> : undefined}
              onClick={() => {
                if (!item.disabled) {
                  onSelect?.(item);
                  onClose?.();
                }
              }}
              className="dropdown__cell"
            >
              {item.label}
            </Cell>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;

