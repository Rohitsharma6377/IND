import { html, money } from 'ind:theme';

export default function productCard(product) {
  return html`
    <article class="theme-product">
      <img src="${product.image_url}" alt="${product.images?.[0]?.alt ?? product.name}">
      ${product.images?.length>1 ? html`<details><summary>View gallery</summary>${product.images.map(image=>html`<img src="${image.url}" alt="${image.alt}" width="${image.width}" height="${image.height}" loading="lazy">`)}</details>` : null}
      <small>${product.category}</small><h3>${product.name}</h3>
      <p>${money(product.price)}</p>
      ${product.available
        ? html`<button data-ind-add="${product.id}">Add to bag</button>`
        : html`<span>Sold out</span>`}
    </article>
  `;
}