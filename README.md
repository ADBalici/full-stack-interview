# Court Case Tracker

A full-stack application for tracking Romanian court cases via Portal Just.

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Backend

```bash
cd be
npm install
npm run start:dev
```

Runs on http://localhost:3000

### Frontend

```bash
cd ui
npm install
npm run dev
```

Runs on http://localhost:5173

## What's Already Built

- **Backend**: NestJS API with a `GET /lawsuits?caseNumber=X` endpoint that queries the Portal Just SOAP API, parses the XML response, and returns structured JSON with case info, parties, and hearings.
- **Frontend**: React app with a search page where you enter a case number and see case details, parties, and a hearings table.

Test case numbers: `21969/301/2025`, `22760/325/2025`, `12636/180/2025`

---

## Task 1: Bug Fixes (~30 min)

Open the app and try searching for the case numbers above. You'll notice some issues — some searches may fail entirely, some show unexpected data, and there may be cosmetic problems.

Find and fix the bugs. For each one:

1. Identify the root cause
2. Implement a fix
3. Be ready to explain your approach

---

## Task 2: Subscriptions (~30 min)

Right now, a user has to remember and re-type a case number every time they want to check on it. We want to add the ability to **subscribe** to court cases — save them so you can come back later and see if anything changed (new hearing scheduled, resolution issued, etc.).

**What to build:**

- A way to subscribe to a case (e.g., from the search results)
- A way to see all your subscribed cases
- A way to view the latest data for a subscribed case

**Scope:** Just saving and retrieving — no polling, syncing, or notifications. Keep it simple.

**Design decisions are up to you:**

- There is no database configured — how will you store subscriptions?
- What does the API look like? What data do you store when subscribing?
- How does the UI flow work?

Be ready to explain your choices. There's no single right answer — we're interested in your reasoning.

---

## Task 3: Architecture Discussion (~30 min)

No code for this one — just a conversation with your interviewer.

In Tasks 1 and 2 you built the building blocks: looking up a case by number and saving subscriptions. Now imagine we're taking this to production:

> We have 10,000 users subscribed to cases across 250 courts. When something changes on a case — a new hearing is scheduled, a resolution is issued — we need to notify the subscribed users. Portal Just has no webhooks or push notifications. The only way to know if something changed is to query their API.

**Topics we'll discuss:**

- How do you detect that something changed on a case?
- How often do you check, and how do you handle 10,000 cases without overwhelming the API?
- How do you notify users — and what happens when notifications fail?
- What infrastructure would you use?

Be prepared to discuss trade-offs. There are many valid approaches — we want to understand how you think about system design.
