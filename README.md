# FreeAPI Product App

A small single-page product listing app built with Vite, React and TypeScript that fetches product data from a public/free API and lets users browse, filter and view product details.

## What it does

- Fetches product data from a remote (free) API and displays them as cards.
- Provides client-side filtering and sorting.
- Shows product details in a modal with formatted prices.
- Persists small user preferences locally (e.g., filters) using local storage.

## Tech stack

- Vite — fast dev server and build tooling
- React with TypeScript — UI and strong typing
- Tailwind CSS — utility-first styling
- Fetch API — network requests to the public products API
- LocalStorage (via a small hook) — remember user choices

## How it works (high level)

1. On load, the app fetches a product list from the configured API endpoint.
2. The top-level `Home` page holds the product state and filter state.
3. `Filters` updates filter criteria which are applied on the client to the fetched list.
4. `ProductCard` renders each product; clicking opens `ProductModal` with details.
5. Preferences (like active filters) are stored with `useLocalStorage` so they survive reloads.

Key files:

- `src/pages/Home.tsx` — main page and data orchestration
- `src/components/Filters.tsx` — filter controls
- `src/components/ProductCard.tsx` — product display
- `src/components/ProductModal.tsx` — product details view
- `src/hooks/useLocalStorage.ts` — small localStorage helper

## Project structure

Top-level important files and folders:

- `src/` — application source
  - `assets/` — images and static assets
  - `components/` — shared UI components
  - `hooks/` — custom React hooks
  - `pages/` — routeable pages (currently `Home`)
  - `utils/format.ts` — formatting helpers

## Getting started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Configuration

- The app uses a free/public products API URL inside the source. Search for `fetch` in `src/pages/Home.tsx` to locate the request. To change the API endpoint, update the URL there or add an environment variable and reference it.

## Contributing & next steps

- Open issues or PRs to fix bugs or add features (sorting, pagination, caching).
- Add environment variable support for the API base URL.
- Add unit and integration tests for components and data flow.

## License

This project is provided as-is. Check repository metadata for license details.

