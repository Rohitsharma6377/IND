import { html } from 'ind:theme';
import productCard from './product-card.js';

export default function render({ shop, settings, products }) {
  return html`
    <header class="theme-nav">
      <strong>${shop.name}</strong><a href="#products">Shop the collection</a>
    </header>
    <section class="theme-hero">
      <small>INDEPENDENT GOODS. EVERYDAY JOY.</small>
      <h1>${settings.title}</h1><p>${settings.subtitle}</p>
    </section>
    <section id="products" class="theme-collection">
      <h2>Thoughtfully chosen essentials</h2>
      <div class="theme-grid">${products.slice(0, 24).map(productCard)}</div>
    </section>
    <footer>${settings.announcement} · ${shop.name}</footer>
  `;
}
