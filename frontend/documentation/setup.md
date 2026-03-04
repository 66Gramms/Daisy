# Setup

## Quick Start

```bash
npm install
npm run dev    # port 3000
npm run build  # production build
npm run lint
```

Requires `.env.local` with `NEXT_PUBLIC_API_URL` (default `http://localhost:5000`).

## Styling

Uses Tailwind v4 with the `@theme` directive in `app/globals.css` instead of a `tailwind.config.js`. The color palette is inspired by GitHub's dark theme (dark backgrounds, emerald accent).

When adding new colors or design tokens, define them in `globals.css` under the `@theme` block. There's also a custom `highlight-text` utility defined via `@utility` for bold emerald text.
