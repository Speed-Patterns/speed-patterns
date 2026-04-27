---
layout: article.njk
title: Optimistic Rendering
tags: pattern
thumbnail: /assets/optimistic_rendering_thumbnail.svg
og_image: /assets/speed_patterns_og_image.jpg
order: 13
date: 2024-04-23
authors:
    - name: Alexander Chernyshev
      url: https://alexchernyshev.com/
---

When a user performs an action whose result is highly likely to succeed, you don't have to wait for the server to confirm before showing the new state. Render the success state in the UI as soon as the input lands — and reconcile silently in the background.

<!-- excerpt -->

## The Problem

Many user actions involve a server round-trip: liking a post, adding an item to a cart, posting a comment, reordering a list, marking a task done. The natural implementation waits for the server to respond before updating the UI:

1. User clicks
2. UI shows a spinner or disabled state
3. Network request goes out
4. Server processes and replies
5. UI finally updates to reflect the new state

The user sits through every step. Even when the request succeeds in 200ms, that's 200ms of "waiting for the heart to fill in" or "waiting for the item to appear in the cart" — a delay between cause and effect that feels much longer than the same number of milliseconds spent doing nothing.

## Solution

Render the new state immediately, as if the server had already responded successfully. Send the request in parallel and reconcile when the real response arrives. If it fails, roll back and surface a clear failure message.

<figure>
<img src="/assets/optimistic_rendering_thumbnail.svg" width="460" alt="Two flows side by side. Left, labeled 'pessimistic': click → spinner → wait → success state. Right, labeled 'optimistic': click → success state immediately, with a small note 'reconciles in background'."/>
<figcaption>Render the success state now, reconcile later</figcaption>
</figure>

The user perceives the action as instantaneous because, from their point of view, it _is_ instantaneous. The work of synchronizing with the server happens out of sight.

### Where this works well

- **Reactions and toggles** — likes, favorites, follows, bookmarks, mute/unmute
- **List operations** — adding to a cart, dragging to reorder, marking a to-do done, archiving an email
- **Inline content creation** — posting a comment, sending a chat message, leaving a review
- **Multi-step flows** — moving to the next step in a wizard while the previous step's data is still being persisted

In every case, the operation has a high success rate, the new state is well-defined locally, and the user has more work they want to do without waiting.

### Where this doesn't work

- **Operations that gate other actions** — payment authorization, account creation, anything the next screen depends on
- **Operations the user expects to verify** — long-form publishing, financial transfers, file uploads with size or format constraints
- **Operations with a real failure rate** — if rollback would happen often enough that users learn to distrust the UI, optimism is the wrong call

## Why This Works

Latency that the user can't see has a much smaller effect on perceived performance than latency they can see. By rendering the result before the round-trip completes, the round-trip stops being part of the user's experience of the action. The wait still exists technically, but it stops being a wait.

Optimism only works because most operations succeed. When the failure rate is low enough — well under a percent for many UI actions — paying the rare cost of rolling back is a much better trade than paying the round-trip cost on every successful action.

## Guidelines

- **Make the rollback visible and clear.** If the optimistic state turns out to be wrong, the user must understand what happened. A toast like "We couldn't save your comment — try again" plus restoring the prior state is the minimum
- **Keep the optimistic state local until confirmed.** Don't propagate the unconfirmed state to other clients, search indexes, or analytics until the server confirms
- **Reconcile on the real response.** When the server replies, replace the optimistic value with the canonical one — server-assigned IDs, timestamps, ordering, and any normalization the server applies should win
- **Handle conflicts.** If another client changed the same data, the optimistic update may need to be rebased or surfaced as a conflict, not silently discarded
- **Don't be optimistic about everything.** Reserve optimism for the operations where it actually pays off; mixing optimistic and pessimistic UI in the same view is fine
- **Pair with [Acknowledge Actions](/patterns/acknowledge_actions/).** Even an optimistic action benefits from a small confirmation — a subtle inline indicator that briefly says "saved" gives the user a hook to notice if it ever fails

## Related Patterns

- [Acknowledge Actions](/patterns/acknowledge_actions/) — for actions where you can't be optimistic but still need to feel responsive
- [Masking Slowness With Animation](/patterns/masking_slowness_with_animation/) — when the optimistic state needs a brief animated transition into place
- [Don't Use Spinners](/patterns/dont_use_spinners/) — optimism is one of the best ways to avoid needing a spinner at all

## Technical Implementation

Most modern UI frameworks have first-class support for this pattern:

- **React** ships [`useOptimistic`](https://react.dev/reference/react/useOptimistic), which manages the optimistic state and rollback automatically
- **TanStack Query** and **SWR** both support [optimistic updates](https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates) on mutations, with built-in invalidation and rollback on error
- **Redux Toolkit Query** offers [optimistic updates via `onQueryStarted`](https://redux-toolkit.js.org/rtk-query/usage/manual-cache-updates#optimistic-updates), undoing the patch on failure
- **Apollo Client** supports [`optimisticResponse`](https://www.apollographql.com/docs/react/performance/optimistic-ui/) on mutations

The shape of the implementation is always the same: apply a local state change immediately; fire the request; on success, replace the local state with the server's; on failure, undo the local state and surface an error. The framework abstractions just package those steps.

## Resources

- [Being Optimistic in UI](https://dev.to/tiagodcosta/being-optimistic-in-ui-511k) by Tiago da Costa
- [Optimistic UI with React](https://react.dev/reference/react/useOptimistic) — official React documentation
- [Optimistic Updates in TanStack Query](https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates)
