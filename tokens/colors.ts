/**
 * Color Design Tokens
 * Based on Figma variables structure
 */

export const colors = {
  primitive: {
    primary: '#191919',
    primaryFixed: '#191919',
    primaryOnInverse: '#ffffff',
    primaryOnInverseFixed: '#ffffff',
    
    secondary: '#676767',
    secondaryFixed: '#676767',
    secondaryOnInverse: '#aeaeae',
    secondaryOnInverseFixed: '#aeaeae',
    
    neutral4: '#949494',
    neutral4Fixed: '#949494',
    neutral4OnInverse: '#777777',
    neutral4OnInverseFixed: '#777777',
    
    neutral3: '#c8c8c8',
    neutral3Fixed: '#c8c8c8',
    neutral3OnInverse: '#5e5e5e',
    neutral3OnInverseFixed: '#5e5e5e',
    
    neutral2: '#d4d4d4',
    neutral2Fixed: '#d4d4d4',
    neutral2OnInverse: '#525252',
    neutral2OnInverseFixed: '#525252',
    
    neutral1: '#e1e1e1',
    neutral1Fixed: '#e1e1e1',
    neutral1OnInverse: '#474747',
    neutral1OnInverseFixed: '#474747',
    
    default: '#ffffff',
    defaultFixed: '#ffffff',
    
    brand: '#835de1',
    brandFixed: '#835de1',
    brandOnInverse: '#9b7ef1',
    
    error: '#d84d4d',
    errorFixed: '#d84d4d',
    errorOnInverse: '#fc6667',
    
    success: '#5cad9a',
    successFixed: '#5cad9a',
    successOnInverse: '#5cad9a',
    
    warning: '#f0c555',
    warningFixed: '#f0c555',
    warningOnInverse: '#f0c555',
  },

  // State colors (used heavily by chips)
  state: {
    containerTransparent1Active: 'rgba(25, 25, 25, 0.1)', // #1919191a
    bgBrandActive: '#9b7ef1',
    bgDefaultFixedActive: 'rgba(255, 255, 255, 0.9)', // #ffffffe5
  },

  translucent: {
    primitiveNeutral4: 'rgba(25, 25, 25, 0.45)', // #19191973
  },
  
  bg: {
    neutral5: '#777777',
    neutral4: '#aeaeae',
    neutral3: '#e1e1e1',
    neutral2: '#eeeeee',
    neutral1: '#f4f4f4',
    
    default: '#ffffff',
    defaultFixed: '#ffffff',
    
    inverse: '#191919',
    inverseFixed: '#191919',
    
    brand: '#835de1',
    brandFixed: '#835de1',
    brand5: '#b39df7',
    brand4: '#cabef3',
    brand3: '#d6cef3',
    brand2: '#e2ddf6',
    brand1: '#efedf8',
  },
  
  container: {
    default: '#ffffff',
    transparent1: 'rgba(25, 25, 25, 0.05)', // #1919190d
    transparent1Fixed: 'rgba(25, 25, 25, 0.05)',
    transparent1OnInverseFixed: 'rgba(255, 255, 255, 0.1)', // #ffffff1a
  },
  
  page: {
    primary: '#ffffff',
    secondary: '#f9f9f9',
  },
  
  overlay: {
    popup: 'rgba(25, 25, 25, 0.4)', // #19191966
    primaryAlpha050: 'rgba(25, 25, 25, 0.5)', // #19191980
    primaryAlpha050Fixed: 'rgba(25, 25, 25, 0.5)',
  },
} as const;

// Type-safe color access
export type ColorToken = typeof colors;

