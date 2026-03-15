# Skills Modal Component Specification

Modal component for selecting skills with filtering and search capabilities. Displays a scrollable list of skill items with checkboxes or radio buttons for selection.

## 1. Structure

### Overall Container
- **Width**: `480px` (fixed)
- **Height**: `723px` (fixed in design, should be flexible in implementation)
- **Layout**: Vertical Auto Layout (flex column)
- **Border Radius**:
  - Top-left: `var(--rounding-4,5x, 18px)` → `18px`
  - Top-right: `var(--rounding-4,5x, 18px)` → `18px`
  - Bottom-left: `var(--rounding-4,5x, 18px)` → `18px`
  - Bottom-right: `var(--rounding-4,5x, 18px)` → `18px`

### Modal Header
- **Container**:
  - Background: `var(--popup/primary, white)` → `#ffffff`
  - Border radius: Top-left `18px`, Top-right `18px`
  - Padding: `0px` (internal elements handle spacing)
  - Height: Contains Navigation Bar (64px) + Title section

- **Navigation Bar** (embedded in header):
  - Height: `64px`
  - Width: `480px`
  - Contains right part with close button (24px icon, positioned at right edge with 20px padding from edge, 6px from top)

- **Title Section**:
  - Padding: `15px` bottom, `0px` top, `20px` horizontal
  - Contains title text "Выбрать навык"

### Content Section
- **Container**:
  - Background: `var(--popup/primary, white)` → `#ffffff`
  - Flex: `1` (grows to fill available space)
  - Padding: `var(--xl, 30px)` bottom, `var(--s, 15px)` top, `0px` horizontal
  - Gap: `var(--s, 15px)` (between filter section and skills list)
  - Overflow: `clip` (scrolling handled by inner list)

- **Filter Section** (Chip+Search):
  - Layout: Horizontal Auto Layout (flex row)
  - Gap: `var(--xs, 10px)`
  - Padding: `0px` vertical, `var(--m, 20px)` horizontal
  - Contains:
    - Chip component (Dropdown type) for competency filter
    - SearchInput component (flexible width, min-height `32px`)

- **Skills List** (Drivers section):
  - Height: `462px` (fixed in design, should be flexible)
  - Contains scrollable list of skill items (Cell components, size L)
  - Each item has padding: `15px` vertical, `20px` horizontal
  - Scrollbar: Vertical, positioned on right edge, width `5px`, thumb with `rgba(25, 25, 25, 0.45)` color at 50% opacity, border radius `6px`

### Modal Footer
- **Container**:
  - Background: `var(--popup/primary, white)` → `#ffffff`
  - Border radius: Bottom-left `18px`, Bottom-right `18px`
  - Padding: `20px` (all sides)
  - Contains action button (PageAction component)

---

## 2. Styles

### Typography

**Title (Header)**:
- Font: `TT Norms Tochka Extended` (DemiBold)
- Font-size: `24px`
- Font-weight: `600`
- Line-height: `30px`
- Letter-spacing: `0px`
- Color: `var(--primitive/primary, #191919)` → `#191919`
- Style reference: `TTN 600/2XL`

**Skill Item Text (List items)**:
- Font: `TT Norms Tochka Extended` (Regular)
- Font-size: `18px`
- Font-weight: `400`
- Line-height: `22px`
- Letter-spacing: `0px`
- Color: `var(--primitive/primary, #191919)` → `#191919`
- Style reference: `TTN 400/L`

**Chip Text (Filter dropdown)**:
- Font: `TT Norms Tochka Extended` (Medium)
- Font-size: `14px`
- Font-weight: `500`
- Line-height: `18px`
- Letter-spacing: `0.14px` or `1px`
- Color: `var(--primitive/primary, #191919)` → `#191919`
- Style reference: `TTN 500/S`

**Search Input Placeholder**:
- Font: `TT Norms Tochka Extended` (Regular)
- Font-size: `16px`
- Font-weight: `400`
- Line-height: `20px`
- Letter-spacing: `0.16px` or `1px`
- Color: `var(--primitive/neutral-4, #949494)` → `#949494`
- Style reference: `TTN 400/M`

**Action Button Text**:
- Font: `TT Norms Tochka Extended` (Medium)
- Font-size: `18px`
- Font-weight: `500`
- Line-height: `22px`
- Letter-spacing: `0px`
- Color: `var(--primitive/default-fixed, white)` → `#ffffff`
- Style reference: `TTN 500/L`

### Colors

**Backgrounds**:
- Modal container: `var(--popup/primary, white)` → `#ffffff`
- Filter chip: `var(--container/transparent-1, rgba(25,25,25,0.05))` → `rgba(25, 25, 25, 0.05)` / `#1919190d`
- Search input: `var(--container/transparent-1, rgba(25,25,25,0.05))` → `rgba(25, 25, 25, 0.05)` / `#1919190d`
- Action button: `var(--bg/brand, #835de1)` → `#835de1`

**Text Colors**:
- Primary text: `var(--primitive/primary, #191919)` → `#191919`
- Placeholder text: `var(--primitive/neutral-4, #949494)` → `#949494`
- Button text: `var(--primitive/default-fixed, white)` → `#ffffff`

**Icons**:
- Close icon fill: `rgba(25, 25, 25, 1)` → `#191919`
- Search icon fill: `rgba(148, 148, 148, 1)` → `#949494`
- Chevron down icon fill: `rgba(148, 148, 148, 1)` → `#949494`
- Checkbox border (unchecked): `var(--translucent/primitive/neutral-4, rgba(25,25,25,0.45))` → `rgba(25, 25, 25, 0.45)` / `#19191973`

### Borders and Radii

**Modal Container**:
- Border radius: `var(--rounding-4,5x, 18px)` → `18px` (all corners)

**Header**:
- Border radius: Top-left `18px`, Top-right `18px`

**Footer**:
- Border radius: Bottom-left `18px`, Bottom-right `18px`

**Filter Chip**:
- Border radius: `var(--rounding-2,5x, 10px)` → `10px`

**Search Input**:
- Border radius: `var(--rounding-2,5x, 10px)` → `10px`

**Action Button**:
- Border radius: `var(--rounding-2,5x, 10px)` → `10px`

**Checkbox**:
- Border radius: `var(--rounding-3x, 12px)` → `12px`
- Border: `1px solid` (unchecked state)

### Shadows and Effects

**Scrollbar**:
- Track: Transparent
- Thumb: `rgba(25, 25, 25, 0.45)` at 50% opacity
- Thumb border radius: `var(--rounding-1,5x, 6px)` → `6px`
- Width: `5px`

---

## 3. Component Variants

The Modal component itself has no variants. However, it contains sub-components with their own variants:

**Filter Chip**:
- Type: `Dropdown`
- States: `Default` (shown in design)
- Selection state: Can be selected or unselected

**Search Input**:
- Size: `S` (32px height)
- Variant: `filled` (with background)
- Placeholder: "Поиск"

**Skill List Items (Cell components)**:
- Size: `L` (large)
- Right accessory types: `Checkbox` or `Radio` (varies per item)

**Action Button (PageAction)**:
- Standard button variant
- Can be disabled state (when no skills selected)

**Checkbox Right Accessory**:
- States: `Default`, `Hovered / Pressed`, `Disabled`
- Selection: `Unchecked`, `Checked`, `Indeterminate`
- Size: `24px` × `24px`

**Radio Right Accessory**:
- States: `Default`, `Hovered`, `Disabled`
- Selection: `Is Selected` (true/false)
- Size: `24px` × `24px`

---

## 4. Behavior Logic

### Interaction States

**Modal Container**:
- Opens when trigger is activated
- Closes when:
  - Close button (X icon) is clicked
  - Escape key is pressed
  - Click outside modal (overlay click)
- Should be centered on screen (absolute positioning with transform: translate(-50%, -50%))

**Close Button**:
- Hover state: Background color changes (should use hover state color)
- Active/Pressed: Visual feedback on click
- Cursor: Pointer

**Filter Chip (Competency Dropdown)**:
- Click: Opens dropdown menu (Dropdown component)
- Shows selected competency label or "Компетенция" when none selected
- Reset icon appears when competency is selected
- Click reset icon: Clears competency filter

**Search Input**:
- Focus: Input becomes active, placeholder disappears when typing
- Typing: Filters skills list in real-time based on search query
- Placeholder: "Поиск" when empty

**Skill List Items**:
- Click: Toggles selection (checkbox) or selects item (radio)
- Hover: Visual feedback (background color change)
- Selected state: Checkbox/Radio shows checked/selected state
- Multiple selection: Supported (checkboxes)
- Single selection: Supported (radio buttons, varies per item)

**Scrollbar**:
- Appears when content height exceeds container height (462px)
- Smooth scrolling
- Thumb position reflects scroll position
- Scrollable area: Skills list container

**Action Button**:
- Click: Applies filter with selected skills, closes modal
- Disabled state: When no skills are selected (disabled visual state)
- Enabled state: Shows brand color background, white text
- Hover: Background color may lighten (active state: `#9b7ef1`)

### Responsiveness Rules

**Modal Width**:
- Fixed at `480px` in design
- Implementation should handle responsive sizing if needed

**Modal Height**:
- Total height `723px` in design (fixed)
- Content section grows/shrinks based on available space
- Skills list has fixed scrollable height of `462px` in design

**Content Overflow**:
- Skills list handles overflow with vertical scrolling
- Search and filter section remains visible (sticky at top of content)

### Related Elements

**Navigation Bar**:
- Embedded in header
- Contains close button in right part
- Height: `64px` total, button positioned at `6px` from top

**Cell Components** (skill items):
- Size: `L`
- Padding: `15px` vertical, `20px` horizontal
- Right accessory spacing: `15px` padding-left from content
- Right accessory types: Checkbox or Radio (24px size)

**Icons**:
- Close icon: `24px` × `24px`, Stroked 2px/Cross, positioned in Navigation Bar
- Search icon: `18px` × `18px`, Stroked 2px/Magnifier, inside SearchInput
- Chevron down: `18px` × `18px`, Filled/Chevron Down, inside Dropdown Chip

### State Management

**Local Selection State**:
- Modal maintains local state of selected skills
- Syncs with parent state when modal opens
- Changes only applied when "Применить фильтр" button is clicked

**Filter State**:
- Competency filter affects visible skills list
- Search query filters visible skills list
- Filters work together (AND logic)

---

## Design Tokens Reference

### Variables from Figma

**Colors**:
- `Primitive/Primary`: `#191919`
- `Popup/Primary`: `#ffffff`
- `Primitive/Neutral 4`: `#949494`
- `Container/Transparent 1`: `#1919190d` / `rgba(25,25,25,0.05)`
- `Bg/Brand`: `#835de1`
- `Primitive/Default Fixed`: `#ffffff`
- `Translucent/Primitive/Neutral 4`: `#19191973` / `rgba(25,25,25,0.45)`

**Typography**:
- `TTN 600/2XL`: Font(TT Norms Tochka Extended, DemiBold, 24px, 600, line-height: 30px, letter-spacing: 0px)
- `TTN 500/S`: Font(TT Norms Tochka Extended, Medium, 14px, 500, line-height: 18px, letter-spacing: 1px)
- `TTN 400/M`: Font(TT Norms Tochka Extended, Regular, 16px, 400, line-height: 20px, letter-spacing: 1px)
- `TTN 400/L`: Font(TT Norms Tochka Extended, Regular, 18px, 400, line-height: 22px, letter-spacing: 0px)
- `TTN 500/L`: Font(TT Norms Tochka Extended, Medium, 18px, 500, line-height: 22px, letter-spacing: 0px)

**Spacing**:
- `XS`: `10px`
- `S`: `15px`
- `M`: `20px`
- `XL`: `30px`

**Rounding**:
- `Rounding 1,5x`: `6px`
- `Rounding 2,5x`: `10px`
- `Rounding 3x`: `12px`
- `Rounding 4,5x`: `18px`

