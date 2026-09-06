const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PIN = process.env.ADMIN_PIN || '1234';

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname)));

// Database File Path
const DB_PATH = path.join(__dirname, 'data', 'db.json');

// Ensure data folder exists
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
}

// Initial Mock Data
const INITIAL_DATA = {
  orders: [
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
  ],
  customers: [
    { id: 'CUST-01', name: 'Restaurante La Cumbre', type: 'B2B', phone: '50498765432', email: 'gerencia@lacumbre.hn', city: 'Tegucigalpa', ordersCount: 2, totalSpent: 3150 },
    { id: 'CUST-02', name: 'Dra. Sofía Martínez', type: 'B2B', phone: '50495123456', email: 'sofia.martinez@clinica.hn', city: 'San Pedro Sula', ordersCount: 1, totalSpent: 500 },
    { id: 'CUST-03', name: 'Carlos Mendizábal', type: 'B2C', phone: '50499887766', email: 'carlos.m@gmail.com', city: 'Tegucigalpa', ordersCount: 1, totalSpent: 800 },
    { id: 'CUST-04', name: 'The Barber Club', type: 'B2B', phone: '50494443322', email: 'info@barberclub.hn', city: 'San Pedro Sula', ordersCount: 1, totalSpent: 1200 },
    { id: 'CUST-05', name: 'Mariana Pineda', type: 'B2C', phone: '50497771122', email: 'mariana.photo@studio.hn', city: 'La Ceiba', ordersCount: 1, totalSpent: 280 }
  ],
  inventory: [
    { id: 'INV-01', item: 'Chips NFC NTAG213 (Adhesivos)', category: 'Componentes', stock: 240, minStock: 50, cost: 8 },
    { id: 'INV-02', item: 'Chips NFC NTAG215 (Alta Capacidad)', category: 'Componentes', stock: 110, minStock: 30, cost: 12 },
    { id: 'INV-03', item: 'Tarjetas PVC Mate en Blanco', category: 'Soportes', stock: 65, minStock: 25, cost: 35 },
    { id: 'INV-04', item: 'Tarjetas Metálicas Negras', category: 'Soportes', stock: 22, minStock: 15, cost: 95 },
    { id: 'INV-05', item: 'Stands Acrílicos Review TAP', category: 'Soportes B2B', stock: 48, minStock: 20, cost: 80 },
    { id: 'INV-06', item: 'Placas Metálicas Pet Tag', category: 'Accesorios', stock: 85, minStock: 30, cost: 40 },
    { id: 'INV-07', item: 'Llaveros Inteligentes de Cuero/Epoxi', category: 'Accesorios', stock: 52, minStock: 20, cost: 45 }
  ]
};

// Helper: Read DB
function getDB() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify(INITIAL_DATA, null, 2));
    return INITIAL_DATA;
  }
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    return INITIAL_DATA;
  }
}

// Helper: Save DB
function saveDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// --------------------------------------------------------------------------
// API ROUTES
// --------------------------------------------------------------------------

// 1. Auth Endpoint (Verify Master PIN)
app.post('/api/auth/login', (req, res) => {
  const { pin } = req.body;
  if (pin === ADMIN_PIN) {
    res.json({ success: true, message: 'Autenticación exitosa', token: 'taplab-session-valid' });
  } else {
    res.status(401).json({ success: false, message: 'PIN incorrecto' });
  }
});

// 2. Metrics Endpoint
app.get('/api/metrics', (req, res) => {
  const db = getDB();
  const totalRevenue = db.orders.reduce((sum, ord) => sum + ord.total, 0);
  const activeOrders = db.orders.filter(ord => ord.status !== 'completed').length;
  const totalClients = db.customers.length;
  const b2bOrders = db.orders.filter(ord => ord.clientType === 'B2B').length;

  res.json({
    totalRevenue,
    activeOrders,
    totalClients,
    b2bRatio: db.orders.length ? Math.round((b2bOrders / db.orders.length) * 100) : 0
  });
});

// 3. Orders Endpoints
app.get('/api/orders', (req, res) => {
  const db = getDB();
  res.json(db.orders);
});

app.post('/api/orders', (req, res) => {
  const db = getDB();
  const newOrder = {
    id: `TL-${db.orders.length + 1083}`,
    clientName: req.body.clientName || 'Cliente TAPLAB',
    clientPhone: req.body.clientPhone || '',
    clientEmail: req.body.clientEmail || '',
    clientType: req.body.clientType || 'B2C',
    product: req.body.product || 'TAP CARD',
    variant: req.body.variant || 'Estándar',
    qty: Number(req.body.qty) || 1,
    total: Number(req.body.total) || 350,
    status: 'new',
    date: new Date().toISOString().split('T')[0],
    notes: req.body.notes || ''
  };

  db.orders.unshift(newOrder);

  // Update or insert customer
  const cust = db.customers.find(c => c.phone === newOrder.clientPhone);
  if (!cust) {
    db.customers.push({
      id: `CUST-0${db.customers.length + 1}`,
      name: newOrder.clientName,
      type: newOrder.clientType,
      phone: newOrder.clientPhone,
      email: newOrder.clientEmail,
      city: 'Honduras',
      ordersCount: 1,
      totalSpent: newOrder.total
    });
  } else {
    cust.ordersCount += 1;
    cust.totalSpent += newOrder.total;
  }

  saveDB(db);
  res.status(201).json(newOrder);
});

app.put('/api/orders/:id', (req, res) => {
  const db = getDB();
  const orderIndex = db.orders.findIndex(o => o.id === req.params.id);
  if (orderIndex === -1) {
    return res.status(404).json({ error: 'Pedido no encontrado' });
  }

  db.orders[orderIndex] = {
    ...db.orders[orderIndex],
    ...req.body
  };

  saveDB(db);
  res.json(db.orders[orderIndex]);
});

// 4. Customers Endpoints
app.get('/api/customers', (req, res) => {
  const db = getDB();
  res.json(db.customers);
});

// 5. Inventory Endpoints
app.get('/api/inventory', (req, res) => {
  const db = getDB();
  res.json(db.inventory);
});

app.put('/api/inventory/:id', (req, res) => {
  const db = getDB();
  const item = db.inventory.find(i => i.id === req.params.id);
  if (!item) {
    return res.status(404).json({ error: 'Insumo no encontrado' });
  }

  if (typeof req.body.delta === 'number') {
    item.stock = Math.max(0, item.stock + req.body.delta);
  } else if (typeof req.body.stock === 'number') {
    item.stock = Math.max(0, req.body.stock);
  }

  saveDB(db);
  res.json(item);
});

// Frontend Pages Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/crm', (req, res) => {
  res.sendFile(path.join(__dirname, 'crm.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`  🚀 Servidor TAPLAB corriendo con éxito`);
  console.log(`  🌐 Tienda Pública: http://localhost:${PORT}`);
  console.log(`  🔒 CRM Privado:    http://localhost:${PORT}/crm.html`);
  console.log(`  🔑 PIN de Acceso:   ${ADMIN_PIN}`);
  console.log(`=========================================`);
});
