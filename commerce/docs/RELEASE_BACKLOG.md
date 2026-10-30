# Release gates and next implementation milestones

The local pilot implements a coherent order-to-collection reference. The full product goal remains in the [research blueprint](https://chatgpt.com/space/page_f4698a0be33c8191b5cc8026eb64c09d). Do not market this branch as feature parity with Shopify.

| Milestone | Next work | Required evidence |
| --- | --- | --- |
| Identity and tenancy | Verified email, invitations, reset, MFA, secure HTTPS cookies, organizations, role policy review | Cross-store negative tests, recovery tests, session rotation and access review |
| Database and operations | PostgreSQL adapter and migrations, backups/restore, observability, deployment environments and secrets | Restore drill, migration rollback plan, concurrency and load results |
| Catalog | Variants, product media uploads, CSV import/export, bulk edits, multi-location stock and reservation expiry | Import error reports, image validation, concurrent inventory tests |
| Checkout and money | Contracted payment gateway, verified signed webhooks, payment attempts, provider idempotency, settlement reconciliation and refunds | Real provider sandbox tests including duplicate and out-of-order events; no browser callback treated as proof of payment |
| Fulfilment | One courier adapter, tracking, NDR/RTO, returns, partial fulfilment, COD remittance | Sandbox booking/cancellation, replay-safe tracking, reconciliation exceptions |
| India documents | Maintained GST rules, invoice/credit-note numbering, place of supply and applicable e-invoice/e-way workflows | Review by qualified specialists and example document reconciliation |
| Themes and IndJS | First-class theme manifests/section schemas, React renderer, media, accessibility, localization and editor conflict handling | Publish/rollback E2E tests, rendering and navigation conformance, mobile performance |
| App ecosystem | OAuth/consent, app organizations, signed delivery workers, retries, uninstall cleanup and version compatibility | Scope/revocation tests, delivery logs, abuse controls and sandbox assessment before arbitrary code |
| Partners | Invite/accept handover, team roles, referral attribution, commissions, payouts and tax documents | Ownership acceptance, refund holds, ledger reconciliation and merchant revocation |
| Support | Staffed coverage, approved temporary support access, redaction, status page and incident runbooks | Support access expiry, incident drill, recorded staffing/SLA commitments |
| AI and automation | Evaluations, provider controls, workflow approvals and costs, persistent jobs, consent-based messaging | Scoped inputs, prompt-injection tests, approval bypass tests, failure/retry/cost limits |
| Billing | Validated plans, metering, invoices, subscription lifecycle, transparent overages | Merchant interviews, workload cost model and sandbox billing tests |
| Pilot | Ten consenting merchants and three agencies with explicit support arrangements | Real activation, task completion, cost, support and retention evidence |

## Implementation decisions

- The first runtime is local-only, bound to loopback. Normal mode and fictional demo mode use separate default databases.
- COD collection is a manual ledger state, never represented as a confirmed bank settlement.
- Cancellation before shipment restores inventory once; returns/refunds require a later dedicated state machine.
- Private app order responses deliberately exclude customer contact/address fields. Future data scopes must require explicit consent.
- Support reads tickets without a default store membership.
- Handover revokes all old memberships and app tokens. A receiving account must already exist; verified invite acceptance is a release gate.
- Plugin permissions are a review contract for allowlisted first-party behavior. They do not turn arbitrary Node code into a secure sandbox.
- Theme rollback publishes a new revision; previous immutable configurations remain available.
- AI drafting is optional, uses a fixed loopback endpoint, is text-only and has no action tools.
- No cloud deployment, live data migration, provider provisioning, billing charge, email or external customer message is performed by this branch.

## Validation record

- JavaScript modules were syntax-parsed while preparing source. 25 pure validation/rendering/asset checks passed in a JavaScript isolate; this is separate from the Node/SQLite/HTTP test suite.
- Local process execution and browser QA could not be completed after the user workspace disconnected.
- Automated tests and a Linux/Windows CI workflow are supplied. The pull request records actual CI results separately; this document does not assert they passed.
- Real Ollama inference, payments, courier APIs, production recovery and merchant pilot outcomes have not been verified.
