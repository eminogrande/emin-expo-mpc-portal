# Task 009: Add "Create Wallet" Button to Initial Screen

**ID:** 009
**Status:** To Do
**Priority:** High
**Assignee:** Cline
**Related Section in PROJECT_DESCRIPTION_AND_PLAN.md:** Core Functionality - Wallet Creation
**Dependencies:** Task 000 (Initial screen structure via `App.tsx` and `WalletContext`)

---

## Description

This task focuses on adding a "Create Wallet" button to the application's initial screen that is displayed when no wallet currently exists. This is the first UI step towards the wallet creation feature.

## Objective

1.  Add a "Create Wallet" button to the main application view (`App.tsx` or a component rendered by it) that is visible when `WalletContext.hasWallet` is `false`.

## Detailed Sub-Tasks:

1.  **Modify Initial Screen UI (`App.tsx` or its direct child component):**
    *   [ ] Open `App.tsx`.
    *   [ ] Locate the conditional rendering logic that displays content when `WalletContext.hasWallet` is `false` (and `loading` is `false`). This was previously a placeholder like "No Wallet - Setup Screen Placeholder".
    *   [ ] Replace or augment this placeholder content to include a `Button` component from `react-native`.
    *   [ ] The button should have the title "Create Wallet".
    *   [ ] For this task, the button's `onPress` handler should only execute `console.log('Create Wallet button pressed - UI only');`. No SDK interaction.

## Testing Steps & Acceptance Criteria:

1.  **Manual Verification:**
    *   [ ] Launch the app when no wallet exists (e.g., after clearing app data or on a fresh install).
    *   [ ] Verify the "Create Wallet" button is visible on the initial screen.
    *   [ ] Verify the button is tappable.
    *   [ ] Tapping the button logs "Create Wallet button pressed - UI only" to the console and does not cause errors or attempt any wallet creation logic.
2.  **Automated Tests (e.g., `__tests__/App.test.tsx` or a specific screen test):**
    *   [ ] Test that when `WalletContext.hasWallet` is `false`, the "Create Wallet" button is rendered.
    *   [ ] (Optional) Test that `console.log` is called with the correct message upon button press (may require spy setup).

## Acceptance Criteria:

*   [ ] A "Create Wallet" button is visible on the initial application screen when no wallet exists.
*   [ ] Pressing the button logs a message to the console and performs no other action.
*   [ ] The changes are confined to the UI presentation within `App.tsx` or its immediate child component for the "no wallet" state.
*   [ ] Basic automated tests confirm the button's presence under the correct conditions.

---
## Post-Completion Documentation Sub-Tasks:
*   [ ] Update `briefing/COMPLETED_SETUP_LOG.md` with a summary of this task's completion.
*   [ ] Document this task's test(s) and their workings in `briefing/TESTS.md`.
*   [ ] Write automated tests and store in `__tests__/`.
*   [ ] If version bump is 'Yes', update version in `package.json` and `app.config.ts`.

## Versioning:
*   **Version Bump on Completion:** No (Minimal UI change, no new complete feature)
*   **Proposed New Version:** N/A
