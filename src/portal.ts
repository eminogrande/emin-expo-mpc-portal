// A single, shared instance of the Portal SDK.
// -------------------------------------------
// Why? Creating it once avoids re-authenticating on every call
// and keeps your code DRY (Don't Repeat Yourself).

import { Portal, BackupMethods } from '@portal-hq/core';
import { PasskeyStorage } from '@portal-hq/passkey-storage';
import Constants from 'expo-constants';

// We injected the client API key through app.config.ts -> extra,
// which ends up available at runtime inside `Constants`.
const portalClientApiKey = Constants.expoConfig?.extra?.portalClientApiKey as string;
const portalClientId = Constants.expoConfig?.extra?.portalClientId as string; // Though not directly used in Portal init, good to fetch it

// Initialize passkey storage for use as a backup method.
const passkeyStorage = new PasskeyStorage({
  relyingParty: {
    id: 'nuri.com', // Use your domain as the relying party ID
    name: 'Nuri Wallet', // Or your app's name
  },
});


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
    // @ts-ignore Property 'setPasskeyConfiguration' does not exist on type 'Portal'.
    // The first argument should be your relying party ID
    // The second argument is the server endpoint for passkey operations,
    // if PortalHQ uses a specific one for self-hosted RPs, this might need to be nuri.com or a portalhq subdomain.
    // For now, assuming it should align with your RP. If issues arise, this might need to be portalhq.io or a specific portal domain.
    // Let's stick to nuri.com for consistency with the RP ID for now.
    // If portalhq.io is required here by Portal's SDK despite custom RP, we can revisit.
    // The documentation implies your domain should work if configured.
    portal.setPasskeyConfiguration(
      "nuri.com", // Your relying party ID
      "nuri.com"  // Typically, the domain where passkey operations are handled.
                  // Or, if PortalHQ still manages some aspects, it might be a PortalHQ domain.
                  // Let's try nuri.com first. If this causes issues, consult PortalHQ docs for this specific param when using own RP.
    );
    console.log("Called portal.setPasskeyConfiguration with nuri.com");
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
