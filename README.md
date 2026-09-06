# 🚀 TAPLAB — Web Store & Operations CRM

> **Objetos cotidianos. Experiencias inteligentes.**
> Solución integral para comercio de productos inteligentes (NFC + QR) y suite de operaciones con Node.js & Express.

---

## 📦 Estructura del Proyecto

```text
taplab/
├── server.js               # Servidor Node.js + Express con API REST
├── package.json            # Dependencias y scripts de ejecución
├── manifest.json           # Configuración PWA para instalar el CRM como .app
├── sw.js                   # Service Worker para funcionamiento offline y PWA
├── index.html              # Tienda pública de alta conversión
├── crm.html                # Panel privado de CRM y operaciones (Protegido con PIN)
├── css/
│   ├── styles.css          # Estilos de la tienda con paleta oficial TAPLAB
│   └── crm.css             # Estilos del CRM, Kanban y pantalla de bloqueo
├── js/
│   ├── app.js              # Lógica de la tienda, simulador NFC y carrito WhatsApp
│   └── crm.js              # Lógica de administración, PIN maestro y API sync
├── data/
│   └── db.json             # Base de datos local persistente
└── assets/
    └── images/             # Logotipos oficiales e isotipos
```

---

## 🛠️ Instalación y Ejecución Local

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar servidor:**
   ```bash
   npm start
   ```

3. **Acceder en el navegador:**
   - 🌐 **Tienda Pública:** `http://localhost:3000`
   - 🔒 **CRM Privado:** `http://localhost:3000/crm.html`
   - 🔑 **PIN Maestro por defecto:** `1234`

---

## ☁️ Guía para Desplegar Gratis en Internet

### Opción 1: **Render.com** (Recomendado para Node.js + Express)
1. Ve a [render.com](https://render.com) y crea una cuenta gratuita con tu GitHub.
2. Haz clic en **"New +"** → **"Web Service"**.
3. Selecciona tu repositorio de GitHub `taplab`.
4. Configuración:
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Plan:** `Free`
5. Haz clic en **"Create Web Service"**.
6. ¡En 2 minutos tendrás tu URL activa con HTTPS gratis!

---

### Opción 2: **Vercel**
1. Ve a [vercel.com](https://vercel.com) y conecta tu repositorio de GitHub.
2. Haz clic en **Deploy**.

---

### 📱 Instalación del CRM como App en tu Celular (.app)
- **iPhone (Safari):** Toca *Compartir* → *Añadir a la pantalla de inicio*.
- **Android (Chrome):** Toca *Menú (3 puntos)* → *Instalar aplicación*.
