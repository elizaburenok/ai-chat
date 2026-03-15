# PageAction Component - Design Analysis

## Overview
The PageAction component is an interactive element designed to open a sidebar. It's based on the "LinkCell" component from Figma design.

## Component Structure

### Visual Layout
- **Container**: Horizontal flex layout with rounded corners
- **Background**: Light gray/transparent background (`var(--color-container-transparent-1)`)
- **Layout Direction**: Horizontal (flex-row)
- **Alignment**: Items centered vertically

### Content Elements (Left to Right)

1. **Left Icon (Optional)**
   - **Size**: 30px × 30px
   - **Position**: Left side of the component
   - **Color**: Brand color or primary color
   - **Spacing**: Gap of 10px between icon and text

2. **Text Content (Required)**
   - **Layout**: Vertical flex column (when description is present)
   - **Gap**: 4px between title and description
   - **Alignment**: Center-aligned

   **Title (Required)**
   - **Content**: Main label text (e.g., "Title")
   - **Typography**:
     - Font Family: `TT Norms Tochka Extended`
     - Font Weight: `500` (Medium)
     - Font Size: `16px`
     - Line Height: `20px` (122.222%)
     - Letter Spacing: `0px`
     - Color: `var(--Primitive/Brand, #835de1)` (Brand purple)
   - **Text Style**: `TTN 500/L`
   - **Overflow**: Ellipsis for long text
   - **Width**: Full width of text container

   **Description (Optional)**
   - **Content**: Secondary text (e.g., "Text S")
   - **Typography**:
     - Font Family: `TT Norms Tochka Extended`
     - Font Weight: `400` (Regular)
     - Font Size: `14px`
     - Line Height: `18px` (128.571%)
     - Letter Spacing: `0.14px`
     - Color: `var(--Primitive/Secondary, #676767)` (Secondary gray)
   - **Layout**: Flex column, justify-end

### Spacing & Padding
- **Internal Gap**: 10px between icon and text content
- **Vertical Gap**: 4px between title and description (when both present)
- **Padding**: Symmetrical padding around content (appears to be ~10px vertical, ~16px horizontal)
- **Border Radius**: Rounded corners (appears to be ~10px based on current implementation)

### Interactive States
- **Default**: Light gray/transparent background
- **Hover**: Slightly darker background (indicates interactivity)
- **Active/Clicked**: Opens sidebar (functionality to be implemented)
- **Focus**: Visible focus outline for accessibility

### Design Tokens Used
- **Color - Brand**: `#835de1` (Primitive/Brand)
- **Color - Secondary**: `#676767` (Primitive/Secondary)
- **Color - Background**: `rgba(25, 25, 25, 0.05)` (Container/Transparent-1)
- **Typography - Title**: TTN 500/L (18px, 500 weight, 22px line-height)
- **Typography - Description**: TTN 400/M (14px, 400 weight, 18px line-height, 0.14px letter-spacing)

### Component Props Structure (Proposed)

```typescript
interface PageActionProps {
  /** Main title text */
  title: string;
  /** Optional description text below title */
  description?: string;
  /** Optional left icon */
  iconLeft?: React.ReactNode;
  /** Right chevron icon (automatically included) */
  /** Click handler - opens sidebar */
  onClick?: () => void;
  /** Disabled state */
  disabled?: boolean;
  /** Additional CSS class */
  className?: string;
}
```

### Key Changes from Current Implementation
1. **Title Color**: Changed from white/primary to brand color (#835de1)
2. **Typography**: Title uses 18px/500 weight instead of current size variants
3. **Layout**: Vertical text layout when description is present
4. **Purpose**: Explicitly designed to open sidebar (not just a button)
5. **Visual Style**: More cell-like appearance with transparent background

### Implementation Notes
- Component should be clickable and trigger sidebar opening
- No sidebar implementation needed yet - just the click handler
- Chevron icon should be included by default (not via prop)
- Description is optional but should be styled consistently when present
- Component should maintain accessibility (keyboard navigation, focus states)

