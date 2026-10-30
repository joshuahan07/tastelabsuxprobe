(() => {
  'use strict';

  /* ---------- Demo data ---------- */

  const DAY = 86400000;
  const CHANNELS = ['Online store', 'Marketplace', 'Retail', 'Wholesale'];
  const CHANNEL_COLORS = ['var(--series-1)', 'var(--series-2)', 'var(--series-3)', 'var(--series-4)'];
  const REGIONS = ['North America', 'Europe', 'Asia Pacific', 'Latin America'];
  const PRODUCTS = [
    ['Aero Wireless Headphones', 'Electronics', 189], ['Lumen Smart Lamp', 'Electronics', 79],
    ['Pocket Projector Mini', 'Electronics', 249], ['Volt Charging Dock', 'Electronics', 59],
    ['Merino Crew Sweater', 'Apparel', 98], ['Trail Runner Jacket', 'Apparel', 165],
    ['Everyday Canvas Tote', 'Apparel', 42], ['Cast Iron Skillet 12"', 'Home & Kitchen', 64],
    ['Pour-Over Coffee Set', 'Home & Kitchen', 54], ['Linen Duvet Cover', 'Home & Kitchen', 139],
    ['Ceramic Planter Trio', 'Home & Kitchen', 48], ['Daily Greens Powder', 'Wellness', 39],
    ['Cork Yoga Mat', 'Wellness', 72], ['Recovery Massage Gun', 'Wellness', 129],
    ['Hardcover Planner 2027', 'Stationery', 28], ['Fountain Pen Kit', 'Stationery', 46]
  ];
  const FIRST = ['Ava', 'Liam', 'Mia', 'Noah', 'Zoe', 'Ethan', 'Lena', 'Omar', 'Priya', 'Kenji', 'Sofia', 'Mateo', 'Chloe', 'Arjun', 'Hana', 'Lucas', 'Nora', 'Diego', 'Ines', 'Theo'];
  const LAST = ['Park', 'Nguyen', 'Garcia', 'Smith', 'Okafor', 'Rossi', 'Chen', 'Müller', 'Silva', 'Kim', 'Patel', 'Dubois', 'Tanaka', 'Lopez', 'Brown', 'Haddad'];

  function rng(seed) {
    return () => {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const pickW = (r, items, weights) => {
    let x = r() * weights.reduce((a, b) => a + b, 0);
    for (let i = 0; i < items.length; i++) { x -= weights[i]; if (x <= 0) return items[i]; }
    return items[items.length - 1];
  };

  const today = new Date(); today.setHours(0, 0, 0, 0);
  const TODAY = today.getTime();
  const HISTORY = 730;

  function generate() {
    const r = rng(20261030);
    const orders = [];
    let seq = 100000;
    for (let d = HISTORY - 1; d >= 0; d--) {
      const t = TODAY - d * DAY;
      const date = new Date(t);
      const progress = 1 - d / HISTORY;
      const dow = date.getDay();
      const month = date.getMonth();
      const weekly = [1.18, 0.92, 0.95, 0.98, 1.02, 1.12, 1.24][dow];
      const seasonal = month === 10 ? 1.28 : month === 11 ? 1.45 : month === 0 ? 0.82 : month === 6 || month === 7 ? 0.93 : 1;
      const promo = (date.getDate() >= 24 && date.getDate() <= 26 && month % 3 === 2) ? 1.35 : 1;
      const lambda = 34 * (0.78 + 0.5 * progress) * weekly * seasonal * promo * (0.85 + r() * 0.3);
      const n = Math.max(4, Math.round(lambda));
      for (let i = 0; i < n; i++) {
        const p = PRODUCTS[Math.floor(Math.pow(r(), 1.35) * PRODUCTS.length)];
        const channel = pickW(r, CHANNELS, [0.46 + progress * 0.08, 0.27, 0.17 - progress * 0.04, 0.10]);
        const region = pickW(r, REGIONS, [0.44, 0.29, 0.17 + progress * 0.06, 0.10]);
        const qty = channel === 'Wholesale' ? 2 + Math.floor(r() * 4) : 1 + (r() < 0.22 ? 1 + Math.floor(r() * 2) : 0);
        const discount = r() < 0.18 ? 0.85 : 1;
        const amount = Math.round(p[2] * qty * discount * 100) / 100;
        let status = pickW(r, ['Completed', 'Refunded', 'Cancelled'], [0.935, 0.04, 0.025]);
        if (d <= 3 && status === 'Completed' && r() < (4 - d) * 0.22) status = 'Processing';
        orders.push({
          id: 'NW-' + (seq++),
          ts: t + Math.floor(r() * DAY),
          day: t,
          customer: FIRST[Math.floor(r() * FIRST.length)] + ' ' + LAST[Math.floor(r() * LAST.length)],
          product: p[0], category: p[1], channel, region, qty, amount, status
        });
      }
    }
    return orders;
  }

  const ORDERS = generate();
  const isSale = o => o.status === 'Completed' || o.status === 'Processing';

  /* ---------- Formatting ---------- */

  const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const money2 = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const int = new Intl.NumberFormat('en-US');
  const compact = v => {
    const a = Math.abs(v);
    if (a >= 1e6) return (v / 1e6).toFixed(a >= 1e7 ? 1 : 2).replace(/\.?0+$/, '') + 'M';
    if (a >= 1e4) return (v / 1e3).toFixed(a >= 1e5 ? 0 : 1).replace(/\.0$/, '') + 'K';
    return int.format(Math.round(v));
  };
  const moneyCompact = v => (v < 0 ? '-$' : '$') + compact(Math.abs(v));
  const pct = (v, d = 1) => (v * 100).toFixed(d) + '%';
  const fmtDate = (t, opts) => new Date(t).toLocaleDateString('en-US', opts || { month: 'short', day: 'numeric' });
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const change = (cur, prev) => prev ? (cur - prev) / prev : 0;

  /* ---------- State ---------- */

  const state = {
    range: 30, region: 'all', channel: 'all',
    status: 'all', search: '', sort: 'date', dir: 'desc', page: 0,
    tables: {}
  };
  const PAGE_SIZE = 10;

  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));

  function filtered(start, end) {
    return ORDERS.filter(o => o.day >= start && o.day <= end &&
      (state.region === 'all' || o.region === state.region) &&
      (state.channel === 'all' || o.channel === state.channel));
  }

  function periods() {
    const n = state.range;
    const end = TODAY, start = TODAY - (n - 1) * DAY;
    return { n, start, end, pStart: start - n * DAY, pEnd: start - DAY };
  }

  function summarize(list) {
    const sales = list.filter(isSale);
    const revenue = sales.reduce((a, o) => a + o.amount, 0);
    const units = sales.reduce((a, o) => a + o.qty, 0);
    const refunds = list.filter(o => o.status === 'Refunded');
    return {
      revenue, orders: sales.length, units,
      aov: sales.length ? revenue / sales.length : 0,
      refundRate: list.length ? refunds.length / list.length : 0,
      sales
    };
  }

  // Bucket a list into periods of `unit` (day | week | month) between start and end.
  function bucketize(list, start, end, unit) {
    const keys = [];
    const keyOf = t => {
      const d = new Date(t);
      if (unit === 'day') return t;
      if (unit === 'week') return start + Math.floor((t - start) / (7 * DAY)) * 7 * DAY;
      return new Date(d.getFullYear(), d.getMonth(), 1).getTime();
    };
    for (let t = start; t <= end; t += DAY) { const k = keyOf(t); if (keys[keys.length - 1] !== k) keys.push(k); }
    const idx = new Map(keys.map((k, i) => [k, i]));
    const revenue = keys.map(() => 0), orders = keys.map(() => 0);
    for (const o of list) {
      if (!isSale(o)) continue;
      const i = idx.get(keyOf(o.day));
      if (i === undefined) continue;
      revenue[i] += o.amount; orders[i]++;
    }
    return { keys, revenue, orders };
  }

  const bucketLabel = (t, unit, long) => {
    if (unit === 'month') return fmtDate(t, long ? { month: 'long', year: 'numeric' } : { month: 'short' });
    if (unit === 'week') return (long ? 'Week of ' : '') + fmtDate(t);
    return fmtDate(t, long ? { weekday: 'short', month: 'short', day: 'numeric' } : { month: 'short', day: 'numeric' });
  };

  /* ---------- SVG helpers ---------- */

  const NS = 'http://www.w3.org/2000/svg';
  function el(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function niceMax(max, ticks = 4) {
    if (max <= 0) return { max: 1, step: 0.25 };
    const raw = max / ticks;
    const mag = Math.pow(10, Math.floor(Math.log10(raw)));
    const step = [1, 2, 2.5, 5, 10].map(m => m * mag).find(s => s >= raw);
    return { max: Math.ceil(max / step) * step, step };
  }
  // Rect with 4px rounded top (data end), square at the baseline.
  function barPath(x, y, w, h, r = 4) {
    r = Math.min(r, w / 2, h);
    if (h <= 0) return '';
    return `M${x},${y + h}V${y + r}Q${x},${y} ${x + r},${y}H${x + w - r}Q${x + w},${y} ${x + w},${y + r}V${y + h}Z`;
  }
  function hBarPath(x, y, w, h, r = 4) {
    r = Math.min(r, h / 2, w);
    if (w <= 0) return '';
    return `M${x},${y}H${x + w - r}Q${x + w},${y} ${x + w},${y + r}V${y + h - r}Q${x + w},${y + h} ${x + w - r},${y + h}H${x}Z`;
  }

  /* ---------- Tooltip ---------- */

  const tip = $('#tooltip');
  function showTip(html, x, y) {
    tip.innerHTML = html;
    tip.hidden = false;
    const r = tip.getBoundingClientRect();
    let left = x + 14, top = y - r.height - 12;
    if (left + r.width > innerWidth - 8) left = x - r.width - 14;
    if (left < 8) left = 8;
    if (top < 8) top = y + 16;
    tip.style.left = left + 'px';
    tip.style.top = top + 'px';
  }
  const hideTip = () => { tip.hidden = true; };
  addEventListener('scroll', hideTip, { passive: true });
  const tipRow = (color, label, value) => `<div class="r"><span><i style="--c:${color}"></i>${esc(label)}</span><b>${esc(value)}</b></div>`;

  /* ---------- Charts ---------- */

  function lineChart(host, { labels, longLabels, series, fmtAxis, fmtVal }) {
    host.innerHTML = '';
    const W = host.clientWidth, H = host.clientHeight;
    if (!W || !H) return;
    const m = { t: 10, r: 12, b: 26, l: 46 };
    const iw = W - m.l - m.r, ih = H - m.t - m.b;
    const all = series.flatMap(s => s.values);
    const { max, step } = niceMax(Math.max(...all));
    const n = labels.length;
    const x = i => m.l + (n === 1 ? iw / 2 : (i / (n - 1)) * iw);
    const y = v => m.t + ih - (v / max) * ih;
    const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, preserveAspectRatio: 'none' }, host);

    for (let v = 0; v <= max + 1e-9; v += step) {
      el('line', { x1: m.l, x2: W - m.r, y1: y(v), y2: y(v), class: v === 0 ? 'baseline' : 'gridline' }, svg);
      el('text', { x: m.l - 8, y: y(v) + 4, 'text-anchor': 'end' }, svg).textContent = fmtAxis(v);
    }
    const every = Math.max(1, Math.ceil(n / Math.max(2, Math.floor(iw / 72))));
    labels.forEach((l, i) => {
      if (i % every && i !== n - 1) return;
      if (i !== n - 1 && n - 1 - i < every * 0.6) return;
      el('text', { x: x(i), y: H - 6, 'text-anchor': i === 0 ? 'start' : i === n - 1 ? 'end' : 'middle' }, svg).textContent = l;
    });

    series.slice().reverse().forEach((s, si) => {
      const d = s.values.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join('');
      if (s.area) {
        el('path', { d: `${d}L${x(n - 1)},${y(0)}L${x(0)},${y(0)}Z`, style: `fill:${s.color};opacity:.1` }, svg);
      }
      el('path', { d, fill: 'none', style: `stroke:${s.color}`, 'stroke-width': 2, 'stroke-linejoin': 'round', 'stroke-linecap': 'round', 'stroke-dasharray': s.dashed ? '4 4' : 'none', 'vector-effect': 'non-scaling-stroke' }, svg);
    });
    const main = series[0];
    el('circle', { cx: x(n - 1), cy: y(main.values[n - 1]), r: 4, style: `fill:${main.color};stroke:var(--surface)`, 'stroke-width': 2 }, svg);

    const cross = el('line', { y1: m.t, y2: m.t + ih, class: 'crosshair', visibility: 'hidden' }, svg);
    const dots = series.map(s => el('circle', { r: 4, style: `fill:${s.color};stroke:var(--surface)`, 'stroke-width': 2, visibility: 'hidden' }, svg));
    const hit = el('rect', { x: m.l, y: 0, width: iw, height: H, class: 'hit' }, svg);
    const move = e => {
      const box = svg.getBoundingClientRect();
      const px = (e.clientX - box.left) * (W / box.width);
      const i = Math.max(0, Math.min(n - 1, Math.round(((px - m.l) / iw) * (n - 1))));
      cross.setAttribute('x1', x(i)); cross.setAttribute('x2', x(i)); cross.setAttribute('visibility', 'visible');
      series.forEach((s, si) => { dots[si].setAttribute('cx', x(i)); dots[si].setAttribute('cy', y(s.values[i])); dots[si].setAttribute('visibility', 'visible'); });
      const rows = series.map(s => tipRow(s.color, s.tipName ? s.tipName(i) : s.name, fmtVal(s.values[i]))).join('');
      showTip(`<div class="t">${esc(longLabels[i])}</div>${rows}`, e.clientX, e.clientY);
    };
    const leave = () => { cross.setAttribute('visibility', 'hidden'); dots.forEach(d => d.setAttribute('visibility', 'hidden')); hideTip(); };
    hit.addEventListener('pointermove', move);
    hit.addEventListener('pointerdown', move);
    hit.addEventListener('pointerleave', leave);
  }

  function columnChart(host, { labels, longLabels, values, fmtAxis, fmtVal, name }) {
    host.innerHTML = '';
    const W = host.clientWidth, H = host.clientHeight;
    if (!W || !H) return;
    const m = { t: 10, r: 4, b: 26, l: 40 };
    const iw = W - m.l - m.r, ih = H - m.t - m.b;
    const { max, step } = niceMax(Math.max(...values));
    const n = values.length;
    const band = iw / n;
    const bw = Math.max(2, Math.min(24, band - 2));
    const y = v => m.t + ih - (v / max) * ih;
    const svg = el('svg', { viewBox: `0 0 ${W} ${H}` }, host);
    for (let v = 0; v <= max + 1e-9; v += step) {
      el('line', { x1: m.l, x2: W - m.r, y1: y(v), y2: y(v), class: v === 0 ? 'baseline' : 'gridline' }, svg);
      el('text', { x: m.l - 8, y: y(v) + 4, 'text-anchor': 'end' }, svg).textContent = fmtAxis(v);
    }
    const every = Math.max(1, Math.ceil(n / Math.max(2, Math.floor(iw / 56))));
    const bars = values.map((v, i) => {
      const cx = m.l + band * i + band / 2;
      if (i % every === 0) el('text', { x: cx, y: H - 6, 'text-anchor': 'middle' }, svg).textContent = labels[i];
      return el('path', { d: barPath(cx - bw / 2, y(v), bw, ih + m.t - y(v), bw < 8 ? 2 : 4), class: 'bar', style: 'fill:var(--series-1)' }, svg);
    });
    const hit = el('rect', { x: m.l, y: 0, width: iw, height: H, class: 'hit' }, svg);
    const move = e => {
      const box = svg.getBoundingClientRect();
      const px = (e.clientX - box.left) * (W / box.width);
      const i = Math.max(0, Math.min(n - 1, Math.floor((px - m.l) / band)));
      host.classList.add('hovering');
      bars.forEach((b, j) => b.classList.toggle('active', j === i));
      showTip(`<div class="t">${esc(longLabels[i])}</div>${tipRow('var(--series-1)', name, fmtVal(values[i]))}`, e.clientX, e.clientY);
    };
    hit.addEventListener('pointermove', move);
    hit.addEventListener('pointerdown', move);
    hit.addEventListener('pointerleave', () => { host.classList.remove('hovering'); hideTip(); });
  }

  function barChart(host, rows, fmtVal) {
    host.innerHTML = '';
    const W = host.clientWidth;
    if (!W) return;
    const labelW = Math.min(130, W * 0.36), valW = 64, rowH = 40, bh = 20;
    const H = rows.length * rowH;
    host.style.height = H + 'px';
    const max = Math.max(...rows.map(r => r.value)) || 1;
    const iw = W - labelW - valW;
    const svg = el('svg', { viewBox: `0 0 ${W} ${H}` }, host);
    el('line', { x1: labelW, x2: labelW, y1: 0, y2: H, class: 'baseline' }, svg);
    const bars = rows.map((r, i) => {
      const yy = i * rowH + (rowH - bh) / 2;
      const w = (r.value / max) * iw;
      el('text', { x: 0, y: yy + bh / 2 + 4, class: 'lbl' }, svg).textContent = r.label;
      const b = el('path', { d: hBarPath(labelW, yy, w, bh), class: 'bar', style: 'fill:var(--series-1)' }, svg);
      el('text', { x: labelW + w + 8, y: yy + bh / 2 + 4, class: 'val' }, svg).textContent = moneyCompact(r.value);
      const hit = el('rect', { x: 0, y: i * rowH, width: W, height: rowH, class: 'hit' }, svg);
      const move = e => {
        host.classList.add('hovering'); bars.forEach((bb, j) => bb.classList.toggle('active', j === i));
        showTip(`<div class="t">${esc(r.label)}</div>${tipRow('var(--series-1)', 'Revenue', fmtVal(r.value))}${tipRow('var(--series-prev)', 'Orders', int.format(r.orders))}${tipRow('var(--series-prev)', 'vs. prior', (r.delta >= 0 ? '+' : '') + pct(r.delta))}`, e.clientX, e.clientY);
      };
      hit.addEventListener('pointermove', move);
      hit.addEventListener('pointerdown', move);
      hit.addEventListener('pointerleave', () => { host.classList.remove('hovering'); hideTip(); });
      return b;
    });
  }

  function sparkline(values, color) {
    const W = 200, H = 40;
    const max = Math.max(...values), min = Math.min(...values);
    const span = max - min || 1;
    const pts = values.map((v, i) => [(i / (values.length - 1 || 1)) * (W - 6) + 3, H - 4 - ((v - min) / span) * (H - 8)]);
    const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join('');
    const last = pts[pts.length - 1];
    return `<svg class="spark" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true">
      <path d="${d}L${last[0]},${H}L3,${H}Z" style="fill:${color};opacity:.08"/>
      <path d="${d}" fill="none" style="stroke:${color}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
    </svg>`;
  }

  function dataTable(host, head, rows) {
    host.innerHTML = `<div class="chart-table"><table class="table"><thead><tr>${head.map((h, i) => `<th${i ? ' class="num"' : ''}>${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map((c, i) => `<td${i ? ' class="num"' : ''}>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }

  /* ---------- Render ---------- */

  let view = null;

  function compute() {
    const p = periods();
    const cur = filtered(p.start, p.end);
    const prev = filtered(p.pStart, p.pEnd);
    const sCur = summarize(cur), sPrev = summarize(prev);
    const lineUnit = p.n >= 365 ? 'week' : 'day';
    const barUnit = p.n >= 365 ? 'month' : p.n >= 90 ? 'week' : 'day';
    return {
      p, cur, prev, sCur, sPrev, lineUnit, barUnit,
      lineCur: bucketize(cur, p.start, p.end, lineUnit),
      linePrev: bucketize(prev, p.pStart, p.pEnd, lineUnit),
      bars: bucketize(cur, p.start, p.end, barUnit)
    };
  }

  function groupBy(list, key) {
    const m = new Map();
    for (const o of list) {
      if (!isSale(o)) continue;
      const g = m.get(o[key]) || { revenue: 0, orders: 0, units: 0 };
      g.revenue += o.amount; g.orders++; g.units += o.qty;
      m.set(o[key], g);
    }
    return m;
  }

  function renderHeader() {
    const { p } = view;
    $('#rangeLabel').textContent = `${fmtDate(p.start, { month: 'short', day: 'numeric', year: 'numeric' })} – ${fmtDate(p.end, { month: 'short', day: 'numeric', year: 'numeric' })} · compared with ${fmtDate(p.pStart)} – ${fmtDate(p.pEnd, { month: 'short', day: 'numeric', year: 'numeric' })}`;
  }

  function deltaHTML(d, goodWhenUp = true) {
    if (!isFinite(d) || Math.abs(d) < 0.0005) return `<span class="delta flat">0.0% <small>vs. prior</small></span>`;
    const up = d > 0;
    const good = up === goodWhenUp;
    return `<span class="delta ${good ? 'up' : 'down'}">${up ? '▲' : '▼'} ${pct(Math.abs(d))} <small>vs. prior</small></span>`;
  }

  function renderKPIs() {
    const { sCur, sPrev, lineCur } = view;
    const aovSeries = lineCur.revenue.map((r, i) => lineCur.orders[i] ? r / lineCur.orders[i] : 0);
    const unitsByBucket = lineCur.keys.map(() => 0);
    const idx = new Map(lineCur.keys.map((k, i) => [k, i]));
    for (const o of sCur.sales) {
      const key = view.lineUnit === 'day' ? o.day : view.p.start + Math.floor((o.day - view.p.start) / (7 * DAY)) * 7 * DAY;
      const i = idx.get(key); if (i !== undefined) unitsByBucket[i] += o.qty;
    }
    const tiles = [
      ['Total revenue', moneyCompact(sCur.revenue), money.format(sCur.revenue), change(sCur.revenue, sPrev.revenue), lineCur.revenue],
      ['Orders', int.format(sCur.orders), int.format(sCur.orders) + ' orders', change(sCur.orders, sPrev.orders), lineCur.orders],
      ['Avg. order value', money2.format(sCur.aov), money2.format(sCur.aov), change(sCur.aov, sPrev.aov), aovSeries],
      ['Units sold', int.format(sCur.units), int.format(sCur.units) + ' units', change(sCur.units, sPrev.units), unitsByBucket]
    ];
    $('#kpis').innerHTML = tiles.map(([label, value, title, d, series]) => `
      <div class="kpi">
        <div class="kpi-label">${label}</div>
        <div class="kpi-value" title="${esc(title)}">${value}</div>
        <div class="kpi-row">${deltaHTML(d)}</div>
        ${sparkline(series, 'var(--series-1)')}
      </div>`).join('');
  }

  const ICONS = {
    pos: '<path d="M5 15l6-6 4 4 5-5M15 8h5v5"/>',
    neg: '<path d="M5 9l6 6 4-4 5 5M15 16h5v-5"/>',
    info: '<path d="M12 7h.01M12 11v6"/>'
  };

  function renderSummary() {
    const { sCur, sPrev, cur, prev, bars, barUnit } = view;
    const items = [];
    const rd = change(sCur.revenue, sPrev.revenue);
    items.push([rd >= 0 ? 'pos' : 'neg', `Revenue ${rd >= 0 ? 'grew' : 'fell'} <b>${pct(Math.abs(rd))}</b> to <b>${money.format(sCur.revenue)}</b> versus ${money.format(sPrev.revenue)} in the prior period.`]);

    const od = change(sCur.orders, sPrev.orders), ad = change(sCur.aov, sPrev.aov);
    items.push([od >= 0 ? 'pos' : 'neg', `<b>${int.format(sCur.orders)}</b> orders (${od >= 0 ? '+' : '−'}${pct(Math.abs(od))}); average order value ${ad >= 0 ? 'up' : 'down'} ${pct(Math.abs(ad))} to <b>${money2.format(sCur.aov)}</b>.`]);

    const cats = groupBy(cur, 'category'), pcats = groupBy(prev, 'category');
    const topCat = [...cats].sort((a, b) => b[1].revenue - a[1].revenue)[0];
    if (topCat) items.push(['info', `<b>${esc(topCat[0])}</b> is the top category with ${pct(topCat[1].revenue / (sCur.revenue || 1))} of revenue.`]);

    const regs = groupBy(cur, 'region'), pregs = groupBy(prev, 'region');
    const growth = [...regs].map(([k, v]) => [k, change(v.revenue, (pregs.get(k) || {}).revenue || 0)]).filter(r => isFinite(r[1])).sort((a, b) => b[1] - a[1]);
    if (state.region === 'all' && growth.length > 1) {
      const [best, worst] = [growth[0], growth[growth.length - 1]];
      items.push([best[1] >= 0 ? 'pos' : 'neg', `<b>${esc(best[0])}</b> is the fastest-moving region (${best[1] >= 0 ? '+' : '−'}${pct(Math.abs(best[1]))}); ${esc(worst[0])} trails at ${worst[1] >= 0 ? '+' : '−'}${pct(Math.abs(worst[1]))}.`]);
    } else {
      const chans = groupBy(cur, 'channel');
      const topCh = [...chans].sort((a, b) => b[1].revenue - a[1].revenue)[0];
      if (topCh) items.push(['info', `<b>${esc(topCh[0])}</b> leads channels with ${money.format(topCh[1].revenue)} in revenue.`]);
    }

    const peakI = bars.revenue.indexOf(Math.max(...bars.revenue));
    if (peakI >= 0 && bars.revenue[peakI] > 0) items.push(['info', `Best ${barUnit}: <b>${bucketLabel(bars.keys[peakI], barUnit, true)}</b> with ${money.format(bars.revenue[peakI])} across ${int.format(bars.orders[peakI])} orders.`]);

    const rr = sCur.refundRate, prr = sPrev.refundRate;
    items.push([rr <= prr ? 'pos' : 'neg', `Refund rate is <b>${pct(rr)}</b> (${rr <= prr ? 'down' : 'up'} from ${pct(prr)}).`]);

    $('#insights').innerHTML = items.map(([k, html]) => `<li><span class="ico ${k}"><svg viewBox="0 0 24 24">${ICONS[k]}</svg></span><span>${html}</span></li>`).join('');

    const badge = $('#healthBadge');
    const [label, color] = rd > 0.05 ? ['Strong growth', 'var(--good)'] : rd >= 0 ? ['Steady', 'var(--good)'] : rd > -0.05 ? ['Softening', 'var(--warning)'] : ['Declining', 'var(--critical)'];
    badge.textContent = label;
    badge.style.setProperty('--dot', color);
  }

  function renderCharts() {
    const { lineCur, linePrev, lineUnit, bars, barUnit, cur, prev } = view;
    const n = lineCur.keys.length;
    const prevVals = lineCur.keys.map((_, i) => linePrev.revenue[i] || 0);
    $('#revSub').textContent = `${lineUnit === 'week' ? 'Weekly' : 'Daily'} revenue, current vs. prior period`;
    $('#revLegend').innerHTML = `<span><i style="--c:var(--series-1)"></i>Current</span><span><i class="dash" style="--c:var(--series-prev)"></i>Prior period</span>`;
    const revHost = $('#revChart');
    const longLabels = lineCur.keys.map(k => bucketLabel(k, lineUnit, true));
    if (state.tables.revChart) {
      dataTable(revHost, ['Period', 'Revenue', 'Prior period'], lineCur.keys.map((k, i) => [longLabels[i], money.format(lineCur.revenue[i]), money.format(prevVals[i])]));
    } else {
      lineChart(revHost, {
        labels: lineCur.keys.map(k => bucketLabel(k, lineUnit)),
        longLabels,
        series: [
          { name: 'Current', color: 'var(--series-1)', values: lineCur.revenue, area: true },
          { name: 'Prior period', color: 'var(--series-prev)', values: prevVals, dashed: true, tipName: i => 'Prior · ' + bucketLabel(linePrev.keys[i] || 0, lineUnit) }
        ],
        fmtAxis: moneyCompact, fmtVal: v => money.format(v)
      });
    }

    $('#ordSub').textContent = `Orders per ${barUnit}`;
    const ordHost = $('#ordChart');
    const ordLong = bars.keys.map(k => bucketLabel(k, barUnit, true));
    if (state.tables.ordChart) {
      dataTable(ordHost, ['Period', 'Orders', 'Revenue'], bars.keys.map((k, i) => [ordLong[i], int.format(bars.orders[i]), money.format(bars.revenue[i])]));
    } else {
      columnChart(ordHost, {
        labels: bars.keys.map(k => bucketLabel(k, barUnit)), longLabels: ordLong,
        values: bars.orders, name: 'Orders',
        fmtAxis: v => compact(v), fmtVal: v => int.format(v)
      });
    }

    const cats = groupBy(cur, 'category'), pcats = groupBy(prev, 'category');
    const catRows = [...cats].map(([k, v]) => ({ label: k, value: v.revenue, orders: v.orders, delta: change(v.revenue, (pcats.get(k) || {}).revenue || 0) })).sort((a, b) => b.value - a.value);
    const catHost = $('#catChart');
    if (state.tables.catChart) {
      catHost.style.height = '';
      dataTable(catHost, ['Category', 'Revenue', 'Orders', 'vs. prior'], catRows.map(r => [r.label, money.format(r.value), int.format(r.orders), (r.delta >= 0 ? '+' : '') + pct(r.delta)]));
    } else if (catRows.length) {
      barChart(catHost, catRows, v => money.format(v));
    } else {
      catHost.innerHTML = '<p class="empty">No sales in this period.</p>';
    }
  }

  function renderChannels() {
    const ch = groupBy(view.cur, 'channel');
    const total = [...ch.values()].reduce((a, v) => a + v.revenue, 0) || 1;
    const rows = CHANNELS.map((c, i) => ({ c, color: CHANNEL_COLORS[i], ...(ch.get(c) || { revenue: 0, orders: 0 }) })).filter(r => r.revenue > 0);
    if (!rows.length) { $('#channelMix').innerHTML = '<p class="empty">No sales in this period.</p>'; return; }
    $('#channelMix').innerHTML = `
      <div class="mix-bar" role="img" aria-label="Channel share of revenue">${rows.map(r => `<span data-ch="${esc(r.c)}" style="--c:${r.color};width:${(r.revenue / total) * 100}%"></span>`).join('')}</div>
      <div class="mix-list">${rows.map(r => `
        <div class="mix-row"><span class="sw" style="--c:${r.color}"></span><span>${esc(r.c)}</span><span class="v">${money.format(r.revenue)}</span><span class="p">${pct(r.revenue / total)}</span></div>`).join('')}
      </div>`;
    $$('#channelMix .mix-bar span').forEach((s, i) => {
      const r = rows[i];
      const move = e => showTip(`<div class="t">${esc(r.c)}</div>${tipRow(r.color, 'Revenue', money.format(r.revenue))}${tipRow(r.color, 'Share', pct(r.revenue / total))}${tipRow(r.color, 'Orders', int.format(r.orders))}`, e.clientX, e.clientY);
      s.addEventListener('pointermove', move);
      s.addEventListener('pointerdown', move);
      s.addEventListener('pointerleave', hideTip);
    });
  }

  function renderRegions() {
    const reg = groupBy(view.cur, 'region'), preg = groupBy(view.prev, 'region');
    const rows = REGIONS.map(r => ({ r, v: (reg.get(r) || {}).revenue || 0, d: change((reg.get(r) || {}).revenue || 0, (preg.get(r) || {}).revenue || 0) }))
      .filter(x => x.v > 0).sort((a, b) => b.v - a.v);
    const max = rows.length ? rows[0].v : 1;
    $('#regionList').innerHTML = rows.length ? rows.map(x => `
      <div class="region">
        <span class="name">${esc(x.r)}</span>
        <div class="track"><div class="fill" style="width:${(x.v / max) * 100}%"></div></div>
        <span class="nums"><b>${moneyCompact(x.v)}</b>${deltaHTML(x.d).replace(' <small>vs. prior</small>', '')}</span>
      </div>`).join('') : '<p class="empty">No sales in this period.</p>';
  }

  function renderProducts() {
    const prods = groupBy(view.cur, 'product');
    const total = view.sCur.revenue || 1;
    const catOf = Object.fromEntries(PRODUCTS.map(p => [p[0], p[1]]));
    const rows = [...prods].sort((a, b) => b[1].revenue - a[1].revenue).slice(0, 6);
    const top = rows.length ? rows[0][1].revenue : 1;
    $('#productTable tbody').innerHTML = rows.length ? rows.map(([name, v], i) => `
      <tr>
        <td><div class="prod"><span class="rank">${i + 1}</span>${esc(name)}</div></td>
        <td class="muted hide-sm">${esc(catOf[name])}</td>
        <td class="num">${int.format(v.units)}</td>
        <td class="num"><b>${money.format(v.revenue)}</b></td>
        <td class="num"><span class="share"><span class="track"><span class="fill" style="display:block;width:${(v.revenue / top) * 100}%"></span></span>${pct(v.revenue / total)}</span></td>
      </tr>`).join('') : '<tr><td colspan="5" class="empty">No sales in this period.</td></tr>';
  }

  function ordersList() {
    const q = state.search.trim().toLowerCase();
    const list = view.cur.filter(o =>
      (state.status === 'all' || o.status === state.status) &&
      (!q || o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q) || o.product.toLowerCase().includes(q) || o.channel.toLowerCase().includes(q)));
    const key = state.sort === 'date' ? 'ts' : state.sort;
    const dir = state.dir === 'asc' ? 1 : -1;
    return list.sort((a, b) => {
      const x = a[key], y = b[key];
      return (typeof x === 'number' ? x - y : String(x).localeCompare(String(y))) * dir;
    });
  }

  function renderOrders() {
    const list = ordersList();
    const pages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
    state.page = Math.min(state.page, pages - 1);
    const slice = list.slice(state.page * PAGE_SIZE, (state.page + 1) * PAGE_SIZE);
    $('#ordersTable tbody').innerHTML = slice.length ? slice.map(o => `
      <tr>
        <td><b>${o.id}</b></td>
        <td class="muted">${new Date(o.ts).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</td>
        <td>${esc(o.customer)}</td>
        <td class="hide-sm">${esc(o.product)}${o.qty > 1 ? ` <span class="muted">×${o.qty}</span>` : ''}</td>
        <td class="hide-sm muted">${esc(o.channel)}</td>
        <td><span class="status ${o.status}">${o.status}</span></td>
        <td class="num"><b>${money2.format(o.amount)}</b></td>
      </tr>`).join('') : '<tr><td colspan="7" class="empty">No orders match your filters.</td></tr>';
    $('#ordersCount').textContent = `${int.format(list.length)} order${list.length === 1 ? '' : 's'} in selected period`;
    $('#pageInfo').textContent = list.length ? `${int.format(state.page * PAGE_SIZE + 1)}–${int.format(state.page * PAGE_SIZE + slice.length)} of ${int.format(list.length)}` : '0 results';
    $('#prevPage').disabled = state.page === 0;
    $('#nextPage').disabled = state.page >= pages - 1;
    $$('#ordersTable th button').forEach(b => {
      if (b.dataset.sort === state.sort) b.dataset.dir = state.dir; else delete b.dataset.dir;
      b.closest('th').setAttribute('aria-sort', b.dataset.sort === state.sort ? (state.dir === 'asc' ? 'ascending' : 'descending') : 'none');
    });
  }

  function render() {
    view = compute();
    renderHeader();
    renderKPIs();
    renderSummary();
    renderCharts();
    renderChannels();
    renderRegions();
    renderProducts();
    renderOrders();
  }

  /* ---------- Controls ---------- */

  function fillSelect(sel, items) {
    for (const v of items) { const o = document.createElement('option'); o.value = v; o.textContent = v; sel.appendChild(o); }
  }
  fillSelect($('#regionSelect'), REGIONS);
  fillSelect($('#channelSelect'), CHANNELS);

  const segButtons = $$('#rangeSeg button');
  segButtons.forEach(b => b.addEventListener('click', () => {
    segButtons.forEach(x => x.setAttribute('aria-checked', String(x === b)));
    state.range = +b.dataset.range; state.page = 0;
    render();
  }));
  $('#rangeSeg').addEventListener('keydown', e => {
    const i = segButtons.findIndex(b => b.getAttribute('aria-checked') === 'true');
    const dirn = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!dirn) return;
    e.preventDefault();
    const next = segButtons[(i + dirn + segButtons.length) % segButtons.length];
    next.focus(); next.click();
  });
  $('#regionSelect').addEventListener('change', e => { state.region = e.target.value; state.page = 0; render(); });
  $('#channelSelect').addEventListener('change', e => { state.channel = e.target.value; state.page = 0; render(); });
  $('#statusSelect').addEventListener('change', e => { state.status = e.target.value; state.page = 0; renderOrders(); });
  let searchTimer;
  $('#orderSearch').addEventListener('input', e => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => { state.search = e.target.value; state.page = 0; renderOrders(); }, 120);
  });
  $$('#ordersTable th button').forEach(b => b.addEventListener('click', () => {
    if (state.sort === b.dataset.sort) state.dir = state.dir === 'asc' ? 'desc' : 'asc';
    else { state.sort = b.dataset.sort; state.dir = ['amount', 'date'].includes(state.sort) ? 'desc' : 'asc'; }
    state.page = 0; renderOrders();
  }));
  $('#prevPage').addEventListener('click', () => { state.page--; renderOrders(); });
  $('#nextPage').addEventListener('click', () => { state.page++; renderOrders(); });

  $$('[data-table-toggle]').forEach(b => b.addEventListener('click', () => {
    const id = b.dataset.tableToggle;
    state.tables[id] = !state.tables[id];
    b.setAttribute('aria-pressed', String(state.tables[id]));
    b.textContent = state.tables[id] ? 'Chart' : 'Table';
    renderCharts();
  }));

  $('#themeToggle').addEventListener('click', () => {
    const root = document.documentElement;
    const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark';
    try { localStorage.setItem('pulse-theme', root.dataset.theme); } catch (e) {}
  });

  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg; t.hidden = false;
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => { t.hidden = true; }, 2400);
  }

  $('#exportBtn').addEventListener('click', () => {
    const list = ordersList();
    const cell = v => /[",\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : String(v);
    const lines = [['Order ID', 'Date', 'Customer', 'Product', 'Category', 'Channel', 'Region', 'Quantity', 'Amount', 'Status']]
      .concat(list.map(o => [o.id, new Date(o.ts).toISOString(), o.customer, o.product, o.category, o.channel, o.region, o.qty, o.amount.toFixed(2), o.status]))
      .map(r => r.map(cell).join(','));
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `orders-${new Date(view.p.start).toISOString().slice(0, 10)}-to-${new Date(view.p.end).toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    toast(`Exported ${int.format(list.length)} order${list.length === 1 ? '' : 's'}`);
  });

  let lastW = 0, resizeTimer;
  new ResizeObserver(entries => {
    const w = entries[0].contentRect.width;
    if (Math.abs(w - lastW) < 2) return;
    lastW = w;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { hideTip(); renderCharts(); }, 80);
  }).observe($('main'));

  $('#updated').textContent = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
  render();
})();
