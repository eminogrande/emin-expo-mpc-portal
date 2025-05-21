# Task 010: Call `portal.createWallet` SDK Method and Log Response

**ID:** 010
**Status:** To Do
**Priority:** High
**Assignee:** Cline

**Related Section in PROJECT_DESCRIPTION_AND_PLAN.md:** Core Functionality - Wallet Creation
**Dependencies:**
*   **Task 009: Add "Create Wallet" Button to Initial Screen** - This task *must* be completed, resulting in a visible "Create Wallet" button in `App.tsx` (within `InitialWalletSetupPlaceholder`) when no wallet exists. Task 010 modifies the `onPress` handler of this specific button.
*   **Task 001: Verify API Key & Portal SDK Initialization** - Ensures the `portal` SDK instance is initialized and available for use.

**Relevant Documentation:**
*   `PROJECT_DESCRIPTION_AND_PLAN.md` (re: `portal.createWallet()` usage, noting SDK call might be `portal.createWallet()`)
*   `briefing/portal-sdk-docs/portal Create a wallet.md` (general API context)
*   `App.tsx` (as modified by Task 009)

**Touches Areas:** `App.tsx` (specifically the `onPress` handler of the "Create Wallet" button within the `InitialWalletSetupPlaceholder` component), `src/portal.ts` (for import).

---

## Description

This task implements the core logic for initiating wallet creation by calling the Portal SDK. It builds directly upon Task 009, which established the "Create Wallet" button.
**User Flow Context:** When the app starts and no wallet is detected (`WalletContext.hasWallet` is false), the UI from Task 009 (including the "Create Wallet" button) is displayed. Pressing this button will now trigger the SDK call defined in this task.
The focus is *only* on making the SDK call and logging its raw response or error. No other UI changes, state updates, or navigation will be handled in this task.

## Objective

1.  Modify the "Create Wallet" button's `onPress` handler (from Task 009) to execute `await portal.createWallet();`.
2.  Log the full, raw success response object from the SDK call to the console.
3.  Log the full, raw error object to the console if the SDK call fails.

## Detailed Sub-Tasks:

1.  **Modify `App.tsx` (within `InitialWalletSetupPlaceholder` component):**
    *   [ ] Import the `portal` instance from `src/portal.ts` if not already present.
    *   [ ] Locate the `onPress` handler for the "Create Wallet" button (created in Task 009).
    *   [ ] Modify this `onPress` handler:
        *   [ ] Ensure the handler function is `async`.
        *   [ ] Add a `try...catch` block.
        *   [ ] **Inside `try`:**
            *   Add `console.log('Task 010: Attempting to call portal.createWallet...');`
            *   Call `const response = await portal.createWallet();`.
            *   Log the success: `console.log('Task 010: portal.createWallet SUCCESS:', JSON.stringify(response, null, 2));`.
        *   [ ] **Inside `catch`:**
            *   Log the error: `console.error('Task 010: portal.createWallet ERROR:', error);`.
        *   [ ] **Crucially ensure that the JSX rendering the `<Button title="Create Wallet" ... />` itself is NOT altered or removed by this change.** The modification is *only* to the function assigned to `onPress`.

## Testing Steps & Acceptance Criteria:

1.  **Manual Verification:**
    *   [ ] Launch the app in a state where no wallet exists.
    *   [ ] Open the developer console.
    *   [ ] Tap the "Create Wallet" button.
    *   [ ] **Observe Console Output:**
        *   **On Success:** Verify that the console shows: `Task 010: portal.createWallet SUCCESS:` followed by the stringified JSON response from the SDK.
        *   **On Failure:** Verify that the console shows: `Task 010: portal.createWallet ERROR:` followed by the error object.
    *   [ ] **Verify No Side Effects & Non-Regression:** Confirm that the "Create Wallet" button (from Task 009) remains visible and visually unchanged. Confirm that no other UI changes (loading states, navigation, status messages) occur. Confirm no `WalletContext` or `SecureStore` changes are made by this task. This step is critical before considering the task complete.

2.  **Automated Tests (Definition for when testing environment is ready - as per Rule #6):**
    *   [ ] **Test Suite:** (e.g., `CreateWalletLogic.test.ts` or integrated into `App.test.tsx`)
    *   [ ] **Mocking:** Mock `src/portal.ts` and its `portal.createWallet` method.
    *   [ ] **Test Case: Successful SDK Call:**
        *   Simulate "Create Wallet" button press.
        *   Assert `portal.createWallet` was called.
        *   Assert `console.log` was called with the expected success message and mock response.
    *   [ ] **Test Case: Failed SDK Call:**
        *   Configure mocked `portal.createWallet` to throw an error.
        *   Simulate "Create Wallet" button press.
        *   Assert `portal.createWallet` was called.
        *   Assert `console.error` was called with the expected error message and mock error.

## Acceptance Criteria:

*   [ ] The `onPress` handler of the "Create Wallet" button is updated to `async` and calls `portal.createWallet()` within a `try...catch` block.
*   [ ] On successful SDK call, the full response object is logged to the console with a "SUCCESS" prefix.
*   [ ] If the SDK call fails, the error object is logged to the console with an "ERROR" prefix.
*   [ ] No changes are made to application state (WalletContext, SecureStore) or UI beyond the console logs.
*   [ ] The "Create Wallet" button UI from Task 009 must remain visually and functionally present after this task's changes.
*   [ ] Automated test cases are defined as per the "Testing Steps".

---
## Post-Completion Documentation Sub-Tasks (as per Rule #5, #6):
*   [ ] Update `briefing/COMPLETED_SETUP_LOG.md`.
*   [ ] Document tests in `briefing/TESTS.md`.
*   [ ] (Future Task) Implement defined automated tests.
*   [ ] If version bump is 'Yes', update versions (as per Rule #4).

## Versioning (as per Rule #4):
*   **Version Bump on Completion:** No (Internal logic, not a complete user-facing feature yet)
*   **Proposed New Version:** N/A
