# Shopify architecture research and IND Commerce implementation

Researched 30 October 2026. This is a comparison and implementation contract, not a parity or production-readiness claim.

## Verified Shopify behavior

| Area | Shopify behavior | IND direction |
| --- | --- | --- |
| Layout | JSON templates contain section instances, settings and an explicit render order; merchants can rearrange them | JSON presentation data plus standard JavaScript section renderers |
| Sections | Section schemas describe settings and blocks exposed in the theme editor | Typed section schemas and editor controls remain to be implemented |
| Custom data | Metafields extend an existing resource; metaobjects define reusable records; definitions supply types and validation | Tenant-scoped typed definitions, validated values and explicit storefront visibility |
| Images | image_url returns a CDN transformation URL, requires width or height and does not upscale beyond original dimensions | Managed uploads, immutable originals and pre-generated responsive derivatives |

Official sources:
- https://shopify.dev/docs/storefronts/themes/architecture/templates/json-templates
- https://shopify.dev/docs/storefronts/themes/architecture/sections/section-schema
- https://shopify.dev/docs/apps/build/custom-data
- https://shopify.dev/docs/api/liquid/filters/image_url

## Implemented in this change

`ind:theme` now exports `validateLayout(input)` and `renderSections(layout, registry, context)`. These exports are already available through the existing theme worker's SDK loader. Existing themes remain supported.

Layout version 1 supports at most 25 sections and 50 blocks per section, bounded JSON settings, unique explicit order lists, disabled sections and known JavaScript renderers. All instances must be included in their order list, including disabled ones. IND uses `blockOrder` rather than Shopify's `block_order`; this is our own format, not Shopify import compatibility.

Normalized layout objects are copied and recursively frozen. Section renderers must return the SDK's escaped `html` markup synchronously. JSON contains no expressions, imports, credentials or executable strings. These checks validate the layout shape and value budgets; per-section setting schemas are still needed.

Usage inside a JavaScript theme:

```js
import { html, renderSections } from 'ind:theme';
const layout = {
  version: 1,
  sections: { hero: { type: 'hero', settings: { title: 'Made for your everyday' } } },
  order: ['hero']
};
const registry = {
  hero: ({ section }) => html`<section><h1>${section.settings.title}</h1></section>`
};
export default context => renderSections(layout, registry, context);
```

The package loader imports JavaScript modules. Layout JSON now lives in `theme.layout`, is saved with revisions, survives import/export, and is passed into the public theme context. The visual starter uses `renderSections` with registered JavaScript section components. Custom theme modules can also embed their own data. Arbitrary JSON file imports and custom typed section schemas remain future work.

## Media status (updated 30 October 2026)

The pilot now uploads and strictly decodes static PNG/JPEG/WebP files, stores private originals and generated WebP derivatives in SQLite, and supports product gallery ordering and alt text. Public images require attachment to an active product in an open store. Closed-store previews use short-lived session-bound image URLs. JavaScript themes accept managed image URLs only on the exact approved store media path.

Production object storage, CDN caching, queued processing, AVIF, full media export and recovery drills remain unfinished. See [MEDIA_AND_VISUAL_BUILDER.md](MEDIA_AND_VISUAL_BUILDER.md) for limits and current behavior.
## Media implementation contract

1. Authenticate the merchant and check store permissions before allocating an upload. Derive the tenant from the authorized store; never trust a caller-supplied storage path.
2. Store private originals using generated IDs and immutable content hashes. Record store_id, asset_id, content_hash, MIME, byte count, dimensions, processing state, alt text, focal point and timestamps. Product-media links hold product_id, asset_id and position; enforce same-store ownership.
3. Apply request-byte, decoded-pixel, frame-count and per-store storage limits. Sniff and decode raster uploads; reject MIME mismatches, active SVG/HTML, decompression bombs and unsupported formats. Strip metadata from public derivatives.
4. Process asynchronously into bounded widths such as 320/640/960/1440, clamped to original size. Encode WebP/AVIF plus a compatible fallback after testing the selected processor. Upload completion is not equivalent to publish readiness.
5. Serve only ready, public derivatives through a configured media origin. Use immutable hash URLs and explicit width/height/srcset/sizes. Lazy-load offscreen images; prioritize the main product/hero image. Supply merchant-editable alt text and gallery order.
6. Extend worker sanitization and iframe CSP together for the exact approved media origin. Retain denial of arbitrary remote URLs, redirects, data fetches and custom image hosts. Test with actual browser isolation before release.
7. Use reference tracking and delayed garbage collection. Do not delete an asset referenced by a published theme revision or product. Keep restore and deletion policies explicit.

## Commerce data contract

Keep theme revisions, layout JSON and business records separate. Prices use integer minor currency units; orders snapshot purchase-time prices, taxes, names and addresses. A theme must not determine payment totals or stock authority.

Products need variants/options, variant inventory per location, collections and ordered media links. Custom fields need definitions (namespace, key, type, validation, owner and visibility), typed values and explicit public projection. Reusable content records need equivalent definition and reference validation. Theme context exposes only approved public fields, never full database rows, customer records, tokens or internal costs.

Use tenant-bound queries, transactional stock changes, idempotent mutations, audit records, versioned APIs and signed retryable webhooks. PostgreSQL production migrations, queues, recovery and operational testing remain release work.

## Prioritized delivery and acceptance

| Priority | Deliverable | Acceptance evidence |
| --- | --- | --- |
| P0 | Run existing expanded suite and actual QuickJS/browser isolation tests | Successful Node/QuickJS CI and cart-bridge/browser results |
| P1 | Media upload, processing and merchant library | Real image appears in storefront; cross-store attach rejected; corrupt/oversized inputs rejected; derivative dimensions verified |
| P1 | Visual section editor with revisioned JSON persistence | Reorder/settings survive reload, preview before publish, rollback restores exact layout |
| P2 | Variant catalog and typed custom fields | Same-store references, type validation, public/private projection and order snapshot tests |
| P2 | Search, collections and gallery | Pagination/filter accuracy, variant images, keyboard-accessible gallery and measured mobile performance |
| P3 | Migration and developer tools | Dry-run product/media import, validation report, CLI preview and versioned plugin contracts |

Proposed differentiation to validate with Indian merchants: GST and COD reconciliation in one workflow, transparent customization costs, multilingual operations and useful partner handover. Shopify already has mature themes, custom data, media and apps; these are baseline capabilities to match. No claim of being better is justified until merchant outcomes, performance, recovery and total costs are measured.

## Validation status

All 94 Node tests passed on Node 24.19.0, including actual QuickJS/WASM isolation, native raster decoding, HTTP media preview access, checkout/payment protections and layout save/publish/rollback. 37 JavaScript modules parse. npm audit reported zero known vulnerabilities with the pinned lockfile.

Browser QA remains pending because the browser connector timed out. Real provider sandbox, deployed TLS/DNS, container release, production storage and operational readiness remain release gates. Follow [DELIVERY_PLAN.md](DELIVERY_PLAN.md).
