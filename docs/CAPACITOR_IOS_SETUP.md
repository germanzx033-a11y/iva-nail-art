# 📱 Capacitor iOS Packaging Guide — IVA Nail Art NY
**App Name:** IVA Nails  
**Package ID:** `com.ivanailartny.app`  
**Target:** Apple App Store (iOS 15+)  

---

## 1. Prerrequisitos de Apple

Para publicar en la **Apple App Store**, Apple exige obligatoriamente:
1. **Cuenta de Apple Developer:** Registro activo en [developer.apple.com](https://developer.apple.com) con membresía pagada de **$99 USD/año**.
2. **Computadora Mac con Xcode:** Xcode 15 o superior instalado en macOS.

---

## 2. Instalación de Capacitor en el Proyecto

Cuando tengas tu cuenta de Apple Developer lista, ejecuta estos comandos en el proyecto:

```bash
cd C:\Users\german\iva-nail-art

# 1. Instalar dependencias de Capacitor
npm install @capacitor/core @capacitor/cli @capacitor/ios

# 2. Inicializar la configuración de Capacitor
npx cap init "IVA Nails" "com.ivanailartny.app" --web-dir "out"

# 3. Agregar la plataforma iOS
npx cap add ios
```

---

## 3. Configuración de Cámara para MediaPipe (`/try-on`)

Para que el simulador de uñas con realidad aumentada (`/try-on`) funcione dentro de la app nativa de iOS, se debe agregar el permiso de cámara en `ios/App/App/Info.plist`:

```xml
<key>NSCameraUsageDescription</key>
<string>IVA Nails requires camera access to overlay real-time virtual nail art designs on your hand.</string>
```

---

## 4. Compilación y Apertura en Xcode

```bash
# Generar build estático del proyecto
npm run build

# Sincronizar archivos con el contenedor nativo de iOS
npx cap sync ios

# Abrir el proyecto en Xcode (en Mac)
npx cap open ios
```

---

## 5. Pasos Finales en App Store Connect

1. En Xcode, selecciona tu equipo de desarrollo (*Signing & Capabilities*).
2. Selecciona **Any iOS Device (arm64)** y haz clic en **Product $\rightarrow$ Archive**.
3. Sube el paquete (*Distribute App*) a **App Store Connect**.
4. Completa la ficha de la app con capturas de pantalla de iPhone (6.7" y 6.5"), descripción, política de privacidad (`https://ivanailartny.com/privacy`) y envía a revisión de Apple.
