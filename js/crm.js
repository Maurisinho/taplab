/* ==========================================================================
   TAPLAB CRM & OPERATIONS SUITE — JAVASCRIPT LOGIC
   Private Auth with Master PIN, PWA Install & API / LocalStorage Sync
   ========================================================================== */

const DEFAULT_PIN = '1234';
let storedPin = localStorage.getItem('taplab_master_pin') || DEFAULT_PIN;

function checkAuthSession() {
  const isAuth = sessionStorage.getItem('taplab_crm_auth');
  const lockScreen = document.getElementById('lock-screen');
  if (isAuth === 'true') {
    if (lockScreen) lockScreen.classList.add('unlocked');
  } else {
    if (lockScreen) lockScreen.classList.remove('unlocked');
  }
}

function handlePinInput() {
  const digits = document.querySelectorAll('.pin-digit');
  digits.forEach((input, index) => {
    input.addEventListener('input', (e) => {
      if (e.target.value.length >= 1) {
        if (index < digits.length - 1) {
          digits[index + 1].focus();
        } else {
          verifyPin();
        }
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !e.target.value && index > 0) {
        digits[index - 1].focus();
      }
    });
  });
}

async function verifyPin() {
  const digits = document.querySelectorAll('.pin-digit');
  let enteredPin = '';
  digits.forEach(d => enteredPin += d.value);

  const errorMsg = document.getElementById('lock-error');

  // Check local or remote API
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin: enteredPin })
    });
    const data = await res.json();
    if (data.success) {
      grantAccess();
      return;
    }
  } catch (err) {
    // Local fallback
  }

  if (enteredPin === storedPin) {
    grantAccess();
  } else {
    if (errorMsg) errorMsg.style.display = 'block';
    digits.forEach(d => d.value = '');
    digits[0].focus();
  }
}

function grantAccess() {
  sessionStorage.setItem('taplab_crm_auth', 'true');
  const lockScreen = document.getElementById('lock-screen');
  const errorMsg = document.getElementById('lock-error');
  if (lockScreen) lockScreen.classList.add('unlocked');
  if (errorMsg) errorMsg.style.display = 'none';
  document.querySelectorAll('.pin-digit').forEach(d => d.value = '');
  loadDataFromAPI();
}

window.lockCRM = function() {
  sessionStorage.removeItem('taplab_crm_auth');
  const lockScreen = document.getElementById('lock-screen');
  if (lockScreen) lockScreen.classList.remove('unlocked');
  const firstDigit = document.querySelector('.pin-digit');
  if (firstDigit) firstDigit.focus();
};

// INITIAL SEED DATA
const INITIAL_ORDERS = [
  {
    id: 'TL-1082',
    clientName: 'Restaurante La Cumbre',
    clientPhone: '50498765432',
    clientEmail: 'gerencia@lacumbre.hn',
    clientType: 'B2B',
    product: 'Review TAP (Acrílico Stand)',
    variant: 'Stand Premium con Logo',
    qty: 3,
    total: 1950,
    status: 'production',
    date: '2026-09-05',
    notes: 'Grabar logotipo en dorado. Enlazar a Google Maps ID: g.page/lacumbre'
  },
  {
    id: 'TL-1083',
    clientName: 'Dra. Sofía Martínez',
    clientPhone: '50495123456',
    clientEmail: 'sofia.martinez@clinica.hn',
    clientType: 'B2B',
    product: 'TAP CARD Pro',
    variant: 'Custom Metal',
    qty: 1,
    total: 500,
    status: 'design',
    date: '2026-09-06',
    notes: 'Diseño minimalista con logo de odontología y enlace vCard.'
  },
  {
    id: 'TL-1084',
    clientName: 'Carlos Mendizábal',
    clientPhone: '50499887766',
    clientEmail: 'carlos.m@gmail.com',
    clientType: 'B2C',
    product: 'PET TAG Smart Collar',
    variant: 'Custom Collar Tag',
    qty: 2,
    total: 800,
    status: 'new',
    date: '2026-09-06',
    notes: 'Nombres de mascotas: "Toby" y "Luna". Teléfono grabado al reverso.'
  },
  {
    id: 'TL-1085',
    clientName: 'The Barber Club',
    clientPhone: '50494443322',
    clientEmail: 'info@barberclub.hn',
    clientType: 'B2B',
    product: 'Business Starter Kit',
    variant: 'Kit Completo (Review + WiFi + Card)',
    qty: 1,
    total: 1200,
    status: 'shipping',
    date: '2026-09-04',
    notes: 'Configurar red WiFi "Barber_VIP" y tarjeta para el administrador.'
  },
  {
    id: 'TL-1086',
    clientName: 'Mariana Pineda',
    clientPhone: '50497771122',
    clientEmail: 'mariana.photo@studio.hn',
    clientType: 'B2C',
    product: 'SMART KEY',
    variant: 'Custom Key',
    qty: 1,
    total: 280,
    status: 'completed',
    date: '2026-09-02',
    notes: 'Enlace a Instagram @mariana_photos.'
  }
];

const INITIAL_CUSTOMERS = [
  { id: 'CUST-01', name: 'Restaurante La Cumbre', type: 'B2B', phone: '50498765432', email: 'gerencia@lacumbre.hn', city: 'Tegucigalpa', ordersCount: 2, totalSpent: 3150 },
  { id: 'CUST-02', name: 'Dra. Sofía Martínez', type: 'B2B', phone: '50495123456', email: 'sofia.martinez@clinica.hn', city: 'San Pedro Sula', ordersCount: 1, totalSpent: 500 },
  { id: 'CUST-03', name: 'Carlos Mendizábal', type: 'B2C', phone: '50499887766', email: 'carlos.m@gmail.com', city: 'Tegucigalpa', ordersCount: 1, totalSpent: 800 },
  { id: 'CUST-04', name: 'The Barber Club', type: 'B2B', phone: '50494443322', email: 'info@barberclub.hn', city: 'San Pedro Sula', ordersCount: 1, totalSpent: 1200 },
  { id: 'CUST-05', name: 'Mariana Pineda', type: 'B2C', phone: '50497771122', email: 'mariana.photo@studio.hn', city: 'La Ceiba', ordersCount: 1, totalSpent: 280 }
];

const INITIAL_INVENTORY = [
  { id: 'INV-01', item: 'Chips NFC NTAG213 (Adhesivos)', category: 'Componentes', stock: 240, minStock: 50, cost: 8 },
  { id: 'INV-02', item: 'Chips NFC NTAG215 (Alta Capacidad)', category: 'Componentes', stock: 110, minStock: 30, cost: 12 },
  { id: 'INV-03', item: 'Tarjetas PVC Mate en Blanco', category: 'Soportes', stock: 65, minStock: 25, cost: 35 },
  { id: 'INV-04', item: 'Tarjetas Metálicas Negras', category: 'Soportes', stock: 22, minStock: 15, cost: 95 },
  { id: 'INV-05', item: 'Stands Acrílicos Review TAP', category: 'Soportes B2B', stock: 48, minStock: 20, cost: 80 },
  { id: 'INV-06', item: 'Placas Metálicas Pet Tag', category: 'Accesorios', stock: 85, minStock: 30, cost: 40 },
  { id: 'INV-07', item: 'Llaveros Inteligentes de Cuero/Epoxi', category: 'Accesorios', stock: 52, minStock: 20, cost: 45 }
];

let crmOrders = JSON.parse(localStorage.getItem('taplab_crm_orders')) || INITIAL_ORDERS;
let crmCustomers = JSON.parse(localStorage.getItem('taplab_crm_customers')) || INITIAL_CUSTOMERS;
let crmInventory = JSON.parse(localStorage.getItem('taplab_crm_inventory')) || INITIAL_INVENTORY;

function saveState() {
  localStorage.setItem('taplab_crm_orders', JSON.stringify(crmOrders));
  localStorage.setItem('taplab_crm_customers', JSON.stringify(crmCustomers));
  localStorage.setItem('taplab_crm_inventory', JSON.stringify(crmInventory));
}

async function loadDataFromAPI() {
  try {
    const resOrders = await fetch('/api/orders');
    if (resOrders.ok) {
      const data = await resOrders.json();
      if (Array.isArray(data) && data.length > 0) {
        crmOrders = data;
        saveState();
      }
    }
  } catch (err) {}

  renderDashboard();
  renderKanban();
  renderOrdersTable();
  renderCustomersTable();
  renderInventoryTable();
}

let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const installBtn = document.getElementById('install-pwa-btn');
  if (installBtn) installBtn.style.display = 'flex';
});

window.installApp = function() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        const installBtn = document.getElementById('install-pwa-btn');
        if (installBtn) installBtn.style.display = 'none';
      }
      deferredPrompt = null;
    });
  } else {
    alert('Para instalar en iPhone: Toca "Compartir" y luego "Añadir a la pantalla de inicio". En Android: Menú de Chrome -> "Instalar aplicación".');
  }
};

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}

document.addEventListener('DOMContentLoaded', () => {
  checkAuthSession();
  handlePinInput();
  setupNavigation();
  renderDashboard();
  renderKanban();
  renderOrdersTable();
  renderCustomersTable();
  renderInventoryTable();
  setupQRGenerator();
});

function setupNavigation() {
  const navBtns = document.querySelectorAll('.nav-item-btn');
  const tabs = document.querySelectorAll('.tab-content');

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      navBtns.forEach(b => b.classList.remove('active'));
      tabs.forEach(t => t.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetTab = document.getElementById(targetId);
      if (targetTab) targetTab.classList.add('active');

      if (targetId === 'tab-dashboard') renderDashboard();
      if (targetId === 'tab-kanban') renderKanban();
      if (targetId === 'tab-orders') renderOrdersTable();
      if (targetId === 'tab-customers') renderCustomersTable();
      if (targetId === 'tab-inventory') renderInventoryTable();
    });
  });
}

function renderDashboard() {
  const totalRevenue = crmOrders.reduce((sum, ord) => sum + ord.total, 0);
  const activeOrders = crmOrders.filter(ord => ord.status !== 'completed').length;
  const totalClients = crmCustomers.length;
  const b2bOrders = crmOrders.filter(ord => ord.clientType === 'B2B').length;

  document.getElementById('metric-revenue').textContent = `L ${totalRevenue.toLocaleString()}`;
  document.getElementById('metric-active-orders').textContent = activeOrders;
  document.getElementById('metric-clients').textContent = totalClients;
  document.getElementById('metric-b2b-ratio').textContent = `${Math.round((b2bOrders / (crmOrders.length || 1)) * 100)}% B2B`;

  const recentContainer = document.getElementById('dashboard-recent-orders');
  if (recentContainer) {
    const recents = [...crmOrders].reverse().slice(0, 4);
    recentContainer.innerHTML = recents.map(o => `
      <tr>
        <td><strong>${o.id}</strong></td>
        <td>${o.clientName} <span style="font-size:11px; color:#6B7280;">(${o.clientType})</span></td>
        <td>${o.product}</td>
        <td><strong>L ${o.total}</strong></td>
        <td>${getStatusPill(o.status)}</td>
      </tr>
    `).join('');
  }
}

function getStatusPill(status) {
  const map = {
    'new': '<span class="status-pill status-new">Nuevo</span>',
    'design': '<span class="status-pill status-design">Diseño</span>',
    'production': '<span class="status-pill status-prod">Producción NFC</span>',
    'shipping': '<span class="status-pill status-shipping">En Envío</span>',
    'completed': '<span class="status-pill status-completed">Completado</span>'
  };
  return map[status] || `<span class="status-pill">${status}</span>`;
}

function renderKanban() {
  const columns = {
    new: document.getElementById('col-cards-new'),
    design: document.getElementById('col-cards-design'),
    production: document.getElementById('col-cards-production'),
    shipping: document.getElementById('col-cards-shipping'),
    completed: document.getElementById('col-cards-completed')
  };

  Object.values(columns).forEach(col => { if (col) col.innerHTML = ''; });

  const counts = { new: 0, design: 0, production: 0, shipping: 0, completed: 0 };

  crmOrders.forEach(order => {
    counts[order.status] = (counts[order.status] || 0) + 1;
    const col = columns[order.status];
    if (col) {
      const card = document.createElement('div');
      card.className = 'order-card';
      card.onclick = () => openOrderModal(order.id);
      card.innerHTML = `
        <div class="order-header">
          <span class="order-id">${order.id}</span>
          <span class="order-price">L ${order.total}</span>
        </div>
        <div class="order-client">${order.clientName}</div>
        <div class="order-item-desc">${order.product} (${order.qty}x)</div>
        <div class="order-footer">
          <span class="order-date">${order.date}</span>
          <a href="https://wa.me/${order.clientPhone}?text=${encodeURIComponent(`¡Hola ${order.clientName}! Te contactamos de TAPLAB respecto a tu pedido ${order.id}.`)}" target="_blank" class="btn-whatsapp-icon" onclick="event.stopPropagation();">
            <span>💬 WhatsApp</span>
          </a>
        </div>
      `;
      col.appendChild(card);
    }
  });

  document.getElementById('badge-new').textContent = counts.new || 0;
  document.getElementById('badge-design').textContent = counts.design || 0;
  document.getElementById('badge-production').textContent = counts.production || 0;
  document.getElementById('badge-shipping').textContent = counts.shipping || 0;
  document.getElementById('badge-completed').textContent = counts.completed || 0;
}

function renderOrdersTable(query = '') {
  const tbody = document.getElementById('orders-table-body');
  if (!tbody) return;

  const filtered = crmOrders.filter(o => 
    o.id.toLowerCase().includes(query.toLowerCase()) ||
    o.clientName.toLowerCase().includes(query.toLowerCase()) ||
    o.product.toLowerCase().includes(query.toLowerCase())
  );

  tbody.innerHTML = filtered.map(o => `
    <tr>
      <td><strong>${o.id}</strong></td>
      <td>
        <div style="font-weight:700;">${o.clientName}</div>
        <div style="font-size:12px; color:var(--slate-text);">${o.clientPhone}</div>
      </td>
      <td>
        <div>${o.product}</div>
        <div style="font-size:12px; color:var(--slate-text);">${o.variant}</div>
      </td>
      <td><strong>${o.qty}</strong></td>
      <td><strong>L ${o.total}</strong></td>
      <td>${o.date}</td>
      <td>${getStatusPill(o.status)}</td>
      <td>
        <button class="btn btn-outline btn-sm" onclick="openOrderModal('${o.id}')">Editar</button>
      </td>
    </tr>
  `).join('');
}

function renderCustomersTable(query = '') {
  const tbody = document.getElementById('customers-table-body');
  if (!tbody) return;

  const filtered = crmCustomers.filter(c => 
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.phone.includes(query) ||
    c.email.toLowerCase().includes(query.toLowerCase())
  );

  tbody.innerHTML = filtered.map(c => `
    <tr>
      <td><strong>${c.id}</strong></td>
      <td><strong>${c.name}</strong></td>
      <td><span class="badge-pill" style="font-size:11px; padding:2px 8px;">${c.type}</span></td>
      <td>${c.phone}</td>
      <td>${c.email}</td>
      <td>${c.city}</td>
      <td><strong>${c.ordersCount} pedidos</strong></td>
      <td><strong style="color:var(--copper-signal);">L ${c.totalSpent.toLocaleString()}</strong></td>
    </tr>
  `).join('');
}

function renderInventoryTable() {
  const tbody = document.getElementById('inventory-table-body');
  if (!tbody) return;

  tbody.innerHTML = crmInventory.map(inv => {
    const isLow = inv.stock <= inv.minStock;
    return `
      <tr>
        <td><strong>${inv.id}</strong></td>
        <td><strong>${inv.item}</strong></td>
        <td>${inv.category}</td>
        <td>
          <span style="font-weight:700; font-size:15px; color:${isLow ? '#EF4444' : 'var(--graphite-ink)'};">
            ${inv.stock} unidades
          </span>
          ${isLow ? '<span style="font-size:11px; background:#FEE2E2; color:#B91C1C; padding:2px 6px; border-radius:4px; margin-left:6px; font-weight:700;">¡Bajo Stock!</span>' : ''}
        </td>
        <td>${inv.minStock} unidades</td>
        <td>L ${inv.cost}</td>
        <td>
          <button class="btn btn-outline btn-sm" onclick="adjustStock('${inv.id}', 10)">+10</button>
          <button class="btn btn-outline btn-sm" onclick="adjustStock('${inv.id}', -10)">-10</button>
        </td>
      </tr>
    `;
  }).join('');
}

window.adjustStock = function(invId, amount) {
  const item = crmInventory.find(i => i.id === invId);
  if (item) {
    item.stock = Math.max(0, item.stock + amount);
    saveState();
    renderInventoryTable();
  }
};

let currentEditingOrderId = null;

window.openOrderModal = function(orderId) {
  const order = crmOrders.find(o => o.id === orderId);
  if (!order) return;

  currentEditingOrderId = orderId;
  document.getElementById('modal-order-id').textContent = order.id;
  document.getElementById('edit-order-client').value = order.clientName;
  document.getElementById('edit-order-phone').value = order.clientPhone;
  document.getElementById('edit-order-product').value = order.product;
  document.getElementById('edit-order-status').value = order.status;
  document.getElementById('edit-order-total').value = order.total;
  document.getElementById('edit-order-notes').value = order.notes || '';

  const waBtn = document.getElementById('modal-wa-direct');
  if (waBtn) {
    let msg = `Hola ${order.clientName}, tu pedido ${order.id} en TAPLAB ahora está en estado: *${order.status.toUpperCase()}*.`;
    waBtn.href = `https://wa.me/${order.clientPhone}?text=${encodeURIComponent(msg)}`;
  }

  document.getElementById('order-modal').classList.add('active');
};

window.closeOrderModal = function() {
  document.getElementById('order-modal').classList.remove('active');
  currentEditingOrderId = null;
};

window.saveOrderChanges = function() {
  if (!currentEditingOrderId) return;
  const order = crmOrders.find(o => o.id === currentEditingOrderId);
  if (!order) return;

  order.clientName = document.getElementById('edit-order-client').value;
  order.clientPhone = document.getElementById('edit-order-phone').value;
  order.status = document.getElementById('edit-order-status').value;
  order.total = parseFloat(document.getElementById('edit-order-total').value) || order.total;
  order.notes = document.getElementById('edit-order-notes').value;

  saveState();
  closeOrderModal();
  renderDashboard();
  renderKanban();
  renderOrdersTable();
};

window.openNewOrderModal = function() {
  document.getElementById('new-order-modal').classList.add('active');
};

window.closeNewOrderModal = function() {
  document.getElementById('new-order-modal').classList.remove('active');
};

window.createNewOrder = function(e) {
  if (e) e.preventDefault();
  const nextNum = crmOrders.length + 1083;
  const newId = `TL-${nextNum}`;

  const clientName = document.getElementById('new-order-client').value;
  const clientPhone = document.getElementById('new-order-phone').value;
  const clientType = document.getElementById('new-order-type').value;
  const product = document.getElementById('new-order-product').value;
  const total = parseFloat(document.getElementById('new-order-price').value) || 350;
  const notes = document.getElementById('new-order-notes').value;

  const newOrder = {
    id: newId,
    clientName,
    clientPhone,
    clientEmail: '',
    clientType,
    product,
    variant: 'Estándar',
    qty: 1,
    total,
    status: 'new',
    date: new Date().toISOString().split('T')[0],
    notes
  };

  crmOrders.unshift(newOrder);

  const existingCust = crmCustomers.find(c => c.phone === clientPhone);
  if (!existingCust) {
    crmCustomers.push({
      id: `CUST-0${crmCustomers.length + 1}`,
      name: clientName,
      type: clientType,
      phone: clientPhone,
      email: '',
      city: 'Honduras',
      ordersCount: 1,
      totalSpent: total
    });
  } else {
    existingCust.ordersCount += 1;
    existingCust.totalSpent += total;
  }

  saveState();
  closeNewOrderModal();
  renderDashboard();
  renderKanban();
  renderOrdersTable();
  renderCustomersTable();
};

function setupQRGenerator() {
  const typeSelect = document.getElementById('qr-type-select');
  const urlInput = document.getElementById('qr-target-url');
  const generateBtn = document.getElementById('generate-qr-btn');

  if (!generateBtn) return;

  generateBtn.addEventListener('click', generateDynamicQR);

  if (typeSelect) {
    typeSelect.addEventListener('change', () => {
      const val = typeSelect.value;
      if (val === 'review') urlInput.value = 'https://g.page/r/taplab-reviews/review';
      else if (val === 'vcard') urlInput.value = 'https://taplab.hn/p/mauricio-reyes';
      else if (val === 'wifi') urlInput.value = 'WIFI:S:MiWiFi_TAPLAB;T:WPA;P:ClaveSegura2026;;';
      else if (val === 'pet') urlInput.value = 'https://taplab.hn/pet/rocky-902';
      generateDynamicQR();
    });
  }

  generateDynamicQR();
}

function generateDynamicQR() {
  const holder = document.getElementById('qr-canvas-holder');
  const url = document.getElementById('qr-target-url').value || 'https://taplab.hn';
  if (!holder) return;

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(url)}&color=17-1A-1F&bgcolor=FAF8F5`;
  holder.innerHTML = `<img src="${qrUrl}" alt="QR TAPLAB" style="width:200px; height:200px; border-radius:8px;">`;
}
