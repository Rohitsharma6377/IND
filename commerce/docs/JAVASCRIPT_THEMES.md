# IND JavaScript themes

Themes use standard JavaScript ES modules and the IND theme SDK. There is no build step and no proprietary template syntax. The built-in themes remain available.

## Start in the editor

Open **Online store → Use JS starter**. Edit the files, choose **Render preview**, then **Save draft** and **Publish**. Adding/removing components and importing a package only changes the unsaved draft until it is saved. Publishing records a revision; supported revisions can be restored.

The source package is also in [examples/starter-theme](../examples/starter-theme). Import its `ind-theme.json` file into the editor. JavaScript source files use a virtual SDK import supplied by the renderer, so they are not standalone Node programs.

```js
import { html, money } from 'ind:theme';

export default function productCard(product) {
  return html`
    <article class="theme-product">
      <img src="${product.image_url}" alt="${product.name}">
      <small>${product.category}</small><h3>${product.name}</h3>
      <p>${money(product.price)}</p>
      ${product.available
        ? html`<button data-ind-add="${product.id}">Add to bag</button>`
        : html`<span>Sold out</span>`}
    </article>
  `;
}
```

The entry file `index.js` must default-export a synchronous function:

```js
import { html } from 'ind:theme';
import productCard from './product-card.js';

export default function render({ shop, settings, products }) {
  return html`
    <header class="theme-hero">
      <h1>${settings.title}</h1><p>${settings.subtitle}</p>
    </header>
    <div class="theme-grid">${products.map(productCard)}</div>
  `;
}
```

## Data and helpers

| Name | Contract |
| --- | --- |
| shop | Public name, slug and currency (INR) |
| settings | Headline, subheading, announcement and accent colour |
| products | Up to 100 public active products; id, name, category, description, price in paise, availability and a platform-generated data image URL |
| html | Tagged template helper; escapes interpolated values and supports nested component markup and arrays |
| money(paise) | Formats a nonnegative integer paise value as an INR price with Indian grouping |
| render return | An html result or HTML string; strings also pass through the output sanitizer |

Use interpolations for text or **quoted attribute values**. Keep tag names, attribute names and styles static. The helper is not a general HTML parser. Do not join component arrays into strings; interpolate the array directly to preserve component markup. Values such as false, null and undefined render as empty text.

```js
html`<h3>${product.name}</h3>`; // escaped text
html`<img src="${product.image_url}" alt="${product.name}">`;
html`<div>${products.map(productCard)}</div>`; // component array
html`<p style="color:#246b50">${settings.title}</p>`;
html`<button data-ind-add="${product.id}">Add to bag</button>`;
```

A data-ind-add button requests that a known product be added to the parent cart. The platform owns cart totals, checkout, payment controls, customer data and order verification.

## Package format

```json
{
  "schema_version": 2,
  "language": "javascript",
  "entry": "index.js",
  "sdk_version": 1,
  "settings": {
    "template": "market",
    "accent": "#246b50",
    "title": "Our collection",
    "subtitle": "",
    "announcement": ""
  },
  "files": {
    "index.js": "import { html } from 'ind:theme'; export default ({ shop }) => html`<h1>${shop.name}</h1>`;"
  }
}
```

An editor import accepts this format or a raw filename-to-source map. The source map must contain index.js, with 1–10 simple .js/.mjs filenames and no directories. A source file is limited to 50,000 characters; combined source is limited to 100,000 characters. Import payloads are limited to 256 KB. Remote URLs, Node/npm modules, traversal, query strings and implicit extension resolution are not supported. Import components with their complete relative filename.

## Execution boundary

The host loads source as text into **QuickJS compiled to WebAssembly** through pinned quickjs-emscripten 0.32.0. Merchant modules are never imported into Node or passed to Node eval/vm. Each render starts a new engine inside a bounded worker, receives a frozen copy of public data and loads modules only from its package or ind:theme.

The runtime has no process, require, Buffer, filesystem, network, DOM or timers. The worker's own filesystem reads load only the platform SDK implementation and the installed WASM engine. Merchant JavaScript cannot invoke those reads. Async render functions and top-level await are unsupported; no promise job queue is pumped.

Limits in source are: four concurrent renders per process, 8 MiB engine heap, 256 KiB engine stack, a 250 ms interrupt deadline after engine initialization and a five-second parent worker deadline including startup. Output is capped at 256 KB in UTF-8. These are implementation limits, **not a completed resource-abuse audit**. Validate them on every supported deployment target.

Output passes through an HTML/style allowlist. Scripts, event handlers, forms, frames, remote images and external links are removed or rewritten. Inline styles support the documented renderer allowlist; no custom browser scripts or arbitrary stylesheets are enabled. The frame uses an opaque sandbox, a nonce-bound platform bridge and a network-blocking CSP. The parent accepts only known product IDs and bounded height messages from its own frame.

This is a synchronous storefront rendering SDK. It does not run npm apps, React/JSX, browser event handlers or payment code. Add interactive platform capabilities through reviewed APIs and explicit bridge contracts.

## Existing themes

No database rewrite or source conversion is performed. Historical source remains in saved drafts and version history. The editor can export original unsupported source for reference. Use the JavaScript starter or import a new package to replace it. Unsupported renderer revisions cannot be published or restored, and their custom frame is unavailable. Existing built-in settings remain readable. There is no claim of automatic source-language compatibility.

## Verification still required

Current available-checker results: 30 source/example modules parse and 155 pure assertions pass, including six executed SDK/import test callbacks and starter rendering. These checks did not execute QuickJS/WASM. The real QuickJS worker tests, Node/SQLite/HTTP suite, dependency install/audit, lockfile, browser preview/cart bridge, accessibility and deployment checks must pass before release. The local execution workspace disconnected during this change; authored runtime tests are not reported as passed.

Engine/API references: [QuickJS package](https://www.npmjs.com/package/quickjs-emscripten/v/0.32.0) and [upstream module and runtime documentation](https://github.com/justjake/quickjs-emscripten/tree/v0.32.0).
