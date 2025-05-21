# Task 007: Update App Display Name and Bump Version

**ID:** 007
**Status:** Done
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
    *   [x] Open `app.config.ts`.
    *   [x] Set `expo.name` to "Nuri Bitcoin Wallet".
    *   [x] Set `expo.version` to "0.0.3".
    *   [x] Add/Update `expo.ios.infoPlist.CFBundleDisplayName` to "Nuri Bitcoin Wallet".
    *   [x] Open `package.json`.
    *   [x] Set `version` to "0.0.3".

2.  **Regenerate Native Project:**
    *   [x] Run `npx expo prebuild --platform ios --clean` to apply the display name and version changes to the native iOS project.

3.  **Commit and Build:**
    *   [x] User committed all changes:
        *   Updated `app.config.ts`.
        *   Updated `package.json`.
        *   The entire regenerated `ios` directory.
        *   Ensured `.gitignore` had `/ios/` commented out for the commit related to this phase.
    *   [x] User initiated a new EAS build (`0.0.3`).

4.  **Verification:**
    *   [x] User verified the new display name "Nuri Bitcoin Wallet" appears correctly under the app icon on an iOS device/simulator (via TestFlight).
    *   [x] User verified the app version is reported as `0.0.3` in TestFlight and/or on the device.
    *   [x] User confirmed the app icon (from Task 003) remains correct.

## Testing Steps & Acceptance Criteria:

*   [x] The app's display name on iOS is "Nuri Bitcoin Wallet".
*   [x] The app's version is `0.0.3`.
*   [x] The app icon is correctly displayed.
*   [x] The app builds successfully and runs.

---
## Post-Completion Documentation Sub-Tasks:
*   [ ] Update `briefing/COMPLETED_SETUP_LOG.md` with a summary of this task's completion.
*   [ ] Document this task's test(s) (visual verification on device/simulator) and their workings in `briefing/TESTS.md`.

## Versioning:
*   **Version Bump on Completion:** Yes (This task *is* the version bump)
*   **Proposed New Version:** 0.0.3
