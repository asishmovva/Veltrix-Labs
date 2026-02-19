# Veltrix Labs

Next.js 16 App Router site for Veltrix Labs, with MDX content via Contentlayer and deployment on Vercel.

## Local Setup

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open:
```text
http://localhost:3000
```

## Build And Verify

```bash
npm run lint
npm run build
npm run start
```

## Deploy Note

- Production deploys from `main` to Vercel.
- `vercel.json` is intentionally kept to force Next.js framework detection/build because this project previously deployed as static output and returned Vercel `NOT_FOUND` on app routes.

## Key Routes

- `/`
- `/services`
- `/work`
- `/about`
- `/contact`
- `/api/health`
- `/sitemap.xml`
- `/robots.txt`
