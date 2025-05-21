# Task 007: Update App Display Name and Bump Version

**ID:** 007
**Status:** To Do
**Priority:** Medium
**Assignee:** Cline
**Related Task(s):** 003 (Add Application Icon)

---

## Description

The application's display name on the iOS home screen needs to be updated from the project slug to a user-friendly name. Additionally, the application version will be bumped to reflect recent changes and fixes.

## Objective

1.  Change the application's display name on the iOS home screen to "Nuri Bitcoin Wallet".
2.  Bump the application version from `0.0.2` to `0.0.3`.
3.  Ensure these changes are correctly reflected in a new build and on device/simulator.

## Detailed Sub-Tasks:

1.  **Update Configuration Files:**
    *   [ ] Open `app.config.ts`.
    *   [ ] Set `expo.name` to "Nuri Bitcoin Wallet".
    *   [ ] Set `expo.version` to "0.0.3".
    *   [ ] Add/Update `expo.ios.infoPlist.CFBundleDisplayName` to "Nuri Bitcoin Wallet".
    *   [ ] Open `package.json`.
    *   [ ] Set `version` to "0.0.3".

2.  **Regenerate Native Project:**
    *   [ ] Run `npx expo prebuild --platform ios --clean` to apply the display name and version changes to the native iOS project.

3.  **Commit and Build:**
    *   [ ] User to commit all changes:
        *   Updated `app.config.ts`.
        *   Updated `package.json`.
        *   The entire regenerated `ios` directory.
        *   Ensure `.gitignore` has `/ios/` commented out (e.g., `# /ios/`) for this commit.
    *   [ ] User to initiate a new EAS build (e.g., `eas build -p ios --profile production`).

4.  **Verification:**
    *   [ ] Verify the new display name "Nuri Bitcoin Wallet" appears correctly under the app icon on an iOS device/simulator.
    *   [ ] Verify the app version is reported as `0.0.3` in TestFlight and/or on the device.
    *   [ ] Confirm the app icon (from Task 003) remains correct.

## Testing Steps & Acceptance Criteria:

*   The app's display name on iOS is "Nuri Bitcoin Wallet".
*   The app's version is `0.0.3`.
*   The app icon is correctly displayed.
*   The app builds successfully and runs.

---
## Post-Completion Documentation Sub-Tasks:
*   [ ] Update `briefing/COMPLETED_SETUP_LOG.md` with a summary of this task's completion.
*   [ ] Document this task's test(s) (visual verification on device/simulator) and their workings in `briefing/TESTS.md`.

## Versioning:
*   **Version Bump on Completion:** Yes (This task *is* the version bump)
*   **Proposed New Version:** 0.0.3
