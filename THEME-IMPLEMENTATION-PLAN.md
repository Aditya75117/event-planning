# Plan: Dark & Light Theme with Color Variables

**Goal:** Support dark (current) and light themes using a single set of semantic color variables. This document is a plan only—implementation can be done later.

---

## 1. Current State (Dark Theme)

Existing variables in `globals.css`:

| Variable | Current (Dark) | Role |
|----------|----------------|------|
| `--bg-canvas` | `#121316` | Page/section background |
| `--bg-surface` | `#191A1E` | Cards, footer, form container |
| `--bg-surface-light` | `#222328` | Hover, loading states |
| `--accent-gold` | `#C5A880` | Accent, links, buttons, gold text |
| `--accent-gold-dim` | `rgba(197,168,128,0.4)` | Focus rings, shadows |
| `--text-main` | `#EAEAEA` | Headings, body |
| `--text-muted` | `#8A8B8F` | Secondary text, placeholders |
| `--border-subtle` | `rgba(255,255,255,0.06)` | Dividers, borders |
| `--border-gold` | `rgba(197,168,128,0.15)` | Button/outline borders |

Non-color tokens to keep as-is: `--font-display`, `--font-sans`, `--space-*`, `--ease-slow`.

---

## 2. Light Theme Values (To Define)

Use the **same variable names** everywhere; only the values change by theme.

Proposed light values (tune to match design):

| Variable | Proposed Light | Notes |
|----------|----------------|-------|
| `--bg-canvas` | `#F8F6F3` or `#FAF9F7` | Warm off-white |
| `--bg-surface` | `#F0EDE8` or `#F3F0EB` | Slightly darker than canvas |
| `--bg-surface-light` | `#E8E4DE` | Hover / elevated surfaces |
| `--accent-gold` | `#B8956E` or keep `#C5A880` | Slightly deeper gold on white if needed |
| `--accent-gold-dim` | `rgba(184,149,110,0.25)` | Softer focus/glow |
| `--text-main` | `#1A1A1C` or `#2C2C2E` | Primary text |
| `--text-muted` | `#5C5C5E` or `#6B6B6D` | Secondary text |
| `--border-subtle` | `rgba(0,0,0,0.08)` | Subtle borders |
| `--border-gold` | `rgba(184,149,110,0.35)` | Gold borders on light |

Optional: add `--accent-gold-glow` for hover (e.g. light: `rgba(184,149,110,0.15)`).

---

## 3. Strategy: One Set of Semantic Variables, Two Themes

- Keep **one** set of names (e.g. `--bg-canvas`, `--text-main`, …) used across all components.
- **Theme** = which set of values those names resolve to:
  - **Dark:** current values (e.g. in `[data-theme="dark"]` or `:root`).
  - **Light:** new values (e.g. in `[data-theme="light"]`).
- Do **not** introduce separate names like `--bg-canvas-dark` / `--bg-canvas-light` in component CSS; only the root/theme block should define different values per theme.

This keeps components theme-agnostic and avoids duplication.

---

## 4. Where to Apply the Theme

- **Apply on `<html>`:** e.g. `<html lang="en" data-theme="dark">` or `data-theme="light"`.
- All CSS that uses the variables already applies to the tree under `html`, so no change to selectors is needed once variables are defined under `[data-theme="dark"]` and `[data-theme="light"]`.
- **Persistence:** store theme in `localStorage` (e.g. key `lumiere-theme`) and set `data-theme` on first paint and when user toggles.
- **Default:** prefer `data-theme="dark"` as default (current design); optionally respect `prefers-color-scheme: light` for first visit only, then user choice overrides.

---

## 5. Theme Token Structure in CSS

- **Option A – Class on `html`:**  
  `:root` or `html` = dark (current).  
  `html.theme-light` (or `html[data-theme="light"]`) { … } = light variable set.
- **Option B – Data attribute (recommended):**  
  `html[data-theme="dark"]` { … }  
  `html[data-theme="light"]` { … }  
  No need to change `:root` semantics; just define the same variables in both blocks.

Keep **non-color** tokens (`--font-*`, `--space-*`, `--ease-slow`) in a single place (`:root` or a shared block) so they aren’t duplicated.

---

## 6. Overlays and Gradients (Theme-Dependent)

Several places use **hardcoded** dark overlays or backgrounds; these should become theme-aware:

- **Hero / contact hero:**  
  `linear-gradient(rgba(18,19,22,0.8), rgba(18,19,22,1))`  
  → e.g. `var(--hero-overlay-start)` and `var(--hero-overlay-end)` (dark: current; light: e.g. `rgba(248,246,243,0.7)`, `rgba(248,246,243,1)`).
- **Header:**  
  `rgba(18,19,22,0.9)` → e.g. `var(--header-bg)` (dark: current; light: `rgba(248,246,243,0.95)`).
- **Portfolio overlay on cards:**  
  `rgba(18,19,22,0.95)` → e.g. `var(--card-overlay)` (light: e.g. `rgba(26,26,28,0.9)`).
- **Modal:**  
  `rgba(18,19,22,0.98)` → e.g. `var(--modal-backdrop)` (light: e.g. `rgba(248,246,243,0.98)`).

Define these in the same `[data-theme="dark"]` / `[data-theme="light"]` blocks.

---

## 7. SVG and Inline Colors

- **Watermarks / decorative SVGs:** stroke/fill currently `#C5A880` or similar. Use `var(--accent-gold)` or a dedicated `--decorative-stroke` that matches `--accent-gold` per theme.
- **Contact select arrow:** stroke is gold; use `var(--accent-gold)`.
- **Spinner (contact submit):** circle stroke colors; use `var(--bg-canvas)` and `var(--accent-gold)` so they adapt to theme.

Any inline `style={{ color: '...', background: '...' }}` that affects theme should be replaced with variables (e.g. via a class that uses the variable) or a small set of theme-aware utility classes.

---

## 8. Achieving It: Same Variable Names + Tailwind Theme

You want **one set of variable names** that get **different values** for light vs dark, and to use **Tailwind theme** so utilities like `bg-canvas` and `text-main` apply those colors. Here’s how.

### 8.1 Three-layer flow

1. **Theme selector** sets the **semantic variables** (same names, different values).
2. **Tailwind theme** maps its **theme colors** to those variables (`var(--…)`).
3. **Components** use Tailwind classes (`bg-canvas`, `text-main`, etc.) or raw `var(--bg-canvas)` in CSS.

When you switch `data-theme` on `<html>`, the semantic variables change, so both Tailwind utilities and any `var(--…)` usage update automatically.

### 8.2 Step 1: Define semantic variables per theme (CSS)

Define **one set of names** under each theme. Use `[data-theme="…"]` on `html` (or a class) so only one set is active at a time.

**Dark theme (e.g. default):**

```css
html[data-theme="dark"] {
  --bg-canvas: #121316;
  --bg-surface: #191A1E;
  --bg-surface-light: #222328;
  --accent-gold: #C5A880;
  --accent-gold-dim: rgba(197, 168, 128, 0.4);
  --text-main: #EAEAEA;
  --text-muted: #8A8B8F;
  --border-subtle: rgba(255, 255, 255, 0.06);
  --border-gold: rgba(197, 168, 128, 0.15);
  /* + overlay vars if you add them: --hero-overlay-start, --header-bg, etc. */
}
```

**Light theme:**

```css
html[data-theme="light"] {
  --bg-canvas: #F8F6F3;
  --bg-surface: #F0EDE8;
  --bg-surface-light: #E8E4DE;
  --accent-gold: #B8956E;
  --accent-gold-dim: rgba(184, 149, 110, 0.25);
  --text-main: #1A1A1C;
  --text-muted: #5C5C5E;
  --border-subtle: rgba(0, 0, 0, 0.08);
  --border-gold: rgba(184, 149, 110, 0.35);
}
```

- Default: set `<html data-theme="dark">` (or `"light"`) so one of these blocks always applies.
- Non-color tokens (`--font-*`, `--space-*`, `--ease-slow`) stay in `:root` or a shared block; they don’t need to be duplicated per theme.

### 8.3 Step 2: Wire Tailwind theme to those variables (Tailwind v4)

In Tailwind v4 you use `@theme` in CSS (e.g. in `globals.css`). Tailwind expects **`--color-*`** for colors. Point each theme color to your **semantic variable**:

```css
@import "tailwindcss";

@theme inline {
  /* Map Tailwind theme colors to your semantic variables */
  --color-canvas: var(--bg-canvas);
  --color-surface: var(--bg-surface);
  --color-surface-light: var(--bg-surface-light);
  --color-accent-gold: var(--accent-gold);
  --color-accent-gold-dim: var(--accent-gold-dim);
  --color-text-main: var(--text-main);
  --color-text-muted: var(--text-muted);
  --color-border-subtle: var(--border-subtle);
  --color-border-gold: var(--border-gold);
  /* Fonts / spacing unchanged */
  --font-display: var(--font-playfair), "Playfair Display", serif;
  --font-sans: var(--font-montserrat), "Montserrat", sans-serif;
}
```

Then Tailwind generates:

- `bg-canvas` → `background-color: var(--color-canvas)` → resolves to `var(--bg-canvas)` → dark or light value depending on `data-theme`.
- `text-main`, `text-muted`, `border-border-subtle`, etc. work the same way.

So: **same variable names** in your CSS (e.g. `--bg-canvas`), **different values** in `[data-theme="dark"]` vs `[data-theme="light"]`, and **Tailwind theme** only references those variables; it does not define the raw hex/rgba per theme.

### 8.4 Naming convention (Tailwind vs your variables)

- **Your semantic names** (what you set per theme): `--bg-canvas`, `--text-main`, `--accent-gold`, etc.
- **Tailwind theme names** (what utilities use): `--color-*`. So `--color-canvas` → `bg-canvas`, `text-canvas`; `--color-text-main` → `bg-text-main`, `text-text-main`. To get readable classes like `text-main` and `bg-canvas`, you want Tailwind to expose:
  - `--color-canvas` → `bg-canvas`, `text-canvas`, etc.
  - `--color-main` (for text) → `text-main`, `bg-main`, etc.

So in `@theme` you might have:

- `--color-canvas: var(--bg-canvas);`  → use as `bg-canvas`
- `--color-surface: var(--bg-surface);` → use as `bg-surface`
- `--color-main: var(--text-main);`     → use as `text-main`
- `--color-muted: var(--text-muted);`   → use as `text-muted`
- `--color-gold: var(--accent-gold);`   → use as `text-gold`, `border-gold`, `bg-gold`

That way you get one set of variable names (your semantics) and Tailwind applies them via its theme.

### 8.5 Summary of the approach

| Layer | Where | What |
|-------|--------|------|
| 1. Values per theme | `html[data-theme="dark"]` and `html[data-theme="light"]` | Set `--bg-canvas`, `--text-main`, etc. to different hex/rgba per theme. |
| 2. Tailwind theme | `@theme inline { … }` in CSS | Set `--color-*` to `var(--bg-canvas)`, `var(--text-main)`, etc. No raw colors here. |
| 3. Usage | Components | Use Tailwind classes (`bg-canvas`, `text-main`, `border-gold`) or in plain CSS `var(--bg-canvas)`. |

Result: one set of names, two themes, Tailwind theme applies the colors everywhere.

---

## 9. Implementation Order (When You Implement)

1. **Define variables and wire Tailwind**
   - Add semantic color (and overlay) variables under `html[data-theme="dark"]` and `html[data-theme="light"]` with the values from sections 1 and 2.
   - In `@theme inline`, set Tailwind `--color-*` to `var(--bg-canvas)`, `var(--text-main)`, etc., so utilities like `bg-canvas` and `text-main` use the same names (see section 8).
   - Keep spacing/font/ease in one place (e.g. `:root`), not duplicated per theme.

2. **Replace hardcoded colors**
   - Grep for hex, `rgb()`, `rgba()` in `app/` and `components/`.
   - Replace with the new variables (including hero, header, modal, overlays, form focus, buttons, links).

3. **Theme provider and persistence**
   - Create a small React context (e.g. `ThemeProvider`) that:
     - Reads/writes `localStorage` and sets `html.dataset.theme` (or `className` if you use class-based approach).
     - Exposes `theme` and `setTheme('dark' | 'light')`.
   - Wrap the app in the provider (e.g. in root layout).

4. **Theme toggle**
   - Add a control (e.g. in Header) that calls `setTheme` and optionally shows an icon for current theme.
   - On first load, set `data-theme` from localStorage (or `prefers-color-scheme`) before paint to avoid flash.

5. **Visual pass**
   - Check every page and component in both themes: contrast, borders, focus states, images on light (e.g. hero overlay strength), and adjust variable values if needed.

---

## 10. Light Theme – What to Confirm With Design

- Exact hex for canvas/surface (warm vs neutral).
- Whether gold stays `#C5A880` or is slightly darker on light.
- Whether any images need a stronger/softer overlay in light mode (and add variables for that if needed).

---

## 11. Summary

- **Variables:** One semantic set (`--bg-canvas`, `--text-main`, etc.) + overlay variables for hero, header, modal, card.
- **Themes:** Two blocks (`[data-theme="dark"]` and `[data-theme="light"]`) that set those variables; current design = dark; light values as in the table above (or from your design).
- **Scope:** Apply theme on `<html>`, persist in `localStorage`, toggle via React context and a header control.
- **Cleanup:** Replace all hardcoded colors and overlay rgba with these variables, and make SVGs/inline styles use variables so both themes look correct.

---

*Created for the Lumière events-planning project. Implement when ready.*
