# 📱 TicketDesk Mobile

Aplicación móvil desarrollada con **React Native + TypeScript**, enfocada en la gestión de tickets técnicos. Cuenta con arquitectura modular, almacenamiento local seguro, API mockeada y una interfaz moderna y responsiva.

---

## 🚀 Descripción

**TicketDesk Mobile** es una aplicación móvil diseñada para visualizar, gestionar y filtrar tickets técnicos en un entorno simulado. Su objetivo es demostrar un flujo completo de una app de soporte técnico con estándares de producción, incluyendo autenticación persistente, dashboards analíticos, navegación avanzada y arquitectura desacoplada basada en features.

---

## 🧩 Características principales

### 🔐 Autenticación
- Inicio de sesión local con persistencia usando `AsyncStorage`.
- Cierre de sesión con confirmación vía modal.
- Tipado seguro con `Context API + TypeScript`.

### 🎫 Gestión de Tickets
- Visualización moderna de lista de tickets.
- Tabs para: **Pendientes**, **En proceso**, **Completados**.
- Detalle profesional del ticket.
- Conexión a API (mock) usando cliente HTTP tipado.

### 📊 Dashboard Analítico
- Gráfica de barras con historial de tickets.
- Selector de rango de fechas (7, 30, 90 días).
- Widgets con scroll horizontal integrado.
- UI coherente con el resto de pantallas.

### ⚙️ Ajustes
- Edición del perfil del usuario.
- Persistencia de datos del perfil.
- Opción para cerrar sesión con confirmación.
- Modal para edición con diseño atractivo.

---

## 🏛️ Arquitectura del Proyecto

La aplicación sigue una arquitectura modular y escalable basada en separación por features:

```
src/
 ├── app/
 │   ├── navigation/
 │   ├── store/
 │   └── theme/
 ├── features/
 │   ├── auth/
 │   ├── tickets/
 │   ├── dashboard/
 │   └── settings/
 ├── components/
 └── utils/
```

### 🛠️ Tecnologías Clave

- React Native
- TypeScript
- Redux Toolkit
- Context API
- AsyncStorage
- React Navigation
- Victory Native / React Native SVG Charts
- `react-native-config` (variables de entorno)
- `json-server` (API local simulada)

---

## 📦 Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tuusuario/ticketdesk-mobile.git
   cd ticketdesk-mobile
   ```

2. Instala dependencias:

   ```bash
   npm install
   ```

3. Configura variables de entorno:

   Crea un archivo `.env` en la raíz:

   ```
   API_BASE_URL=http://localhost:3001
   ```

4. Instala `react-native-config`:

   ```bash
   npm install react-native-config
   ```

5. En iOS:

   ```bash
   cd ios && pod install
   ```

---

## 🧪 API Mock (json-server)

Para simular un backend:

1. Instala json-server:

   ```bash
   npm install -g json-server
   ```

2. Crea el archivo `server/db.json`:

   ```json
   {
     "tickets": [
       {
         "id": 1,
         "title": "Error en la VPN",
         "status": "pending",
         "createdAt": "2025-01-12T10:15:00Z"
       }
     ]
   }
   ```

3. Inicia la API mock:

   ```bash
   json-server --watch server/db.json --port 3001
   ```

---

## ▶️ Ejecutar la App

### iOS

```bash
npx pod-install
npm run ios
```

### Android

```bash
npm run android
```

---

## ✅ Buenas Prácticas Implementadas

- Tipado estricto con **TypeScript**.
- Arquitectura modular desacoplada por feature.
- Redux Toolkit con **thunks asíncronos**.
- Cliente HTTP reutilizable.
- Manejo centralizado de errores.
- Variables de entorno seguras.
- Hooks personalizados: `useAppSelector`, `useAppDispatch`.
- Componentes reutilizables de UI.

---

## 📸 Capturas de Pantalla (opcional)

> Puedes agregar aquí imágenes del dashboard, lista de tickets y pantalla de configuración.

---

## 🤝 Contribución

¡Pull Requests bienvenidos!

Usa la siguiente convención de commits:

- `feat:` nueva funcionalidad
- `fix:` corrección de bug
- `refactor:` mejora de código
- `style:` cambios visuales
- `docs:` cambios en documentación

---

## 📄 Licencia

Este proyecto está licenciado bajo la [MIT License](LICENSE).

Test CI for tabbar icons
