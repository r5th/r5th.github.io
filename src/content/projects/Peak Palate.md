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
links: { live: "", demo: "", repo: "https://github.com/r5th/peak-palate", video: "" }
source: "obsidian://open?vault=school&file=SDS/Admin/Peak%20Palate%20Progress%20Log"
date: 2026-07-09
updated: 2026-08-08
type: project
ai-first: true
---

## Overview
Peak Palate is a WhatsApp-first grocery group-buying storefront for a real client (Venture Sense / Harvest Direct), built as a software design course project. Buyers order in plain language over WhatsApp; the system parses the message, tells apart individual and group-buy orders, consolidates them, and lands them in Shopify Admin, which the client uses as the operational dashboard.

## How it works
- Meta's WhatsApp Cloud API receives the buyer's message and hands it to a Supabase Edge Function.
- Claude (Haiku for parsing, Opus where quality matters) turns the message into structured items and intent.
- Postgres on Supabase holds state Shopify can't express: group-buy IDs, membership, thresholds, conversation sessions.
- Each order becomes a tagged Shopify draft order carrying a checkout link, with line items tied to real product variants so Shopify claims stock and can group orders by product. Admin filters Shopify orders by tag to see a consolidated batch.
- The design is hexagonal: conversation logic depends only on port interfaces, each with a live implementation and an in-memory fake, so the whole order flow runs and tests offline with no credentials (104 tests, no Docker).

## Status
In progress. Build phases run 0 (access) through 4 (group-buy/promo); live bring-up still needs Phase 0 credentials, but the offline demo and test suite run without any deployed backend.
