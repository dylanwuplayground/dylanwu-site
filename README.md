# dylanwu.me

Personal portfolio site for Dylan Wu — analytics leader and AI builder with 10 years of experience at high-growth startups.

**Live**: [dylanwu.me](https://www.dylanwu.me)

## Built With

- **Next.js** (App Router, TypeScript)
- **Tailwind CSS** v4
- **Framer Motion** — scroll-driven animations, barrel timeline effect
- **Vercel** — hosting and deployment

Design inspired by [Awwwards portfolio winners](https://www.awwwards.com/websites/winner_category_portfolio/) and prototyped with [Google Stitch](https://stitch.withgoogle.com/).

## Features

- Dark theme with warm copper accent (#C26D4D)
- Terminal-style status bar with live LA time
- Interactive domain expertise cards with hover-reveal descriptions
- Scroll-driven experience timeline with barrel/drum effect
- Directional rocket icon that flips based on scroll direction
- Role crossfade animation (Route: Staff Analyst to Team Lead)
- Year markers counting down through career history
- Terminal command transitions between sections
- Glitch hover effect on name
- Typing animation in hero
- Fully responsive (desktop sidebar, mobile hamburger)

## How It Was Built

This site was built entirely through an AI-native pipeline:

1. **Content** — finalized via multi-agent writer/voter process (3 writers, 3 voters per section)
2. **Design** — Google Stitch prototype + Awwwards reference sites
3. **Development** — Claude Code with harness-driven development pattern
4. **QA** — adversarial QA + design review agents after each feature

## Project Structure

```
src/
  app/              # Next.js App Router (layout, page, globals)
  components/       # One component per section
    Sidebar.tsx
    StatusBar.tsx
    Hero.tsx
    DomainExpertise.tsx
    Experience.tsx
    TechStack.tsx
    Education.tsx
    Contact.tsx
    TerminalTransition.tsx
  constants/        # All content strings (single source of truth)
    content.ts
  lib/              # Utilities (future: API helpers, data fetching)
  types/            # TypeScript types (future: shared interfaces)
public/
  logos/            # School logos (USC, Iowa)
```

## Development

```bash
npm install
npm run dev
```

## License

MIT
