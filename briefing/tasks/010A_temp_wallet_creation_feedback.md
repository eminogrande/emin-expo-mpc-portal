# Task 010.A: Add Temporary In-App Feedback for `portal.createWallet` Call

**ID:** 010.A
**Status:** To Do
**Priority:** Highest
**Assignee:** Cline
**Related Task(s):** 009 (Button UI), 010 (SDK Call Logic)
**Relevant Documentation:** `App.tsx` (as modified by Task 009 & 010)
**Touches Areas:** `App.tsx` (specifically the `InitialWalletSetupPlaceholder` component)

---

## Description
To verify the outcome of the `portal.createWallet()` call (from Task 010) when testing on a device via TestFlight (where console logs are not easily accessible), this task adds temporary UI elements to display the success response or error message directly on the screen. This adheres to Rule #6 regarding comprehensive feedback.

## Objective
1.  Introduce local state within `InitialWalletSetupPlaceholder` in `App.tsx` to hold the SDK call status/response/error.
2.  Update the `handleCreateWallet` function to set this state based on the `try...catch` outcome.
3.  Render this status/response/error in a `<Text>` component on the screen for immediate visual feedback.

## Detailed Sub-Tasks:

1.  **Modify `InitialWalletSetupPlaceholder` in `App.tsx`:**
    *   [ ] Import `useState` from `react` if not already imported.
    *   [ ] Add local state variables using `useState` at the beginning of the `InitialWalletSetupPlaceholder` function:
        *   `const [creationStatusMessage, setCreationStatusMessage] = useState<string | null>(null);`
        *   `const [isLoading, setIsLoading] = useState<boolean>(false);`
    *   [ ] In the `handleCreateWallet` function:
        *   **Before `try` block:**
            *   `setIsLoading(true);`
            *   `setCreationStatusMessage('Creating wallet...');`
        *   **On success (inside `try`, after `await portal.createWallet()` and existing `console.log`):**
            *   `setCreationStatusMessage('SUCCESS: ' + JSON.stringify(response, null, 2));`
        *   **On error (inside `catch`, after existing `console.error`):**
            *   `setCreationStatusMessage('ERROR: ' + (error instanceof Error ? error.message : String(error)));`
        *   **Add a `finally` block to the `try...catch` structure:**
            *   `setIsLoading(false);`
    *   [ ] In the JSX returned by `InitialWalletSetupPlaceholder`, below the "Create Wallet" `<Button>`:
        *   Add:
            ```jsx
            {isLoading && <Text style={styles.text}>Loading...</Text>}
            {creationStatusMessage && (
              <Text style={[styles.text, { marginTop: 10, color: creationStatusMessage.startsWith('ERROR') ? 'red' : 'green' }]}>
                {creationStatusMessage}
              </Text>
            )}
            ```

## Testing Steps & Acceptance Criteria:

1.  **Manual Verification (Target: TestFlight build on a physical device):**
    *   [ ] Launch the app (in a "no wallet" state). The "Create Wallet" button should be visible.
    *   [ ] Tap the "Create Wallet" button.
    *   [ ] **Observe UI:**
        *   A "Loading..." message should appear below the button.
        *   After the `portal.createWallet()` call completes:
            *   If successful: The "Loading..." message disappears, and a green text message "SUCCESS: {response_json}" appears.
            *   If failed (e.g., due to "Keychain unavailable"): The "Loading..." message disappears, and a red text message "ERROR: [PortalMpc] Keychain is unavailable" (or similar error) appears.
    *   [ ] The "Create Wallet" button itself should remain visible and functional for another attempt if needed.
    *   [ ] No navigation or other `WalletContext`/`SecureStore` state changes should occur as part of this task.

## Acceptance Criteria:

*   [ ] Tapping "Create Wallet" displays an in-app "Loading..." message.
*   [ ] The success response (stringified JSON) or a user-friendly error message from `portal.createWallet()` is displayed directly in the UI.
*   [ ] The displayed message is colored appropriately (e.g., green for success, red for error).
*   [ ] This feedback mechanism allows for clear verification of the `portal.createWallet()` outcome on a TestFlight build.
*   [ ] The changes are confined to `InitialWalletSetupPlaceholder` in `App.tsx` for this temporary feedback.

---
## Post-Completion Documentation Sub-Tasks:
*   [ ] Update `briefing/COMPLETED_SETUP_LOG.md`.
*   [ ] Document tests in `briefing/TESTS.md`.
*   [ ] (Future Task) Consider removing/refining this temporary UI feedback when proper error handling and navigation are implemented.

## Versioning:
*   **Version Bump on Completion:** No (Temporary debugging UI, not a shippable feature enhancement)
*   **Proposed New Version:** N/A
