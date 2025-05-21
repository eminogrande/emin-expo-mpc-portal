# Task 000: Strip Existing Auth & Implement Auth-less Entry Point

**ID:** 000
**Status:** Done
**Priority:** Critical
**Assignee:** Cline & User
**Related Section in PROJECT_DESCRIPTION_AND_PLAN.md:** Section 3, Task 000
**Version Bump on Completion:** No (Considered foundational cleanup for v0.0.1)
**Proposed New Version:** N/A

---

## Description

The current application includes `src/screens/LoginScreen.tsx` and an `AuthContext.tsx` with login/logout logic that is not aligned with the project's **authentication-less POC goal**. Furthermore, the existing `login` function in `AuthContext.tsx` incorrectly calls `portal.backupWallet()`.

This task is to refactor the application by:
1.  Eliminating all user authentication UI (`LoginScreen.tsx`) and associated logic (`login`, `logout`, `userId`, `sessionToken` in `AuthContext.tsx`).
2.  Refactoring state management (`AuthContext.tsx` or a simpler alternative) to focus solely on the state of a single, anonymous wallet (i.e., `hasWallet: boolean`, `walletAddress: string | null`). This state should be loaded from and saved to `SecureStore`.
3.  Modifying the app's entry point (`App.tsx`) to directly check for this wallet existence upon launch and then navigate to a state that appropriately precedes either automatic wallet creation (if no wallet exists) or the display of existing wallet information.

This will establish a clean foundation for implementing the core POC features as outlined in the `PROJECT_DESCRIPTION_AND_PLAN.md`.

## Objective

1.  Eliminate all user authentication UI and logic from the application.
2.  Refactor state management for a single, anonymous wallet.
3.  Modify app entry to directly check for wallet existence and proceed to an appropriate state for creation or display.
4.  Ensure no incorrect `portal.backupWallet()` call occurs during app initialization.

## Detailed Sub-Tasks:

**1. Remove Authentication UI & Logic:**
    *   [x] Delete the file `src/screens/LoginScreen.tsx`.
    *   [x] Open `src/AuthContext.tsx`:
        *   [x] Remove `userId`, `sessionToken` from `AuthState` type and context state.
        *   [x] Remove the `login` and `logout` async functions.
        *   [x] Modify `useEffect` hook (that loads from `SecureStore`):
            *   [x] It should now only attempt to load `hasWallet` (e.g., as 'true'/'false' string) and `walletAddress`.
            *   [x] Initialize context state: `hasWallet: boolean` (default `false`), `walletAddress: string | null` (default `null`).
        *   [x] The context provider will now only provide `hasWallet`, `walletAddress`, `loading`, and functions to update these (e.g., a new function like `setWalletData(address: string | null, walletExists: boolean)`).
    *   [x] Update any components that were using the old `AuthContext` structure (primarily `App.tsx`) to reflect removed/changed properties and functions.

**2. Adapt App Entry Flow (`App.tsx`):**
    *   [x] Open `App.tsx`.
    *   [x] Modify the `Root` component:
        *   [x] It will continue to use `AuthContext` (now simplified for wallet state, renamed to `useWallet` and `WalletProvider`).
        *   [x] After the `loading` state (from `AuthContext` indicating `SecureStore` has been checked) is `false`:
            *   [x] If `authContext.hasWallet` is `true`, navigate to a placeholder for `WalletDisplayScreen.tsx` (e.g., a simple Text component saying "Wallet Exists - Display Screen Placeholder").
            *   [x] If `authContext.hasWallet` is `false`, navigate to a placeholder for `InitialWalletSetupScreen.tsx` (e.g., a simple Text component saying "No Wallet - Setup Screen Placeholder"). This screen will later handle automatic wallet creation.

**3. Test Cleaned Entry Flow:**
    *   [x] Verify `LoginScreen.tsx` is deleted and no longer referenced.
    *   [x] Verify `AuthContext.tsx` no longer contains user-specific authentication logic (`login`, `logout`, `userId`, `sessionToken`).
    *   [x] Verify the incorrect `portal.backupWallet()` call during app initialization is removed.
    *   [x] On first app launch (after clearing `SecureStore` or on a fresh install): (User to test)
        *   The app should navigate to the "No Wallet - Setup Screen Placeholder".
    *   [x] If `SecureStore` is manually populated to simulate an existing wallet (e.g., `hasWallet: 'true'`, `walletAddress: 'someAddress'`): (User to test)
        *   The app should navigate to the "Wallet Exists - Display Screen Placeholder".

## Testing Steps & Acceptance Criteria:

*   [x] `src/screens/LoginScreen.tsx` is deleted.
*   [x] `AuthContext.tsx` is refactored to manage only `hasWallet` and `walletAddress` state, removing all user authentication logic (login/logout functions, userId/sessionToken state).
*   [x] The incorrect `portal.backupWallet()` call, previously in `AuthContext.login()`, is removed from the application's initialization or default flow.
*   [x] `App.tsx` correctly navigates to a placeholder state indicating readiness for wallet creation (if no wallet data in `SecureStore`) or wallet display (if wallet data exists in `SecureStore`).
*   [x] The application launches into a clean, authentication-less flow, setting a stable foundation for subsequent tasks. (Confirmed by user testing)

---
## Post-Completion Documentation Sub-Tasks:
*   [x] Update `COMPLETED_SETUP_LOG.md` with a summary of this task's completion, including changes made (LoginScreen removed, AuthContext refactored, App.tsx updated) and verification results (user confirmed flow works).
*   [x] Document this task's test(s) (T000.1 - manual verification) and their workings in `briefing/TESTS.md`.
*   [ ] Write automated tests (e.g., Jest) for any new/modified logic/components and store in `__tests__/`. (Marked N/A for this refactoring task as manual verification was deemed sufficient for foundational cleanup; future feature tasks will require automated tests.)
