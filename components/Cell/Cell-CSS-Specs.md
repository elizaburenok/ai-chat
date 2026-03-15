# Cell Component - CSS Specifications from Figma

## Base Component Styles

### `.cell` (Base Class)

```css
.cell {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  color: var(--color-primitive-primary, #191919);
}
```

**CSS Properties:**
- `display`: `flex`
- `align-items`: `center`
- `padding`: `15px 20px`
- `color`: `var(--color-primitive-primary, #191919)` (Primitive/Primary token)

**Note:** `width: 375px` from Figma is for a specific example/layout, not a fixed component width. The component should be flexible and adapt to its container.

### `.cell:hover` (Hover State)

```css
.cell:hover {
  background-color: rgba(25, 25, 25, 0.05);
}
```

**CSS Properties:**
- `background-color`: `rgba(25, 25, 25, 0.05)` (semi-transparent black overlay with 5% opacity)

---

## Content Elements

### Main Content (`.cell__content`)

**Text Color:**
- `color`: `var(--color-primitive-primary, #191919)` (Primitive/Primary)

### Description/Label (`.cell__label`)

**Text Color:**
- `color`: `var(--color-primitive-secondary, #676767)` (Primitive/Secondary)

---

## Design Token References

### Colors Used:
- **Primary Text**: `Primitive/Primary` → `#191919`
- **Secondary Text (Description/Label)**: `Primitive/Secondary` → `#676767`

### Spacing:
- **Padding**: `15px 20px` (vertical: 15px, horizontal: 20px)

### Layout:
- **Display**: `flex`
- **Align Items**: `center`

---

## Implementation Notes

1. **Width**: The `width: 375px` shown in Figma is for a specific layout example, not a component constraint. The component should be flexible.

2. **Padding**: Standard padding is `15px 20px` for all cell variants.

3. **Text Colors**:
   - Main content uses `Primitive/Primary` color
   - Labels/descriptions use `Primitive/Secondary` color

4. **Alignment**: Content is vertically centered using `align-items: center`.

---

## Figma Reference
- **Design File**: Bank-02-UI-Kit
- **Node ID**: 3563-6007
- **Mode**: Dev

