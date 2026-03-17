# Product Requirements Document — Startup Idea Validator Dashboard

## Overview

A web application that allows users to submit startup ideas and explore them on a dashboard with filters, search, and statistics. Built for hackathon demonstration.

## Goals

- Allow users to submit structured startup ideas
- Provide a searchable, filterable dashboard of all ideas
- Display summary statistics dynamically
- Support upvoting to surface the best ideas

## User Stories

1. As a user, I can submit a new startup idea with title, description, problem statement, category, difficulty, and market potential.
2. As a user, I can browse all submitted ideas on the dashboard.
3. As a user, I can search ideas by keyword across title, description, and problem statement.
4. As a user, I can filter ideas by category, difficulty, and market potential.
5. As a user, I can upvote ideas I find promising.
6. As a user, I can see statistics: total ideas, most common category, and average difficulty.

## Data Model

### Idea

| Field            | Type     | Notes                         |
|-----------------|----------|-------------------------------|
| id              | String   | CUID, primary key             |
| title           | String   | Unique                        |
| description     | String   |                               |
| problemStatement| String   |                               |
| category        | String   | From predefined list          |
| difficulty      | Int      | 1–5                           |
| marketPotential | String   | Low / Medium / High / Very High |
| votes           | Int      | Default 0                     |
| createdAt       | DateTime | Auto-set                      |

## Categories

SaaS, E-Commerce, FinTech, HealthTech, EdTech, AI/ML, Social, Marketplace, Developer Tools, Other

## Pages

1. **Dashboard** (`/`) — Stats, search, filters, idea grid with voting
2. **Submit** (`/submit`) — Form to create a new idea

## Validation Rules

- All fields are required
- Titles must be unique (enforced at DB level)
- Difficulty must be 1–5
- Market potential must be one of the defined values
