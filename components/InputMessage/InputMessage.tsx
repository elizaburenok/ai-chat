import React, { useState, useCallback, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import styles from './InputMessage.module.css';

export interface InputMessageProps {
  /** Current value (controlled) */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Placeholder when empty */
  placeholder?: string;
  /** When true, sending via Enter is blocked (e.g. validation, loading) */
  sendDisabled?: boolean;
  /** Input and actions disabled */
  disabled?: boolean;
  /** Callback when value changes */
  onValueChange?: (value: string) => void;
  /** Called when the user sends the message (Enter without Shift) */
  onSend?: (value: string) => void;
  /** Additional class name */
  className?: string;
  /** Accessible name for the editor */
  ariaLabel?: string;
  /** HTML data attribute */
  'data-testid'?: string;
}

export const InputMessage: React.FC<InputMessageProps> = (props) => {
  const {
    value: controlledValue,
    defaultValue = '',
    placeholder = 'Сообщение...',
    sendDisabled = false,
    disabled = false,
    onValueChange,
    onSend,
    className,
    ariaLabel = 'Сообщение',
    'data-testid': dataTestId,
  } = props;

  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  // Treat value as HTML, determine if there is any visible text content
  const plainText = value.replace(/<[^>]+>/g, '');
  const hasText = plainText.trim().length > 0;
  const canSend = hasText && !sendDisabled && !disabled;

  const editorRef = useRef<HTMLDivElement | null>(null);

  // Keep the DOM in sync with the React value
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    const nextHtml = value || '';
    if (editor.innerHTML !== nextHtml) {
      editor.innerHTML = nextHtml;
    }
  }, [value]);

  const updateFromEditor = useCallback(() => {
    const editor = editorRef.current;
    if (!editor) return;
    // Normalize tags to use <strong>/<em> instead of <b>/<i>
    let html = editor.innerHTML;
    html = html
      .replace(/<b(\s|>)/gi, '<strong$1')
      .replace(/<\/b>/gi, '</strong>')
      .replace(/<i(\s|>)/gi, '<em$1')
      .replace(/<\/i>/gi, '</em>');
    if (editor.innerHTML !== html) {
      editor.innerHTML = html;
    }

    if (!isControlled) {
      setInternalValue(html);
    }
    onValueChange?.(html);
  }, [isControlled, onValueChange]);

  const handleInput = useCallback(() => {
    updateFromEditor();
  }, [updateFromEditor]);

  const handleSend = useCallback(() => {
    if (!canSend) return;
    onSend?.(value);
  }, [canSend, value, onSend]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLDivElement>) => {
    // Paste as plain text to avoid bringing arbitrary HTML
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    if (!document || !window.getSelection) return;
    document.execCommand('insertText', false, text);
    // execCommand mutates DOM, reflect in state
    updateFromEditor();
  }, [updateFromEditor]);

  const applyCommand = useCallback(
    (command: 'bold' | 'underline' | 'insertUnorderedList') => {
      if (disabled) return;
      const editor = editorRef.current;
      if (!editor) return;

      editor.focus();
      document.execCommand(command, false);
      updateFromEditor();
    },
    [disabled, updateFromEditor]
  );

  const handleBoldClick = useCallback(() => applyCommand('bold'), [applyCommand]);
  const handleUnderlineClick = useCallback(() => applyCommand('underline'), [applyCommand]);
  const handleBulletClick = useCallback(
    () => applyCommand('insertUnorderedList'),
    [applyCommand]
  );

  const handleLinkClick = useCallback(() => {
    if (disabled) return;
    const editor = editorRef.current;
    if (!editor) return;
    editor.focus();
    const url = window.prompt('Введите URL');
    if (!url?.trim()) {
      updateFromEditor();
      return;
    }
    document.execCommand('createLink', false, url.trim());
    updateFromEditor();
  }, [disabled, updateFromEditor]);

  const rootClassName = cn(
    styles.root,
    disabled && styles.rootDisabled,
    className
  );

  return (
    <div className={rootClassName} data-testid={dataTestId}>
      <div className={styles.inner}>
        <div
          ref={editorRef}
          className={styles.field}
          contentEditable={!disabled}
          data-placeholder={placeholder}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          aria-label={ariaLabel}
          suppressContentEditableWarning
        />

        <div className={styles.divider} aria-hidden />
        <div className={styles.toolbar} aria-hidden={disabled}>
          <button
            type="button"
            className={styles.toolbarButton}
            onClick={handleBoldClick}
            onMouseDown={(e) => e.preventDefault()}
            disabled={disabled}
            aria-label="Полужирный"
          >
            <ToolbarIconBold />
          </button>
          <button
            type="button"
            className={styles.toolbarButton}
            onClick={handleUnderlineClick}
            onMouseDown={(e) => e.preventDefault()}
            disabled={disabled}
            aria-label="Подчёркивание"
          >
            <ToolbarIconUnderline />
          </button>
          <button
            type="button"
            className={styles.toolbarButton}
            onClick={handleBulletClick}
            onMouseDown={(e) => e.preventDefault()}
            disabled={disabled}
            aria-label="Маркированный список"
          >
            <ToolbarIconList />
          </button>
          <button
            type="button"
            className={styles.toolbarButton}
            onClick={handleLinkClick}
            onMouseDown={(e) => e.preventDefault()}
            disabled={disabled}
            aria-label="Ссылка"
          >
            <ToolbarIconLink />
          </button>
        </div>
      </div>
    </div>
  );
};

function ToolbarIconBold() {
  return (
    <svg className={styles.toolbarIcon} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M5 4.5h5.5a3.5 3.5 0 0 1 0 7H5V4.5zm0 7h6a3.5 3.5 0 0 1 0 7H5v-7z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ToolbarIconUnderline() {
  return (
    <svg className={styles.toolbarIcon} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M5 4v6a5 5 0 0 0 10 0V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 17h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ToolbarIconList() {
  return (
    <svg className={styles.toolbarIcon} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M7 5h10M7 10h10M7 15h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 5h.01M4 10h.01M4 15h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ToolbarIconLink() {
  return (
    <svg className={styles.toolbarIcon} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M8.5 11.5A3 3 0 0 1 6 7.5a3 3 0 0 1 4.24-4.24l1.06 1.06M11.5 8.5A3 3 0 0 1 14 12.5a3 3 0 0 1-4.24 4.24l-1.06-1.06"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default InputMessage;
