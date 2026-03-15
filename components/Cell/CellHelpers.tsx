/**
 * Helper components for specific Cell data types
 * These provide convenient wrappers for common use cases
 */

import React from 'react';
import { Cell, CellProps } from './Cell';

export interface CellTextProps extends Omit<CellProps, 'children'> {
  /** Text content */
  text: string;
}

/**
 * Cell for displaying text content
 */
export const CellText: React.FC<CellTextProps> = ({ text, ...props }) => {
  return <Cell {...props}>{text}</Cell>;
};

export interface CellNumberProps extends Omit<CellProps, 'children'> {
  /** Numeric value */
  value: number;
  /** Number formatting options */
  format?: 'integer' | 'decimal' | 'currency' | 'percentage';
  /** Locale for formatting */
  locale?: string;
  /** Currency code (for currency format) */
  currency?: string;
  /** Decimal places */
  decimals?: number;
}

/**
 * Cell for displaying numeric values with formatting
 */
export const CellNumber: React.FC<CellNumberProps> = ({
  value,
  format = 'decimal',
  locale = 'ru-RU',
  currency = 'RUB',
  decimals = 2,
  ...props
}) => {
  let formattedValue: string;

  switch (format) {
    case 'integer':
      formattedValue = new Intl.NumberFormat(locale).format(Math.round(value));
      break;
    case 'currency':
      formattedValue = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(value);
      break;
    case 'percentage':
      formattedValue = new Intl.NumberFormat(locale, {
        style: 'percent',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(value / 100);
      break;
    case 'decimal':
    default:
      formattedValue = new Intl.NumberFormat(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(value);
      break;
  }

  return <Cell {...props}>{formattedValue}</Cell>;
};

export interface CellDateProps extends Omit<CellProps, 'children'> {
  /** Date value */
  date: Date | string | number;
  /** Date format style */
  format?: 'short' | 'medium' | 'long' | 'time' | 'datetime' | 'relative';
  /** Locale for formatting */
  locale?: string;
}

/**
 * Cell for displaying dates with formatting
 */
export const CellDate: React.FC<CellDateProps> = ({
  date,
  format = 'medium',
  locale = 'ru-RU',
  ...props
}) => {
  const dateObj = typeof date === 'string' || typeof date === 'number' 
    ? new Date(date) 
    : date;

  let formattedDate: string;

  switch (format) {
    case 'short':
      formattedDate = new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(dateObj);
      break;
    case 'long':
      formattedDate = new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(dateObj);
      break;
    case 'time':
      formattedDate = new Intl.DateTimeFormat(locale, {
        hour: '2-digit',
        minute: '2-digit',
      }).format(dateObj);
      break;
    case 'datetime':
      formattedDate = new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }).format(dateObj);
      break;
    case 'relative': {
      const now = new Date();
      const diffMs = dateObj.getTime() - now.getTime();
      const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) {
        formattedDate = 'Сегодня';
      } else if (diffDays === 1) {
        formattedDate = 'Завтра';
      } else if (diffDays === -1) {
        formattedDate = 'Вчера';
      } else if (Math.abs(diffDays) < 7) {
        formattedDate = new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(dateObj);
      } else {
        formattedDate = new Intl.DateTimeFormat(locale, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }).format(dateObj);
      }
      break;
    }
    case 'medium':
    default:
      formattedDate = new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(dateObj);
      break;
  }

  return <Cell {...props}>{formattedDate}</Cell>;
};

export interface CellStatusProps extends Omit<CellProps, 'children'> {
  /** Status text */
  status: string;
  /** Status type */
  type?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
}

/**
 * Cell for displaying status with color coding
 */
export const CellStatus: React.FC<CellStatusProps> = ({
  status,
  type = 'neutral',
  ...props
}) => {
  const statusColors = {
    success: 'var(--color-primitive-success, #5cad9a)',
    warning: 'var(--color-primitive-warning, #f0c555)',
    error: 'var(--color-primitive-error, #d84d4d)',
    info: 'var(--color-primitive-brand, #835de1)',
    neutral: 'var(--color-primitive-neutral-4, #949494)',
  };

  return (
    <Cell
      {...props}
      style={{
        color: statusColors[type],
        ...props.style,
      }}
    >
      {status}
    </Cell>
  );
};

export interface CellBadgeProps extends Omit<CellProps, 'children'> {
  /** Badge text */
  text: string;
  /** Badge color variant */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
}

/**
 * Cell for displaying badge/chip-like content
 */
export const CellBadge: React.FC<CellBadgeProps> = ({
  text,
  variant = 'default',
  ...props
}) => {
  const badgeStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '2px 8px',
    borderRadius: 'var(--rounding-1x, 4px)',
    fontSize: '11px',
    lineHeight: '14px',
    fontWeight: 'var(--font-weight-demi-bold, 600)',
  };

  const variantColors = {
    default: {
      backgroundColor: 'var(--color-container-transparent-1, rgba(25, 25, 25, 0.05))',
      color: 'var(--color-primitive-primary, #191919)',
    },
    primary: {
      backgroundColor: 'var(--color-bg-brand, #835de1)',
      color: 'var(--color-primitive-default-fixed, #ffffff)',
    },
    success: {
      backgroundColor: 'var(--color-primitive-success, #5cad9a)',
      color: 'var(--color-primitive-default-fixed, #ffffff)',
    },
    warning: {
      backgroundColor: 'var(--color-primitive-warning, #f0c555)',
      color: 'var(--color-primitive-primary, #191919)',
    },
    error: {
      backgroundColor: 'var(--color-primitive-error, #d84d4d)',
      color: 'var(--color-primitive-default-fixed, #ffffff)',
    },
  };

  return (
    <Cell {...props}>
      <span style={{ ...badgeStyles, ...variantColors[variant] }}>{text}</span>
    </Cell>
  );
};

