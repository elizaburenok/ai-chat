import React from 'react';
import styles from './IncompleteDialogRecoveryModal.module.css';

export interface IncompleteDialogRecoveryModalProps {
  /** When true, shows spinner in footer (e.g. async cancel) */
  cancelLoading?: boolean;
  onContinue: () => void;
  onStartNew: () => void;
  onCancel: () => void;
}

function IconRedo() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M8 12a8 8 0 1 1 2.34 5.66"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 5v7h7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPlayCircle() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx="15" cy="15" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M13 11l6 4-6 4V11z" fill="currentColor" />
    </svg>
  );
}

function Spinner24() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="42"
        strokeDashoffset="12"
        opacity="0.35"
      />
      <path
        d="M12 3a9 9 0 0 1 9 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IncompleteDialogRecoveryModal({
  cancelLoading = false,
  onContinue,
  onStartNew,
  onCancel,
}: IncompleteDialogRecoveryModalProps) {
  return (
    <div
      className={styles.overlay}
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div
        className={styles.sheet}
        role="dialog"
        aria-modal="true"
        aria-labelledby="incomplete-dialog-recovery-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <p id="incomplete-dialog-recovery-title" className={styles.title}>
            Диалог не был завершен. Продолжить дальше или начать новый?
          </p>
        </div>

        <button type="button" className={styles.actionRow} onClick={onStartNew}>
          <span className={styles.iconWrap}>
            <IconRedo />
          </span>
          <span className={styles.actionLabel}>Начать новый</span>
        </button>

        <button type="button" className={styles.actionRow} onClick={onContinue}>
          <span className={styles.iconWrap}>
            <IconPlayCircle />
          </span>
          <span className={styles.actionLabel}>Продолжить</span>
        </button>

        <div className={styles.footer}>
          <button type="button" className={styles.footerCancel} onClick={onCancel} disabled={cancelLoading}>
            Отмена
          </button>
          <span
            className={`${styles.footerSpinner} ${cancelLoading ? styles.footerSpinnerVisible : ''}`}
            aria-hidden={!cancelLoading}
          >
            <Spinner24 />
          </span>
        </div>
      </div>
    </div>
  );
}
