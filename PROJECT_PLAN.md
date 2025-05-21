# PROJECT_PLAN.md

**1. Introduction**
    *   **Project Goal:** To build a minimal proof-of-concept (POC) MPC Bitcoin Wallet using React Native (Expo) and the PortalHQ.io SDK, demonstrating wallet creation, address display, and passkey backup.
    *   **Current Status:** The foundational project setup, including SDK initialization, core configurations, and basic UI/auth structure, is complete. The project is now moving into verifying this foundation and then implementing the core MPC wallet user flows.
    *   **Development Paradigm:** This project aims to follow a test-inclusive development approach. All existing foundational components will be verified, and new features will be accompanied by tests to ensure correctness and stability. Errors will be logged and made visible for debugging.
    *   **Purpose of this Document:** To provide a comprehensive overview of what has been built, the detailed plan for pending tasks, and instructions for building the application.

**2. Current Project State: Verified Foundational Setup [DONE]**

This section details the components and configurations that are established and considered foundational. Initial verification tests are outlined to confirm their correct operation before proceeding with new feature development.

**2.1. Project Core & Structure [DONE]**
    - **Initialization:** Standard React Native (Expo) project structure established.
    - **Entry Point (`index.ts`):** `App.tsx` correctly registered as the root component using `registerRootComponent`.
    - **TypeScript (`tsconfig.json`):** Configured for strict TypeScript checking, extending `expo/tsconfig.base`.
    - **Version Control (`.gitignore`):** Standard files and directories (node_modules, .expo, etc.) are ignored.
    - **Assets (`assets/`):** Placeholder app icons (adaptive, favicon, icon, splash) are present.

**2.2. Dependencies (`package.json`) [DONE]**
    - **Portal SDK:** `@portal-hq/core` and `@portal-hq/passkey-storage` installed.
    - **Passkeys:** `react-native-passkeys` (native module for platform passkey APIs) installed.
    - **Expo Core & Utilities:** `expo`, `expo-dev-client`, `expo-secure-store`, `expo-status-bar` installed.
    - **React & React Native:** Core framework libraries installed.
    - **Utility Libraries (Installed):** `bitcoinjs-lib` and `react-native-qr-svg` are present (though not yet fully utilized).
    - **Development Dependencies:** Standard tools like `@babel/core` and TypeScript type definitions installed.

**2.3. Environment & API Key Management [DONE]**
    - **`.env` File:** Created and contains `PORTAL_CLIENT_API_KEY` and `PORTAL_CLIENT_ID`.
    - **`dotenv` Package:** Installed and configured in `app.config.ts` to load `.env` variables.
    - **`app.config.ts` Integration:** Securely loads Portal credentials from `.env` and exposes them to the application runtime via `Constants.expoConfig.extra`.

**2.4. Expo Application Configuration (`app.config.ts`) [DONE]**
    - **App Identity:** `name` ('emin-expo-mpc-portal') and `slug` defined.
    - **iOS Specifics:**
        - `associatedDomains`: Configured with `['webcredentials:nuri.com']` for passkey WebAuthn ceremonies.
        - `bundleIdentifier`: Set to `MH2SRQ3N27.com.nuriwallet.mpcportal`.
        - `infoPlist.ITSAppUsesNonExemptEncryption`: Set to `false`.
    - **Android Specifics:** `package` name set to `MH2SRQ3N27.com.nuriwallet.mpcportal`.
    - **EAS Integration:** `eas.projectId` ('b33bc579-313c-4f8c-8115-a988c054f892') linked.

**2.5. EAS Build Configuration (`eas.json`) [DONE]**
    - **CLI Version:** Minimum EAS CLI version specified.
    - **App Version Source:** Set to `remote`.
    - **Build Profiles:** Defined for `development`, `simulator`, `preview`, and `production`.
        - `development` & `simulator` profiles include `developmentClient: true`.
        - `production` profile includes `autoIncrement: true`.
    - **Environment Variables in Builds:** Placeholders for `PORTAL_PROJECT_ID` and `PORTAL_SECRET_KEY` defined in `development` and `simulator` build profile `env` sections.

**2.6. Portal SDK Integration & Initialization (`src/portal.ts`) [DONE]**
    - **Singleton Instance:** A shared `portal` instance of the Portal SDK is created and exported.
    - **API Key Usage:** Initialized with the `portalClientApiKey` loaded via `expo-constants`.
    - **Passkey Storage Setup:**
        - `PasskeyStorage` from `@portal-hq/passkey-storage` instantiated.
        - Configured with `relyingParty.id` as 'nuri.com' and `relyingParty.name` as 'Nuri Wallet'.
        - `passkeyStorage` provided to the `Portal` instance for `BackupMethods.Passkey`.
    - **Passkey Configuration Call:** `portal.setPasskeyConfiguration("nuri.com", "nuri.com")` is called.
    - **Passkey Anchor Placeholder:** `setPasskeyAuthenticationAnchorPlaceholder()` function created, noting the need for native UIWindow reference.

**2.7. Application Logic & UI (Foundational) [DONE]**
    - **Authentication Context (`src/AuthContext.tsx`):**
        - Manages `userId`, `sessionToken`, `loading` state.
        - **Session Persistence:** On app launch, attempts to restore `uid` and `token` from `SecureStore`.
        - **Login Function:** `async login(email)` defined (currently calls `portal.backupWallet` and sets dummy session data).
        - **Logout Function:** `async logout()` defined (clears `SecureStore` and resets auth state).
    - **Root Component (`App.tsx`):**
        - Application wrapped with `AuthProvider`.
        - `Root` internal component handles basic navigation (loading message, `LoginScreen`, or placeholder "Logged in" message).
    - **Login Screen (`src/screens/LoginScreen.tsx`):**
        - Simple UI with an email input field created.
        - Button ("Test Passkey Backup") triggers the `login` function from `AuthContext`.

**2.8. Initial Verification Tests (To be performed on existing setup)**
    *   **Objective:** Confirm that all current configurations and initializations are working as expected before building new features.
    *   **[ ] Test 2.8.1: Verify API Key Loading & Portal SDK Initialization:**
        *   Action: Add console logs in `src/portal.ts` to confirm `portalClientApiKey` is loaded correctly and the `portal` object is instantiated without errors. Run the app in the simulator/dev client.
        *   Expected: API key logged, no errors on Portal instantiation.
    *   **[ ] Test 2.8.2: Verify `app.config.js` Runtime Values:**
        *   Action: In `App.tsx` or `AuthContext.tsx`, log `Constants.expoConfig.extra` to ensure `portalClientApiKey` and `portalClientId` are accessible.
        *   Expected: Credentials logged as configured.
    *   **[ ] Test 2.8.3: Verify Basic `AuthContext` `login` and `logout` (Placeholder Functionality):**
        *   Action: Manually trigger `login` (with a test email) and `logout` from the UI. Check `SecureStore` (e.g., via debug logs) and context state changes.
        *   Expected: `SecureStore` values are set/cleared as per the current dummy logic; `userId` state changes. The `portal.backupWallet` call within login is expected to *not* fully succeed in a meaningful way yet, but we're testing the surrounding auth flow.
    *   **[ ] Test 2.8.4: Verify Associated Domains Setup (Conceptual/External):**
        *   Action: Ensure the `apple-app-site-association` file is correctly hosted on `nuri.com` (/.well-known/) and `app.config.ts` `associatedDomains` entry `webcredentials:nuri.com` is correct.
        *   Expected: Configuration matches Apple's requirements for Universal Links and passkey association.

**3. Development Plan: Pending Tasks for Minimal POC**

**Overall Goal (Reiteration):**
1.  User opens app and "authenticates" (simple email-based for POC).
2.  An MPC wallet is created for the user.
3.  The user's Bitcoin wallet address is displayed (text only).
4.  The user can back up their wallet's device key using a passkey.

**Error Handling & Logging Paradigm:** All new features involving SDK calls or critical logic must include `try/catch` blocks. Errors should be logged to the console (e.g., `console.error("[FeatureName Error]", error);`) and, where appropriate, user-facing messages should be displayed.

---
**Phase 1: Refactor & Repair Existing Authentication Flow**
    *   **Objective:** Stabilize the initial user entry point, remove incorrect SDK usage, and prepare for proper wallet operations.
    *   **[ ] Task 1.1: Refactor `AuthContext.tsx` - `login` function**
        *   [ ] Sub-task 1.1.1: Open `src/AuthContext.tsx`.
        *   [ ] Sub-task 1.1.2: In the `login` async function, **remove the entire `portal.backupWallet(...)` call and related console logs.**
        *   [ ] Sub-task 1.1.3: Determine a simple POC authentication strategy (e.g., consider the provided email as "authenticated" for now, setting an `isAuthenticated` flag).
        *   [ ] Sub-task 1.1.4: Modify state updates:
            *   Instead of `setUserId('dummy-uid')`, use `setUserId(email)` or a similar identifier.
            *   Remove `setSessionToken('dummy-token')` if a full session token isn't being established; rely on `isAuthenticated`.
        *   [ ] Sub-task 1.1.5: Update `SecureStore.setItemAsync` calls to store actual authentication status (e.g., `await SecureStore.setItemAsync('isAuthenticated', 'true'); await SecureStore.setItemAsync('userIdentifier', email);`).
        *   [ ] Sub-task 1.1.6: Ensure `loading` state is handled correctly.
        *   [ ] Sub-task 1.1.7: **Test Refactored Login:**
            *   Action: Trigger login from UI.
            *   Expected: User "authenticates" (POC level), `isAuthenticated` state (or equivalent) is true, correct user identifier stored. No `portal.backupWallet` call occurs. Errors logged.
    *   **[ ] Task 1.2: Update `LoginScreen.tsx` UI & `App.tsx` Navigation (Initial)**
        *   [ ] Sub-task 1.2.1: Open `src/screens/LoginScreen.tsx`.
        *   [ ] Sub-task 1.2.2: Change the `Button` title from "Test Passkey Backup" to "Login" or "Proceed".
        *   [ ] Sub-task 1.2.3: Open `App.tsx`.
        *   [ ] Sub-task 1.2.4: In the `Root` component, adjust navigation logic:
            *   If `loading`, show "Booting...".
            *   If not authenticated, show `LoginScreen`.
            *   If authenticated, navigate to a new placeholder screen (e.g., "AuthenticatedScreen") which will prompt for wallet creation or show wallet info.
        *   [ ] Sub-task 1.2.5: **Test UI & Navigation Changes:**
            *   Action: Navigate through the login flow.
            *   Expected: Button text updated, navigation proceeds to the correct post-authentication placeholder screen. Errors logged.

---
**Phase 2: Implement Core MPC Wallet Functionality**
    *   **Objective:** Enable wallet creation, display its address, and allow passkey backup.
    *   **[ ] Task 2.1: Implement Wallet Creation Logic**
        *   [ ] Sub-task 2.1.1: Determine location for this logic (e.g., triggered from "AuthenticatedScreen" or within `AuthContext` post-login).
        *   [ ] Sub-task 2.1.2: Add state to `AuthContext` (or local state if preferred) for `walletAddress: string | null` and `hasWallet: boolean`. Initialize from `SecureStore` on app load if persisted.
        *   [ ] Sub-task 2.1.3: Create a new async function, e.g., `handleCreateWallet()`.
        *   [ ] Sub-task 2.1.4: Inside `handleCreateWallet()`:
            *   Check `hasWallet` state; if true, do not proceed with creation.
            *   Set a loading state (e.g., `isCreatingWallet`).
            *   Call `const addresses = await portal.createWallet();`.
            *   Extract Bitcoin address (verify property name, e.g., `addresses.bitcoin` or `addresses.secp256k1`).
            *   Update state: `setWalletAddress(bitcoinAddress); setHasWallet(true);`.
            *   Persist `hasWallet` (true) and `walletAddress` to `SecureStore`.
            *   Handle errors from `portal.createWallet()` with `try/catch`, log errors, and show user feedback.
            *   Clear loading state.
        *   [ ] Sub-task 2.1.5: Provide a UI element (e.g., "Create Wallet" button on "AuthenticatedScreen") to trigger `handleCreateWallet()` if `hasWallet` is false.
        *   [ ] Sub-task 2.1.6: **Test Wallet Creation:**
            *   Action: After login, trigger wallet creation.
            *   Expected: `portal.createWallet()` called successfully. Bitcoin address retrieved, stored in state, and persisted. `hasWallet` flag set. Errors logged and displayed.
    *   **[ ] Task 2.2: Create `WalletScreen.tsx` and Display Wallet Address**
        *   [ ] Sub-task 2.2.1: Create new file `src/screens/WalletScreen.tsx`.
        *   [ ] Sub-task 2.2.2: Implement a component that:
            *   Retrieves `walletAddress` and `hasWallet` from `AuthContext`.
            *   If `hasWallet` and `walletAddress` exist, displays the address as text.
            *   If not, shows a message or redirects.
        *   [ ] Sub-task 2.2.3: Update `App.tsx` `Root` component: If authenticated and `hasWallet` is true, navigate to `WalletScreen.tsx`.
        *   [ ] Sub-task 2.2.4: **Test Address Display:**
            *   Action: After wallet creation, ensure navigation to `WalletScreen`.
            *   Expected: Correct Bitcoin address is displayed. Errors logged.
    *   **[ ] Task 2.3: Implement Passkey Backup Flow on `WalletScreen.tsx`**
        *   [ ] Sub-task 2.3.1: In `src/screens/WalletScreen.tsx`, add a "Backup Wallet with Passkey" button (visible if `hasWallet` is true).
        *   [ ] Sub-task 2.3.2: Create an `async` function `handleBackupWallet()`.
        *   [ ] Sub-task 2.3.3: Inside `handleBackupWallet()`:
            *   Set a loading state (e.g., `isBackingUp`).
            *   Call `await portal.backupWallet(BackupMethods.Passkey, (status) => { console.log('Backup Status: ', status); /* Update UI based on status */ }, {});`.
            *   Handle success/failure (e.g., show alert, update UI to indicate backup status).
            *   Store backup completion status (e.g., `isBackupComplete = true` in `SecureStore` or context).
            *   Handle errors with `try/catch`, log, and show user feedback.
            *   Clear loading state.
        *   [ ] Sub-task 2.3.4: Attach `handleBackupWallet()` to the button's `onPress`.
        *   [ ] Sub-task 2.3.5: **Test Passkey Backup:**
            *   Action: Trigger passkey backup from `WalletScreen`.
            *   Expected: Passkey prompt appears. Successful backup call to `portal.backupWallet()`. UI feedback for success/error. Errors logged.

---
**Phase 3: Final Touches**
    *   **Objective:** Ensure robustness and a clean user experience.
    *   **[ ] Task 3.1: Comprehensive Error Handling & User Feedback Review**
        *   [ ] Sub-task 3.1.1: Review all `try/catch` blocks for Portal SDK calls.
        *   [ ] Sub-task 3.1.2: Ensure user-facing alerts/messages are clear for errors.
        *   [ ] Sub-task 3.1.3: Verify handling of passkey prompt cancellations.
    *   **[ ] Task 3.2: Full End-to-End Flow Testing**
        *   [ ] Sub-task 3.2.1: Test: App open -> Login -> Wallet Creation (first time) -> Address Display -> Passkey Backup.
        *   [ ] Sub-task 3.2.2: Test: App reopen -> Login -> Address Display (wallet already exists) -> Backup option.
        *   [ ] Sub-task 3.2.3: Test on iOS simulator/device, focusing on passkey interactions.

**4. Building the App**
    *   **For Local Development & Testing:**
        *   Run on iOS Simulator: `npx expo run:ios` (Requires Xcode)
        *   Run on Android Emulator/Device: `npx expo run:android` (Requires Android Studio)
    *   **For iOS App Store Distribution (Recommended: EAS Build):**
        1.  Ensure EAS CLI is installed (`npm install -g eas-cli`) and logged in (`eas login`).
        2.  Start build: `eas build -p ios --profile production`
        3.  Download `.ipa` from EAS and submit to App Store Connect via Transporter.

**5. Key Technologies & References**
    *   PortalHQ.io SDK: [Official Documentation Link]
    *   Expo: [Official Documentation Link]
    *   React Native Passkeys: [Link to `react-native-passkeys` library]

---
_This PROJECT_PLAN.md was last updated on 2025-05-21._
