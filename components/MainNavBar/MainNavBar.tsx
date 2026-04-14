import React from 'react';
import styles from './MainNavBar.module.css';

/** TUI Universal Filled/House — 24px */
const HomeIcon = () => (
  <svg className={styles.navIcon} viewBox="0 0 24 24" aria-hidden>
    <path
      fill="currentColor"
      d="M10 20v-6h4v6h5v-10h3L12 3 2 12h3v8z"
    />
  </svg>
);

/** TUI Universal Filled/Layout Stack Vertical Rounded — 24px */
const TasksIcon = () => (
  <svg className={styles.navIcon} viewBox="0 0 24 24" aria-hidden>
    <rect x="3" y="4" width="18" height="4" rx="2" fill="currentColor" />
    <rect x="3" y="10" width="18" height="4" rx="2" fill="currentColor" />
    <rect x="3" y="16" width="18" height="4" rx="2" fill="currentColor" />
  </svg>
);

/** TUI Universal Filled/Magnifier — 24px (solid lens + handle) */
const SearchIcon = () => (
  <svg className={styles.navIcon} viewBox="0 0 24 24" aria-hidden>
    <path
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
    />
  </svg>
);

/** TUI Universal Filled/Lightning — 24px */
const ServicesIcon = () => (
  <svg className={styles.navIcon} viewBox="0 0 24 24" aria-hidden>
    <path fill="currentColor" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

/** Stroked 2px/Face Authentication — 24px */
const FaceIcon = () => (
  <svg className={styles.actionIconSvg} viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path
      d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

/** Stroked 2px/Gear — 24px */
const GearIcon = () => (
  <svg className={styles.actionIconSvg} viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    <path
      d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

/** Bell — optional notifications slot (Figma showNotifications) */
const NotificationsIcon = () => (
  <svg className={styles.actionIconSvg} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M18 8a6 6 0 10-12 0c0 7-3 7-3 7h18s-3 0-3-7M13.73 21a2 2 0 01-3.46 0"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export type MainNavBarType = 'Desktop' | 'Mobile';

export interface MainNavBarProps {
  logoText?: string;
  userName?: string;
  userInitials?: string;
  activeNavId?: string;
  onNavClick?: (id: string) => void;
  onSettingsClick?: () => void;
  className?: string;
  /** Figma / Code Connect — dot under active nav item */
  isIndicator?: boolean;
  /** Reserved for extra trailing action (Figma); hidden when false */
  showAdditionalIcon?: boolean;
  showSettings?: boolean;
  /** Face / «личный кабинет» icon */
  showMimicry?: boolean;
  showNotifications?: boolean;
  type?: MainNavBarType;
}

const NAV_ITEMS = [
  { id: 'home', label: 'Главная', icon: HomeIcon },
  { id: 'tasks', label: 'Задачи', icon: TasksIcon },
  { id: 'search', label: 'Поиск', icon: SearchIcon },
  { id: 'services', label: 'Сервисы', icon: ServicesIcon },
];

export const MainNavBar: React.FC<MainNavBarProps> = ({
  logoText = 'афина',
  userName = 'Бурлин Александр',
  userInitials = 'БА',
  activeNavId = 'home',
  onNavClick,
  onSettingsClick,
  className,
  isIndicator = false,
  showSettings = true,
  showMimicry = true,
  showNotifications = false,
}) => (
  <header
    className={`${styles.root} ${isIndicator ? styles.rootIndicator : ''} ${className || ''}`}
    role="banner"
  >
    <div className={styles.logo}>
      <span className={styles.logoText}>{logoText}</span>
    </div>
    <nav className={styles.nav} aria-label="Основная навигация">
      {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          className={styles.navButton}
          onClick={() => onNavClick?.(id)}
          aria-current={activeNavId === id ? 'page' : undefined}
        >
          <Icon />
          {label}
        </button>
      ))}
    </nav>
    <div className={styles.userBlock}>
      <div className={styles.userInfo}>
        <div className={styles.avatar} aria-hidden>
          {userInitials}
        </div>
        <span className={styles.userName}>{userName}</span>
      </div>
      <div className={styles.actions}>
        {showMimicry ? (
          <button type="button" className={styles.actionIcon} aria-label="Личный кабинет">
            <FaceIcon />
          </button>
        ) : null}
        {showNotifications ? (
          <button type="button" className={styles.actionIcon} aria-label="Уведомления">
            <NotificationsIcon />
          </button>
        ) : null}
        {showSettings ? (
          <button type="button" className={styles.actionIcon} onClick={onSettingsClick} aria-label="Настройки">
            <GearIcon />
          </button>
        ) : null}
      </div>
    </div>
  </header>
);
