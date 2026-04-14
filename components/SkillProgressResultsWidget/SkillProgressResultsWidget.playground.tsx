import React from 'react';
import { SkillProgressResultsWidget } from './SkillProgressResultsWidget';

/** Isolated preview — route via app playground if wired */
export function SkillProgressResultsWidgetPlayground(): React.ReactElement {
  return (
    <div style={{ padding: 'var(--spacing-m, 20px)', maxWidth: 360 }}>
      <SkillProgressResultsWidget topicTitle="Тариф" onViewDialog={() => {}} />
    </div>
  );
}

export default SkillProgressResultsWidgetPlayground;
