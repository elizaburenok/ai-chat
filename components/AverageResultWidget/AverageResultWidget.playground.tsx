import React from 'react';
import { AverageResultWidget } from './AverageResultWidget';

/** Isolated preview — route via app playground if wired */
export function AverageResultWidgetPlayground(): React.ReactElement {
  return (
    <div style={{ padding: 'var(--spacing-m, 20px)', maxWidth: 360 }}>
      <AverageResultWidget gradeLabel="Хорошо справляется" dialogsCount={1} />
    </div>
  );
}

export default AverageResultWidgetPlayground;
