import React, { useState, useRef, useEffect } from 'react';
import { typography } from '../../tokens';
import './SearchInput.css';

export type SearchInputSize = 's' | 'm' | 'l';
export type SearchInputVariant = 'default' | 'filled';

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Size of the input */
  size?: SearchInputSize;
  /** Visual variant */
  variant?: SearchInputVariant;
  /** Placeholder text */
  placeholder?: string;
  /** Show clear button when input has value */
  showClearButton?: boolean;
  /** Show loading spinner */
  loading?: boolean;
  /** Error state */
  error?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Label text */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Icon before input */
  iconLeft?: React.ReactNode;
  /** Icon after input (before clear button) */
  iconRight?: React.ReactNode;
  /** Callback when clear button is clicked */
  onClear?: () => void;
  /** Callback when value changes */
  onValueChange?: (value: string) => void;
  /** Additional CSS class name */
  className?: string;
  /** HTML data attributes */
  'data-testid'?: string;
}

export const SearchInput: React.FC<SearchInputProps> = (props: SearchInputProps) => {
  const {
    size = 'm',
    variant = 'default',
    placeholder = 'Поиск...',
    showClearButton = true,
    loading = false,
    error = false,
    errorMessage,
    label,
    helperText,
    iconLeft,
    iconRight,
    onClear,
    onValueChange,
    className,
    value: controlledValue,
    defaultValue,
    onChange,
    disabled,
    'data-testid': dataTestId,
    ...inputProps
  } = props;

  const [internalValue, setInternalValue] = useState<string>(
    typeof defaultValue === 'string' ? defaultValue : ''
  );
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  const hasValue = typeof value === 'string' && value.length > 0;
  const showClear = showClearButton && hasValue && !loading && !disabled;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    if (!isControlled) {
      setInternalValue(newValue);
    }
    
    onChange?.(e);
    onValueChange?.(newValue);
  };

  const handleClear = () => {
    if (inputRef.current) {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value'
      )?.set;
      
      if (nativeInputValueSetter) {
        nativeInputValueSetter.call(inputRef.current, '');
      }
      
      const event = new Event('input', { bubbles: true });
      inputRef.current.dispatchEvent(event);
    }
    
    if (!isControlled) {
      setInternalValue('');
    }
    
    onClear?.();
    onValueChange?.('');
    inputRef.current?.focus();
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };

  const classNames = [
    'search-input',
    `search-input--size-${size}`,
    `search-input--variant-${variant}`,
    isFocused && 'search-input--focused',
    error && 'search-input--error',
    disabled && 'search-input--disabled',
    loading && 'search-input--loading',
    hasValue && 'search-input--has-value',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="search-input-wrapper" data-testid={dataTestId}>
      {label && (
        <label className="search-input-label" htmlFor={inputProps.id}>
          {label}
        </label>
      )}
      
      <div className={classNames}>
        {iconLeft && (
          <span className="search-input__icon search-input__icon--left" aria-hidden="true">
            {iconLeft}
          </span>
        )}
        
        <input
          ref={inputRef}
          type="search"
          className="search-input__field"
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...inputProps}
        />
        
        {loading && (
          <span className="search-input__spinner" aria-hidden="true" aria-label="Загрузка">
            <svg
              className="search-input__spinner-svg"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="search-input__spinner-circle"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="32"
                strokeDashoffset="32"
              >
                <animate
                  attributeName="stroke-dasharray"
                  dur="2s"
                  values="0 32;16 16;0 32;0 32"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-dashoffset"
                  dur="2s"
                  values="0;-16;-32;-32"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </span>
        )}
        
        {!loading && iconRight && (
          <span className="search-input__icon search-input__icon--right" aria-hidden="true">
            {iconRight}
          </span>
        )}
        
        {showClear && (
          <button
            type="button"
            className="search-input__clear"
            onClick={handleClear}
            aria-label="Очистить поиск"
            tabIndex={-1}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4L4 12M4 4l8 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
      
      {(errorMessage || helperText) && (
        <div className="search-input__message">
          {error && errorMessage && (
            <span className="search-input__error-message">{errorMessage}</span>
          )}
          {!error && helperText && (
            <span className="search-input__helper-text">{helperText}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;


