/**
 * AETHER ATELIER - Contemporary Luxury Apparel
 * Complete E-Commerce Store Engine
 */

// Product Catalog
const PRODUCTS = [
  {
    id: "aeth-01",
    name: "The Sovereign Cashmere Overcoat",
    tagline: "Double-faced virgin wool & Mongolian cashmere tailored with dropped shoulders.",
    category: "outerwear",
    categoryLabel: "Outerwear",
    price: 420,
    originalPrice: 510,
    rating: 4.9,
    reviewsCount: 142,
    badge: "Sale",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Camel", hex: "#C19A6B" },
      { name: "Obsidian", hex: "#1C1C1E" }
    ],
    primaryImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    description: "An iconic silhouette crafted from double-faced brushed virgin wool blended with pure Mongolian cashmere. Features horn buttons, deep welt pockets, and an unlined drape that flows naturally with every step.",
    details: [
      "90% Virgin Wool, 10% Grade-A Mongolian Cashmere",
      "Hand-finished horn buttons from sustainable sources",
      "Relaxed architectural drape",
      "Dry clean only. Handcrafted in Porto, Portugal"
    ],
    stock: { "XS": 3, "S": 5, "M": 8, "L": 4, "XL": 2 }
  },
  {
    id: "aeth-02",
    name: "Double-Breasted Atelier Blazer",
    tagline: "Structured sharp shoulders and tapered waist in Italian worsted wool.",
    category: "tailoring",
    categoryLabel: "Tailoring",
    price: 360,
    originalPrice: null,
    rating: 4.8,
    reviewsCount: 96,
    badge: "Bestseller",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Charcoal Melange", hex: "#383B3E" },
      { name: "Alabaster White", hex: "#F4F3EE" }
    ],
    primaryImage: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    description: "Our signature double-breasted jacket balances formal architectural precision with contemporary ease. Subtle padded shoulders frame a clean silhouette, lined in breathable cupro.",
    details: [
      "100% Super 120s Italian Worsted Wool",
      "100% Bemberg Cupro interior lining",
      "Peak lapels with pick-stitch detailing",
      "Dual rear vents and internal passport pocket"
    ],
    stock: { "XS": 2, "S": 7, "M": 6, "L": 3, "XL": 1 }
  },
  {
    id: "aeth-03",
    name: "Brushed Mohair Ribbed Cardigan",
    tagline: "Plush tactile knit with natural horn buttons and relaxed dropped arms.",
    category: "knitwear",
    categoryLabel: "Knitwear",
    price: 240,
    originalPrice: null,
    rating: 5.0,
    reviewsCount: 88,
    badge: "New",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Forest Olive", hex: "#4A5240" },
      { name: "Warm Oat", hex: "#D6CEBF" }
    ],
    primaryImage: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
    description: "Spun from ethically sourced South African mohair blended with certified organic wool. Brushed by hand for exceptional softness and airy loft that keeps you warm without bulk.",
    details: [
      "62% RMS Mohair, 38% Organic Wool",
      "Hand-brushed textured cloud finish",
      "Oversized ribbed cuffs and hem",
      "Hand wash cold and lay flat to dry"
    ],
    stock: { "S": 4, "M": 9, "L": 5, "XL": 2 }
  },
  {
    id: "aeth-04",
    name: "Sculptural Draped Silk Midi Dress",
    tagline: "Fluid asymmetric bias cut with subtle cowl neckline in 22mm silk satin.",
    category: "dresses",
    categoryLabel: "Dresses",
    price: 310,
    originalPrice: 380,
    rating: 4.9,
    reviewsCount: 74,
    badge: "Sale",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Espresso", hex: "#3D2E26" },
      { name: "Champagne", hex: "#F3EAD8" }
    ],
    primaryImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80",
    description: "Cut on the bias from 22mm heavyweight mulberry silk that skims curves effortlessly. Features an open back detail with delicate adjustable ties and an alluring side slit.",
    details: [
      "100% Grade 6A Mulberry Silk Satin",
      "Asymmetric drape with delicate bias hemline",
      "Concealed side zipper with hook-and-eye closure",
      "Specialty dry clean only"
    ],
    stock: { "XS": 3, "S": 4, "M": 3, "L": 1 }
  },
  {
    id: "aeth-05",
    name: "Pleated Wide-Leg Wool Trousers",
    tagline: "Deep double forward pleats and clean floor-skimming wide cuffs.",
    category: "pants",
    categoryLabel: "Pants & Trousers",
    price: 220,
    originalPrice: null,
    rating: 4.7,
    reviewsCount: 110,
    badge: "Popular",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Midnight Navy", hex: "#1C2434" },
      { name: "Slate Taupe", hex: "#8F897F" }
    ],
    primaryImage: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    description: "Impeccably tailored trousers with a high-rise waist and fluid wide-leg cut. The fluid wool gabardine holds clean vertical pleats through endless wear.",
    details: [
      "100% Pure Virgin Wool Gabardine",
      "High-rise with internal waist curtain band",
      "Slanted side pockets and double welt back pockets",
      "Blind-stitched hem with 2-inch extension allowance"
    ],
    stock: { "XS": 4, "S": 8, "M": 12, "L": 6, "XL": 3 }
  },
  {
    id: "aeth-06",
    name: "Heavyweight Boxy Supima Tee",
    tagline: "Dense 280 GSM American Supima cotton with structured collar.",
    category: "tops",
    categoryLabel: "Tops & Shirts",
    price: 75,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 230,
    badge: "Essential",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Vintage Bone", hex: "#ECE8DD" },
      { name: "Washed Black", hex: "#292929" },
      { name: "Earthy Clay", hex: "#945D4B" }
    ],
    primaryImage: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
    description: "The quintessential tee built from extra-long staple Supima cotton knit in California. Heavyweight 280 GSM fabric holds its clean geometric boxy shape wash after wash.",
    details: [
      "100% Certified American Supima Cotton (280 GSM)",
      "Bound ribbed 1-inch collar that never sags",
      "Drop shoulder relaxed silhouette",
      "Pre-shrunk for true-to-size longevity"
    ],
    stock: { "XS": 12, "S": 18, "M": 24, "L": 20, "XL": 14, "XXL": 8 }
  },
  {
    id: "aeth-07",
    name: "Minimalist Italian Wool Bomber",
    tagline: "Modern clean lines with two-way silver riri zipper and ribbed trims.",
    category: "outerwear",
    categoryLabel: "Outerwear",
    price: 295,
    originalPrice: 350,
    rating: 4.8,
    reviewsCount: 65,
    badge: "Limited",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Charcoal", hex: "#2C2D30" },
      { name: "Deep Khaki", hex: "#4B4C3E" }
    ],
    primaryImage: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80",
    description: "An elevated reinterpretation of the iconic MA-1 flight jacket. Crafted from boiled Italian wool with minimal exterior seams and brushed silver Italian metal hardware.",
    details: [
      "100% Boiled Italian Melton Wool",
      "Smooth 2-way Swiss Riri metal zipper",
      "Custom tight-knit ribbed collar, cuffs, and waist",
      "Thermal quilted insulated lining"
    ],
    stock: { "S": 2, "M": 6, "L": 4, "XL": 1 }
  },
  {
    id: "aeth-08",
    name: "Japanese Selvedge Denim Jeans",
    tagline: "14oz shuttle-loomed raw denim from Okayama with copper rivets.",
    category: "pants",
    categoryLabel: "Pants & Trousers",
    price: 210,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 154,
    badge: "Classic",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Deep Indigo", hex: "#1B2A4A" },
      { name: "Washed Stonewash", hex: "#4B617A" }
    ],
    primaryImage: "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    description: "Woven on vintage Toyoda shuttle looms in Kurashiki, Japan. Distinct red-line selvedge ID, hidden back pocket rivets, and vegetable-tanned leather waistband patch.",
    details: [
      "100% Zimbabwean Long-Staple Cotton (14oz)",
      "Red-line selvedge seam detail",
      "Custom solid copper doughnut button fly",
      "Develops unique custom whiskers and honeycombs with wear"
    ],
    stock: { "XS": 3, "S": 7, "M": 10, "L": 5, "XL": 2 }
  },
  {
    id: "aeth-09",
    name: "Mock-Neck Fine Gauge Merino Sweater",
    tagline: "Ultra-fine 18.5 micron Australian merino with seamless seamless knitting.",
    category: "knitwear",
    categoryLabel: "Knitwear",
    price: 185,
    originalPrice: null,
    rating: 4.7,
    reviewsCount: 82,
    badge: "Essential",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Oatmeal Melange", hex: "#DFDACF" },
      { name: "Midnight Black", hex: "#161616" }
    ],
    primaryImage: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=800&q=80",
    description: "An indispensable transitional piece. Spun from ultra-fine Australian merino wool with natural temperature-regulating and moisture-wicking characteristics.",
    details: [
      "100% Extra-Fine Australian Merino Wool (18.5 micron)",
      "Seamless 3D whole-garment construction",
      "Breathable and naturally odor-resistant",
      "Hand wash or dry clean"
    ],
    stock: { "XS": 5, "S": 10, "M": 14, "L": 8, "XL": 4 }
  },
  {
    id: "aeth-10",
    name: "Full-Grain Italian Leather Tote",
    tagline: "Minimalist structured silhouette with laptop divider and magnetic closure.",
    category: "accessories",
    categoryLabel: "Accessories",
    price: 285,
    originalPrice: 340,
    rating: 5.0,
    reviewsCount: 119,
    badge: "Sale",
    sizes: ["One Size"],
    colors: [
      { name: "Cognac Amber", hex: "#8A4F2A" },
      { name: "Noir Black", hex: "#181818" }
    ],
    primaryImage: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&w=800&q=80",
    description: "Handcrafted in Tuscany from vegetable-tanned full-grain vacchetta leather. Fits up to a 16\" MacBook Pro in a padded internal sleeve, with solid brass hardware.",
    details: [
      "100% Certified Tuscan Full-Grain Vegetable Tanned Leather",
      "Internal dedicated padded laptop compartment",
      "Reinforced base with metal protective feet",
      "Dimensions: 40cm W x 32cm H x 14cm D"
    ],
    stock: { "One Size": 9 }
  },
  {
    id: "aeth-11",
    name: "Brushed Alpaca Wool Scarf",
    tagline: "Oversized cocoon wrap with long tactile fringe in Peruvian alpaca.",
    category: "accessories",
    categoryLabel: "Accessories",
    price: 95,
    originalPrice: null,
    rating: 4.8,
    reviewsCount: 45,
    badge: "New",
    sizes: ["One Size"],
    colors: [
      { name: "Sand Melange", hex: "#C7B89F" },
      { name: "Olive Slate", hex: "#5C6356" }
    ],
    primaryImage: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
    description: "Generously proportioned scarf woven from pure Peruvian baby alpaca. Softer and warmer than traditional wool, with hypoallergenic and water-repellent properties.",
    details: [
      "80% Baby Alpaca, 20% Merino Wool",
      "Length: 220cm x 50cm including twisted fringe",
      "Hypoallergenic without lanolin",
      "Handcrafted in Arequipa, Peru"
    ],
    stock: { "One Size": 15 }
  },
  {
    id: "aeth-12",
    name: "Crisp Poplin Atelier Oversized Shirt",
    tagline: "Structured 100% organic Egyptian cotton with mother-of-pearl buttons.",
    category: "tops",
    categoryLabel: "Tops & Shirts",
    price: 145,
    originalPrice: 175,
    rating: 4.8,
    reviewsCount: 78,
    badge: "Sale",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Optic White", hex: "#FFFFFF" },
      { name: "Sky Chambray", hex: "#A8BDD1" }
    ],
    primaryImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
    description: "The definitive poplin shirt featuring crisp structure and a clean box pleat back. Tailored with French seams and genuine Australian mother-of-pearl buttons.",
    details: [
      "100% Long-Staple Egyptian Giza Organic Cotton",
      "Genuine Australian Mother-of-Pearl buttons",
      "Curved high-low hem with side gussets",
      "Machine wash gentle, warm iron"
    ],
    stock: { "XS": 4, "S": 11, "M": 9, "L": 6, "XL": 3 }
  }
];

// App State
const state = {
  products: PRODUCTS,
  filteredProducts: PRODUCTS,
  cart: JSON.parse(localStorage.getItem('aether_cart') || '[]'),
  wishlist: JSON.parse(localStorage.getItem('aether_wishlist') || '[]'),
  activeCategory: 'all',
  activeSort: 'featured',
  activeSizeFilter: 'all',
  searchQuery: '',
  appliedPromo: null,
  activeQuickViewProduct: null,
  selectedQuickSize: null,
  selectedQuickColor: null,
  quickViewQuantity: 1,
  checkoutStep: 1,
  shippingMethod: 'standard', // 'standard' or 'express'
  shippingAddress: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  },
  lastOrder: null
};

// Available Promo Codes
const PROMO_CODES = {
  'TASTE20': { discountPercent: 20, description: '20% Off Tastelabs Exclusive' },
  'WELCOME10': { discountPercent: 10, description: '10% Off First Atelier Order' },
  'FREESHIP': { freeShipping: true, description: 'Complimentary Express Delivery' }
};

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartBadge();
  updateWishlistBadge();
  setupEventListeners();
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

// Event Listeners setup
function setupEventListeners() {
  // Search input
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.toLowerCase().trim();
      applyFilters();
    });
  }

  // Sort dropdown
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.activeSort = e.target.value;
      applyFilters();
    });
  }

  // Size filter
  const sizeSelect = document.getElementById('size-filter-select');
  if (sizeSelect) {
    sizeSelect.addEventListener('change', (e) => {
      state.activeSizeFilter = e.target.value;
      applyFilters();
    });
  }

  // Mobile navigation drawer
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
  const closeMobileMenu = document.getElementById('close-mobile-menu');
  if (mobileMenuBtn && mobileMenuDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuDrawer.classList.remove('hidden');
    });
  }
  if (closeMobileMenu && mobileMenuDrawer) {
    closeMobileMenu.addEventListener('click', () => {
      mobileMenuDrawer.classList.add('hidden');
    });
  }

  // Escape key closes modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
}

// Category filter
function setCategory(category) {
  state.activeCategory = category;
  
  // Update UI tabs
  document.querySelectorAll('.category-tab').forEach(btn => {
    if (btn.dataset.category === category) {
      btn.className = "category-tab px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all bg-neutral-900 text-white shadow-sm";
    } else {
      btn.className = "category-tab px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all bg-neutral-100 hover:bg-neutral-200 text-neutral-600";
    }
  });

  applyFilters();
}

// Filter and Sort logic
function applyFilters() {
  let list = [...PRODUCTS];

  // Category filter
  if (state.activeCategory !== 'all') {
    list = list.filter(p => p.category === state.activeCategory);
  }

  // Size filter
  if (state.activeSizeFilter !== 'all') {
    list = list.filter(p => p.sizes.includes(state.activeSizeFilter));
  }

  // Search filter
  if (state.searchQuery) {
    list = list.filter(p => 
      p.name.toLowerCase().includes(state.searchQuery) ||
      p.tagline.toLowerCase().includes(state.searchQuery) ||
      p.categoryLabel.toLowerCase().includes(state.searchQuery)
    );
  }

  // Sorting
  if (state.activeSort === 'price-low') {
    list.sort((a, b) => a.price - b.price);
  } else if (state.activeSort === 'price-high') {
    list.sort((a, b) => b.price - a.price);
  } else if (state.activeSort === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  } else if (state.activeSort === 'newest') {
    list.sort((a, b) => (b.badge === 'New' ? 1 : 0) - (a.badge === 'New' ? 1 : 0));
  }

  state.filteredProducts = list;
  renderProducts();
}

// Render Product Catalog
function renderProducts() {
  const container = document.getElementById('products-grid');
  const countDisplay = document.getElementById('product-count-display');
  
  if (countDisplay) {
    countDisplay.textContent = `Showing ${state.filteredProducts.length} of ${PRODUCTS.length} curated pieces`;
  }

  if (!container) return;

  if (state.filteredProducts.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-20 text-center">
        <div class="w-16 h-16 mx-auto mb-4 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-400">
          <i data-lucide="search-x" class="w-8 h-8"></i>
        </div>
        <h3 class="font-serif-title text-2xl font-medium text-neutral-800 mb-2">No garments match your criteria</h3>
        <p class="text-sm text-neutral-500 max-w-md mx-auto mb-6">Try clearing your search query, adjusting your size filter, or browsing all collections.</p>
        <button onclick="resetAllFilters()" class="px-6 py-2.5 bg-neutral-900 text-white text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-neutral-800 transition">
          Reset All Filters
        </button>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  container.innerHTML = state.filteredProducts.map(product => {
    const isWishlisted = state.wishlist.includes(product.id);
    const hasDiscount = product.originalPrice && product.originalPrice > product.price;
    const defaultSize = product.sizes[0];

    return `
      <div class="product-card group relative bg-white border border-neutral-200/80 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:border-neutral-300">
        
        <!-- Image Container -->
        <div class="relative w-full aspect-[3/4] bg-neutral-100 overflow-hidden cursor-pointer" onclick="openQuickView('${product.id}')">
          <img 
            src="${product.primaryImage}" 
            alt="${product.name}" 
            class="img-primary w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" 
            loading="lazy"
          />
          
          <!-- Badge -->
          ${product.badge ? `
            <span class="absolute top-3 left-3 px-3 py-1 bg-white/95 backdrop-blur-md text-[10px] uppercase font-bold tracking-widest text-neutral-900 rounded-full shadow-sm border border-neutral-200/50">
              ${product.badge}
            </span>
          ` : ''}

          <!-- Wishlist Button -->
          <button 
            onclick="event.stopPropagation(); toggleWishlist('${product.id}')"
            aria-label="Save to wishlist"
            class="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-neutral-700 hover:text-rose-600 hover:bg-white shadow-sm transition-all"
          >
            <i data-lucide="heart" class="w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}"></i>
          </button>

          <!-- Quick View Hover Button -->
          <div class="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
            <button 
              onclick="event.stopPropagation(); openQuickView('${product.id}')"
              class="flex-1 py-2.5 bg-white/95 backdrop-blur-md text-neutral-900 text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-white shadow-md transition flex items-center justify-center gap-1.5"
            >
              <i data-lucide="eye" class="w-3.5 h-3.5"></i>
              Quick View
            </button>
          </div>
        </div>

        <!-- Product Info -->
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between text-xs text-neutral-400 font-medium mb-1.5 uppercase tracking-wider">
              <span>${product.categoryLabel}</span>
              <div class="flex items-center gap-1 text-amber-600 font-semibold">
                <i data-lucide="star" class="w-3 h-3 fill-amber-500 text-amber-500"></i>
                <span>${product.rating}</span>
                <span class="text-neutral-400 font-normal">(${product.reviewsCount})</span>
              </div>
            </div>

            <h3 
              class="font-serif-title text-base font-semibold text-neutral-900 hover:text-neutral-600 cursor-pointer transition line-clamp-1 mb-1"
              onclick="openQuickView('${product.id}')"
            >
              ${product.name}
            </h3>

            <p class="text-xs text-neutral-500 line-clamp-2 mb-3 leading-relaxed">
              ${product.tagline}
            </p>
          </div>

          <div>
            <!-- Size Options Preview -->
            <div class="mb-3">
              <span class="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">Available Sizes</span>
              <div class="flex flex-wrap gap-1">
                ${product.sizes.map(size => `
                  <button 
                    onclick="event.stopPropagation(); selectCardSize('${product.id}', '${size}')" 
                    id="size-btn-${product.id}-${size}"
                    class="card-size-pill text-[11px] px-2 py-1 rounded-md border ${size === defaultSize ? 'border-neutral-900 bg-neutral-900 text-white font-medium' : 'border-neutral-200 text-neutral-600 hover:border-neutral-400 bg-white'} transition"
                  >
                    ${size}
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Price and Quick Add Row -->
            <div class="pt-3 border-t border-neutral-100 flex items-center justify-between">
              <div>
                <div class="flex items-baseline gap-2">
                  <span class="text-lg font-bold text-neutral-900">$${product.price}</span>
                  ${hasDiscount ? `
                    <span class="text-xs text-neutral-400 line-through">$${product.originalPrice}</span>
                  ` : ''}
                </div>
              </div>

              <button 
                onclick="quickAddToCart('${product.id}')"
                class="px-4 py-2 bg-neutral-900 text-white rounded-xl text-xs font-semibold hover:bg-neutral-800 transition shadow-sm flex items-center gap-1.5 active:scale-95"
              >
                <i data-lucide="shopping-bag" class="w-3.5 h-3.5"></i>
                Add
              </button>
            </div>
          </div>

        </div>

      </div>
    `;
  }).join('');

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Select card size directly
const selectedCardSizes = {};
function selectCardSize(productId, size) {
  selectedCardSizes[productId] = size;
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  product.sizes.forEach(s => {
    const btn = document.getElementById(`size-btn-${productId}-${s}`);
    if (btn) {
      if (s === size) {
        btn.className = "card-size-pill text-[11px] px-2 py-1 rounded-md border border-neutral-900 bg-neutral-900 text-white font-medium transition";
      } else {
        btn.className = "card-size-pill text-[11px] px-2 py-1 rounded-md border border-neutral-200 text-neutral-600 hover:border-neutral-400 bg-white transition";
      }
    }
  });
}

function quickAddToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const chosenSize = selectedCardSizes[productId] || product.sizes[0];
  const chosenColor = product.colors[0].name;

  addToCart(product, chosenSize, chosenColor, 1);
}

// Reset filters
function resetAllFilters() {
  state.activeCategory = 'all';
  state.activeSort = 'featured';
  state.activeSizeFilter = 'all';
  state.searchQuery = '';

  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';

  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) sortSelect.value = 'featured';

  const sizeSelect = document.getElementById('size-filter-select');
  if (sizeSelect) sizeSelect.value = 'all';

  document.querySelectorAll('.category-tab').forEach(btn => {
    if (btn.dataset.category === 'all') {
      btn.className = "category-tab px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all bg-neutral-900 text-white shadow-sm";
    } else {
      btn.className = "category-tab px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all bg-neutral-100 hover:bg-neutral-200 text-neutral-600";
    }
  });

  applyFilters();
  showToast('Filters reset to default', 'info');
}

// Cart System
function addToCart(product, size, color, quantity = 1) {
  const existingItemIndex = state.cart.findIndex(
    item => item.id === product.id && item.size === size && item.color === color
  );

  if (existingItemIndex > -1) {
    state.cart[existingItemIndex].quantity += quantity;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      primaryImage: product.primaryImage,
      categoryLabel: product.categoryLabel,
      size: size,
      color: color,
      quantity: quantity
    });
  }

  saveCart();
  updateCartBadge();
  showToast(`Added ${quantity}× ${product.name} (${size}) to your bag`, 'success');
  openCartDrawer();
}

function updateCartQuantity(index, delta) {
  if (!state.cart[index]) return;
  state.cart[index].quantity += delta;
  if (state.cart[index].quantity <= 0) {
    const removedName = state.cart[index].name;
    state.cart.splice(index, 1);
    showToast(`Removed ${removedName} from bag`, 'info');
  }
  saveCart();
  renderCartDrawer();
  updateCartBadge();
}

function removeCartItem(index) {
  if (!state.cart[index]) return;
  const removedName = state.cart[index].name;
  state.cart.splice(index, 1);
  saveCart();
  renderCartDrawer();
  updateCartBadge();
  showToast(`Removed ${removedName} from bag`, 'info');
}

function saveCart() {
  localStorage.setItem('aether_cart', JSON.stringify(state.cart));
}

function updateCartBadge() {
  const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById('cart-badge');
  const badgeMobile = document.getElementById('cart-badge-mobile');
  
  [badge, badgeMobile].forEach(el => {
    if (!el) return;
    if (totalCount > 0) {
      el.textContent = totalCount;
      el.classList.remove('hidden');
    } else {
      el.classList.add('hidden');
    }
  });
}

function calculateCartTotals() {
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  let discount = 0;
  if (state.appliedPromo) {
    if (state.appliedPromo.discountPercent) {
      discount = (subtotal * state.appliedPromo.discountPercent) / 100;
    }
  }

  const freeShippingThreshold = 150;
  const qualifiesFreeShipping = subtotal >= freeShippingThreshold || (state.appliedPromo && state.appliedPromo.freeShipping);
  
  let shippingCost = 0;
  if (state.shippingMethod === 'express') {
    shippingCost = 15;
  } else {
    shippingCost = qualifiesFreeShipping ? 0 : 12;
  }

  const taxableAmount = Math.max(0, subtotal - discount);
  const estimatedTax = taxableAmount > 0 ? Math.round(taxableAmount * 0.08875 * 100) / 100 : 0;
  const total = taxableAmount + shippingCost + estimatedTax;

  return {
    subtotal,
    discount,
    shippingCost,
    estimatedTax,
    total,
    qualifiesFreeShipping,
    freeShippingThreshold,
    amountToFreeShipping: Math.max(0, freeShippingThreshold - subtotal)
  };
}

// Cart Drawer UI
function openCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  if (drawer) {
    drawer.classList.remove('hidden');
    renderCartDrawer();
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  if (drawer) {
    drawer.classList.add('hidden');
  }
}

function renderCartDrawer() {
  const container = document.getElementById('cart-items-container');
  const totals = calculateCartTotals();

  // Progress Bar for Free Shipping
  const progressContainer = document.getElementById('free-shipping-progress');
  if (progressContainer) {
    if (totals.subtotal === 0) {
      progressContainer.innerHTML = `
        <div class="text-xs text-neutral-500 text-center">Add $150+ to qualify for complimentary express delivery.</div>
      `;
    } else if (totals.qualifiesFreeShipping) {
      progressContainer.innerHTML = `
        <div class="flex items-center justify-between text-xs font-semibold text-emerald-700 mb-1.5">
          <span class="flex items-center gap-1.5">
            <i data-lucide="check-circle" class="w-4 h-4"></i>
            Complimentary Shipping Unlocked!
          </span>
          <span>100%</span>
        </div>
        <div class="w-full h-2 bg-emerald-100 rounded-full overflow-hidden">
          <div class="h-full bg-emerald-600 rounded-full w-full transition-all duration-500"></div>
        </div>
      `;
    } else {
      const percentage = Math.min(100, Math.round((totals.subtotal / totals.freeShippingThreshold) * 100));
      progressContainer.innerHTML = `
        <div class="flex items-center justify-between text-xs text-neutral-600 font-medium mb-1.5">
          <span>Add <strong>$${totals.amountToFreeShipping}</strong> more for complimentary shipping</span>
          <span class="font-bold">${percentage}%</span>
        </div>
        <div class="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
          <div class="h-full bg-neutral-900 rounded-full transition-all duration-500" style="width: ${percentage}%"></div>
        </div>
      `;
    }
  }

  // Cart Items
  if (!container) return;

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div class="py-16 text-center">
        <div class="w-16 h-16 mx-auto mb-4 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-400">
          <i data-lucide="shopping-bag" class="w-8 h-8"></i>
        </div>
        <h4 class="font-serif-title text-xl font-medium text-neutral-800 mb-2">Your Shopping Bag is Empty</h4>
        <p class="text-xs text-neutral-500 max-w-xs mx-auto mb-6">Discover timeless wardrobe pieces crafted with precision and intention.</p>
        <button onclick="closeCartDrawer()" class="px-6 py-2.5 bg-neutral-900 text-white text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-neutral-800 transition">
          Explore Collection
        </button>
      </div>
    `;
    updateDrawerSummary(totals, false);
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  container.innerHTML = state.cart.map((item, index) => {
    return `
      <div class="flex gap-4 p-4 border border-neutral-200 rounded-xl bg-white hover:border-neutral-300 transition">
        <img 
          src="${item.primaryImage}" 
          alt="${item.name}" 
          class="w-20 h-24 object-cover object-center rounded-lg bg-neutral-100 flex-shrink-0" 
        />
        <div class="flex-1 flex flex-col justify-between">
          <div class="flex items-start justify-between gap-2">
            <div>
              <span class="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block">${item.categoryLabel}</span>
              <h5 class="text-sm font-semibold text-neutral-900 line-clamp-1">${item.name}</h5>
              <div class="flex items-center gap-2 mt-0.5 text-xs text-neutral-500">
                <span>Size: <strong class="text-neutral-800">${item.size}</strong></span>
                <span>•</span>
                <span>Color: <strong class="text-neutral-800">${item.color}</strong></span>
              </div>
            </div>
            <button 
              onclick="removeCartItem(${index})" 
              aria-label="Remove item"
              class="text-neutral-400 hover:text-rose-600 p-1 transition"
            >
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </div>

          <div class="flex items-center justify-between pt-2 border-t border-neutral-100">
            <!-- Quantity Stepper -->
            <div class="flex items-center border border-neutral-200 rounded-lg bg-neutral-50 overflow-hidden">
              <button 
                onclick="updateCartQuantity(${index}, -1)" 
                class="px-2.5 py-1 text-xs text-neutral-600 hover:bg-neutral-200 transition font-bold"
              >
                -
              </button>
              <span class="px-3 text-xs font-semibold text-neutral-900">${item.quantity}</span>
              <button 
                onclick="updateCartQuantity(${index}, 1)" 
                class="px-2.5 py-1 text-xs text-neutral-600 hover:bg-neutral-200 transition font-bold"
              >
                +
              </button>
            </div>

            <!-- Price -->
            <div class="text-right">
              <span class="text-sm font-bold text-neutral-900">$${item.price * item.quantity}</span>
              ${item.quantity > 1 ? `<span class="block text-[10px] text-neutral-400">($${item.price} each)</span>` : ''}
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  updateDrawerSummary(totals, true);
  if (window.lucide) window.lucide.createIcons();
}

function updateDrawerSummary(totals, hasItems) {
  const subtotalEl = document.getElementById('drawer-subtotal');
  const discountRow = document.getElementById('drawer-discount-row');
  const discountEl = document.getElementById('drawer-discount');
  const shippingEl = document.getElementById('drawer-shipping');
  const taxEl = document.getElementById('drawer-tax');
  const totalEl = document.getElementById('drawer-total');
  const checkoutBtn = document.getElementById('drawer-checkout-btn');

  if (subtotalEl) subtotalEl.textContent = `$${totals.subtotal.toFixed(2)}`;
  
  if (discountRow && discountEl) {
    if (totals.discount > 0) {
      discountRow.classList.remove('hidden');
      discountEl.textContent = `-$${totals.discount.toFixed(2)}`;
    } else {
      discountRow.classList.add('hidden');
    }
  }

  if (shippingEl) {
    shippingEl.textContent = totals.shippingCost === 0 ? 'Complimentary' : `$${totals.shippingCost.toFixed(2)}`;
  }

  if (taxEl) taxEl.textContent = `$${totals.estimatedTax.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${totals.total.toFixed(2)}`;

  if (checkoutBtn) {
    checkoutBtn.disabled = !hasItems;
    if (hasItems) {
      checkoutBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    } else {
      checkoutBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }
  }
}

// Promo Code system
function applyPromoCode() {
  const input = document.getElementById('promo-input');
  if (!input) return;

  const code = input.value.trim().toUpperCase();
  if (!code) {
    showToast('Please enter a coupon code', 'warning');
    return;
  }

  if (PROMO_CODES[code]) {
    state.appliedPromo = { code, ...PROMO_CODES[code] };
    showToast(`Code "${code}" applied: ${PROMO_CODES[code].description}`, 'success');
    renderCartDrawer();
    const badge = document.getElementById('applied-promo-badge');
    if (badge) {
      badge.innerHTML = `
        <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-semibold">
          <i data-lucide="tag" class="w-3.5 h-3.5"></i>
          ${code} (${PROMO_CODES[code].description})
          <button onclick="removePromoCode()" class="ml-1 hover:text-emerald-950 font-bold">&times;</button>
        </span>
      `;
      if (window.lucide) window.lucide.createIcons();
    }
  } else {
    showToast('Invalid promo code. Try "TASTE20" for 20% off!', 'error');
  }
}

function removePromoCode() {
  state.appliedPromo = null;
  const badge = document.getElementById('applied-promo-badge');
  if (badge) badge.innerHTML = '';
  renderCartDrawer();
  showToast('Promo code removed', 'info');
}

// Quick View Modal
function openQuickView(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  state.activeQuickViewProduct = product;
  state.selectedQuickSize = product.sizes[0];
  state.selectedQuickColor = product.colors[0].name;
  state.quickViewQuantity = 1;

  const modal = document.getElementById('quickview-modal');
  if (!modal) return;

  document.getElementById('qv-title').textContent = product.name;
  document.getElementById('qv-category').textContent = product.categoryLabel;
  document.getElementById('qv-tagline').textContent = product.tagline;
  document.getElementById('qv-price').textContent = `$${product.price}`;
  
  const origPriceEl = document.getElementById('qv-original-price');
  if (origPriceEl) {
    if (product.originalPrice) {
      origPriceEl.textContent = `$${product.originalPrice}`;
      origPriceEl.classList.remove('hidden');
    } else {
      origPriceEl.classList.add('hidden');
    }
  }

  document.getElementById('qv-rating').textContent = `${product.rating} (${product.reviewsCount} reviews)`;
  document.getElementById('qv-description').textContent = product.description;

  // Main Image
  const mainImg = document.getElementById('qv-main-image');
  if (mainImg) mainImg.src = product.primaryImage;

  // Thumbnails
  const thumbsContainer = document.getElementById('qv-thumbnails');
  if (thumbsContainer) {
    thumbsContainer.innerHTML = `
      <img src="${product.primaryImage}" onclick="switchQuickViewImage('${product.primaryImage}')" class="w-16 h-20 object-cover rounded-lg border-2 border-neutral-900 cursor-pointer" />
      <img src="${product.secondaryImage}" onclick="switchQuickViewImage('${product.secondaryImage}')" class="w-16 h-20 object-cover rounded-lg border border-neutral-200 hover:border-neutral-400 cursor-pointer" />
    `;
  }

  // Size Picker
  renderQuickViewSizes();

  // Color Picker
  const colorContainer = document.getElementById('qv-colors');
  if (colorContainer) {
    colorContainer.innerHTML = product.colors.map((c, i) => `
      <button 
        onclick="selectQuickViewColor('${c.name}')" 
        class="w-7 h-7 rounded-full border-2 ${i === 0 ? 'border-neutral-900 ring-2 ring-neutral-300' : 'border-white shadow-sm'} transition"
        style="background-color: ${c.hex};"
        title="${c.name}"
      ></button>
    `).join('');
  }

  // Details List
  const detailsList = document.getElementById('qv-details-list');
  if (detailsList) {
    detailsList.innerHTML = product.details.map(d => `
      <li class="flex items-center gap-2 text-xs text-neutral-600">
        <i data-lucide="check" class="w-3.5 h-3.5 text-neutral-800"></i>
        <span>${d}</span>
      </li>
    `).join('');
  }

  document.getElementById('qv-quantity').textContent = '1';

  modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function switchQuickViewImage(src) {
  const mainImg = document.getElementById('qv-main-image');
  if (mainImg) mainImg.src = src;
}

function renderQuickViewSizes() {
  const container = document.getElementById('qv-sizes');
  if (!container || !state.activeQuickViewProduct) return;

  const product = state.activeQuickViewProduct;
  container.innerHTML = product.sizes.map(size => {
    const isSelected = size === state.selectedQuickSize;
    const stock = product.stock[size] || 5;
    return `
      <button 
        onclick="selectQuickViewSize('${size}')" 
        class="py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider border transition-all ${
          isSelected 
            ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm' 
            : 'border-neutral-200 bg-white text-neutral-800 hover:border-neutral-400'
        }"
      >
        ${size}
        ${stock <= 3 ? `<span class="block text-[9px] font-normal ${isSelected ? 'text-amber-200' : 'text-amber-600'}">Only ${stock} left</span>` : ''}
      </button>
    `;
  }).join('');
}

function selectQuickViewSize(size) {
  state.selectedQuickSize = size;
  renderQuickViewSizes();
}

function selectQuickViewColor(color) {
  state.selectedQuickColor = color;
  showToast(`Selected color: ${color}`, 'info');
}

function changeQuickViewQuantity(delta) {
  state.quickViewQuantity = Math.max(1, state.quickViewQuantity + delta);
  const qEl = document.getElementById('qv-quantity');
  if (qEl) qEl.textContent = state.quickViewQuantity;
}

function addQuickViewToCart() {
  if (!state.activeQuickViewProduct) return;
  addToCart(
    state.activeQuickViewProduct,
    state.selectedQuickSize,
    state.selectedQuickColor || state.activeQuickViewProduct.colors[0].name,
    state.quickViewQuantity
  );
  closeQuickView();
}

function closeQuickView() {
  const modal = document.getElementById('quickview-modal');
  if (modal) modal.classList.add('hidden');
}

// Wishlist System
function toggleWishlist(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const index = state.wishlist.indexOf(productId);
  if (index > -1) {
    state.wishlist.splice(index, 1);
    showToast(`Removed "${product.name}" from saved pieces`, 'info');
  } else {
    state.wishlist.push(productId);
    showToast(`Saved "${product.name}" to your wishlist`, 'success');
  }

  localStorage.setItem('aether_wishlist', JSON.stringify(state.wishlist));
  updateWishlistBadge();
  renderProducts();
}

function updateWishlistBadge() {
  const badge = document.getElementById('wishlist-badge');
  const count = state.wishlist.length;
  if (!badge) return;
  if (count > 0) {
    badge.textContent = count;
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }
}

function openWishlistModal() {
  const modal = document.getElementById('wishlist-modal');
  const container = document.getElementById('wishlist-items-container');
  if (!modal || !container) return;

  const savedProducts = PRODUCTS.filter(p => state.wishlist.includes(p.id));

  if (savedProducts.length === 0) {
    container.innerHTML = `
      <div class="py-16 text-center">
        <div class="w-16 h-16 mx-auto mb-4 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-400">
          <i data-lucide="heart" class="w-8 h-8"></i>
        </div>
        <h4 class="font-serif-title text-xl font-medium text-neutral-800 mb-2">No Saved Pieces Yet</h4>
        <p class="text-xs text-neutral-500 max-w-xs mx-auto mb-6">Click the heart icon on any garment to create your personalized atelier wishlist.</p>
      </div>
    `;
  } else {
    container.innerHTML = savedProducts.map(p => `
      <div class="flex gap-4 p-4 border border-neutral-200 rounded-xl bg-white hover:border-neutral-300 transition items-center">
        <img src="${p.primaryImage}" class="w-16 h-20 object-cover rounded-lg bg-neutral-100 flex-shrink-0" />
        <div class="flex-1">
          <span class="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block">${p.categoryLabel}</span>
          <h5 class="text-sm font-semibold text-neutral-900">${p.name}</h5>
          <span class="text-sm font-bold text-neutral-900 mt-1 block">$${p.price}</span>
        </div>
        <div class="flex flex-col gap-2">
          <button 
            onclick="quickAddToCart('${p.id}'); toggleWishlist('${p.id}'); closeWishlistModal();"
            class="px-3 py-1.5 bg-neutral-900 text-white rounded-lg text-xs font-semibold hover:bg-neutral-800 transition flex items-center gap-1"
          >
            <i data-lucide="shopping-bag" class="w-3 h-3"></i> Move to Bag
          </button>
          <button 
            onclick="toggleWishlist('${p.id}'); openWishlistModal();"
            class="text-[11px] text-neutral-400 hover:text-rose-600 text-center transition"
          >
            Remove
          </button>
        </div>
      </div>
    `).join('');
  }

  modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeWishlistModal() {
  const modal = document.getElementById('wishlist-modal');
  if (modal) modal.classList.add('hidden');
}

// Checkout Experience
function openCheckoutModal() {
  if (state.cart.length === 0) {
    showToast('Your bag is empty', 'warning');
    return;
  }
  closeCartDrawer();
  state.checkoutStep = 1;
  const modal = document.getElementById('checkout-modal');
  if (!modal) return;
  modal.classList.remove('hidden');
  renderCheckoutStep();
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkout-modal');
  if (modal) modal.classList.add('hidden');
}

function setShippingMethod(method) {
  state.shippingMethod = method;
  renderCheckoutStep();
}

function prefillDemoCheckout() {
  state.shippingAddress = {
    fullName: 'Sophia Montgomery',
    email: 'sophia.montgomery@example.com',
    phone: '+1 (555) 234-5678',
    address: '742 Evergreen Terrace, Suite 4B',
    city: 'New York',
    state: 'NY',
    zip: '10012'
  };

  const nameInput = document.getElementById('checkout-name');
  const emailInput = document.getElementById('checkout-email');
  const phoneInput = document.getElementById('checkout-phone');
  const addressInput = document.getElementById('checkout-address');
  const cityInput = document.getElementById('checkout-city');
  const stateInput = document.getElementById('checkout-state');
  const zipInput = document.getElementById('checkout-zip');

  if (nameInput) nameInput.value = state.shippingAddress.fullName;
  if (emailInput) emailInput.value = state.shippingAddress.email;
  if (phoneInput) phoneInput.value = state.shippingAddress.phone;
  if (addressInput) addressInput.value = state.shippingAddress.address;
  if (cityInput) cityInput.value = state.shippingAddress.city;
  if (stateInput) stateInput.value = state.shippingAddress.state;
  if (zipInput) zipInput.value = state.shippingAddress.zip;

  showToast('Demo shipping address populated', 'info');
}

function renderCheckoutStep() {
  const stepContainer = document.getElementById('checkout-step-content');
  const totals = calculateCartTotals();
  const summaryContainer = document.getElementById('checkout-order-summary');

  // Render Order Summary sidebar
  if (summaryContainer) {
    summaryContainer.innerHTML = `
      <div class="mb-4 max-h-60 overflow-y-auto space-y-3 pr-1">
        ${state.cart.map(item => `
          <div class="flex items-center gap-3 text-xs">
            <div class="relative w-12 h-14 bg-neutral-100 rounded-lg overflow-hidden flex-shrink-0">
              <img src="${item.primaryImage}" class="w-full h-full object-cover" />
              <span class="absolute top-0 right-0 bg-neutral-900 text-white text-[9px] w-4 h-4 rounded-bl-md flex items-center justify-center font-bold">
                ${item.quantity}
              </span>
            </div>
            <div class="flex-1">
              <h6 class="font-semibold text-neutral-900 line-clamp-1">${item.name}</h6>
              <span class="text-neutral-500 text-[11px]">${item.size} • ${item.color}</span>
            </div>
            <span class="font-bold text-neutral-900">$${item.price * item.quantity}</span>
          </div>
        `).join('')}
      </div>

      <div class="space-y-2 pt-4 border-t border-neutral-200 text-xs">
        <div class="flex justify-between text-neutral-600">
          <span>Subtotal</span>
          <span class="font-semibold text-neutral-900">$${totals.subtotal.toFixed(2)}</span>
        </div>
        ${totals.discount > 0 ? `
          <div class="flex justify-between text-emerald-700 font-medium">
            <span>Discount (${state.appliedPromo?.code})</span>
            <span>-$${totals.discount.toFixed(2)}</span>
          </div>
        ` : ''}
        <div class="flex justify-between text-neutral-600">
          <span>Shipping (${state.shippingMethod === 'express' ? 'Priority Express' : 'Standard Delivery'})</span>
          <span class="font-semibold text-neutral-900">${totals.shippingCost === 0 ? 'Free' : `$${totals.shippingCost.toFixed(2)}`}</span>
        </div>
        <div class="flex justify-between text-neutral-600">
          <span>Estimated Sales Tax</span>
          <span class="font-semibold text-neutral-900">$${totals.estimatedTax.toFixed(2)}</span>
        </div>
        <div class="flex justify-between text-base font-bold text-neutral-900 pt-3 border-t border-neutral-200">
          <span>Total</span>
          <span>$${totals.total.toFixed(2)}</span>
        </div>
      </div>
    `;
  }

  // Update step progress indicator
  for (let i = 1; i <= 3; i++) {
    const stepIndicator = document.getElementById(`step-pill-${i}`);
    if (stepIndicator) {
      if (i === state.checkoutStep) {
        stepIndicator.className = "flex items-center gap-2 text-xs font-bold text-neutral-900 border-b-2 border-neutral-900 pb-2";
      } else if (i < state.checkoutStep) {
        stepIndicator.className = "flex items-center gap-2 text-xs font-semibold text-emerald-700 border-b-2 border-emerald-600 pb-2";
      } else {
        stepIndicator.className = "flex items-center gap-2 text-xs font-medium text-neutral-400 border-b-2 border-transparent pb-2";
      }
    }
  }

  if (!stepContainer) return;

  // Step 1: Shipping Address
  if (state.checkoutStep === 1) {
    stepContainer.innerHTML = `
      <div>
        <div class="flex items-center justify-between mb-4">
          <h4 class="font-serif-title text-xl font-semibold text-neutral-900">Shipping Details</h4>
          <button onclick="prefillDemoCheckout()" class="text-xs text-neutral-600 hover:text-neutral-900 underline font-medium flex items-center gap-1">
            <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
            Fill Demo Info
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div class="sm:col-span-2">
            <label class="block font-semibold text-neutral-700 mb-1">Full Name *</label>
            <input type="text" id="checkout-name" value="${state.shippingAddress.fullName}" class="w-full p-3 rounded-xl border border-neutral-300 focus:border-neutral-900 focus:outline-none" placeholder="e.g. Eleanor Vance" required />
          </div>

          <div>
            <label class="block font-semibold text-neutral-700 mb-1">Email Address *</label>
            <input type="email" id="checkout-email" value="${state.shippingAddress.email}" class="w-full p-3 rounded-xl border border-neutral-300 focus:border-neutral-900 focus:outline-none" placeholder="eleanor@atelier.com" required />
          </div>

          <div>
            <label class="block font-semibold text-neutral-700 mb-1">Phone Number *</label>
            <input type="tel" id="checkout-phone" value="${state.shippingAddress.phone}" class="w-full p-3 rounded-xl border border-neutral-300 focus:border-neutral-900 focus:outline-none" placeholder="+1 (555) 019-2834" required />
          </div>

          <div class="sm:col-span-2">
            <label class="block font-semibold text-neutral-700 mb-1">Street Address *</label>
            <input type="text" id="checkout-address" value="${state.shippingAddress.address}" class="w-full p-3 rounded-xl border border-neutral-300 focus:border-neutral-900 focus:outline-none" placeholder="140 Mercer Street, Apt 5" required />
          </div>

          <div>
            <label class="block font-semibold text-neutral-700 mb-1">City *</label>
            <input type="text" id="checkout-city" value="${state.shippingAddress.city}" class="w-full p-3 rounded-xl border border-neutral-300 focus:border-neutral-900 focus:outline-none" placeholder="New York" required />
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block font-semibold text-neutral-700 mb-1">State *</label>
              <input type="text" id="checkout-state" value="${state.shippingAddress.state}" class="w-full p-3 rounded-xl border border-neutral-300 focus:border-neutral-900 focus:outline-none" placeholder="NY" required />
            </div>
            <div>
              <label class="block font-semibold text-neutral-700 mb-1">ZIP *</label>
              <input type="text" id="checkout-zip" value="${state.shippingAddress.zip}" class="w-full p-3 rounded-xl border border-neutral-300 focus:border-neutral-900 focus:outline-none" placeholder="10012" required />
            </div>
          </div>
        </div>

        <div class="mt-8 flex justify-end">
          <button onclick="goToCheckoutStep2()" class="px-8 py-3 bg-neutral-900 text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition flex items-center gap-2">
            Continue to Delivery
            <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
    `;
  } 
  // Step 2: Shipping Method
  else if (state.checkoutStep === 2) {
    stepContainer.innerHTML = `
      <div>
        <h4 class="font-serif-title text-xl font-semibold text-neutral-900 mb-4">Select Shipping Speed</h4>
        
        <div class="space-y-3 mb-8">
          <label class="flex items-center justify-between p-4 rounded-xl border cursor-pointer transition ${state.shippingMethod === 'standard' ? 'border-neutral-900 bg-neutral-50/80 shadow-sm' : 'border-neutral-200 hover:border-neutral-300'}">
            <div class="flex items-center gap-3">
              <input type="radio" name="shipping-choice" value="standard" ${state.shippingMethod === 'standard' ? 'checked' : ''} onchange="setShippingMethod('standard')" class="accent-neutral-900 w-4 h-4" />
              <div>
                <span class="block text-sm font-semibold text-neutral-900">Standard Atelier Delivery (3–5 Business Days)</span>
                <span class="text-xs text-neutral-500">Fully tracked climate-neutral ground shipment</span>
              </div>
            </div>
            <span class="text-sm font-bold text-neutral-900">${totals.qualifiesFreeShipping ? 'FREE' : '$12.00'}</span>
          </label>

          <label class="flex items-center justify-between p-4 rounded-xl border cursor-pointer transition ${state.shippingMethod === 'express' ? 'border-neutral-900 bg-neutral-50/80 shadow-sm' : 'border-neutral-200 hover:border-neutral-300'}">
            <div class="flex items-center gap-3">
              <input type="radio" name="shipping-choice" value="express" ${state.shippingMethod === 'express' ? 'checked' : ''} onchange="setShippingMethod('express')" class="accent-neutral-900 w-4 h-4" />
              <div>
                <span class="block text-sm font-semibold text-neutral-900">Priority Express Air (1–2 Business Days)</span>
                <span class="text-xs text-neutral-500">Guaranteed next-day dispatch from atelier with white-glove courier</span>
              </div>
            </div>
            <span class="text-sm font-bold text-neutral-900">$15.00</span>
          </label>
        </div>

        <div class="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-600 mb-8 flex items-center gap-2">
          <i data-lucide="shield-check" class="w-4 h-4 text-emerald-600 flex-shrink-0"></i>
          <span>All packages are insured against loss or damage with signature required upon arrival.</span>
        </div>

        <div class="flex justify-between items-center">
          <button onclick="goToCheckoutStep(1)" class="text-xs text-neutral-600 hover:text-neutral-900 font-semibold flex items-center gap-1">
            <i data-lucide="arrow-left" class="w-4 h-4"></i>
            Back to Shipping Address
          </button>
          <button onclick="goToCheckoutStep(3)" class="px-8 py-3 bg-neutral-900 text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition flex items-center gap-2">
            Continue to Payment
            <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
    `;
  }
  // Step 3: Payment
  else if (state.checkoutStep === 3) {
    stepContainer.innerHTML = `
      <div>
        <h4 class="font-serif-title text-xl font-semibold text-neutral-900 mb-4">Payment Method</h4>

        <!-- Express Pay simulation buttons -->
        <div class="grid grid-cols-2 gap-3 mb-6">
          <button onclick="simulateFastPay('Apple Pay')" class="py-3 px-4 bg-black text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 hover:bg-neutral-800 transition">
            <i data-lucide="smartphone" class="w-4 h-4"></i> Apple Pay
          </button>
          <button onclick="simulateFastPay('Google Pay')" class="py-3 px-4 border border-neutral-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 hover:bg-neutral-50 transition">
            <i data-lucide="credit-card" class="w-4 h-4"></i> Google Pay
          </button>
        </div>

        <div class="relative flex py-2 items-center mb-6">
          <div class="flex-grow border-t border-neutral-200"></div>
          <span class="flex-shrink mx-4 text-xs uppercase tracking-wider text-neutral-400 font-semibold">Or pay with credit card</span>
          <div class="flex-grow border-t border-neutral-200"></div>
        </div>

        <div class="space-y-4 text-xs">
          <div>
            <label class="block font-semibold text-neutral-700 mb-1">Card Number *</label>
            <div class="relative">
              <input 
                type="text" 
                id="card-number" 
                maxlength="19"
                placeholder="4242 •••• •••• 4242" 
                value="4242 4242 4242 4242"
                class="w-full p-3 rounded-xl border border-neutral-300 focus:border-neutral-900 focus:outline-none font-mono" 
              />
              <i data-lucide="lock" class="w-4 h-4 text-neutral-400 absolute right-3 top-3.5"></i>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block font-semibold text-neutral-700 mb-1">Expiration (MM/YY) *</label>
              <input 
                type="text" 
                id="card-exp" 
                maxlength="5"
                placeholder="12/28" 
                value="10/28"
                class="w-full p-3 rounded-xl border border-neutral-300 focus:border-neutral-900 focus:outline-none font-mono" 
              />
            </div>
            <div>
              <label class="block font-semibold text-neutral-700 mb-1">CVC / Security Code *</label>
              <input 
                type="password" 
                id="card-cvc" 
                maxlength="4"
                placeholder="987" 
                value="987"
                class="w-full p-3 rounded-xl border border-neutral-300 focus:border-neutral-900 focus:outline-none font-mono" 
              />
            </div>
          </div>

          <div>
            <label class="block font-semibold text-neutral-700 mb-1">Name on Card *</label>
            <input 
              type="text" 
              id="card-name" 
              value="${state.shippingAddress.fullName || 'Eleanor Vance'}"
              placeholder="Eleanor Vance" 
              class="w-full p-3 rounded-xl border border-neutral-300 focus:border-neutral-900 focus:outline-none" 
            />
          </div>
        </div>

        <div class="mt-8 flex justify-between items-center">
          <button onclick="goToCheckoutStep(2)" class="text-xs text-neutral-600 hover:text-neutral-900 font-semibold flex items-center gap-1">
            <i data-lucide="arrow-left" class="w-4 h-4"></i>
            Back to Delivery
          </button>
          
          <button 
            id="place-order-btn"
            onclick="processOrderPayment()" 
            class="px-8 py-3.5 bg-neutral-900 text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition flex items-center gap-2 shadow-lg hover:shadow-xl active:scale-95"
          >
            <span>Complete Order ($${totals.total.toFixed(2)})</span>
            <i data-lucide="lock" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>
    `;
  }

  if (window.lucide) window.lucide.createIcons();
}

function goToCheckoutStep(step) {
  state.checkoutStep = step;
  renderCheckoutStep();
}

function goToCheckoutStep2() {
  const name = document.getElementById('checkout-name')?.value.trim();
  const email = document.getElementById('checkout-email')?.value.trim();
  const address = document.getElementById('checkout-address')?.value.trim();
  const city = document.getElementById('checkout-city')?.value.trim();
  const stateVal = document.getElementById('checkout-state')?.value.trim();
  const zip = document.getElementById('checkout-zip')?.value.trim();

  if (!name || !email || !address || !city || !stateVal || !zip) {
    showToast('Please fill out all required shipping fields', 'warning');
    return;
  }

  state.shippingAddress = {
    fullName: name,
    email: email,
    phone: document.getElementById('checkout-phone')?.value.trim() || '',
    address: address,
    city: city,
    state: stateVal,
    zip: zip
  };

  goToCheckoutStep(2);
}

function simulateFastPay(provider) {
  showToast(`Authenticating with ${provider}...`, 'info');
  setTimeout(() => {
    processOrderPayment();
  }, 1000);
}

function processOrderPayment() {
  const btn = document.getElementById('place-order-btn');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      Processing Secure Transaction...
    `;
  }

  setTimeout(() => {
    const orderNumber = `AET-${Math.floor(100000 + Math.random() * 900000)}`;
    const totals = calculateCartTotals();
    
    state.lastOrder = {
      orderNumber,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      items: [...state.cart],
      shippingAddress: { ...state.shippingAddress },
      totals: { ...totals },
      shippingMethod: state.shippingMethod
    };

    // Clear cart
    state.cart = [];
    saveCart();
    updateCartBadge();

    // Trigger celebration confetti
    if (window.confetti) {
      window.confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    renderOrderConfirmation();
  }, 1600);
}

function renderOrderConfirmation() {
  const modal = document.getElementById('checkout-modal');
  const container = document.getElementById('checkout-step-content');
  const summaryContainer = document.getElementById('checkout-order-summary');
  const stepBar = document.getElementById('checkout-step-bar');

  if (stepBar) stepBar.classList.add('hidden');
  if (summaryContainer) summaryContainer.parentElement.classList.add('hidden');

  if (container && state.lastOrder) {
    const order = state.lastOrder;
    container.parentElement.className = "w-full max-w-2xl mx-auto p-6 sm:p-10";
    container.innerHTML = `
      <div class="text-center py-4">
        <div class="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm">
          <i data-lucide="check" class="w-10 h-10"></i>
        </div>

        <span class="text-xs font-bold tracking-widest text-neutral-400 uppercase">Order Confirmed</span>
        <h3 class="font-serif-title text-3xl font-semibold text-neutral-900 mt-1 mb-2">Thank you, ${order.shippingAddress.fullName.split(' ')[0]}</h3>
        <p class="text-sm text-neutral-600 max-w-md mx-auto mb-6">
          Your order <strong>#${order.orderNumber}</strong> has been received by our atelier. A confirmation receipt has been dispatched to <strong>${order.shippingAddress.email || 'your email'}</strong>.
        </p>

        <!-- Order Timeline -->
        <div class="bg-neutral-50 rounded-2xl p-6 border border-neutral-200 mb-8 text-left">
          <h5 class="text-xs uppercase font-bold tracking-wider text-neutral-400 mb-4">Estimated Delivery Progress</h5>
          
          <div class="grid grid-cols-4 gap-2 text-center text-xs">
            <div class="space-y-1">
              <div class="w-7 h-7 mx-auto rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold">1</div>
              <span class="font-semibold text-neutral-900 block">Received</span>
              <span class="text-[10px] text-emerald-600 font-medium">Today</span>
            </div>
            <div class="space-y-1">
              <div class="w-7 h-7 mx-auto rounded-full bg-neutral-200 text-neutral-600 flex items-center justify-center font-bold">2</div>
              <span class="text-neutral-500 block">Atelier Pack</span>
              <span class="text-[10px] text-neutral-400">In 24h</span>
            </div>
            <div class="space-y-1">
              <div class="w-7 h-7 mx-auto rounded-full bg-neutral-200 text-neutral-600 flex items-center justify-center font-bold">3</div>
              <span class="text-neutral-500 block">Dispatched</span>
              <span class="text-[10px] text-neutral-400">In 48h</span>
            </div>
            <div class="space-y-1">
              <div class="w-7 h-7 mx-auto rounded-full bg-neutral-200 text-neutral-600 flex items-center justify-center font-bold">4</div>
              <span class="text-neutral-500 block">Delivered</span>
              <span class="text-[10px] text-neutral-400">${order.shippingMethod === 'express' ? '2 Business Days' : '4-5 Days'}</span>
            </div>
          </div>
        </div>

        <!-- Order Receipt Breakdown -->
        <div class="border border-neutral-200 rounded-2xl p-5 mb-8 text-left text-xs space-y-3">
          <div class="flex justify-between pb-3 border-b border-neutral-100 font-semibold text-neutral-800">
            <span>Garments (${order.items.length})</span>
            <span>Subtotal: $${order.totals.subtotal.toFixed(2)}</span>
          </div>
          ${order.items.map(item => `
            <div class="flex justify-between text-neutral-600">
              <span>${item.quantity}× ${item.name} (${item.size})</span>
              <span class="font-semibold text-neutral-900">$${item.price * item.quantity}</span>
            </div>
          `).join('')}
          <div class="pt-3 border-t border-neutral-100 flex justify-between font-bold text-sm text-neutral-900">
            <span>Total Paid</span>
            <span>$${order.totals.total.toFixed(2)}</span>
          </div>
        </div>

        <button 
          onclick="finishOrderAndReturnHome()"
          class="px-8 py-3.5 bg-neutral-900 text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition shadow-md"
        >
          Continue Exploring Collection
        </button>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
  }
}

function finishOrderAndReturnHome() {
  closeCheckoutModal();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // Reset checkout modal layout
  location.reload();
}

function openSizeGuideModal() {
  const modal = document.getElementById('sizeguide-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeSizeGuideModal() {
  const modal = document.getElementById('sizeguide-modal');
  if (modal) modal.classList.add('hidden');
}

function closeAllModals() {
  closeCartDrawer();
  closeQuickView();
  closeWishlistModal();
  closeCheckoutModal();
  closeSizeGuideModal();
  const mobileMenu = document.getElementById('mobile-menu-drawer');
  if (mobileMenu) mobileMenu.classList.add('hidden');
}

// Toast System
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  const bgStyles = {
    success: 'bg-neutral-900 text-white border-neutral-800',
    error: 'bg-rose-900 text-white border-rose-800',
    warning: 'bg-amber-900 text-white border-amber-800',
    info: 'bg-neutral-800 text-white border-neutral-700'
  };

  const icons = {
    success: 'check-circle',
    error: 'alert-circle',
    warning: 'alert-triangle',
    info: 'info'
  };

  toast.className = `toast-animate flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border text-xs font-medium ${bgStyles[type] || bgStyles.info}`;
  toast.innerHTML = `
    <i data-lucide="${icons[type] || 'info'}" class="w-4 h-4 flex-shrink-0"></i>
    <span class="flex-1">${message}</span>
  `;

  container.appendChild(toast);
  if (window.lucide) window.lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// Newsletter submit feedback
function handleNewsletterSubmit(e) {
  e.preventDefault();
  const emailInput = document.getElementById('newsletter-email');
  if (emailInput && emailInput.value) {
    showToast(`Welcome to the Atelier. A 10% welcome invitation has been sent to ${emailInput.value}`, 'success');
    emailInput.value = '';
  }
}
