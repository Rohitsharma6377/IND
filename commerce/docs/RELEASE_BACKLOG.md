# IND Commerce release gates

This branch is a pilot implementation, not a production Shopify replacement. The full product goal is in the [research blueprint](https://chatgpt.com/space/page_f4698a0be33c8191b5cc8026eb64c09d).

| Area | Prepared in source | Required before production |
| --- | --- | --- |
| Marketing | Nine public pages, metadata, pilot forms, signup | Browser/accessibility review, approved brand/legal copy, live ingress and domain verification |
| Identity | Password hash, expiring sessions, roles, CSRF and host checks | Verified email, MFA, invitations, recovery, signup abuse controls and account deletion |
| Data | Local SQLite persistence and additive expansion tables | PostgreSQL migrations, tenant-isolation review, backups/restore, load tests and operational monitoring |
| Catalog | Products, stock ledger and transactional order deductions | Variants, media, CSV import, multi-location stock and reservation expiry |
| Payments | Razorpay adapter, signed captures, immutable credential versions and exception handling | Real provider sandbox tests, live onboarding, refunds, disputes, settlement reconciliation and recovery |
| Domains | TXT/pointing checks, separate pinned HTTPS route proof, host/tenant boundary | Registrar access, dedicated ingress, valid certificates, renewal/ownership monitoring and IPv6 policy |
| Themes | Built-in themes, bounded QuickJS/WASM workers, allowlisted HTML, isolated frames, editor/history | Dependency install/lock/audit, actual worker tests, browser/a11y/performance tests and resource-abuse assessment |
| Plugins | First-party allowlist and private read-only app tokens | OAuth/consent, delivery workers, retries, uninstall lifecycle and safe public extension isolation |
| Partners | Development stores and transfer with access/key/domain reset | Verified recipient acceptance, organizations, referrals, commissions, tax documents and payouts |
| Support | Tickets and consented pilot enquiries | Staffed coverage, approved temporary support sessions, incident drills and service commitments |
| Operations | Dedicated deployment templates | Tested container build, exact isolated server inventory, TLS ingress, restore and rollback drills |
| India workflows | Configured inclusive tax arithmetic only | Reviewed invoice/credit-note numbering, place of supply, GST splits and applicable e-invoice/e-way workflows |
| Commercial pilot | Proposed plans and working configuration choices | Merchant interviews, workload economics, supported merchant pilots and evidence-based pricing |

## Current validation

- The original 31-test pilot baseline passed at revision 1a1c4aedb0661e0fcc469210489b190e0e6024bb.
- The 74-test expanded suite is supplied but has not run after the workspace disconnected.
- Current JavaScript-theme validation: 30 source/example modules parse in V8; 155 pure assertions passed. Actual QuickJS/WASM, Node/SQLite/HTTP/browser execution remains pending.
- No real Ollama inference, provider sandbox transaction, live DNS/TLS change, production deployment, recovery drill or independent security audit is complete.

## Exact activation target

The user selected **commerce.netcuriontechnology.com**. Read-only DNS showed GoDaddy nameservers and parent IPv4 **66.116.248.221**. The new hostname, application deployment and certificate were not changed. Follow [the activation runbook](DOMAIN_AND_GATEWAY_SETUP.md), inspect the live server first, and keep the company site and other products separate.

## Important invariants

- Browser success callbacks never mark an online order paid without provider signature/reference/amount/currency/capture verification.
- Retired gateway credential versions remain encrypted for old attempts and webhook retries.
- Handover revokes memberships/app tokens, disables inherited payment setup and rotates domain ownership proofs.
- Cancellation restores stock once; late captures become refund-review exceptions and never fulfil automatically.
- Uncertain provider-order creation is not automatically retried. Pending stock needs operator review until an expiry/reconciliation worker is implemented.
- Custom templates only receive public catalog context. Their JavaScript runs in a fresh, bounded WASM engine without host APIs; final HTML is sanitized. Merchant source is never executed by Node.
- Template preview frames use their own response CSP and opaque sandbox; management runs outside that frame.
- DNS proof does not mean TLS is active. Custom hosts cannot access management or choose a different store slug.
- Contact forms save explicit reply consent without sending emails or adding marketing subscriptions.
