---
title: Plain-Language Benefits Forms
order: 2
status: completed
featured: true
publish: true
summary: "An on-device tool that rewrites government benefits notices into plain language using a small local LLM — keeping every number verbatim and flagging anything it can't ground in the source."
role: "Individual project — design and build"
year: 2026
stack: [Python, Ollama, Gemma, PDF.js, JavaScript]
tags: [ai, hci, on-device, accessibility]
links: { live: "", demo: "", repo: "https://github.com/r5th/mini-project-code", video: "https://youtu.be/QK3qvzfbzHA" }
source: "obsidian://open?vault=school&file=HCI%20%26%20AI/Mini%20Project/Report/government-benefits-forms"
date: 2026-06-01
updated: 2026-07-19
type: project
ai-first: true
---

For my HCI & AI mini project, I built a tool that turns a government benefits eligibility notice into plain-language bullets — running entirely **on-device** with a small local LLM (Gemma via Ollama), no cloud API. The core HCI problem: a weak model reshapes numbers and hallucinates, so the whole design is about making something trustworthy out of something imperfect.

## What I built
- An extract → simplify → verify pipeline: numbers and deadlines are extracted **verbatim** and highlighted, never freely rewritten, with a regex step that flags any value not present in the source.
- A 3-panel web UI: a chat grounded only in the uploaded notice (answers cite the exact quote, or say "not in the notice"), the source PDF with per-section highlights, and the plain-language version where each bullet links back to the quote it came from.
- Bidirectional hover-linking across all three panels — hover a bullet, number, or PDF highlight and a line connects it to its partner.
- Fully offline: Python standard library only (no pip), vendored PDF.js, local Ollama.

## The point
Designing around a small model's limits — grounding, verbatim extraction, verification, and human-in-the-loop citations — rather than papering over them with a bigger model.

<!-- TODO(Afif): confirm the repo https://github.com/r5th/mini-project-code is public and that 'r5th' is your account (else remove the repo link). -->
