---
layout: article.njk
title: Optimistic Actions
tags: pattern
thumbnail: /assets/optimistic_actions_thumbnail.svg
og_image: /assets/speed_patterns_og_image.jpg
order: 14
---

Some user actions don't need to wait for the server to feel complete. Clipping a coupon, marking a task done, voting on a poll, adding to a wishlist — for actions like these, the user has formed an intent and moved on before the request even leaves the device. Designing the action flow around that fact is what turns a usable feature into one that feels instantaneous.

<!-- excerpt -->

## The Problem

Even fast servers add latency that the user can feel. A 200ms round-trip is invisible on a benchmark and very visible on a coupon-clipping list, where the user is trying to clip ten coupons in five seconds. Each pause between "click" and "clipped" stacks up:

- The user clicks ten coupon buttons
- Each one disables, shows a small spinner, then ticks to "clipped"
- The total task takes the user three or four seconds longer than it had to
- Worse, the cumulative friction makes the whole feature feel slow even if any single action is acceptable

The same shape repeats across every product: bulk-archive in an email client, add-to-cart on a shop, like-button mash on a social feed. The cost isn't a single slow action — it's the accumulated waiting across many fast ones.

## Solution

Decide, at design time, that certain user actions should appear to complete instantaneously regardless of the underlying network. The action's _visible_ outcome lands on the next paint after the user's input. The actual work — the request, the response, the persistence — happens behind that outcome, not in front of it.

This is the umbrella pattern; the specific rendering technique that delivers it is [Optimistic Rendering](/patterns/optimistic_rendering/).

### Which actions are candidates?

An action is a good candidate for this treatment when **all** of the following are true:

- **High success rate.** The action almost always succeeds. If failure is common, optimism trains the user to distrust the UI
- **Local, well-defined outcome.** The new state can be expressed entirely in the client without waiting for server-assigned data
- **Doesn't gate the next step.** The user shouldn't depend on the result to make their next decision (payments and account creation are obvious counter-examples)
- **Reversible.** If the optimistic outcome turns out to be wrong, rolling back is straightforward and won't have already cascaded into other UI
- **Repetitive or fast-paced.** The benefit grows with how often the user performs the action — clipping coupons, swiping cards, reordering a list

A coupon-clip ticks every box. A "complete checkout" button ticks none of them.

## Why This Matters

Google's [RAIL model](https://web.dev/articles/rail) calls out the **100ms** mark as the threshold below which an action feels instantaneous. The full **0–1s** window is workable with acknowledgment, and beyond that the user disengages. Optimistic actions move the experience squarely under 100ms — not by making the network faster, but by removing the network from the user's experience of the action.

For repetitive workflows, this isn't just a perceived-performance win — it's a throughput win. Users complete the task faster, accumulate less waiting time, and leave the feature with the impression that it works.

## Guidelines

- **Choose deliberately.** Don't make every action optimistic by reflex. The decision should follow from the product/design conversation, not from a framework default
- **Plan the failure path.** Define exactly what happens when an optimistic action fails — rollback, error message, opportunity to retry. Make it specific to the action; a generic toast isn't enough for actions that matter
- **Don't be optimistic about money or identity.** Anything financial, security-critical, or legally consequential should be visibly pessimistic — the user expects, and is reassured by, an explicit confirmation
- **Combine with [Acknowledge Actions](/patterns/acknowledge_actions/) when appropriate.** Even an optimistic action can include a tiny inline confirmation ("saved", a quick check icon) that gives the user a hook to notice if anything went wrong
- **Validate the assumption with users.** "Probability of success is high" is an empirical claim, not an aesthetic one. Watch real-user metrics for the action's failure rate. If it climbs, the pattern stops paying off
- **Be honest about what's still happening.** Some users — or some operations — benefit from the small delay of an explicit confirmation. User research on the specific action will tell you whether speed or certainty is more valuable

## Related Patterns

- [Optimistic Rendering](/patterns/optimistic_rendering/) — the UI technique used to deliver optimistic actions; covers state management, reconciliation, and rollback
- [Acknowledge Actions](/patterns/acknowledge_actions/) — for actions that can't be optimistic but still need to feel responsive
- [Don't Use Spinners](/patterns/dont_use_spinners/) — optimism is one of the strongest tools for avoiding spinners on user actions

## Resources

- [Measure Performance with the RAIL Model](https://web.dev/articles/rail) on web.dev
- [Being Optimistic in UI](https://dev.to/tiagodcosta/being-optimistic-in-ui-511k) by Tiago da Costa
- [Response Times: The 3 Important Limits](https://www.nngroup.com/articles/response-times-3-important-limits/) by Jakob Nielsen
