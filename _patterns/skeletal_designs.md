# Skeletal Designs

## TODO

- Find links to external resources to add to Luke Wroblewsky's article
- Record video examples and convert to animated GIF format to include on the page
- Find a good existing examples of websites to include (e.g. Facebook's timeline)
- Use WebPageTest to record a filmstrip illustrating successful implementation
- Use WebPageTest to record a filmstrip illustrating failure scenario, e.g. when nothing is shown or spinner is used particularly badly
- Find existing solutions for popular frameworks

Skeletal desgins are a way to show progression towards a visual user experience by hinting at the content and layout to come to keep the user in an active state of mind. Another benefit is minimizing coginitive load by interpretting the visual layout of the page before the actual content arrives.

## Features

Skeletal designs often include several distinct features.

### Content Types

To reduce cognitive load for the user, it is helpful to indicate the type of the content that will be displayed.

For instance, image placeholders can be made of solid blocks of color. User's avatar images are often represented with a solid color circles if thats the shape of avatars in the completed user interface.

<@TODO: include LinkedIn/Facebook example screenshot>

Text can be represented as a sequence of horizontal lines to mimic headers and paragraphs.

### Boundaries / Layout Sections

When types of the upcoming content and it's positions can not be predicted reliably by the time skeletal design is displayed, it is recommended to at least identify areas of the interface where content is going to be displayed. This is often done using background color of the loaded area, logically separating it from other areas of the page.

### Pulsating Gradients

It has been proven that progress bars that use color gradients and pulsation animations are percieved faster reducing user's anxiety.

Similar techniques are often used in skeletal designs where solid colors are replaces with gradients of similar color that animate left-to-right showing percieved progression.

<@TODO include example of skeletal design with pulsating gradient>

## The challenges of skeletal degisgn

- understanding the content that will be loaded
- dynamic data / user generated content
- content types, images vs text
- indicating areas of interaction and focal points

## Examples

- facebook
- linkedin
- youtube
- ios loading screen guidelines

## Replacing Existing Solutions

Why we recommned skeletal designs over the alternatives:

- spinners
- blank screen
- loading bars

## Related patterns

- immutable layout
- no spinners
