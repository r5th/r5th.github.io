---
title: Peak Palate
order: 4
status: wip
featured: false
publish: true
summary: "A Shopify-integrated storefront with WhatsApp ordering, built for a software design course."
role: "Developer"
year: 2026
stack: [Shopify, Supabase, Claude, WhatsApp Business API, Deno]
tags: [ecommerce, coursework, whatsapp]
links: { live: "", demo: "https://find-together-lobang-655120775569.asia-southeast1.run.app/", repo: "https://github.com/r5th/peak-palate", video: "" }
source: "obsidian://open?vault=school&file=SDS/Admin/Peak%20Palate%20Progress%20Log"
date: 2026-07-09
updated: 2026-08-15
type: project
ai-first: true
---

## Overview
Peak Palate is a WhatsApp-first grocery group-buying storefront for a real client (Venture Sense / Harvest Direct), built as a software design course project. Buyers order in plain language over WhatsApp; the system parses the message, tells apart individual and group-buy orders, consolidates them, and lands them in Shopify Admin, which the client uses as the operational dashboard.

<div class="embed">
  <p class="mono embed-eyebrow"><span class="chip live"><i></i></span>Live — running right now</p>
  <div class="embed-frame">
    <div class="embed-bar">
      <span class="embed-url">find-together-lobang-655120775569.asia-southeast1.run.app</span>
      <a href="https://find-together-lobang-655120775569.asia-southeast1.run.app/" target="_blank" rel="noopener">Open full ↗</a>
    </div>
    <iframe
      src="https://find-together-lobang-655120775569.asia-southeast1.run.app/"
      title="Peak Palate — live demo"
      loading="lazy"
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
    ></iframe>
  </div>
</div>

## How it works
- Meta's WhatsApp Cloud API receives the buyer's message and hands it to the backend.
- Claude (Haiku for parsing, Opus where quality matters) turns the message into structured items and intent.
- Postgres on Supabase holds state Shopify can't express: group-buy IDs, membership, thresholds, conversation sessions.
- Each order becomes a tagged Shopify draft order carrying a checkout link, with line items tied to real product variants so Shopify claims stock and can group orders by product. Admin filters Shopify orders by tag to see a consolidated batch.
- The design is hexagonal: conversation logic depends only on port interfaces, each with a live implementation and an in-memory fake, so the whole order flow runs and tests offline with no credentials (245 tests, no Docker).
- Compute runs on a single Cloud Run service (migrated off five separate Supabase Edge Functions); the database stays on Supabase Postgres, unchanged.

## Architecture
The full codebase (109 files, 249 nodes, 557 edges) mapped and browsable as a knowledge graph — layers, imports, call graph, test coverage, all generated automatically from the source.

<div class="embed">
  <p class="mono embed-eyebrow"><span class="chip"><i></i></span>Interactive — explore the graph</p>
  <div class="embed-frame">
    <div class="embed-bar">
      <span class="embed-url">find-together-lobang architecture graph</span>
      <a href="/projects/peak-palate/architecture/" target="_blank" rel="noopener">Open full ↗</a>
    </div>
    <iframe
      src="/projects/peak-palate/architecture/"
      title="Find Together Lobang — architecture graph"
      loading="lazy"
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
    ></iframe>
  </div>
</div>

## Status
Live. The full order flow (WhatsApp/Telegram → parse → Shopify draft order → payment → window close) runs against the deployed Cloud Run service, backed by Supabase Postgres. Code: [github.com/r5th/peak-palate](https://github.com/r5th/peak-palate).

Two known bugs are still open: `<product> <qty>` phrasing fails where `<qty> <product>` works (offline stub only), and order confirmations show only the payment link, not the items or amount. Three usability KPIs (buyer task completion, admin round setup, trust) still need a live participant session to measure, not more commits. A window-reminder sweep (warns buyers before a window auto-closes) is in active development, not yet merged.
