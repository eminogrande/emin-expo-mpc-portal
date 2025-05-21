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

console.log('[TASK 001 VERIFY] Loaded Portal Client API Key:', portalClientApiKey);
console.log('[TASK 001 VERIFY] Loaded Portal Client ID:', portalClientId); // Also log this for completeness

// Initialize passkey storage for use as a backup method.
const passkeyStorage = new PasskeyStorage({
  relyingParty: {
    id: 'nuri.com', // Use your domain as the relying party ID
    name: 'Nuri Wallet', // Or your app's name
  },
});

let portalInstance: Portal | null = null;
let portalInitializationError: Error | null = null;

try {
  if (!portalClientApiKey) {
    throw new Error("Portal Client API Key is missing or undefined.");
  }
  portalInstance = new Portal({
    apiKey: portalClientApiKey,
    backup: {
      [BackupMethods.Passkey]: passkeyStorage,
    },
    gatewayConfig: {},
    // autoCreateClient: true, // Consider if client auto-creation is desired/needed
  });
  console.log('[TASK 001 VERIFY] Portal SDK instantiated successfully.');

  // Set passkey configuration for backup/recovery (iOS 16+)
  // This should only be attempted if portalInstance is valid
  // INFO: The method `setPasskeyConfiguration` on `portalInstance` is causing a TypeScript error
  // as it's not found on the `Portal` type from `@portal-hq/core`.
  // Local SDK documentation (`portal-sdk-docs/`) does not clarify this method for the `Portal` instance.
  // Commenting out this block to allow core SDK instantiation verification.
  // This specific configuration may need to be revisited if passkey backup functionality (a later task)
  // requires it and further documentation or examples clarify its correct usage.
  /*
  if (portalInstance && portalInstance.setPasskeyConfiguration) { // This line causes TS error
    try {
      // @ts-ignore: This method may not be in the TS types for all versions
      portalInstance.setPasskeyConfiguration(
        "nuri.com", // Your relying party ID
        "nuri.com"  // Typically, the domain where passkey operations are handled.
      );
      console.log("[TASK 001 VERIFY] Called portal.setPasskeyConfiguration with nuri.com");
    } catch (configErr) {
      console.error("[TASK 001 VERIFY] Error calling setPasskeyConfiguration:", configErr);
    }
  } else if (portalInstance && !portalInstance.setPasskeyConfiguration) { // This line also causes TS error
    console.warn("[TASK 001 VERIFY] portal.setPasskeyConfiguration method not found on Portal instance. Skipping.");
  }
  */

} catch (error: any) {
  console.error('[TASK 001 VERIFY] Error instantiating Portal SDK:', error);
  portalInitializationError = error;
}

export const portal = portalInstance;
export const getPortalInitializationError = (): Error | null => portalInitializationError;

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
