# Completed Setup Log

This document details the components, configurations, and foundational setup steps that have been completed and verified for the Minimal MPC Bitcoin Wallet POC project as of 2025-05-21.

---

**1. Project Core & Structure [DONE]**
    - **Initialization:** Standard React Native (Expo) project structure established.
    - **Entry Point (`index.ts`):** `App.tsx` correctly registered as the root component using `registerRootComponent`.
    - **TypeScript (`tsconfig.json`):** Configured for strict TypeScript checking, extending `expo/tsconfig.base`.
    - **Version Control (`.gitignore`):** Standard files and directories (node_modules, .expo, etc.) are ignored.
    - **Assets (`assets/`):** Placeholder app icons (adaptive, favicon, icon, splash) are present.

**2. Dependencies (`package.json`) [DONE]**
    - **Portal SDK:** `@portal-hq/core` and `@portal-hq/passkey-storage` installed.
    - **Passkeys:** `react-native-passkeys` (native module for platform passkey APIs) installed.
    - **Expo Core & Utilities:** `expo`, `expo-dev-client`, `expo-secure-store`, `expo-status-bar` installed.
    - **React & React Native:** Core framework libraries installed.
    - **Utility Libraries (Installed):** `bitcoinjs-lib` and `react-native-qr-svg` are present (though not yet fully utilized).
    - **Development Dependencies:** Standard tools like `@babel/core` and TypeScript type definitions installed.

**3. Environment & API Key Management [DONE]**
    - **`.env` File:** Created and contains `PORTAL_CLIENT_API_KEY` and `PORTAL_CLIENT_ID`.
    - **`dotenv` Package:** Installed and configured in `app.config.ts` to load `.env` variables.
    - **`app.config.ts` Integration:** Securely loads Portal credentials from `.env` and exposes them to the application runtime via `Constants.expoConfig.extra`.

**4. Expo Application Configuration (`app.config.ts`) [DONE]**
    - **App Identity:** `name` ('emin-expo-mpc-portal') and `slug` defined.
    - **iOS Specifics:**
        - `associatedDomains`: Configured with `['webcredentials:nuri.com']` for passkey WebAuthn ceremonies.
        - `bundleIdentifier`: Set to `MH2SRQ3N27.com.nuriwallet.mpcportal`.
        - `infoPlist.ITSAppUsesNonExemptEncryption`: Set to `false`.
    - **Android Specifics:** `package` name set to `MH2SRQ3N27.com.nuriwallet.mpcportal`.
    - **EAS Integration:** `eas.projectId` ('b33bc579-313c-4f8c-8115-a988c054f892') linked.

**5. EAS Build Configuration (`eas.json`) [DONE]**
    - **CLI Version:** Minimum EAS CLI version specified.
    - **App Version Source:** Set to `remote`.
    - **Build Profiles:** Defined for `development`, `simulator`, `preview`, and `production`.
        - `development` & `simulator` profiles include `developmentClient: true`.
        - `production` profile includes `autoIncrement: true`.
    - **Environment Variables in Builds:** Placeholders for `PORTAL_PROJECT_ID` and `PORTAL_SECRET_KEY` defined in `development` and `simulator` build profile `env` sections.

**6. Portal SDK Integration & Initialization (`src/portal.ts`) [DONE]**
    - **Singleton Instance:** A shared `portal` instance of the Portal SDK is created and exported.
    - **API Key Usage:** Initialized with the `portalClientApiKey` loaded via `expo-constants`.
    - **Passkey Storage Setup:**
        - `PasskeyStorage` from `@portal-hq/passkey-storage` instantiated.
        - Configured with `relyingParty.id` as 'nuri.com' and `relyingParty.name` as 'Nuri Wallet'.
        - `passkeyStorage` provided to the `Portal` instance for `BackupMethods.Passkey`.
    - **Passkey Configuration Call:** `portal.setPasskeyConfiguration("nuri.com", "nuri.com")` is called.
    - **Passkey Anchor Placeholder:** `setPasskeyAuthenticationAnchorPlaceholder()` function created, noting the need for native UIWindow reference.

**7. Application Logic & UI (Foundational - To Be Refactored in Task 000) [PARTIALLY DONE, NEEDS REWORK]**
    - **Authentication Context (`src/AuthContext.tsx`):**
        - Manages `userId`, `sessionToken`, `loading` state (These user-specific parts will be removed/refactored).
        - **Session Persistence:** On app launch, attempts to restore `uid` and `token` from `SecureStore` (This will be changed to manage `hasWallet` and `walletAddress`).
        - **Login Function:** `async login(email)` defined (This function, which incorrectly calls `portal.backupWallet`, will be removed).
        - **Logout Function:** `async logout()` defined (This function will be removed or adapted if a "reset app" feature is desired later for the single wallet).
    - **Root Component (`App.tsx`):**
        - Application wrapped with `AuthProvider` (This will continue, but `AuthProvider`'s internals will change).
        - `Root` internal component handles basic navigation (This will be simplified to an auth-less flow).
    - **Login Screen (`src/screens/LoginScreen.tsx`):**
        - Simple UI with an email input field created (This screen will be removed).
        - Button ("Test Passkey Backup") triggers the `login` function (This will be removed).

---
**Note:** Section 7 describes components that were "done" in terms of being *coded* prior to Task 000, but their logic was misaligned with the auth-less POC goal. Task 000 addressed this refactoring. The items listed in sections 1-6 are considered stable foundational configurations.

---

**Task 000: Strip Existing Auth & Implement Auth-less Entry Point [DONE]**
*   **Date Completed:** 2025-05-21
*   **Summary:** Refactored the application to remove all user authentication UI (`LoginScreen.tsx`) and associated logic (`login`, `logout`, `userId`, `sessionToken` from `AuthContext.tsx`).
*   **Changes Made:**
    *   `src/screens/LoginScreen.tsx` was deleted.
    *   `src/AuthContext.tsx` was significantly refactored:
        *   Renamed conceptually to `WalletContext` (exports `WalletProvider`, `useWallet`).
        *   State now manages `hasWallet` and `walletAddress` for a single, anonymous wallet, loaded from/saved to `SecureStore`.
        *   Removed `login()`, `logout()`, `userId`, `sessionToken`.
        *   Added `setWalletData()` and `clearWalletData()` for managing wallet state.
    *   `App.tsx` was updated to use `WalletProvider` and `useWallet`. Navigation logic in the `Root` component was changed to show placeholders for `InitialWalletSetupScreen` or `WalletDisplayScreen` based on `hasWallet` state.
    *   The incorrect `portal.backupWallet()` call during app initialization was removed.
*   **Verification:** User confirmed that the app launches into a clean, authentication-less flow, navigating to the correct placeholder screens based on simulated `SecureStore` state.

---

**Task 001: Verify API Key Loading & Portal SDK Initialization & Display Connection Status [DONE]**
*   **Date Completed:** 2025-05-21
*   **Summary:** Verified Portal SDK initialization and implemented a UI indicator for Portal connection status.
*   **Changes Made:**
    *   `src/portal.ts`:
        *   Added console logging to verify `portalClientApiKey` loading.
        *   Wrapped `new Portal(...)` instantiation in a `try/catch` block to log success/failure.
        *   Exported `getPortalInitializationError()` to allow other modules to check SDK init status.
        *   Temporarily commented out `setPasskeyConfiguration` call due to TypeScript errors (to be investigated later if needed for passkey backup).
    *   `src/AuthContext.tsx` (`WalletContext`):
        *   Added `isPortalConnected: boolean | null` to state.
        *   Updated `useEffect` to check `portal` instance and `getPortalInitializationError()` from `src/portal.ts` to set `isPortalConnected` state after initial loading.
        *   Added `isPortalConnected` to the context provider value.
    *   `src/components/PortalStatusIndicator.tsx`: New component created to display "Portal: Connected" (Green), "Portal: Not Connected" (Red), or "Portal: Checking..." based on `isPortalConnected` state from `WalletContext`.
    *   `App.tsx`: Imported and integrated `PortalStatusIndicator` to be persistently visible.
*   **Verification:** User confirmed that console logs showed correct API key loading and successful SDK instantiation. The UI indicator correctly displayed "Portal: Connected" and also correctly showed "Portal: Not Connected" when tested with an invalid API key.
