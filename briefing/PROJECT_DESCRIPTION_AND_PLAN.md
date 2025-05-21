# Project: Minimal MPC Bitcoin Wallet POC

## 1. Overview & Core Functionality

**Goal:**
To build a minimal proof-of-concept (POC) React Native (Expo) application that demonstrates core MPC (Multi-Party Computation) wallet functionality using the PortalHQ.io SDK. This POC will focus on an **authentication-less** user experience.

**Main Features & Functionality (Intended for this POC):**

1.  **Automatic Wallet Creation:** Upon first launch, if no wallet exists locally, the application will automatically create a new MPC wallet. This involves generating a device key share (stored securely on the user's device) and a server key share (managed by PortalHQ).
2.  **Bitcoin Address Display:** Once a wallet is created (or if it already exists from a previous session), the application will display the user's Bitcoin wallet address in plain text.
3.  **Passkey Backup:** The user will have the option to back up their wallet's device key share using a native passkey. This provides a secure method for wallet recovery.

**Development Paradigm:**
This project will follow a test-inclusive development approach. New features will be accompanied by tests to ensure correctness and stability. Errors will be logged and made visible for debugging to maintain a high-quality codebase.

## 2. Intended User Flow (Authentication-less)

The application is designed for simplicity, with no user login or explicit authentication steps.

1.  **First App Launch:**
    *   User opens the app.
    *   The app checks local storage for existing wallet data.
    *   Finding no existing wallet, it automatically initiates the creation of a new MPC wallet via `portal.createWallet()`.
    *   Upon successful creation, the app stores wallet details (e.g., a flag indicating existence, the Bitcoin address) locally and securely.
    *   The app navigates to a screen displaying the newly created Bitcoin wallet address and an option to "Backup with Passkey."

2.  **Subsequent App Launches (Wallet Exists):**
    *   User opens the app.
    *   The app checks local storage and finds existing wallet data.
    *   The app navigates directly to a screen displaying the existing Bitcoin wallet address and the option to "Backup with Passkey" (if not already backed up, or perhaps to manage backups).

**Mermaid Flowchart of Intended User Flow:**

```mermaid
graph TD
    A[User Opens App] --> B{Local Wallet Data Exists?};
    B -- No --> C[Auto-trigger: portal.createWallet()];
    C --> D[Store Wallet Details Locally (Address, hasWallet=true)];
    D --> E[Display Bitcoin Address & Backup Option];
    B -- Yes --> E;
    E -- User Clicks "Backup with Passkey" --> F[Initiate portal.backupWallet(Passkey)];
    F --> G[Handle Backup Status (Success/Failure)];
```

---

## 3. Project Setup, Development Workflow, & Deployment Guide

This guide provides comprehensive instructions for setting up the development environment, understanding the workflow, and building/deploying the application.

### 3.1. Prerequisites

Before you begin, ensure you have the following installed on your system:

*   **Node.js:** LTS version recommended (e.g., v18 or v20). You can download it from [nodejs.org](https://nodejs.org/).
*   **npm or Yarn:** Package managers for Node.js. npm comes with Node.js. This project uses `npm` (as indicated by `package-lock.json`).
*   **Expo CLI:** The command-line interface for Expo. Install globally:
    ```bash
    npm install -g expo-cli
    ```
*   **EAS CLI:** Expo Application Services CLI for builds and submissions. Install globally:
    ```bash
    npm install -g eas-cli
    ```
*   **Git:** For version control.
*   **Platform-Specific SDKs:**
    *   **For iOS Development:**
        *   macOS is required.
        *   Xcode (latest version from the Mac App Store).
        *   CocoaPods (`sudo gem install cocoapods` if not already installed or updated).
    *   **For Android Development:**
        *   Android Studio (latest version).
        *   Android SDK (usually installed with Android Studio).
        *   An Android Virtual Device (AVD) configured in Android Studio, or a physical Android device set up for development.

### 3.2. Initial Project Setup

1.  **Clone the Repository:**
    ```bash
    git clone <repository_url>  # Replace <repository_url> with the actual URL
    cd emin-expo-mpc-portal
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
    This will install all the packages listed in `package.json`.

### 3.3. Environment Configuration

The application requires API keys for PortalHQ services. These are managed using a `.env` file at the project root.

1.  **Create `.env` file:**
    *   At the root of the project, create a file named `.env`.
2.  **Add Required Keys:**
    *   Open the `.env` file and add the following lines, replacing `<YOUR_KEY>` and `<YOUR_ID>` with the actual credentials obtained from the Portal Admin Dashboard (Settings -> Test Client API Keys):
        ```env
        PORTAL_CLIENT_API_KEY=<YOUR_PORTAL_CLIENT_API_KEY>
        PORTAL_CLIENT_ID=<YOUR_PORTAL_CLIENT_ID>
        ```
    *   **Note:** The `PORTAL_CLIENT_ID` is loaded into `app.config.ts` but not directly used by the `new Portal(...)` constructor in `src/portal.ts` in the current setup. It might be intended for other direct API calls or future use. The `PORTAL_CLIENT_API_KEY` is essential for SDK initialization.
    *   Ensure the `.env` file is listed in your `.gitignore` file to prevent committing secrets (it is in the current project `.gitignore`).

### 3.4. Running Locally for Development

You can run the app on simulators/emulators or physical devices for development and testing.

*   **Using Expo CLI (Metro Bundler):**
    1.  Start the Metro bundler:
        ```bash
        npx expo start
        ```
    2.  Metro will provide options in the terminal:
        *   Press `i` to open in an iOS Simulator.
        *   Press `a` to open in an Android Emulator/Device.
        *   Scan the QR code with the Expo Go app on a physical device (iOS or Android).
            *   *Note on Expo Go:* While convenient, Expo Go has limitations with custom native code or some configurations. For this project, especially with `react-native-passkeys`, using a development build via `npx expo run:[platform]` is more reliable.

*   **Using Development Builds (Recommended for this project):**
    Development builds include all your native code and configurations.
    1.  **For iOS Simulator:**
        ```bash
        npx expo run:ios
        ```
        This command will:
        *   Ensure your native `ios` project is configured (`npx expo prebuild` is run implicitly if needed).
        *   Build the native iOS app (if not already built or if native code/config changed).
        *   Install and launch the app on a connected/running iOS Simulator.
    2.  **For Android Emulator/Device:**
        ```bash
        npx expo run:android
        ```
        This command will:
        *   Ensure your native `android` project is configured.
        *   Build the native Android app.
        *   Install and launch the app on a connected Android device or running emulator.

*   **Debugging Tips:**
    *   **Console Logs:** Viewable in the Metro bundler terminal, or by enabling remote JS debugging (press `m` in Metro terminal, then `d`) which opens the browser developer tools.
    *   **Icon Not Showing on Simulator (iOS):** If a newly added app icon doesn't appear immediately after `npx expo run:ios`:
        1.  Delete the app from the simulator.
        2.  Run `npx expo run:ios` again.
        3.  If still an issue, try `npx expo prebuild --platform ios --clean` then `npx expo run:ios` to force a full regeneration of the native project.
        4.  As a last resort, reset the simulator (Simulator > Device > Erase All Content and Settings...).

### 3.5. Building for Distribution with EAS Build

Expo Application Services (EAS) Build is used for creating standalone builds for app stores or internal distribution.

1.  **Install/Update EAS CLI (if not already done):**
    ```bash
    npm install -g eas-cli
    ```
2.  **Login to your Expo Account:**
    ```bash
    eas login
    ```
    You may also need to be logged into your Apple Developer and Google Play Developer accounts if EAS is managing your signing credentials.

3.  **Configure Build Profiles (`eas.json`):**
    *   The project already has an `eas.json` with `development`, `simulator`, `preview`, and `production` profiles. Review and adjust these as needed for your specific requirements (e.g., environment variables, distribution type, credentials).

4.  **Start a Build:**
    *   **For iOS (e.g., TestFlight/App Store):**
        ```bash
        eas build -p ios --profile production
        ```
        (The `production` profile is typically configured for App Store releases.)
    *   **For Android (e.g., Google Play Store):**
        ```bash
        eas build -p android --profile production
        ```
        This command can produce an `.apk` or an `.aab` (Android App Bundle).

5.  **Monitor Build:**
    *   EAS CLI will output a link to the build details page on the Expo dashboard where you can monitor its progress.

### 3.6. Deployment

#### iOS (TestFlight & App Store)

1.  **Download `.ipa`:**
    *   Once the EAS build for iOS is successful, download the `.ipa` file from the build details page on the Expo dashboard.
2.  **Upload via Apple Transporter:**
    *   Open the Transporter app on your Mac (download from the Mac App Store if you don't have it).
    *   Sign in with your Apple Developer account (App Store Connect credentials).
    *   Drag and drop the downloaded `.ipa` file into Transporter.
    *   Follow the prompts to deliver the app to App Store Connect.
3.  **Manage in App Store Connect:**
    *   Go to [App Store Connect](https://appstoreconnect.apple.com/).
    *   Select your app.
    *   Under the "TestFlight" tab, you can manage builds, add testers, and distribute.
    *   For App Store submission, proceed through the "App Store" tab.

#### Android (Google Play Console - Optional for this POC)

1.  **Download `.aab` or `.apk`:**
    *   Download the build artifact from the EAS build page. `.aab` is preferred.
2.  **Upload to Google Play Console:**
    *   Go to the [Google Play Console](https://play.google.com/console/).
    *   Select your app and navigate to a release track.
    *   Upload your `.aab` or `.apk` file.

### 3.7. Development-to-Deployment Workflow (Flowchart)

```mermaid
graph TD
    A[1. Clone Repository] --> B[2. Install Dependencies (npm install)];
    B --> C[3. Setup .env with API Keys];
    C --> D{4. Local Development Iteration};
    D -- Yes --> E[Run with 'npx expo start' or 'run:platform'];
    E --> F[Code & Test on Simulator/Emulator/Device];
    F --> G[Commit Changes to Git];
    G --> D;
    D -- No (Ready for Build) --> H[Ensure Git Changes are Committed & Pushed];
    H --> I[5. Run 'eas build -p [platform] --profile production'];
    I --> J[EAS Cloud Build Process];
    J --> K[6. Download .ipa/.aab from Expo Dashboard];
    K --> L{7. Deploy?};
    L -- iOS TestFlight --> M[Upload .ipa via Transporter];
    M --> N[Manage & Distribute in App Store Connect];
    L -- Android Play Console --> O[Upload .aab/.apk to Play Console];
    O --> P[Manage & Distribute Release];
```

### 3.8. Project Architecture & Key File Dependencies (High-Level Overview)

*   **`App.tsx`:** Main React Native entry point. Sets up `WalletProvider` and renders the `Root` navigation component. Integrates `PortalStatusIndicator`.
*   **`src/AuthContext.tsx` (exports `WalletProvider`, `useWallet`):** Manages global wallet state (`hasWallet`, `walletAddress`, `isPortalConnected`, `loading`). Handles `SecureStore` persistence for wallet state and checks Portal SDK status.
*   **`src/portal.ts`:** Initializes and exports the Portal SDK singleton (`portal`). Manages API key loading and SDK instantiation, exposing initialization status.
*   **`app.config.ts`:** Expo app configuration (name, version, icon, native settings, API key exposure).
*   **`eas.json`:** EAS Build service configuration (profiles).
*   **`assets/`:** Static assets (images, icons).
*   **`briefing/`:** Project documentation hub.
    *   `PROJECT_DESCRIPTION_AND_PLAN.md`: This document.
    *   `COMPLETED_SETUP_LOG.md`: Log of completed work.
    *   `RULES.md`: Development rules.
    *   `TESTS.md`: Test inventory.
    *   `tasks/`: Individual task definitions.
    *   `portal-sdk-docs/`: Local Portal SDK documentation.
*   **`__tests__/`:** Directory for automated test files (Jest).

---

## 4. Development Plan: Pending Tasks for Minimal POC

**Overall Goal (Revised for Auth-less Flow):**
1.  User opens app.
2.  If no local wallet data is found, an MPC wallet (device key + server key via Portal SDK) is created automatically.
3.  The Bitcoin wallet address of this wallet is displayed (text only).
4.  The user can choose to back up this wallet's device key using a passkey.

**Error Handling & Logging Paradigm:** All new features involving SDK calls or critical logic must include `try/catch` blocks. Errors should be logged to the console (e.g., `console.error("[FeatureName Error]", error);`) and, where appropriate, user-facing messages should be displayed.

---
**Task 000: Strip Existing Auth & Implement Auth-less Entry Point**
    *   **Objective:** Eliminate all user authentication UI and logic. Refactor state management for a single, anonymous wallet. Modify app entry to directly check for wallet existence and proceed to creation or display state.
    *   **Status:** To Do
    *   **Priority:** Critical
    *   **Detailed Sub-Tasks:**
        *   **1. Remove Authentication UI & Logic:**
            *   [ ] Delete `src/screens/LoginScreen.tsx`.
            *   [ ] Open `src/AuthContext.tsx`:
                *   Remove `userId`, `sessionToken` from `AuthState` type and context state.
                *   Remove the `login` and `logout` async functions.
                *   Modify `useEffect` loading from `SecureStore` to only load `hasWallet` (as 'true'/'false' string) and `walletAddress`.
                *   Initialize context state: `hasWallet: boolean` (default `false`), `walletAddress: string | null` (default `null`).
                *   Context provider now only provides `hasWallet`, `walletAddress`, `loading`, and functions to update these (e.g., `setWalletDetails(address, hasWalletStatus)`).
            *   [ ] Update components using `useAuth()` to reflect removed properties/functions.
        *   **2. Adapt App Entry Flow (`App.tsx`):**
            *   [ ] Open `App.tsx`.
            *   [ ] Modify the `Root` component:
                *   Still uses `AuthContext` (simplified for wallet state).
                *   After `loading` is false:
                    *   If `authContext.hasWallet` is `true`, navigate to a (to-be-created) `WalletDisplayScreen.tsx`.
                    *   If `authContext.hasWallet` is `false`, navigate to a (to-be-created) `InitialWalletSetupScreen.tsx` (this screen will auto-trigger wallet creation).
        *   **3. Test Cleaned Entry Flow:**
            *   [ ] Verify `LoginScreen.tsx` is gone and no auth logic remains in `AuthContext`.
            *   [ ] On first launch, app attempts to navigate towards `InitialWalletSetupScreen.tsx` state.
            *   [ ] If `SecureStore` is manually populated with `hasWallet: 'true'` and an address, app navigates towards `WalletDisplayScreen.tsx` state.
    *   **Acceptance Criteria:** App launches directly into a flow for managing a single, anonymous wallet, free of any login/auth UI or logic. Incorrect `portal.backupWallet()` call during init is removed.

---
**Phase 1: Implement Core MPC Wallet Functionality (Post Task 000 Cleanup)**
    *   **Objective:** Enable automatic wallet creation, display its address, and allow passkey backup.
    *   **[ ] Task 1.1: Implement Automatic Wallet Creation Logic**
        *   [ ] Sub-task 1.1.1: In `InitialWalletSetupScreen.tsx` (or a service called by it), on component mount and if `!hasWallet`:
            *   Set a loading state (e.g., `isCreatingWallet`).
            *   Call `const addresses = await portal.createWallet();`.
            *   Extract Bitcoin address (e.g., `addresses.bitcoin` or `addresses.secp256k1`).
            *   Call context function `setWalletDetails(bitcoinAddress, true)` which updates context state and persists to `SecureStore`.
            *   Handle errors from `portal.createWallet()`: log, show user feedback, potentially offer retry.
            *   Clear loading state.
            *   Once successful, navigate to `WalletDisplayScreen.tsx`.
        *   [ ] Sub-task 1.1.2: **Test Automatic Wallet Creation:**
            *   Action: First app launch after Task 000.
            *   Expected: `portal.createWallet()` called. Bitcoin address retrieved, stored. App navigates to display the address. Errors logged/displayed.
    *   **[ ] Task 1.2: Create `WalletDisplayScreen.tsx` and Display Wallet Address & Backup Option**
        *   [ ] Sub-task 1.2.1: Create new file `src/screens/WalletDisplayScreen.tsx`.
        *   [ ] Sub-task 1.2.2: Implement component to:
            *   Retrieve `walletAddress` from `AuthContext`.
            *   Display the address as text.
            *   Include a "Backup Wallet with Passkey" button.
        *   [ ] Sub-task 1.2.3: **Test Address Display:**
            *   Action: Navigate to `WalletDisplayScreen` after wallet creation or on subsequent launches if wallet exists.
            *   Expected: Correct Bitcoin address displayed.
    *   **[ ] Task 1.3: Implement Passkey Backup Flow on `WalletDisplayScreen.tsx`**
        *   [ ] Sub-task 1.3.1: In `WalletDisplayScreen.tsx`, create `async handleBackupWallet()`.
        *   [ ] Sub-task 1.3.2: Inside `handleBackupWallet()`:
            *   Set loading state.
            *   Call `await portal.backupWallet(BackupMethods.Passkey, (status) => { /* Update UI based on status */ }, {});`.
            *   Handle success/failure (show alert, update UI). Store backup completion status in `SecureStore`/context.
            *   Handle errors, log, show user feedback. Clear loading state.
        *   [ ] Sub-task 1.3.3: Attach `handleBackupWallet()` to the button's `onPress`.
        *   [ ] Sub-task 1.3.4: **Test Passkey Backup:**
            *   Action: Trigger passkey backup.
            *   Expected: Passkey prompt. Successful `portal.backupWallet()` call. UI feedback. Errors logged.

---
**Phase 2: Verification & Final Touches (Post Core Functionality)**
    *   **Objective:** Ensure robustness and a clean user experience.
    *   **[ ] Task 2.1: Initial Verification Tests (from old PROJECT_PLAN.md section 2.8, adapt as needed post-refactor)**
        *   [ ] Sub-task 2.1.1: Verify API Key Loading & Portal SDK Initialization (if not covered by Task 000 testing).
        *   [ ] Sub-task 2.1.2: Verify `app.config.js` Runtime Values.
        *   [ ] Sub-task 2.1.3: Verify Associated Domains Setup (Conceptual/External).
    *   **[ ] Task 2.2: Comprehensive Error Handling & User Feedback Review**
        *   [ ] Sub-task 2.2.1: Review all `try/catch` blocks for Portal SDK calls.
        *   [ ] Sub-task 2.2.2: Ensure user-facing alerts/messages are clear.
        *   [ ] Sub-task 2.2.3: Verify handling of passkey prompt cancellations.
    *   **[ ] Task 2.3: Full End-to-End Flow Testing**
        *   [ ] Sub-task 2.3.1: Test: First App open -> Auto Wallet Creation -> Address Display -> Passkey Backup.
        *   [ ] Sub-task 2.3.2: Test: Subsequent App open -> Address Display -> Backup option.
        *   [ ] Sub-task 2.3.3: Test on iOS simulator/device.

## 5. Building the App
    *   **For Local Development & Testing:**
        *   Run on iOS Simulator: `npx expo run:ios` (Requires Xcode)
        *   Run on Android Emulator/Device: `npx expo run:android` (Requires Android Studio)
    *   **For iOS App Store Distribution (Recommended: EAS Build):**
        1.  Ensure EAS CLI is installed (`npm install -g eas-cli`) and logged in (`eas login`).
        2.  Start build: `eas build -p ios --profile production`
        3.  Download `.ipa` from EAS and submit to App Store Connect via Transporter.

## 6. Key Technologies & References
    *   PortalHQ.io SDK: [Official Documentation Link]
    *   Expo: [Official Documentation Link]
    *   React Native Passkeys: [Link to `react-native-passkeys` library]

---
_This PROJECT_DESCRIPTION_AND_PLAN.md was last updated on 2025-05-21._
