import React from 'react';
import { DonutChart } from './DonutChart';

/**
 * Playground for DonutChart — test Figma variants in isolation.
 * Route: /playground/donut-chart
 */
export function DonutChartPlayground(): React.ReactElement {
  return (
    <div
      style={{
        padding: '24px',
        maxWidth: '640px',
        margin: '0 auto',
        fontFamily: 'var(--font-family-primary)',
      }}
    >
      <h1 style={{ marginBottom: '8px', fontSize: '20px', fontWeight: 600 }}>
        DonutChart — Playground
      </h1>
      <p style={{ color: '#676767', marginBottom: '24px', fontSize: '14px' }}>
        Variants: unfilled / filled / legend below (Bank Patterns).
      </p>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600, color: '#191919' }}>
          1. Unfilled (empty state)
        </h2>
        <DonutChart
          segments={[]}
          centerValue="—"
          centerLabel="Нет данных"
          size={160}
          showLegend={false}
        />
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600, color: '#191919' }}>
          2. Filled with legend below (Bank Patterns)
        </h2>
        <DonutChart
          segments={[
            { label: 'Успешно', value: 50, color: 'var(--color-primitive-success)', displayValue: '50' },
            { label: 'На доработку', value: 50, color: 'var(--color-primitive-warning)', displayValue: '50' },
          ]}
          centerValue="50"
          centerLabel="средний балл"
          size={160}
          showLegend
          legendPosition="below"
        />
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600, color: '#191919' }}>
          3. Three blocks with legend below
        </h2>
        <DonutChart
          segments={[
            { label: 'База знаний', value: 82, color: 'var(--color-primitive-success)', displayValue: '82' },
            { label: 'Общий тон ответов и соответствие Tone of Voice', value: 87, color: 'var(--color-primitive-warning)', displayValue: '87' },
            { label: 'Соблюдение орфографических норм', value: 80, color: 'var(--color-category-sand)', displayValue: '80' },
          ]}
          centerValue="83"
          centerLabel="средний балл"
          size={160}
          showLegend
          legendPosition="below"
        />
      </section>
    </div>
  );
}

export default DonutChartPlayground;
