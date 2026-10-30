# IND Commerce delivery plan

Goal: build an independently owned India-first commerce platform with JavaScript themes, merchant/partner/developer/support workflows, reliable store operations and evidence-based value for Indian merchants. Shopify is the capability benchmark; superiority is an outcome to prove, not an implemented feature.

Owner: Rohit Sharma / Netcurion. Updated 30 October 2026. Review branch: `codex/ind-commerce-pilot`; draft PR: https://github.com/Rohitsharma6377/IND/pull/1 .

## Operating method

Each development session reads this plan, repository state and checks, selects the highest-priority unmet acceptance criterion, implements a bounded end-to-end change, runs relevant tests and saves reviewable work to the draft branch. Preserve unfinished framework and unrelated work. Re-read files and use current GitHub blob SHAs before writing. If a concurrent run is already working, avoid competing edits.

A separate daily development automation is enabled around 10 AM Asia/Kolkata. It performs work when tools and access permit; unavailable environments are blockers, not successful validation. Do not merge or deploy production, alter DNS, activate live payments, spend money or send external messages as part of this automation. Pause it when the release gates below are met. Ask for concrete missing credentials only when the reviewable integration requires them.

## Current evidence

- Implemented: core merchant/partner/support pilot, COD orders, stock checks, private apps and scoped access; marketing pages, domain setup, encrypted/versioned Razorpay settings; isolated JavaScript themes and validated JSON layouts.
- This delivery: visual section settings/order/visibility, import/export and persisted publish/rollback; real PNG/JPEG/WebP uploads, metadata-free WebP derivatives, ordered product galleries, alt-text controls, private original storage and bounded closed-store preview URLs.
- Fixed: domain validation must reject URL syntax before IDNA normalization; custom-host HTTP tests use an HTTP transport that preserves the intended Host header.
- Validation: all 94 Node tests passed on Node 24.19.0, including actual QuickJS and image decoding; 37 modules passed syntax checks; dependency audit found 0 known vulnerabilities. Sharp 0.35.5 is pinned, with the complete dependency lockfile.
- Browser gate: incomplete. The in-app browser was unavailable; opening the local preview through Brave timed out. No browser rendering or interaction pass is claimed.
- Provider tests use controlled transports; a real Razorpay sandbox transaction, TLS/DNS activation, container deployment and production identity/recovery remain unverified.

## Ordered milestones

| Priority | Milestone | Status | Exit criteria |
| --- | --- | --- | --- |
| P0 | Runnable tested pilot | Runtime checks pass; browser gate pending | Reproduce npm ci/check/test, inspect working desktop/mobile flows, fix observed UI errors |
| P1 | Visual storefront and media | Implemented locally and under regression coverage | Browser verify upload → ordered gallery → visual content edit → preview → save → publish → rollback; retain screenshots/findings |
| P2 | Catalog and structured data | Next implementation work | Variants/options, variant stock and prices, typed definitions/values and reusable content; tenant-safe references and public/private projection tests |
| P3 | India merchant operations | Partial integrations only | Reviewed GST documents, discounts, stock reservations/expiry, shipping sandbox, returns, refunds and settlement reconciliation with idempotency and audit trails |
| P4 | Partner/developer/support ecosystem | Pilot foundations | Approved collaborator access, store transfer acceptance, plugin lifecycle/scopes/versioning/webhook retries, support diagnostics and audited access; verified billing and partner payout rules |
| P5 | Production operations | Not complete | Production identity with verified recovery/MFA, PostgreSQL migrations, queue/storage design, backup and restore drills, monitoring, incident runbook, security review and documented load/cost limits |
| P6 | Differentiation validation | Not complete | Compare mobile performance, merchant task completion, reconciliation accuracy, support response and actual total cost with target merchants before marketing superiority |

## Immediate next session

1. Verify the saved PR head and dependency lockfile; check CI status rather than assuming it has run.
2. Complete browser QA through the supported connected browser when available. Review Products → Images, gallery upload/save/reorder/alt text, Online store → Start visual builder, source preview, saved draft, publish/rollback, public gallery/cart and narrow/mobile layouts.
3. Add a browser regression for JSON theme export/import retaining layouts. Review image-library error states and keyboard navigation. Re-check image preview expiry and revocation in an actual sandboxed frame.
4. Implement product variants and typed custom fields as the next end-to-end catalog milestone. Define money, stock, option uniqueness, type validation and visibility before UI work. Keep server authority over pricing and checkout snapshots.

## Known technical work

- SQLite media BLOBs are suitable for this bounded pilot. Move originals/derivatives to durable private object storage with a worker queue and CDN before raising limits. Add timeout/process isolation for native image decoding, derivative cache policies, original/media export and retention/recovery controls.
- The visual starter supports hero, collection and announcement sections. Add typed component schemas, block editor controls, image picker fields, per-page templates and optimistic draft-conflict protection. Custom JavaScript packages can define other renderers but are not a reviewed app marketplace.
- Product galleries are live catalog content; restoring a theme revision restores layout/source, not earlier product media assignments. Product-data versioning is a separate requirement.
- Add global request/upload budgets across processes, monitor storage use, and avoid relying on memory-only rate limits for distributed deployment.
- Hosted automation may lack local runtime. In that case save bounded reviewable changes via GitHub, clearly record execution limits, and do not mark runtime/browser criteria complete.

## Release boundaries

Do not call the platform production-ready or a full Shopify replacement while any P0–P5 gate is incomplete. Never mark a browser callback as payment authority. Keep credentials out of source and exported theme packages. Protect tenant boundaries in all newly introduced queries and file/media references. Keep public theme context to explicitly approved storefront fields.

Implementation checkpoint: `16582e4071e901ef6294ca9f547bfe1bb9113587`. A follow-up hardening commit includes authenticated dashboard thumbnails, explicit public-image projection, a ten-second worker-startup allowance (guest CPU limit remains 250 ms), and two concurrent test files. The final full run passed all 94 tests.
