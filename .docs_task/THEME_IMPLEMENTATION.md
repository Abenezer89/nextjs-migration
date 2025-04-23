# Theme Implementation Guide

## Architecture Overview

The theme system is built on three main components:

1. **CSS Variables** (`src/app/globals.css`)
   - Defines all color values in HSL format
   - Provides a single source of truth for colors
   - Enables easy theme customization

2. **Theme Configuration** (`src/lib/theme.ts`)
   - Maps CSS variables to theme tokens
   - Provides type-safe access to theme values
   - Serves as the interface for theme usage

3. **Tailwind Configuration** (`tailwind.config.ts`)
   - Integrates theme variables with Tailwind
   - Enables theme usage through Tailwind classes
   - Maintains consistency across the application

## Usage Guidelines

### 1. Using Theme Colors

#### With Tailwind Classes
```tsx
// Preferred method for most use cases
<div className="bg-primary text-primary-foreground">
  Content
</div>
```

#### With CSS Variables
```tsx
// For custom styling or dynamic values
<div style={{
  backgroundColor: 'hsl(var(--primary))',
  color: 'hsl(var(--primary-foreground))'
}}>
  Content
</div>
```

#### With Theme Object
```tsx
import { theme } from '@/lib/theme'

// For programmatic access
const primaryColor = theme.colors.primary
```

### 2. Component Styling

#### Basic Component
```tsx
function Button({ children }) {
  return (
    <button className="
      bg-primary 
      text-primary-foreground 
      hover:bg-primary/90 
      transition-colors
      rounded-lg
      px-4 py-2
    ">
      {children}
    </button>
  )
}
```

#### Job-Specific Component
```tsx
function JobCard({ children }) {
  return (
    <div className="
      bg-job-card
      text-job-text
      border border-gray-200
      rounded-lg
      p-6
      hover:shadow-md
      transition-all
    ">
      {children}
    </div>
  )
}
```

### 3. Customizing Theme

#### Adding New Colors
1. Add CSS variable in `globals.css`:
```css
:root {
  --new-color: 215 91% 40%;
}
```

2. Add to theme configuration in `theme.ts`:
```typescript
export const theme = {
  colors: {
    // ... existing colors
    newColor: 'hsl(var(--new-color))'
  }
}
```

3. Add to Tailwind config if needed:
```typescript
theme: {
  extend: {
    colors: {
      new: 'hsl(var(--new-color))'
    }
  }
}
```

## Migration Guide

### 1. Replacing Hardcoded Colors

Before:
```tsx
<div style={{ backgroundColor: '#2557a7' }}>
  Content
</div>
```

After:
```tsx
<div className="bg-primary">
  Content
</div>
```

### 2. Updating Tailwind Classes

Before:
```tsx
<div className="bg-blue-600 text-white">
  Content
</div>
```

After:
```tsx
<div className="bg-primary text-primary-foreground">
  Content
</div>
```

### 3. Handling Hover States

Before:
```tsx
<button className="bg-blue-600 hover:bg-blue-700">
  Button
</button>
```

After:
```tsx
<button className="bg-primary hover:bg-primary/90">
  Button
</button>
```

## Best Practices

1. **Always use theme variables**
   - Never use hardcoded color values
   - Avoid using Tailwind's built-in colors
   - Use theme tokens for consistency

2. **Maintain color relationships**
   - Use foreground colors with their corresponding backgrounds
   - Keep contrast ratios in mind
   - Follow the established color hierarchy

3. **Component styling**
   - Use Tailwind classes when possible
   - Keep styles consistent across similar components
   - Document any custom styling requirements

4. **Testing**
   - Verify colors in different contexts
   - Check contrast ratios for accessibility
   - Test hover and active states

## Troubleshooting

### Common Issues

1. **Color not applying**
   - Check if the CSS variable exists in `globals.css`
   - Verify the theme mapping in `theme.ts`
   - Ensure Tailwind configuration includes the color

2. **Inconsistent colors**
   - Verify all instances use theme variables
   - Check for hardcoded color values
   - Ensure proper color relationships

3. **Accessibility issues**
   - Use appropriate foreground/background pairs
   - Check contrast ratios
   - Follow WCAG guidelines

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [CSS Variables Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [WCAG Color Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html) 