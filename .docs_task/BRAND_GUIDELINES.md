# Brand Guidelines

## Typography

### Font Family
- Primary Font: Inter (from Google Fonts)
- Fallback Fonts: system-ui, Arial, sans-serif
- Font Loading: Preloaded with swap display

### Font Sizes
- Base Text: 14px
- Headings:
  - h1: 32px
  - h2: 20px
  - h3: 16px
- Button Text:
  - Small: 12px
  - Medium: 14px
  - Large: 16px

## Color System Architecture

### CSS Variable Structure
All colors are defined using CSS variables in HSL format for better color manipulation and consistency. The variables are defined in `src/app/globals.css` and referenced throughout the application.

### Theme Variable Mapping

#### Base Colors
| Color Name | CSS Variable | HSL Value | Usage |
|------------|--------------|-----------|-------|
| Background | `--background` | `0 0% 100%` | Main background color |
| Foreground | `--foreground` | `222.2 84% 4.9%` | Primary text color |
| Primary | `--primary` | `215 91% 40%` | Main brand color |
| Primary Foreground | `--primary-foreground` | `210 40% 98%` | Text on primary color |
| Secondary | `--secondary` | `210 40% 96.1%` | Secondary background |
| Secondary Foreground | `--secondary-foreground` | `222.2 47.4% 11.2%` | Text on secondary color |
| Muted | `--muted` | `210 40% 96.1%` | Muted background |
| Muted Foreground | `--muted-foreground` | `215.4 16.3% 46.9%` | Muted text |
| Accent | `--accent` | `210 40% 96.1%` | Accent color |
| Accent Foreground | `--accent-foreground` | `222.2 47.4% 11.2%` | Text on accent color |
| Destructive | `--destructive` | `0 84.2% 60.2%` | Error/destructive actions |
| Destructive Foreground | `--destructive-foreground` | `210 40% 98%` | Text on destructive color |

#### Job-Specific Colors
| Color Name | CSS Variable | HSL Value | Usage |
|------------|--------------|-----------|-------|
| Job Primary | `--job-primary` | `215 91% 40%` | Main job-related color |
| Job Secondary | `--job-secondary` | `0 0% 95%` | Secondary job background |
| Job Accent | `--job-accent` | `24 94% 53%` | Job highlight color |
| Job Background | `--job-background` | `0 0% 100%` | Job section background |
| Job Card | `--job-card` | `0 0% 100%` | Job card background |
| Job Text | `--job-text` | `0 0% 18%` | Primary job text |
| Job Muted | `--job-muted` | `0 0% 46%` | Muted job text |

### Color Usage Examples

#### Primary Color Usage
```css
/* Using Tailwind classes */
@apply bg-primary text-primary-foreground;

/* Using CSS variables directly */
background-color: hsl(var(--primary));
color: hsl(var(--primary-foreground));
```

#### Job Card Styling
```css
/* Using Tailwind classes */
@apply bg-job-card text-job-text border border-gray-200;

/* Using CSS variables directly */
background-color: hsl(var(--job-card));
color: hsl(var(--job-text));
border: 1px solid hsl(var(--border));
```

## Spacing and Layout

### Border Radius
- Large: 0.5rem
- Medium: calc(0.5rem - 2px)
- Small: calc(0.5rem - 4px)

### Container
- Center aligned
- Padding: 2rem
- Max width: 1400px (2xl breakpoint)

## Component Guidelines

### Buttons
- Border Radius: 3em
- Font Weight: 700
- Line Height: 1
- Padding:
  - Small: 10px 16px
  - Medium: 11px 20px
  - Large: 12px 24px

### Cards
- Background: bg-job-card
- Border: border-gray-200
- Border Radius: rounded-lg
- Shadow: shadow-sm

### Navigation
- Background: bg-job-card
- Border: border-b border-gray-200 (Navbar)
- Border: border-t border-gray-200 (Footer)

## Animations
- Fade In/Out: 0.3s ease-out
- Scale In: 0.3s ease-out
- Slide In: 0.3s ease-out

## Best Practices
1. Always use theme classes instead of hardcoded colors
2. Maintain consistent naming conventions
3. Test theme changes across all components
4. Verify responsive behavior
5. Use the provided color system for all UI elements
6. Follow the established spacing and layout guidelines

## Theme Customization
To customize the theme:
1. Update colors in `src/lib/theme.ts`
2. Modify CSS variables in `src/app/globals.css`
3. Adjust Tailwind configuration in `tailwind.config.ts`

## Implementation Notes
- All theme values are preserved from the original Vite implementation
- Dark mode support has been removed
- Components have been updated to use the new theme system
- Theme consistency has been verified across all components

## File Structure
- Theme Configuration: `src/lib/theme.ts`
- Global Styles: `src/app/globals.css`
- Tailwind Configuration: `tailwind.config.ts`
- Theme Provider: `src/components/ThemeProvider.tsx` 