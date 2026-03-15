import React, { useEffect, useRef, useState } from 'react';
import { typography } from '../../tokens';
import './Calendar.css';

export interface CalendarProps {
  /** Whether calendar is open */
  open?: boolean;
  /** Currently selected date */
  selectedDate?: Date | null;
  /** Callback when a date is selected */
  onSelect?: (date: Date) => void;
  /** Callback when calendar should close */
  onClose?: () => void;
  /** Initial month to display (defaults to today or selectedDate) */
  initialMonth?: Date;
}

// Russian month names (genitive case for "25 дек")
const MONTH_NAMES = [
  'янв', 'фев', 'мар', 'апр', 'май', 'июн',
  'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'
];

// Russian month names full (nominative case for header)
const MONTH_NAMES_FULL = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

// Weekday headers (Monday = 0)
const WEEKDAY_HEADERS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

/**
 * Normalize a date to midnight (start of day) for comparison
 */
function normalizeDate(date: Date): Date {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
}

/**
 * Check if two dates are on the same calendar day
 */
function isSameDay(date1: Date, date2: Date): boolean {
  const d1 = normalizeDate(date1);
  const d2 = normalizeDate(date2);
  return d1.getTime() === d2.getTime();
}

/**
 * Check if a date is today
 */
function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

/**
 * Get first day of month (0 = Monday, 6 = Sunday)
 * Adjust to Monday = 0, Sunday = 6
 */
function getFirstDayOfMonth(date: Date): number {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const day = firstDay.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  // Convert to Monday = 0, Sunday = 6
  return day === 0 ? 6 : day - 1;
}

/**
 * Get number of days in a month
 */
function getDaysInMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

/**
 * Check if a date is a weekend (Saturday or Sunday)
 */
function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6; // Sunday or Saturday
}

export const Calendar: React.FC<CalendarProps> = ({
  open = false,
  selectedDate,
  onSelect,
  onClose,
  initialMonth,
}) => {
  const calendarRef = useRef<HTMLDivElement>(null);
  
  // Current month being displayed
  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    if (initialMonth) return new Date(initialMonth.getFullYear(), initialMonth.getMonth(), 1);
    if (selectedDate) return new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  // Update current month when calendar opens or initialMonth/selectedDate changes
  useEffect(() => {
    if (open) {
      if (initialMonth) {
        setCurrentMonth(new Date(initialMonth.getFullYear(), initialMonth.getMonth(), 1));
      } else if (selectedDate) {
        setCurrentMonth(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
      }
    }
  }, [open, initialMonth, selectedDate]);

  // Handle click outside to close
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        onClose?.();
      }
    };

    // Handle Escape key
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, onClose]);

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  // Handle day click
  const handleDayClick = (day: number, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return; // Don't allow selecting days from other months
    
    const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    onSelect?.(clickedDate);
    onClose?.();
  };

  // Generate calendar grid
  const firstDay = getFirstDayOfMonth(currentMonth);
  const daysInMonth = getDaysInMonth(currentMonth);
  const currentYear = currentMonth.getFullYear();
  const currentMonthIndex = currentMonth.getMonth();
  
  const days: Array<{ day: number; isCurrentMonth: boolean; monthOffset: number }> = [];

  // Add days from previous month
  const prevMonth = new Date(currentYear, currentMonthIndex - 1, 0);
  const daysInPrevMonth = prevMonth.getDate();
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({ day: daysInPrevMonth - i, isCurrentMonth: false, monthOffset: -1 });
  }

  // Add days from current month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push({ day, isCurrentMonth: true, monthOffset: 0 });
  }

  // Add days from next month to fill the grid (6 rows = 42 cells)
  const remainingCells = 42 - days.length;
  for (let day = 1; day <= remainingCells; day++) {
    days.push({ day, isCurrentMonth: false, monthOffset: 1 });
  }

  const monthName = MONTH_NAMES_FULL[currentMonth.getMonth()];
  const year = currentMonth.getFullYear();

  if (!open) return null;

  return (
    <div ref={calendarRef} className="calendar">
      {/* Header */}
      <div className="calendar__header">
        <div className="calendar__month-section">
          <span className="calendar__month">{monthName}</span>
          <span className="calendar__chevron" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
        <div className="calendar__year">{year}</div>
      </div>

      {/* Navigation arrows */}
      <div className="calendar__navigation">
        <button
          type="button"
          className="calendar__nav-button calendar__nav-button--prev"
          onClick={goToPreviousMonth}
          aria-label="Предыдущий месяц"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.25 4.5L6.75 9L11.25 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          type="button"
          className="calendar__nav-button calendar__nav-button--next"
          onClick={goToNextMonth}
          aria-label="Следующий месяц"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.75 4.5L11.25 9L6.75 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="calendar__grid">
        {/* Weekday headers */}
        <div className="calendar__weekdays">
          {WEEKDAY_HEADERS.map((day, index) => (
            <div key={index} className="calendar__weekday">
              {day}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="calendar__days">
          {days.map(({ day, isCurrentMonth, monthOffset }, index) => {
            // Create date directly in the correct month to avoid auto-rollover issues
            // when the day number doesn't exist in the current month.
            // For example: new Date(2025, 1, 29) where month 1 is February (28 days)
            // would auto-roll to March 1, then setMonth(0) would make it January 1
            // instead of January 29. By creating directly in the target month, we avoid this.
            const date = new Date(currentYear, currentMonthIndex + monthOffset, day);
            
            const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
            const isTodayDate = isToday(date);
            const isWeekendDay = isWeekend(date);
            const dayMonth = date.getMonth();
            const dayMonthName = MONTH_NAMES_FULL[dayMonth];

            return (
              <button
                key={index}
                type="button"
                className={`calendar__day ${
                  !isCurrentMonth ? 'calendar__day--other-month' : ''
                } ${isSelected ? 'calendar__day--selected' : ''} ${
                  isTodayDate ? 'calendar__day--today' : ''
                } ${isWeekendDay ? 'calendar__day--weekend' : ''}`}
                onClick={() => handleDayClick(day, isCurrentMonth)}
                disabled={!isCurrentMonth}
                aria-label={`${day} ${dayMonthName} ${date.getFullYear()}`}
                aria-selected={isSelected}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
