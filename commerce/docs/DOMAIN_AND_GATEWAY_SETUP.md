# Domain and gateway activation

## Exact target and current state

- Application: IND Commerce, repository `Rohitsharma6377/IND`, branch `codex/ind-commerce-pilot`.
- User-selected marketing hostname: **commerce.netcuriontechnology.com**.
- Read-only DNS check on 30 October 2026: parent domain uses `ns65.domaincontrol.com` and `ns66.domaincontrol.com` (GoDaddy); parent A record was `66.116.248.221`; no commerce CNAME was present.
- No registrar record, TLS certificate, live server process or production gateway was changed in this work. The workspace disconnected before those operations were available.
- The Node/SQLite pilot is separate from the current company website and its database. Do not replace the main site's ingress or application.

## Prepare the ingress before changing DNS

Inspect the target server, current virtual hosts, existing application containers, available memory, free loopback port 4311 and the exact code revision. Use a dedicated database volume and private environment for IND Commerce. Do not reuse another product's credentials or database.

The supplied Docker/Compose files are deployment templates; no image build or server deployment has been verified. The image binds to the internal container interface, with only host loopback port 4311 exposed. The app requires an explicit HTTPS public origin when binding beyond loopback and forbids fictional demo mode with live payments.

The HTTP-only Nginx snippet in `deploy/nginx-commerce.conf` is an ACME/bootstrap template. Validate the combined configuration before reloading. Obtain and configure a valid certificate for this hostname, redirect HTTP to HTTPS, and verify the new host reaches this application before enabling account signup or payment keys. Do not expose signup or credentials over the bootstrap HTTP route.

## Proposed DNS record

Only after the dedicated application/ingress is healthy on the intended host, add this record in the GoDaddy zone if that server is still the confirmed deployment target:

| Type | Name | Value | TTL |
| --- | --- | --- | --- |
| A | commerce | 66.116.248.221 | Provider default |

First read any existing A, AAAA and CNAME records for `commerce`. Do not overwrite an existing record without comparing its purpose. A CNAME to the parent domain is an alternative only when that is the intended ingress target; do not create both A and CNAME at the same name. No DNS mutation was performed here.

Configure `COMMERCE_PUBLIC_ORIGIN=https://commerce.netcuriontechnology.com`. The server validates Host and same-origin requests and uses Secure session cookies at the configured HTTPS host. It does not trust a caller-supplied forwarded host to select a tenant.

## Merchant custom domains

1. A store owner adds a hostname from **Domains & payments**.
2. The app generates a unique TXT challenge at `_ind-commerce.<hostname>` and displays the operator-configured CNAME/A target.
3. DNS verification checks the current TXT token and requires all returned IPv4 addresses to match the public platform ingress. Private/reserved addresses cannot pass.
4. The domain becomes **dns_verified**, which permits only the route challenge while activation is pending.
5. The ingress operator provisions the correct TLS hostname and routes it to this application.
6. HTTPS verification validates the certificate and a challenge response at a pinned, verified public IPv4 address. Only then does the domain become **active**.
7. Active custom hosts can serve their own storefront and public checkout APIs. They cannot use management routes or another store slug.

This pilot does not issue certificates, register domains, support arbitrary IPv6-only ingress, or automate registrar edits. Domain ownership can be reclaimed only by publishing the new store's unique TXT proof. Store handover disables inherited payment configuration and resets domain proofs.

## Razorpay test configuration

Use the merchant's own Razorpay account. No API key is included or provisioned. Keep live mode disabled until real provider sandbox validation and operational review are complete.

1. Set `COMMERCE_MASTER_KEY` to 32 cryptographically random bytes encoded as 64 hex characters or base64. Keep it in the server's private environment and back it up separately from the encrypted database. Never put it in source, command arguments, chat, or browser code.
2. The store owner enters the **test** key ID, API secret and a 32+ character webhook secret in **Domains & payments**. Secrets are encrypted with AES-256-GCM and bound to the store; configuration versions remain available to reconcile older attempts.
3. Configure a public HTTPS webhook URL: `https://commerce.netcuriontechnology.com/api/webhooks/razorpay/<store_id>`.
4. Enable `payment.captured` notifications and configure the merchant gateway's capture policy. Authorisation is not capture.
5. Place a sandbox order, verify the browser signature, server-fetched payment, raw signed webhook, exact order/amount/currency, duplicate replay and out-of-order notifications. Confirm the money state in the provider dashboard.
6. Check failed/uncertain creation and late capture after merchant cancellation. Do not blindly retry an uncertain provider-order creation. Stock remains reserved pending review; cancellation does not cancel a provider order. Late captures are marked for refund review without automatic fulfilment.
7. Only after those checks may an operator deliberately enable `COMMERCE_ALLOW_LIVE_PAYMENTS=1`. The server also requires a configured HTTPS public origin and demo mode disabled.

Card entry uses Razorpay's hosted checkout. IND forms do not collect card numbers. No captured browser message alone marks an order paid. Refund execution, settlements, automatic abandoned-order expiry, disputes and subscription billing remain unfinished.

## Verification and rollback boundary

Before promotion: run dependency installation, module checks, all tests, browser flows, provider sandbox checks, DNS/TLS checks, backup/restore drill and isolated ingress health checks. Save the exact deployed source revision and confirm the dedicated volume can be recovered.

Rollback this application's code/container and its own new ingress/DNS record only. Do not restore another application's database or replace sibling virtual hosts. Keep gateway configuration history and payment records for reconciliation.

## Sources used for adapter contracts

- [Razorpay integration](https://razorpay.com/docs/payments/server-integration/nodejs/integration-steps/)
- [Razorpay orders](https://razorpay.com/docs/api/orders/create/)
- [Razorpay payment fetch](https://razorpay.com/docs/api/payments/fetch-with-id/)
- [Razorpay webhook validation](https://razorpay.com/docs/webhooks/validate-test/)
- [LiquidJS security model](https://liquidjs.com/tutorials/security-model.html)
