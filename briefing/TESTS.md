# Project Test Inventory (TESTS.md)

This document provides a high-level overview of the key tests defined for this project, explaining their purpose and how they work in simple language. Detailed testing steps for each task are found within the individual task files in the `/tasks` directory.

---

## Foundational Setup & Refactoring Tests

### Test ID: T000.1 - Clean Auth-less Entry Flow Verification
*   **Related Task:** `tasks/000_strip_auth_and_implement_authless_entry.md`
*   **Purpose:** To verify that all user authentication UI and logic have been removed, and the app correctly navigates to an initial state based on whether a (single, anonymous) wallet exists in `SecureStore`.
*   **How it Works (Manual Verification):**
    1.  **First Launch Scenario:** Clear `SecureStore` (e.g., via app uninstall/reinstall or a debug function like `clearWalletData()` from `WalletContext`). Launch the app.
        *   *Expected:* App navigates to a placeholder screen indicating "No Wallet - Setup Screen Placeholder" (or similar, as defined in Task 000). Console logs should show no errors related to old auth logic.
    2.  **Existing Wallet Scenario:** Manually populate `SecureStore` to simulate an existing wallet (e.g., set `hasWallet` to `'true'` and `walletAddress` to a test string). Launch the app.
        *   *Expected:* App navigates to a placeholder screen indicating "Wallet Exists - Display Screen Placeholder" (or similar).

### Test ID: T001.1 - Portal SDK Initialization & API Key Loading Verification
*   **Related Task:** `tasks/001_verify_api_key_and_sdk_init.md`
*   **Purpose:** To confirm that the Portal SDK initializes correctly with the provided API key.
*   **How it Works (Console Log Verification):**
    1.  Launch the app in a development environment (simulator/dev client).
    2.  Observe console output.
        *   *Expected:* Logs from `src/portal.ts` should show the loaded `PORTAL_CLIENT_API_KEY` and a message confirming successful instantiation of the `Portal` SDK object. No instantiation errors should be present.

### Test ID: T001.2 - Portal Connection Status UI Indicator
*   **Related Task:** `tasks/001_verify_api_key_and_sdk_init.md`
*   **Purpose:** To verify that the UI correctly displays the Portal SDK connection status.
*   **How it Works (UI Observation & Console Log Verification):**
    1.  Launch the app.
        *   *Expected (Success):* The UI indicator should show "Portal: Checking...", then update to "Portal: Connected" (Green). Console logs in `WalletContext` should confirm this.
    2.  **Test Failure Case:** Temporarily modify `.env` with an invalid `PORTAL_CLIENT_API_KEY`. Restart the app.
        *   *Expected (Failure):* The UI indicator should show "Portal: Not Connected" (Red). Console logs should indicate an SDK initialization error. (Remember to revert the API key after this test).

---

*(New tests will be added here as new features and tasks are defined.)*
