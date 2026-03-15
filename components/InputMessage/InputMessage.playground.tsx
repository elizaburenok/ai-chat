import React, { useState } from 'react';
import { InputMessage } from './InputMessage';

/**
 * Playground for InputMessage — test all Figma variants in isolation.
 * Route: /playground/input-message
 */
export function InputMessagePlayground(): React.ReactElement {
  const [lastSent, setLastSent] = useState<string>('');

  return (
    <div style={{ padding: '24px', maxWidth: '640px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ marginBottom: '8px', fontSize: '20px', fontWeight: 600 }}>InputMessage — Playground</h1>
      <p style={{ color: '#676767', marginBottom: '24px', fontSize: '14px' }}>
        Variants: empty / has text, send active / disabled.
      </p>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600, color: '#191919' }}>
          1. Empty
        </h2>
        <InputMessage placeholder="Сообщение..." onSend={setLastSent} />
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600, color: '#191919' }}>
          2. With text, send active
        </h2>
        <InputMessage defaultValue="Text M" onSend={setLastSent} />
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600, color: '#191919' }}>
          3. With text, send disabled
        </h2>
        <InputMessage defaultValue="Text M" sendDisabled onSend={setLastSent} />
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600, color: '#191919' }}>
          4. Disabled
        </h2>
        <InputMessage defaultValue="Text M" disabled onSend={setLastSent} />
      </section>

      {lastSent && (
        <p style={{ marginTop: '16px', padding: '12px', background: '#efedf8', borderRadius: '8px', fontSize: '14px' }}>
          Last sent: <strong>{lastSent}</strong>
        </p>
      )}
    </div>
  );
}

export default InputMessagePlayground;
