import React from 'react';
import { cn } from '@/lib/utils';
import './Widget.css';

export interface WidgetProps {
  /** Widget heading text */
  title: string;
  /** Widget body content */
  children: React.ReactNode;
  /** Optional action in the header (top right) */
  headerAction?: React.ReactNode;
  /** Optional action at the bottom of the widget (e.g. "Показать все" button), left-aligned */
  footerAction?: React.ReactNode;
  /** Additional CSS class name */
  className?: string;
}

export const Widget: React.FC<WidgetProps> = ({
  title,
  children,
  headerAction,
  footerAction,
  className,
}) => (
  <div className={cn('widget', className)}>
    <div className="widget__header">
      <h3 className="widget__title">{title}</h3>
      {headerAction != null ? <div className="widget__header-action">{headerAction}</div> : null}
    </div>
    <div className="widget__content">{children}</div>
    {footerAction != null ? (
      <div className="widget__footer">{footerAction}</div>
    ) : null}
  </div>
);

export default Widget;
