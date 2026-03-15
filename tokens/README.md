# Design Tokens

This directory contains all design tokens extracted from Figma variables.

## Structure

```
tokens/
├── colors.ts          # Color tokens (Primitive, Bg, Container, Page, Overlay)
├── typography.ts      # Typography tokens (fonts, sizes, weights, line heights)
├── spacing.ts         # Spacing tokens (based on 4px base unit)
├── rounding.ts        # Border radius tokens
├── index.ts           # Central export for all tokens
├── css-variables.css  # CSS custom properties for tokens
└── README.md          # This file
```

## Usage

### TypeScript/JavaScript

```typescript
import { colors, typography, spacing, rounding } from './tokens';

// Use colors
const primaryColor = colors.primitive.primary; // '#191919'

// Use typography
const textStyle = typography.styles['TTN-500-M-01'];

// Use spacing
const padding = spacing['1x']; // '4px'

// Use rounding
const borderRadius = rounding['1x']; // '4px'

// Or use the combined tokens object
import { tokens } from './tokens';
const brandColor = tokens.colors.bg.brand;
```

### CSS Variables

First, import the CSS file:

```typescript
import './tokens/css-variables.css';
```

Then use in your CSS:

```css
.my-component {
  color: var(--color-primitive-primary);
  padding: var(--spacing-1x);
  border-radius: var(--rounding-1x);
  font-family: var(--font-family-primary);
}
```

### React Styled Components / Emotion

```typescript
import styled from 'styled-components';
import { colors, spacing, rounding } from './tokens';

const Button = styled.button`
  background-color: ${colors.bg.brand};
  color: ${colors.primitive.primaryOnInverse};
  padding: ${spacing['1x']} ${spacing['6x']};
  border-radius: ${rounding['1x']};
`;
```

### React Inline Styles

```typescript
import { colors, spacing, typography } from './tokens';

const MyComponent = () => (
  <div
    style={{
      color: colors.primitive.primary,
      padding: spacing['1x'],
      ...typography.styles['TTN-500-M-01'],
    }}
  >
    Hello World
  </div>
);
```

## Token Categories

### Colors

- **Primitive**: Core colors for text and UI elements
  - Primary, Secondary, Neutral (1-4), Default, Brand, Error, Success, Warning
  - Each has variants: Fixed, On Inverse
  
- **Bg**: Background colors
  - Neutral (1-5), Default, Inverse, Brand (1-5)
  
- **Container**: Container-specific colors
  - Default, Transparent variants
  
- **Page**: Page-level background colors
  - Primary, Secondary
  
- **Overlay**: Overlay and modal colors
  - Popup, Alpha variants

### Typography

- **Font Family**: TT Norms Tochka Extended
- **Font Weights**: Regular (400), Medium (500), DemiBold (600)
- **Font Sizes**: XS (12px), M (16px)
- **Predefined Styles**: 
  - TTN-500-M-01 (Medium, 16px)
  - TTN-600-XS-01 (DemiBold, 12px)
  - TTN-400-XS-01 (Regular, 12px)

### Spacing

Based on 4px base unit:
- 1x: 4px
- 6x: 24px
- 8x: 32px
- 12x: 48px

### Rounding

Based on 4px base unit:
- 1x: 4px

## Helper Functions

### Spacing

```typescript
import { getSpacing } from './tokens/spacing';

const customSpacing = getSpacing(10); // '40px' (10 * 4px)
```

### Rounding

```typescript
import { getRounding } from './tokens/rounding';

const customRounding = getRounding(2); // '8px' (2 * 4px)
```

## Type Safety

All tokens are typed with TypeScript. You can import types:

```typescript
import type { ColorToken, TypographyToken, SpacingToken, RoundingToken } from './tokens';
```

## Notes

- All color values match Figma variables exactly
- Fixed variants don't change with theme switching
- On Inverse variants are for use on dark/inverse backgrounds
- Alpha values are converted from hex with alpha to rgba format
- Spacing and rounding use a 4px base unit multiplier system

