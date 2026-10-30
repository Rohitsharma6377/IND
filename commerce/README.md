# IND Commerce — merchant platform and marketing website

An independently owned commerce pilot in the IND repository. It includes the public website, merchant/partner/support workspaces, storefronts, custom Liquid templates, domain verification and a Razorpay adapter.

**This is pilot software. Live DNS, hosting, provider sandbox validation and production release gates are not completed.** The selected marketing hostname is **commerce.netcuriontechnology.com**; it has not been pointed or deployed by this change.

## Run locally

Requires **Node.js 24.13+**.

```sh
cd commerce
npm install --ignore-scripts --no-audit --no-fund
npm run demo
```

- Marketing website: `http://127.0.0.1:4310/`
- Merchant, partner, support and receiving-merchant demo roles: `http://127.0.0.1:4310/admin`
- Fictional sample storefront: `http://127.0.0.1:4310/s/banyan`

The explicit `--demo` flag creates fictional data in `data/demo.db`. Normal mode uses `data/commerce.db`. Do not enter real personal/payment information into the demo or expose demo login publicly. The normal default bind is loopback; a wider bind requires an HTTPS public origin and demo mode disabled.

The disconnected local workspace contains intermediate expansion files. Fetch this PR into an isolated checkout when resuming; preserve the unfinished IndJS work and earlier local files.

The two direct template dependencies are pinned. Generate/review the npm lockfile and audit the resolved dependency tree when the execution workspace returns, before merging or building a release.

## What is implemented

| Surface | Code behavior |
| --- | --- |
| Public website | Home, pricing, themes, partners, developers, signup, contact, pilot privacy and terms; responsive navigation, feature tabs, FAQ, metadata, robots and sitemap |
| Onboarding | Password-based merchant/partner signup with explicit pilot consent; merchant stores start closed; no paid subscription is created |
| Merchant workspace | Products, stock ledger, authoritative COD checkout, orders, customer grouping, charts, collection summaries, exports and activity |
| Theme studio | Three built-in directions plus a Liquid code editor, package import/export, partial files, isolated preview, draft/publish/history/rollback |
| Private integrations | Store-bound read-only app tokens, scope enforcement, revocation, no contact/address data in app order responses |
| Partner workspace | Development stores, scoped collaboration and handover; transfer revokes memberships/app tokens, disables inherited gateway setup and resets domain proof |
| Support | Tickets and responses; consented pilot enquiries are available only to support accounts; no automated email or marketing subscription |
| Domains | Unique TXT ownership proof, operator-target DNS checking, separate pinned HTTPS/certificate/route verification and tenant-bound custom-host routing |
| Payments | Encrypted/versioned Razorpay settings, server-side provider orders, hosted checkout, signature/payment verification, raw signed/deduplicated webhooks, exception records |
| AI | Optional local Ollama drafting with limited product context and no action tools |

Draft prices remain **₹999 / ₹2,499 / ₹6,999 monthly**. These are unvalidated proposals. Product capacity is enforced; staff/location metering and billing remain planned.

## Normal accounts and private configuration

Normal mode does not seed users or allow demo entry. Create accounts with the setup command and a private environment password:

```powershell
$credential = Get-Credential -UserName 'owner@example.com' -Message 'Choose the local pilot password'
$env:COMMERCE_SETUP_PASSWORD = $credential.GetNetworkCredential().Password
npm run setup -- --email=owner@example.com --name=Owner --slug=my-store
Remove-Item Env:COMMERCE_SETUP_PASSWORD
npm start
```

Use `--kind=partner` or `--kind=support` for those account types. Omit `--slug` for a merchant receiving a handover. Passwords require 12+ characters.

The server reads its process environment. For a private `.env`, use `node --env-file=.env src/server.mjs` or supply environment values through the service/container manager. The `.env.example` file contains names and non-secret deployment targets only. Never commit real credentials.

Public self-serve signup can be disabled with `COMMERCE_ALLOW_SIGNUP=0`; the signup route then redirects to the pilot contact form. Verified email, password recovery, MFA and verified handover acceptance are production gates, not completed account features.

## Custom Liquid themes

In Online store, choose **Custom Liquid code**, edit the source files, render a preview, save the draft and publish. The package needs `index.liquid` and can include up to nine simple-named partials. Export/import uses a JSON package with `schema_version`, `settings` and `files`.

```liquid
{% for product in products %}
  <article class="theme-product">
    <h3>{{ product.name }}</h3>
    <p>{{ product.price | money }}</p>
    {% if product.available %}
      <button data-ind-add="{{ product.id }}">Add to bag</button>
    {% endif %}
  </article>
{% endfor %}
```

Available context is limited to public shop/settings/product fields. Templates use the maintained LiquidJS parser with an in-memory file map, bounded worker threads, output sanitization and a sandboxed frame. HTML and a limited style set are supported; arbitrary JavaScript, filesystem paths, remote includes, forms and external links are not supported.

The frame has its own nonce-bound CSP and cannot use the management origin. Its bridge can request a known product be added to the parent cart; server checkout still validates prices, stock and payments. Source files are not returned by the public store JSON API. This is not Shopify theme/API compatibility or an arbitrary-code marketplace.

## Payment gateway

Open **Domains & payments** as the store owner. Configure `COMMERCE_MASTER_KEY` first, then enter the merchant's test key ID, API secret and webhook secret in the protected UI. Credentials use store-bound AES-256-GCM encryption; immutable versions support older payment attempts after rotation.

The customer chooses COD or configured Razorpay checkout. Online amounts are calculated by the server. A browser callback is verified and then checked against the provider's payment reference, order, amount, currency and capture state. Raw webhook signatures and event IDs are checked; later failed/authorised events cannot downgrade capture.

Keep live mode off. It requires `COMMERCE_ALLOW_LIVE_PAYMENTS=1`, HTTPS public origin, demo disabled, a merchant account and verified provider sandbox behavior. No account/key was provisioned, no real payment was executed, and no live credentials are included.

Uncertain provider creation is not retried automatically. Stock remains reserved for review. Merchant cancellation restores stock but does not cancel the provider order; a later verified capture becomes a refund-review exception without automatic fulfilment. Refund execution, settlement reconciliation and automatic abandoned-order expiry are still unfinished.

See [domain and gateway activation](docs/DOMAIN_AND_GATEWAY_SETUP.md) for the exact deployment target, DNS record, webhook path, checks and rollback boundary.

## Domain management

Owners receive a unique TXT challenge and configured ingress target. DNS verification and HTTPS verification are different states. Private/reserved IPs cannot pass the pinned HTTPS probe. Custom hosts are bound to one storefront and cannot access management routes or another store API.

The application does not register domains, edit registrar records, provision TLS certificates or configure the live proxy. The supplied Docker/Compose and HTTP bootstrap Nginx files are unverified deployment templates. Configure valid TLS and review sibling services before enabling real traffic.

## Validation record

The **31-test baseline at revision 1a1c4aedb0661e0fcc469210489b190e0e6024bb passed** through the restored local Node runtime before the workspace disconnected again.

The expanded suite now contains **60 tests**, including payment cryptography/lifecycle/rotation, domain ownership and routing, Liquid isolation, public signup and marketing HTTP flows. These expanded tests have been authored but **have not been run** in the unavailable workspace. All 26 JavaScript modules syntax-parse, and 98 pure rendering/validation/import checks passed. These do not replace Node, SQLite, HTTP or browser tests.

```sh
npm run check
npm test
```

CI configuration installs the pinned direct dependencies and targets Node 24 on Linux and Windows. Actual CI results must be reviewed. No browser layout, real provider sandbox, live DNS/TLS, container deployment or production recovery has been verified for this expansion.

## Technology and production boundary

The commerce rules and APIs are independent of the renderer: Node, SQLite, browser-native admin/storefront modules, LiquidJS and sanitize-html. They do not require Next.js or Shopify APIs. The surrounding unfinished IndJS runtime remains a separate workstream; this change does not validate IndJS SSR, navigation or Next.js feature parity.

Production still requires PostgreSQL/migrations, durable workers and reservation expiry, identity hardening, tax-document logic, shipping/returns/refunds, billing/partner payouts, operational recovery, staffed support and independent security/load testing. See [release gates](docs/RELEASE_BACKLOG.md). No production migration, main-branch merge or live-data change is performed by this branch.
