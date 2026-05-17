# Business Intake — Claude Interview Prompt

Copy everything below the line and paste it into a new Claude conversation.

---

You are helping me build a website for a client of Social Linus Web Services. Before any design or copy work begins, I need to capture a complete picture of the business in a structured `BUSINESS.md` file.

## Your job

Either:
- **Interview me** — ask questions one at a time if I don't have existing content to paste, OR
- **Extract and structure** — if I paste raw content (website copy, Google Business Profile listing, reviews, a write-up), pull everything useful out of it and ask only about what's missing

Start by asking: **"Do you have existing content to paste — website copy, a Google Business listing, reviews, or a write-up? Or should I interview you from scratch?"**

Wait for my answer. Then proceed in whichever mode fits.

---

## Interview mode — questions to ask (one at a time)

Ask these in order. Wait for each answer before moving on. Keep questions short and conversational.

1. What's the business name, and do they have a current website?
2. What's their one-line positioning — what do they do and for whom?
3. Where are they located, and what geography do they serve?
4. Walk me through their main services. What do they actually deliver?
5. Who is their ideal client? Industry, company size, what problem brings them in?
6. What's a typical deal size or project value? (This helps frame the ROI argument for the site.)
7. What proof do they have? Years in business, clients served, certifiable metrics — anything specific.
8. Do they have testimonials or reviews I can use? Paste them, or describe what clients say.
9. Tell me about the founder or team — background, how the business started, what makes them the right choice.
10. What makes them genuinely different from competitors? Not marketing speak — what's actually true?
11. What's their contact info: phone, email, address, booking link?
12. Is there anything about their voice or brand personality I should capture? Words they'd use, words they'd never use?

---

## Extract mode — how to handle pasted content

When the user pastes raw content:

1. Read everything carefully
2. Extract all usable information into the BUSINESS.md structure below
3. For each section you couldn't fill from the pasted content, ask a targeted follow-up question
4. Don't ask about things you already found in the pasted content

---

## Output format

After gathering all information (through interview or extraction), output the complete `BUSINESS.md` file exactly as follows. Fill every field with real information — leave a field blank or write `[To be provided]` if information wasn't given.

```markdown
# BUSINESS.md — [Business Name]

> This file is the source of truth for all copy on this website.
> Claude Code reads this file before writing any page content.
> Update it as the business evolves.

---

## Identity

| Field | Value |
|-------|-------|
| Business Name | |
| Tagline | |
| Founded | |
| Location | |
| Service Area | |
| Website (current) | |
| Phone | |
| Email | |
| Address | |
| Booking Link | |

---

## Services

### [Service Name]
**What it is:** [1 sentence]
**What the client gets:** [1-2 sentences — outcome focused]
**Who needs this:** [1 sentence — ICP for this service]
**Starting price / range:** [if known]

### [Service Name]
...

---

## Ideal Client Profile (ICP)

**Industry / vertical:** 
**Company size:** 
**Decision-maker role:** 
**Geography:** 
**Average deal / project value:** 
**Main problem before finding this business:** 
**What changes after working with them:** 

---

## Proof Points

| Metric | Value | Notes |
|--------|-------|-------|
| Years in business | | |
| Clients / projects | | |
| [Key stat] | | |
| [Key stat] | | |

---

## Differentiators

**What makes them genuinely different:**

**What they'd never say about themselves:**

**Voice / personality words:**

---

## Testimonials

> "[Exact quote]"
> — Name, Role, Company

> "[Exact quote]"
> — Name, Role, Company

[Add as many as provided]

---

## About / Origin Story

[2-4 paragraphs. How the business started, what drove it, where it is now. Written in third person or first person depending on what was provided.]

---

## Google Business Profile

**Category:** 
**Description (as listed):** 
**Average rating:** 
**Review count:** 
**Notable review themes:** 

---

## Raw Content Archive

[Paste any original website copy, bios, service descriptions, or other source material here verbatim. This section is for reference — the structured sections above are what Claude uses for copy.]

```

---

## After outputting the file

Tell me:

> "Save this as `BUSINESS.md` in the client's project folder. Claude Code will read it at the start of every session before writing any copy. When you're ready to build, tell Claude Code: 'Read BUSINESS.md and begin building the site.'"

---

## Rules for the output

- Use only real information provided — never invent metrics, quotes, or claims
- Quotes must be verbatim if sourced from reviews or testimonials
- If a deal size or metric wasn't provided, leave it blank rather than estimating
- Keep service descriptions outcome-focused — what the client gets, not what the vendor does
- The ICP section should be specific enough that Claude could write targeted copy without additional context
- The differentiators section must reflect what's actually true, not generic agency claims
