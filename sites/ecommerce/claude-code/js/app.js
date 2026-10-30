(() => {
  'use strict';

  const FREE_SHIP_MIN = 100;
  const STANDARD_SHIP = 6;
  const EXPRESS_SHIP = 15;
  const TAX_RATE = 0.08;
  const MAX_QTY = 10;
  const PROMOS = {
    WELCOME10: { label: '10% off your order', pct: 10 },
    FREESHIP: { label: 'Free standard shipping', freeShip: true },
  };
  const STATES = ['AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];
  const SORTS = {
    featured: 'Featured',
    newest: 'Newest',
    'price-asc': 'Price: low to high',
    'price-desc': 'Price: high to low',
  };

  const byId = Object.fromEntries(PRODUCTS.map(p => [p.id, p]));
  const catById = Object.fromEntries(CATEGORIES.map(c => [c.id, c]));
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const main = $('#main');

  // ---------- Storage ----------
  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage unavailable */ }
    },
  };

  let cart = store.get('halden-cart', []).filter(l => byId[l.id] && l.qty > 0);
  let promo = store.get('halden-promo', null);
  if (promo && !PROMOS[promo]) promo = null;

  // ---------- Helpers ----------
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const money = n => '$' + n.toFixed(2).replace(/\.00$/, '');
  const money2 = n => '$' + n.toFixed(2);
  const img = id => `assets/img/${id}.jpg`;
  const sizeLabel = s => s === 'One Size' ? s : 'Size ' + s;
  const icon = {
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    bag: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
    truck: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/></svg>',
    ret: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h11a5 5 0 0 1 0 10H8"/><path d="m8 5-4 4 4 4"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15"/><path d="M5 19 13 11"/></svg>',
    info: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
  };

  function priceHtml(p) {
    return p.compareAt
      ? `<span class="now-sale">${money(p.price)}</span><s>${money(p.compareAt)}</s>`
      : money(p.price);
  }

  function badgeHtml(p) {
    if (!p.badge) return '';
    const cls = p.badge === 'Sale' ? 'badge badge-sale' : p.badge === 'New' ? 'badge badge-new' : 'badge';
    return `<span class="${cls}">${esc(p.badge)}</span>`;
  }

  function cardHtml(p) {
    const sizes = p.sizes.map(s => {
      const out = p.soldOut.includes(s);
      return `<button type="button" data-action="quick-add" data-id="${p.id}" data-size="${esc(s)}" ${out ? 'disabled aria-label="' + esc(s) + ', sold out"' : 'aria-label="Add ' + esc(p.name) + ', size ' + esc(s) + ', to bag"'}>${esc(s)}</button>`;
    }).join('');
    return `
      <article class="card">
        <a class="card-link" href="#/product/${p.id}">
          <div class="card-media">
            ${badgeHtml(p)}
            <img src="${img(p.id)}" alt="${esc(p.name)} in ${esc(p.color)}" width="800" height="1000" loading="lazy">
          </div>
          <div class="card-info">
            <div>
              <h3>${esc(p.name)}</h3>
              <p class="meta">${esc(p.color)}</p>
            </div>
            <p class="price">${priceHtml(p)}</p>
          </div>
        </a>
        <div class="quick-add">
          <p>Quick add</p>
          <div class="quick-sizes">${sizes}</div>
        </div>
      </article>`;
  }

  function lineKey(id, size) { return id + '::' + size; }

  // ---------- Cart ----------
  function cartCount() { return cart.reduce((n, l) => n + l.qty, 0); }
  function cartSubtotal() { return cart.reduce((n, l) => n + byId[l.id].price * l.qty, 0); }

  function totals(shipMethod = 'standard') {
    const subtotal = cartSubtotal();
    const p = promo && PROMOS[promo];
    const discount = p && p.pct ? Math.round(subtotal * p.pct) / 100 : 0;
    const afterDiscount = subtotal - discount;
    let shipping;
    if (shipMethod === 'express') shipping = EXPRESS_SHIP;
    else shipping = (afterDiscount >= FREE_SHIP_MIN || (p && p.freeShip)) ? 0 : STANDARD_SHIP;
    if (!cart.length) shipping = 0;
    const tax = Math.round(afterDiscount * TAX_RATE * 100) / 100;
    return { subtotal, discount, shipping, tax, total: afterDiscount + shipping + tax };
  }

  function saveCart() {
    store.set('halden-cart', cart);
    store.set('halden-promo', promo);
    updateCartBadge();
    if (!$('#cart-drawer').hidden) renderCart();
    if (currentRoute().path === '/checkout') refreshSummary();
  }

  function addToCart(id, size, qty = 1) {
    const p = byId[id];
    if (!p || !p.sizes.includes(size) || p.soldOut.includes(size)) return false;
    const line = cart.find(l => l.id === id && l.size === size);
    if (line) {
      if (line.qty >= MAX_QTY) { toast(`Limit of ${MAX_QTY} per item`); return false; }
      line.qty = Math.min(MAX_QTY, line.qty + qty);
    } else {
      cart.push({ id, size, qty: Math.min(MAX_QTY, qty) });
    }
    saveCart();
    const badge = $('.cart-count');
    badge.classList.remove('bump'); void badge.offsetWidth; badge.classList.add('bump');
    return true;
  }

  function setQty(key, qty) {
    const line = cart.find(l => lineKey(l.id, l.size) === key);
    if (!line) return;
    if (qty <= 0) cart = cart.filter(l => l !== line);
    else line.qty = Math.min(MAX_QTY, qty);
    saveCart();
  }

  function updateCartBadge() {
    const n = cartCount();
    const badge = $('.cart-count');
    badge.textContent = n;
    badge.hidden = n === 0;
    $('.cart-btn').setAttribute('aria-label', `Open bag, ${n} item${n === 1 ? '' : 's'}`);
  }

  function shipMeterHtml(subtotalAfterDiscount) {
    const left = FREE_SHIP_MIN - subtotalAfterDiscount;
    const pct = Math.min(100, (subtotalAfterDiscount / FREE_SHIP_MIN) * 100);
    const msg = left > 0
      ? `You're <strong>${money2(left)}</strong> away from free shipping`
      : `<strong>You've unlocked free shipping.</strong>`;
    return `<div class="ship-meter">${msg}<div class="meter" aria-hidden="true"><i style="width:${pct}%"></i></div></div>`;
  }

  function renderCart() {
    const body = $('[data-cart-body]');
    const foot = $('[data-cart-foot]');
    $('#cart-title').textContent = cart.length ? `Your bag (${cartCount()})` : 'Your bag';
    if (!cart.length) {
      body.innerHTML = `
        <div class="cart-empty">
          ${icon.bag}
          <h3>Your bag is empty</h3>
          <p>Find something you'll wear on repeat.</p>
          <a href="#/shop" class="btn btn-dark" data-action="close-cart">Start shopping</a>
        </div>`;
      foot.hidden = true;
      return;
    }
    const t = totals();
    body.innerHTML = shipMeterHtml(t.subtotal - t.discount) + cart.map(l => {
      const p = byId[l.id];
      const key = lineKey(l.id, l.size);
      return `
        <div class="line-item">
          <a href="#/product/${p.id}" data-action="close-cart" tabindex="-1"><img src="${img(p.id)}" alt="" width="84" height="105"></a>
          <div>
            <div class="line-top">
              <a href="#/product/${p.id}" data-action="close-cart">${esc(p.name)}</a>
              <span class="price">${money(p.price * l.qty)}</span>
            </div>
            <p class="line-meta">${esc(p.color)} &middot; ${esc(sizeLabel(l.size))}</p>
            <div class="line-bottom">
              <div class="stepper sm" role="group" aria-label="Quantity for ${esc(p.name)}">
                <button type="button" data-action="qty" data-key="${esc(key)}" data-delta="-1" aria-label="Decrease quantity">&minus;</button>
                <span aria-live="polite">${l.qty}</span>
                <button type="button" data-action="qty" data-key="${esc(key)}" data-delta="1" aria-label="Increase quantity" ${l.qty >= MAX_QTY ? 'disabled' : ''}>+</button>
              </div>
              <button type="button" class="link-btn" data-action="remove" data-key="${esc(key)}">Remove</button>
            </div>
          </div>
        </div>`;
    }).join('');
    foot.hidden = false;
    foot.innerHTML = `
      <div class="sum-row"><span>Subtotal</span><span>${money2(t.subtotal)}</span></div>
      ${t.discount ? `<div class="sum-row discount"><span>Discount (${esc(promo)})</span><span>&minus;${money2(t.discount)}</span></div>` : ''}
      <div class="sum-row"><span>Shipping</span><span>${t.shipping === 0 ? 'Free' : money2(t.shipping)}</span></div>
      <div class="sum-row total"><span>Estimated total</span><span>${money2(t.subtotal - t.discount + t.shipping)}</span></div>
      <a href="#/checkout" class="btn btn-dark btn-block" data-action="close-cart">Checkout</a>
      <p class="fine">Taxes calculated at checkout</p>`;
  }

  // ---------- Overlays ----------
  let lastFocus = null;
  function openOverlay(el, focusSel) {
    lastFocus = document.activeElement;
    el.hidden = false;
    document.body.classList.add('locked');
    const target = $(focusSel, el) || el.querySelector('button, a, input');
    if (target) target.focus();
  }
  function closeOverlay(el) {
    if (el.hidden) return;
    el.hidden = true;
    if (!$$('.mobile-nav, .cart-drawer, .modal').some(o => !o.hidden)) document.body.classList.remove('locked');
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
  }
  function openCart() { renderCart(); openOverlay($('#cart-drawer'), '.drawer-head .icon-btn'); }
  function closeCart() { closeOverlay($('#cart-drawer')); }

  function openModal(html) {
    $('[data-modal-body]').innerHTML = html;
    openOverlay($('#modal'), '.modal-close');
  }

  const INFO = {
    shipping: `
      <h2 id="modal-title">Shipping</h2>
      <p>Standard shipping is free on orders over ${money(FREE_SHIP_MIN)} and ${money(STANDARD_SHIP)} otherwise. It arrives in 5 to 7 business days.</p>
      <p>Express shipping is ${money(EXPRESS_SHIP)} and arrives in 2 business days.</p>
      <p>We currently ship to addresses in the United States.</p>`,
    returns: `
      <h2 id="modal-title">Returns</h2>
      <p>Return unworn items with tags attached within 30 days of delivery for a full refund. Returns are free.</p>
      <p>Sale items can be exchanged for a different size.</p>`,
    sizing: `
      <h2 id="modal-title">Size guide</h2>
      <p>Measurements are body measurements in inches. Between sizes? Size up for a relaxed fit.</p>
      <table class="size-table">
        <thead><tr><th>Size</th><th>Chest</th><th>Waist</th><th>Hip</th></tr></thead>
        <tbody>
          <tr><td>XS</td><td>32–34</td><td>25–27</td><td>34–36</td></tr>
          <tr><td>S</td><td>35–37</td><td>28–30</td><td>37–39</td></tr>
          <tr><td>M</td><td>38–40</td><td>31–33</td><td>40–42</td></tr>
          <tr><td>L</td><td>41–43</td><td>34–36</td><td>43–45</td></tr>
          <tr><td>XL</td><td>44–46</td><td>37–39</td><td>46–48</td></tr>
        </tbody>
      </table>
      <p style="margin-top:14px">Denim is sized by waist in inches (26–36). Shoes use US men's sizing.</p>`,
  };

  let toastTimer;
  function toast(msg) {
    const el = $('.toast');
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { el.hidden = true; }, 2600);
  }

  // ---------- Router ----------
  function currentRoute() {
    const raw = location.hash.replace(/^#/, '') || '/';
    const [path, query = ''] = raw.split('?');
    return { path: path || '/', params: new URLSearchParams(query) };
  }

  function setActiveNav(path, params) {
    let key = null;
    if (path === '/shop') key = params.get('sale') ? 'sale' : (params.get('cat') || 'all');
    $$('.main-nav a').forEach(a => a.classList.toggle('active', a.dataset.nav === key));
  }

  function route() {
    const { path, params } = currentRoute();
    closeOverlay($('#mobile-nav'));
    closeOverlay($('#modal'));
    setActiveNav(path, params);
    const product = path.match(/^\/product\/([\w-]+)$/);
    const order = path.match(/^\/order\/([\w-]+)$/);
    if (path === '/') renderHome();
    else if (path === '/shop') renderShop(params);
    else if (product) renderProduct(product[1]);
    else if (path === '/checkout') renderCheckout();
    else if (order) renderOrder(order[1]);
    else renderNotFound();
    window.scrollTo(0, 0);
  }

  // ---------- Pages ----------
  function renderHome() {
    document.title = 'Halden | Everyday Clothing';
    const featured = ['scarlet-maxi', 'moto-jacket', 'essential-tee', 'selvedge-jean', 'hoodie', 'oxford-shirt', 'backpack', 'poppy-dress'].map(id => byId[id]);
    const newest = [...PRODUCTS].sort((a, b) => b.added - a.added).slice(0, 4);
    main.innerHTML = `
      <section class="hero">
        <div class="hero-media" role="img" aria-label="Clothing hanging on a rail in a bright studio">
          <div class="hero-copy">
            <p class="eyebrow">The Autumn Edit</p>
            <h1>Clothes you'll reach for first.</h1>
            <p>Heavyweight tees, honest denim and coats built for real weather. Designed to be worn hard and kept for years.</p>
            <div class="hero-ctas">
              <a href="#/shop" class="btn btn-light">Shop the collection</a>
              <a href="#/shop?sort=newest" class="btn btn-ghost-light">New arrivals</a>
            </div>
          </div>
        </div>
      </section>
      <div class="perks">
        <div class="perk">${icon.truck}<div><strong>Free shipping over ${money(FREE_SHIP_MIN)}</strong>Delivered in 5 to 7 days</div></div>
        <div class="perk">${icon.ret}<div><strong>Free 30-day returns</strong>No questions asked</div></div>
        <div class="perk">${icon.leaf}<div><strong>Better materials</strong>Organic and recycled fibers</div></div>
      </div>
      <section class="section" aria-labelledby="cat-h">
        <div class="section-head"><h2 id="cat-h">Shop by category</h2><a href="#/shop">View all</a></div>
        <div class="cat-grid">
          ${CATEGORIES.map(c => `
            <a class="cat-tile" href="#/shop?cat=${c.id}">
              <img src="${img(c.img)}" alt="" width="800" height="1000" loading="lazy">
              <span><strong>${esc(c.name)}</strong><small>${esc(c.blurb)}</small></span>
            </a>`).join('')}
        </div>
      </section>
      <section class="section" aria-labelledby="best-h">
        <div class="section-head"><h2 id="best-h">Bestsellers and staples</h2><a href="#/shop">Shop all</a></div>
        <div class="product-grid">${featured.map(cardHtml).join('')}</div>
      </section>
      <section class="section">
        <div class="story">
          <div class="story-img" role="img" aria-label="Coats and knitwear on rails in the Halden shop"></div>
          <div class="story-copy">
            <p class="eyebrow">Made to last</p>
            <h2>Fewer, better things.</h2>
            <p>We make a small range in good fabrics and keep it in stock season after season, so the tee you love is still here next year.</p>
            <a href="#/shop?sale=1" class="btn btn-light">Shop the sale</a>
          </div>
        </div>
      </section>
      <section class="section" aria-labelledby="new-h">
        <div class="section-head"><h2 id="new-h">Just landed</h2><a href="#/shop?sort=newest">See what's new</a></div>
        <div class="product-grid">${newest.map(cardHtml).join('')}</div>
      </section>`;
  }

  function filterProducts(params) {
    const cat = params.get('cat');
    const sale = params.get('sale');
    const size = params.get('size');
    // Every word must appear somewhere; a trailing "s" is dropped so "jeans" finds "jean".
    const words = (params.get('q') || '').toLowerCase().split(/\s+/).filter(Boolean)
      .map(w => w.length > 3 && w.endsWith('s') && !w.endsWith('ss') ? w.slice(0, -1) : w);
    const sort = params.get('sort') || 'featured';
    let list = PRODUCTS.filter(p => {
      const hay = [p.name, p.color, p.desc, p.details.join(' '), catById[p.cat].name].join(' ').toLowerCase();
      return (!cat || p.cat === cat) &&
        (!sale || p.compareAt) &&
        (!size || (p.sizes.includes(size) && !p.soldOut.includes(size))) &&
        words.every(w => hay.includes(w));
    });
    if (sort === 'newest') list = [...list].sort((a, b) => b.added - a.added);
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }

  function shopTitle(params) {
    if (params.get('sale')) return 'Sale';
    const cat = catById[params.get('cat')];
    if (cat) return cat.name;
    if (params.get('q')) return 'Search results';
    return 'Shop all';
  }

  function renderShop(params) {
    const title = shopTitle(params);
    document.title = `${title} | Halden`;
    main.innerHTML = `
      <div class="shop-head">
        <nav class="crumbs" aria-label="Breadcrumb"><a href="#/">Home</a> / <span data-crumb>${esc(title)}</span></nav>
        <h1 data-shop-title>${esc(title)}</h1>
      </div>
      <div class="toolbar">
        <div class="chips" role="group" aria-label="Category">
          <button type="button" class="chip" data-filter="cat" data-value="">All</button>
          ${CATEGORIES.map(c => `<button type="button" class="chip" data-filter="cat" data-value="${c.id}">${esc(c.name)}</button>`).join('')}
          <button type="button" class="chip" data-filter="sale" data-value="1">On sale</button>
        </div>
        <div class="toolbar-row">
          <p class="count" aria-live="polite" data-count></p>
          <div class="size-filter" role="group" aria-label="Filter by size">
            <span class="label">Size</span>
            ${['XS', 'S', 'M', 'L', 'XL'].map(s => `<button type="button" class="chip" data-filter="size" data-value="${s}">${s}</button>`).join('')}
          </div>
          <label class="sr-only" for="shop-q">Search within results</label>
          <input id="shop-q" class="filter-search" type="search" placeholder="Search" value="${esc(params.get('q') || '')}" data-shop-search>
          <label class="sr-only" for="shop-sort">Sort by</label>
          <select id="shop-sort" class="select" data-shop-sort>
            ${Object.entries(SORTS).map(([v, l]) => `<option value="${v}">${l}</option>`).join('')}
          </select>
        </div>
        <div class="active-filters" data-active-filters></div>
      </div>
      <div class="shop-results" data-results></div>`;
    updateShop(params, false);
  }

  function updateShop(params, push = true) {
    if (push) {
      const qs = params.toString();
      history.replaceState(null, '', '#/shop' + (qs ? '?' + qs : ''));
      setActiveNav('/shop', params);
      const title = shopTitle(params);
      $('[data-shop-title]').textContent = title;
      $('[data-crumb]').textContent = title;
      document.title = `${title} | Halden`;
    }
    $$('[data-filter]').forEach(b => {
      const key = b.dataset.filter;
      const val = params.get(key) || '';
      const pressed = key === 'cat' ? (val === b.dataset.value && !(b.dataset.value === '' && params.get('sale'))) : val === b.dataset.value;
      b.setAttribute('aria-pressed', String(pressed));
    });
    $('[data-shop-sort]').value = SORTS[params.get('sort')] ? params.get('sort') : 'featured';
    // On narrow screens the category chips scroll sideways; keep the selected one in view.
    const chips = $('.chips');
    const on = $('.chips [aria-pressed="true"]');
    if (on && (on.offsetLeft < chips.scrollLeft || on.offsetLeft + on.offsetWidth > chips.scrollLeft + chips.clientWidth)) {
      chips.scrollLeft = on.offsetLeft - 16;
    }

    const list = filterProducts(params);
    $('[data-count]').textContent = `${list.length} item${list.length === 1 ? '' : 's'}`;

    const pills = [];
    if (params.get('q')) pills.push(['q', `“${params.get('q')}”`]);
    if (params.get('size')) pills.push(['size', `Size ${params.get('size')}`]);
    $('[data-active-filters]').innerHTML = pills.map(([k, l]) =>
      `<button type="button" class="pill" data-action="clear-filter" data-key="${k}" aria-label="Remove filter ${esc(l)}">${esc(l)} ${icon.close}</button>`).join('');
    $('[data-active-filters]').hidden = !pills.length;

    $('[data-results]').innerHTML = list.length
      ? `<div class="product-grid">${list.map(cardHtml).join('')}</div>`
      : `<div class="empty">
           <h2>Nothing matches that yet</h2>
           <p>Try a different size or search term, or clear your filters.</p>
           <button type="button" class="btn btn-dark" data-action="reset-filters">Clear all filters</button>
         </div>`;
  }

  function renderProduct(id) {
    const p = byId[id];
    if (!p) return renderNotFound();
    const cat = catById[p.cat];
    document.title = `${p.name} | Halden`;
    const single = p.sizes.length === 1;
    const save = p.compareAt ? Math.round((1 - p.price / p.compareAt) * 100) : 0;
    const related = PRODUCTS.filter(x => x.cat === p.cat && x.id !== p.id).slice(0, 4);
    main.innerHTML = `
      <div class="pdp" data-pdp="${p.id}">
        <nav class="crumbs" aria-label="Breadcrumb"><a href="#/">Home</a> / <a href="#/shop?cat=${cat.id}">${esc(cat.name)}</a> / <span>${esc(p.name)}</span></nav>
        <div class="pdp-grid">
          <div class="pdp-media">
            ${badgeHtml(p)}
            <img src="${img(p.id)}" alt="${esc(p.name)} in ${esc(p.color)}" width="800" height="1000">
          </div>
          <div class="pdp-info">
            <h1>${esc(p.name)}</h1>
            <p class="pdp-price price" style="text-align:left">${priceHtml(p)}${save ? `<span class="save">Save ${save}%</span>` : ''}</p>
            <p class="pdp-desc">${esc(p.desc)}</p>
            <p class="field-label" style="justify-content:flex-start;gap:8px">Color <span>${esc(p.color)}</span></p>
            <div class="field-label" style="margin-top:20px">
              <span style="font-weight:600;color:var(--ink)" id="size-label">Size${single ? '' : ' <span data-size-chosen style="font-weight:400;color:var(--ink-2)"></span>'}</span>
              ${single ? '' : '<button type="button" class="link-btn" data-action="info" data-info="sizing">Size guide</button>'}
            </div>
            <div class="size-grid" role="group" aria-labelledby="size-label" data-size-grid>
              ${p.sizes.map(s => {
                const out = p.soldOut.includes(s);
                return `<button type="button" class="size-opt" data-action="pick-size" data-size="${esc(s)}" aria-pressed="${single ? 'true' : 'false'}" ${out ? `disabled aria-label="${esc(s)}, sold out"` : ''}>${esc(s)}</button>`;
              }).join('')}
            </div>
            <p class="field-error" data-size-error aria-live="assertive"></p>
            <div class="buy-row">
              <div class="stepper" role="group" aria-label="Quantity">
                <button type="button" data-action="pdp-qty" data-delta="-1" aria-label="Decrease quantity" disabled>&minus;</button>
                <output data-pdp-qty aria-live="polite">1</output>
                <button type="button" data-action="pdp-qty" data-delta="1" aria-label="Increase quantity">+</button>
              </div>
              <button type="button" class="btn btn-dark" data-action="add-to-cart">Add to bag &middot; <span data-pdp-total>${money(p.price)}</span></button>
            </div>
            <div class="pdp-notes">
              <div>${icon.truck}Free shipping over ${money(FREE_SHIP_MIN)}. Ships in 1 to 2 days.</div>
              <div>${icon.ret}Free returns within 30 days.</div>
            </div>
            <details class="acc" open>
              <summary>Details</summary>
              <ul>${p.details.map(d => `<li>${esc(d)}</li>`).join('')}</ul>
            </details>
            <details class="acc">
              <summary>Shipping and returns</summary>
              <p>Standard shipping is free over ${money(FREE_SHIP_MIN)}, otherwise ${money(STANDARD_SHIP)}. Express is ${money(EXPRESS_SHIP)}. Return unworn items within 30 days for a full refund.</p>
            </details>
          </div>
        </div>
      </div>
      ${related.length ? `
      <section class="section" aria-labelledby="rel-h">
        <div class="section-head"><h2 id="rel-h">You might also like</h2><a href="#/shop?cat=${cat.id}">More ${esc(cat.name.toLowerCase())}</a></div>
        <div class="product-grid">${related.map(cardHtml).join('')}</div>
      </section>` : ''}`;
    pdp = { id: p.id, size: single ? p.sizes[0] : null, qty: 1 };
  }
  let pdp = null;

  function updatePdp() {
    const p = byId[pdp.id];
    $$('[data-size-grid] .size-opt').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.size === pdp.size)));
    const chosen = $('[data-size-chosen]');
    if (chosen) chosen.textContent = pdp.size ? `· ${pdp.size}` : '';
    $('[data-pdp-qty]').textContent = pdp.qty;
    $('[data-pdp-total]').textContent = money(p.price * pdp.qty);
    $('[data-action="pdp-qty"][data-delta="-1"]').disabled = pdp.qty <= 1;
    $('[data-action="pdp-qty"][data-delta="1"]').disabled = pdp.qty >= MAX_QTY;
    if (pdp.size) {
      $('[data-size-error]').textContent = '';
      $('[data-size-grid]').classList.remove('error');
    }
  }

  // ---------- Checkout ----------
  let shipMethod = 'standard';

  function summaryHtml() {
    const t = totals(shipMethod);
    const p = promo && PROMOS[promo];
    return `
      <button type="button" class="summary-toggle" data-action="toggle-summary" aria-expanded="false">
        <span>Order summary (${cartCount()})</span><span>${money2(t.total)} &#9662;</span>
      </button>
      <h2>Order summary</h2>
      <div class="summary-body">
        ${cart.map(l => {
          const pr = byId[l.id];
          return `<div class="sum-item">
            <div class="sum-thumb"><img src="${img(pr.id)}" alt="" width="60" height="75"><b>${l.qty}</b></div>
            <div><p class="nm">${esc(pr.name)}</p><p class="mt">${esc(pr.color)} &middot; ${esc(sizeLabel(l.size))}</p></div>
            <span class="pr">${money2(pr.price * l.qty)}</span>
          </div>`;
        }).join('')}
        <form class="promo" data-promo-form novalidate>
          <label for="promo-code" class="sr-only">Discount code</label>
          <input id="promo-code" placeholder="Discount code" autocomplete="off" value="${p ? esc(promo) : ''}" ${p ? 'disabled' : ''}>
          ${p ? '<button type="button" class="btn btn-outline btn-sm" data-action="remove-promo">Remove</button>'
              : '<button type="submit" class="btn btn-outline btn-sm">Apply</button>'}
        </form>
        <p class="promo-msg ${p ? 'ok' : ''}" data-promo-msg aria-live="polite">${p ? esc(p.label) + ' applied' : ''}</p>
        <div class="sum-row"><span>Subtotal</span><span>${money2(t.subtotal)}</span></div>
        ${t.discount ? `<div class="sum-row discount"><span>Discount</span><span>&minus;${money2(t.discount)}</span></div>` : ''}
        <div class="sum-row"><span>Shipping</span><span>${t.shipping === 0 ? 'Free' : money2(t.shipping)}</span></div>
        <div class="sum-row"><span>Estimated tax</span><span>${money2(t.tax)}</span></div>
        <div class="sum-row total"><span>Total</span><span>${money2(t.total)}</span></div>
      </div>`;
  }

  function refreshSummary() {
    const el = $('[data-summary]');
    if (!el) return;
    if (!cart.length) { renderCheckout(); return; }
    const collapsed = el.classList.contains('collapsed');
    el.innerHTML = summaryHtml();
    $('[data-action="toggle-summary"]').setAttribute('aria-expanded', String(!collapsed));
    const std = $('[data-std-price]');
    if (std) {
      const t = totals('standard');
      std.textContent = t.shipping === 0 ? 'Free' : money2(STANDARD_SHIP);
    }
    $('[data-place-total]').textContent = money2(totals(shipMethod).total);
  }

  function deliveryRange(method) {
    const add = (d, n) => { const x = new Date(d); let k = 0; while (k < n) { x.setDate(x.getDate() + 1); if (x.getDay() % 6) k++; } return x; };
    const fmt = d => d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const now = new Date();
    return method === 'express' ? fmt(add(now, 2)) : `${fmt(add(now, 5))} – ${fmt(add(now, 7))}`;
  }

  function renderCheckout() {
    document.title = 'Checkout | Halden';
    if (!cart.length) {
      main.innerHTML = `
        <div class="checkout">
          <div class="empty">
            <h2>Your bag is empty</h2>
            <p>Add a few things before checking out.</p>
            <a href="#/shop" class="btn btn-dark">Continue shopping</a>
          </div>
        </div>`;
      return;
    }
    const tStd = totals('standard');
    main.innerHTML = `
      <div class="checkout">
        <nav class="crumbs" aria-label="Breadcrumb"><a href="#/">Home</a> / <a href="#/shop" data-action="open-cart-link">Bag</a> / <span>Checkout</span></nav>
        <h1>Checkout</h1>
        <div class="demo-note">${icon.info}<span>This is a demo store. No payment is taken and nothing ships. Use test card <strong>4242 4242 4242 4242</strong> with any future date and any CVC.</span></div>
        <div class="checkout-grid">
          <form class="co-form" data-checkout novalidate>
            <fieldset>
              <legend><span class="legend-num">1</span>Contact</legend>
              <div class="row">
                ${fld('email', 'Email', 'email', 'email', 'you@example.com')}
              </div>
              <div class="row">
                ${fld('phone', 'Phone <span class="opt">(optional, for delivery updates)</span>', 'tel', 'tel', '')}
              </div>
            </fieldset>
            <fieldset>
              <legend><span class="legend-num">2</span>Shipping address</legend>
              <div class="row row-2">
                ${fld('first', 'First name', 'text', 'given-name')}
                ${fld('last', 'Last name', 'text', 'family-name')}
              </div>
              <div class="row">${fld('address', 'Street address', 'text', 'address-line1')}</div>
              <div class="row">${fld('apt', 'Apartment, suite, etc. <span class="opt">(optional)</span>', 'text', 'address-line2')}</div>
              <div class="row row-3">
                ${fld('city', 'City', 'text', 'address-level2')}
                <div class="fld" data-fld="state">
                  <label for="f-state">State</label>
                  <select id="f-state" name="state" autocomplete="address-level1" aria-describedby="e-state">
                    <option value="">Select</option>
                    ${STATES.map(s => `<option>${s}</option>`).join('')}
                  </select>
                  <p class="err" id="e-state" hidden></p>
                </div>
                ${fld('zip', 'ZIP code', 'text', 'postal-code', '', 'numeric')}
              </div>
              <p class="line-meta">We currently ship within the United States.</p>
            </fieldset>
            <fieldset>
              <legend><span class="legend-num">3</span>Delivery</legend>
              <div class="ship-opts">
                <label class="ship-opt">
                  <input type="radio" name="ship" value="standard" ${shipMethod === 'standard' ? 'checked' : ''}>
                  <span class="grow"><strong>Standard</strong><small>Arrives ${deliveryRange('standard')}</small></span>
                  <strong data-std-price>${tStd.shipping === 0 ? 'Free' : money2(STANDARD_SHIP)}</strong>
                </label>
                <label class="ship-opt">
                  <input type="radio" name="ship" value="express" ${shipMethod === 'express' ? 'checked' : ''}>
                  <span class="grow"><strong>Express</strong><small>Arrives ${deliveryRange('express')}</small></span>
                  <strong>${money2(EXPRESS_SHIP)}</strong>
                </label>
              </div>
            </fieldset>
            <fieldset>
              <legend><span class="legend-num">4</span>Payment</legend>
              <div class="row">
                <div class="fld" data-fld="card">
                  <label for="f-card">Card number</label>
                  <div class="card-input">
                    <input id="f-card" name="card" type="text" inputmode="numeric" autocomplete="cc-number" placeholder="1234 1234 1234 1234" maxlength="23" aria-describedby="e-card">
                    <span class="brand" data-brand></span>
                  </div>
                  <p class="err" id="e-card" hidden></p>
                </div>
              </div>
              <div class="row">${fld('ccname', 'Name on card', 'text', 'cc-name')}</div>
              <div class="row row-2">
                ${fld('exp', 'Expiry (MM/YY)', 'text', 'cc-exp', 'MM/YY', 'numeric', 5)}
                ${fld('cvc', 'Security code', 'text', 'cc-csc', 'CVC', 'numeric', 4)}
              </div>
            </fieldset>
            <button type="submit" class="btn btn-dark btn-block" data-place-order>Place order &middot; <span data-place-total>${money2(totals(shipMethod).total)}</span></button>
            <p class="line-meta" style="text-align:center;margin-top:10px">By placing this order you agree this is a demo and nothing will be charged.</p>
          </form>
          <aside class="summary collapsed" data-summary aria-label="Order summary"></aside>
        </div>
      </div>`;
    refreshSummary();
    if (window.matchMedia('(min-width: 861px)').matches) $('[data-summary]').classList.remove('collapsed');
  }

  function fld(name, label, type, ac, ph = '', mode = '', max = 0) {
    return `
      <div class="fld" data-fld="${name}">
        <label for="f-${name}">${label}</label>
        <input id="f-${name}" name="${name}" type="${type}" autocomplete="${ac}" ${ph ? `placeholder="${ph}"` : ''} ${mode ? `inputmode="${mode}"` : ''} ${max ? `maxlength="${max}"` : ''} aria-describedby="e-${name}">
        <p class="err" id="e-${name}" hidden></p>
      </div>`;
  }

  function luhn(num) {
    let sum = 0, alt = false;
    for (let i = num.length - 1; i >= 0; i--) {
      let d = +num[i];
      if (alt) { d *= 2; if (d > 9) d -= 9; }
      sum += d; alt = !alt;
    }
    return sum % 10 === 0;
  }

  function cardBrand(num) {
    if (/^4/.test(num)) return 'VISA';
    if (/^(5[1-5]|2[2-7])/.test(num)) return 'MASTERCARD';
    if (/^3[47]/.test(num)) return 'AMEX';
    if (/^6(011|5)/.test(num)) return 'DISCOVER';
    return '';
  }

  const VALIDATORS = {
    email: v => !v ? 'Enter your email' : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'Enter a valid email, like name@example.com',
    phone: v => !v || v.replace(/\D/g, '').length >= 10 ? '' : 'Enter a 10-digit phone number',
    first: v => v ? '' : 'Enter your first name',
    last: v => v ? '' : 'Enter your last name',
    address: v => v.length >= 4 ? '' : 'Enter your street address',
    city: v => v ? '' : 'Enter your city',
    state: v => v ? '' : 'Select a state',
    zip: v => /^\d{5}(-\d{4})?$/.test(v) ? '' : 'Enter a 5-digit ZIP code',
    card: v => {
      const n = v.replace(/\s/g, '');
      if (!n) return 'Enter your card number';
      if (!/^\d{13,19}$/.test(n) || !luhn(n)) return 'That card number isn\'t valid';
      return '';
    },
    ccname: v => v ? '' : 'Enter the name on your card',
    exp: v => {
      const m = v.match(/^(\d{2})\/(\d{2})$/);
      if (!m) return 'Enter the expiry as MM/YY';
      const mo = +m[1], yr = 2000 + +m[2];
      if (mo < 1 || mo > 12) return 'Enter a month from 01 to 12';
      const now = new Date();
      if (yr < now.getFullYear() || (yr === now.getFullYear() && mo < now.getMonth() + 1)) return 'This card has expired';
      return '';
    },
    cvc: v => {
      const amex = cardBrand(($('#f-card')?.value || '').replace(/\s/g, '')) === 'AMEX';
      return new RegExp(amex ? '^\\d{4}$' : '^\\d{3,4}$').test(v) ? '' : `Enter the ${amex ? '4' : '3'}-digit code`;
    },
  };

  function validateField(name) {
    const wrap = $(`[data-fld="${name}"]`);
    const input = $(`[name="${name}"]`);
    if (!wrap || !input) return true;
    const msg = VALIDATORS[name](input.value.trim());
    const err = $(`#e-${name}`);
    wrap.classList.toggle('invalid', !!msg);
    input.setAttribute('aria-invalid', String(!!msg));
    err.textContent = msg;
    err.hidden = !msg;
    return !msg;
  }

  function placeOrder(form) {
    const names = Object.keys(VALIDATORS);
    const bad = names.filter(n => !validateField(n));
    form.dataset.submitted = '1';
    if (bad.length) {
      $(`[name="${bad[0]}"]`).focus();
      toast(bad.length === 1 ? 'Please fix the highlighted field' : `Please fix the ${bad.length} highlighted fields`);
      return;
    }
    const btn = $('[data-place-order]');
    btn.disabled = true;
    btn.textContent = 'Processing...';
    const data = Object.fromEntries(new FormData(form));
    const t = totals(shipMethod);
    const order = {
      number: 'HD-' + String(Math.floor(100000 + Math.random() * 900000)),
      date: new Date().toISOString(),
      email: data.email.trim(),
      name: `${data.first.trim()} ${data.last.trim()}`,
      address: [data.address, data.apt].map(s => s.trim()).filter(Boolean).join(', ') + `, ${data.city.trim()}, ${data.state} ${data.zip.trim()}`,
      method: shipMethod,
      arrives: deliveryRange(shipMethod),
      card: `${cardBrand(data.card.replace(/\s/g, '')) || 'Card'} ending ${data.card.replace(/\s/g, '').slice(-4)}`,
      items: cart.map(l => ({ ...l, name: byId[l.id].name, color: byId[l.id].color, price: byId[l.id].price })),
      promo,
      ...t,
    };
    setTimeout(() => {
      store.set('halden-last-order', order);
      // Change the hash first so clearing the cart doesn't redraw checkout as empty.
      location.hash = `#/order/${order.number}`;
      cart = [];
      promo = null;
      shipMethod = 'standard';
      saveCart();
    }, 1100);
  }

  function renderOrder(num) {
    const o = store.get('halden-last-order', null);
    if (!o || o.number !== num) {
      document.title = 'Order not found | Halden';
      main.innerHTML = `<div class="confirm"><h1>Order not found</h1><p class="lead">We couldn't find that order on this device.</p><a href="#/shop" class="btn btn-dark">Continue shopping</a></div>`;
      return;
    }
    document.title = `Order ${o.number} confirmed | Halden`;
    main.innerHTML = `
      <div class="confirm">
        <div class="confirm-check">${icon.check}</div>
        <p class="eyebrow">Order ${esc(o.number)}</p>
        <h1 style="margin-top:8px">Thank you, ${esc(o.name.split(' ')[0])}.</h1>
        <p class="lead">Your order is confirmed. A receipt would be on its way to ${esc(o.email)} if this were a real store.</p>
        <div class="confirm-card">
          <div class="confirm-meta">
            <div><small>Arrives</small><span>${esc(o.arrives)}</span></div>
            <div><small>Ship to</small><span>${esc(o.address)}</span></div>
            <div><small>Paid with</small><span>${esc(o.card)}</span></div>
          </div>
          ${o.items.map(l => `
            <div class="sum-item">
              <div class="sum-thumb"><img src="${img(l.id)}" alt="" width="60" height="75"><b>${l.qty}</b></div>
              <div><p class="nm">${esc(l.name)}</p><p class="mt">${esc(l.color)} &middot; ${esc(sizeLabel(l.size))}</p></div>
              <span class="pr">${money2(l.price * l.qty)}</span>
            </div>`).join('')}
          <div style="border-top:1px solid var(--line);margin-top:8px;padding-top:12px">
            <div class="sum-row"><span>Subtotal</span><span>${money2(o.subtotal)}</span></div>
            ${o.discount ? `<div class="sum-row discount"><span>Discount (${esc(o.promo)})</span><span>&minus;${money2(o.discount)}</span></div>` : ''}
            <div class="sum-row"><span>Shipping (${o.method === 'express' ? 'Express' : 'Standard'})</span><span>${o.shipping === 0 ? 'Free' : money2(o.shipping)}</span></div>
            <div class="sum-row"><span>Tax</span><span>${money2(o.tax)}</span></div>
            <div class="sum-row total"><span>Total</span><span>${money2(o.total)}</span></div>
          </div>
        </div>
        <a href="#/shop" class="btn btn-dark">Continue shopping</a>
      </div>`;
  }

  function renderNotFound() {
    document.title = 'Page not found | Halden';
    main.innerHTML = `<div class="confirm"><h1>Page not found</h1><p class="lead">That page doesn't exist or has moved.</p><a href="#/" class="btn btn-dark">Back to home</a></div>`;
  }

  // ---------- Events ----------
  document.addEventListener('click', e => {
    // A menu link to the page already showing fires no hashchange, so close the menu here.
    if (e.target.closest('#mobile-nav nav a')) {
      closeOverlay($('#mobile-nav'));
      $('.menu-toggle').setAttribute('aria-expanded', 'false');
    }
    const el = e.target.closest('[data-action], [data-filter]');
    if (!el) return;

    if (el.dataset.filter) {
      const params = currentRoute().params;
      const { filter, value } = el.dataset;
      if (filter === 'cat') {
        params.delete('sale');
        value ? params.set('cat', value) : params.delete('cat');
      } else if (filter === 'sale') {
        params.delete('cat');
        params.get('sale') ? params.delete('sale') : params.set('sale', '1');
      } else if (filter === 'size') {
        params.get('size') === value ? params.delete('size') : params.set('size', value);
      }
      updateShop(params);
      return;
    }

    const action = el.dataset.action;
    switch (action) {
      case 'open-cart': openCart(); break;
      case 'close-cart': closeCart(); break;
      case 'open-menu':
        openOverlay($('#mobile-nav'), '.drawer-head .icon-btn');
        $('.menu-toggle').setAttribute('aria-expanded', 'true');
        break;
      case 'close-menu':
        closeOverlay($('#mobile-nav'));
        $('.menu-toggle').setAttribute('aria-expanded', 'false');
        break;
      case 'open-search': {
        const f = $('[data-search-form]');
        f.hidden = !f.hidden;
        if (!f.hidden) $('#search-input').focus();
        break;
      }
      case 'close-search': $('[data-search-form]').hidden = true; break;
      case 'close-modal': closeOverlay($('#modal')); break;
      case 'info':
        e.preventDefault();
        openModal(INFO[el.dataset.info]);
        break;
      case 'quick-add': {
        e.preventDefault();
        const p = byId[el.dataset.id];
        if (addToCart(p.id, el.dataset.size)) toast(`Added ${p.name} (${el.dataset.size}) to your bag`);
        break;
      }
      case 'pick-size':
        pdp.size = el.dataset.size;
        updatePdp();
        break;
      case 'pdp-qty':
        pdp.qty = Math.max(1, Math.min(MAX_QTY, pdp.qty + +el.dataset.delta));
        updatePdp();
        break;
      case 'add-to-cart': {
        const p = byId[pdp.id];
        if (!pdp.size) {
          $('[data-size-error]').textContent = 'Please select a size';
          const grid = $('[data-size-grid]');
          grid.classList.add('error');
          grid.querySelector('.size-opt:not([disabled])').focus();
          return;
        }
        if (addToCart(p.id, pdp.size, pdp.qty)) {
          openCart();
          toast(`Added to bag`);
          pdp.qty = 1;
          updatePdp();
        }
        break;
      }
      case 'qty': {
        const line = cart.find(l => lineKey(l.id, l.size) === el.dataset.key);
        if (line) setQty(el.dataset.key, line.qty + +el.dataset.delta);
        const again = $(`[data-action="qty"][data-key="${CSS.escape(el.dataset.key)}"][data-delta="${el.dataset.delta}"]`);
        if (again && !again.disabled) again.focus();
        else $('#cart-drawer .drawer-head .icon-btn').focus();
        break;
      }
      case 'remove': {
        const line = cart.find(l => lineKey(l.id, l.size) === el.dataset.key);
        setQty(el.dataset.key, 0);
        if (line) toast(`Removed ${byId[line.id].name}`);
        $('#cart-drawer .drawer-head .icon-btn').focus();
        break;
      }
      case 'clear-filter': {
        const params = currentRoute().params;
        params.delete(el.dataset.key);
        if (el.dataset.key === 'q') $('[data-shop-search]').value = '';
        updateShop(params);
        break;
      }
      case 'reset-filters':
        $('[data-shop-search]').value = '';
        updateShop(new URLSearchParams());
        break;
      case 'remove-promo':
        promo = null;
        saveCart();
        break;
      case 'toggle-summary': {
        const s = $('[data-summary]');
        s.classList.toggle('collapsed');
        el.setAttribute('aria-expanded', String(!s.classList.contains('collapsed')));
        break;
      }
      case 'open-cart-link':
        e.preventDefault();
        openCart();
        break;
    }
  });

  // Close overlays when clicking the dim backdrop.
  $$('.mobile-nav, .cart-drawer, .modal').forEach(o => o.addEventListener('click', e => {
    if (e.target === o) {
      closeOverlay(o);
      if (o.id === 'mobile-nav') $('.menu-toggle').setAttribute('aria-expanded', 'false');
    }
  }));

  document.addEventListener('keydown', e => {
    const open = $$('.modal, .cart-drawer, .mobile-nav').find(o => !o.hidden);
    if (e.key === 'Escape') {
      if (open) closeOverlay(open);
      else if (!$('[data-search-form]').hidden) $('[data-search-form]').hidden = true;
      return;
    }
    if (e.key === 'Tab' && open) {
      const items = $$('a[href], button:not([disabled]), input:not([disabled]), select', open).filter(x => x.offsetParent !== null);
      if (!items.length) return;
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  document.addEventListener('submit', e => {
    const form = e.target;
    if (form.matches('[data-search-form]')) {
      e.preventDefault();
      const q = $('#search-input').value.trim();
      form.hidden = true;
      $('#search-input').value = '';
      location.hash = q ? `#/shop?q=${encodeURIComponent(q)}` : '#/shop';
    } else if (form.matches('[data-promo-form]')) {
      e.preventDefault();
      const code = $('#promo-code').value.trim().toUpperCase();
      const msg = $('[data-promo-msg]');
      if (!code) { msg.className = 'promo-msg bad'; msg.textContent = 'Enter a discount code'; return; }
      if (!PROMOS[code]) { msg.className = 'promo-msg bad'; msg.textContent = `“${code}” isn't a valid code. Try WELCOME10.`; return; }
      promo = code;
      saveCart();
      toast(`${PROMOS[code].label} applied`);
    } else if (form.matches('[data-checkout]')) {
      e.preventDefault();
      placeOrder(form);
    } else if (form.matches('[data-newsletter]')) {
      e.preventDefault();
      const input = $('#nl-email');
      const msg = $('.newsletter-msg');
      if (VALIDATORS.email(input.value.trim())) {
        msg.className = 'newsletter-msg bad';
        msg.textContent = 'Enter a valid email address.';
      } else {
        msg.className = 'newsletter-msg';
        msg.textContent = 'You\'re on the list. Use code WELCOME10 for 10% off.';
        input.value = '';
      }
    }
  });

  let searchTimer;
  document.addEventListener('input', e => {
    const t = e.target;
    if (t.matches('[data-shop-search]')) {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        const params = currentRoute().params;
        t.value.trim() ? params.set('q', t.value.trim()) : params.delete('q');
        updateShop(params);
      }, 200);
      return;
    }
    if (t.id === 'f-card') {
      const digits = t.value.replace(/\D/g, '').slice(0, 19);
      const amex = cardBrand(digits) === 'AMEX';
      t.value = amex
        ? digits.replace(/^(\d{0,4})(\d{0,6})(\d{0,5}).*/, (m, a, b, c) => [a, b, c].filter(Boolean).join(' '))
        : digits.replace(/(\d{4})(?=\d)/g, '$1 ');
      $('[data-brand]').textContent = cardBrand(digits);
    }
    if (t.id === 'f-exp') {
      let d = t.value.replace(/\D/g, '').slice(0, 4);
      if (d.length === 1 && +d > 1) d = '0' + d;
      t.value = d.length > 2 ? d.slice(0, 2) + '/' + d.slice(2) : d;
    }
    if (t.id === 'f-cvc') t.value = t.value.replace(/\D/g, '').slice(0, 4);
    if (t.id === 'f-zip') t.value = t.value.replace(/[^\d-]/g, '').slice(0, 10);
    // Re-check a field as the user fixes it, once it has shown an error.
    const name = t.name;
    if (name && VALIDATORS[name] && $(`[data-fld="${name}"]`)?.classList.contains('invalid')) validateField(name);
  });

  document.addEventListener('focusout', e => {
    const t = e.target;
    if (t.closest && t.closest('[data-checkout]') && VALIDATORS[t.name] && t.value.trim()) validateField(t.name);
  });

  document.addEventListener('change', e => {
    const t = e.target;
    if (t.matches('[data-shop-sort]')) {
      const params = currentRoute().params;
      t.value === 'featured' ? params.delete('sort') : params.set('sort', t.value);
      updateShop(params);
    }
    if (t.name === 'ship') {
      shipMethod = t.value;
      refreshSummary();
    }
    if (t.name === 'state' && $('[data-fld="state"]').classList.contains('invalid')) validateField('state');
  });

  // Keep the cart in sync across tabs.
  window.addEventListener('storage', e => {
    if (e.key === 'halden-cart' || e.key === 'halden-promo') {
      cart = store.get('halden-cart', []).filter(l => byId[l.id]);
      promo = store.get('halden-promo', null);
      updateCartBadge();
      if (!$('#cart-drawer').hidden) renderCart();
      if (currentRoute().path === '/checkout') renderCheckout();
    }
  });

  window.addEventListener('hashchange', route);
  updateCartBadge();
  route();
})();
