---
layout: article.njk
title: Load Something Meaningful First
tags: pattern
thumbnail: /assets/load_meaningful_first_thumbnail.svg
og_image: /assets/speed_patterns_og_image.jpg
order: 11
---

While a page loads, users want to see visible progress toward what they actually came for. Loading the header, navigation and footer first while the main content area sits empty does the opposite — it tells the user the page chrome is ready, but the thing they showed up for is still nowhere to be seen.

<!-- excerpt -->

## The Problem

A page where the navigation, logo and footer paint instantly while the main content region stays blank reads, to most users, as an error. They've seen the same shape before — a broken page, a failed deploy, a site that loaded the shell but couldn't fetch the data. The technical truth ("the rest is on its way") is invisible to them; what they see is a page that has finished loading the wrong things.

The cost is not just a few extra seconds of wait. It's a confidence problem:

- Users are unsure whether the page is broken or simply still loading
- They scroll, looking for the content elsewhere on the page
- They navigate away while the actual content is still in flight
- They reload, restarting the whole process and making the experience worse

Meanwhile, the user's goal — read the top story, search for a product, scan the headline of the article — is exactly what hasn't loaded yet.

## Solution

Decide, per view, what the user came for, and load that first. Push everything else — chrome, secondary widgets, below-the-fold modules, third-party content — behind it.

Concretely, a meaningful first paint looks different on different pages:

- **Article pages:** the headline, byline and first paragraph of the body
- **Search results:** the search box (so the user can refine) and the first result
- **Product pages:** the product title, primary image and price
- **Homepage:** the hero unit, the lead story, or the primary call-to-action
- **Dashboards:** the top KPI or the most-recently-relevant widget

The chrome — site-wide nav, footer, cookie banner, sidebar — can wait. None of it is what brought the user to this URL.

## Why This Matters

Users measure load progress by what they care about, not by what loaded first. A page that shows the headline at 1s and finishes everything else at 3s feels faster than a page that shows the nav and footer at 0.5s but doesn't reveal the headline until 3s — even though the second page technically painted earlier.

This is also what metrics like [Largest Contentful Paint (LCP)](https://web.dev/articles/lcp) try to capture. LCP rewards painting the largest, typically most meaningful element early — exactly the content the user came for. Designing the load sequence around the meaningful element, rather than around whatever happens to be cheapest to render, is what moves the metric and the experience together.

## Guidelines

- **Identify the meaningful element per page type.** This is a product and design decision, not an engineering one. Different page templates have different meaningful first content
- **Document the load order.** Tools like [Progressive Storyboards](https://calendar.perfplanet.com/2016/progressive-storyboards/) and [Priority Wireframes](https://www.speedcurve.com/blog/web-perf-wireframes/) make the intended load sequence explicit, so designers, engineers and PMs can agree on it before implementation
- **Don't burn critical bytes on chrome.** Render-blocking CSS for the footer, JavaScript for the nav menu, or web fonts the hero unit doesn't need can all push the meaningful element later
- **Defer below-the-fold modules.** Recommended-content rails, related links, comments, ad slots and analytics widgets rarely belong in the critical render path
- **Treat above-the-fold images as critical.** The hero or product image is often the meaningful element itself; preload it, size it, and don't lazy-load it
- **Watch out for chrome-first frameworks.** Some app shells render header and footer first by default and stream content into the middle — this is the exact failure mode this pattern guards against

## Related Patterns

- [Fast Start](/patterns/fast_start/) — getting the first paint to happen quickly in the first place
- [Skeletal Designs](/patterns/skeletal_designs/) — communicating the structure of meaningful content before it's fully there
- [Immutable Layout](/patterns/immutable_layout/) — making sure the meaningful content, once loaded, doesn't shift as the rest arrives
- [See and Do](/patterns/see_and_do/) — making the meaningful element interactive as soon as it's visible

## Technical Implementation

### Metrics to watch

- **[Largest Contentful Paint (LCP)](https://web.dev/articles/lcp)** measures the time at which the largest content element becomes visible. Good LCP is under **2.5s** at the **75th percentile**
- **[First Contentful Paint (FCP)](https://web.dev/articles/fcp)** is helpful as a leading indicator, but on its own it can mislead — a page can have a fast FCP and a slow LCP if the first thing painted isn't the meaningful thing

### Techniques

- Inline critical CSS for the meaningful element so it doesn't wait for an external stylesheet
- Use `<link rel="preload">` for the hero image and any blocking fonts the meaningful element needs
- Defer non-critical scripts with `async`, `defer`, or dynamic imports gated by interaction or idle time
- Lazy-load below-the-fold images and iframes so they don't compete with the hero for bandwidth
- On server-rendered pages, ensure the meaningful element is in the initial HTML response, not injected by client-side JavaScript later

## Resources

- [Largest Contentful Paint (LCP) on web.dev](https://web.dev/articles/lcp)
- [Progressive Storyboards](https://calendar.perfplanet.com/2016/progressive-storyboards/) by Tammy Everts
- [Priority Wireframes](https://www.speedcurve.com/blog/web-perf-wireframes/) — visualizing intended load order during design
