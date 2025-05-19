// A single, shared instance of the Portal SDK.
// -------------------------------------------
// Why? Creating it once avoids re-authenticating on every call
// and keeps your code DRY (Don't Repeat Yourself).

import { Portal, BackupMethods } from '@portal-hq/core';
import { PasskeyStorage } from '@portal-hq/passkey-storage';
import Constants from 'expo-constants';

// We injected the client API key through app.config.ts -> extra,
// which ends up available at runtime inside `Constants`.
const portalClientApiKey =
  Constants.expoConfig?.extra?.portalClientApiKey as string;

// Initialize passkey storage for use as a backup method.
const passkeyStorage = new PasskeyStorage();

// "portal" is the object the rest of the app will import.
export const portal = new Portal({
  apiKey: portalClientApiKey,
  backup: {
    [BackupMethods.Passkey]: passkeyStorage,
  },
  gatewayConfig: {},
});
