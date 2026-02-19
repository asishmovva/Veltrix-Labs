# Phase 2 Test Log

Date: 2026-02-19

## Automated checks

- `npm run lint` -> pass
- `npm run build` -> pass

## Route checks (local `npm run start`)

- `/` -> 200
- `/services` -> 200
- `/work` -> 200
- `/about` -> 200
- `/contact` -> 200
- `/api/health` -> 200
- `/sitemap.xml` -> 200
- `/robots.txt` -> 200

## Lead API checks

- Invalid email payload -> 400 with validation error
- Honeypot (`website` filled) -> 200 `{ "ok": true }` (silent drop path)
- Rate limit check (6 fast valid submits from same IP) -> `502, 502, 502, 502, 502, 429`

Notes:
- `502` responses above are expected locally without configured `RESEND_*` and `GOOGLE_SHEETS_*` env vars.
- Once env vars are set in Vercel, valid submissions should return 200 and trigger both email + sheet append.
- Mobile success-state screenshot was captured with `/api/leads` mocked to return `{ ok: true }` to verify client success UI rendering before production secrets are configured.
- `/api/leads` is now partial-success safe: if either Sheets or email succeeds, it returns `{ ok: true }`; it returns 502 only when both fail.

## Event API checks

- Valid event payload (`cta_click`) -> 200
- Invalid event name -> 400
