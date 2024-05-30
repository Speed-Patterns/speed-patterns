---
layout: article.njk
title: Fast Start
tags: pattern
thumbnail: /assets/slow_paint_filmstrip.png
order: 1
---

Before user can start the experience, there is an inevitable delay as user's browser goes away from previous view to the current view.

<!-- excerpt -->

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

[First Contentful Paint (FCP)](https://web.dev/articles/fcp) is a metric that measures how long it takes the browser to render the first piece of content from the DOM. It is a good proxy for when the main content of the page is visible to the user.

[Good FCP](https://web.dev/articles/fcp#what-is-a-good-fcp-score) is considered below **1.8s** at **75%ile** of your users.

Set timing SLAs during product and design discussions. Appropriately measure and build the experience to meet the requirements.
