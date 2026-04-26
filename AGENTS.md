# AGENTS.md

Guidance for AI coding agents working in this repo.

## Project

**Speed Patterns** — a collection of product / UX / visual design patterns for fast web sites, published at <https://www.speedpatterns.com/>.

The site is aimed at product managers, designers and front-end developers planning speed-aware experiences from inception. Articles concentrate on **user-experience challenges and solutions**, not implementation specifics.

Technical detail is supporting material; if a pattern can only be understood through code, it's probably the wrong altitude for this site. If more technical details are written up in an article somewhere, link to it instead, no need to be an authoritative source of technical information.

## Build

- Static site generator: [Eleventy 1.0](https://www.11ty.dev/) (config in [.eleventy.js](.eleventy.js))
- Markdown: `markdown-it` with `html: true`
- Excerpts: split on `<!-- excerpt -->` (used by the homepage card list)
- Syntax highlighting: [`@11ty/eleventy-plugin-syntaxhighlight`](https://github.com/11ty/eleventy-plugin-syntaxhighlight) (Prism, build-time only — no runtime JS performs token coloring)

Common commands:

- `npm run start` — local dev server with live reload
- `npm run build` — one-shot build into `_site/`
- `npm run format` — run [Prettier](https://prettier.io/) across the project

## Formatting

Run `npm run format` after making any changes to project files. Prettier is configured to format Markdown, CSS, JS, JSON and YAML; Nunjucks templates, SVG assets, the build output and `package-lock.json` are excluded via `.prettierignore`.

This is a hard rule — every commit on this branch should be formatted. If you make a change to a pattern article, the issue template, AGENTS.md, CONTRIBUTING.md, the stylesheet, the Eleventy config or any other Prettier-supported file, run `npm run format` before staging.

## Repo layout

```
.eleventy.js              Eleventy config (plugins, collections, filters)
src/
  index.njk               Homepage (lists patterns by `order`)
  patterns/*.md           One file per pattern (this is where new content lives)
  _includes/
    layout.njk            Base HTML layout (header, nav, sidebar, copy-button JS)
    article.njk           Per-article wrapper (title + OG meta)
  assets/                 Images, SVGs, og_image files, thumbnails
  style.css               All site styles (single file)
_site/                    Build output (gitignored)
CONTRIBUTING.md           Public contributor guide (how new patterns are proposed)
```

## Pattern article conventions

Each pattern article in [src/patterns/](src/patterns/) is a Markdown file with frontmatter:

```yaml
---
layout: article.njk
title: <Title Case Pattern Name>
tags: pattern
thumbnail: /assets/<pattern>_thumbnail.svg
og_image: /assets/<pattern>_og_image.jpg
order: <integer; controls homepage position>
---
```

- The `tags: pattern` value adds the article to the `pattern` collection (used by the side nav and the ordered homepage list)
- `order` is the homepage sort key; existing values are 1 (Fast Start), 2 (Immutable Layout), 3 (Skeletal Designs); new patterns continue from there
- `thumbnail` shows on the homepage card; `og_image` powers the social-share preview

### Body structure

A short opening paragraph that frames the user-experience problem, followed by `<!-- excerpt -->`, followed by the rest of the article. The excerpt feeds the homepage card.

Preferred section order:

1. Intro paragraph + `<!-- excerpt -->` separator
2. **The Problem** — the UX failure mode the pattern fixes
3. **Solution** — the design / UX approach (no code yet)
4. **Why This Works** or **Why This Matters** — the principle behind it
5. **Guidelines** — UX-level dos and don'ts
6. **Related Patterns** — links to other patterns on the site
7. **Technical Implementation** — code samples, APIs, library names (kept at the bottom on purpose)
8. **Resources** — outbound links to further reading

Technical detail belongs at the end of the article. Lead with UX/design content; introduce APIs and code only after the conceptual story is told.

### Content style

- Use sentence-case prose; avoid jargon without context
- Use the existing patterns in [src/patterns/](src/patterns/) as a tone reference
- **List items don't end with a period.** Internal sentences inside a multi-sentence bullet keep their internal periods, but the trailing period is dropped. Question marks, parenthetical closers and quoted speech are preserved
- Cross-link to other patterns with relative URLs like `/patterns/skeletal_designs/`

### Assets

- Images live in [src/assets/](src/assets/) and are passthrough-copied by Eleventy
- Prefer SVG for diagrammatic thumbnails and inline diagrams. Follow the visual language of the canonical example, [src/assets/skeletal_design_perception_time_diagram.svg](src/assets/skeletal_design_perception_time_diagram.svg):
  - White background (`#fff`)
  - Primary fills: yellow `#fd0` and orange `#ffa400` for content / state boxes
  - Zone tints used at low opacity (~0.1–0.2): green `#00f13e` for the "with pattern" / good zone and red `#f11300` for the "without pattern" / bad zone
  - Accent line color: blue `#0085f1` (e.g. for time / progression arrows)
  - Borders, arrows and labels: black `#000`
  - Typography: sans-serif (Arial / system stack)
  - Place a low-opacity `SPEEDPATTERNS.COM` wordmark in a corner for diagrams that may be reused outside the site
- The site chrome (header, nav, sidebar) uses a separate warm-beige palette (`#fff4de`, `#f0e6d3`, `#a98c5a`, `#2D3866`, `#4F63B3`) — that palette is for the page itself, not for in-article diagrams
- For new patterns, the site-wide [src/assets/speed_patterns_og_image.jpg](src/assets/speed_patterns_og_image.jpg) is an acceptable temporary `og_image` until a per-pattern one is designed

## Code blocks

Code samples are highlighted at build time by Prism (via the Eleventy plugin) and themed by CSS in [src/style.css](src/style.css). Each block:

- Has a colored navy background with a brand-blue left-border accent
- Includes a "Copy" button injected by a small script in [src/\_includes/layout.njk](src/_includes/layout.njk)
- Token coloring is **CSS only** — never add a runtime JS syntax highlighter

Always tag fenced code blocks with a language (`html`, `css`, `js`, etc.) so Prism can tokenize them.

## Workflow

- Branch off `master`; one feature per branch
- One pattern = one PR. Bundle code-block, asset and config changes into their own PRs (don't co-mingle with article content)
- Run `npm run format` before staging — see the **Formatting** section above
- Default base branch: `master`
- The repo has two remotes: `origin` (Speed-Patterns/speed-patterns, the canonical one) and `alex`. Push to `origin` unless told otherwise
- Don't force-push without explicit user approval; if rebasing a shared branch is needed, use `--force-with-lease`

## Things to avoid

- Don't run `npm audit fix` or upgrade dependencies as part of unrelated work — leave dependency PRs to Dependabot or a focused upgrade PR
- Don't add runtime syntax highlighters or any other library that does coloring at page load — Prism at build time is the only colorization mechanism
- Don't put trailing periods on list items
- Don't introduce CLAUDE.md or other agent-config files without checking first; this AGENTS.md is the canonical agent guidance
