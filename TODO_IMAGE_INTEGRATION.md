# TODO: About page image integration

## Goal
Ensure the About page uses image assets under `public/images/about/*`.

## Current findings
- `src/app/about/page.tsx` renders `about_us.sections[*].image.image_url`.
- `src/data/about.json` currently points to mixed folders:
  - `/assets/images/about/accommodation.png` (may not match `public/images/about`)
  - `/assets/images/natureHighlights/...`
  - `/assets/images/durg-bhumi-gallery/...`

## Plan
1. Decide 4 image URLs from `public/images/about/*` to map to the 4 sections.
2. Update `src/data/about.json`:
   - For each section's `image.image_url`, use paths under `/images/about/...`.
   - Keep existing alt_text.
3. Run Next.js lint/build to confirm paths resolve.

## Done
- [ ] Update about.json with correct `/images/about/*` paths
- [ ] Verify via `npm run build` or `npm run lint`.

