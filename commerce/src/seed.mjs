import { secret } from './contracts.mjs';
export function seedDemo(c) {
  if (c.get('SELECT id FROM users LIMIT 1')) return;
  c.tx(() => {
    const owner = c.user({ name: 'Aarav Mehta', email: 'merchant@demo.ind.local', password: secret() });
    const partner = c.user({ name: 'Netcurion Studio', email: 'partner@demo.ind.local', password: secret(), kind: 'partner' });
    c.user({ name: 'IND Support', email: 'support@demo.ind.local', password: secret(), kind: 'support' });
    c.user({ name: 'New Merchant', email: 'client@demo.ind.local', password: secret() });
    const store = c.newStore(owner, { name: 'Banyan & Co.', slug: 'banyan' }, 'demo');
    const specs = [
      ['Everyday canvas tote','BAG-001','Carry',89900,38,'#d8c7a1','A sturdy cotton companion for market mornings and everyday adventures.'],
      ['Stoneware coffee cup','CUP-002','Home',64900,21,'#c58161','Hand-finished stoneware with a warm, tactile glaze.'],
      ['Insulated water bottle','BTL-003','Everyday',119900,5,'#648a79','A reusable stainless steel bottle made to go wherever you do.'],
      ['Linen cushion cover','LIN-004','Home',79900,14,'#b5b9a1','A relaxed linen cover that brings a little calm to your space.'],
      ['Desk organiser','DSK-005','Work',149900,9,'#bd916e','Keep your everyday essentials beautifully in order.'],
      ['Weekend notebook','NTB-006','Work',39900,42,'#8f9db0','Room for small ideas, big plans and everything in between.'],
      ['Terracotta planter','PLN-007','Home',54900,4,'#b66e50','A simple, earthy home for your favourite green companion.'],
      ['Cotton hand towel','TWL-008','Home',34900,28,'#d4ba86','Soft, absorbent cotton for a thoughtful everyday ritual.'],
    ];
    const products = specs.map(([name,sku,category,price,stock,colour,description]) => c.createProduct(owner, store.id, { name,sku,category,price,stock:stock + 20,colour,description }));
    c.plugin(owner, store.id, 'stock-watch', true);
    c.plugin(owner, store.id, 'packing-note', true);
    const names = ['Diya Shah','Kabir Rao','Meera Nair','Rohan Singh','Ananya Das','Ishaan Patel','Tara Joshi'];
    for (let n=0;n<14;n++) {
      const p = products[n % products.length];
      const result = c.checkout('banyan', { customer: names[n % names.length], email: 'sample' + n + '@example.test', phone: '9999900000', address: 'Sample address, Bengaluru 560001 (demo data)', items: [{ product_id: p.id, quantity: 1 + n % 2 }] }, 'demo-checkout-' + String(n).padStart(8,'0'));
      const timestamp = new Date(Date.now() - (13-n) * 18 * 60 * 60 * 1000).toISOString();
      c.run('UPDATE orders SET created_at=? WHERE id=?', timestamp, result.id);
      if (n < 10) { c.orderAction(owner, store.id, result.id, 'ship'); c.orderAction(owner, store.id, result.id, 'deliver'); c.orderAction(owner, store.id, result.id, 'collect'); }
      else if (n === 10) c.orderAction(owner, store.id, result.id, 'ship');
    }
    // Opening stock remains a ledger entry; sample adjustments are recorded too.
    for (let n=0;n<products.length;n++) {
      const p = c.get('SELECT stock FROM products WHERE id=?', products[n].id), desired = specs[n][4];
      if (p.stock !== desired) c.adjustStock(owner, store.id, products[n].id, { delta: desired-p.stock, reason: 'Demo opening balance adjustment' });
    }
    c.task(store.id, 'Review low stock', 'Two sample products have five units or fewer. Add stock from Inventory.');
    c.createTicket(owner, store.id, { subject: 'Getting my store ready', body: 'This sample ticket shows how merchant support works. All records in this workspace are fictional.', priority: 'normal' });
    const dev = c.createPartnerStore(partner, { name: 'Marigold Living', slug: 'marigold-living' });
    c.createProduct(partner, dev.id, { name:'Handwoven basket',sku:'MG-001',category:'Home',price:129900,stock:12,colour:'#b99063',description:'A sample catalog for a partner development store.' });
    c.createPartnerStore(partner, { name: 'Circuit Supply', slug: 'circuit-supply' });
    c.grant(owner, store.id, { email: partner.email, role: 'collaborator' });
  });
}
