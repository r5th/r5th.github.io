---
title: Kuppi
status: completed
featured: true
publish: true
summary: "An IoT cleanroom readiness system that guides staff through consistent sanitization steps while streaming live zone status to a dashboard."
role: "Firmware & dashboard engineer — 4-person team"
year: 2026
stack: [C++, FreeRTOS, ESP32, Flask, Supabase, SSE, PostgreSQL]
tags: [iot, embedded, hardware]
links: { live: "", demo: "", repo: "https://github.com/uniweeq/kuppi", video: "https://youtu.be/g1X3Cxpo-Yk" }
source: "https://uniweeq.github.io/projects/kuppi"
date: 2026-05-01
updated: 2026-07-19
type: project
ai-first: true
---

Kuppi is an IoT cleanroom readiness system built with a 4-person team at SUTD (Spring 2026). Staff scan their card, tap a door NFC tag, and walk a 6-zone sanitization checklist on the device — while a live dashboard streams each zone's status to a supervisor in real time. The design targets real cleanroom pressures: cognitive load, language barriers, time pressure, and uncertain standards.

## What I built
- **Firmware** in C++ on an ESP32, using FreeRTOS across dual cores — sensor/NFC I/O on one core, the on-device UI on the other, so reads stay stable while the screen updates.
- **The supervisor dashboard** — a Flask + Supabase backend streaming live zone status over Server-Sent Events (SSE) to a real-time web view.
- **Hardware assembly** — ESP32, PN532 NFC reader, ST7796 TFT display, and LiPo power.

## How it works
Scan staff card → tap door NFC → 6 zones appear red → scan each zone tag and complete its checklist → room marked ready.

## What I learned
- Partitioning tasks across FreeRTOS cores keeps sensor I/O stable while the UI updates in parallel.
- Simple, high-contrast flows cut errors for non-technical staff working under pressure.
- Prototype constraints forced prioritizing reliable NFC reads over ambitious enclosure design.
