# Completed Tasks

[x] **Project Core & Structure:**
    - [x] **Initialization:** Standard React Native (Expo) project structure established.
    - [x] **Entry Point (`index.ts`):** `App.tsx` correctly registered as the root component using `registerRootComponent`.
    - [x] **TypeScript (`tsconfig.json`):** Configured for strict TypeScript checking, extending `expo/tsconfig.base`.
    - [x] **Version Control (`.gitignore`):** Standard files and directories (node_modules, .expo, etc.) are ignored.
    - [x] **Assets (`assets/`):** Placeholder app icons (adaptive, favicon, icon, splash) are present.

[x] **Dependencies (`package.json`):**
    - [x] **Portal SDK:** `@portal-hq/core` and `@portal-hq/passkey-storage` installed.
    - [x] **Passkeys:** `react-native-passkeys` (native module for platform passkey APIs) installed.
    - [x] **Expo Core & Utilities:** `expo`, `expo-dev-client`, `expo-secure-store`, `expo-status-bar` installed.
    - [x] **React & React Native:** Core framework libraries installed.
    - [x] **Utility Libraries (Installed):** `bitcoinjs-lib` and `react-native-qr-svg` are present (though not yet fully utilized).
    - [x] **Development Dependencies:** Standard tools like `@babel/core` and TypeScript type definitions installed.

[x] **Environment & API Key Management:**
    - [x] **`.env` File:** Created and contains `PORTAL_CLIENT_API_KEY` and `PORTAL_CLIENT_ID`.
    - [x] **`dotenv` Package:** Installed and configured in `app.config.ts` to load `.env` variables.
    - [x] **`app.config.ts` Integration:** Securely loads Portal credentials from `.env` and exposes them to the application runtime via `Constants.expoConfig.extra`.

[x] **Expo Application Configuration (`app.config.ts`):**
    - [x] **App Identity:** `name` ('emin-expo-mpc-portal') and `slug` defined.
    - [x] **iOS Specifics:**
        - [x] `associatedDomains`: Configured with `['webcredentials:nuri.com']` for passkey WebAuthn ceremonies.
        - [x] `bundleIdentifier`: Set to `MH2SRQ3N27.com.nuriwallet.mpcportal`.
        - [x] `infoPlist.ITSAppUsesNonExemptEncryption`: Set to `false`.
    - [x] **Android Specifics:** `package` name set to `MH2SRQ3N27.com.nuriwallet.mpcportal`.
    - [x] **EAS Integration:** `eas.projectId` ('b33bc579-313c-4f8c-8115-a988c054f892') linked.

[x] **EAS Build Configuration (`eas.json`):**
    - [x] **CLI Version:** Minimum EAS CLI version specified.
    - [x] **App Version Source:** Set to `remote`.
    - [x] **Build Profiles:** Defined for `development`, `simulator`, `preview`, and `production`.
        - [x] `development` & `simulator` profiles include `developmentClient: true`.
        - [x] `production` profile includes `autoIncrement: true`.
    - [x] **Environment Variables in Builds:** Placeholders for `PORTAL_PROJECT_ID` and `PORTAL_SECRET_KEY` defined in `development` and `simulator` build profile `env` sections.

[x] **Portal SDK Integration & Initialization (`src/portal.ts`):**
    - [x] **Singleton Instance:** A shared `portal` instance of the Portal SDK is created and exported.
    - [x] **API Key Usage:** Initialized with the `portalClientApiKey` loaded via `expo-constants`.
    - [x] **Passkey Storage Setup:**
        - [x] `PasskeyStorage` from `@portal-hq/passkey-storage` instantiated.
        - [x] Configured with `relyingParty.id` as 'nuri.com' and `relyingParty.name` as 'Nuri Wallet'.
        - [x] `passkeyStorage` provided to the `Portal` instance for `BackupMethods.Passkey`.
    - [x] **Passkey Configuration Call:** `portal.setPasskeyConfiguration("nuri.com", "nuri.com")` is called.
    - [x] **Passkey Anchor Placeholder:** `setPasskeyAuthenticationAnchorPlaceholder()` function created, noting the need for native UIWindow reference.

[x] **Application Logic & UI (Foundational):**
    - [x] **Authentication Context (`src/AuthContext.tsx`):**
        - [x] Manages `userId`, `sessionToken`, `loading` state.
        - [x] **Session Persistence:** On app launch, attempts to restore `uid` and `token` from `SecureStore`.
        - [x] **Login Function:** `async login(email)` defined (currently calls `portal.backupWallet` and sets dummy session data).
        - [x] **Logout Function:** `async logout()` defined (clears `SecureStore` and resets auth state).
    - [x] **Root Component (`App.tsx`):**
        - [x] Application wrapped with `AuthProvider`.
        - [x] `Root` internal component handles basic navigation (loading message, `LoginScreen`, or placeholder "Logged in" message).
    - [x] **Login Screen (`src/screens/LoginScreen.tsx`):**
        - [x] Simple UI with an email input field created.
        - [x] Button ("Test Passkey Backup") triggers the `login` function from `AuthContext`.

---

# Pending Tasks (Minimal POC Goal)

## Goal:
1. Create wallet (device key + server key via Portal MPC).
2. Retrieve and display the wallet address (text only).
3. Back up the device key using passkey.

## Tasks:
- [ ] **Refactor Auth/Login Flow:**
  - [ ] Modify `AuthContext` `login` function:
    - [ ] Authenticate user (e.g., via email or a simple registration if needed for Portal).
    - [ ] **Remove direct call to `portal.backupWallet()` from login.**
    - [ ] Store actual user/session info from Portal if applicable, not dummy data.
- [ ] **Implement Wallet Creation:**
  - [ ] After successful authentication (and if no wallet exists for the user):
    - [ ] Call `portal.createWallet()`.
    - [ ] Handle response: retrieve wallet addresses (specifically Bitcoin).
    - [ ] Store wallet existence flag and Bitcoin address (e.g., in `AuthContext` state or `SecureStore`).
- [ ] **Display Wallet Address:**
  - [ ] Create a new screen/view (`WalletScreen.tsx`?) to be shown after login if a wallet exists.
  - [ ] Display the retrieved Bitcoin wallet address as plain text on this screen.
- [ ] **Implement Passkey Backup Flow:**
  - [ ] On `WalletScreen.tsx`, add a "Backup Wallet with Passkey" button.
  - [ ] Button onPress should call `portal.backupWallet(BackupMethods.Passkey, ...)`.
  - [ ] Provide UI feedback for backup status (loading, success, error).
  - [ ] Store backup status/date.
- [ ] **UI Updates & Navigation:**
  - [ ] Update `App.tsx` `Root` component:
    - [ ] If logged in AND wallet exists, navigate to `WalletScreen.tsx`.
    - [ ] If logged in BUT no wallet exists, navigate to a "Create Wallet" prompt/screen or auto-create.
- [ ] **Error Handling & Edge Cases:**
  - [ ] Implement error handling for all Portal SDK calls (`createWallet`, `backupWallet`).
  - [ ] Handle cases where passkey operations might fail or be cancelled by the user.
- [ ] **Testing:**
  - [ ] Thoroughly test the end-to-end flow: Login -> Wallet Creation -> Address Display -> Passkey Backup.
