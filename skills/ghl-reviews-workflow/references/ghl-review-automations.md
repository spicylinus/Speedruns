# GHL Review Automation Build Instructions
## Local Service Reviews System — Step-by-Step Workflow Setup

These are the exact steps to build each automation inside GoHighLevel.
Navigate to: **Automation → Workflows → + New Workflow** for each one.

Build order matters — Workflow 1 applies the tag that Workflow 2 listens for.

**Before you build anything**, complete the prerequisites in the Setup Inventory section of
`../SKILL.md`: connect Google Business Profile, create the custom fields, create the tags, create
the `Service Recovery` pipeline, and confirm A2P 10DLC registration is approved.

---

## 1. Review Eligibility Gate

**Purpose:** Normalizes every "job is done" signal into a single `review-eligible` tag, and enforces
the suppression list. This is the only workflow that should ever apply `review-eligible`.

**Trigger:** Pick exactly ONE that matches how the client runs GHL —

- Appointment Status → `Showed` · *(client books on the GHL calendar)*
- Opportunity Stage Changed → Pipeline: client's job pipeline → Stage: `Job Complete` / Won
- Invoice Paid · *(client invoices through GHL Payments)*
- Tag Added → `job-complete` · *(tech or office marks it manually)*

> Enabling more than one trigger is the #1 cause of duplicate texts. If the client genuinely needs
> two, step 2 below catches the overlap.

**Actions (in order):**

1. **IF/ELSE** → Contact has tag `opt-out` OR `do-not-request` OR `complaint-open` OR `review-left`?
   - **YES** → End workflow
   - **NO** → Continue
2. **IF/ELSE** → `review_requested_date` is empty OR is before (today − 90 days)?
   - **NO** → End workflow *(already asked recently)*
   - **YES** → Continue
3. **IF/ELSE** → Contact has a valid phone OR a valid email?
   - **NO** → **Create Task** → Assign to account manager: "Missing contact info, cannot request
     review: {{contact.full_name}}" → End workflow
   - **YES** → Continue
4. **Update Contact Field** → `last_job_date` = today
5. **Add Tag** → `review-eligible`

**Settings:** Allow re-enrollment: **ON** *(a repeat customer with a new job must re-enter; the
90-day check in step 2 is what prevents over-asking)* · Run once per contact: OFF

---

## 2. Review Request Engine

**Purpose:** The three-touch ungated request sequence. Every touch carries both the public review
link and the private reply path.

**Trigger:** Tag Added → `review-eligible`

**Actions (in order):**

1. **Wait** → 2 hours
2. **Wait** → Until time window `08:00–20:00`, contact's timezone
   *(GHL Wait step → "Wait until a specific time window" — this is what enforces quiet hours. Set
   the workflow timezone to the CLIENT's timezone, not the agency's.)*
3. **IF/ELSE** → Has tag `review-left` OR `opt-out` OR `complaint-open`?
   - **YES** → End workflow
   - **NO** → Continue
4. **Send Review Request** *(native action — inherits Reputation Settings, logs to the dashboard)*
   - **OR** if the client wants custom copy: **Send SMS** → [Touch 1 SMS from SKILL.md]
5. **Add Tag** → `review-requested`
6. **Update Contact Field** → `review_requested_date` = today
7. **Wait** → 2 days
8. **IF/ELSE** → Has tag `review-left` OR `opt-out` OR `complaint-open`?
   - **YES** → End workflow
   - **NO** → Continue
9. **Send Email** → [Touch 2 Email from SKILL.md]
10. **Add Tag** → `review-email-sent`
11. **Wait** → 3 days *(lands on Day 5)*
12. **Wait** → Until time window `08:00–20:00`, contact's timezone
13. **IF/ELSE** → Has tag `review-left` OR `opt-out` OR `complaint-open`?
    - **YES** → End workflow
    - **NO** → Continue
14. **Send SMS** → [Touch 3 SMS from SKILL.md]
15. **Add Tag** → `review-request-complete`
16. **Remove Tag** → `review-eligible` · `review-requested`

**Settings:** Allow re-enrollment: OFF · Run once per contact: OFF
*(Re-enrollment is handled by Workflow 1 removing and re-adding the tag on a new job.)*

> **Do not add a rating question, thumbs up/down step, or "how did we do?" branch anywhere in this
> workflow.** Any branch that decides who sees the review link is review gating, banned by Google as
> of April 2026.

---

## 3. Review Received Handler

**Purpose:** Handles reviews after they post. Positive reviews get an AI reply; negative reviews get
a human, fast. This branch is legal precisely because it runs *after* the review is public.

**Trigger:** Review Received *(maps star rating and review body into the workflow)*

**Actions (in order):**

1. **Add Tag** → `review-left`
2. **Update Contact Field** → `review_left_date` = today
3. **Remove Tag** → `review-eligible` · `review-requested`
4. **IF/ELSE** → Review rating is 4 or 5?

**→ YES branch (4–5 star):**

5. **Add Tag** → `promoter`
6. **AI Review Reply** → generate response from review content + business context
   - New clients: **hold for approval** for the first 30 days
   - Established clients: auto-post
7. **Internal Notification** → Email owner:
   > "New {{review.rating}}-star review from {{contact.full_name}}: {{review.content}}"
8. **Wait** → 7 days
9. **IF/ELSE** → Has tag `opt-out`? NO → **Send SMS** → referral ask *(optional, client's call)*

**→ NO branch (1–3 star):**

5. **Add Tag** → `detractor` · `complaint-open`
6. **Internal Notification** → **SMS + Email to owner immediately**:
   > "⚠️ {{review.rating}}-star review from {{contact.full_name}}: {{review.content}} — call within
   > the hour."
7. **Create Task** → Assign to owner: "Call {{contact.full_name}} re: {{review.rating}}-star review"
   - Due: Today + 1 hour
8. **Create Opportunity** → Pipeline: `Service Recovery` → Stage: `Complaint Received`
   - Opportunity name: "{{contact.full_name}} — {{review.rating}}★"
9. **Create Task** → Assign to account manager: "Draft reply for owner approval — do NOT auto-post"
10. **Wait** → 24 hours
11. **IF/ELSE** → Opportunity still in stage `Complaint Received`?
    - **YES** → **Internal Notification** → escalate to owner + account manager
    - **NO** → End

**Settings:** Allow re-enrollment: ON · Run once per contact: OFF
*(A customer can leave reviews across multiple jobs over time.)*

> **Never enable AI auto-reply on the 1–3 star branch.** An automated response to an angry review
> reads as dismissive and turns one bad review into a public argument.

---

## 4. Private Feedback Handler

**Purpose:** Catches customers who take the "reply to this text" path. Stops automation
immediately — every one of these gets a human.

**Trigger:** Customer Replied *(SMS or Email)*
**Filter:** Contact has tag `review-requested`

**Actions (in order):**

1. **Remove Tag** → `review-eligible` · `review-requested`
   *(stops all remaining touches immediately)*
2. **Internal Notification** → SMS to owner:
   > "{{contact.full_name}} replied to the review request: {{message.body}}"
3. **Create Task** → Assign to owner: "Read and respond: {{contact.full_name}}"
   - Due: Today + 1 hour
4. **IF/ELSE** → Message contains `STOP` / `unsubscribe` / `remove me`?
   - **YES** → **Add Tag** → `opt-out` · **Remove Task** → End workflow
   - **NO** → Continue
5. **Manual review by owner**, then apply one of:
   - Negative → **Add Tag** `complaint-open` · **Create Opportunity** in `Service Recovery` →
     `Complaint Received`
   - Positive but no review posted → notify owner to ask personally. **Do not re-enroll into
     automated touches**
   - Neutral / question → route to normal conversation inbox

**Settings:** Allow re-enrollment: ON · Run once per contact: OFF

---

## 5. Service Recovery Escalation

**Purpose:** Makes sure complaints — from reviews or private replies — actually get resolved, and
surfaces the ones that don't.

**Trigger:** Opportunity Stage Changed → Pipeline: `Service Recovery` → Stage: `Complaint Received`

**Actions (in order):**

1. **Wait** → 1 hour
2. **IF/ELSE** → Still in stage `Complaint Received`?
   - **YES** → **Internal Notification** → SMS owner: "Unresolved complaint:
     {{contact.full_name}} — 1 hour, no contact logged."
   - **NO** → Continue
3. **Wait** → 23 hours
4. **IF/ELSE** → Still in stage `Complaint Received`?
   - **YES** → **Internal Notification** → email account manager: "24h escalation:
     {{contact.full_name}}"
   - **NO** → Continue
5. **Wait** → 2 days
6. **IF/ELSE** → Stage is `Resolved` OR `Review Updated`?
   - **NO** → **Add Tag** → `unresolved-recovery` *(flags on the monthly client report)*
   - **YES** → **Remove Tag** → `complaint-open` *(contact becomes review-eligible again on a
     future job)*

**Settings:** Allow re-enrollment: ON · Run once per contact: OFF

> **Never make resolution conditional on the customer editing or deleting their review.** Fix the
> problem. If they update it on their own, move the opportunity to `Review Updated`. Trading a
> refund for a review change is review manipulation and is separately actionable under FTC rules.

---

## 6. Backfill Campaign (one-time, per new client)

**Purpose:** Harvest reviews from past customers when onboarding a new client. Run once, carefully.

**Trigger:** Tag Added → `review-backfill`

**Before you run it — build the list:**
1. Smart List filter: served in the last 12 months · has valid email · no `review-left` · no
   `opt-out` · no `complaint-open`
2. Sort newest first — recent customers remember you and convert better
3. Add the `review-backfill` tag to **no more than 50 contacts per day**

**Actions (in order):**

1. **IF/ELSE** → Has tag `review-left` OR `opt-out` OR `complaint-open`? YES → End. NO → Continue
2. **Wait** → Until time window `09:00–17:00`, contact's timezone
3. **Send Email** → backfill email *(Touch 2 copy from SKILL.md, adjusted: reference the job
   generally rather than a specific date)*
4. **Add Tag** → `review-requested` · `backfill-sent`
5. **Update Contact Field** → `review_requested_date` = today

**No follow-up touches.** One email. People you served eight months ago do not get a three-touch
sequence.

**Settings:** Allow re-enrollment: OFF · Run once per contact: **ON**

> **Email only — never SMS a backfill list.** There is no recent consent for a customer from eight
> months ago, and it is an A2P violation risk. The ≤50/day cap exists because a review count that
> jumps from 12 to 60 in a week trips Google's velocity detection and the reviews get stripped.

---

## Post-Build QA Checklist

Run this in the sandbox sub-account before pushing the snapshot to any client.

1. **No gating anywhere** — walk Workflow 2 start to finish and confirm there is no rating
   question, thumbs up/down, or sentiment branch before the review link
2. **Both paths in every message** — each of the three touches contains the public review link AND
   the "reply to this text" private path
3. **No incentive language** in any message
4. **Quiet hours** — set a test contact's timezone, fire the trigger at 11pm, confirm the SMS holds
   until morning
5. **Duplicate check** — confirm exactly one job-complete trigger is enabled in Workflow 1
6. **Stop conditions** — apply `review-left` to a test contact mid-sequence, confirm the remaining
   touches don't fire
7. **Opt-out** — reply STOP from a test phone, confirm `opt-out` is applied and sending stops
8. **Negative path** — post a test 2-star review, confirm the owner alert fires within 5 minutes and
   NO automated reply is posted
9. **Link check** — open the review link on a mobile device and confirm it lands on the review
   composer, not a Google login wall
10. **Timezone** — confirm the workflow timezone is the client's, not the agency's
