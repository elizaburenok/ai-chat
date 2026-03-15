# Bar Graph

Analytics visualization component that displays data trends over time using Vertical Marker components arranged horizontally. Includes a Y-axis legend and optional grid lines. Used to show dynamics of chosen items, such as skill progression over multiple time periods.

## 1. Structure

**Hierarchy:**
- Bar Graph container (root element, flex row, items-end)
  - Y-axis Legend (left side, flex column)
    - Multiple text labels (4 labels shown in design, vertically distributed)
  - Legend X And Content container (main area, flex column, grow)
    - Grid (absolute positioned, contains horizontal grid lines)
      - Multiple horizontal lines (4 lines shown, evenly distributed)
    - Bars container (flex row, contains Vertical Marker components)
      - Multiple Vertical Marker components (arranged horizontally, equal width distribution)

**Key sizes:**
- Container width: Flexible (full width of parent)
- Container height: Flexible (full height of parent, shown as 194px in example)
- Y-axis Legend width: Shrink-0 (fixed width based on content + padding)
- Y-axis Legend padding: 
  - Top: 0px
  - Right: 10px
  - Bottom: 13px
  - Left: 0px
- Grid padding: Top 8px, bottom 0px (grid positioned with inset bottom 20px to leave space for labels)
- Vertical Marker spacing: Equal distribution (flex grow, basis-0)
- Gap between Vertical Markers: 0px (they grow to fill space equally)
- Grid line color: rgba(212, 212, 212, 1) (--color-primitive-neutral-2, #d4d4d4)

**Layout:**
- Root container: Auto Layout Horizontal, alignment: items-end (aligns to bottom)
- Y-axis Legend: Auto Layout Vertical, alignment: justify-between (distributes labels evenly), height: 100%
- Legend X And Content: Auto Layout Vertical, flex: grow (takes remaining space)
- Grid: Absolute positioning, inset: top 0, right 0, bottom 20px, left 0
- Bars container: Auto Layout Horizontal, flex: grow, items-start
- Vertical Markers: Auto Layout Vertical, flex: grow (equal distribution), gap: 5px, padding-top: 7px

## 2. Styles

**Typography:**
- Y-axis Legend labels:
  - Font family: TT Norms Tochka Extended (--font-family-primary)
  - Font weight: 400 (Regular, --font-weight-regular)
  - Font size: 12px (--font-size-xs)
  - Line height: 15px (--line-height-xs)
  - Letter spacing: 0.12px (--letter-spacing-xs)
  - Text style: TTN 400/XS
  - Color: `--color-primitive-secondary` (#676767)
- Vertical Marker labels: Inherit from Vertical Marker component (TTN 400/XS or TTN 500/XS based on state)

**Colors:**
- Background: Transparent (inherits from parent)
- Y-axis Legend text: `--color-primitive-secondary` (#676767)
- Grid lines: rgba(212, 212, 212, 1) (--color-primitive-neutral-2, #d4d4d4)
- Bar colors: Inherited from Vertical Marker components
  - Solid bars: `--color-bg-brand-2` (#e2ddf6)
  - Segmented bars: Category colors (Sand, Coral, Flamingo, Orchid, Amethyst, Indigo)
  - Saldo bars: `--color-bg-brand-2` (#e2ddf6) with empty space

**Borders and radii:**
- None (borders and radii are handled by Vertical Marker components)

**Shadows and effects:**
- None

**Grid lines:**
- Stroke color: rgba(212, 212, 212, 1) (#d4d4d4)
- Stroke width: 1px
- Horizontal lines, evenly distributed vertically
- Positioned absolutely within grid container

## 3. Component variants

**Y-axis Legend variants:**
- Number of labels: Variable (4 shown in design, but should be configurable)
- Label content: Customizable text per label
- Alignment: Vertical distribution with justify-between

**Grid variants:**
- Number of grid lines: Variable (4 shown in design, but should match data scale)
- Grid visibility: TODO (should grid be optional/hideable?)
- Grid line style: Horizontal lines only (vertical lines not shown in design)

**Bars variants:**
- Number of bars: Variable (5 shown in design, based on data points)
- Bar types: Inherited from Vertical Marker variants:
  - Size: 15px, 20px, 25px, 44px
  - Quantity: 1 Bar or 2 Bars
  - State: Default, Selected, Inactive
  - Bar type: Solid, Segmented, Saldo
  - Progress level: 0-100%
- Bar distribution: Equal width (flex grow, basis-0)

**Visual differences by variant:**
- Y-axis labels: Can show different values/units (e.g., percentages, counts, dates)
- Grid lines: Can be adjusted to match data scale
- Bars: Each can have different configurations (size, state, type, progress level)
- Overall layout: Maintains horizontal arrangement with equal spacing

## 4. Behavior logic

**Interaction states:**
- Default: All components display in their configured states
- Hover: Individual Vertical Marker can show hover overlay (via isHover prop)
- Selected: Individual Vertical Marker can be in Selected state (different text styling)
- Inactive: Individual Vertical Marker can be in Inactive state (reduced opacity)

**Click behavior:**
- TODO (should Vertical Markers be clickable? What happens on click?)
- TODO (should clicking a marker select it or trigger an action?)

**Data representation:**
- Each Vertical Marker represents a data point in time/sequence
- Y-axis legend provides scale/reference values
- Grid lines provide visual reference for reading values
- Bar heights represent values/levels (0-100% progress level or custom scale)
- Multiple markers show progression/trends over time
- Bars are evenly distributed horizontally regardless of number

**Responsiveness:**
- Container width: Flexible, adapts to parent width
- Container height: Flexible, adapts to parent height
- Y-axis legend: Fixed width based on content, doesn't shrink
- Bars container: Grows to fill available horizontal space
- Vertical Markers: Equal width distribution (each takes equal portion of available space)
- Grid lines: Scale with container height
- Minimum width: TODO (minimum container width for usability)
- Maximum width: TODO (if there's a max width constraint)

**Related elements:**
- Vertical Marker components: Core building blocks, one per data point
- Y-axis Legend: Provides vertical scale reference
- Grid lines: Provide horizontal reference lines for reading values
- X-axis labels: Displayed below each Vertical Marker (via Vertical Marker's text prop)

**Data structure:**
- Expected data format: Array of data points
- Each data point should contain:
  - Value(s) for bar height(s) - maps to progressLevel
  - Label text for X-axis - maps to Vertical Marker text prop
  - Optional: Size, quantity, state, bar type (isSegmented, isSaldo)
  - Optional: Hover state
- Y-axis labels: Array of scale values (e.g., ["100%", "75%", "50%", "25%", "0%"])
- Grid lines: Should match Y-axis label count or be configurable

## 5. Integration with Vertical Marker

The Bar Graph component uses Vertical Marker as its building block. Each data point in the graph is represented by a Vertical Marker instance with appropriate props:

- `text`: Label for the data point (X-axis label)
- `size`: Bar width (15, 20, 25, or 44) - typically consistent across all bars
- `quantity`: Number of bars (1 or 2) - for comparison views
- `state`: Visual state (Default, Selected, or Inactive)
- `isSegmented`: Whether to show segmented bars
- `isSaldo`: Whether to show saldo-style bars
- `isHover`: Whether to show hover overlay
- `progressLevel`: Bar height (0-100% or custom percentage)

All Vertical Markers in a Bar Graph should typically use the same size and quantity for visual consistency, but can have different states, progress levels, and bar types.

## 6. Design tokens reference

**Colors:**
- `--color-primitive-secondary`: #676767 (Y-axis legend text, default marker labels)
- `--color-primitive-primary`: #191919 (selected marker labels)
- `--color-primitive-neutral-2`: #d4d4d4 (grid lines)
- `--color-bg-brand-2`: #e2ddf6 (bar fill)
- `--color-container-transparent-1`: rgba(25, 25, 25, 0.05) (hover overlay)
- Category colors: Sand, Coral, Flamingo, Orchid, Amethyst, Indigo (for segmented bars)

**Typography:**
- `--font-family-primary`: TT Norms Tochka Extended
- `--font-weight-regular`: 400
- `--font-weight-medium`: 500
- `--font-size-xs`: 12px
- `--line-height-xs`: 15px
- `--letter-spacing-xs`: 0.12px

**Spacing:**
- Y-axis legend padding: 0px top, 10px right, 13px bottom, 0px left
- Grid padding: 8px top, 0px bottom
- Vertical Marker gap: 5px (internal gap between bar and label)
- Vertical Marker padding-top: 7px
- Grid bottom inset: 20px (space for labels)

**Rounding:**
- `--rounding-1-5x`: 6px (bar border radius, inherited from Vertical Marker)

## 7. Implementation notes

1. **Vertical Marker dependency**: Bar Graph requires Vertical Marker component to be implemented first (already done)
2. **Grid lines**: Grid lines are horizontal only, positioned absolutely. Can be implemented as SVG lines or div elements with borders
3. **Equal distribution**: Vertical Markers should use flex: grow with basis-0 for equal width distribution
4. **Y-axis legend**: Should be flexible to accept any number of labels, distributed evenly with justify-between
5. **Data mapping**: Need to determine how data values map to:
   - Bar heights (progressLevel)
   - Y-axis scale labels
   - Grid line positions
6. **Accessibility**: TODO (keyboard navigation, screen reader support, ARIA labels for graph data)
7. **Responsive behavior**: Component should adapt to different container sizes while maintaining proportions

## 8. Figma reference

- **Design File**: Обратная связь
- **Node ID**: 58776-12861
- **Component Name**: Bar Graph
- **Mode**: Dev
- **Pattern Reference**: [Patterns - Bar Graph](https://www.figma.com/design/CBS0qZz6lqoU2Mh3StNwV7/Patterns?node-id=46608-160998)
- **Legend Y Guide**: [Graph Legend Documentation](https://tochka-eki-yonote.tochka.com/doc/graph-legend-vEphuYiXNw)
