---
title: Qojix
order: 1
status: wip
featured: true
publish: true
summary: "An AI assistant that handles WhatsApp and voice conversations for real-estate agents in Singapore and Malaysia."
role: "Co-founder and engineer"
year: 2026
stack: [Next.js, TypeScript, Tailwind, Supabase, Stripe, Anthropic API, WhatsApp Business API, Vercel, Sentry]
tags: [saas, ai, real-estate]
links: { live: "https://qojix.com", demo: "https://property.qojix.ai", repo: "", video: "" }
source: "obsidian://open?vault=qojix&file=Architecture%20Spec/Qojix%20Architecture%20Spec"
date: 2026-07-06
updated: 2026-07-19
type: project
ai-first: true
---

Qojix is a multi-tenant SaaS platform where an AI assistant ("Qoji") answers WhatsApp and voice enquiries for real-estate agents, qualifies buyers, and books viewings — so agents stop losing leads to slow replies.

## What I built
- Multi-tenant Postgres data model on Supabase (Agency → Agents → Listings → Slots → Bookings) with row-level security isolating every agency's data.
- WhatsApp Business API integration handling live agent numbers, with an AI-to-human handoff flow.
- A public listings portal (property.qojix.ai) with photo galleries served from Supabase Storage, kept strictly separate from private documents and seller data.
- Stripe billing across four tiers plus a metered voice add-on.
- Anthropic API driving the conversation logic; Sentry for production monitoring.

## Role
Co-founder — architecture, full-stack build, and go-to-market.
