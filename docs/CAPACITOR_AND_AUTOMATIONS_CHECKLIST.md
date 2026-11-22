# ⚡ Checklist Maestro: Capacitor iOS (App Store) & Automatizaciones n8n

Este documento recopila la guía práctica y sin fricción para los dos sistemas externos complementarios de **IVA Nail Art NY**.

---

## PARTE 1: Empaquetado iOS con Capacitor (Hacia la App Store)

El proyecto ya cuenta con el archivo [`capacitor.config.ts`](file:///C:/Users/german/iva-nail-art/capacitor.config.ts) en la raíz del repositorio con el App ID oficial `com.ivanailartny.app` y los permisos de cámara necesarios para MediaPipe (`/try-on`).

### 1. Requisitos Previos para Publicar en App Store
* **Cuenta de Desarrollador de Apple:** Requiere suscripción al *Apple Developer Program* ($99 USD/año) en [developer.apple.com](https://developer.apple.com).
* **Computadora Mac con Xcode 15+** (necesaria para firmar y compilar el binario `.ipa`).

### 2. Pasos de Compilación Local (en Mac):
1. **Instalar dependencias de Capacitor:**
   ```bash
   npm install @capacitor/core @capacitor/ios @capacitor/cli --save
   ```
2. **Generar la compilación estática de Next.js:**
   ```bash
   npm run build
   ```
3. **Agregar la plataforma iOS:**
   ```bash
   npx cap add ios
   npx cap sync ios
   ```
4. **Abrir el proyecto en Xcode:**
   ```bash
   npx cap open ios
   ```
5. **Configuración en Xcode:**
   * En la pestaña **Signing & Capabilities**, selecciona tu *Team* de Apple Developer.
   * Conecta tu iPhone o elige un simulador (ej. iPhone 16 Pro) y presiona **Play (Run)**.
   * Para subir a App Store Connect: Menú **Product &rarr; Archive &rarr; Distribute App &rarr; App Store Connect**.

> **Nota:** Mientras tramitas la cuenta de Apple, tus clientas ya disfrutan de la **PWA oficial**. En Safari en iPhone, solo deben presionar el botón central de compartir y seleccionar **"Añadir a pantalla de inicio"**. Tendrán el ícono de IVA Nail Art en su pantalla con carga instantánea y modo pantalla completa.

---

## PARTE 2: Activación del Flujo de Automatizaciones n8n

El archivo JSON del flujo exportable ya está listo en [`automations/ivanailart-booking-pipeline.json`](file:///C:/Users/german/iva-nail-art/automations/ivanailart-booking-pipeline.json).

### 1. Importación en tu Instancia de n8n
1. Abre tu panel de **n8n** (ya sea en servidor propio o en n8n Cloud).
2. Haz clic en **Workflows &rarr; Add Workflow &rarr; Import from File...**
3. Selecciona el archivo `automations/ivanailart-booking-pipeline.json`.

### 2. Configuración de Credenciales
* **Webhook de Calendly:**
  * En n8n, copia la URL del nodo **"Calendly Webhook Trigger"**.
  * Ve a tu cuenta de Calendly &rarr; **Integraciones / Webhooks** y pega la URL suscribiéndote a los eventos `invitee.created` e `invitee.canceled`.
* **Notificaciones por WhatsApp / SMS:**
  * El flujo incluye nodos preparados para la **Meta WhatsApp Cloud API** o **Twilio**.
  * Solo debes asignar tu Token o credencial de WhatsApp Business para que Iva reciba la notificación instantánea de la cita y la clienta reciba su recordatorio automático 24 horas antes con las políticas de cancelación y 15 minutos de tolerancia.
