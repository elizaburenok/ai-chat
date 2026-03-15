# Cell Component - Size M Specifications from Figma

## Overview
Cell component variant **M** (Medium) with various spacing, subtitle, and description options.

## Base Container Styles

### Default Vertical Spacing
```css
.cell--size-M {
  padding: 15px 20px; /* vertical: 15px, horizontal: 20px */
}
```

### Compact Vertical Spacing
```css
.cell--size-M.compact {
  padding: 10px 20px; /* vertical: 10px, horizontal: 20px */
}
```

### None Vertical Spacing
```css
.cell--size-M.none {
  padding: 0 20px; /* vertical: 0, horizontal: 20px */
}
```

**Note:** Width `375px` in Figma is for layout example, not a fixed component constraint.

---

## Content Typography

### Main Title (`.cell__content`)
- **Font-family**: `TT_Norms_Tochka_Extended` (Medium)
- **Font-size**: `16px`
- **Line-height**: `20px`
- **Letter-spacing**: `0.16px`
- **Font-weight**: `500` (Medium)
- **Color**: `var(--primitive/primary, #191919)` or `var(--color-primitive-primary, #191919)`

### Subtitle (`.cell__subtitle`)
- **Font-family**: `TT_Norms_Tochka_Extended` (Regular)
- **Font-size**: `14px`
- **Line-height**: `18px`
- **Letter-spacing**: `0.14px`
- **Font-weight**: `400` (Regular)
- **Color**: `var(--primitive/secondary, #676767)` or `var(--color-primitive-secondary, #676767)`
- **Position**: Above title when enabled

### Description/Label (`.cell__label`)
- **Font-family**: `TT_Norms_Tochka_Extended` (Regular)
- **Font-size**: `14px`
- **Line-height**: `18px`
- **Letter-spacing**: `0.14px`
- **Font-weight**: `400` (Regular)
- **Color**: `var(--primitive/secondary, #676767)` or `var(--color-primitive-secondary, #676767)`
- **Position**: Below title when enabled
- **Gap between title and description**: `2px`

### Content Structure
When both subtitle and description are present:
1. **Subtitle** (top) - 14px, Regular, Secondary color
2. **Title** (middle) - 16px, Medium, Primary color
3. **Description** (bottom) - 14px, Regular, Secondary color
- **Gap between all elements**: `2px`

---

## Layout Structure

### Content Wrapper
- **Display**: `flex`
- **Flex-direction**: `column`
- **Gap**: `2px` (between all text elements: subtitle, title, description)
- **Align-items**: `flex-start`
- **Justify-content**: `center`

### Main Container
- **Display**: `flex`
- **Align-items**: `center`
- **Width**: Flexible (not fixed to 375px)

---

## Accessories

### Left Accessory (Icon)
- **Padding-right**: `12px`
- **Icon size**: Varies based on type (Avatar, Icon 24, Icon 30, etc.)
- **Height**: Full height of cell

### Right Accessory (Disclosure/Chevron)
- **Padding-left**: `15px`
- **Icon size**: `18px` (width/height)
- **Icon height (container)**:
  - `20px` - when only title is present (no subtitle, no description)
  - `40px` - when title + description are present (no subtitle)
  - `44px` - when subtitle + title + description are all present
  - `40px` - when subtitle + title are present (no description)
- **Type**: Disclosure (Chevron Right)

---

## Spacing Variants

### Vertical Spacing Options:
1. **Default**: `padding: 15px 20px`
2. **Compact**: `padding: 10px 20px`
3. **None**: `padding: 0 20px`

### Horizontal Spacing:
- **On**: `padding-left: 20px, padding-right: 20px`
- **Off**: `padding-left: 0, padding-right: 0`

---

## Component Variants

### Type Options:
1. **Cell**: Standard cell with accessories
2. **Bullet**: Bullet point style (with "—" prefix, width: 21px)

### Content Options:
- **Subtitle**: Optional, appears above title
- **Description**: Optional, appears below title
- Both can be enabled simultaneously

---

## Design Token References

### Colors:
- **Primary Text**: `Primitive/Primary` → `#191919`
- **Secondary Text (Subtitle/Description)**: `Primitive/Secondary` → `#676767`

### Typography:
- **Font Family**: `TT_Norms_Tochka_Extended`
- **Font Weights**: 
  - Medium: `500` (for title)
  - Regular: `400` (for subtitle and description)

### Spacing:
- **Default Padding**: `15px 20px` (vertical horizontal)
- **Compact Padding**: `10px 20px`
- **None Padding**: `0 20px`
- **Left Accessory Gap**: `12px` (padding-right)
- **Right Accessory Gap**: `15px` (padding-left)
- **Content Gap**: `2px` (between all text elements)

---

## Key Differences from Size S

1. **Title Size**: 
   - S: `14px` / line-height `18px`
   - M: `16px` / line-height `20px`

2. **Letter-spacing**:
   - S: `0.14px`
   - M: `0.16px` (for title)

3. **Description Support**: 
   - Size M supports both subtitle and description simultaneously
   - Size S only supports subtitle

4. **Right Icon Height**:
   - Size M has variable heights based on content (20px, 40px, 44px)
   - Size S has fixed heights (18px, 38px)

---

## Implementation Notes

1. **Width**: The `width: 375px` shown in Figma is for layout example, not a component constraint. Component should be flexible.

2. **Padding**: Three vertical spacing options (Default, Compact, None) with optional horizontal spacing.

3. **Typography**: 
   - Title uses Medium weight (500) at 16px
   - Subtitle and Description use Regular weight (400) at 14px
   - All elements have 2px gap between them

4. **Accessories**:
   - Left accessory has 12px padding-right
   - Right accessory has 15px padding-left
   - Right icon size is 18px, but container height varies based on content

5. **Content Structure**: 
   - Subtitle appears above title
   - Description appears below title
   - All three can be present simultaneously with 2px gaps

---

## Figma Reference
- **Design File**: Bank-02-UI-Kit
- **Node ID**: 3563-6166
- **Mode**: Dev
- **Component Name**: M (Cell variant)
- **Pattern Reference**: [Списки](https://www.figma.com/design/CBS0qZz6lqoU2Mh3StNwV7/Patterns?node-id=27554-86522)

