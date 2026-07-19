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

## Why it exists
Real-estate agents in Singapore and Malaysia run their business out of WhatsApp and phone calls. Enquiries arrive at all hours, and the ones that go unanswered for a few hours tend to go cold. Qojix puts an AI assistant on both channels so every conversation gets picked up immediately, in the agent's voice and with the agent's listings.

## What it does
- Answers WhatsApp enquiries about listings, viewings, and availability in natural conversation.
- Handles inbound voice calls with the same assistant, so a missed call becomes a handled conversation.
- Hands off to the agent with full context whenever a conversation needs a human.

## How it's built
- Next.js + TypeScript + Tailwind app on Vercel; Supabase for data and auth, Stripe for billing.
- Conversations run on the Anthropic API, connected to the WhatsApp Business API via webhooks.
- Sentry for error tracking across the message pipeline.

## Status
In progress — live with agents in Singapore and Malaysia, and the product is evolving weekly as we learn from real conversations.
