import React from 'react';
import { VerticalMarker, type VerticalMarkerProps, type ProgressLevel } from '../VerticalMarker';
import './BarGraph.css';

export interface BarGraphDataPoint {
  /** Label text displayed below the bar (X-axis label) */
  label: string;
  /** Progress level for bar height (0-100%) */
  progressLevel: ProgressLevel;
  /** Bar width size variant */
  size?: VerticalMarkerProps['size'];
  /** Number of bars (1 or 2) */
  quantity?: VerticalMarkerProps['quantity'];
  /** Visual state */
  state?: VerticalMarkerProps['state'];
  /** Show segmented bars with category colors */
  isSegmented?: boolean;
  /** Show saldo-style bars (split with empty space) */
  isSaldo?: boolean;
  /** Show hover overlay */
  isHover?: boolean;
  /** Click handler for this data point */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  /** Mouse enter handler for this data point */
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  /** Mouse leave handler for this data point */
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}

export interface BarGraphProps {
  /** Array of data points to display */
  data: BarGraphDataPoint[];
  /** Y-axis legend labels (e.g., ["100%", "75%", "50%", "25%", "0%"]) */
  yAxisLabels?: string[];
  /** Show grid lines */
  showGrid?: boolean;
  /** Number of grid lines (defaults to yAxisLabels length if not provided) */
  gridLineCount?: number;
  /** Additional CSS class name */
  className?: string;
  /** HTML data attributes */
  'data-testid'?: string;
}

export const BarGraph: React.FC<BarGraphProps> = ({
  data,
  yAxisLabels = ['100%', '75%', '50%', '25%', '0%'],
  showGrid = true,
  gridLineCount,
  className,
  'data-testid': dataTestId,
}) => {
  const gridLines = gridLineCount ?? yAxisLabels.length;

  // Calculate grid line positions (evenly distributed from top to bottom)
  const getGridLinePosition = (index: number, total: number): string => {
    if (total <= 1) return '0%';
    return `${(index / (total - 1)) * 100}%`;
  };

  return (
    <div
      className={`bar-graph ${className || ''}`}
      data-testid={dataTestId}
    >
      {/* Y-axis Legend */}
      <div className="bar-graph__y-axis">
        {yAxisLabels.map((label, index) => (
          <span key={index} className="bar-graph__y-axis-label">
            {label}
          </span>
        ))}
      </div>

      {/* Main content area with grid and bars */}
      <div className="bar-graph__content">
        {/* Grid lines */}
        {showGrid && gridLines > 0 && (
          <div className="bar-graph__grid">
            {Array.from({ length: gridLines }).map((_, index) => (
              <div
                key={index}
                className="bar-graph__grid-line"
                style={{
                  top: getGridLinePosition(index, gridLines),
                }}
              />
            ))}
          </div>
        )}

        {/* Bars container */}
        <div className="bar-graph__bars">
          {data.map((dataPoint, index) => (
            <VerticalMarker
              key={index}
              text={dataPoint.label}
              progressLevel={dataPoint.progressLevel}
              size={dataPoint.size}
              quantity={dataPoint.quantity}
              state={dataPoint.state}
              isSegmented={dataPoint.isSegmented}
              isSaldo={dataPoint.isSaldo}
              isHover={dataPoint.isHover}
              onClick={dataPoint.onClick}
              onMouseEnter={dataPoint.onMouseEnter}
              onMouseLeave={dataPoint.onMouseLeave}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BarGraph;

