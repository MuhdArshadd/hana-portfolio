# Hana Humaira — portfolio

A responsive, single-page Next.js portfolio implemented from `02_WEBSITE_DEVELOPMENT_SPEC_DRAFT.txt`, with factual content curated from `01_PROFILE_AND_BRANDING.txt`.

## Run locally

```sh
npm install
npm run dev
```

Open http://127.0.0.1:3000. Run `npm run build` for a production static export in `out/`. Deploy with Vercel (Next.js preset) or any static host serving `out/`.

## Content

Edit `lib/content.ts` for projects, skills, achievements, LinkedIn, and the resume URL. Add an approved PDF to `public/` and set `resumeUrl` to its path to enable downloading. The hero uses an original typographic monogram rather than a substitute portrait. Project covers are labeled concept artwork, not application screenshots.

Before public launch: approve contact details and final copy; supply a portrait, resume, project screenshots and repository URLs as desired. Beyondsoft responsibilities and exact CGPA are deliberately omitted. Email remains unpublished pending the permission noted in the profile brief. No contact form or fake download links are included.

The site includes semantic sections, a skip link, keyboard focus styles, reduced-motion support, a touch-friendly mobile menu, project notes toggles, and desktop-only pixel cursors. No analytics or external font requests.

## Visual enhancements

Self-hosted Manrope body text pairs with Cormorant Garamond editorial headings and italic accents, distributed through Fontsource under their included open font licenses. No external font requests. Lower Pixel is no longer loaded.

The Neko cursor cat (adapted from https://github.com/crgimenes/neko) appears only above 720px with a mouse, ignores pointer interactions, and is disabled for reduced motion. Background grid: 120px desktop, 88px mobile.

Neko uses the pinned upstream sprite sheet and a browser adaptation of eight-direction chasing, grooming, yawning, sleeping, and waking. It is silent and click-through. Upstream BSD-2-Clause license and source revision are retained in public/neko/.
