# Navigation Bar Component - Design Analysis

## Overview
The Navigation Bar is a vertical navigation component designed to be placed on the left side of a page. It helps users navigate within and between pages. The component consists of three optional element groups that can be enabled/disabled independently.

## Component Structure

### Element Groups (All Optional)

1. **Back Button Group** (`hasButtons`)
   - Boolean prop to show/hide
   - Contains back navigation button

2. **Text Block Group** (`hasTitle`)
   - Boolean prop to show/hide
   - Contains:
     - Root Link (optional, controlled by `hasRootLink`)
     - Title (main heading)

3. **Navigation Items Group** (`hasItems`)
   - Boolean prop to show/hide
   - Contains list of navigation items

## Detailed Structure

### 1. Back Button Section

**Container:**
- `display`: flex
- `flex-direction`: row
- `align-items`: center
- `gap`: 20px (Spacing 5x)
- `padding`: 32px 20px 10px 20px (top: Spacing 8x, horizontal: Spacing 5x, bottom: Spacing 2,5x)
- `width`: 100%

**Back Button:**
- `width`: 40px
- `height`: 40px
- `border`: 1px solid `var(--translucent/primitive/neutral-4, rgba(25, 25, 25, 0.45))`
- `border-radius`: 10px (Rounding 2,5x)
- `display`: flex
- `align-items`: center
- `justify-content`: center
- `padding`: 0 1px
- **Icon (Arrow Left):**
  - `width`: 24px
  - `height`: 24px
  - `color`: `var(--primitive/primary, #191919)`

### 2. Text Block Section

**Container:**
- `display`: flex
- `flex-direction`: column
- `align-items`: flex-start
- `justify-content`: center
- `gap`: 10px (Spacing 2,5x)
- `padding`: 16px 20px (vertical: Spacing 4x, horizontal: Spacing 5x)
- `width`: 100%

**Root Link (Optional):**
- `display`: flex
- `flex-direction`: row
- `align-items`: center
- `gap`: 2px (3XS)
- `padding`: 0 10px 0 0 (right: Spacing 2,5x)
- **Text:**
  - Font Family: `TT Norms Tochka Extended`
  - Font Weight: `500` (Medium)
  - Font Size: `14px`
  - Line Height: `18px`
  - Letter Spacing: `0.14px`
  - Color: `var(--primitive/primary, #191919)`
  - White Space: `nowrap`
- **Chevron Icon:**
  - `width`: 14px
  - `height`: 14px
  - `color`: `var(--primitive/neutral-3, #c8c8c8)`
  - Rotated 90deg (pointing right)

**Title:**
- `display`: flex
- `flex-direction`: column
- `align-items`: flex-start
- `gap`: 6px (Spacing 1,5x)
- `width`: 100%
- **Text:**
  - Font Family: `TT Norms Tochka Extended`
  - Font Weight: `600` (DemiBold)
  - Font Size: `24px`
  - Line Height: `30px`
  - Letter Spacing: `0px`
  - Color: `var(--primitive/primary, #191919)`
  - Overflow: `ellipsis`
  - White Space: `nowrap` (via -webkit-box)
  - Width: `100%`

### 3. Navigation Items Section

**Container:**
- `display`: flex
- `flex-direction`: column
- `align-items`: flex-start
- `width`: 100%

**Navigation Item:**
- `display`: flex
- `flex-direction`: row
- `align-items`: flex-start
- `gap`: 0px (Spacing 2,5x = 0)
- `padding`: 10px 20px (vertical: Spacing 2,5x, horizontal: Spacing 5x)
- `width`: 100%
- **Text:**
  - Font Family: `TT Norms Tochka Extended`
  - Font Weight: `500` (Medium)
  - Font Size: `14px`
  - Line Height: `18px`
  - Letter Spacing: `0.14px`
  - Color: `var(--primitive/primary, #191919)`
  - Flex: `1 1 0` (grow, shrink, basis)
  - Min Width: `0`
  - Min Height: `1px`

## Design Tokens Used

### Colors
- **Primary**: `#191919` (Primitive/Primary)
- **Translucent Neutral 4**: `rgba(25, 25, 25, 0.45)` or `#19191973` (Translucent/Primitive/Neutral 4)
- **Neutral 3**: `#c8c8c8` (Primitive/Neutral 3)

### Spacing
- **Spacing 5x**: `20px`
- **Spacing 8x**: `32px`
- **Spacing 2,5x**: `10px`
- **Spacing 4x**: `16px`
- **Spacing 1,5x**: `6px`
- **3XS**: `2px`

### Rounding
- **Rounding 2,5x**: `10px`

### Typography
- **TTN 500/S**: 
  - Family: `TT Norms Tochka Extended`
  - Weight: `500` (Medium)
  - Size: `14px`
  - Line Height: `18px`
  - Letter Spacing: `0.14px` (or `1px` in some cases)

- **TTN 600/2XL**:
  - Family: `TT Norms Tochka Extended`
  - Weight: `600` (DemiBold)
  - Size: `24px`
  - Line Height: `30px`
  - Letter Spacing: `0px`

## Component Props Structure (Proposed)

```typescript
interface NavigationBarProps {
  /** Show/hide back button group */
  hasBackButton?: boolean;
  /** Show/hide text block (root link + title) */
  hasTextBlock?: boolean;
  /** Show/hide navigation items */
  hasItems?: boolean;
  
  // Back Button Props
  /** Back button click handler */
  onBackClick?: () => void;
  
  // Text Block Props
  /** Show root link in text block */
  hasRootLink?: boolean;
  /** Root link text */
  rootLinkText?: string;
  /** Root link click handler */
  onRootLinkClick?: () => void;
  /** Main title text */
  title?: string;
  
  // Navigation Items Props
  /** Array of navigation items */
  items?: Array<{
    id: string;
    label: string;
    onClick?: () => void;
    active?: boolean;
    disabled?: boolean;
  }>;
  
  // Common Props
  /** Additional CSS class name */
  className?: string;
  /** HTML data attributes */
  'data-testid'?: string;
}
```

## Layout and Positioning

- **Position**: Fixed or absolute on the left side of the page
- **Width**: Full width of container (typically sidebar width)
- **Background**: White/transparent (to be confirmed from design)
- **Direction**: Vertical (flex-direction: column)
- **Alignment**: All elements left-aligned

## Interactive States

### Back Button
- **Default**: Border with translucent neutral color
- **Hover**: Background color change (to be defined)
- **Active**: Pressed state (to be defined)
- **Disabled**: Reduced opacity (to be defined)

### Root Link
- **Default**: Primary text color
- **Hover**: Underline or color change (to be defined)
- **Active**: Visited state (to be defined)

### Navigation Items
- **Default**: Primary text color
- **Hover**: Background highlight (to be defined)
- **Active**: Different styling for current page (to be defined)
- **Disabled**: Reduced opacity (to be defined)

## Implementation Notes

1. **Modular Structure**: Each section (back button, text block, items) should be conditionally rendered based on boolean props
2. **Flexible Layout**: Component should adapt to different content lengths
3. **Accessibility**: All interactive elements should have proper ARIA labels and keyboard navigation
4. **Responsive**: Component should work on different screen sizes (isAdaptive prop mentioned in design)
5. **Icon Implementation**: Icons should be SVG-based for scalability
6. **Text Overflow**: Title and items should handle long text with ellipsis
7. **Spacing Consistency**: Use design tokens for all spacing values

## Type Variants

The design mentions a `type` prop with values:
- `"Navigation"` (default)
- `"Progress"` (alternative variant, structure to be analyzed separately)

## Adaptive Mode

The design includes an `isAdaptive` prop (boolean) that likely changes the component's behavior for different screen sizes or contexts.

