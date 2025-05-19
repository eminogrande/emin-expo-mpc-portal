import 'dotenv/config';

export default () => ({
  expo: {
    name: 'emin-expo-mpc-portal',
    slug: 'emin-expo-mpc-portal',

     ios: {
      associatedDomains: ['webcredentials:nuri.com'],
      bundleIdentifier: 'MH2SRQ3N27.com.nuriwallet.mpcportal',  
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,  // ← tells Apple: “standard encryption only”
      },
    },

    android: { package: 'MH2SRQ3N27.com.nuriwallet.mpcportal' },

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
