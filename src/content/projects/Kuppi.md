---
title: Kuppi
order: 3
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

## The system
Cleanroom readiness depends on people doing the same sanitization steps, in the same order, every time. Kuppi instruments that process: devices at each zone guide staff through the steps, and a dashboard shows live readiness across zones.

## How it works
- ESP32 nodes run C++ firmware on FreeRTOS, with separate tasks for sensing, step guidance, and network reporting.
- A Flask backend receives zone events and streams live status to the dashboard over server-sent events.
- Zone history and state live in PostgreSQL via Supabase.

## My part
- Wrote the ESP32 firmware — the FreeRTOS task structure and the step-guidance state machine.
- Built the live dashboard and the SSE pipeline feeding it.
