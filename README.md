# What are we building

This project is an MPC (Multi-Party Computation) Bitcoin Wallet built as a React Native (Expo) application, utilizing the PortalHQ.io SDK for core wallet functionalities and passkey integration.

# What did we build so far

The project has a foundational setup establishing the core architecture and necessary configurations for an MPC wallet with passkey support. The following components and configurations are in place:

**1. Project Core & Structure:**
    - **Initialization:** Standard React Native (Expo) project structure.
    - **Entry Point (`index.ts`):** `App.tsx` registered as the root component using `registerRootComponent`.
    - **TypeScript (`tsconfig.json`):** Configured for strict TypeScript checking, extending `expo/tsconfig.base`.
    - **Version Control (`.gitignore`):** Standard files and directories ignored (e.g., `node_modules/`, `.expo/`, build artifacts).
    - **Assets (`assets/`):** Placeholder icons (adaptive, favicon, icon, splash) are present.

**2. Dependencies (`package.json`):**
    - **Portal SDK:**
        - `@portal-hq/core`: Core library for Portal functionalities.
        - `@portal-hq/passkey-storage`: For integrating passkeys as a backup/authentication method.
    - **Passkeys:**
        - `react-native-passkeys`: Native module for interacting with platform passkey APIs.
    - **Expo Core & Utilities:**
        - `expo`: Main Expo library.
        - `expo-dev-client`: For creating development builds.
        - `expo-secure-store`: For secure on-device key-value storage.
        - `expo-status-bar`: For controlling the status bar.
    - **React & React Native:** Core framework libraries.
    - **Utility Libraries (Installed, not yet fully utilized):**
        - `bitcoinjs-lib`: For Bitcoin-specific cryptographic operations.
        - `react-native-qr-svg`: For generating QR codes.
    - **Development Dependencies:** Standard tools like `@babel/core`, TypeScript type definitions.

**3. Environment & API Key Management:**
    - **`.env` File:** Contains `PORTAL_CLIENT_API_KEY` and `PORTAL_CLIENT_ID`.
    - **`dotenv` Package:** Used to load environment variables from `.env`.
    - **`app.config.ts` Integration:** Securely loads Portal credentials from `.env` and exposes them to the application runtime via `expo-constants` (`Constants.expoConfig.extra`).

**4. Expo Application Configuration (`app.config.ts`):**
    - **App Identity:** `name` ('emin-expo-mpc-portal') and `slug` set.
    - **iOS Specifics:**
        - `associatedDomains`: Configured with `['webcredentials:nuri.com']` for passkey WebAuthn ceremonies and Universal Links.
        - `bundleIdentifier`: Set to `MH2SRQ3N27.com.nuriwallet.mpcportal`.
        - `infoPlist.ITSAppUsesNonExemptEncryption`: Set to `false`.
    - **Android Specifics:**
        - `package`: Set to `MH2SRQ3N27.com.nuriwallet.mpcportal`.
    - **EAS Integration:** `eas.projectId` ('b33bc579-313c-4f8c-8115-a988c054f892') linked for EAS Build services.

**5. EAS Build Configuration (`eas.json`):**
    - **CLI Version:** Specifies minimum EAS CLI version.
    - **App Version Source:** Set to `remote`.
    - **Build Profiles:** Defined for `development`, `simulator`, `preview`, and `production` to manage different build types and environments.
        - `development` & `simulator` profiles include `developmentClient: true`.
        - `production` profile includes `autoIncrement: true` for build numbers.
    - **Environment Variables in Builds:** Placeholders for `PORTAL_PROJECT_ID` and `PORTAL_SECRET_KEY` in `development` and `simulator` build profile `env` sections (requires setup in EAS Secrets if actively used).

**6. Portal SDK Integration & Initialization (`src/portal.ts`):**
    - **Singleton Instance:** A shared `portal` instance of the Portal SDK is created and exported.
    - **API Key Usage:** Initialized with the `portalClientApiKey` loaded via `expo-constants`.
    - **Passkey Storage Setup:**
        - `PasskeyStorage` from `@portal-hq/passkey-storage` is instantiated.
        - Configured with `relyingParty.id` as 'nuri.com' and `relyingParty.name` as 'Nuri Wallet'.
        - This `passkeyStorage` is provided to the `Portal` instance under `backup: { [BackupMethods.Passkey]: passkeyStorage }`.
    - **Passkey Configuration:** `portal.setPasskeyConfiguration("nuri.com", "nuri.com")` is called, aligning passkey operations with the specified relying party domain.
    - **Passkey Anchor Placeholder:** `setPasskeyAuthenticationAnchorPlaceholder()` function exists, highlighting the need for native implementation for iOS UIWindow reference.

**7. Application Logic & UI (Foundational):**
    - **Authentication Context (`src/AuthContext.tsx`):**
        - Manages `userId`, `sessionToken`, and `loading` application state.
        - **Session Persistence:** On app launch, attempts to restore `uid` and `token` from `SecureStore`.
        - **Login Function:** An `async login(email)` function is defined. It currently calls `portal.backupWallet(BackupMethods.Passkey, ...)` and then sets dummy `uid` and `token` in `SecureStore` and state.
        - **Logout Function:** An `async logout()` function is defined, which clears `uid` and `token` from `SecureStore` and resets auth state.
    - **Root Component (`App.tsx`):**
        - Wraps the application with `AuthProvider`.
        - The `Root` internal component handles basic navigation: displays a loading message, `LoginScreen` if not authenticated, or a placeholder "Logged in" message if authenticated.
    - **Login Screen (`src/screens/LoginScreen.tsx`):**
        - A simple UI with an email input field.
        - A button ("Test Passkey Backup") that triggers the `login` function from `AuthContext`.

A detailed, itemized list of all completed setup tasks can also be found in `tasks.md`.

# Building the App

This section outlines how to build the application for development, testing, and distribution.

## For Local Development & Testing

- **Run on iOS Simulator:**
  ```bash
  npx expo run:ios
  ```
  (Requires Xcode installed)

- **Run on Android Emulator/Device:**
  ```bash
  npx expo run:android
  ```
  (Requires Android Studio and an emulator/device setup)

## For iOS App Store Distribution (Recommended: EAS Build)

Expo Application Services (EAS) Build is the modern, recommended way to build your app for the App Store.

1.  **Ensure EAS CLI is installed and you are logged in:**
    ```bash
    npm install -g eas-cli
    eas login
    ```
2.  **Start an iOS App Store build:**
    ```bash
    eas build -p ios --profile production
    ```
    This command utilizes the `production` profile defined in your `eas.json` file. This profile should be configured with all necessary settings for an App Store submission, including code signing. EAS Build handles the complexities of the native build process in the cloud.
3.  **Download and Submit to App Store Connect:**
    Once the build successfully completes, EAS will provide a link to download the `.ipa` file. You can then upload this `.ipa` to App Store Connect using Apple's Transporter app.

---
_This README was last updated on 2025-05-21 to reflect the current project setup and build processes._
