/**
 * Apex Enterprise Business Intelligence & Revenue Command Center
 * Pure Vanilla JavaScript ES2022 - High Performance Reactive Engine
 */

(() => {
  'use strict';

  // --- Exchange Rates & Currencies ---
  const CURRENCIES = {
    USD: { symbol: '$', rate: 1.0, decimals: 2 },
    EUR: { symbol: '€', rate: 0.92, decimals: 2 },
    GBP: { symbol: '£', rate: 0.79, decimals: 2 },
    JPY: { symbol: '¥', rate: 152.0, decimals: 0 }
  };

  // --- Catalog of Products ---
  const PRODUCTS = [
    { id: 'PRD-01', name: 'Quantum AI Terminal X1', category: 'Enterprise Cloud & Tech', price: 899, cost: 420, sku: 'QAI-TX1' },
    { id: 'PRD-02', name: 'Horizon Wireless ANC Headphones', category: 'Audio & Sound Systems', price: 349, cost: 135, sku: 'HZN-ANC' },
    { id: 'PRD-03', name: 'Apex Motorized Standing Desk', category: 'Workspace & Ergonomics', price: 780, cost: 360, sku: 'APX-DSK' },
    { id: 'PRD-04', name: 'Neural Edge Compute Station', category: 'Enterprise Cloud & Tech', price: 1299, cost: 680, sku: 'NRL-ECS' },
    { id: 'PRD-05', name: 'Studio Reference Monitors 8"', category: 'Audio & Sound Systems', price: 499, cost: 210, sku: 'SRM-800' },
    { id: 'PRD-06', name: 'Aerodynamic Task Chair Pro', category: 'Workspace & Ergonomics', price: 540, cost: 230, sku: 'AER-TCP' },
    { id: 'PRD-07', name: 'Aura Circadian Ambient Light', category: 'Smart Living & Lighting', price: 129, cost: 44, sku: 'AUR-CAL' },
    { id: 'PRD-08', name: 'Modular Commuter Backpack 30L', category: 'Apparel & Carry', price: 185, cost: 62, sku: 'MOD-BP3' },
    { id: 'PRD-09', name: 'Deep Tissue Percussion Gun Pro', category: 'Wellness & Recovery', price: 199, cost: 75, sku: 'DTP-GNP' },
    { id: 'PRD-10', name: 'UltraWide Pro Curved Display 34"', category: 'Enterprise Cloud & Tech', price: 649, cost: 310, sku: 'UWP-34C' },
    { id: 'PRD-11', name: 'Spatial Audio Soundbar Max', category: 'Audio & Sound Systems', price: 279, cost: 110, sku: 'SPS-BAR' },
    { id: 'PRD-12', name: 'Smart Climate & Air Hub', category: 'Smart Living & Lighting', price: 99, cost: 38, sku: 'SMC-AHB' },
    { id: 'PRD-13', name: 'Weatherproof Field Jacket', category: 'Apparel & Carry', price: 240, cost: 88, sku: 'WPF-JKT' },
    { id: 'PRD-14', name: 'Merino Wool Performance Hoodie', category: 'Apparel & Carry', price: 130, cost: 42, sku: 'MRN-HOD' },
    { id: 'PRD-15', name: 'Ergonomic Thermal Eye Massager', category: 'Wellness & Recovery', price: 89, cost: 28, sku: 'ERG-TEM' },
    { id: 'PRD-16', name: 'Smart Vacuum Hydro Flask 32oz', category: 'Wellness & Recovery', price: 65, cost: 19, sku: 'SVH-F32' }
  ];

  const CHANNELS = [
    { name: 'Direct E-Commerce', color: 'var(--chart-primary)', weight: 0.42 },
    { name: 'B2B Enterprise Wholesale', color: 'var(--chart-secondary)', weight: 0.28 },
    { name: 'Marketplace Partnerships', color: 'var(--chart-tertiary)', weight: 0.16 },
    { name: 'Retail Flagship POS', color: 'var(--chart-quaternary)', weight: 0.09 },
    { name: 'Partner Affiliates', color: 'var(--chart-quinary)', weight: 0.05 }
  ];

  const REGIONS = [
    { name: 'North America', weight: 0.44, growth: '+14.8%' },
    { name: 'Europe', weight: 0.28, growth: '+11.2%' },
    { name: 'Asia-Pacific', weight: 0.18, growth: '+28.4%' },
    { name: 'Latin America', weight: 0.06, growth: '+19.5%' },
    { name: 'Middle East & Africa', weight: 0.04, growth: '+16.1%' }
  ];

  const FIRST_NAMES = ['Elena', 'Marcus', 'Sophia', 'Alexander', 'Chloe', 'Liam', 'Aria', 'Noah', 'Zoe', 'Lucas', 'Priya', 'Julian', 'Isabella', 'David', 'Kaito', 'Olivia', 'Mateo', 'Emma', 'Hiroshi', 'Amara'];
  const LAST_NAMES = ['Vance', 'Lindqvist', 'Chen', 'Rodriguez', 'Mercer', 'Tanaka', 'Kowalski', 'Dubois', 'Sterling', 'O’Connor', 'Patel', 'Novak', 'Santoro', 'Bergman', 'Kim', 'Al-Mansoor'];
  const DOMAINS = ['acme.corp', 'hyperion.io', 'nexustech.org', 'strata.co', 'vanguard.net', 'globalretail.com', 'innovate.ai', 'outlook.com', 'gmail.com'];

  // Seedable Pseudo Random Number Generator (PRNG - Mulberry32)
  function createRng(seed) {
    return function() {
      let t = (seed += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function pickWeighted(rng, items, weights) {
    let total = weights.reduce((a, b) => a + b, 0);
    let r = rng() * total;
    for (let i = 0; i < items.length; i++) {
      r -= weights[i];
      if (r <= 0) return items[i];
    }
    return items[items.length - 1];
  }

  // Generate 730 days of realistic commerce data
  const MS_PER_DAY = 86400000;
  const REF_DATE = new Date('2026-10-30T18:00:00Z').getTime();
  const TOTAL_HISTORY_DAYS = 730;

  function generateTransactions() {
    const rng = createRng(20261030);
    const orders = [];
    let orderSeq = 108420;

    for (let dayOffset = TOTAL_HISTORY_DAYS - 1; dayOffset >= 0; dayOffset--) {
      const dayTimestamp = REF_DATE - dayOffset * MS_PER_DAY;
      const dateObj = new Date(dayTimestamp);
      const dow = dateObj.getUTCDay();
      const month = dateObj.getUTCMonth();

      // Trend: secular annual growth (~28% over 2 years)
      const secularFactor = 0.82 + (1 - dayOffset / TOTAL_HISTORY_DAYS) * 0.45;
      // Day of week factor: weekends higher for direct, weekdays higher for B2B
      const dowFactor = [1.15, 0.94, 0.98, 1.02, 1.08, 1.18, 1.25][dow];
      // Seasonality: Nov/Dec holiday spike, Jan dip, July prime days
      let seasonalFactor = 1.0;
      if (month === 10) seasonalFactor = 1.35; // November (Black Friday / Cyber Week)
      else if (month === 11) seasonalFactor = 1.52; // December holidays
      else if (month === 0) seasonalFactor = 0.85; // January lull
      else if (month === 6) seasonalFactor = 1.15; // July prime sale

      // Daily orders count
      const expectedOrders = Math.round(26 * secularFactor * dowFactor * seasonalFactor * (0.88 + rng() * 0.25));
      const dailyOrdersCount = Math.max(8, expectedOrders);

      for (let i = 0; i < dailyOrdersCount; i++) {
        const orderId = `APX-${orderSeq++}`;
        const prod = PRODUCTS[Math.floor(Math.pow(rng(), 1.2) * PRODUCTS.length)];
        const channelObj = pickWeighted(rng, CHANNELS, CHANNELS.map(c => c.weight));
        const regionObj = pickWeighted(rng, REGIONS, REGIONS.map(r => r.weight));

        // Quantity: wholesale has higher basket size
        let qty = 1;
        if (channelObj.name === 'B2B Enterprise Wholesale') {
          qty = 2 + Math.floor(rng() * 6);
        } else if (rng() < 0.28) {
          qty = 2 + Math.floor(rng() * 2);
        }

        // Slight promotional discount on some transactions
        const discountRate = rng() < 0.2 ? 0.9 : 1.0;
        const totalAmount = Math.round(prod.price * qty * discountRate * 100) / 100;
        const totalCost = Math.round(prod.cost * qty * 100) / 100;
        const profit = Math.round((totalAmount - totalCost) * 100) / 100;

        // Status assignment
        let status = 'Completed';
        const stRoll = rng();
        if (dayOffset <= 4 && stRoll < 0.35) {
          status = 'Processing';
        } else if (stRoll < 0.025) {
          status = 'Cancelled';
        } else if (stRoll < 0.045) {
          status = 'Refunded';
        }

        const firstName = FIRST_NAMES[Math.floor(rng() * FIRST_NAMES.length)];
        const lastName = LAST_NAMES[Math.floor(rng() * LAST_NAMES.length)];
        const domain = DOMAINS[Math.floor(rng() * DOMAINS.length)];
        const customerName = `${firstName} ${lastName}`;
        const customerEmail = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;

        // Random hour of day
        const orderTime = dayTimestamp + Math.floor(rng() * MS_PER_DAY);

        orders.push({
          id: orderId,
          timestamp: orderTime,
          dateString: new Date(orderTime).toISOString().split('T')[0],
          customer: customerName,
          email: customerEmail,
          productId: prod.id,
          productName: prod.name,
          category: prod.category,
          sku: prod.sku,
          unitPrice: prod.price,
          unitCost: prod.cost,
          qty: qty,
          amount: totalAmount,
          cost: totalCost,
          profit: profit,
          channel: channelObj.name,
          region: regionObj.name,
          status: status
        });
      }
    }
    return orders;
  }

  // Initialize master transaction dataset
  let ALL_ORDERS = generateTransactions();

  // --- Reactive Application State ---
  const state = {
    range: 30, // 1, 7, 30, 90, 365, 'all'
    category: 'all',
    channel: 'all',
    region: 'all',
    currency: 'USD',
    chartMetric: 'revenue', // 'revenue', 'orders', 'aov'
    chartAgg: 'daily', // 'daily', 'weekly', 'monthly'
    showChartTable: false,
    orderSearch: '',
    orderStatus: 'all',
    orderPage: 1,
    orderPageSize: 15,
    orderSortCol: 'date',
    orderSortDir: 'desc'
  };

  // --- Currency Formatter ---
  function formatMoney(amount, currencyCode = state.currency) {
    const cur = CURRENCIES[currencyCode] || CURRENCIES.USD;
    const converted = amount * cur.rate;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: cur.decimals,
      maximumFractionDigits: cur.decimals
    }).format(converted);
  }

  function formatNumber(num) {
    return new Intl.NumberFormat('en-US').format(num);
  }

  function formatPercent(num, withSign = true) {
    const prefix = withSign && num > 0 ? '+' : '';
    return `${prefix}${num.toFixed(1)}%`;
  }

  // --- Date Range Helper ---
  function getTimeBounds() {
    const end = REF_DATE;
    let days = typeof state.range === 'number' ? state.range : TOTAL_HISTORY_DAYS;
    const start = end - days * MS_PER_DAY;
    const priorStart = start - days * MS_PER_DAY;
    const priorEnd = start;
    return { start, end, priorStart, priorEnd, days };
  }

  // --- Filter Core Orders ---
  function getFilteredOrders(forPrior = false) {
    const bounds = getTimeBounds();
    const tStart = forPrior ? bounds.priorStart : bounds.start;
    const tEnd = forPrior ? bounds.priorEnd : bounds.end;

    return ALL_ORDERS.filter(o => {
      if (o.timestamp < tStart || o.timestamp > tEnd) return false;
      if (state.category !== 'all' && o.category !== state.category) return false;
      if (state.channel !== 'all' && o.channel !== state.channel) return false;
      if (state.region !== 'all' && o.region !== state.region) return false;
      return true;
    });
  }

  // --- Aggregate Metrics ---
  function computeMetrics(ordersList) {
    let grossRevenue = 0;
    let netProfit = 0;
    let totalUnits = 0;
    let completedOrders = 0;
    let refundedOrders = 0;
    let cancelledOrders = 0;

    for (const o of ordersList) {
      if (o.status !== 'Cancelled') {
        grossRevenue += o.amount;
        netProfit += o.profit;
        totalUnits += o.qty;
      }
      if (o.status === 'Completed' || o.status === 'Processing') completedOrders++;
      else if (o.status === 'Refunded') refundedOrders++;
      else if (o.status === 'Cancelled') cancelledOrders++;
    }

    const totalOrders = ordersList.length;
    const aov = totalOrders > 0 ? grossRevenue / totalOrders : 0;
    const basketSize = totalOrders > 0 ? (totalUnits / totalOrders).toFixed(1) : '1.0';
    const marginRate = grossRevenue > 0 ? (netProfit / grossRevenue) * 100 : 0;
    const returnRate = totalOrders > 0 ? (refundedOrders / totalOrders) * 100 : 0;

    return {
      grossRevenue,
      netProfit,
      totalOrders,
      totalUnits,
      completedOrders,
      refundedOrders,
      cancelledOrders,
      aov,
      basketSize,
      marginRate,
      returnRate
    };
  }

  // --- Generate SVG Sparkline Path ---
  function generateSparkline(dataPoints, width = 72, height = 28, strokeColor = 'var(--primary)', fillColor = 'var(--primary-subtle)') {
    if (!dataPoints || dataPoints.length < 2) return '';
    const min = Math.min(...dataPoints);
    const max = Math.max(...dataPoints);
    const range = max - min || 1;
    const padding = 3;
    const innerW = width - padding * 2;
    const innerH = height - padding * 2;

    const coords = dataPoints.map((val, idx) => {
      const x = padding + (idx / (dataPoints.length - 1)) * innerW;
      const y = height - padding - ((val - min) / range) * innerH;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });

    const linePath = `M ${coords.join(' L ')}`;
    const areaPath = `${linePath} L ${width - padding},${height} L ${padding},${height} Z`;

    return `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="overflow:visible;" aria-hidden="true">
        <path d="${areaPath}" fill="${fillColor}" opacity="0.3" />
        <path d="${linePath}" fill="none" stroke="${strokeColor}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    `;
  }

  // --- Update KPI Ribbon Cards ---
  function updateKPIs(currMetrics, priorMetrics, currOrders) {
    // 1. Gross Revenue
    const revEl = document.getElementById('kpi-rev-val');
    revEl.textContent = formatMoney(currMetrics.grossRevenue);
    const revDiff = priorMetrics.grossRevenue > 0
      ? ((currMetrics.grossRevenue - priorMetrics.grossRevenue) / priorMetrics.grossRevenue) * 100
      : 0;
    const revBadge = document.getElementById('kpi-rev-badge');
    revBadge.textContent = formatPercent(revDiff);
    revBadge.className = `kpi-badge ${revDiff >= 0 ? 'positive' : 'negative'}`;
    document.getElementById('kpi-rev-prior').textContent = formatMoney(priorMetrics.grossRevenue);

    // 2. Total Orders
    const ordEl = document.getElementById('kpi-ord-val');
    ordEl.textContent = formatNumber(currMetrics.totalOrders);
    const ordDiff = priorMetrics.totalOrders > 0
      ? ((currMetrics.totalOrders - priorMetrics.totalOrders) / priorMetrics.totalOrders) * 100
      : 0;
    const ordBadge = document.getElementById('kpi-ord-badge');
    ordBadge.textContent = formatPercent(ordDiff);
    ordBadge.className = `kpi-badge ${ordDiff >= 0 ? 'positive' : 'negative'}`;
    document.getElementById('kpi-ord-prior').textContent = formatNumber(priorMetrics.totalOrders);

    // 3. AOV
    const aovEl = document.getElementById('kpi-aov-val');
    aovEl.textContent = formatMoney(currMetrics.aov);
    const aovDiff = priorMetrics.aov > 0 ? ((currMetrics.aov - priorMetrics.aov) / priorMetrics.aov) * 100 : 0;
    const aovBadge = document.getElementById('kpi-aov-badge');
    aovBadge.textContent = formatPercent(aovDiff);
    aovBadge.className = `kpi-badge ${aovDiff >= 0 ? 'positive' : 'negative'}`;
    document.getElementById('kpi-basket-size').textContent = `${currMetrics.basketSize} items`;

    // 4. Net Profit & Margin
    const profitEl = document.getElementById('kpi-profit-val');
    profitEl.textContent = formatMoney(currMetrics.netProfit);
    const marginBadge = document.getElementById('kpi-margin-badge');
    marginBadge.textContent = `${currMetrics.marginRate.toFixed(1)}% margin`;
    document.getElementById('kpi-margin-val').textContent = `${currMetrics.marginRate.toFixed(1)}%`;

    // 5. Conversion Rate
    const convRate = 3.65 + (revDiff > 0 ? 0.35 : -0.2);
    document.getElementById('kpi-conv-val').textContent = `${convRate.toFixed(2)}%`;
    const convBadge = document.getElementById('kpi-conv-badge');
    convBadge.textContent = `${revDiff >= 0 ? '+0.4%' : '-0.2%'}`;

    // 6. Return Rate
    document.getElementById('kpi-return-val').textContent = `${currMetrics.returnRate.toFixed(2)}%`;
    const returnBadge = document.getElementById('kpi-return-badge');
    returnBadge.textContent = `${currMetrics.returnRate < 2.5 ? 'Optimal' : 'Elevated'}`;

    // Generate daily buckets for sparklines
    const dayBuckets = {};
    for (const o of currOrders) {
      dayBuckets[o.dateString] = (dayBuckets[o.dateString] || 0) + o.amount;
    }
    const dates = Object.keys(dayBuckets).sort();
    const dailyRevs = dates.map(d => dayBuckets[d]);

    if (dailyRevs.length >= 2) {
      document.getElementById('sparkline-rev').innerHTML = generateSparkline(dailyRevs, 72, 28, 'var(--primary)', 'var(--primary-subtle)');
      document.getElementById('sparkline-ord').innerHTML = generateSparkline(dailyRevs.map(v => Math.round(v / 140)), 72, 28, 'var(--accent-cyan)', 'var(--accent-cyan-subtle)');
      document.getElementById('sparkline-aov').innerHTML = generateSparkline(dailyRevs.map(v => 120 + (v % 50)), 72, 28, 'var(--accent-violet)', 'var(--accent-violet-subtle)');
      document.getElementById('sparkline-profit').innerHTML = generateSparkline(dailyRevs.map(v => v * 0.32), 72, 28, 'var(--success)', 'var(--success-bg)');
    }
  }

  // --- Executive AI Performance Summary Engine ---
  function updateBriefing(currMetrics, priorMetrics, currOrders) {
    const revDiff = priorMetrics.grossRevenue > 0
      ? ((currMetrics.grossRevenue - priorMetrics.grossRevenue) / priorMetrics.grossRevenue) * 100
      : 0;

    // Calculate health score (0-100)
    let score = 86;
    if (revDiff > 10) score += 8;
    else if (revDiff > 0) score += 4;
    else score -= 6;
    if (currMetrics.marginRate > 30) score += 4;
    if (currMetrics.returnRate < 2.5) score += 2;
    score = Math.min(99, Math.max(68, score));

    const healthText = document.getElementById('health-score-text');
    let ratingTier = score >= 90 ? 'Exceptional' : score >= 80 ? 'Strong Performance' : 'Stable Growth';
    healthText.textContent = `Business Health: ${score}/100 (${ratingTier})`;

    // Target pacing calculation
    const quarterlyTarget = 1500000;
    const progressPercent = Math.min(100, Math.round((currMetrics.grossRevenue / quarterlyTarget) * 100));
    document.getElementById('target-goal-text').textContent = formatMoney(quarterlyTarget);
    document.getElementById('target-progress-fill').style.width = `${progressPercent}%`;
    document.getElementById('target-percent-text').textContent = `${progressPercent}% Achieved`;

    // Category breakdown
    const catTotals = {};
    for (const o of currOrders) {
      catTotals[o.category] = (catTotals[o.category] || 0) + o.amount;
    }
    const topCatEntry = Object.entries(catTotals).sort((a, b) => b[1] - a[1])[0] || ['All Categories', 0];

    // Channel breakdown
    const chTotals = {};
    for (const o of currOrders) {
      chTotals[o.channel] = (chTotals[o.channel] || 0) + o.amount;
    }
    const topChannelEntry = Object.entries(chTotals).sort((a, b) => b[1] - a[1])[0] || ['Direct E-Commerce', 0];
    const channelShare = currMetrics.grossRevenue > 0 ? ((topChannelEntry[1] / currMetrics.grossRevenue) * 100).toFixed(0) : '40';

    // Regional breakdown
    const regTotals = {};
    for (const o of currOrders) {
      regTotals[o.region] = (regTotals[o.region] || 0) + o.amount;
    }
    const topRegEntry = Object.entries(regTotals).sort((a, b) => b[1] - a[1])[0] || ['North America', 0];

    const insights = [
      {
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>',
        title: 'Revenue Trajectory',
        text: `Gross revenue expanded by <strong>${formatPercent(revDiff)}</strong> vs. the prior period, generating <strong>${formatMoney(currMetrics.grossRevenue)}</strong> with a robust net profit margin of <strong>${currMetrics.marginRate.toFixed(1)}%</strong>.`
      },
      {
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>',
        title: 'Product Leadership',
        text: `<strong>${topCatEntry[0]}</strong> remains the dominant revenue engine, contributing <strong>${formatMoney(topCatEntry[1])}</strong> with rapid repeat order velocity across key SKUs.`
      },
      {
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>',
        title: 'Channel Efficiency',
        text: `<strong>${topChannelEntry[0]}</strong> captures <strong>${channelShare}%</strong> of overall volume. Wholesale basket sizes delivered an exceptional average order value of <strong>${formatMoney(currMetrics.aov)}</strong>.`
      },
      {
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>',
        title: 'Strategic Recommendation',
        text: `Regional expansion in <strong>${topRegEntry[0]}</strong> is outpacing initial forecasts. Recommend optimizing local fulfillment nodes to sustain <strong>${currMetrics.returnRate.toFixed(1)}%</strong> low refund levels.`
      }
    ];

    const container = document.getElementById('insights-container');
    container.innerHTML = insights.map(item => `
      <div class="insight-pill">
        <div class="insight-pill-header">
          ${item.icon}
          <span>${item.title}</span>
        </div>
        <p class="insight-pill-text">${item.text}</p>
      </div>
    `).join('');
  }

  // --- Interactive Main Line / Area Trend Chart (SVG) ---
  function renderMainChart(currOrders, priorOrders) {
    const svg = document.getElementById('main-svg');
    const bounds = getTimeBounds();

    // Group current and prior by aggregation level
    function bucketOrders(orders, isPrior = false) {
      const buckets = {};
      for (const o of orders) {
        let key = o.dateString;
        if (state.chartAgg === 'weekly') {
          const d = new Date(o.timestamp);
          const firstDay = new Date(d.setDate(d.getDate() - d.getDay())).toISOString().split('T')[0];
          key = firstDay;
        } else if (state.chartAgg === 'monthly') {
          key = o.dateString.substring(0, 7);
        }

        if (!buckets[key]) {
          buckets[key] = { revenue: 0, orders: 0, units: 0 };
        }
        buckets[key].revenue += o.amount;
        buckets[key].orders += 1;
        buckets[key].units += o.qty;
      }
      return buckets;
    }

    const currBuckets = bucketOrders(currOrders, false);
    const priorBuckets = bucketOrders(priorOrders, true);

    const sortedKeys = Object.keys(currBuckets).sort();
    const priorKeys = Object.keys(priorBuckets).sort();

    if (sortedKeys.length === 0) {
      svg.innerHTML = `<text x="50%" y="50%" text-anchor="middle" fill="var(--text-muted)" font-size="14">No transaction data matching current filters</text>`;
      return;
    }

    // Determine values according to active metric
    const getVal = (bucket) => {
      if (!bucket) return 0;
      if (state.chartMetric === 'revenue') return bucket.revenue;
      if (state.chartMetric === 'orders') return bucket.orders;
      if (state.chartMetric === 'aov') return bucket.orders > 0 ? bucket.revenue / bucket.orders : 0;
      return bucket.revenue;
    };

    const currData = sortedKeys.map(k => ({ key: k, val: getVal(currBuckets[k]) }));
    const priorData = priorKeys.map(k => ({ key: k, val: getVal(priorBuckets[k]) }));

    // SVG Layout Dimensions
    const width = 800;
    const height = 280;
    const padLeft = 60;
    const padRight = 20;
    const padTop = 20;
    const padBottom = 35;
    const plotW = width - padLeft - padRight;
    const plotH = height - padTop - padBottom;

    const allVals = [...currData.map(d => d.val), ...priorData.map(d => d.val)];
    const maxVal = Math.max(...allVals, 1) * 1.12;
    const minVal = 0;

    const getX = (idx, total) => padLeft + (idx / Math.max(total - 1, 1)) * plotW;
    const getY = (val) => padTop + plotH - ((val - minVal) / (maxVal - minVal)) * plotH;

    // Grid lines & Y-axis labels
    const yTicks = 4;
    let gridLinesSvg = '';
    for (let i = 0; i <= yTicks; i++) {
      const tickVal = minVal + (i / yTicks) * (maxVal - minVal);
      const y = getY(tickVal);
      const formattedLabel = state.chartMetric === 'orders' ? Math.round(tickVal) : formatMoney(tickVal);
      gridLinesSvg += `
        <line x1="${padLeft}" y1="${y}" x2="${width - padRight}" y2="${y}" stroke="var(--chart-grid)" stroke-dasharray="3 3" stroke-width="1" />
        <text x="${padLeft - 10}" y="${y + 4}" text-anchor="end" font-size="10.5" fill="var(--text-muted)" font-family="var(--font-sans)">${formattedLabel}</text>
      `;
    }

    // X-axis dates
    let xTicksSvg = '';
    const xStep = Math.ceil(currData.length / 6) || 1;
    currData.forEach((d, idx) => {
      if (idx % xStep === 0 || idx === currData.length - 1) {
        const x = getX(idx, currData.length);
        const label = d.key.length > 7 ? d.key.substring(5) : d.key;
        xTicksSvg += `<text x="${x}" y="${height - 10}" text-anchor="middle" font-size="10.5" fill="var(--text-muted)">${label}</text>`;
      }
    });

    // Build Current Period SVG Path
    const currCoords = currData.map((d, i) => `${getX(i, currData.length).toFixed(1)},${getY(d.val).toFixed(1)}`);
    const currLinePath = `M ${currCoords.join(' L ')}`;
    const currAreaPath = `${currLinePath} L ${padLeft + plotW},${padTop + plotH} L ${padLeft},${padTop + plotH} Z`;

    // Build Prior Period SVG Path (Comparison dashed line)
    let priorLineSvg = '';
    if (priorData.length > 1) {
      const priorCoords = priorData.map((d, i) => `${getX(i, priorData.length).toFixed(1)},${getY(d.val).toFixed(1)}`);
      priorLineSvg = `<path d="M ${priorCoords.join(' L ')}" fill="none" stroke="var(--text-dim)" stroke-width="1.8" stroke-dasharray="4 4" opacity="0.6" />`;
    }

    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.innerHTML = `
      <defs>
        <linearGradient id="mainAreaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--chart-primary)" stop-opacity="0.32" />
          <stop offset="100%" stop-color="var(--chart-primary)" stop-opacity="0.0" />
        </linearGradient>
      </defs>
      ${gridLinesSvg}
      ${xTicksSvg}
      ${priorLineSvg}
      <path d="${currAreaPath}" fill="url(#mainAreaGrad)" />
      <path d="${currLinePath}" fill="none" stroke="var(--chart-primary)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      <g id="interactive-hit-layer"></g>
    `;

    // Interactive Hover Tracking Layer
    const hitLayer = document.getElementById('interactive-hit-layer');
    const tooltip = document.getElementById('chart-tooltip');

    currData.forEach((d, i) => {
      const cx = getX(i, currData.length);
      const cy = getY(d.val);
      const priorVal = priorData[i] ? priorData[i].val : 0;
      const diffPercent = priorVal > 0 ? ((d.val - priorVal) / priorVal) * 100 : 0;

      const hitBox = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      const boxW = plotW / currData.length;
      hitBox.setAttribute('x', cx - boxW / 2);
      hitBox.setAttribute('y', padTop);
      hitBox.setAttribute('width', boxW);
      hitBox.setAttribute('height', plotH);
      hitBox.setAttribute('fill', 'transparent');
      hitBox.style.cursor = 'crosshair';

      hitBox.addEventListener('mouseenter', () => {
        hitBox.setAttribute('fill', 'rgba(79, 70, 229, 0.04)');
        tooltip.classList.add('visible');
        tooltip.innerHTML = `
          <div class="tooltip-date">${d.key}</div>
          <div class="tooltip-row">
            <span><span class="tooltip-dot" style="background:var(--chart-primary)"></span>Current</span>
            <strong>${state.chartMetric === 'orders' ? formatNumber(d.val) : formatMoney(d.val)}</strong>
          </div>
          <div class="tooltip-row">
            <span><span class="tooltip-dot" style="background:var(--text-dim)"></span>Prior Period</span>
            <span>${state.chartMetric === 'orders' ? formatNumber(priorVal) : formatMoney(priorVal)}</span>
          </div>
          <div class="tooltip-row" style="margin-top:4px; font-weight:600; color:${diffPercent >= 0 ? 'var(--success)' : 'var(--danger)'}">
            <span>Variance</span>
            <span>${formatPercent(diffPercent)}</span>
          </div>
        `;

        const hostRect = document.getElementById('main-chart-host').getBoundingClientRect();
        const tooltipX = (cx / width) * hostRect.width;
        const tooltipY = (cy / height) * hostRect.height;
        tooltip.style.left = `${tooltipX}px`;
        tooltip.style.top = `${tooltipY}px`;
      });

      hitBox.addEventListener('mouseleave', () => {
        hitBox.setAttribute('fill', 'transparent');
        tooltip.classList.remove('visible');
      });

      hitLayer.appendChild(hitBox);
    });

    // Populate Accessible Table Fallback
    const tableBody = document.querySelector('#chart-accessible-table tbody');
    tableBody.innerHTML = currData.map((d, i) => {
      const pVal = priorData[i] ? priorData[i].val : 0;
      const diff = pVal > 0 ? ((d.val - pVal) / pVal) * 100 : 0;
      return `
        <tr>
          <td><strong>${d.key}</strong></td>
          <td class="num-cell">${state.chartMetric === 'orders' ? formatNumber(d.val) : formatMoney(d.val)}</td>
          <td class="num-cell">${state.chartMetric === 'orders' ? formatNumber(pVal) : formatMoney(pVal)}</td>
          <td class="num-cell" style="color:${diff >= 0 ? 'var(--success)' : 'var(--danger)'}">${formatPercent(diff)}</td>
        </tr>
      `;
    }).join('');
  }

  // --- Donut Chart for Sales by Channel ---
  function renderChannelDonut(currOrders, currMetrics) {
    const svg = document.getElementById('donut-svg');
    const legendEl = document.getElementById('channel-legend');
    const totalValEl = document.getElementById('donut-total-val');

    totalValEl.textContent = formatMoney(currMetrics.grossRevenue);

    // Calculate totals per channel
    const totals = {};
    for (const c of CHANNELS) totals[c.name] = 0;
    for (const o of currOrders) {
      if (o.status !== 'Cancelled') {
        totals[o.channel] = (totals[o.channel] || 0) + o.amount;
      }
    }

    const total = Object.values(totals).reduce((a, b) => a + b, 0) || 1;
    const r = 68;
    const cx = 90;
    const cy = 90;
    const circumference = 2 * Math.PI * r;

    let cumulativeOffset = 0;
    let pathsSvg = '';
    let legendHtml = '';

    CHANNELS.forEach((ch, idx) => {
      const amount = totals[ch.name] || 0;
      const share = (amount / total) * 100;
      const strokeLength = (share / 100) * circumference;
      const dashArray = `${strokeLength.toFixed(2)} ${(circumference - strokeLength).toFixed(2)}`;
      const strokeOffset = -cumulativeOffset;
      cumulativeOffset += strokeLength;

      pathsSvg += `
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="none"
          stroke="${ch.color}" stroke-width="22"
          stroke-dasharray="${dashArray}"
          stroke-dashoffset="${strokeOffset}"
          stroke-linecap="round"
          style="transition: stroke-width 0.2s ease; cursor:pointer;"
          data-channel="${ch.name}"
        />
      `;

      legendHtml += `
        <div class="legend-item" data-channel="${ch.name}">
          <div class="legend-name">
            <span class="legend-color" style="background:${ch.color}"></span>
            <span>${ch.name}</span>
          </div>
          <div class="legend-numbers">
            <strong>${formatMoney(amount)}</strong>
            <span>${share.toFixed(1)}%</span>
          </div>
        </div>
      `;
    });

    svg.innerHTML = `
      <g transform="rotate(-90 ${cx} ${cy})">
        ${pathsSvg}
      </g>
    `;
    legendEl.innerHTML = legendHtml;

    // Interactive Hover on Slices
    svg.querySelectorAll('circle').forEach(circle => {
      circle.addEventListener('mouseenter', () => circle.setAttribute('stroke-width', '26'));
      circle.addEventListener('mouseleave', () => circle.setAttribute('stroke-width', '22'));
    });
  }

  // --- Category Contribution Bars ---
  function renderCategoryBars(currOrders, currMetrics) {
    const container = document.getElementById('category-bars-container');
    const catMap = {};
    for (const o of currOrders) {
      if (o.status !== 'Cancelled') {
        catMap[o.category] = (catMap[o.category] || 0) + o.amount;
      }
    }

    const total = currMetrics.grossRevenue || 1;
    const sorted = Object.entries(catMap).sort((a, b) => b[1] - a[1]);
    const palette = ['var(--chart-primary)', 'var(--chart-secondary)', 'var(--chart-tertiary)', 'var(--chart-quaternary)', 'var(--chart-quinary)', '#ec4899'];

    container.innerHTML = sorted.map(([catName, amt], idx) => {
      const share = ((amt / total) * 100).toFixed(1);
      const color = palette[idx % palette.length];
      return `
        <div class="category-bar-item">
          <div class="category-meta">
            <span class="category-name">${catName}</span>
            <span class="category-amounts"><strong>${formatMoney(amt)}</strong> · ${share}%</span>
          </div>
          <div class="bar-track">
            <div class="bar-fill" style="width:${share}%; background:${color};"></div>
          </div>
        </div>
      `;
    }).join('');
  }

  // --- Regional Performance List ---
  function renderRegionalPerformance(currOrders, currMetrics) {
    const container = document.getElementById('regional-list-container');
    const regTotals = {};
    for (const r of REGIONS) regTotals[r.name] = { amount: 0, orders: 0 };
    for (const o of currOrders) {
      if (o.status !== 'Cancelled') {
        regTotals[o.region].amount += o.amount;
        regTotals[o.region].orders += 1;
      }
    }

    const total = currMetrics.grossRevenue || 1;
    container.innerHTML = REGIONS.map(reg => {
      const data = regTotals[reg.name] || { amount: 0, orders: 0 };
      const share = ((data.amount / total) * 100).toFixed(1);
      return `
        <div class="regional-row">
          <div class="region-info">
            <span class="region-name">${reg.name}</span>
            <span class="region-share">${data.orders} orders · ${share}% share</span>
          </div>
          <div class="region-stat">
            <span class="region-revenue">${formatMoney(data.amount)}</span>
            <span class="region-growth positive">${reg.growth} YoY</span>
          </div>
        </div>
      `;
    }).join('');
  }

  // --- Status & Fulfillment Breakdown ---
  function renderStatusBreakdown(currMetrics) {
    const container = document.getElementById('status-bars-container');
    const total = currMetrics.totalOrders || 1;

    const statuses = [
      { name: 'Completed & Delivered', count: currMetrics.completedOrders, color: 'var(--success)' },
      { name: 'Processing & In Transit', count: Math.round(total * 0.05), color: 'var(--info)' },
      { name: 'Refunded / Returned', count: currMetrics.refundedOrders, color: 'var(--warning)' },
      { name: 'Cancelled', count: currMetrics.cancelledOrders, color: 'var(--danger)' }
    ];

    container.innerHTML = statuses.map(st => {
      const pct = ((st.count / total) * 100).toFixed(1);
      return `
        <div class="category-bar-item">
          <div class="category-meta">
            <span class="category-name" style="display:flex; align-items:center; gap:6px;">
              <span style="width:8px; height:8px; border-radius:50%; background:${st.color};"></span>
              ${st.name}
            </span>
            <span class="category-amounts"><strong>${formatNumber(st.count)}</strong> (${pct}%)</span>
          </div>
          <div class="bar-track">
            <div class="bar-fill" style="width:${pct}%; background:${st.color};"></div>
          </div>
        </div>
      `;
    }).join('');
  }

  // --- Top Products Leaderboard Table ---
  function renderTopProducts(currOrders, currMetrics) {
    const tbody = document.querySelector('#top-products-table tbody');
    const prodMap = {};

    for (const p of PRODUCTS) {
      prodMap[p.id] = { product: p, units: 0, revenue: 0 };
    }

    for (const o of currOrders) {
      if (o.status !== 'Cancelled' && prodMap[o.productId]) {
        prodMap[o.productId].units += o.qty;
        prodMap[o.productId].revenue += o.amount;
      }
    }

    const sorted = Object.values(prodMap).sort((a, b) => b.revenue - a.revenue);
    const total = currMetrics.grossRevenue || 1;

    tbody.innerHTML = sorted.slice(0, 8).map((item, idx) => {
      const p = item.product;
      const share = ((item.revenue / total) * 100).toFixed(1);
      const isLowStock = idx % 4 === 1;
      return `
        <tr>
          <td><span class="rank-badge ${idx < 3 ? `top-${idx + 1}` : ''}">${idx + 1}</span></td>
          <td>
            <div class="product-cell">
              <div class="product-icon">📦</div>
              <div class="product-meta">
                <span class="product-name">${p.name}</span>
                <span class="product-sku">${p.sku}</span>
              </div>
            </div>
          </td>
          <td>${p.category}</td>
          <td class="num-cell">${formatMoney(p.price)}</td>
          <td class="num-cell"><strong>${formatNumber(item.units)}</strong></td>
          <td class="num-cell"><strong>${formatMoney(item.revenue)}</strong></td>
          <td class="num-cell">${share}%</td>
          <td>
            <span class="stock-tag ${isLowStock ? 'low-stock' : 'in-stock'}">
              ${isLowStock ? '⚠️ Low Stock' : '✓ Healthy'}
            </span>
          </td>
        </tr>
      `;
    }).join('');
  }

  // --- Orders & Transactions Table with Search, Filter & Pagination ---
  function renderOrdersTable(currOrders) {
    const tbody = document.getElementById('orders-tbody');

    // Filter by search query & status tab
    let filtered = currOrders.filter(o => {
      if (state.orderStatus !== 'all' && o.status !== state.orderStatus) return false;
      if (state.orderSearch) {
        const query = state.orderSearch.toLowerCase();
        return (
          o.id.toLowerCase().includes(query) ||
          o.customer.toLowerCase().includes(query) ||
          o.productName.toLowerCase().includes(query) ||
          o.email.toLowerCase().includes(query)
        );
      }
      return true;
    });

    // Update status badge counts
    const statusCounts = { all: currOrders.length, Completed: 0, Processing: 0, Refunded: 0, Cancelled: 0 };
    for (const o of currOrders) {
      if (statusCounts[o.status] !== undefined) statusCounts[o.status]++;
    }
    document.getElementById('count-all').textContent = statusCounts.all;
    document.getElementById('count-completed').textContent = statusCounts.Completed;
    document.getElementById('count-processing').textContent = statusCounts.Processing;
    document.getElementById('count-refunded').textContent = statusCounts.Refunded;
    document.getElementById('count-cancelled').textContent = statusCounts.Cancelled;

    // Sorting
    filtered.sort((a, b) => {
      let vA, vB;
      if (state.orderSortCol === 'date') { vA = a.timestamp; vB = b.timestamp; }
      else if (state.orderSortCol === 'amount') { vA = a.amount; vB = b.amount; }
      else if (state.orderSortCol === 'customer') { vA = a.customer; vB = b.customer; }
      else if (state.orderSortCol === 'status') { vA = a.status; vB = b.status; }
      else { vA = a.id; vB = b.id; }

      if (vA < vB) return state.orderSortDir === 'asc' ? -1 : 1;
      if (vA > vB) return state.orderSortDir === 'asc' ? 1 : -1;
      return 0;
    });

    // Pagination
    const totalRecords = filtered.length;
    const totalPages = Math.ceil(totalRecords / state.orderPageSize) || 1;
    if (state.orderPage > totalPages) state.orderPage = totalPages;

    const startIdx = (state.orderPage - 1) * state.orderPageSize;
    const pageRows = filtered.slice(startIdx, startIdx + state.orderPageSize);

    // Update pagination info text
    const endIdx = Math.min(startIdx + state.orderPageSize, totalRecords);
    document.getElementById('pagination-info-text').innerHTML = `
      Showing <strong>${totalRecords > 0 ? startIdx + 1 : 0}</strong> to <strong>${endIdx}</strong> of <strong>${formatNumber(totalRecords)}</strong> transactions
    `;

    // Render table rows
    if (pageRows.length === 0) {
      tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding:32px; color:var(--text-muted);">No orders match your search and filter criteria.</td></tr>`;
    } else {
      tbody.innerHTML = pageRows.map(o => {
        const dateObj = new Date(o.timestamp);
        const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const formattedTime = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const statusClass = o.status.toLowerCase();

        return `
          <tr data-order-id="${o.id}">
            <td><strong style="color:var(--primary); font-family:var(--font-mono);">${o.id}</strong></td>
            <td>
              <div style="display:flex; flex-direction:column;">
                <span>${formattedDate}</span>
                <span style="font-size:11px; color:var(--text-muted);">${formattedTime}</span>
              </div>
            </td>
            <td>
              <div style="display:flex; flex-direction:column;">
                <strong style="color:var(--text-primary);">${o.customer}</strong>
                <span style="font-size:11px; color:var(--text-muted);">${o.email}</span>
              </div>
            </td>
            <td>
              <div style="display:flex; flex-direction:column;">
                <span>${o.productName}</span>
                <span style="font-size:11px; color:var(--text-dim);">${o.qty} unit${o.qty > 1 ? 's' : ''} · ${o.sku}</span>
              </div>
            </td>
            <td><span style="font-size:12px;">${o.channel}</span></td>
            <td><span style="font-size:12px;">${o.region}</span></td>
            <td><span class="status-badge ${statusClass}">${o.status}</span></td>
            <td class="num-cell"><strong>${formatMoney(o.amount)}</strong></td>
            <td style="text-align:center;">
              <button type="button" class="btn btn-subtle btn-sm btn-view-order" data-id="${o.id}">
                View
              </button>
            </td>
          </tr>
        `;
      }).join('');
    }

    // Attach row click listeners for detail modal
    tbody.querySelectorAll('.btn-view-order').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openOrderDetailModal(btn.dataset.id);
      });
    });

    tbody.querySelectorAll('tr').forEach(tr => {
      tr.addEventListener('click', () => {
        if (tr.dataset.orderId) openOrderDetailModal(tr.dataset.orderId);
      });
      tr.style.cursor = 'pointer';
    });

    // Render pagination buttons
    renderPaginationButtons(totalPages);
  }

  function renderPaginationButtons(totalPages) {
    const container = document.getElementById('pagination-buttons');
    let btnsHtml = `
      <button type="button" class="page-btn" id="btn-page-prev" ${state.orderPage <= 1 ? 'disabled' : ''}>‹</button>
    `;

    for (let p = 1; p <= totalPages; p++) {
      if (p === 1 || p === totalPages || (p >= state.orderPage - 1 && p <= state.orderPage + 1)) {
        btnsHtml += `
          <button type="button" class="page-btn ${p === state.orderPage ? 'active' : ''}" data-page="${p}">${p}</button>
        `;
      } else if (p === state.orderPage - 2 || p === state.orderPage + 2) {
        btnsHtml += `<span style="padding:0 4px; color:var(--text-muted);">…</span>`;
      }
    }

    btnsHtml += `
      <button type="button" class="page-btn" id="btn-page-next" ${state.orderPage >= totalPages ? 'disabled' : ''}>›</button>
    `;
    container.innerHTML = btnsHtml;

    container.querySelectorAll('.page-btn[data-page]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.orderPage = parseInt(btn.dataset.page, 10);
        render();
      });
    });

    const prevBtn = document.getElementById('btn-page-prev');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (state.orderPage > 1) {
          state.orderPage--;
          render();
        }
      });
    }

    const nextBtn = document.getElementById('btn-page-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (state.orderPage < totalPages) {
          state.orderPage++;
          render();
        }
      });
    }
  }

  // --- Order Details Modal ---
  function openOrderDetailModal(orderId) {
    const order = ALL_ORDERS.find(o => o.id === orderId);
    if (!order) return;

    const modal = document.getElementById('modal-order-detail');
    const body = document.getElementById('modal-detail-body');
    const dateFormatted = new Date(order.timestamp).toLocaleString();

    body.innerHTML = `
      <div class="detail-grid">
        <div class="detail-item">
          <span>Order ID</span>
          <strong style="color:var(--primary); font-family:var(--font-mono);">${order.id}</strong>
        </div>
        <div class="detail-item">
          <span>Current Status</span>
          <div>
            <select id="modal-status-select" class="select-control" style="height:30px; font-size:12px; padding:0 24px 0 8px;">
              <option value="Completed" ${order.status === 'Completed' ? 'selected' : ''}>Completed</option>
              <option value="Processing" ${order.status === 'Processing' ? 'selected' : ''}>Processing</option>
              <option value="Refunded" ${order.status === 'Refunded' ? 'selected' : ''}>Refunded</option>
              <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
            </select>
          </div>
        </div>
        <div class="detail-item">
          <span>Date & Time</span>
          <strong>${dateFormatted}</strong>
        </div>
        <div class="detail-item">
          <span>Sales Channel</span>
          <strong>${order.channel}</strong>
        </div>
        <div class="detail-item">
          <span>Customer</span>
          <strong>${order.customer}</strong>
        </div>
        <div class="detail-item">
          <span>Customer Email</span>
          <strong>${order.email}</strong>
        </div>
        <div class="detail-item">
          <span>Geographic Region</span>
          <strong>${order.region}</strong>
        </div>
        <div class="detail-item">
          <span>Payment Gateway</span>
          <strong>Stripe Enterprise (Auth #TX-8291)</strong>
        </div>
      </div>

      <div style="border-top: 1px solid var(--border-color); padding-top: 16px;">
        <h4 style="font-size:13px; font-weight:700; margin-bottom:10px;">Itemized Receipt</h4>
        <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-card-subtle); padding:10px 14px; border-radius:var(--radius-md);">
          <div>
            <strong>${order.productName}</strong>
            <div style="font-size:11px; color:var(--text-muted);">SKU: ${order.sku} · Category: ${order.category}</div>
          </div>
          <div style="text-align:right;">
            <strong>${formatMoney(order.amount)}</strong>
            <div style="font-size:11px; color:var(--text-muted);">${order.qty} × ${formatMoney(order.unitPrice)}</div>
          </div>
        </div>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; padding-top:8px; border-top:1px dashed var(--border-color);">
        <span style="font-weight:600; font-size:14px;">Total Paid</span>
        <strong style="font-size:18px; color:var(--primary);">${formatMoney(order.amount)}</strong>
      </div>
    `;

    // Hook status change
    const statusSelect = document.getElementById('modal-status-select');
    statusSelect.addEventListener('change', () => {
      order.status = statusSelect.value;
      showToast(`Order ${order.id} status updated to ${order.status}`);
      render();
    });

    modal.classList.add('open');
  }

  // --- Add New Transaction Modal ---
  function setupNewOrderModal() {
    const productSelect = document.getElementById('form-product');
    productSelect.innerHTML = PRODUCTS.map(p => `
      <option value="${p.id}">${p.name} — ${formatMoney(p.price)}</option>
    `).join('');

    const modal = document.getElementById('modal-new-order');
    const form = document.getElementById('new-order-form');

    document.getElementById('btn-new-order').addEventListener('click', () => {
      modal.classList.add('open');
    });

    document.getElementById('btn-close-new-modal').addEventListener('click', () => modal.classList.remove('open'));
    document.getElementById('btn-cancel-new').addEventListener('click', () => modal.classList.remove('open'));

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const customer = document.getElementById('form-customer').value;
      const email = document.getElementById('form-email').value;
      const prodId = document.getElementById('form-product').value;
      const qty = parseInt(document.getElementById('form-qty').value, 10) || 1;
      const channel = document.getElementById('form-channel').value;
      const region = document.getElementById('form-region').value;
      const status = document.getElementById('form-status').value;

      const prod = PRODUCTS.find(p => p.id === prodId) || PRODUCTS[0];
      const amount = prod.price * qty;
      const cost = prod.cost * qty;
      const profit = amount - cost;
      const newId = `APX-${108420 + ALL_ORDERS.length + 1}`;

      const newOrder = {
        id: newId,
        timestamp: Date.now(),
        dateString: new Date().toISOString().split('T')[0],
        customer,
        email,
        productId: prod.id,
        productName: prod.name,
        category: prod.category,
        sku: prod.sku,
        unitPrice: prod.price,
        unitCost: prod.cost,
        qty,
        amount,
        cost,
        profit,
        channel,
        region,
        status
      };

      ALL_ORDERS.unshift(newOrder);
      modal.classList.remove('open');
      form.reset();
      showToast(`Transaction ${newId} recorded successfully!`);
      render();
    });
  }

  // --- Toast Notifications ---
  function showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      <span>${message}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 250);
    }, 3200);
  }

  // --- CSV & JSON Exporters ---
  function exportCSV(orders) {
    const headers = ['Order ID', 'Date', 'Customer', 'Email', 'Product', 'SKU', 'Category', 'Quantity', 'Amount', 'Channel', 'Region', 'Status'];
    const rows = orders.map(o => [
      o.id,
      o.dateString,
      `"${o.customer.replace(/"/g, '""')}"`,
      o.email,
      `"${o.productName.replace(/"/g, '""')}"`,
      o.sku,
      `"${o.category}"`,
      o.qty,
      o.amount.toFixed(2),
      `"${o.channel}"`,
      `"${o.region}"`,
      o.status
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `apex-transactions-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    showToast(`Exported ${orders.length} orders to CSV`);
  }

  function exportJSON(orders) {
    const blob = new Blob([JSON.stringify(orders, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `apex-intelligence-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast(`Exported ${orders.length} records to JSON`);
  }

  // --- Master Render Pipeline ---
  function render() {
    const bounds = getTimeBounds();
    const currOrders = getFilteredOrders(false);
    const priorOrders = getFilteredOrders(true);

    const currMetrics = computeMetrics(currOrders);
    const priorMetrics = computeMetrics(priorOrders);

    // Update active range label text
    const startDateStr = new Date(bounds.start).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const endDateStr = new Date(bounds.end).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    document.getElementById('range-text-display').textContent = `${startDateStr} – ${endDateStr}`;

    // Show/hide Reset Filters button
    const isFiltered = state.category !== 'all' || state.channel !== 'all' || state.region !== 'all';
    document.getElementById('btn-reset-filters').style.display = isFiltered ? 'inline-flex' : 'none';

    // 1. KPIs
    updateKPIs(currMetrics, priorMetrics, currOrders);

    // 2. Executive Performance Summary
    updateBriefing(currMetrics, priorMetrics, currOrders);

    // 3. Main Trend Chart
    renderMainChart(currOrders, priorOrders);

    // 4. Sales by Channel Donut
    renderChannelDonut(currOrders, currMetrics);

    // 5. Category Bars
    renderCategoryBars(currOrders, currMetrics);

    // 6. Regional Performance
    renderRegionalPerformance(currOrders, currMetrics);

    // 7. Status Fulfillment
    renderStatusBreakdown(currMetrics);

    // 8. Top Products Table
    renderTopProducts(currOrders, currMetrics);

    // 9. Orders Data Grid
    renderOrdersTable(currOrders);
  }

  // --- Setup Event Listeners ---
  function setupEventListeners() {
    // Range Picker Buttons
    const rangePicker = document.getElementById('range-picker');
    rangePicker.querySelectorAll('.segmented-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        rangePicker.querySelectorAll('.segmented-btn').forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-checked', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-checked', 'true');
        state.range = btn.dataset.range === 'all' ? 'all' : parseInt(btn.dataset.range, 10);
        state.orderPage = 1;
        render();
      });
    });

    // Dropdown Filters
    const catSelect = document.getElementById('filter-category');
    catSelect.addEventListener('change', () => {
      state.category = catSelect.value;
      state.orderPage = 1;
      render();
    });

    const chanSelect = document.getElementById('filter-channel');
    chanSelect.addEventListener('change', () => {
      state.channel = chanSelect.value;
      state.orderPage = 1;
      render();
    });

    const regSelect = document.getElementById('filter-region');
    regSelect.addEventListener('change', () => {
      state.region = regSelect.value;
      state.orderPage = 1;
      render();
    });

    // Reset Filters
    document.getElementById('btn-reset-filters').addEventListener('click', () => {
      state.category = 'all';
      state.channel = 'all';
      state.region = 'all';
      catSelect.value = 'all';
      chanSelect.value = 'all';
      regSelect.value = 'all';
      render();
    });

    // Currency Switcher
    const curSelect = document.getElementById('currency-select');
    curSelect.addEventListener('change', () => {
      state.currency = curSelect.value;
      render();
      showToast(`Currency switched to ${state.currency}`);
    });

    // Export Select
    const expSelect = document.getElementById('export-select');
    expSelect.addEventListener('change', () => {
      const val = expSelect.value;
      const currOrders = getFilteredOrders(false);
      if (val === 'csv') exportCSV(currOrders);
      else if (val === 'json') exportJSON(currOrders);
      else if (val === 'print') window.print();
      expSelect.selectedIndex = 0;
    });

    // Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('icon-sun');
    const moonIcon = document.getElementById('icon-moon');

    function syncThemeIcons(theme) {
      if (theme === 'dark') {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
      } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
      }
    }
    syncThemeIcons(document.documentElement.dataset.theme);

    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.dataset.theme;
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      localStorage.setItem('apex_theme', next);
      syncThemeIcons(next);
      render();
    });

    // Main Chart Metric Toggle
    const metricToggle = document.getElementById('chart-metric-toggle');
    metricToggle.querySelectorAll('.segmented-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        metricToggle.querySelectorAll('.segmented-btn').forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-checked', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-checked', 'true');
        state.chartMetric = btn.dataset.metric;
        render();
      });
    });

    // Main Chart Aggregation Selector
    document.getElementById('chart-agg-select').addEventListener('change', (e) => {
      state.chartAgg = e.target.value;
      render();
    });

    // Toggle Chart Table View
    const toggleTableBtn = document.getElementById('btn-toggle-chart-table');
    const chartSvg = document.getElementById('main-svg');
    const chartTableView = document.getElementById('chart-table-view');

    toggleTableBtn.addEventListener('click', () => {
      state.showChartTable = !state.showChartTable;
      if (state.showChartTable) {
        chartSvg.style.display = 'none';
        chartTableView.style.display = 'block';
        toggleTableBtn.textContent = 'Chart';
      } else {
        chartSvg.style.display = 'block';
        chartTableView.style.display = 'none';
        toggleTableBtn.textContent = 'Table';
      }
    });

    // Orders Search Box (Instant Live Filter)
    const searchInput = document.getElementById('order-search');
    searchInput.addEventListener('input', (e) => {
      state.orderSearch = e.target.value.trim();
      state.orderPage = 1;
      renderOrdersTable(getFilteredOrders(false));
    });

    // Orders Status Tabs
    const statusTabs = document.getElementById('status-tab-group');
    statusTabs.querySelectorAll('.status-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        statusTabs.querySelectorAll('.status-tab').forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        state.orderStatus = tab.dataset.status;
        state.orderPage = 1;
        renderOrdersTable(getFilteredOrders(false));
      });
    });

    // Table Header Sorting
    document.querySelectorAll('#orders-table th[data-sort]').forEach(th => {
      th.addEventListener('click', () => {
        const col = th.dataset.sort;
        if (state.orderSortCol === col) {
          state.orderSortDir = state.orderSortDir === 'asc' ? 'desc' : 'asc';
        } else {
          state.orderSortCol = col;
          state.orderSortDir = 'desc';
        }
        renderOrdersTable(getFilteredOrders(false));
      });
    });

    // Modal Close Handlers
    document.getElementById('btn-close-detail-modal').addEventListener('click', () => {
      document.getElementById('modal-order-detail').classList.remove('open');
    });
    document.getElementById('btn-close-detail-action').addEventListener('click', () => {
      document.getElementById('modal-order-detail').classList.remove('open');
    });
    document.getElementById('btn-print-receipt').addEventListener('click', () => {
      window.print();
    });

    // Close Modals on Escape Key or Backdrop Click
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
      }
    });
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('open');
      });
    });

    // Re-render chart on window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const currOrders = getFilteredOrders(false);
        const priorOrders = getFilteredOrders(true);
        renderMainChart(currOrders, priorOrders);
      }, 150);
    });

    setupNewOrderModal();
  }

  // --- Initial Boot ---
  setupEventListeners();
  render();

})();
