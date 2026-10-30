# IND Commerce — local pilot

An independently owned commerce application inside the IND repository. This is the first implementation of the [India-first commerce blueprint](https://chatgpt.com/space/page_f4698a0be33c8191b5cc8026eb64c09d), prepared for Netcurion Technologies.

**Status: local pilot, not a production Shopify replacement.** The code implements real local persistence and permission-checked workflows. Live payment collection, courier bookings, GST tax-invoice certification, billing, partner payouts and production deployment are not included. All seeded records are fictional. A full Shopify competitor requires further engineering and supported merchant pilots.

## Run it

Requires **Node.js 24.13 or later**. There are no npm dependencies or installation step.

```sh
cd commerce
npm run demo
```

Open **http://127.0.0.1:4310**. Choose Merchant dashboard, Partner workspace, Support inbox, or Receiving merchant. The demo runs only when the explicit `--demo` flag is present. It uses `data/demo.db`; normal start uses `data/commerce.db`. Both are ignored by Git.

The server binds only to the local computer and validates its Host and Origin headers. Do not put this pilot behind a public proxy or expose its port. Demo login intentionally needs no password and must stay local. Do not enter real personal, banking or payment data into the demo.

Use `PORT` to choose another local port, and `COMMERCE_DB` for a different absolute database filename. Do not point demo mode at a real database. Close the server with Ctrl+C.

## Create password-based accounts

Normal mode does not seed any users or allow demo entry. Set a private password through your shell environment, then use the setup command. Avoid storing passwords in source or command history. For example, in PowerShell you can collect it interactively:

```powershell
$credential = Get-Credential -UserName 'owner@example.com' -Message 'Choose the local commerce account password'
$env:COMMERCE_SETUP_PASSWORD = $credential.GetNetworkCredential().Password
npm run setup -- --email=owner@example.com --name=Owner --slug=my-store
Remove-Item Env:COMMERCE_SETUP_PASSWORD
npm start
```

Passwords need at least 12 characters. Use `--store=My-store` for the store display name, `--kind=partner` for a partner account, or `--kind=support` for a support account. Omit `--slug` when creating an account to receive a partner handover. Account recovery, invitations, signup, MFA and verified email are future work.

A normal store starts in development mode. Its owner can open its storefront from Settings after preparing the catalog. Opening a storefront only enables local COD order records; it does not connect payments, delivery or a public domain.

## Implemented workflows

| Area | Working local behavior |
| --- | --- |
| Merchant workspace | Store switcher, permission-aware navigation, metrics computed from orders, search within visible rows, customer grouping, order-value charts and collection summaries |
| Products and inventory | Create/edit/hide products, tax-inclusive integer-paise prices, SKU uniqueness, stock adjustments with reasons and a stock ledger |
| Storefront and checkout | Three first-party theme styles, product collection, bag, customer/address form, server-calculated COD orders, stock checks and idempotency |
| Orders | Independent payment/fulfilment states; ship → deliver → manually record collection; cancellation before shipment restores stock exactly once |
| Themes | Schema-validated settings, live local edit preview, saved draft preview, publish revision checks, history and rollback |
| Plugins | Review declared permissions; install/uninstall three allowlisted first-party plugins; packing/low-stock tasks and a server-side COD value guard |
| Private apps | Store-bound, hashed, read-only tokens; catalog/order scopes; revoke immediately; no contact data in the app order API |
| Developer console | App creation/revocation and a durable local order-event outbox; HMAC event-signing utility |
| Partners | Development stores, merchant handover, automatic revocation of old memberships/app tokens, limited post-handover store identity |
| Support | Merchant tickets, priorities, support inbox, response/status; support accounts have no implicit catalog or order access |
| Access and ownership | Password login, expiring database-backed sessions, CSRF/origin checks, owner/admin/staff/collaborator/viewer permissions, membership grants/revocation, JSON export and activity records |
| AI | Optional local Ollama draft service with limited product context; no tools, automatic edits or customer details |
| Plans | Clearly labelled draft pricing cards and a saved plan selection; product capacity enforced; no charges or actual subscriptions |

The initial draft prices are ₹999 / ₹2,499 / ₹6,999 per month. These are **unvalidated proposals**, not live offers. Staff/location limits on the cards describe the research proposal and are not metered here.

## Try an end-to-end order

1. Enter the merchant demo and open **View store**.
2. Add an item to the bag and place a fictional COD order.
3. Return to `/admin`, open Orders, and inspect the saved order.
4. Mark it shipped, then delivered, then record COD collected. These are local operational confirmations; they do not book a courier or move money.
5. In Inventory, inspect the stock ledger. In Automations, inspect packing and stock review tasks.
6. Create another order and cancel it before shipment; stock is restored once.

The browser never supplies the authoritative price or tax. Repeating a checkout with the same idempotency key returns the same order; using that key for a different payload fails.

## Try partner handover

1. Enter Partner workspace and create a development store.
2. Open it, add products and customize a theme. Development storefronts are closed to public checkout.
3. Return to Partner workspace and hand it over to `client@demo.ind.local`. Type TRANSFER.
4. The previous agency membership and all existing private app tokens are revoked.
5. Enter Receiving merchant. It now owns that store and can open it or explicitly grant agency access again.

The setup command creates receiving accounts in normal mode. The current pilot has one account per partner organization; team organizations, invitations and verified handover acceptance remain future work. An agency does not receive fabricated commission balances.

## Private app API

Create a token in Developer console. Keep it on your integration server and use:

```http
GET /api/app/products
Authorization: Bearer YOUR_TOKEN
```

`catalog:read` grants the product endpoint; `orders:read` grants `GET /api/app/orders`. Tokens determine the tenant; a query parameter cannot choose another store. Only read APIs are exposed. Closing the token dialog removes the displayed plaintext token; the database retains a hash.

This is a private integration foundation, not an arbitrary-code plugin sandbox or public app marketplace. Allowlisted plugins execute trusted first-party handlers in the commerce transaction. Recorded events are not externally delivered. The HMAC helper is tested as a utility and is not a claim that a webhook delivery service is running.

## Optional local AI

Run Ollama on `127.0.0.1:11434`, install a model yourself, and set `COMMERCE_AI_MODEL` to that installed model before starting the commerce server. No model is downloaded, no paid API is provisioned, and no remote provider endpoint can be supplied through the UI.

AI receives a merchant prompt plus at most 20 product names/categories/stock counts. Treat prompts as potentially sensitive. Responses are bounded, time out after 30 seconds, render as text, and never apply changes. No model-running service was available during authoring; automated AI tests use a mock response.

## Validate

```sh
npm run check
npm test
```

Tests cover tenant isolation, role revocation, pricing/tax snapshots, replay protection, last-unit parallel HTTP checkouts, cancellation/restocking, state transitions, theme privacy/history, plugin behavior, token scopes, handover, support boundaries, persistence, HTTP auth/CSRF/Host boundaries and mocked AI limits.

A GitHub Actions workflow runs on Node 24 on Linux and Windows. Read actual check results before treating the pilot as validated. Local execution and visual browser verification were interrupted by workspace unavailability during this implementation; syntax parsing alone is not runtime verification.

## Architecture and production boundary

The commerce core is a dependency-free Node modular application with a SQLite adapter and a browser-native administration/storefront client. It has its own data model, theme settings, partner rules and app-token contracts. It does not use Shopify APIs or require Next.js.

The surrounding IndJS framework remains a separate, unfinished workstream. This first commerce application does **not** validate IndJS SSR, navigation, React themes or Next.js compatibility. An IndJS renderer can use the commerce services after its runtime passes the framework checks. Keeping commerce rules independent avoids tying stock and payments to renderer behavior.

SQLite is suitable for this local, single-server pilot. Production multi-tenant hosting needs PostgreSQL/migrations, operational recovery, tenant-isolation review, queues and delivery workers, identity hardening, provider sandbox certification and load testing. See [the release backlog](docs/RELEASE_BACKLOG.md).

All tax figures are arithmetic over a configured inclusive rate. No place-of-supply logic, GSTIN verification, invoice numbering, CGST/SGST/IGST split, e-invoice/e-way bill or compliance certification is implemented. No refunds, partial fulfilment, returns, variants, multi-location stock, coupons or online payment settlements are implemented yet.

Public HTML uses a Content Security Policy and escaped text, but these measures are not an independent security audit. There is no production security, uptime or conversion claim.
