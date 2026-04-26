---
layout: article.njk
title: Don't Use Spinners
tags: pattern
thumbnail: /assets/no_spinners.svg
og_image: /assets/speed_patterns_og_image.jpg
order: 9
---

The animated circular spinner has become the default progress indicator on the web. It's also the wrong tool in nearly every case it's used. Spinners communicate almost no useful information, and their default presence often signals that no thought was given to how the experience handles waiting at all.

<!-- excerpt -->

<figure>
<figcaption>The classic spinner: an animation that says nothing.</figcaption>
<img src="/assets/no_spinners_animated.svg" width="120" alt="Animated circular spinner with a slash through it"/>
</figure>

## What's Wrong With Spinners?

A spinner is a circle without a beginning or an end. It rotates indefinitely, resetting every time it completes a turn. As a piece of communication, this has several specific failures:

- **No start, no end, no progress.** The user can't tell whether the operation is 10% complete or 90% complete — only that something is, in some sense, happening
- **The motion lies about activity.** A spinner can keep rotating cheerfully even when the underlying request has hung. The animation is decoupled from any real signal
- **It tells the user nothing about what is being loaded.** The same spinner appears for "submitting your order," "loading your photos," and "fetching the next 25 results" — three operations with very different stakes
- **It admits failure.** A spinner is the developer telling the user, "this part of the site is slow and I don't have a better idea." It is, at best, an apology

Linear (bar-shaped) indeterminate indicators have most of the same problems — they're slightly less visually grating, but they communicate equally little.

## Solution

Treat the absence of progress as a design problem to solve, not a hole to plug with a stock animation. The right approach depends on what's actually happening behind the wait.

### 1. Make the wait shorter

Most spinner appearances would be unnecessary if the underlying operation were faster. Before designing for a wait, investigate whether the wait can be removed:

- Can the data be prefetched, cached, or rendered server-side?
- Can the response be streamed so the user sees something immediately?
- Can the action be performed optimistically, with rollback on failure?

A spinner used as the first response to "this is slow" tends to harden the slowness in place — once a spinner is in the codebase, the slow path is no longer a bug.

### 2. Use a structural placeholder

For loading content into a region of the page, use a [skeletal design](/patterns/skeletal_designs/) that mirrors the final layout. Skeletal placeholders convey:

- **What the content will be** (zones, headings, image positions)
- **Where to look** when the content arrives
- **The structure of the page**, so the user can begin orienting themselves

A spinner conveys none of this. Skeletal designs do all of it for almost the same implementation cost.

### 3. Acknowledge the action specifically

For form submissions and discrete user actions, a spinner is the wrong shape of feedback. The right pattern is to [acknowledge the action](/patterns/acknowledge_actions/) directly: disable the trigger, change its label to describe what's happening, and confirm completion when the action lands.

### 4. Use motion to bridge the gap

For unavoidable transitions, [mask slowness with animation](/patterns/masking_slowness_with_animation/). A short, purposeful transition that takes the user from the old state toward the new one absorbs a meaningful amount of the wait, and tells the user exactly what's happening — unlike a spinner, which exists outside the actual content flow.

### 5. Show real progress when you have it

If the operation has a known duration or measurable progress (file upload, multi-step form, batch operation), use a real progress bar with percentage and, where possible, a description of the current step. This is the only place where a literal progress indicator earns its space on the screen.

## When (Rarely) a Spinner Is OK

There are a few cases where a small inline spinner is acceptable: very short waits inside a button or input where structural placeholders would be overkill, or genuinely indeterminate background tasks where the user has explicitly opted in. Even there, prefer a tiny, subtle indicator next to the relevant element — never a full-page overlay spinner, which holds the entire UI hostage.

## Why This Matters

Defaulting to a spinner is rarely a deliberate choice — it's a fallback that gets reached for when no one has thought through the loading experience. Making "no spinners" a team norm forces that conversation to happen earlier, which usually surfaces a better solution: faster code, better placeholders, clearer feedback, or all three.

## Related Patterns

- [Skeletal Designs](/patterns/skeletal_designs/) — structural placeholders that actually communicate
- [Acknowledge Actions](/patterns/acknowledge_actions/) — feedback for discrete user actions
- [Masking Slowness With Animation](/patterns/masking_slowness_with_animation/) — using transitions to absorb unavoidable delay

## Resources

- [Mobile Design Details: Avoid The Spinner](https://www.lukew.com/ff/entry.asp?1797) by [Luke Wroblewski](https://lukew.com/)
