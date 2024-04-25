---
layout: layout.njk
title: Don't use Spinners
tags: pattern
thumbnail: /assets/favicon.png
---

<h1>Don't use Spinners</h1>

<p>
Progress indication is sometimes needed for activities that can not be improved in terms of performance.

While it is tempting to use a staple of progress indication, so called "spinner", it is unwise to do so as it has several problems:

shape without beginning and end doesn't let user estimate completion time
animation resets direction after full rotation reinforcing its "infinite" nature further frustrating the user
provides no user feedback over what to expect next leaving user in suspense
Linear versions of infinite animated elements solve some problems of circular spinners, but do not really contribute much of the value anyway.

The only message spinners convey is that you, as creator of the website is aware that your site is slow, but didn't want to do anything about it.
</p>

<h2>
Solution
</h2>

<p>
Deliberately design experiences that do progress indication without resorting to literal progress indicators. Do not let spinners to be used as a generic placeholder for speed design or developers will utilize it without even consulting product or design teams.

Several techniques can be used as progress indication, see "skeletal designs" and "masking slowness with animation".
</p>

<h2>
Existing blog posts, articles, videos
</h2>

<p>
<a href="https://www.lukew.com/ff/entry.asp?1797">Mobile Design Details: Avoid The Spinner</a> by Luke Wroblewsky
</p>