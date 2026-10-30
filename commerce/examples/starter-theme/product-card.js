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
