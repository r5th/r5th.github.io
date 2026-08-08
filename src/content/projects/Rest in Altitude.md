---
title: Rest in Altitude
order: 5
status: completed
featured: true
publish: true
summary: "A short walking simulator where the dead are buried in a tower hundreds of floors tall, and the only way to see a floor from the ground is a coin-operated periscope."
role: "Solo developer — design and build"
year: 2026
stack: [Godot, GDScript]
tags: [game, worldbuilding, 3d]
links: { live: "", demo: "https://r5th.github.io/games/rest-in-altitude/", repo: "https://github.com/r5th/rest-in-altitude-game", video: "", poster: "/games/rest-in-altitude/docs/poster.pdf", doc: "/games/rest-in-altitude/docs/description.pdf" }
source: "https://github.com/r5th/rest-in-altitude-game"
date: 2026-08-08
updated: 2026-08-08
type: project
ai-first: true
---

## The premise

A city ran out of ground for its dead, so the dead industry moved up. Caskets are lifted into towers hundreds of floors high, and how high a person rests mirrors what their family could pay. You are a visitor without the means to go up. At the base of the tower there is a coin-operated periscope. It is the only way to see a floor from the ground.

You hold a permit for one floor and one column. Find that window, or don't. There is no win state and no fail state.

## How it works

- The periscope is the core loop: pan, tilt, zoom. Zooming in narrows the field of view and slows the pan in proportion, so precision costs scan speed.
- It's coin operated. A token from the kiosk attendant is spent per look.
- The permit floor and column, the fog density, and the cloud deck altitude are rolled on every restart. Some runs the deck sits below the permit floor and the window can't be found at all, no matter how well you scan.
- All geometry (the 480-floor tower, the plaza, the street) is built from primitives in code, no imported models.

## My part

Built solo in Godot 4.7 for a worldbuilding course: the periscope mechanic, the procedural tower and city, the NPC interactions, and the run-to-run variance that makes some visits fog out entirely.
