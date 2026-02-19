# Phase 1 QA Evidence

## Lighthouse (Home)

- Performance: 97
- Accessibility: 91
- Best Practices: 96
- SEO: 92

## Local Route Checks

- `http://localhost:3000/` -> 200
- `http://localhost:3000/services` -> 200
- `http://localhost:3000/work` -> 200
- `http://localhost:3000/about` -> 200
- `http://localhost:3000/contact` -> 200
- `http://localhost:3000/api/health` -> 200
- `http://localhost:3000/sitemap.xml` -> 200
- `http://localhost:3000/robots.txt` -> 200

## Production Route Checks (Before Merge)

- `https://veltrix-labs.vercel.app/` -> 200
- `https://veltrix-labs.vercel.app/services` -> 200
- `https://veltrix-labs.vercel.app/work` -> 200
- `https://veltrix-labs.vercel.app/about` -> 200
- `https://veltrix-labs.vercel.app/contact` -> 200
- `https://veltrix-labs.vercel.app/api/health` -> 200
- `https://veltrix-labs.vercel.app/sitemap.xml` -> 200
- `https://veltrix-labs.vercel.app/robots.txt` -> 200

## Contentlayer Windows Warning

- When it appears:
  - During `npm run contentlayer` (and therefore `npm run build` via `prebuild`) on Windows.
  - It appears after `Generated 7 documents in .contentlayer`.
- Exact error text:
```text
TypeError: The "code" argument must be of type number. Received an instance of Object
    at process.set [as exitCode] (node:internal/bootstrap/node:122:9)
    at Cli.runExit (...\\node_modules\\clipanion\\lib\\advanced\\Cli.js:232:26)
    at run (...\\node_modules\\@contentlayer\\cli\\dist\\index.js:26:5)
    at main (...\\node_modules\\contentlayer\\bin\\cli.cjs:5:3)
```
- Version context:
  - Node: `v22.18.0`
  - npm: `10.9.3`
  - contentlayer: `0.3.4`
- Behavior observed:
  - Despite the warning, command exit code is `0`.
  - `.contentlayer` output is generated and Next.js build completes successfully.
- CI confirmation:
  - Ubuntu CI check `build` passed on PR #2 (`actions/runs/22177186065/job/64128774373`).
