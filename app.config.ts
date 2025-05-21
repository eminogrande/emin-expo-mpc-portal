import 'dotenv/config';

export default () => ({
  expo: {
    name: 'emin-expo-mpc-portal',
    slug: 'emin-expo-mpc-portal',
    version: '0.0.2', // Set app version
    orientation: 'portrait',
    icon: './assets/1024x1024-nuri-logo.png', // Set app icon
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    splash: {
      image: './assets/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    web: {
      favicon: './assets/favicon.png',
    },

     ios: {
      associatedDomains: ['webcredentials:nuri.com'],
      bundleIdentifier: 'MH2SRQ3N27.com.nuriwallet.mpcportal',
      supportsTablet: true,
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,  // ← tells Apple: “standard encryption only”
      },
    },

    android: {
      package: 'MH2SRQ3N27.com.nuriwallet.mpcportal',
      edgeToEdgeEnabled: true,
    },

    extra: {
      // Portal credentials
      portalClientApiKey: process.env.PORTAL_CLIENT_API_KEY,
      portalClientId: process.env.PORTAL_CLIENT_ID,
      eas: {
        projectId: 'b33bc579-313c-4f8c-8115-a988c054f892',
      },
    },
  },
});
