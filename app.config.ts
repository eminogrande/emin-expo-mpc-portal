// app.config.ts
import 'dotenv/config';

export default () => ({
  expo: {
    name: 'emin-expo-mpc-portal',
    slug: 'emin-expo-mpc-portal',
    extra: {
      portalProjectId: process.env.PORTAL_PROJECT_ID,
      portalSecretKey: process.env.PORTAL_SECRET_KEY,
    },
  },
});