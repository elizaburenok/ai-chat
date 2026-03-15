/**
 * Rounding (Border Radius) Design Tokens
 * Based on Figma variables structure
 */

export const rounding = {
  base: 4, // Base unit in pixels
  
  // Direct rounding values
  '1x': '4px',
  
  // Semantic rounding names
  sm: '4px', // 1x
} as const;

// Helper function to calculate rounding
export const getRounding = (multiplier: number): string => {
  return `${rounding.base * multiplier}px`;
};

export type RoundingToken = typeof rounding;

