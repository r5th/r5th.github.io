---
title: Star Mirror Tower
order: 6
status: completed
featured: true
publish: true
summary: "A walking simulator spun off from Rest in Altitude: the sky is gone behind permanent haze, so a lottery rota assigns citizens a season tending mirror-panels on a tower that relays what starlight still gets through."
role: "Solo developer — design and build, with subagent-assisted implementation"
year: 2026
stack: [Godot, GDScript]
tags: [game, worldbuilding, 3d]
links: { live: "", demo: "https://r5th.github.io/star-mirror-tower/", repo: "https://github.com/r5th/star-mirror-tower", video: "", poster: "", doc: "" }
source: "https://github.com/r5th/star-mirror-tower"
date: 2026-08-09
updated: 2026-08-09
type: project
ai-first: true
---

## The premise

Light pollution and permanent haze buried the night sky decades ago. Instead of fixing it, the city built a tower: a column of angled mirror-panels and lanterns that catch what starlight still gets through and relay it down, floor by floor. Every citizen gets one season tending their floor's panel, assigned by lottery, not payment. You are a visitor checking on someone's star, maybe your own upcoming turn, maybe a family member's current one. At the base of the tower stands a coin-operated periscope, the only way to see a floor from the ground.

You hold a rota slip for one floor and one panel. Find it, and the panel answers back: a flare of light, a lantern catching, or a wave from the floor above. Some nights the haze wins and there's nothing to find.

## How it works

- Reuses Rest in Altitude's periscope mechanic, tower geometry, and city backdrop almost verbatim, reskinned from a burial premise to a civic lottery, with the "window answers back" payoff that was proposed but never built there.
- The rota slip's floor and panel, the haze density, and the cloud deck altitude are rolled on every restart. A run can genuinely fog out; the odds are tuned, not guaranteed.
- A short queue outside the Rota Office carries the piece's one designed exchange: a child asks when their turn is, and unlike the sibling project, the parent can actually answer.
- All geometry, all three ambient audio beds, and the reskin text were built and verified by parallel subagents against a shared spec, then checked with a headless scene-graph test and a screenshot harness before anything shipped.

## My part

Read the GDD, wrote the shared build spec (coordinate map, engine API, writing rules) that let four subagents work the same repo without colliding, then did the wiring, a legibility pass off real screenshots, and the deploy.
