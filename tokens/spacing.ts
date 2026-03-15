/**
 * Spacing Design Tokens
 * Based on Figma variables structure
 * Base unit: 4px
 */

export const spacing = {
  base: 4, // Base unit in pixels
  
  // Direct spacing values
  '1x': '4px',
  '6x': '24px',
  '8x': '32px',
  '12x': '48px',
  
  // Semantic spacing names
  xs: '4px',   // 1x
  sm: '24px',  // 6x
  md: '32px',  // 8x
  lg: '48px',  // 12x
} as const;

// Helper function to calculate spacing
export const getSpacing = (multiplier: number): string => {
  return `${spacing.base * multiplier}px`;
};

export type SpacingToken = typeof spacing;

