---
layout: layout.njk
title: Skeletal Designs
tags: pattern
thumbnail: 
---
Technique introduced by Luke Wroblewsky and used by many sites, including Facebook's and LinkedIn's newsfeeds can be utilized to indicate progress and provide visual cue to what user should expect reducing cognitive load and user's frustration.

<!-- excerpt -->
# {{ title }}

Technique introduced by Luke Wroblewsky and used by many sites, including Facebook's and LinkedIn's newsfeeds can be utilized to indicate progress and provide visual cue to what user should expect reducing cognitive load and user's frustration.

## In-Progress State

This technique allows the *in-progress state* of the page to be helpful to user-experience, rather than a hinderance. 

Defining the in-progress state should be a delibarate part of the design process.

## Why this is needed

This solves the problem of the empty screen: instead of having to wait for data to show up, the user can see visual cues and information about the page's content before the actual data has arrived.

These cues can be multiple things:

* known headers and titles for sections of the document 
* field names ex: price, amount of items
* the visual layout of the page
* zones for different content on the page

@TODO show an animated example that combines these items, or follow https://www.lukew.com/ff/entry.asp?1797 example.

Why are zones important?
They allow users to do a first pass and understand the structure of the page ahead of time, which allows for easier navigation of the data once the page has fully loaded.

This helps reduce cognitive load for users, which reduces the stress of taking in the site. By having the zones establish their dimensions and prupose at the beginning of the loaing process, and the final content filing in to that structure, the strain of the user to take in the whole is spread out over the loading time and thus reduced. As opposed to having to first wait and recieve no information, and then being hit by a large amount of information and struggling to get your bearings when you would want to start navigating already.

### Reduced Perception Time
It is not just about the technical aspects of loading the page. With this method we reduce the perception time of the user. Without this technique, the user is unable to prepare for navigating the page, and when it finally loads all at once they must spend more time parsing it before they can use it. Whereas with this technique, the user can be prepared to navigate the page once fully loaded, and needs less time to get their bearings and start using the page.

<figure>
<img src="/assets/skeletal_design_perception_time_diagram.svg" width="100%" alt="Diagram showing dirstribution of perception over loading time"/>
<figcaption>Diagram showing dirstribution of perception over loading time</figcaption>
</figure>

## Things to avoid

<section class="textimagepair">
<div>
It is critical to avoid layout shift once content loads. You want to make sure that the zones the users see before the page loads match the final layout. Otherwise users would have to make another pass to readjust to the page structure, defeating the purpose of having the zones during loading, and nullifying the advantages this would provide, namely the user having a map of navigation of the page.

<p class="callout">
<a href="https://web.dev/articles/cls">Cumulative Layout Shift</a> (CLS) metric that is part of Core Web Vitals is a measure of layout shift and is useful for tracking it for both skeletal designs and during regular page load.
</p>
</div>

<video muted autoplay loop width="350" height="300">
<source src="/assets/skeletal_designs_diagrams/speedpatterns_skeletal_design_layout_shift_example.mp4" type="video/mp4"/>
</video>



</section>



### Wave-ey Gray Boxes

Unfortunately, it became common practice to use a simple to build but not good solution of pulsating gray boxes which occupy the space of the page but do not always set the exact dimensions of the layout.

In some cases the exact dimesnions are in fact unknown, but in many cases we can know the layout up-front. As such, designers should analyze the content of the page to set dimensions that are known, instead of defaulting to generic solutions or placeholders.

One common exception to this are social media feeds, where we cannot know what *type* of content will be in the feed. 

This unfortunate technique was popularized by the need to solve this issue on social networks, which then became taken as standard practice when it should have remained an exception.

@TODO image here of social network feed

An alternative solution to the gray boxes in this particular case might be to progressively load content without having any skeleton structure. This will show the progress of the page loading by the content appearing on the screen in order, and will not require additional cognitive load to redo the users understanding of the page structure.

### Do not delay content!
Needless to say, that skeleton design should only be used when it is necessary to wait for additional content and there is not technical solution for loading the data faster. 

DO NOT artificially create this multi-step process. 

Spend time investigating technical solutions to load content faster. Only use skeletal designs if there is no alternative.

## Examples and Solutions

Designers and Engineers need to spend time thinking of the in-progress state of the page.

Using different backround color for zones when using skeletal design loading is a good way to establish zones and their purpose when nothing else, such as textual labels or actual content, is known ahead of time about them.

In particular, this is useful for spaces that will be occupied by images, as image resources inherently take time to load over the network.

## Resources

* [Mobile Design Details: Avoid The Spinner](https://www.lukew.com/ff/entry.asp?1797) by [Luke Wroblewsky](https://lukew.com/)
