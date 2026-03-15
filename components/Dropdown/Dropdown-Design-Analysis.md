# Dropdown Component - Design Analysis

## Overview
The Dropdown component is a popup menu that displays a list of `Cell` components (size M). It can be triggered by clicking on a `Chip` component with `variant="dropdown"`. The component supports multiple variants and can adapt between desktop and mobile layouts.

## Figma Reference
- **Design File**: Обратная связь
- **Node ID**: 58730:24376
- **Pattern Reference**: [Dropdown Select Pattern](https://www.figma.com/design/CBS0qZz6lqoU2Mh3StNwV7/Patterns?node-id=54315-8866)

## Component Variants

The Dropdown component has the following type variants:

1. **List** - Standard dropdown with a scrollable list of cells
2. **List Groups** - Dropdown with grouped sections (each group has a header)
3. **Empty** - Empty state when no items are available
4. **Loading** - Loading state with spinner

Each variant can be displayed in two modes:
- **Desktop** (`isAdaptive: false`) - Fixed width popup with shadow
- **Mobile/Adaptive** (`isAdaptive: true`) - Full-width bottom sheet style

---

## Desktop Version (isAdaptive: false)

### Container Styles

**Base Container:**
- `background-color`: `var(--popup/primary, white)` → `#ffffff`
- `border-radius`: `var(--rounding-3x, 12px)` → `12px`
- `box-shadow`: `0px 20px 40px rgba(0, 0, 0, 0.1)` (Surfaces/Popout)
- `width`: `300px` (fixed)
- `max-height`: `280px` (with scrollbar when content overflows)
- `overflow`: `clip`
- `padding`: `5px` vertical, `0px` horizontal
- `display`: `flex`
- `flex-direction`: `column`
- `position`: `absolute` (relative to trigger element)

**Content Container:**
- `display`: `flex`
- `flex-direction`: `column`
- `gap`: `0px` (no gap between cells, cells handle their own spacing)
- `padding`: `0px`
- `overflow-y`: `auto` (when content exceeds max-height)

### Scrollbar (when content overflows)

- **Position**: Right side
- **Width**: `5px`
- **Track Color**: Transparent
- **Thumb Color**: `var(--translucent/primitive/neutral-4, rgba(25, 25, 25, 0.45))` → `#19191973`
- **Thumb Border Radius**: `var(--rounding-1,5x, 6px)` → `6px`
- **Thumb Opacity**: `50%`

---

## Mobile/Adaptive Version (isAdaptive: true)

### Container Styles

**Base Container:**
- `background-color`: `var(--popup/primary, white)` → `#ffffff`
- `border-radius`: 
  - Top-left: `var(--rounding-3x, 12px)` → `12px`
  - Top-right: `var(--rounding-3x, 12px)` → `12px`
  - Bottom-left: `0px`
  - Bottom-right: `0px`
- `width`: `375px` (full width on mobile)
- `padding-bottom`: `30px`
- `padding-top`: `0px`
- `padding-left`: `0px`
- `padding-right`: `0px`
- `display`: `flex`
- `flex-direction`: `column`
- `overflow`: `clip`
- `position`: `fixed` (or absolute with proper positioning)

### Bottom Sheet Header (Optional)

**Container:**
- `background-color`: `var(--popup/primary, white)` → `#ffffff`
- `padding`: `5px` vertical, `167px` horizontal (for centering grip)
- `border-radius`: 
  - Top-left: `var(--rounding-4,5x, 18px)` → `18px`
  - Top-right: `var(--rounding-4,5x, 18px)` → `18px`

**Grip (draggable handle):**
- `width`: `40px`
- `height`: `5px`
- `background-color`: `var(--primitive/neutral-1, #e1e1e1)` → `#e1e1e1`
- `border-radius`: `5px`
- `margin`: `0 auto`

**Title Section (when provided):**
- `background-color`: `var(--popup/primary, white)` → `#ffffff`
- `padding`: `15px 20px`
- `display`: `flex`
- `flex-direction`: `row`
- `align-items`: `flex-start`
- `gap`: `10px`

**Title Text:**
- `font-family`: `TT_Norms_Tochka_Extended` (DemiBold)
- `font-size`: `20px`
- `font-weight`: `600`
- `line-height`: `26px`
- `letter-spacing`: `0px`
- `color`: `var(--primitive/primary, #191919)` → `#191919`

---

## Cell Items (Size M)

All cells in the dropdown use **Cell component with `size="M"`**.

### Cell Structure (Type: List)

**Container:**
- `padding`: `10px 20px` (vertical, horizontal)
- `display`: `flex`
- `align-items`: `center`
- `gap`: `0px` (internal spacing handled by Cell component)

**Cell Content:**
- **Size**: `M`
- **Left Accessory**: Avatar icon (optional)
  - `padding-right`: `12px`
- **Main Content**:
  - Title: "Text M" (16px, Medium, Primary color)
  - Subtitle: "Text S" (14px, Regular, Secondary color)
  - Gap between title and subtitle: `2px`

### Cell Structure (Mobile/Adaptive)

**Container:**
- `padding`: `15px 20px` (vertical, horizontal) - more vertical spacing
- Same structure as desktop, but with larger vertical padding

---

## List Groups Variant

### Group Header

**Container:**
- `padding`: `10px 20px`
- `display`: `flex`
- `align-items`: `center`

**Header Text:**
- `font-family`: `TT_Norms_Tochka_Extended` (Medium)
- `font-size`: `16px`
- `font-weight`: `500`
- `line-height`: `20px`
- `letter-spacing`: `0.16px`
- `color`: `var(--primitive/secondary, #676767)` → `#676767`

**Group Spacing:**
- Gap between groups: `15px`

### Cells in Groups

- Same structure as standard cells
- `padding`: `10px 20px` (desktop) or `15px 20px` (mobile)
- Follow the same Cell M specifications

---

## Empty State

### Desktop Version

**Container:**
- Same base container styles
- `padding`: `30px 20px`
- `display`: `flex`
- `flex-direction`: `column`
- `align-items`: `center`
- `justify-content`: `center`
- `gap`: `15px`

**Empty Message:**
- `font-family`: `TT_Norms_Tochka_Extended` (Regular)
- `font-size`: `16px`
- `font-weight`: `400`
- `line-height`: `20px`
- `letter-spacing`: `0.16px`
- `color`: `var(--primitive/secondary, #676767)` → `#676767`
- `text-align`: `center`

### Mobile Version

**Container:**
- Includes Bottom Sheet Header (with optional title)
- `padding-top`: `80px` (more top spacing)
- `padding-bottom`: `30px`
- `padding-left`: `20px`
- `padding-right`: `20px`

**Optional Search Bar (Sticky):**
- Positioned below header
- `padding`: `5px 0px 10px 0px`
- Full width: `375px`
- `padding-left`: `20px`
- `padding-right`: `20px`

---

## Loading State

### Desktop Version

**Container:**
- Same base container styles
- `padding`: `30px 20px`
- `background-color`: `var(--page/primary, white)` → `#ffffff`

**Spinner:**
- `width`: `24px`
- `height`: `24px`
- `color`: `var(--primitive/brand, #835de1)` → `#835de1`
- Centered horizontally

### Mobile Version

**Container:**
- Includes Bottom Sheet Header (with optional title and search bar)
- `padding-top`: `80px`
- `padding-bottom`: `30px`
- `padding-left`: `20px`
- `padding-right`: `20px`
- `background-color`: `var(--page/primary, white)` → `#ffffff`

**Spinner:**
- `width`: `34px`
- `height`: `34px`
- `color`: `var(--primitive/brand, #835de1)` → `#835de1`
- Centered horizontally

---

## Design Tokens Used

### Colors
- `--popup/primary`: `#ffffff` (Popup background)
- `--primitive/primary`: `#191919` (Main text)
- `--primitive/secondary`: `#676767` (Secondary text, group headers)
- `--primitive/neutral-1`: `#e1e1e1` (Grip color)
- `--primitive/neutral-4`: `#949494` (Scrollbar thumb base)
- `--primitive/brand`: `#835de1` (Loading spinner)
- `--translucent/primitive/neutral-4`: `rgba(25, 25, 25, 0.45)` (Scrollbar thumb)
- `--page/primary`: `#ffffff` (Empty/Loading state background)

### Typography
- **Title (XL)**: TTN 600/XL - 20px, DemiBold, line-height 26px
- **Group Header (M)**: TTN 500/M - 16px, Medium, line-height 20px, letter-spacing 0.16px
- **Cell Title (M)**: TTN 500/M - 16px, Medium, line-height 20px, letter-spacing 0.16px
- **Cell Subtitle (S)**: TTN 400/S - 14px, Regular, line-height 18px, letter-spacing 0.14px
- **Empty State (M)**: TTN 400/M - 16px, Regular, line-height 20px, letter-spacing 0.16px

### Spacing
- **Rounding 3x**: `12px` (Container corners)
- **Rounding 4,5x**: `18px` (Bottom sheet header corners)
- **Rounding 1,5x**: `6px` (Scrollbar thumb)
- **Cell Padding (Desktop)**: `10px 20px` (vertical, horizontal)
- **Cell Padding (Mobile)**: `15px 20px` (vertical, horizontal)
- **Group Gap**: `15px` (space between groups)
- **Content Gap**: `2px` (gap between cell title and subtitle)
- **Left Accessory Gap**: `12px` (padding-right for avatar/icon)

### Shadows
- **Surfaces/Popout**: `0px 20px 40px rgba(0, 0, 0, 0.1)` (Desktop dropdown shadow)

---

## Interaction Specifications

### Trigger
- The dropdown is triggered by clicking a `Chip` component with `variant="dropdown"`
- The Chip should have `dropdownOpen` prop to indicate state
- Chip displays chevron icon that rotates based on `dropdownOpen` state

### Positioning
- **Desktop**: Positioned absolutely relative to the trigger Chip (typically below)
- **Mobile**: Fixed position, appears as bottom sheet from bottom of screen

### Behavior
- Dropdown should close when:
  - User clicks outside the dropdown
  - User selects an item (if single-select)
  - User presses Escape key
  - User clicks the trigger Chip again (toggle)

### Accessibility
- Dropdown container should have `role="listbox"` or `role="menu"`
- Cells should be keyboard navigable (Arrow keys, Enter, Escape)
- Focus management: Focus should move to first item when opened
- Screen reader support for selected state and item count

---

## Component Props Interface (Proposed)

Based on the design analysis, the Dropdown component should accept:

```typescript
export type DropdownType = 'list' | 'list-groups' | 'empty' | 'loading';
export type DropdownMode = 'desktop' | 'adaptive';

export interface DropdownItem {
  id: string;
  label: string;        // Main text (maps to Cell children)
  subtitle?: string;    // Optional subtitle (maps to Cell label prop)
  icon?: React.ReactNode; // Optional left accessory
  disabled?: boolean;
  checked?: boolean;    // Checkbox checked state (when showCheckbox is enabled)
  groupId?: string;     // For grouped lists
  groupLabel?: string;  // Group header text
}

export interface DropdownProps {
  /** Dropdown variant type */
  type?: DropdownType;
  /** Display mode - desktop or mobile/adaptive */
  mode?: DropdownMode;
  /** Array of items to display */
  items?: DropdownItem[];
  /** Optional title for mobile bottom sheet */
  title?: string;
  /** Empty state message */
  emptyMessage?: string;
  /** Whether dropdown is open */
  open?: boolean;
  /** Show checkbox as right accessory (default: false) */
  showCheckbox?: boolean;
  /** Callback when item is selected */
  onSelect?: (item: DropdownItem) => void;
  /** Callback when dropdown should close */
  onClose?: () => void;
  /** Additional CSS class name */
  className?: string;
  /** HTML data attributes */
  'data-testid'?: string;
}
```

---

## Implementation Notes

1. **Cell Component Integration**: 
   - Use existing `Cell` component with `size="M"`
   - Map DropdownItem properties to Cell props:
     - `label` → Cell `children`
     - `subtitle` → Cell `label` prop
     - `icon` → Cell `icon` prop
     - `disabled` → Cell `disabled` prop

2. **Positioning**:
   - Desktop: Use absolute positioning with positioning logic (Popper.js or similar, or custom calculation)
   - Mobile: Use fixed positioning at bottom, full width

3. **Overflow Handling**:
   - Desktop: Max height 280px with scrollbar
   - Mobile: Full height with native scrolling

4. **State Management**:
   - Controlled component pattern (open state managed externally)
   - Uncontrolled variant possible with internal state

5. **Grouping Logic**:
   - When type is "list-groups", group items by `groupId`
   - Display group headers between groups
   - Maintain 15px gap between groups

6. **Animation**:
   - Consider fade-in/slide animations for opening
   - Mobile bottom sheet should slide up from bottom

7. **Z-index**:
   - Ensure dropdown appears above other content
   - Consider portal for proper stacking context

---

## Differences from Cell Component Specifications

While the dropdown uses Cell size M, note these differences:

1. **Padding**: 
   - Dropdown cells use `10px 20px` (desktop) or `15px 20px` (mobile)
   - Standard Cell M uses `15px 20px` by default
   - This is a variant of Cell M that should be configurable

2. **Right Accessories**: 
   - Dropdown cells can optionally show checkboxes as right accessories when `showCheckbox` prop is enabled
   - Checkboxes are used for multi-select scenarios
   - Standard disclosure icons are not used in dropdown cells

3. **Group Headers**: 
   - Special header cells with secondary color text
   - No icon, just text
   - Lighter padding (`10px 20px`)

4. **Right Accessory - Checkbox**:
   - Optional checkbox can be displayed as a right accessory
   - Positioned on the right side of the cell
   - Used for multi-select scenarios

---

## Checkbox Right Accessory Specification

### Checkbox Structure

**Container:**
- `width`: `24px`
- `height`: `24px`
- `border-radius`: `var(--rounding-1x, 100px)` → `100px`
- `border-width`: `1.5px`
- `display`: `flex`
- `align-items`: `center`
- `justify-content`: `center`
- `flex-shrink`: `0`
- `margin-left`: `15px` (gap from cell content, same as right icon spacing)

**Unchecked State:**
- `background-color`: `transparent` or `var(--popup/primary, white)` → `#ffffff`
- `border-color`: `var(--primitive/neutral-3, #c8c8c8)` → `#c8c8c8`
- `border-style`: `solid`

**Checked State:**
- `background-color`: `var(--primitive/brand, #835de1)` → `#835de1`
- `border-color`: `var(--primitive/brand, #835de1)` → `#835de1`
- `border-style`: `solid`

**Checkmark Icon (when checked):**
- `width`: `12px`
- `height`: `12px`
- `color`: `var(--primitive/primary-on-inverse, #ffffff)` → `#ffffff`
- SVG checkmark path or icon component

**Disabled State:**
- `opacity`: `0.5` (same as disabled cell)
- Applies to both checked and unchecked states

**Hover State (when cell is hovered):**
- Unchecked: Border color may darken slightly
- Checked: Background may lighten slightly (brand-5: `#b39df7`)

### Integration with Cell Component

The checkbox should be passed as the `iconRight` prop to the Cell component:
- Cell already supports `iconRight` prop for right-side accessories
- Checkbox should be rendered as a React component/element
- Checkbox state (checked/unchecked) should be controlled by the DropdownItem

### Design Tokens Used

- **Colors**:
  - `--primitive/brand`: `#835de1` (checked background/border)
  - `--primitive/neutral-3`: `#c8c8c8` (unchecked border)
  - `--primitive/primary-on-inverse`: `#ffffff` (checkmark color)
  - `--popup/primary`: `#ffffff` (unchecked background)

- **Rounding**:
  - `--rounding-1x`: `4px` (checkbox border radius)

- **Spacing**:
  - `15px` (gap between cell content and checkbox, matches right icon spacing)

