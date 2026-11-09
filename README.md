# Engineering portfolio

Next.js portfolio site with optional [Sanity](https://www.sanity.io/) CMS. No backend required.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Without Sanity env vars, the site uses built-in demo content. Embedded Studio is at [http://localhost:3000/studio/](http://localhost:3000/studio/) once `NEXT_PUBLIC_SANITY_PROJECT_ID` is set.

## Commands

| Command | Description |
|--------|-------------|
| `npm run dev` | Development server (port 3000) |
| `npm run build` | Static export to `build/` |
| `npm run serve` | Production server after `build` |
| `npm run start` | Development server (same as `dev`) |

## Sanity (optional)

Create `.env`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_write_token
```

Seed demo content:

```bash
npm run seed:sanity
```

## Project layout

- `src/` — Next.js 15 app (pages, components, Sanity schemas)
- `public/` — static images
- `scripts/` — Sanity seed helpers
