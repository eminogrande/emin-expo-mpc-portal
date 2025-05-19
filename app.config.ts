import 'dotenv/config';

export default () => ({
  expo: {
    name: 'emin-expo-mpc-portal',
    slug: 'emin-expo-mpc-portal',

     ios: {
      bundleIdentifier: 'com.nuriwallet.mpcportal',  
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,  // ← tells Apple: “standard encryption only”
      },
    },

    android: { package: 'com.nuriwallet.mpcportal' },

    extra: {
      // your Portal credentials (already here)
      portalProjectId: process.env.PORTAL_PROJECT_ID,
      portalSecretKey: process.env.PORTAL_SECRET_KEY,
      portalClientApiKey: process.env.PORTAL_CLIENT_API_KEY,

      // >>> new bit EAS needs to link this codebase to the cloud project
      eas: {
        projectId: 'b33bc579-313c-4f8c-8115-a988c054f892',
      },
    },
  },
});
