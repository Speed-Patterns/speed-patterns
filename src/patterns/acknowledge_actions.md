---
layout: article.njk
title: Acknowledge Actions
tags: pattern
thumbnail: /assets/acknowledge_actions_thumbnail.svg
og_image: /assets/speed_patterns_og_image.jpg
order: 7
---

When a user clicks a button, taps a link, or submits a form, they expect immediate feedback. If the system takes longer than about 100ms to respond, an unacknowledged action becomes a usability problem — and a performance problem.

<!-- excerpt -->

## The Problem

Without acknowledgment, the user is left to guess:

- Did the click register? Was the tap on the wrong element?
- Should I click again? (Often resulting in duplicate submissions.)
- Is the page broken? (Often resulting in the user navigating away.)

This isn't a hypothetical — duplicate form submissions are a classic symptom of missing acknowledgment, and most engineers have seen the resulting "duplicate order" tickets.

The threshold matters: research on perceived responsiveness consistently puts roughly **100ms** as the upper bound for an action to feel instantaneous. Any longer, and the user notices the delay. Beyond about a second, the user starts to disengage entirely.

## Solution

The same control on click: idle state on the left, immediately disabled with a "Submitting…" label and inline indicator on the right.

<figure>
<figcaption>Acknowledge every click</figcaption>
<img src="/assets/acknowledge_actions_thumbnail.svg" width="400" alt="Two buttons: a yellow 'Submit' button labeled 'idle button', and a dashed-border orange 'Submitting…' button with a small rotating indicator labeled 'acknowledged + disabled'"/>
</figure>

Give the user visible feedback the instant their action begins, separate from the action's actual completion. The acknowledgment is a UI-only concern — it doesn't have to wait for the network.

### Common acknowledgments

- **Disable the trigger.** A submitted button that immediately becomes disabled prevents double submission and signals "we got it"
- **Change the label.** "Submit" → "Submitting…" or "Save" → "Saving…" tells the user exactly what is happening
- **Show a small inline indicator.** A subtle spinner _next to_ the action (not in place of the page content) confirms work is in progress
- **Pre-clear the destination area.** For navigation that will replace a content region, clear the old content immediately so the user sees the page begin to respond, even before the new content arrives
- **Move attention to the next state.** Modals can begin their open animation immediately, even if their content streams in

## Guidelines

- **Acknowledge in the first frame.** The acknowledgment must happen on the same paint as the input event — not after a network round-trip. If you wait for the server, you've already lost the moment
- **Acknowledge in place.** Show the feedback _on or next to_ the element the user interacted with, not in a distant corner of the page
- **Don't lie about progress.** Use indeterminate indicators when you don't know how long the operation will take; only show progress bars when you actually have progress information
- **Re-enable carefully.** Once the operation completes (success or error), restore the trigger to a usable state and tell the user what happened
- **Don't replace acknowledgment with a full-page spinner.** Spinners on top of working content are a heavy hammer — see [Don't Use Spinners](/patterns/dont_use_spinners/)

## Why This Works

The technical work behind the action hasn't gotten any faster, but the experience has. The user knows the system is working on their behalf, can see exactly which action is in progress, and isn't tempted to retry. The site feels responsive even when the network isn't.

## Related Patterns

- [Masking Slowness With Animation](/patterns/masking_slowness_with_animation/) — pairing acknowledgment with a transition to occupy the wait
- [Don't Use Spinners](/patterns/dont_use_spinners/) — preferred alternatives for longer waits
- [Skeletal Designs](/patterns/skeletal_designs/) — for acknowledging navigation that loads a whole new view

## Technical Implementation

A minimal form submission acknowledgment is essentially two lines of code: disable the button and change its label as soon as the submit event fires.

```html
<button type="submit" id="submit-btn">Submit</button>
```

```js
form.addEventListener("submit", () => {
  const btn = document.getElementById("submit-btn");
  btn.disabled = true;
  btn.textContent = "Submitting…";
});
```

This costs almost nothing to implement, and it makes the slow path feel intentional rather than broken. The same pattern applies to any control that initiates work — change the visual state in the same frame as the input event, not after the response returns.
