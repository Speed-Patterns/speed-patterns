---
layout: article.njk
title: Immutable Layout
tags: pattern
thumbnail: /assets/pushy_ads.gif
---

A common problem on web sites that use ads or other 3rd party display elements (widgets), but also manifests in regular websites is change in layout as page loads.

This is particularly noticeable by users when they start scrolling down the page and element at the top of the page (e.g. ad banner or carousel image that finally loaded) suddenly changes it's height pushing content down.

<!-- excerpt -->

<figure>
<figcaption>Pushy ad</figcaption>
<img src="/assets/pushy_ads.gif" width="400" height="295" alt="Pushy ad"/>
</figure>

## Solution

Instead of shifting the layout, always set the expected size of the available space.

<figure>
<figcaption>Expected ad</figcaption>
<img src="/assets/expected_ads.gif" width="400" height="295" alt="Expected ad"/>
</figure>

Use CSS to set height/width of the container when loading element into it and for images, simply specify width and height directly on a tag so layout engine doesn't have to wait for image bytes to come back from the network to determine its pixel dimensions.

```html
<img src="awesome_logo.png" alt="Awesome Logo!" width="400" height="300" />
```

[Cumulative Layout Shift (CLS)](https://web.dev/articles/cls) is a visual stability metric as part of Core Web Vitals.

[Good CLS score](https://web.dev/articles/cls#what-is-a-good-cls-score) is under **0.1** at **75%ile** of your users meaning that under 10% of the screen should shift during the page load.
