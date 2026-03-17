# Architecture

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui component patterns
- **ORM**: Prisma 6
- **Database**: PostgreSQL

## Project Structure

```
/app
  layout.tsx          — Root layout (Inter font, metadata)
  page.tsx            — Dashboard (client component)
  globals.css         — Tailwind + CSS variables theming
  /submit
    page.tsx          — Submit idea form page
  /api/ideas
    route.ts          — REST API (GET, POST, PATCH)

/components
  IdeaCard.tsx        — Single idea card with vote button
  IdeaForm.tsx        — Idea submission form
  FilterBar.tsx       — Category/difficulty/market filters
  SearchBar.tsx       — Keyword search input
  StatsPanel.tsx      — Statistics display (total, top category, avg difficulty)
  IdeaGrid.tsx        — Responsive grid of IdeaCards
  /ui                 — Reusable UI primitives (Button, Input, etc.)

/lib
  prisma.ts           — Singleton Prisma client
  stats.ts            — Statistics computation
  utils.ts            — cn() helper, constants (categories, market potentials)

/prisma
  schema.prisma       — Database schema

/docs
  PRD.md              — Product requirements
  architecture.md     — This file
```

## API Design

### `GET /api/ideas`

Returns all ideas. Supports query params: `category`, `difficulty`, `marketPotential`, `search`.

Search performs case-insensitive matching against title, description, and problemStatement.

### `POST /api/ideas`

Creates a new idea. Validates all fields are present and title is unique (409 on duplicate).

### `PATCH /api/ideas?id=<id>`

Increments the vote count for an idea by 1.

## Data Flow

1. Dashboard page fetches ideas from the API on mount and whenever filters/search change.
2. Filters and search are sent as query parameters to the API.
3. The API delegates filtering to Prisma/PostgreSQL for efficiency.
4. Statistics are computed client-side from the fetched results.
5. Upvotes trigger a PATCH request and optimistically update the local state.

## Styling

Uses a CSS custom property system with HSL values for light/dark theme support. All components use Tailwind utility classes with theme-aware colors (`bg-card`, `text-foreground`, etc.).
