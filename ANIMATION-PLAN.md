# Animation Plan — Home Page

## Tools Used

| Tool | Purpose |
|---|---|
| CSS `@keyframes` | Hero entrance (above the fold, no scroll trigger) |
| Custom `useFadeIn` hook + CSS | Scroll-triggered fade-ups across sections |
| GSAP + ScrollTrigger | About section sticky image + parallax text reveal |
| Scroll event listener | Header background transition on scroll |

---

## 1. Header

| Element | Animation | Type | Details |
|---|---|---|---|
| Header background | Transparent → solid on scroll | Scroll listener | Add solid bg class when `scrollY > 50`, remove when back to top |

---

## 2. Hero Section

> CSS `@keyframes` only — no scroll trigger needed (above the fold).

| Element | Animation | Delay | Duration |
|---|---|---|---|
| Background image | Slow zoom (scale 1.0 → 1.05) | 0s | ~15s, continuous loop |
| `.section-label` ("Exquisite Event Architecture") | fadeInUp | 0.3s | 0.8s |
| `h1` ("We Create Unforgettable Experiences") | fadeInUp | 0.5s | 0.8s |
| `p` (description paragraph) | fadeInUp | 0.7s | 0.8s |
| CTA button ("Plan Your Event") | fadeInUp | 0.9s | 0.8s |

---

## 3. About Section

> GSAP + ScrollTrigger — premium scroll-linked timeline.

### Section Intro

| Element | Animation | Type |
|---|---|---|
| `.icon-divider` (SVG) | fadeIn (opacity only, no Y movement) | Custom hook |
| `h2` ("Our Philosophy") | fadeInUp | Custom hook |
| `p` (philosophy description) | fadeInUp, delay 0.15s | Custom hook |

### Story Blocks (x4 — Phase 01 to 04)

| Element | Animation | Type | Details |
|---|---|---|---|
| `.story-img` | Sticky pin + subtle parallax | GSAP ScrollTrigger | Image stays pinned while text scrolls alongside. Slight parallax (image moves at 0.8x scroll speed) |
| `.story-content` label | fadeIn | GSAP scrub | Fades in as scroll reaches the block |
| `.story-content` h2 | Slide in from right (odd) / left (even) | GSAP scrub | Tied to scroll progress through the block |
| `.story-content` p | fadeInUp | GSAP scrub | Follows h2, slight delay in scroll progress |

**Scroll behavior:** Each story block occupies ~150vh of scroll distance. The image pins at center while the text content animates in. When text is fully revealed, the pin releases and the next block begins.

---

## 4. Services Section

> Custom `useFadeIn` hook — simple staggered reveals.

| Element | Animation | Stagger Delay |
|---|---|---|
| `.section-label` ("Curated Offerings") | fadeInUp | 0s |
| `h2` ("Event Disciplines") | fadeInUp | 0.1s |
| `.service-card` #1 (Weddings) | fadeInUp | 0.1s |
| `.service-card` #2 (Corporate) | fadeInUp | 0.2s |
| `.service-card` #3 (Private) | fadeInUp | 0.3s |
| `.service-card` #4 (Concierge) | fadeInUp | 0.4s |
| `.service-icon` inside each card | Scale 0.8 → 1.0 + fade | Tied to card reveal |

---

## 5. Portfolio Section

> Custom `useFadeIn` hook — scale + fade variant.

| Element | Animation | Stagger Delay |
|---|---|---|
| `.section-label` ("The Archive") | fadeInUp | 0s |
| `h2` ("Selected Works") | fadeInUp | 0.1s |
| `.portfolio-item` #1 | fadeInScale (opacity 0 + scale 0.95 → 1) | 0.0s |
| `.portfolio-item` #2 | fadeInScale | 0.1s |
| `.portfolio-item` #3 | fadeInScale | 0.15s |
| `.portfolio-item` #4 | fadeInScale | 0.2s |
| `.portfolio-item` #5 | fadeInScale | 0.25s |
| `.portfolio-item` #6 | fadeInScale | 0.3s |
| "View Full Archive" button | fadeInUp | 0.4s |

---

## 6. Testimonials Section

> Custom `useFadeIn` hook — gentle fade sequence.

| Element | Animation | Delay |
|---|---|---|
| `.icon-divider` (quote SVG) | fadeIn (opacity only) | 0s |
| Blockquote text | fadeInUp | 0.2s |
| Author image + name | fadeInUp | 0.4s |
| Pagination dots | fadeIn (opacity only) | 0.6s |

---

## 7. Footer

> Custom `useFadeIn` hook.

| Element | Animation | Delay |
|---|---|---|
| `.footer-info` (left column) | fadeInUp | 0s |
| `.contact-form-wrapper` (right column) | fadeInUp | 0.2s |
| Bottom bar (copyright + links) | fadeIn (opacity only) | 0.3s |

---

## CSS Classes Reference

```
.fade-in          → opacity 0 → 1, translateY(30px) → 0
.fade-in-scale    → opacity 0 → 1, scale(0.95) → 1, translateY(20px) → 0
.visible          → triggered state (added by hook or GSAP)
```

## Dependencies to Install

```
gsap (core)
@gsap/react
```

ScrollTrigger is included in the gsap package — just needs to be registered.
