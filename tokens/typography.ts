/**
 * Typography Design Tokens
 * Based on Figma variables structure
 */

export const typography = {
  fontFamily: {
    primary: '"TT Norms Tochka Extended", sans-serif',
  },
  
  fontWeights: {
    regular: 400,
    medium: 500,
    demiBold: 600,
  },
  
  fontSizes: {
    xs: '12px',
    m: '16px',
  },
  
  lineHeights: {
    xs: '15px',
    m: '20px',
  },
  
  letterSpacing: {
    xs: '0.12px', // 1px at 12px = 0.12px
    m: '0.16px',  // 1px at 16px = 0.16px
  },
  
  // Predefined text styles matching Figma variables
  styles: {
    'TTN-500-M-01': {
      fontFamily: '"TT Norms Tochka Extended", sans-serif',
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '20px',
      letterSpacing: '0.16px',
    },
    'TTN-600-XS-01': {
      fontFamily: '"TT Norms Tochka Extended", sans-serif',
      fontWeight: 600,
      fontSize: '12px',
      lineHeight: '15px',
      letterSpacing: '0.12px',
    },
    'TTN-600-XL-01':{
      fontFamily: '"TT Norms Tochka Extended", sans-serif',
      fontWeight: 600,
      fontSize: '20px',
      lineHeight: '26px',
      letterSpacing: '0px',
    },
    'TTN-400-XS-01': {
      fontFamily: '"TT Norms Tochka Extended", sans-serif',
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '15px',
      letterSpacing: '0.12px',
    },
  },
} as const;

export type TypographyToken = typeof typography;

