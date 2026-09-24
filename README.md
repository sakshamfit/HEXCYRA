# Lumina — Financial workspace

A responsive Lumina SaaS landing page built with Tailwind CSS and vanilla JavaScript. It includes an ambient aura background, image collage, enterprise feature cards, a finance dashboard preview, pricing and integrations, customer proof, and responsive navigation.

## Run locally

```sh
npm install
npm run build
npm run serve
```

The page is authored in `index.html`, with custom styles in `src/input.css` and interactions in `assets/js/main.js`. `npm run build` compiles the Tailwind stylesheet and stages the static site into `public/` for Vercel. The compiled stylesheet is committed so the page can also be opened directly.

## Background scene

The CSS aura and glow geometry render without external setup. To enable a published Unicorn Studio scene, add its project ID as `data-us-project` to an element inside `.aura-background-component`; the JavaScript initializes the published scene when that ID is present. The Unicorn Studio script is pinned to v1.4.29.

## Accessibility and responsive behavior

- Mobile navigation opens and closes with button, Escape, and link activation.
- Pricing switches between monthly and annual prices.
- Sections reveal with IntersectionObserver; reduced-motion settings show content immediately.
- Dashboard and comparison tables retain horizontal scrolling on narrow screens, with scrollbar chrome hidden.
- If external icon scripts fail, layout and page navigation remain usable.
