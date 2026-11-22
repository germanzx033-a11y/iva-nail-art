export interface CapacitorConfig {
  appId: string;
  appName: string;
  webDir: string;
  server?: {
    url?: string;
    cleartext?: boolean;
    allowNavigation?: string[];
  };
  plugins?: Record<string, unknown>;
  ios?: {
    contentInset?: string;
    allowsLinkPreview?: boolean;
    scrollEnabled?: boolean;
  };
}

const config: CapacitorConfig = {
  appId: "com.ivanailartny.app",
  appName: "IVA Nail Art",
  webDir: "public",
  server: {
    url: process.env.CAPACITOR_SERVER_URL || "https://ivanailartny.com",
    cleartext: false,
    allowNavigation: [
      "ivanailartny.com",
      "*.ivanailartny.com",
      "calendly.com",
      "*.calendly.com",
      "storage.googleapis.com",
      "wa.me",
      "instagram.com",
    ],
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      backgroundColor: "#0E0706",
      showSpinner: false,
    },
    StatusBar: {
      style: "DARK",
      backgroundColor: "#0E0706",
    },
  },
  ios: {
    contentInset: "always",
    allowsLinkPreview: false,
    scrollEnabled: true,
  },
};

export default config;
