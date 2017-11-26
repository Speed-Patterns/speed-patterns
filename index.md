---
layout: default
---
Speed is a major contributor to user experience on modern web sites.

It is important to pay attention not only to technologies that said experiences are build with, but to the way they are designed as well.

Proper speed design is a collaboration between product managers, UI designers and developers as all the aspects of the page composition must be balanced to achieve fast experience that is useful for end-users and deliver on the goals set by creators of the site.

Below is the list of common speed design problems and their design solutions. We try not to concentrate on specific technical implementations or specific types of sites so it can be used in any context.

## Fast Start
Before user can start the experience, there is an inevitable delay as user's browser goes away from previous view to the current view.

### Problem
This delay manifests itself in waiting for first piece of the UI to be painted on the screen. Usually user waits for page to show while looking at the previous page, e.g. search engine results page or another page where they performed an action that led him to the page in question.

On this filmstrip, previous page is shown as white:
<figure>
<figcaption>Slow first paint filmstrip</figcaption>
<img src="{{ "/assets/slow_paint_filmstrip.png" | absolute_url }}" width="100%" alt="Slow first paint filmstrip"/>
</figure>

The usual cause for such delays are either a bottleneck of a first request for HTML page:
<figure>
<figcaption>Slow first request</figcaption>
<img src="{{ "/assets/slow_first_request.png" | absolute_url }}" width="100%" alt="Slow first request"/>
</figure>

Alternatively, delay can be caused by various render-blocking assets loaded on the page, like CSS stylesheets, fonts or pure rendering delays due to time-consuming layout and painting or JavaScript compilation and execution that compete for same CPU resources:

<figure>
<figcaption>Delayed first paint</figcaption>
<img src="{{ "/assets/slow_first_paint.png" | absolute_url }}" width="100%" alt="Delayed first paint"/>
</figure>

### Solution
Making it a requirement to start painting quickly is critical, especially as it competes with other technical and design goals of loading large amounts of code and displaying a large number of elements on the page.

Set timing SLAs during product and design discussions: **50-200ms**

## Final Layout
A common problem on web sites that use ads or other 3rd party display elements (widgets), but also manifests in regular websites is change in layout as page loads.

This is particularly noticeable by users when they start scrolling down the page and element at the top of the page (e.g. ad banner or carousel image that finally loaded) suddenly changes it's height pushing content down.

<figure>
<figcaption>Pushy ad</figcaption>
<img src="{{ "/assets/pushy_ads.gif" | absolute_url }}" width="400" height="295" alt="Pushy ad"/>
</figure>

### Solution
Instead of shifting the layout, always set the expected size of the available space.

<figure>
<figcaption>Expected ad</figcaption>
<img src="{{ "/assets/expected_ads.gif" | absolute_url }}" width="400" height="295" alt="Expected ad"/>
</figure>

Use CSS to set height/width of the container when loading element into it and for images, simply specify width and height directly on a tag so layout engine doesn't have to wait for image bytes to come back from the network to determine its pixel dimensions.

```html
<img src="awesome_logo.png" alt="Awesome Logo!" width="400" height="300">
```

## No Spinners
## Skeletal Designs
## Masking Slowness With Animation
## Convert on Arrival
## Enhance Fonts As They Load
## Acknowledge Actions
## Use Styles Instead Of Images
