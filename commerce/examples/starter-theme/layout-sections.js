import { html } from 'ind:theme';
import productCard from './product-card.js';
export default {
 hero: ({section}) => html`<section class="theme-hero"><h1>${section.settings.title}</h1><p>${section.settings.body}</p></section>`,
 collection: ({section,products}) => html`<section class="theme-collection" id="products"><h2>${section.settings.title}</h2><div class="theme-grid">${products.slice(0,Math.min(100,Math.max(1,Number(section.settings.limit)||12))).map(productCard)}</div></section>`,
 announcement: ({section}) => html`<section class="theme-hero"><p>${section.settings.text}</p></section>`
};
