# Task 012: Diagnose and Resolve "Keychain is unavailable" Error on iOS Builds

**ID:** 012
**Status:** To Do
**Priority:** Highest
**Assignee:** Cline & User
**Related Task(s):** 010 (Call `portal.createWallet`), 010.A (In-App Feedback for 010)
**Relevant Documentation:** `eas.json`, `app.config.ts`, Portal SDK docs, `expo-secure-store` docs.
**Touches Areas:** Potentially `eas.json`, `app.config.ts` (for entitlements), `App.tsx` (for minimal SecureStore test).

---

## Description

Attempts to call `portal.createWallet()` are failing with a "[PortalMpc] Keychain is unavailable" error, observed in TestFlight builds on a physical device (and previously on simulator). This indicates an issue with the app's ability to access secure storage on iOS, likely related to `expo-secure-store` or specific Portal SDK requirements. This task is to investigate the root cause and implement a solution.

## Objective

1.  Identify why keychain access is failing in iOS builds.
2.  Implement necessary configuration changes (e.g., entitlements in `app.config.ts`, `eas.json` settings) to enable proper keychain access.
3.  Ensure that `portal.createWallet()` can be called without the "Keychain is unavailable" error in a TestFlight build, verified by the in-app feedback from Task 010.A.

## Detailed Sub-Tasks (Investigation & Fix Steps):

1.  **Review `eas.json` for iOS Build Profile Settings:**
    *   [ ] User to provide `eas.json` content.
    *   [ ] Cline to analyze the `ios` section of the relevant build profile (e.g., `production`) for settings related to entitlements, capabilities, code signing, or build environment that might impact keychain access.

2.  **Review `app.config.ts` for iOS Entitlements:**
    *   [ ] Check the `expo.ios.entitlements` field in `app.config.ts`.
    *   [ ] Research if `expo-secure-store` or the Portal SDK require specific entitlements for basic keychain access (e.g., `keychain-access-groups` if a specific group is needed, though usually not for default app-specific storage). If so, define them.

3.  **Consult `expo-secure-store` Documentation:**
    *   [ ] Review `expo-secure-store` official documentation for any known issues, prerequisites, or specific configurations needed for standalone iOS builds, especially regarding keychain access in different environments (simulator vs. device, Expo Go vs. standalone).

4.  **Consult Portal SDK Documentation:**
    *   [ ] Re-review Portal SDK documentation (including `briefing/portal-sdk-docs/`) for any explicit iOS keychain setup, entitlement requirements, or known issues related to secure storage.

5.  **(If no obvious config issue found from steps 1-4) Implement Minimal `SecureStore` Test:**
    *   **Objective:** Isolate whether `expo-secure-store` itself is failing or if the issue is specific to Portal SDK's usage.
    *   [ ] Create a temporary Git branch for this test.
    *   [ ] In `App.tsx`, within `InitialWalletSetupPlaceholder`'s `handleCreateWallet` function (or a new temporary test button):
        *   Before the `portal.createWallet` call, add code to test basic `expo-secure-store` functionality:
            ```typescript
            try {
              await SecureStore.setItemAsync('testSecureKey', 'testSecureValue');
              const value = await SecureStore.getItemAsync('testSecureKey');
              console.log('Task 012: SecureStore Test SUCCESS - Value:', value);
              // Update in-app feedback from Task 010.A to show this success
              // setCreationStatusMessage(prev => prev + '\\nSecureStore Test SUCCESS: Value: ' + value);
            } catch (secureStoreError) {
              console.error('Task 012: SecureStore Test ERROR:', secureStoreError);
              // Update in-app feedback from Task 010.A to show this error
              // setCreationStatusMessage(prev => prev + '\\nSecureStore Test ERROR: ' + secureStoreError.message);
              // Potentially return here if SecureStore fails, as Portal SDK will also likely fail
            }
            ```
        *   (Ensure `SecureStore` is imported from `expo-secure-store`).
    *   [ ] User to build this version via EAS (`production` profile) and test on TestFlight.
    *   [ ] Observe the in-app feedback and console (if accessible) for the "SecureStore Test SUCCESS" or "SecureStore Test ERROR" messages.
    *   [ ] Revert these temporary `SecureStore` test code changes from `App.tsx` after diagnosis.

6.  **Implement Fixes:** Based on findings from steps 1-5:
    *   [ ] Modify `app.config.ts` to add/correct entitlements if needed.
    *   [ ] Modify `eas.json` if build profile adjustments are necessary.
    *   [ ] Other changes as identified (e.g., SDK initialization parameters if relevant).

7.  **Verification Build & Test:**
    *   [ ] User to commit applied fixes.
    *   [ ] User to run `eas build -p ios --profile production`.
    *   [ ] User to install via TestFlight.
    *   [ ] Test the "Create Wallet" button using the in-app feedback from Task 010.A.
    *   [ ] Verify the "Keychain is unavailable" error is gone and `portal.createWallet()` either succeeds or reports a different, subsequent error.

## Acceptance Criteria:

*   [ ] The root cause of the "[PortalMpc] Keychain is unavailable" error on iOS builds is identified and documented.
*   [ ] Necessary configuration changes are implemented and committed.
*   [ ] Tapping the "Create Wallet" button in a TestFlight build (version 0.0.3 or newer) no longer results in the "Keychain is unavailable" error. The `portal.createWallet()` call proceeds, and its outcome (success or a different error) is visible via the in-app feedback (from Task 010.A).

---
## Post-Completion Documentation Sub-Tasks:
*   [ ] Update `briefing/COMPLETED_SETUP_LOG.md` with a summary of this task's completion, detailing the fix for the keychain issue.
*   [ ] Document any relevant findings or configurations in `briefing/TESTS.md` or `README.md` as appropriate.

## Versioning:
*   **Version Bump on Completion:** No (Considered a bug fix / environment configuration for existing functionality)
*   **Proposed New Version:** N/A
