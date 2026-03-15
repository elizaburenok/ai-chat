import React from 'react';
import './DonutChart.css';

export interface DonutChartSegment {
  /** Label for this segment (e.g. for legend/accessibility) */
  label: string;
  /** Numeric value; proportions are calculated from sum of all segment values */
  value: number;
  /** Optional color (CSS value); defaults to category palette */
  color?: string;
  /** Optional text for legend (defaults to String(value)) */
  displayValue?: string;
}

export interface DonutChartProps {
  /** Array of segments to display */
  segments: DonutChartSegment[];
  /** Main text in center (Text XL) */
  centerValue?: string;
  /** Subtitle in center (Text S) */
  centerLabel?: string;
  /** Diameter in px (default 160) */
  size?: number;
  /** Show legend with colored dot, label, value (default true) */
  showLegend?: boolean;
  /** Legend position (default 'below') */
  legendPosition?: 'below' | 'right';
  /** Additional CSS class name */
  className?: string;
  /** HTML data attributes */
  'data-testid'?: string;
}

const DEFAULT_CATEGORY_COLORS = [
  'var(--color-primitive-success)',
  'var(--color-primitive-warning)',
  'var(--color-category-sand)',
  'var(--color-category-coral)',
  'var(--color-category-flamingo)',
  'var(--color-category-orchid)',
  'var(--color-category-amethyst)',
  'var(--color-category-indigo)',
];

export const DonutChart: React.FC<DonutChartProps> = ({
  segments,
  centerValue,
  centerLabel,
  size = 160,
  showLegend = true,
  legendPosition = 'below',
  className,
  'data-testid': dataTestId,
}) => {
  const strokeWidth = Math.max(12, size * 0.08);
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const total = segments.reduce((sum, s) => sum + s.value, 0);
  const hasData = total > 0;

  const getSegmentPaths = (): { offset: number; length: number; color: string }[] => {
    if (!hasData) return [];
    return segments.map((seg, i) => {
      const length = (seg.value / total) * circumference;
      const prevLength = segments
        .slice(0, i)
        .reduce((sum, s) => sum + (s.value / total) * circumference, 0);
      const color =
        seg.color ?? DEFAULT_CATEGORY_COLORS[i % DEFAULT_CATEGORY_COLORS.length];
      return { offset: -prevLength, length, color };
    });
  };

  const segmentPaths = getSegmentPaths();

  const getLegendColor = (seg: DonutChartSegment, i: number): string =>
    seg.color ?? DEFAULT_CATEGORY_COLORS[i % DEFAULT_CATEGORY_COLORS.length];

  return (
    <div
      className={`donut-chart donut-chart--legend-${legendPosition} ${className || ''}`}
      data-testid={dataTestId}
      style={showLegend && legendPosition === 'below' ? undefined : { width: size, height: size }}
      role="img"
      aria-label={
        hasData
          ? segments.map((s) => `${s.label}: ${s.value}`).join(', ')
          : 'Chart with no data'
      }
    >
      <div
        className="donut-chart__chart"
        style={{ width: size, height: size }}
      >
        <svg
        className="donut-chart__svg"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          {hasData ? (
            segmentPaths.map((path, i) => (
              <circle
                key={i}
                className="donut-chart__segment"
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={path.color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={`${path.length} ${circumference - path.length}`}
                strokeDashoffset={path.offset}
              />
            ))
          ) : (
            <circle
              className="donut-chart__ring donut-chart__ring--unfilled"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
          )}
        </g>
      </svg>
      <div className="donut-chart__center">
        {centerValue && <span className="donut-chart__center-value">{centerValue}</span>}
        {centerLabel && <span className="donut-chart__center-label">{centerLabel}</span>}
      </div>
      </div>

      {showLegend && segments.length > 0 && (
        <ul className="donut-chart__legend" aria-hidden="true">
          {segments.map((seg, i) => (
            <li key={i} className="donut-chart__legend-item">
              <span
                className="donut-chart__legend-dot"
                style={{ backgroundColor: getLegendColor(seg, i) }}
                aria-hidden="true"
              />
              <span className="donut-chart__legend-label">{seg.label}</span>
              <span className="donut-chart__legend-value">
                {seg.displayValue ?? String(seg.value)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DonutChart;
