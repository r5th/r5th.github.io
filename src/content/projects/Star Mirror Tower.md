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
shots:
  - src: "/shots/star-mirror-tower/plaza-aerial.jpg"
    alt: "Night aerial of the plaza: a tiled floor with a dark central walk flanked by two dashed lines of amber light, rows of trees either side, and lit building facades enclosing both edges. The tower rises at the far end."
    caption: "The plaza. The floor's tone is drawn per tile by seeded lottery, the civic premise underfoot; the one ordered thing in it is the runner carrying the walk north."
  - src: "/shots/star-mirror-tower/plaza-north.jpg"
    alt: "Eye-level view along the plaza at night, looking north. Two lines of inlaid amber floor lights lead toward the lit tower, with facade rows on both sides."
    caption: "Standing on the walk. The corridor along this line is kept clear so the tower stays visible from spawn all the way in."
  - src: "/shots/star-mirror-tower/periscope-pool.jpg"
    alt: "The coin-operated periscope at the centre of a large dark circular inlay in the paving, with a small glowing brass point directly beneath it."
    caption: "The periscope, standing in the largest of the paving's dark pools, with a brass point at its centre. The payoff spot is marked without any signage."
  - src: "/shots/star-mirror-tower/rota-queue.jpg"
    alt: "A short queue of figures waiting under a flat roof extending from the lit service window of the Rota Office."
    caption: "The Rota Office queue, under the overhang. A lottery still needs administering."
  - src: "/shots/star-mirror-tower/notice-pavilion.jpg"
    alt: "A lit board under a small roofed pavilion, showing a list of recent lottery draws beside a bulletin of handwritten classified notices."
    caption: "Lottery results beside the community bulletin: other people's draws, and someone trying to trade a low floor for a high one."
  - src: "/shots/star-mirror-tower/billboard.jpg"
    alt: "A large lit billboard on the approach street reading Skylight Cooperative, Your turn is coming, with flat graphic art of a crane lifting a mirror panel toward a tower."
    caption: "The cooperative advertising itself on the walk in."
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
