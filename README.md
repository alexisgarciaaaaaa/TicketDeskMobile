# 📱 TicketDesk Mobile

Aplicación móvil desarrollada con **React Native + TypeScript**,
siguiendo arquitectura modular, UI moderna y buenas prácticas de nivel
Senior.

------------------------------------------------------------------------

## 🚀 Features Principales

### 🔐 Autenticación

-   Inicio de sesión simulado con persistencia usando AsyncStorage.
-   Estado global manejado con Context + TypeScript.

### 🎫 Gestión de Tickets

-   Listado moderno con diseño tipo iOS.
-   Tarjetas con prioridades, estados y colores.
-   Navegación con stack + detalles.
-   Arquitectura escalable para integrar una API real.

### 📊 Dashboard

-   Pantalla base lista para integrar métricas, gráficas o reportes.

### ⚙️ Ajustes (Settings)

-   UI moderna estilo Apple Settings.
-   Switches funcionales.
-   Secciones para seguridad, notificaciones y preferencias.
-   Diseño limpio, sombras suaves y componentes reutilizables.

------------------------------------------------------------------------

## 🧭 Navegación

Implementada con **React Navigation (Bottom Tabs + Stack)**:

    MainTabsNavigator  
     ├── TicketsStack  
     ├── DashboardScreen  
     └── SettingsScreen

------------------------------------------------------------------------

## 🧪 Testing

El proyecto incluye un setup profesional con:

-   Jest
-   react-test-renderer

Ejecutar:

    npm test

------------------------------------------------------------------------

## 📦 Arquitectura del Proyecto

    src/
     ├── app/
     │    ├── App.tsx
     │    ├── navigation/
     │    ├── store/
     ├── features/
     │    ├── tickets/
     │    ├── settings/
     │    ├── dashboard/

-   División por **feature folders**.
-   Código desacoplado, escalable y limpio.
-   Preparado para integrar Redux Toolkit y RTK Query.

------------------------------------------------------------------------

## 🎨 UI Moderna & Diseño

-   Estilo **inspirado en iOS 17 / Apple Human Interface Guidelines**.
-   Sombreados suaves.
-   Esquinas redondeadas fluidas.
-   Tipografía consistente.
-   Uso correcto de spacing y layout.

------------------------------------------------------------------------

## 🛠️ Scripts Disponibles

  Script                Descripción
  --------------------- ---------------------------
  `npm start`           Inicia Metro Bundler
  `npm run ios`         Corre en simulador iOS
  `npm run android`     Corre en emulador Android
  `npm run test`        Ejecuta pruebas unitarias
  `npm run typecheck`   Ejecuta TypeScript strict

------------------------------------------------------------------------

## 📂 Requisitos

-   Node 18+
-   Xcode 15+
-   CocoaPods instalado
-   Java / Android SDK si deseas Android

Instalación:

    npm install
    cd ios && pod install

------------------------------------------------------------------------

## 🧑‍💻 Nivel Profesional Reflejado

-   Arquitectura modular
-   Testing avanzado
-   UI premium
-   Setup limpio y escalable
-   Dominio de React Navigation, TypeScript, Jest y RN iOS

------------------------------------------------------------------------

## 📄 Licencia

MIT --- libre para uso personal y profesional.

------------------------------------------------------------------------
