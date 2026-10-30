# Images and visual page builder

Requires Node 24.13 or newer. Install with `npm ci`, then use `npm run demo` for fictional isolated data or the existing setup/start flow. Dependencies are pinned in package-lock.json.

## Product images

Open Products → Images for a product. Upload a static PNG, JPEG or WebP image, enter alternative text, choose gallery images and use Move up/Move down to set the cover and order. Click Save gallery to persist the selection. Uploading a file alone does not attach it to the product.

The library deduplicates identical files within each store. Editing alt text updates all product uses of that asset. Removing an image from a gallery does not delete its library copy. Deletion requires an explicit merchant confirmation and the server rejects deletion while any product gallery still references the image.

Limits: 2 MB per upload, 12 million pixels, 12,000 pixels per edge, static raster formats, eight images per product, 100 assets and 64 MB of stored original/derivative data per store. The pilot allows two processing jobs at a time. Images decode through pinned Sharp with strict input warnings and pixel/channel limits; unsupported/animated/invalid images are rejected. WebP outputs are generated at up to 320 and 960 pixels wide without enlargement; public derivatives omit embedded metadata.

Originals and derivatives are stored as SQLite BLOBs. Originals have no public route. The media API requires store catalog permissions, an authenticated session, same-origin mutation and CSRF. Public derivative URLs work only for images attached to an active product in an open demo/active storefront. Closed-store JavaScript previews use short-lived bearer URLs, limited to the store and current session and expiring after two minutes. Preview URLs stop working after logout or access revocation.

Storefront images use managed paths. Custom JavaScript output is sanitized to the exact store media path, and iframe policy grants only the configured origin for images; scripts, arbitrary remote images and data-fetch APIs remain restricted. Native details/summary elements provide image galleries inside custom JavaScript themes.

This is pilot storage: no external object storage, CDN, AVIF pipeline, background processing queue, malware service, original-media export or tested disaster recovery is included. Production needs resource isolation for native decoding, durable storage, backups, monitoring and review.

## Visual layouts

Open Online store → Start visual builder. This loads the JavaScript section starter into the unsaved draft; export custom source first if you want to retain it. Available starter sections are Hero banner, Product collection and Announcement.

Edit section text, change the product count, hide/show sections and use Move up/Move down to arrange the page. Render preview checks the unsaved configuration. Save draft stores it without changing the live storefront. Publish creates a new revision; restoring an earlier revision creates a new revision containing that saved configuration.

Layout JSON is included in package import/export and is passed as `layout` to the JavaScript render function. `renderSections(layout,registry,context)` dispatches registered JavaScript components. Existing code themes without a layout still render through their original code. Layouts require the JavaScript renderer. The SDK validates structural limits and JSON values, while custom section-specific schemas and block-editing controls remain future work.

## Verification on 30 October 2026

94 Node tests passed, including real QuickJS/WASM resource-isolation tests, raster image decoding/metadata stripping, media tenant boundaries, closed-store previews, HTTP protections, checkout, gateway handling and exact layout publish/rollback. 37 JavaScript modules passed syntax checks. npm audit reported zero known vulnerabilities at the time of validation.

Browser verification remains pending: the browser connector timed out. No production DNS, deployment, gateway account or live transaction was changed.

Official processor references: https://sharp.pixelplumbing.com/api-constructor/ and https://sharp.pixelplumbing.com/api-output/ .
