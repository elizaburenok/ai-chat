import React from 'react';
import styles from './ServiceCard.module.css';

export interface ServiceCardProps {
  title: string;
  description: string;
  /** Imported SVG URL from @avatar-icons/services/Services/ (44×44 asset) */
  iconSrc: string;
  /** Figma layer name on the avatar node, e.g. Services/Skills */
  figmaLayerName?: string;
  onClick?: () => void;
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  iconSrc,
  figmaLayerName,
  onClick,
  className,
}) => {
  const interactive = Boolean(onClick);
  const rootClass = [
    styles.root,
    interactive ? styles.rootInteractive : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      <div className={styles.iconWrap}>
        <img
          src={iconSrc}
          alt=""
          width={44}
          height={44}
          className={styles.icon}
          data-figma-layer={figmaLayerName}
          aria-hidden
        />
      </div>
      <div className={styles.text}>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{description}</p>
      </div>
    </>
  );

  if (interactive) {
    return (
      <button type="button" className={rootClass} onClick={onClick}>
        {content}
      </button>
    );
  }

  return <div className={rootClass}>{content}</div>;
};
