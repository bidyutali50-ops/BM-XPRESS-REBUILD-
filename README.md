# BM Xpress — landing page rebuild

Next.js 15 (App Router) · TypeScript · Tailwind v4 · GSAP + @gsap/react

## Install

```bash
npm i gsap @gsap/react
```

Tailwind v4 is assumed (tokens live in `@theme` inside `app/globals.css`).
If you are on Tailwind v3, move the `@theme` block into `tailwind.config.ts`
under `theme.extend`.

## Files

```
app/layout.tsx          fonts + metadata
app/globals.css         design tokens, type scale, utilities
app/page.tsx            section composition
lib/gsap.ts             single plugin registration point
lib/useReveal.ts        shared scroll-reveal hook
components/
  LifecycleRail.tsx     signature: page-long delivery-state rail
  Nav.tsx
  Hero.tsx
  HubStrip.tsx          hub marquee
  Lifecycle.tsx         four delivery states
  Services.tsx
  Network.tsx
  Technology.tsx
  FinalCTA.tsx
  Footer.tsx
```

## Design system

The accent palette is the order lifecycle — there is no decorative brand
colour. Every non-neutral colour on the page means a delivery state:

| Token        | Hex       | Means        |
| ------------ | --------- | ------------ |
| `queued`     | `#98A2AC` | Queued       |
| `assigned`   | `#E8A33D` | Assigned     |
| `transit`    | `#3B6FE0` | In transit   |
| `delivered`  | `#2F9E6B` | Delivered    |

Neutrals: `ink #0E1319`, `ink-2 #1A222C`, `paper #F2F4F1`, `paper-2 #E3E7E1`.

Type: Bricolage Grotesque (display), Public Sans (body), JetBrains Mono
(waybills, hub codes, status labels).

## Motion

One orchestrated load sequence in the hero, one shared reveal system for every
section, one ambient loop in the ticker and hub strip. All of it goes through
`gsap.matchMedia()` and resolves to final state under
`prefers-reduced-motion: reduce`.

`useGSAP` handles cleanup, so Fast Refresh and route re-mounts will not stack
duplicate tweens.

## Before deploy

- [ ] Real contact email and phone in `FinalCTA.tsx` (placeholder note is on the page)
- [ ] No sample or placeholder data remains on the page
- [ ] Add the eight confirmed clients as a logo row if you want one back
- [ ] No metrics are claimed anywhere on this page. If you add any, source them.

## Placeholders you must fill or delete

Two sections ship with fake content on purpose, clearly marked in the source:

- `components/Stats.tsx` — four figures. Two are real (5 hubs, 8 brands), two
  are set to `0` and labelled "set this". Put in numbers you can evidence, or
  delete the whole section. A stat you cannot defend in a sales call is worse
  than no stat.
- `components/TrustedBy.tsx` — "Client one" through "Client eight". Swap in the
  eight confirmed names, or delete.

## Page order

Hero · Hub strip · Stats · Services · Industries · Lifecycle · Network ·
Integrations · Technology · Onboarding · Trusted by · FAQ · Contact

## The 3D

CSS 3D, not WebGL. `lib/useTilt.ts` tracks the pointer and drives `rotationX`
and `rotationY` on service cards via `gsap.quickTo`, with the inner content
lifted on `translateZ` for parallax between the card face and its text.

It costs nothing in bundle size, composites on the GPU, and is skipped
entirely on coarse pointers and under `prefers-reduced-motion`. Three.js would
have added roughly 150 kB and a real paint cost for the same impression of
depth.
