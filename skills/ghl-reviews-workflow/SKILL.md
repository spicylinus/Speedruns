---
name: ghl-reviews-workflow
description: >
  Ungated automated review generation and reputation management system for local service small
  businesses in GoHighLevel (GHL). Use this skill whenever asked to build, configure, audit, or
  troubleshoot a review request workflow, reputation automation, or Google Business Profile review
  campaign for a local service client — plumbing, HVAC, roofing, salon, landscaping, electrical,
  auto, dental, or any appointment-and-invoice business. Also trigger when asked about review
  request SMS or email copy, review response handling, negative review escalation, service recovery,
  review gating compliance, Google review policy, GHL Reputation settings, review request timing or
  cadence, past-customer review backfill campaigns, or packaging reputation management as a client
  offer. Trigger even if the request is narrow like "write a review request text" or "why aren't we
  getting reviews."
---

# GHL Automated Reviews Workflow
## Local Service Small Businesses | Social Linus Web Services

This skill builds the delivery system behind the **Reputation Management** offer ($900 / 90 days)
and the review line items inside the **Local SEO Manager** retainer ($497/mo). It is designed to be
built once in a template sub-account, saved as a GHL Snapshot, and pushed to every local service
client.

It also supersedes the stubbed `Review Campaign` automation at the end of the
`ghl-leadhacker-pipeline` skill, which defined the trigger (`Stage = Delivery Completed`) but never
the build.

---

## ⚠️ Ungated Compliance Rules — Read First

Google updated its Maps review policy on **April 16–17, 2026** to explicitly ban **review gating**
and is actively enforcing it. Review gating means pre-screening customers by sentiment before
deciding whether to show them a public review link — the classic "thumbs up goes to Google, thumbs
down goes to a private form" funnel that most GHL review templates still ship with.

Penalties: reviews stripped, Google Business Profile suspended, ranking penalties, and FTC exposure
in the US.

**This system is ungated by design. These rules are non-negotiable.**

| Rule | Why |
|---|---|
| Every customer gets the **same message** and the **same public review link** | Sentiment pre-screening is gating |
| No thumbs up/down, no star-picker, no "how did we do?" rating step **before** the link | All are gating mechanisms |
| The private feedback path is offered **alongside** the public link, in the same message, to everyone | An addition is legal; a filter is not |
| No incentives of any kind — no discounts, gift cards, drawings, giveaways, or service credits | Separately banned; FTC exposure |
| Never enroll only the jobs you expect to go well | Gating by another name |
| Suppression only for non-sentiment reasons | See the suppression list below |

### The only legal reasons to suppress a request

- Contact tagged `opt-out` or `do-not-request`
- No valid phone **and** no valid email
- Job was cancelled or refunded
- Duplicate contact record
- Contact already left a review (`review-left`)
- A request was already sent in the last 90 days
- An open complaint exists (`complaint-open`) — resolve first, then re-eligible

> **The line to remember:** you may branch on sentiment *after* a public review is posted. You may
> never branch on sentiment *before* the review link is shown.

---

## Architecture

Five workflows, not one. A single monolithic workflow cannot handle reviews arriving
asynchronously, and separating the request engine from the response handler is what lets one
snapshot serve clients whose "job complete" signal differs.

```
Job-complete signals ──► [1] Review Eligibility Gate ──► tag: review-eligible
                                                                │
                                                                ▼
                                                    [2] Review Request Engine
                                                    SMS D0 (+2h) → Email D2 → SMS D5
                                                                │
                              ┌─────────────────────────────────┴──────────────────┐
                              ▼                                                     ▼
                    [3] Review Received Handler                       [4] Private Feedback Handler
                    4–5★ → AI reply + promoter                        inbound negative reply
                    1–3★ → human, never auto                                        │
                              │                                                     │
                              └──────────────────┬──────────────────────────────────┘
                                                 ▼
                                    [5] Service Recovery Escalation
```

Full click-by-click build instructions for all five: `references/ghl-review-automations.md`

---

## Workflow 1 — Review Eligibility Gate

Local service SMBs signal "the job is done" in four different ways depending on how they actually
run GHL. Normalize all of them into one tag so the request engine has exactly **one** entry point.
This is what prevents the same customer getting two texts because the invoice was paid and the
appointment was also marked Showed.

| How the client runs GHL | Trigger to use |
|---|---|
| Books everything on the GHL calendar | Appointment Status = `Showed` |
| Runs jobs through a pipeline | Opportunity Stage Changed → `Job Complete` / Won |
| Invoices through GHL Payments | Invoice Paid |
| Tech or office manager marks it manually | Tag Added → `job-complete` |

Pick the one that matches the client. Turning on more than one is the most common cause of
duplicate sends — if a client genuinely needs two, the gate's 90-day check catches the overlap.

**Gate checks before applying `review-eligible`:**
1. Has a valid phone **or** email
2. Not tagged `opt-out`, `do-not-request`, or `complaint-open`
3. `review_requested_date` is empty or older than 90 days
4. Not tagged `review-left`
5. Job not cancelled or refunded

---

## Workflow 2 — Review Request Engine

### Timing

| Touch | When | Channel | Condition |
|---|---|---|---|
| 1 | +2 hours after job complete | SMS | Always |
| 2 | Day 2 | Email | No review, no click |
| 3 | Day 5 | SMS | No review, no click |

**Why +2 hours:** sentiment peaks immediately after a completed job and decays fast. Same-day
requests convert several times better than next-week requests.

**Quiet hours:** 8am–8pm in the client's local timezone. A job completing after 6pm holds until
10am the next morning. GHL's Wait step supports a window condition — use it, don't compute it.

**Hard stop at 3 touches.** Then tag `review-request-complete` and exit. No re-enrollment for the
same job. A new job makes the contact eligible again after 90 days.

### Channel choice

Use GHL's native **Send Review Request** action wherever possible. It respects the Reputation
Settings you already configured — channel choice, link balancing across Google/Facebook, retry
sequence — and it logs the request so it appears in the Reputation dashboard, which is where the
client's monthly numbers come from.

Fall back to a custom SMS carrying a direct Google review link
(`https://g.page/r/<PLACE_ID>/review`) only when the client wants full control of the copy. You
lose dashboard logging when you do this, so track sends with a tag instead.

### Message copy

Every message below carries **both** the public review link and the private reply path. That is
what makes this ungated. Do not remove either one, and do not split them across different messages
for different people.

---

**Touch 1 — SMS · +2 hours · everyone**

```
Hi {{contact.first_name}} — {{location.name}} here. Thanks for having us out today.

If you've got 30 seconds, a quick review helps other neighbors find us: {{review_link}}

And if anything wasn't right, just reply to this text — {{owner.first_name}} will call you
personally.

Reply STOP to opt out.
```

---

**Touch 2 — Email · Day 2 · if no review and no click**

```
Subject: Quick favor, {{contact.first_name}}?

Hi {{contact.first_name}},

{{owner.first_name}} here from {{location.name}}. We took care of your
{{contact.job_type}} on {{contact.last_job_date}}, and I wanted to follow up.

Most people find us through reviews from neighbors who've used us before. If you
have a minute, here's the link:

{{review_link}}

If something about the job wasn't right, reply to this email instead and I'll
handle it myself — that matters more to me than the review does.

Either way, thanks for the business.

{{owner.first_name}}
{{location.name}}
{{location.phone}}

[Unsubscribe]
```

---

**Touch 3 — SMS · Day 5 · if no review and no click · final touch**

```
{{contact.first_name}} — last note from {{location.name}}, I promise.

If you've got a second for a review: {{review_link}}

If not, no worries at all — and if there's something we should have done
better, reply here and {{owner.first_name}} will call.

Reply STOP to opt out.
```

---

## Workflow 3 — Review Received Handler

Fires on GHL's **Review Received** trigger, which maps the star rating and review body into the
workflow so you can branch on them.

This branch is **legal** because it fires *after* a public review is already posted. Nothing here
affects who was asked or what link they saw.

### 4–5 star branch

1. Tag `review-left`, `promoter` · set `review_left_date`
2. Remove from the request sequence (removes `review-eligible`, `review-requested`)
3. GHL **AI review reply** drafts a response from the review content and business context
   - Default: hold for approval for the first 30 days of a new client, then switch to auto-post
     once the client trusts the tone
4. Optional referral ask at +7 days for `promoter` contacts

### 1–3 star branch

**Never auto-reply to a negative review.** An AI reply on a 1-star review reads as dismissive and
makes the thread worse.

1. Tag `review-left`, `detractor` · set `review_left_date`
2. Remove from the request sequence
3. **Within 5 minutes:** SMS + email alert to the owner with the review text
4. Create a task assigned to the owner: call the customer — due in 1 hour
5. Create an opportunity in the `Service Recovery` pipeline → stage `Complaint Received`
6. Draft a reply, held for human approval — never posted automatically
7. If the task is untouched at 24 hours, escalate: second alert to owner + account manager

**Reply-drafting guidance for negative reviews:** acknowledge specifically, apologize without
excuses, state what changed, move the conversation offline with a direct phone number. Never
argue facts publicly, never mention the customer's payment history, never imply the review is fake.

---

## Workflow 4 — Private Feedback Handler

Catches the inbound side of the "reply to this text" path that every message offers.

**Trigger:** Customer Replied (SMS or email) while tagged `review-requested`

1. Remove `review-eligible` and `review-requested` — stop the remaining touches immediately
2. Route to the owner's conversation inbox, flagged
3. If the reply reads negative: tag `complaint-open`, create a `Service Recovery` opportunity, task
   the owner to call within 1 hour
4. If the reply reads positive but no review was posted: leave the sequence stopped, notify the
   owner, and let them ask personally. Do **not** re-enroll them into automated touches
5. If the reply is `STOP` / unsubscribe language: tag `opt-out`, suppress permanently

> A customer who replies has started a conversation. Automation stops there — every one of these
> gets a human.

---

## Workflow 5 — Service Recovery Escalation

**Pipeline:** `Service Recovery`

| Stage | Definition |
|---|---|
| Complaint Received | Negative review or negative private reply logged |
| Owner Contacted | Owner has spoken to the customer |
| Resolved | Issue fixed, customer satisfied |
| Review Updated | Customer voluntarily updated or removed the public review |

**Never ask a customer to remove or change a review as a condition of resolving the problem.** Fix
the problem. If they update the review on their own, that's the `Review Updated` stage. Trading a
refund for a review edit is review manipulation.

Escalation ladder: 1 hour no owner contact → SMS reminder. 24 hours → alert account manager.
72 hours → flag on the client's monthly report as an unresolved recovery.

---

## Setup Inventory

### Reputation settings (Settings → Reputation)

- Connect **Google Business Profile** and **Facebook**
- **Link balancing:** Google 100% for most local service businesses. Use 80/20 Google/Facebook only
  if the client has a genuinely active Facebook presence
- **Native auto-request: OFF** — this system is workflow-driven. Leaving both on double-sends
- Configure the request message body here so the native **Send Review Request** action inherits it
- **AI review reply:** enabled, set to hold-for-approval initially

### Custom fields

| Field | Type | Purpose |
|---|---|---|
| `last_job_date` | Date | Personalization + eligibility math |
| `job_type` | Text | Personalization in Touch 2 |
| `assigned_tech` | Text | Attribution on reporting |
| `review_requested_date` | Date | 90-day re-request guard |
| `review_left_date` | Date | Reporting + suppression |

### Tags

`job-complete` · `review-eligible` · `review-requested` · `review-left` · `review-request-complete`
· `promoter` · `detractor` · `complaint-open` · `do-not-request` · `opt-out`

---

## Backfill Campaign — Past Customers

The fastest early win on a new client is the existing customer list. It is also the fastest way to
get reviews stripped if you run it wrong.

- **Email only.** Do not SMS a cold list — there's no recent consent, and it's an A2P violation
  risk
- **One touch.** No follow-up sequence to people you served eight months ago
- **Cap at ~50 sends per day.** A review count that jumps from 12 to 60 in a week trips Google's
  velocity detection and the reviews get removed — along with the profile's credibility
- **Same ungated copy.** Public link and private path, to everyone on the list
- Exclude anyone with an existing review, an open complaint, or an opt-out

Expect a 2–5% conversion on a cold backfill list versus 15–30% on a same-day request. The backfill
is a one-time bump; the +2 hour trigger is the actual engine.

---

## SMS Compliance Guardrails

- **A2P 10DLC registration must be complete before any SMS sends.** Unregistered traffic gets
  filtered by carriers — the client will think the workflow is broken when it's actually blocked
- Business name in the first message of any conversation
- `Reply STOP to opt out` on automated SMS touches; GHL honors STOP automatically — verify it's on
- Only text customers who transacted and provided their number themselves
- Quiet hours enforced per client timezone, not agency timezone

---

## Multi-Client Rollout

Build once in a template sub-account → **Settings → Snapshots → Create Snapshot** → push to each
client sub-account.

**Per-client swap list** (the only things that change):
1. Review link / Place ID
2. Business name and owner first name
3. Owner phone + email for alerts
4. Timezone for quiet hours
5. Which job-complete trigger applies (calendar / pipeline / invoice / manual tag)
6. Link balancing ratio if the client uses Facebook

Everything else — tags, custom fields, pipeline, message structure — travels with the snapshot.

---

## Reporting

Pull monthly from the Reputation dashboard. These are the numbers that justify the $900/90-day and
$497/mo offers:

| Metric | Why the client cares |
|---|---|
| Requests sent | Proof the system is running |
| Click rate | Message quality signal — under 15% means fix the copy |
| Reviews received | The actual deliverable |
| Conversion rate (reviews ÷ requests) | 15–30% is healthy on same-day SMS |
| Average star rating | Trend over time, not absolute |
| Time-to-response on negative reviews | The differentiator most competitors ignore |
| Open service recovery items | Accountability |

---

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| No SMS going out at all | A2P 10DLC not registered, or number not attached to the workflow |
| Customers getting two texts | More than one job-complete trigger enabled in Workflow 1 |
| Requests sending at 3am | Quiet hours not configured, or timezone set to agency not client |
| Reviews posted but not showing in GHL | Google Business Profile disconnected — reconnect in Reputation settings |
| Review count spiked then dropped | Velocity flag from a backfill run too fast — resume at ≤50/day |
| High click rate, no reviews | Customers hitting a Google login wall on mobile — verify the link is the direct `g.page/r/.../review` form |
| Client asks for a "thumbs up/down first" funnel | Explain the April 2026 gating ban. Do not build it |
