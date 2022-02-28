---
layout: layout.njk
title: Fast Start
tags: pattern
thumbnail: /assets/slow_paint_filmstrip.png
---
Before user can start the experience, there is an inevitable delay as user's browser goes away from previous view to the current view.

Making it a requirement to start painting quickly is critical, especially as it competes with other technical and design goals of loading large amounts of code and displaying a large number of elements on the page.
<!-- excerpt -->
# {{ title }}

Before user can start the experience, there is an inevitable delay as user's browser goes away from previous view to the current view.

This delay manifests itself in waiting for first piece of the UI to be painted on the screen. Usually user waits for page to show while looking at the previous page, e.g. search engine results page or another page where they performed an action that led him to the page in question.

On this filmstrip, previous page is shown as white:
<figure>
<figcaption>Slow first paint filmstrip</figcaption>
<img src="/assets/slow_paint_filmstrip.png" width="100%" alt="Slow first paint filmstrip"/>
</figure>

The usual cause for such delays are either a bottleneck of a first request for HTML page:
<figure>
<figcaption>Slow first request</figcaption>
<img src="/assets/slow_first_request.png" width="100%" alt="Slow first request"/>
</figure>

Alternatively, delay can be caused by various render-blocking assets loaded on the page, like CSS stylesheets, fonts or pure rendering delays due to time-consuming layout and painting or JavaScript compilation and execution that compete for same CPU resources:

<figure>
<figcaption>Delayed first paint</figcaption>
<img src="/assets/slow_first_paint.png" width="100%" alt="Delayed first paint"/>
</figure>

## Solution
Making it a requirement to start painting quickly is critical, especially as it competes with other technical and design goals of loading large amounts of code and displaying a large number of elements on the page.

Set timing SLAs during product and design discussions: **50-200ms**
