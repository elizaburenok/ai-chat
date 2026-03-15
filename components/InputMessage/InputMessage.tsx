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
  /** Send button disabled (e.g. validation, loading) */
  sendDisabled?: boolean;
  /** Input and actions disabled */
  disabled?: boolean;
  /** Callback when value changes */
  onValueChange?: (value: string) => void;
  /** Callback when send is clicked */
  onSend?: (value: string) => void;
  /** Additional class name */
  className?: string;
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
    (command: 'bold' | 'italic' | 'insertUnorderedList' | 'insertOrderedList') => {
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
  const handleItalicClick = useCallback(() => applyCommand('italic'), [applyCommand]);
  const handleBulletClick = useCallback(
    () => applyCommand('insertUnorderedList'),
    [applyCommand]
  );
  const handleNumberedClick = useCallback(
    () => applyCommand('insertOrderedList'),
    [applyCommand]
  );

  const showSend = hasText;

  const rootClassName = cn(
    styles.root,
    disabled && styles.rootDisabled,
    className
  );

  return (
    <div className={rootClassName} data-testid={dataTestId}>
      <div className={styles.inner}>
        <div className={styles.editorRow}>
          <div
            ref={editorRef}
            className={styles.field}
            contentEditable={!disabled}
            data-placeholder={placeholder}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            aria-label="Сообщение"
            suppressContentEditableWarning
          />

          <div className={styles.suffix}>
            {showSend && (
              <button
                type="button"
                className={styles.send}
                onClick={handleSend}
                disabled={!canSend}
                aria-label="Отправить"
              >
                <SendIcon />
              </button>
            )}
          </div>
        </div>

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
            B
          </button>
          <button
            type="button"
            className={styles.toolbarButton}
            onClick={handleItalicClick}
            onMouseDown={(e) => e.preventDefault()}
            disabled={disabled}
            aria-label="Курсив"
          >
            I
          </button>
          <button
            type="button"
            className={styles.toolbarButton}
            onClick={handleBulletClick}
            onMouseDown={(e) => e.preventDefault()}
            disabled={disabled}
            aria-label="Маркированный список"
          >
            •
          </button>
          <button
            type="button"
            className={styles.toolbarButton}
            onClick={handleNumberedClick}
            onMouseDown={(e) => e.preventDefault()}
            disabled={disabled}
            aria-label="Нумерованный список"
          >
            1.
          </button>
        </div>
      </div>
    </div>
  );
};

function SendIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M10 16V4M4 10l6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default InputMessage;
