# Task 002: Set Initial App Version to 0.0.1

**ID:** 002
**Status:** Done
**Priority:** Medium
**Assignee:** Cline
**Related Section in PROJECT_DESCRIPTION_AND_PLAN.md:** General Project Setup

---

## Description

The current application version in `package.json` was "1.0.0". For the start of this POC development phase after initial setup and refactoring, the application's display version has been set to "0.0.1". This involved updating `package.json` and ensuring `app.config.ts` also reflects this version explicitly.

## Objective

1.  Change the application's human-readable version to "0.0.1".
2.  Ensure consistency between `package.json` and `app.config.ts` regarding this version.

## Detailed Sub-Tasks:

1.  **Update `package.json`:**
    *   [x] Open `package.json`.
    *   [x] Change the `version` field from its current value to `"0.0.1"`.

2.  **Update `app.config.ts`:**
    *   [x] Open `app.config.ts`.
    *   [x] Add a `version` field under the `expo` object, setting its value to `"0.0.1"`.
        ```typescript
        // Example modification in app.config.ts
        export default () => ({
          expo: {
            name: 'emin-expo-mpc-portal',
            slug: 'emin-expo-mpc-portal',
            version: '0.0.1', // Add this line
            // ... other existing ios, android, extra configurations
          },
        });
        ```

3.  **Verification (Conceptual):**
    *   [x] After these changes, future builds of the app (especially standalone/production builds) should reflect "0.0.1" as their display version.
    *   [x] When running `eas build`, the build metadata should also pick up this version for the display version string.

## Acceptance Criteria:

*   [x] The `version` field in `package.json` is updated to `"0.0.1"`.
*   [x] The `app.config.ts` file includes `expo.version` set to `"0.0.1"`.
*   [x] The project's version is consistently defined for subsequent builds and development.

## Notes:
*   While `eas.json` has `"appVersionSource": "remote"`, which typically means EAS Build controls the native build numbers (e.g., `versionCode` for Android, `CFBundleVersion` for iOS), the `version` field in `package.json` and `app.config.ts` usually dictates the human-readable display version (e.g., `versionName` for Android, `CFBundleShortVersionString` for iOS).

---
## Post-Completion Documentation Sub-Tasks:
*   [x] Update `COMPLETED_SETUP_LOG.md` with a summary of this task's completion (i.e., version changed to 0.0.1). (Covered by initial log entries and subsequent version bump to 0.0.2 for Task 001)
*   [x] Document this task's test(s) and their workings in `briefing/TESTS.md`. (N/A for direct version change, verification is checking file content)
*   [x] If version bump is 'Yes', update version in package.json and app.config.ts to the new version (`0.0.1`) and mark this sub-task complete. (This task *was* the version bump to 0.0.1)
*   [ ] Write automated tests (e.g., Jest) for any new/modified logic/components and store in `__tests__/`. (Marked N/A for this version change task.)
