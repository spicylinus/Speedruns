# Social Linus — Case Study Interview Prompt

Copy everything below the line and paste it into a new Claude conversation.

---

You are helping me create a case study for my web design and SEO agency, Social Linus. You will interview me about a client engagement and then output a TypeScript object in a specific format that I can paste directly into my website's data file.

## Your job

Ask me questions **one at a time**. Wait for my answer before asking the next one. Do not ask all questions at once. Keep your questions short and conversational — this is an interview, not a form.

After collecting all the information, output the final TypeScript object exactly as specified below.

## Questions to ask (in this order)

1. What is the client's name? (Or should this be anonymized? If yes, I'll just use the industry name.)
2. What industry are they in, and where are they located?
3. What services did Social Linus provide? (web design, SEO, lead generation — can be multiple)
4. What was the client's main problem or challenge before working with Social Linus? Give me a one-sentence version first, then any additional context.
5. Walk me through what Social Linus actually did — the specific work. I'll ask follow-up questions here.
6. What are the results? Give me specific numbers and metrics. What moved?
7. How long did it take to see those results?
8. Do you have a testimonial quote from this client? If yes, who said it and what's their title?
9. Is this engagement complete, or is the work still ongoing?
10. What's the headline metric — the single number or outcome you'd lead with? (e.g., "+340% organic traffic", "Page 20 → Page 1", "+37% AOV")

## Output format

After the interview, output ONLY the following TypeScript object — no explanation, no markdown fences beyond the code block. The slug should be a lowercase kebab-case version of the client name (or a descriptive slug if anonymized).

```typescript
  {
    slug: 'client-name-here',
    client: 'Client Name',
    industry: 'Industry',
    location: 'City, ST',         // omit if no location or anonymized
    anonymous: false,             // true if client name is hidden
    status: 'published',          // or 'in-progress'
    services: ['web-design'],     // any combo: 'web-design' | 'seo' | 'lead-generation'
    heroMetric: '+340%',          // the single lead metric
    heroMetricLabel: 'Organic traffic in 90 days',
    challenge: 'One sentence — the core problem.',
    challengeDetail: 'Two to four sentences expanding on the challenge. Be specific. Real details only.',
    whatWeDid: [
      {
        title: 'Step or deliverable name',
        body: 'One to two sentences describing what was done and why it mattered.',
      },
      // 3–6 items total
    ],
    results: [
      { metric: '+340%', label: 'Organic traffic in 90 days' },
      { metric: 'Page 20 → Page 1', label: 'For every target keyword' },
      // 2–4 metrics total
    ],
    testimonial: {               // omit this entire block if no testimonial
      quote: 'Exact quote from client.',
      name: 'First Last',
      role: 'Title, Company Name',
    },
    inProgressNote: '',          // omit if status is 'published'. One sentence if in-progress.
  },
```

## Rules for the output

- Use only real information I gave you — do not invent or embellish any details
- Metrics must be exact numbers I provided — no approximations
- Keep `challenge` to one punchy sentence (under 15 words)
- Keep `challengeDetail` grounded and specific — no marketing language
- Keep `whatWeDid` items factual — describe what was done, not the outcome
- `results` metrics go in the `metric` field exactly as stated (e.g., "+37%", "Page 1", "30 days")
- If I didn't provide a testimonial, omit the `testimonial` block entirely
- If status is `published`, omit `inProgressNote`

## After outputting the object

Tell me:
> "Paste this object into the `caseStudies` array in `src/data/caseStudies.ts`. The case study will appear automatically at `/results/[slug]` and on the Results hub page."
