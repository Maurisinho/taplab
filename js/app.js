/* ==========================================================================
   TAPLAB — JAVASCRIPT APPLICATION
   Interactive Catalog, NFC Tap Simulator, Shopping Cart & WhatsApp Checkout
   ========================================================================== */

const PRODUCTS = [
  {
    id: 'tap-card',
    num: '01',
    title: 'TAP CARD',
    tagline: 'Tu identidad en un solo toque.',
    category: 'personal',
    featured: true,
    starLabel: '🥈 Popular',
    description: 'Una tarjeta inteligente que comparte tu perfil, redes y contacto al acercarla a cualquier smartphone compatible.',
    features: ['Instagram, WhatsApp & TikTok', 'Página web & Portafolio', 'Descarga de contacto vCard', 'Sin aplicaciones requeridas'],
    images: [
      'https://images.openai.com/static-rsc-4/hLL8TCOEuarBekA50sPCjehf6W0w8jf5sMHqQIA8eUP4Iqvr9OLtXd-QhjKMV1sXp79kp6v_1afLOwMlyR4hDmljac6bIuELYKLI62c57PHYsxnZM2ehx-oi368myHksuV7GScKoPLJOR5J3ih43uBnBpFbZhP-DzZKJUN1bQbldTSIBGRCv4ihX-qfVhOAw?purpose=fullsize',
      'https://images.openai.com/static-rsc-4/dYAEG-2Sv2DQn_GGj3fVgxILtsaXaUQy_KEGVV7H_Xx4_1kKfWjqPdjGUgwoxS5AuYzVBTEMU8LFtF30eNROR2AjTCXwEAkUMJg_DMfyTAnlAxRACktzDPTFqoLrpEiaWoxIQWMNItbaFoXQN_PWMQSHKPKQmW3-PwMZPp9euATqQrCLRTHHrePm2dJnjBdG?purpose=fullsize'
    ],
    variants: [
      { name: 'Basic', price: 250 },
      { name: 'Custom', price: 350 },
      { name: 'Premium', price: 500 }
    ],
    selectedVariantIndex: 0
  },
  {
    id: 'review-tap',
    num: '02',
    title: 'REVIEW TAP',
    tagline: 'Convierte clientes felices en reseñas.',
    category: 'business',
    featured: true,
    starLabel: '🔥 Producto Estrella',
    description: 'Placa NFC + QR para mostradores. Los clientes acercan su teléfono y van directo a dejar 5 estrellas en Google Reviews.',
    features: ['Aumenta reseñas en Google', 'NFC + QR de alta resolución', 'Personalizado con tu logo', 'Ideal para restaurantes y clínicas'],
    images: [
      'https://images.openai.com/static-rsc-4/nD8vWJ8auheIc6ahPeFFN8Vmod1wg5dOi0PA9Jq32PF9wR7F_h7IRdLKUnFiB0Gd-zndV5YGaH40NIPZ1IMhu8ARcnMLsb5hYsjKa4IdfCl2DCA6SLG19SjdCOTUhwS-9qwYWe8qrDVlghsEWMiggMhs7z-XIh970-8a6SmkI6j8IYEU1EFCaCmJQ2Fer_r-?purpose=fullsize',
      'https://images.openai.com/static-rsc-4/Ofd39gRw0mQCOHw0c_AsP7osFuqs7HQU99Xxm0DHfLD5OB63b90JbjbkI8WcsAyfTETqNr9Ubp13_7oopxH1wsbdIxzBhIRkn8lZry0kYLTh6U8mt3dr4YkYcgZC9JjjgbEnmee52EFKuf1X8gWffVvUrYqdPXrnfjdEhcmKKe4JXhO6m7mtnzJwfksMMAah?purpose=fullsize'
    ],
    variants: [
      { name: 'Acrílico Estándar', price: 450 },
      { name: 'Stand Premium con Logo', price: 650 }
    ],
    selectedVariantIndex: 0
  },
  {
    id: 'wifi-tap',
    num: '03',
    title: 'WIFI TAP',
    tagline: 'Comparte tu WiFi sin decir la contraseña.',
    category: 'business',
    featured: false,
    description: 'Placa inteligente para mesas u oficinas. Un toque o escaneo conecta al huésped o cliente automáticamente a tu red.',
    features: ['Conexión rápida en 1 segundo', 'Ideal para Airbnb y Cafeterías', 'Sin escribir contraseñas largas', 'Compatible con iPhone y Android'],
    images: [
      'https://images.openai.com/static-rsc-4/nWivvTFvJKHVs8kSFUJCevF2_tEMxcpvZIHTKeX9vhwI0sIimfJqpR3UpMKjPBMlbr71dtv2XQ5nzqS0YekTZsZXBYIwVvi8ICo8zIK1ohriLKKneZL1LNGi0IWKHsKIFdtCfPP6kOagHgbGaXxPbqwOu7ee5VkKtlHNU_fQ4HjX4c1rG8UbhghHcWlxKXKp?purpose=fullsize'
    ],
    variants: [
      { name: 'Mini', price: 250 },
      { name: 'Stand', price: 400 },
      { name: 'Custom Pro', price: 550 }
    ],
    selectedVariantIndex: 0
  },
  {
    id: 'pet-tag',
    num: '04',
    title: 'PET TAG',
    tagline: 'Si se pierde, ayúdalo a volver.',
    category: 'personal',
    featured: true,
    starLabel: '🐾 Emocional',
    description: 'Placa inteligente de collar con NFC + QR visible. Quien lo encuentre puede contactarte al instante por WhatsApp o llamada.',
    features: ['Nombre y Foto de la Mascota', 'Teléfono & WhatsApp del dueño', 'Ficha veterinaria y alergias', 'QR visible para cualquier celular'],
    images: [
      'https://images.openai.com/static-rsc-4/u-T50k4cgFPpbB1EU-sS3GmUyd8yh9j4aCO2A-lE2bWCjEV2xt1mMsWmq5cyXnJoBa87_6E9eoe0srn0SwlWYuJe_tGdL6vXt0M4eIiGUo-EfEOIgc5V_gkwbAPAxdQ0TCxLYr2CLvKOPtyu4A6V2AQIYhax39IgoPfN5mNUd_fNTPy7xvJBK7mgewaemqE0?purpose=fullsize',
      'https://images.openai.com/static-rsc-4/w7rHTQmSQbpGG3tAp36aX3XfAUohXTUk9qt9M2XtakZApcFzTUjw0TRD40m7TB_W18pqfIFI_N7O8w-a0dWeTH3_And9PgYZSeXTjbbLwPcAUD-SHFA8mBaxncS39QlNiv_qkR4S8ZqK9r1dw5qKxWizzaUNYnWJ2bDTLdGc-NhkaJEbqKuQkMGcu3ek4W3Y?purpose=fullsize'
    ],
    variants: [
      { name: 'Basic Round', price: 250 },
      { name: 'Custom Collar Tag', price: 400 }
    ],
    selectedVariantIndex: 0
  },
  {
    id: 'smart-key',
    num: '05',
    title: 'SMART KEY',
    tagline: 'Más que un llavero.',
    category: 'personal',
    featured: false,
    description: 'Llavero de diseño compacto con chip NFC. Ideal para llevar tus redes o información clave siempre junto a tus llaves.',
    features: ['Compartir redes y WhatsApp', 'Perfil profesional', 'Diseño resistente al agua', 'Acabado contemporáneo'],
    images: [
      'https://images.openai.com/static-rsc-4/IKnZoKF48XtO513h8p1Ay1Iwfcn7oxKHe3q-TAuCBjqSbctazQPOuFvn6RJwecsj31OkGftsSYa06Zv3HDD_NCr712SSFXWRtebimfGBF_IGKDakC1foAGPbd2uv-QbacTQS4md8W0skEWiIeqbRyNHuloFeHe8DfUl3sBsfyjES_qCEpqLStghmais5QGLs?purpose=fullsize'
    ],
    variants: [
      { name: 'Basic Key', price: 180 },
      { name: 'Custom Key', price: 280 },
      { name: 'Premium Key', price: 380 }
    ],
    selectedVariantIndex: 0
  },
  {
    id: 'emergency-tag',
    num: '06',
    title: 'EMERGENCY TAG',
    tagline: 'Tu información importante, siempre contigo.',
    category: 'personal',
    featured: false,
    description: 'Tarjeta o accesorio NFC + QR diseñado para emergencias médicas, datos familiares o contactos de auxilio inmediato.',
    features: ['Contactos de emergencia', 'Tipo de sangre y alergias', 'Acceso inmediato sin desbloquear', 'Diseño discreto y seguro'],
    images: [
      'https://images.openai.com/static-rsc-4/-xLuYdC_AAS1lu9Cx9AD0ovS3wd-GvXxU8DgAiNv7dkf2B625U3maOJc1CARxouoVy2SGGNHmovS_MKdalaYS8a-3E3LJKQFpn7sUpiddTPKOqx1_icAKLdM1uoQ-zk30I43EOas8t6JvUCYJ8DmMNfycfLdhazOvUBtQ9mT8uq3vm6K5XsT1KUACxffUxUH?purpose=fullsize'
    ],
    variants: [
      { name: 'Standard Tag', price: 250 },
      { name: 'Custom Medic Tag', price: 350 }
    ],
    selectedVariantIndex: 0
  }
];

const BUSINESS_KITS = [
  {
    id: 'biz-review-kit',
    title: 'Business Review Kit',
    price: 650,
    desc: 'La solución directa para disparar las reseñas de tu negocio en Google.',
    items: ['1x Review TAP Acrílica', 'Código QR grabado', 'Chip NFC de alta sensibilidad', 'Diseño con Logo']
  },
  {
    id: 'biz-starter-kit',
    title: 'Business Starter Kit',
    price: 1200,
    badge: 'Recomendado para Negocios',
    desc: 'El combo completo para modernizar la experiencia de tus clientes.',
    items: ['1x Review TAP', '1x WiFi TAP', '1x TAP CARD ejecutiva', 'Configuración integral']
  }
];

const SIM_SCREENS = {
  'tap-card': {
    title: 'Perfil Profesional',
    banner: '📲 TAPLAB Card detectada',
    render: () => `
      <div class="sim-avatar">TL</div>
      <h4 style="font-size: 18px; font-weight: 700; margin-bottom: 2px;">Mauricio Reyes</h4>
      <p style="font-size: 12px; color: var(--copper-signal); font-weight: 600; margin-bottom: 12px;">Fundador & Creador Digital</p>
      <div class="sim-social-links">
        <div class="sim-link-btn" style="background:#25D366; color:white; border:none;">
          <span>💬</span> WhatsApp Directo
        </div>
        <div class="sim-link-btn" style="background:#E1306C; color:white; border:none;">
          <span>📸</span> Seguir en Instagram
        </div>
        <div class="sim-link-btn" style="background:var(--graphite-ink); color:white; border:none;">
          <span>💾</span> Guardar Contacto vCard
        </div>
      </div>
    `
  },
  'review-tap': {
    title: 'Google Reviews',
    banner: '⭐ Review TAP escaneado',
    render: () => `
      <div style="background:white; padding:18px; border-radius:14px; box-shadow:0 4px 12px rgba(0,0,0,0.06); width:100%; text-align:center;">
        <div style="font-size:24px; font-weight:700; color:#4285F4; margin-bottom:4px;">Google</div>
        <h4 style="font-size:16px; font-weight:700; margin-bottom:4px;">Café & Bistro Central</h4>
        <p style="font-size:11px; color:#6B7280; margin-bottom:14px;">¿Cómo calificarías tu experiencia hoy?</p>
        <div style="display:flex; justify-content:center; gap:8px; font-size:26px; color:#FBBC05; margin-bottom:16px;">
          <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
        </div>
        <button class="btn btn-primary" style="width:100%; font-size:13px; padding:10px;">Dejar Reseña en 1 Clic</button>
      </div>
    `
  },
  'wifi-tap': {
    title: 'Conexión WiFi Instantánea',
    banner: '📶 Red WiFi encontrada',
    render: () => `
      <div style="background:white; padding:20px; border-radius:14px; box-shadow:0 4px 12px rgba(0,0,0,0.06); width:100%; text-align:center;">
        <div style="width:50px; height:50px; border-radius:50%; background:var(--copper-subtle); color:var(--copper-signal); display:flex; align-items:center; justify-content:center; margin:0 auto 12px; font-size:22px;">📶</div>
        <h4 style="font-size:16px; font-weight:700;">Conectarse a la Red</h4>
        <p style="font-size:13px; font-weight:600; color:var(--copper-signal); margin-top:2px;">"TAPLAB_Guest_5G"</p>
        <button class="btn btn-dark" style="width:100%; font-size:13px; padding:10px; margin-top:14px;">Unirse a la Red</button>
      </div>
    `
  },
  'pet-tag': {
    title: 'Ficha de Mascota Segura',
    banner: '🐾 Escaneo de Pet Tag activo',
    render: () => `
      <div style="background:white; padding:16px; border-radius:14px; box-shadow:0 4px 12px rgba(0,0,0,0.06); width:100%;">
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
          <div style="width:48px; height:48px; border-radius:50%; background:#FAF2E8; display:flex; align-items:center; justify-content:center; font-size:22px;">🐶</div>
          <div>
            <h4 style="font-size:16px; font-weight:700; margin:0;">Rocky</h4>
            <span style="font-size:11px; background:#FEF3C7; color:#92400E; padding:2px 8px; border-radius:4px; font-weight:600;">¡Estoy extraviado!</span>
          </div>
        </div>
        <div class="sim-social-links">
          <div class="sim-link-btn" style="background:#25D366; color:white; border:none; justify-content:center;">
            <span>📞</span> Llamar al Dueño
          </div>
        </div>
      </div>
    `
  }
};

let cart = [];

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  setupSimulator();
  setupCartListeners();
  setupSmoothScroll();
  setupMobileMenu();
});

function renderProducts(filter = 'all') {
  const container = document.getElementById('products-grid');
  if (!container) return;

  const filtered = PRODUCTS.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'featured') return p.featured;
    return p.category === filter;
  });

  container.innerHTML = filtered.map(product => {
    const activeVariant = product.variants[product.selectedVariantIndex];
    const image = product.images[0];
    
    return `
      <div class="product-card ${product.featured ? 'featured-star' : ''}">
        ${product.starLabel ? `<div class="product-badge-corner">${product.starLabel}</div>` : ''}
        <div class="product-gallery">
          <img src="${image}" alt="${product.title}" class="product-img" onerror="this.src='assets/images/isotype-dark.png'">
        </div>
        <div class="product-content">
          <div class="product-header-meta">
            <span class="product-num">${product.num} — ${product.category.toUpperCase()}</span>
          </div>
          <h3 class="product-title">${product.title}</h3>
          <p class="product-tagline">${product.tagline}</p>
          <p class="product-desc">${product.description}</p>
          
          <div class="product-variants-box">
            <span class="variants-label">Variante:</span>
            <div class="variants-options">
              ${product.variants.map((v, idx) => `
                <button class="variant-btn ${idx === product.selectedVariantIndex ? 'active' : ''}" onclick="selectVariant('${product.id}', ${idx})">
                  ${v.name}
                </button>
              `).join('')}
            </div>
          </div>
          
          <div class="product-footer">
            <div class="product-price-box">
              <span class="price-prefix">Precio</span>
              <div class="price-value"><span class="price-currency">L</span>${activeVariant.price}</div>
            </div>
            <button class="btn btn-primary btn-sm" onclick="addToCart('${product.id}')">
              <span>+ Agregar</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

window.selectVariant = function(productId, variantIndex) {
  const prod = PRODUCTS.find(p => p.id === productId);
  if (prod) {
    prod.selectedVariantIndex = variantIndex;
    renderProducts(window.currentFilter || 'all');
  }
};

window.filterProducts = function(category, element) {
  window.currentFilter = category;
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  element.classList.add('active');
  renderProducts(category);
};

function setupSimulator() {
  const buttons = document.querySelectorAll('.sim-item-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.getAttribute('data-sim');
      loadSimulatorScreen(target);
    });
  });
  loadSimulatorScreen('tap-card');
}

function loadSimulatorScreen(key) {
  const screen = SIM_SCREENS[key] || SIM_SCREENS['tap-card'];
  const phoneScreen = document.getElementById('simulator-screen-target');
  if (!phoneScreen) return;

  phoneScreen.innerHTML = `
    <div class="tap-banner-notification">
      <span style="font-size: 18px;">⚡</span>
      <div style="text-align: left;">
        <div style="font-size: 11px; color: var(--copper-light); font-weight: 700;">TAPLAB NFC</div>
        <div style="font-size: 13px; font-weight: 600;">${screen.banner}</div>
      </div>
    </div>
    <div class="sim-screen-content">
      ${screen.render()}
    </div>
  `;
}

function setupCartListeners() {
  const cartToggleBtn = document.getElementById('cart-toggle-btn');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-overlay');
  const closeCartBtn = document.getElementById('close-cart-btn');

  const toggleCart = () => {
    cartDrawer.classList.toggle('active');
    cartOverlay.classList.toggle('active');
  };

  if (cartToggleBtn) cartToggleBtn.addEventListener('click', toggleCart);
  if (closeCartBtn) closeCartBtn.addEventListener('click', toggleCart);
  if (cartOverlay) cartOverlay.addEventListener('click', toggleCart);
}

window.addToCart = function(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const variant = product.variants[product.selectedVariantIndex];
  const itemKey = `${product.id}-${variant.name}`;

  const existing = cart.find(item => item.key === itemKey);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      key: itemKey,
      id: product.id,
      title: product.title,
      variantName: variant.name,
      price: variant.price,
      image: product.images[0],
      qty: 1
    });
  }

  updateCartUI();
  showToast(`¡Agregaste ${product.title} (${variant.name})!`);
};

window.addBusinessKit = function(kitId) {
  const kit = BUSINESS_KITS.find(k => k.id === kitId);
  if (!kit) return;

  const itemKey = kit.id;
  const existing = cart.find(item => item.key === itemKey);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      key: itemKey,
      id: kit.id,
      title: kit.title,
      variantName: 'Kit Completo',
      price: kit.price,
      image: 'assets/images/isotype-dark.png',
      qty: 1
    });
  }

  updateCartUI();
  showToast(`¡Agregaste ${kit.title}!`);
};

window.updateQty = function(itemKey, delta) {
  const item = cart.find(i => i.key === itemKey);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.key !== itemKey);
  }
  updateCartUI();
};

function updateCartUI() {
  const badge = document.getElementById('cart-count');
  const container = document.getElementById('cart-items-container');
  const totalElem = document.getElementById('cart-total-display');

  const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  if (badge) badge.textContent = totalQty;
  if (totalElem) totalElem.textContent = `L ${totalPrice.toLocaleString()}`;

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-state">
        <div class="cart-empty-icon">🛒</div>
        <p>Tu carrito está vacío.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.title}" class="cart-item-img" onerror="this.src='assets/images/isotype-dark.png'">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.title}</div>
        <div class="cart-item-variant">${item.variantName}</div>
        <div class="cart-item-price">L ${item.price} c/u</div>
        <div class="cart-item-actions">
          <button class="qty-btn" onclick="updateQty('${item.key}', -1)">-</button>
          <span style="font-size: 13px; font-weight: 700;">${item.qty}</span>
          <button class="qty-btn" onclick="updateQty('${item.key}', 1)">+</button>
          <span style="margin-left: auto; font-size: 14px; font-weight: 700;">L ${item.price * item.qty}</span>
        </div>
      </div>
    </div>
  `).join('');
}

window.checkoutWhatsApp = function() {
  if (cart.length === 0) {
    showToast('Tu carrito está vacío.');
    return;
  }

  let message = `¡Hola TAPLAB! 👋 Quiero realizar el siguiente pedido:\n\n`;
  let total = 0;

  cart.forEach((item, index) => {
    const subtotal = item.price * item.qty;
    total += subtotal;
    message += `${index + 1}. *${item.title}* (${item.variantName}) x${item.qty} = L ${subtotal}\n`;
  });

  message += `\n*TOTAL: L ${total.toLocaleString()}*\n¿Me podrían dar los detalles de pago y personalización?`;
  window.open(`https://wa.me/50499999999?text=${encodeURIComponent(message)}`, '_blank');
};

function showToast(message) {
  let toast = document.getElementById('site-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'site-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span>✨</span><span>${message}</span>`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

function setupMobileMenu() {
  const toggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => navLinks.classList.toggle('active'));
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('active'));
    });
  }
}

function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
