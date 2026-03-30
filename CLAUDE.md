# dylanwu-site — Agent Context

## What This Is

Personal portfolio site for Dylan Wu at dylanwu.me. Next.js + Tailwind CSS, deployed to Vercel.

## Site Identity

- **Purpose**: Personal landing page for jobs (not client-facing services page)
- **Tone**: "Meet Dylan" — not "hire my agency"
- **Identity**: Analytics leader and AI builder

## Design Reference

**Stitch prototype**: Use as visual skeleton only — all content was hallucinated and must be replaced.

- Dark theme, background #131313
- Warm copper accent #C26D4D
- Fonts: Space Grotesk (headlines), Inter (body)
- Left sidebar nav with icons (desktop), hamburger (mobile)
- Bento grid for domain expertise cards with hover-reveal descriptions
- Timeline layout for experience
- Typing animation in hero, scanline overlay for personality

**Awwwards references** (for quality bar):
- elliott.mangham.dev — dark, monospace, credential-forward
- art-yakushev.com — polished animations, smooth scroll
- brittanychiang.com — clean dev portfolio structure

## Content — All Finalized (Do Not Change)

### Hero
- Name: **Dylan Wu**
- Sub tagline: **"Analytics leader and AI builder. 10 years building data-driven cultures at high-growth startups."**
- Location: Los Angeles, CA

### Domain Expertise (6 bento cards, hover/click to reveal)

**Business Strategy**: Ten years across five startups means reading a business model fast — where the money comes in, where it leaks, and which lever actually moves when you pull it.

**Data Science**: Uncovers what customers actually want and why — through data and experimentation — so product teams ship with insights, not luck.

**Data Strategy**: Data architecture that outlasts the team that built it, engineered to make confident, data-driven decisions the default across the organization.

**Product Strategy**: Approaches product decisions from the PM seat: what problem are we solving, who is it for, and is it working. Uses data to sharpen product intuition, not replace it.

**Engineer Mind**: Building beyond data: practical fluency across backend and frontend systems that sharpens judgment on what's possible, what's easy, and when the data isn't worth the plumbing.

**Data & Analytics Engineering**: Builds the full path from raw data into reliable business insight — data modeling, transformations, and the quality controls that keep data trustworthy at every layer.

### Experience (5 entries, timeline layout)

| Company | Role | Period | Domain |
|---------|------|--------|--------|
| Zenbusiness | Staff Data Analyst | Mar 2025 – Present | Business Compliance |
| Route | Staff Product Analyst → Team Lead | Sep 2021 – Dec 2024 | eCommerce |
| Acorns | Senior Data Analyst | Mar 2020 – Sep 2021 | Fintech |
| Neustar | Data Analyst | Jun 2018 – Feb 2020 | Data strategy for marketing science (serves Fortune 500) |
| Zowdow | Data Analyst (first analyst hire) | May 2017 – May 2018 | Mobile Search |

### Tech Stack (grouped by function, animated skill bars)

| Function | Tools |
|----------|-------|
| Analytics Engineering | dbt, Snowflake, Databricks, PySpark, S3, mParticle, Redshift |
| Data Analysis & Science | SQL, Python, Statistics, Experimentation, Optimizely, Split, Amplitude |
| Business Intelligence | Tableau, Metabase |
| AI & Development | Claude Code |

Data sources (separate line): Backend systems, mobile & web events, third-party platforms (Stripe, Mixpanel, AppsFlyer, Braze, mParticle)

### Education
- USC — M.S. Business Analytics (Dec 2016)
- University of Iowa — B.B.A. Accounting / B.B.A. MIS (Dec 2013)

### Services (soft CTA only)
"Want to build a data strategy for your company? Let's talk."

### Contact
- LinkedIn: linkedin.com/in/yilewu/
- GitHub: github.com/dylanwuplayground
- Email via FormSubmit.co form (sends to dylanwu516@gmail.com, not displayed as plain text)

## Post-Build Decisions (user-directed, 2026-03-29)

- **LinkedIn URL**: linkedin.com/in/yilewu/ (not /dylanwu/)
- **GitHub URL**: github.com/dylanwuplayground
- **Hero**: "View work" button removed — only "Get in touch" CTA remains
- **Contact form**: Uses FormSubmit.co to forward submissions to dylanwu516@gmail.com; section centered on page
- **Education cards**: Enlarged (bigger icons, padding, text) per user request
- **Tech stack additions**: mParticle, Redshift (Analytics Engineering); Optimizely, Split, Amplitude (Data Analysis & Science)

## Development Process

**Harness-style development (Three-Agent GAN pattern):**

1. Read `claude-progress.json` and `feature_list.json` before starting any work
2. Pick ONE feature from `feature_list.json` marked `"passes": false`
3. Implement the feature fully
4. Git commit with descriptive message
5. Update `claude-progress.txt` with what was done
6. After commit: QA agent validates functionality + accuracy
7. After QA: Design agent validates color/spacing/typography consistency
8. If QA or Design fails: git rollback, capture feedback in progress file, fresh agent rebuilds
9. If both pass: mark feature as passing in `feature_list.json`, move to next

**Rules:**
- One feature at a time — never skip ahead
- Always read progress file before starting
- Always commit before QA
- Never mark a feature passing without QA + Design approval
- All content comes from this file — do not invent or change copy

## Consistency Rules

### 1. Design Tokens in Tailwind Config Only
All colors, fonts, spacing defined once in `tailwind.config.ts`. Never hardcode hex values in components.
```
// Correct: className="text-primary bg-background"
// Wrong:   className="text-[#C26D4D] bg-[#131313]"
```

### 2. Component Inventory (JSON)
`component-inventory.json` tracks what's built, where it lives, what it depends on. Read before touching any component.

### 3. One Component Per File
Each section = one file. Agent working on Experience never accidentally breaks Hero.
```
src/components/
  Sidebar.tsx
  Hero.tsx
  DomainExpertise.tsx
  Experience.tsx
  TechStack.tsx
  Education.tsx
  Contact.tsx
```

### 4. Shared Constants File
All content strings in `constants/content.ts`. Agent changing copy never touches layout code. Layout agent never touches copy.

### 5. Screenshot Baseline for QA
After each feature passes QA, save a Playwright screenshot. Future QA agents compare against baseline to catch visual regressions.

## Tech Stack

- Next.js (App Router, TypeScript)
- Tailwind CSS
- Framer Motion (animations — declarative in JSX, self-documenting for future agents)
- Deployed to Vercel
