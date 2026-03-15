# Button

Interactive button component for triggering actions. Supports multiple visual variants and interaction states.

## 1. Structure

**Hierarchy:**
- Button container (root element)
  - Text label (centered)
  - Loading spinner (optional, replaces text when loading)

**Key sizes:**
- Height: 50px (fixed)
- Width: 280px (default, should be flexible/auto)
- Border radius: 10px (rounding-2,5x)
- Padding: 15px horizontal, 12px vertical

**Layout:**
- Auto Layout: Horizontal
- Alignment: Center (both axes)
- Gap: N/A (single child element)
- Padding: 15px left/right, 12px top/bottom
- Constraints: Width should be flexible, height is fixed

## 2. Styles

**Typography:**
- Font family: TT Norms Tochka Extended (--font-family-primary)
- Font weight: 500 (Medium, --font-weight-medium)
- Font size: 18px (not in current tokens, needs to be added)
- Line height: 22px (not in current tokens, needs to be added)
- Letter spacing: 0px
- Text style: TTN 500/L (from Figma)

**Colors (by type and state):**

*Primary:*
- Default: Background `--color-bg-brand` (#835de1), Text `--color-primitive-default-fixed` (#ffffff)
- Hovered: Background `--color-state-bg-brand-active` (#9b7ef1), Text `--color-primitive-default-fixed` (#ffffff)
- Disabled: Background `--color-container-transparent-1` (rgba(25,25,25,0.05)), Text `--color-primitive-neutral-4` (#949494)
- Loading: Background `--color-bg-brand` (#835de1), Spinner color white

*Secondary:*
- Default: Background `--color-container-transparent-1` (rgba(25,25,25,0.05)), Text `--color-primitive-primary` (#191919)
- Hovered: Background `--color-state-container-transparent-1-active` (rgba(25,25,25,0.1)), Text `--color-primitive-primary` (#191919)
- Disabled: Background `--color-container-transparent-1` (rgba(25,25,25,0.05)), Text `--color-primitive-neutral-4` (#949494)
- Loading: Background `--color-container-transparent-1` (rgba(25,25,25,0.05)), Spinner color `--color-primitive-brand` (#835de1)

*Transparent:*
- Default: Background transparent, Text `--color-primitive-brand` (#835de1)
- Hovered: Background `--color-container-transparent-1` (rgba(25,25,25,0.05)), Text `--color-primitive-brand` (#835de1)
- Disabled: Background `--color-container-transparent-1` (rgba(25,25,25,0.05)), Text `--color-primitive-neutral-4` (#949494)
- Loading: Background transparent, Spinner color `--color-primitive-brand` (#835de1)

*White:*
- Default: Background `--color-bg-default-fixed` (#ffffff), Text `--color-primitive-brand` (#835de1)
- Hovered: Background rgba(255,255,255,0.9) (needs to be added to tokens as `--color-state-bg-default-fixed-active`), Text `--color-primitive-brand` (#835de1)
- Disabled: Background rgba(255,255,255,0.1) (needs to be added to tokens as `--color-container-transparent-1-on-inverse-fixed`), Text `--color-primitive-neutral-4` (#949494)
- Loading: Background `--color-bg-default-fixed` (#ffffff), Spinner color `--color-primitive-brand` (#835de1)

**Borders and radii:**
- Border radius: 10px (--rounding-2-5x)
- Border: None

**Shadows and effects:**
- None

**Loading spinner:**
- Size: 24px × 24px
- Color: Varies by button type (white for Primary, brand color for others)

## 3. Component variants

**Type variants:**
- `type: "Primary"` - Brand-colored filled button with white text
- `type: "Secondary"` - Light gray filled button with dark text
- `type: "Transparent"` - Transparent background with brand-colored text
- `type: "White"` - White background with brand-colored text

**State variants:**
- `state: "Default"` - Normal interactive state
- `state: "Hovered"` - Hover state with background/text color changes
- `state: "Disabled"` - Disabled state with reduced opacity colors and non-interactive
- `state: "Loading"` - Loading state showing spinner instead of text

**Visual differences by variant:**
- Primary: Brand purple background, white text. Hover: lighter purple. Disabled: light gray background, gray text.
- Secondary: Light gray background, dark text. Hover: slightly darker gray. Disabled: same background, gray text.
- Transparent: No background, brand text. Hover: light gray background. Disabled: light gray background, gray text.
- White: White background, brand text. Hover: slightly transparent white. Disabled: very light background, gray text.

## 4. Behavior logic

**Interaction states:**
- Default: Normal appearance, cursor pointer, clickable
- Hover: Background color changes (darker/lighter depending on type), cursor pointer
- Active/Pressed: TODO (not visible in Figma design)
- Focus: TODO (not visible in Figma design, should follow accessibility guidelines)
- Disabled: Reduced visual contrast, cursor not-allowed, non-interactive (no click events)
- Loading: Shows spinner instead of text, non-interactive (no click events)

**Click behavior:**
- On click: Triggers onClick handler (when not disabled/loading)
- Disabled/loading buttons should not trigger onClick

**Responsiveness:**
- Width: Should be flexible/auto by default, can accept custom width
- Height: Fixed at 50px
- Text: Should truncate with ellipsis if content is too long (TODO: verify from design)
- Minimum width: TODO (not specified in design)

**Related elements:**
- Loading spinner: Appears centered in button, replaces text content
- Text label: Centered horizontally and vertically
- Icons: TODO (not present in current design, but should be considered for future)

