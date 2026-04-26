---
layout: article.njk
title: Enhance Fonts As They Load
tags: pattern
thumbnail: /assets/enhance_fonts_thumbnail.svg
og_image: /assets/speed_patterns_og_image.jpg
order: 6
---

Custom web fonts are a powerful brand and design tool, but they cost the user time. A font file has to be downloaded, parsed and applied before any text styled with it can be rendered. Until then, the browser must decide what to do — and the wrong default ruins the reading experience.

<!-- excerpt -->

## The Problem: FOIT and FOUT

Browsers have historically picked between two unpleasant defaults:

- **FOIT — Flash of Invisible Text.** The browser hides text styled with a custom font until the font finishes loading. The user sees a layout with empty holes where the words should be. On a slow connection, the page can be visually "loaded" for several seconds with no readable content.
- **FOUT — Flash of Unstyled Text.** The browser uses a fallback font immediately and swaps to the custom font when it loads. Text is readable from the first paint, but the swap can shift layout and feel jarring.

Pure FOIT is the worse failure mode: the user can't even start reading. But a careless FOUT — a fallback font with very different metrics — is also painful.

## Solution

Treat custom fonts as a progressive enhancement, not a render blocker. Show legible fallback text from the first paint, then upgrade to the branded font when it arrives. Choose the fallback so the swap is as imperceptible as possible.

### 1. Use `font-display: swap` (or `optional`)

The CSS `font-display` descriptor tells the browser how to behave while the custom font loads:

```css
@font-face {
  font-family: "BrandSans";
  src: url("/fonts/BrandSans.woff2") format("woff2");
  font-display: swap;
}
```

- `swap` — show fallback immediately, replace with custom font when ready. Best for branded text where the custom font is important.
- `optional` — show fallback immediately, only use the custom font if it arrives almost instantly (otherwise stick with the fallback). Best for users on slow connections, since it eliminates layout shift after the first frame.
- `fallback` — a compromise between the two.

Avoid the default (`auto`/`block`), which produces FOIT.

### 2. Match fallback metrics to the custom font

When the swap happens, lines may rewrap, headings may shift, and Cumulative Layout Shift increases. Modern CSS makes this almost solvable:

```css
@font-face {
  font-family: "BrandSans";
  src: url("/fonts/BrandSans.woff2") format("woff2");
  font-display: swap;
  size-adjust: 102%;
  ascent-override: 95%;
  descent-override: 22%;
  line-gap-override: 0%;
}
```

Tools like [Fontaine](https://github.com/unjs/fontaine) and Google's [Font Style Matcher](https://meowni.ca/font-style-matcher/) help find values that make a system fallback nearly indistinguishable in metrics from your branded font.

### 3. Prioritize the right fonts

Custom fonts are not free, even when handled well. Consider:

- **Self-host** rather than relying on third-party font CDNs — this eliminates an extra DNS lookup and connection.
- **Preload critical fonts** with `<link rel="preload" as="font" type="font/woff2" crossorigin>` so the browser fetches them before discovering them in CSS.
- **Subset your fonts** to only the characters and weights you actually use.
- **Use `woff2`** — it's the smallest format and supported everywhere.

## Why This Works

Reading begins with the first piece of legible text. By showing fallback text immediately, you let the user start reading at first paint instead of waiting for a network round-trip. The brand fidelity arrives a moment later — at a cost of a small, near-invisible re-render rather than a blank page.

## Related Patterns

- [Fast Start](/patterns/fast_start/) — fonts are one of the most common blockers of first contentful paint.
- [Immutable Layout](/patterns/immutable_layout/) — well-tuned fallback metrics keep the swap from causing layout shift.

## Resources

- [`font-display` on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display)
- [Font Style Matcher](https://meowni.ca/font-style-matcher/) by Monica Dinculescu
- [Improved font fallbacks (web.dev)](https://web.dev/articles/css-size-adjust)
