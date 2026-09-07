/**
 * Semantic design tokens for the mobile app.
 *
 * These tokens mirror the naming conventions used in web artifacts (index.css)
 * so that multi-artifact projects share a cohesive visual identity.
 *
 * Replace the placeholder values below with values that match the project's
 * brand. If a sibling web artifact exists, read its index.css and convert the
 * HSL values to hex so both artifacts use the same palette.
 *
 * To add dark mode, add a `dark` key with the same token names.
 * The useColors() hook will automatically pick it up.
 */

const colors = {
  light: {
    // Legacy aliases (kept for backward compatibility)
    text: '#15324B',
    tint: '#58A9DB',

    // Core surfaces
    background: '#F5FAFF',
    foreground: '#15324B',

    // Cards / elevated surfaces
    card: '#FFFFFF',
    cardForeground: '#15324B',

    // Primary action color (buttons, links, active states)
    primary: '#10466F',
    primaryForeground: '#FFFFFF',

    // Secondary / less-emphasis interactive surfaces
    secondary: '#EAF5FC',
    secondaryForeground: '#10466F',

    // Muted / subdued elements (dividers, timestamps, placeholders)
    muted: '#EAF3F8',
    mutedForeground: '#6C8393',

    // Accent highlights (badges, selected items, focus rings)
    accent: '#DCEFFC',
    accentForeground: '#2386C8',

    // Destructive actions (delete, error states)
    destructive: '#C65C6A',
    destructiveForeground: '#FFFFFF',

    // Borders and input outlines
    border: '#D9EAF4',
    input: '#C7DFEE',
  },

  // Border radius (in px). Sync from the sibling web artifact's --radius
  // CSS variable. This value applies to cards, buttons, inputs, and modals.
  radius: 8,
};

export default colors;
