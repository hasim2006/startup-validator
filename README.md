# Startup Idea Validator Dashboard

A web application for submitting, exploring, and voting on startup ideas. Built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, Prisma, and SQLite.

## Features

- Submit startup ideas with title, description, problem statement, category, difficulty, and market potential
- Browse all ideas on a responsive dashboard
- Search ideas by keyword (title, description, problem statement)
- Filter by category, difficulty, and market potential
- Upvote promising ideas
- Real-time statistics: total ideas, top category, average difficulty
- Clean, modern UI with hover effects and smooth transitions

## Tech Stack

| Layer     | Technology                    |
|-----------|-------------------------------|
| Framework | Next.js 14+ (App Router)      |
| Language  | TypeScript                    |
| Styling   | Tailwind CSS + shadcn/ui      |
| ORM       | Prisma                        |
| Database  | SQLite                        |

## Getting Started

### Prerequisites

- Node.js 18+

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd BDHack

# Install dependencies
npm install

# Initialize database and run migrations
npx prisma migrate dev --name init

# Start the development server
npm run dev
```

The app will be running at [http://localhost:3000](http://localhost:3000).

### Database Setup

SQLite requires zero additional setup. The database file is created automatically at `prisma/dev.db` when you run the migration command. The connection string is configured via the `DATABASE_URL` environment variable in `.env`:

```
DATABASE_URL="file:./prisma/dev.db"
```

Optionally run `npx prisma studio` to inspect data via a GUI.

## Project Structure

```
app/
  page.tsx              — Dashboard page
  submit/page.tsx       — Submit idea page
  api/ideas/route.ts    — REST API endpoints
components/
  IdeaCard.tsx          — Idea card with vote button
  IdeaForm.tsx          — Submission form
  FilterBar.tsx         — Filter controls
  SearchBar.tsx         — Search input
  StatsPanel.tsx        — Statistics display
  IdeaGrid.tsx          — Responsive card grid
  ui/                   — Reusable UI primitives
lib/
  prisma.ts             — Database client
  stats.ts              — Statistics computation
  utils.ts              — Utilities and constants
prisma/
  schema.prisma         — Database schema
docs/
  PRD.md                — Product requirements
  architecture.md       — Architecture documentation
```

## API Endpoints

| Method | Route        | Description                          |
|--------|------------- |--------------------------------------|
| GET    | /api/ideas   | List ideas (with filters and search) |
| POST   | /api/ideas   | Create a new idea                    |
| PATCH  | /api/ideas   | Upvote an idea (pass `?id=<id>`)     |
