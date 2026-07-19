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

## The problem
Benefits notices are written for the agency, not the reader. The people who most need to understand them — deadlines, amounts, what to do next — are often the least served by the language they're written in. And these documents are too sensitive to paste into a cloud chatbot.

## The approach
- Everything runs on-device: a small Gemma model served locally through Ollama. No document ever leaves the machine.
- PDF.js extracts the notice text in the browser; the rewrite happens against that exact source.
- Every number in the output is kept verbatim from the original — amounts, dates, and case numbers are never paraphrased.
- Anything the model can't ground in the source text gets flagged rather than silently included.

## What I learned
Small local models are usable for constrained rewriting tasks if you design the task around verification instead of trust — the grounding check mattered more than the model choice.
