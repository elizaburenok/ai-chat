import React from 'react';
import styles from './MainNavBar.module.css';

const HomeIcon = () => (
  <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TasksIcon = () => (
  <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M4 6h16M4 10h16M4 14h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const SearchIcon = () => (
  <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
    <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ServicesIcon = () => (
  <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FaceIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const GearIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export interface MainNavBarProps {
  logoText?: string;
  userName?: string;
  userInitials?: string;
  activeNavId?: string;
  onNavClick?: (id: string) => void;
  onSettingsClick?: () => void;
  className?: string;
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
}) => (
  <header className={`${styles.root} ${className || ''}`} role="banner">
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
        <div className={styles.avatar} aria-hidden>{userInitials}</div>
        <span className={styles.userName}>{userName}</span>
      </div>
      <div className={styles.actions}>
        <button type="button" className={styles.actionIcon} aria-label="Личный кабинет">
          <FaceIcon />
        </button>
        <button type="button" className={styles.actionIcon} onClick={onSettingsClick} aria-label="Настройки">
          <GearIcon />
        </button>
      </div>
    </div>
  </header>
);
