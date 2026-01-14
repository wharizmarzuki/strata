# Strata SVG Rebuild

This project recreates the SVG layout in `img/Utama.svg` using real HTML, CSS Modules, and React components.

## Run

```bash
npm install
npm run dev
```

## Structure

- `app/page.tsx`: Main layout and interaction wiring.
- `app/page.module.css`: Pixel-placed styles tied to the SVG coordinates.
- `components/`: Reusable UI pieces (buttons, cards, modal).
- `public/img/`: Extracted pattern fills used by the SVG, now used as CSS background images.

## SVG mapping

- `#btnPrimary` -> `PrimaryButton` in `app/page.tsx` (opens modal `Sign up`).
- `#navHome` -> `NavLink` in `components/NavLink.tsx` (routes to `/`).
- `#cardFeature1` -> first `FeatureCard` in `app/page.tsx` (hover raise + shadow).
- `#inputEmail` -> controlled input in the CTA section.

## Notes

- The SVG has no `<text>` nodes; text was recreated manually as semantic HTML. If you need exact copy, replace the placeholders in `app/page.tsx`.
- The artboard is `1440x5366` and scales down proportionally on smaller screens using `transform: scale()`.
# strata
