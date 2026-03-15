import React from 'react';
import { cn } from '@/lib/utils';
import './ServiceCard.css';

export interface ServiceCardProps {
  /** Card title */
  title: string;
  /** Card subtitle/description */
  subtitle: string;
  /** Icon displayed in colored background (ignored when avatarSrc is set) */
  icon?: React.ReactNode;
  /** Avatar image source – renders 44×44 image instead of icon */
  avatarSrc?: string;
  /** Background color for icon container (CSS color value) */
  iconBgColor?: string;
  /** Link href - renders as anchor when provided */
  href?: string;
  /** Click handler - used when href is not provided */
  onClick?: () => void;
  /** Additional CSS class name */
  className?: string;
  /** HTML data attributes */
  'data-testid'?: string;
}

function getServiceCardClassNames(props: ServiceCardProps): string {
  return cn(
    'service-card',
    props.href && 'service-card--link',
    props.className
  );
}

export const ServiceCard: React.FC<ServiceCardProps> = (props: ServiceCardProps) => {
  const {
    title,
    subtitle,
    icon,
    avatarSrc,
    iconBgColor,
    href,
    onClick,
    className,
    'data-testid': dataTestId,
  } = props;

  const classNames = getServiceCardClassNames(props);

  const iconStyle = !avatarSrc && iconBgColor ? { backgroundColor: iconBgColor } : undefined;

  const iconContent = avatarSrc ? (
    <img
      src={avatarSrc}
      alt=""
      width={44}
      height={44}
      className="service-card__avatar"
    />
  ) : (
    icon
  );

  const content = (
    <>
      <div className="service-card__icon-wrapper" style={iconStyle}>
        {iconContent}
      </div>
      <div className="service-card__content">
        <h3 className="service-card__title">{title}</h3>
        <p className="service-card__subtitle">{subtitle}</p>
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classNames}
        data-testid={dataTestId}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classNames}
      onClick={onClick}
      data-testid={dataTestId}
    >
      {content}
    </button>
  );
};

export default ServiceCard;
