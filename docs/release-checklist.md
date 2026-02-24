# Release Checklist

## Mobile QA (360px baseline)

- No horizontal scroll on `360px` width.
- Primary buttons and CTA buttons are at least `44px` tall.
- Tap targets (nav, drawer links, form actions) are at least `44x44`.
- Sticky navbar does not cover anchor targets (`scroll-mt-24` behavior).
- No overlapping UI (chat button, drawer, CTA bars, footer links).
- Forms are usable without zooming; error messages remain readable.

## Route QA

- `/` loads (no 404, no broken styles, navbar/footer visible).
- `/services` loads.
- `/work` loads.
- `/about` loads.
- `/contact` loads.
- `/pricing` loads (when introduced).
- `/api/health` returns `200`.
- `/sitemap.xml` returns `200`.
- `/robots.txt` returns `200`.
- Key anchor routes work (example: `/contact#contact-form`).

## Form Submission QA

- Valid submission shows success state.
- Invalid email shows client validation error.
- Required fields enforce validation messages.
- Honeypot field (`website`) silently drops bot submissions.
- Rate limit returns `429` after threshold (test quickly from same IP).
- Lead reaches email destination (Resend).
- Lead row is appended to Google Sheets.
- Event tracking rows append for CTA clicks / lead submit events (when enabled).
- Verify new fields added in future phases appear in both email and Sheets.

## Pre-merge Checks

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- CI checks green on PR
- At least one reviewer approval (per branch protection)
