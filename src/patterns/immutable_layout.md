---
layout: layout.njk
title: Immutable Layout
tags: pattern
---
# {{ title }}

A common problem on web sites that use ads or other 3rd party display elements (widgets), but also manifests in regular websites is change in layout as page loads.

This is particularly noticeable by users when they start scrolling down the page and element at the top of the page (e.g. ad banner or carousel image that finally loaded) suddenly changes it's height pushing content down.

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
<img src="awesome_logo.png" alt="Awesome Logo!" width="400" height="300">
```
