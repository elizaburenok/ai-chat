# Cell Component - Size S Specifications from Figma

## Overview
Cell component variant **S** (Small) with various spacing and subtitle options.

## Base Container Styles

### Default Vertical Spacing
```css
.cell--size-S {
  padding: 15px 20px; /* vertical: 15px, horizontal: 20px */
}
```

### Compact Vertical Spacing
```css
.cell--size-S.compact {
  padding: 10px 20px; /* vertical: 10px, horizontal: 20px */
}
```

### None Vertical Spacing
```css
.cell--size-S.none {
  padding: 0 20px; /* vertical: 0, horizontal: 20px */
}
```

**Note:** Width `375px` in Figma is for layout example, not a fixed component constraint.

---

## Content Typography

### Main Title (`.cell__content`)
- **Font-family**: `TT_Norms_Tochka_Extended` (Medium)
- **Font-size**: `14px`
- **Line-height**: `18px`
- **Letter-spacing**: `0.14px`
- **Font-weight**: `500` (Medium)
- **Color**: `var(--primitive/primary, #191919)` or `var(--color-primitive-primary, #191919)`

### Subtitle (`.cell__subtitle`)
- **Font-family**: `TT_Norms_Tochka_Extended` (Regular)
- **Font-size**: `14px`
- **Line-height**: `18px`
- **Letter-spacing**: `0.14px`
- **Font-weight**: `400` (Regular)
- **Color**: `var(--primitive/secondary, #676767)` or `var(--color-primitive-secondary, #676767)`
- **Gap between subtitle and title**: `2px`

### Label/Description (`.cell__label`)
- Same styles as subtitle (if used separately)

---

## Layout Structure

### Content Wrapper
- **Display**: `flex`
- **Flex-direction**: `column`
- **Gap**: `2px` (between subtitle and title when both present)
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
- **Icon size**: `24px` (Icon 24 variant)
- **Height**: Full height of cell

### Right Accessory (Disclosure/Chevron)
- **Padding-left**: `15px`
- **Icon size**: `18px` (when subtitle is off)
- **Icon size**: `38px` (height when subtitle is on)
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
2. **Bullet**: Bullet point style (with "—" prefix)

### Subtitle Options:
- **Off**: Only title displayed
- **On**: Subtitle above title (with 2px gap)

---

## Design Token References

### Colors:
- **Primary Text**: `Primitive/Primary` → `#191919`
- **Secondary Text (Subtitle)**: `Primitive/Secondary` → `#676767`

### Typography:
- **Font Family**: `TT_Norms_Tochka_Extended`
- **Font Weights**: 
  - Medium: `500` (for title)
  - Regular: `400` (for subtitle)

### Spacing:
- **Default Padding**: `15px 20px` (vertical horizontal)
- **Compact Padding**: `10px 20px`
- **None Padding**: `0 20px`
- **Left Accessory Gap**: `12px` (padding-right)
- **Right Accessory Gap**: `15px` (padding-left)
- **Content Gap**: `2px` (between subtitle and title)

---

## Implementation Notes

1. **Width**: The `width: 375px` shown in Figma is for layout example, not a component constraint. Component should be flexible.

2. **Padding**: Three vertical spacing options (Default, Compact, None) with optional horizontal spacing.

3. **Typography**: 
   - Title uses Medium weight (500)
   - Subtitle uses Regular weight (400)
   - Both use same font-size (14px) and line-height (18px)

4. **Accessories**:
   - Left accessory has 12px padding-right
   - Right accessory has 15px padding-left
   - Icon sizes vary based on context (18px or 24px)

5. **Subtitle Position**: Subtitle appears above title with 2px gap when enabled.

---

## Figma Reference
- **Design File**: Обратная связь
- **Node ID**: 58710-12582
- **Mode**: Dev
- **Component Name**: S (Cell variant)

