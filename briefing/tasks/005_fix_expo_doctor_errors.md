# Task 005: Fix Expo Doctor Errors

**ID:** 005
**Status:** To Do
**Priority:** High
**Assignee:** (To be assigned)
**Related Section in PROJECT_DESCRIPTION_AND_PLAN.md:** Project Health & Maintenance

---

## Description

Running `npx expo doctor` has revealed several issues that need to be addressed to ensure project stability, correct build configurations, and adherence to Expo best practices.

## Objective

Resolve all critical errors and warnings reported by `npx expo doctor`.

## Issues Reported by Expo Doctor (and plan to address):

1.  **Static `app.json` vs. Dynamic `app.config.ts`:**
    *   **Error:** "You have an app.json file in your project, but your app.config.ts is not using the values from it."
    *   **Advice:** "Remove the static app.json, or use its values in your dynamic app.config.js."
    *   **Plan:**
        *   [ ] Review `app.json` and `app.config.ts`.
        *   [ ] Ensure all necessary configurations from `app.json` are present or correctly represented in `app.config.ts`.
        *   [ ] Remove `app.json` from the project.

2.  **Incorrectly Installed Dependency Types:**
    *   **Error:** "Check dependencies for packages that should not be installed directly"
    *   **Advice:** "The package "@types/react-native" should not be installed directly in your project, as types are included with the "react-native" package. Remove these packages from your package.json."
    *   **Plan:**
        *   [ ] Remove `@types/react-native` from `devDependencies` or `dependencies` in `package.json`.
        *   [ ] Run `npm install` or `yarn install` to update `package-lock.json` or `yarn.lock`.

3.  **Native Folders with Prebuild Configuration:**
    *   **Error:** "Check for app config fields that may not be synced in a non-CNG project"
    *   **Details:** "This project contains native project folders but also has native configuration properties in app.config.ts, indicating it is configured to use Prebuild. When the android/ios folders are present, EAS Build will not sync the following properties: icon, ios, android."
    *   **Advice:** "Add '/android' and '/ios' to your .gitignore file if you intend to use CNG / Prebuild."
    *   **Plan:**
        *   [ ] Add `/ios/` and `/android/` to the `.gitignore` file. This will allow EAS Build to correctly manage native project generation based on `app.config.ts`, including icons.

4.  **React Native Directory Package Metadata Validation:**
    *   **Error:** "Validate packages against React Native Directory package metadata"
    *   **Details:** "The following issues were found when validating your dependencies against React Native Directory: No metadata available: @portal-hq/core, @portal-hq/passkey-storage, bitcoinjs-lib, react-native-passkeys, react-native-qr-svg"
    *   **Advice:** "Update React Native Directory to include metadata for unknown packages. Alternatively, set expo.reactNativeDirectoryCheck.listUnknownPackages in app.json to false to skip warnings about packages with no metadata, if the warning is not relevant."
    *   **Plan:**
        *   [ ] For now, these are likely specialized packages not yet in the main directory. If they are known to be compatible, we can suppress this warning.
        *   [ ] Add `reactNativeDirectoryCheck: { listUnknownPackages: ["@portal-hq/core", "@portal-hq/passkey-storage", "bitcoinjs-lib", "react-native-passkeys", "react-native-qr-svg"] }` to the `expo` object in `app.config.ts` to acknowledge these packages. (Alternatively, set to `false` to skip all, but listing is more specific). *Correction: The property is `expo.updates.checkAutomatically` or similar, need to verify the exact property for `listUnknownPackages` or if it's a direct `expo` property.*
        *   *Self-correction: The advice mentions `expo.reactNativeDirectoryCheck.listUnknownPackages` in `app.json`. For `app.config.ts`, this would translate to a property within the `expo` object. Let's assume it's `expo.reactNativeDirectoryCheck.listUnknownPackages`. If this specific path is incorrect, will adjust based on Expo documentation.*
        *   [ ] Update `app.config.ts` with the appropriate configuration to acknowledge these packages.

## Testing Steps & Acceptance Criteria:

1.  **Run Expo Doctor:**
    *   [ ] After applying all fixes, run `npx expo doctor`.
2.  **Verify Output:**
    *   [ ] Confirm that `expo doctor` reports " symptômes" or only non-critical warnings related to the acknowledged packages.
    *   [ ] Ensure no new errors have been introduced.

## Acceptance Criteria:

*   [ ] `app.json` is removed, and its configurations are managed by `app.config.ts`.
*   [ ] `@types/react-native` is removed from `package.json`.
*   [ ] `/ios/` and `/android/` are added to `.gitignore`.
*   [ ] Warnings for unlisted React Native Directory packages are appropriately handled in `app.config.ts`.
*   [ ] `npx expo doctor` runs without critical errors.

---
## Post-Completion Documentation Sub-Tasks:
*   [ ] Update `briefing/COMPLETED_SETUP_LOG.md` with a summary of this task's completion.
*   [ ] Document this task's test(s) (running `expo doctor`) and their workings in `briefing/TESTS.md`.

## Versioning:
*   **Version Bump on Completion:** No (Internal fixes, not a feature or bugfix release directly)
