// A single, shared instance of the Portal SDK.
// -------------------------------------------
// Why? Creating it once avoids re-authenticating on every call
// and keeps your code DRY (Don't Repeat Yourself).

import { Portal, BackupMethods } from '@portal-hq/core';
import { PasskeyStorage } from '@portal-hq/passkey-storage';
import Constants from 'expo-constants';

// We injected the client API key through app.config.ts -> extra,
// which ends up available at runtime inside `Constants`.
const portalClientApiKey = '708a1e02-d7c0-4719-ba7d-56547be8b4ce';
const portalClientId = 'cmav0svu40bcqgmqangslo9s1';

// Initialize passkey storage for use as a backup method.
const passkeyStorage = new PasskeyStorage({
  relyingParty: {
    id: 'portalhq.io',
    name: 'PortalHQ',
  },
});

// Debug: Show Portal credentials at startup
import { Alert } from 'react-native';

console.log('Portal Client API Key:', portalClientApiKey);
console.log('Portal Client ID:', portalClientId);

if (portalClientApiKey) {
  Alert.alert('Portal Client API Key', portalClientApiKey);
}
if (portalClientId) {
  Alert.alert('Portal Client ID', portalClientId);
}

// "portal" is the object the rest of the app will import.
// "portal" is the object the rest of the app will import.
export const portal = new Portal({
  apiKey: portalClientApiKey,
  backup: {
    [BackupMethods.Passkey]: passkeyStorage,
  },
  gatewayConfig: {},
});

// Set passkey configuration for backup/recovery (iOS 16+)
try {
  // @ts-ignore: This method may not be in the TS types
  if (portal.setPasskeyConfiguration) {
    portal.setPasskeyConfiguration(
      "portalhq.io",
      "backup.web.portalhq.io"
    );
    console.log("Called portal.setPasskeyConfiguration");
  }
} catch (err) {
  console.error("Error configuring passkey authentication:", err);
}

// Placeholder for setting the passkey authentication anchor (iOS 16+)
// In a real app, you must implement a native module to expose the UIWindow reference to JS.
// Example usage in a React Native component (pseudo-code):
//
// import { setPasskeyAuthenticationAnchor } from './src/portal';
// useEffect(() => {
//   if (Platform.OS === 'ios' && portal.setPasskeyAuthenticationAnchor) {
//     // You must implement getMainWindow() natively to return the UIWindow
//     const window = getMainWindow(); // <-- Native module required
//     portal.setPasskeyAuthenticationAnchor(window);
//   }
// }, []);
//
// For now, this is a placeholder:
export function setPasskeyAuthenticationAnchorPlaceholder() {
  // This must be implemented natively to get the UIWindow reference.
  // See Portal docs for details.
  console.warn(
    "setPasskeyAuthenticationAnchor must be called with your app's main UIWindow. Implement this with a native module."
  );
}

// Helper to test Portal API key with a minimal call
export async function testPortalApiKey() {
  try {
    // Try a minimal backupWallet call with dummy data
    const result = await portal.backupWallet(
      BackupMethods.Passkey,
      (status: any) => console.log('Test backupWallet status:', status),
      {}
    );
    console.log('Portal backupWallet test result:', result);
    Alert.alert('Portal API Key Test', 'Success: ' + JSON.stringify(result));
  } catch (err) {
    console.error('Portal API Key Test Error:', err);
    Alert.alert('Portal API Key Test Error', String(err));
  }
}
