# 📱 Capacitor iOS Packaging Guide — IVA Nail Art NY
**App Name:** IVA Nails  
**Package ID:** `com.ivanailartny.app`  
**Target:** Apple App Store (iOS 16+)  
**Architecture:** Remote Hosted Webview (Preserving Next.js 16 App Router SSR, Route Handlers & MediaPipe Performance)  

---

## 1. Architectural Strategy: Hosted Webview vs Static Export

Next.js 16 with App Router, server-side route handlers (`/api/bookings`, `/api/availability`), server rendering, and dynamic Open Graph images should **not** be compiled as a static export (`output: 'export'`), as static export disables API routes and dynamic headers.  

The production-standard architecture for Capacitor with Next.js 16 is **Hosted Webview**:
- Capacitor native shell loads `https://ivanailartny.com`.
- The PWA Service Worker (`public/sw.js`) provides instant local offline loading (`/offline.html`).
- iOS native capabilities (Camera, Photo Library, Push Notifications, Status Bar, App Store distribution) are provided by Capacitor.

---

## 2. Apple Developer Prerequisites
To publish to the **Apple App Store**, Apple requires:
1. **Apple Developer Account:** Active enrollment at [developer.apple.com](https://developer.apple.com) ($99 USD/year).
2. **macOS Machine with Xcode:** Xcode 15 or later installed on macOS Sonoma or Sequoia.

---

## 3. Project Configuration (`capacitor.config.ts`)

The root configuration file `capacitor.config.ts` is pre-configured with:
- `appId: "com.ivanailartny.app"`
- `appName: "IVA Nail Art"`
- `server.url: "https://ivanailartny.com"`
- `allowNavigation`: Whitelisting `ivanailartny.com`, `calendly.com`, `storage.googleapis.com` (MediaPipe model), `wa.me`, and `instagram.com`.
- Dark editorial status bar and splash screen (`#0E0706`).

---

## 4. MediaPipe `/try-on` iOS WKWebView Protection

### 4.1 Mandatory Privacy Keys (`Info.plist`)
For the real-time virtual nail try-on (`/try-on`) to work seamlessly inside iOS WKWebView without crashing, the following permission keys must be declared in `ios/App/App/Info.plist`:

```xml
<key>NSCameraUsageDescription</key>
<string>IVA Nail Art requires camera access to allow real-time virtual nail try-on on your hand.</string>

<key>NSPhotoLibraryUsageDescription</key>
<string>IVA Nail Art requires photo library access to let you select a photo of your hand for virtual nail styling.</string>
```

### 4.2 WebAssembly SIMD & WebGL2 Acceleration
- iOS 16.4+ WKWebView natively supports WebGL2 and WebAssembly SIMD.
- Model weights (`hand_landmarker.task`) are fetched dynamically from Google Cloud Storage:
  `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`.
- CSP headers must permit `connect-src https://storage.googleapis.com`.

### 4.3 Instagram In-App Browser Resilience
Instagram's embedded WKWebView blocks `navigator.mediaDevices.getUserMedia` or throws silent permission errors.  
`app/components/NailTryOn.tsx` provides an automatic dual mode: if camera permission fails, users can tap "Use a photo" / "Usar una foto" via `<input type="file" accept="image/*">`, which works 100% reliably inside Instagram and TikTok in-app browsers.

---

## 5. Build & Deployment Commands

When packaging on a macOS workstation with Xcode:

```bash
# 1. Install Capacitor dependencies
npm install @capacitor/core @capacitor/cli @capacitor/ios

# 2. Add iOS native platform
npx cap add ios

# 3. Synchronize assets and plugins
npx cap sync ios

# 4. Open in Xcode
npx cap open ios
```

### Xcode Steps:
1. In Xcode, configure Signing & Capabilities with your Apple Team ID.
2. Select target **Any iOS Device (arm64)**.
3. Select **Product -> Archive** to build the binary.
4. Click **Distribute App** to upload to **App Store Connect**.
5. Finalize App Store metadata, screenshots (6.7" and 6.5" Super Retina), and submit for App Review.
