# Task 008: Transition to EAS Managed Native Generation & Verify Build

**ID:** 008
**Status:** To Do
**Priority:** High
**Assignee:** Cline
**Related Task(s):** 006 (Build Failures), 007 (Display Name/Version)

---

## Description

After successfully resolving previous build issues by committing the native `ios` folder, this task aims to transition to the preferred "managed" workflow. In this workflow, the `ios` and `android` native directories are gitignored, and EAS Build is responsible for generating them based on `app.config.ts` and project dependencies. This simplifies local development and repository management.

## Objective

1.  Configure the project to use EAS Build's managed native generation (by gitignoring `ios/` and `android/` folders).
2.  Successfully execute an EAS build for iOS using this configuration.
3.  Verify that the resulting build in TestFlight correctly displays the app icon, splash screen, app display name ("Nuri Bitcoin Wallet"), and version (`0.0.3`).

## Detailed Sub-Tasks:

1.  **Update `.gitignore`:**
    *   [ ] Ensure `/ios/` and `/android/` are uncommented (or added if missing) in the `.gitignore` file.
2.  **Clean Local Native Directories (User Action - Recommended for Clean Test):**
    *   [ ] User to (optionally, but recommended) delete local `ios/` and `android/` directories after backing up any uncommitted manual native changes (if any, though ideally none exist).
    *   Command examples: `rm -rf ios`, `rm -rf android`
3.  **Commit `.gitignore` Changes (Adhering to Rule 10):**
    *   [ ] User to commit the updated `.gitignore` file (and the deletion of native folders, if performed). Commit message should reference this task (e.g., "Chore: Configure for EAS managed native generation (Task 008)").
4.  **Initiate EAS Development Build for iOS:**
    *   [ ] Execute `eas build -p ios --profile development`. (A `development` build is chosen for quicker iteration and easier installation on a simulator or registered test device for testing this workflow).
5.  **Monitor EAS Build:**
    *   [ ] Observe the build process on the EAS Build dashboard for any errors, particularly around the "prebuild" or "Install pods" stages.
6.  **Test Build from EAS (Development):**
    *   [ ] If the build succeeds, download and install the `.ipa` (from EAS dashboard or via link) onto an iOS simulator or registered test device.
    *   [ ] **Verify:**
        *   App Icon is correct on the home screen.
        *   Splash Screen is correct when launching.
        *   App Display Name is "Nuri Bitcoin Wallet" on the home screen.
        *   (If possible to check in-app) App version is `0.0.3`.
7.  **(If Development Build Successful) Initiate EAS Production Build for TestFlight:**
    *   [ ] Execute `eas build -p ios --profile production`.
8.  **Verify TestFlight Build (Production):**
    *   [ ] Once the production build is processed by App Store Connect, install it via TestFlight.
    *   [ ] **Verify:**
        *   App Icon is correct on the home screen.
        *   Splash Screen is correct when launching.
        *   App Display Name is "Nuri Bitcoin Wallet" on the home screen.
        *   App Version is `0.0.3` in TestFlight and (if possible) in-app.
        *   Mini-icon in TestFlight list view is correct (acknowledging this might have a cache delay).

## Testing Steps & Acceptance Criteria:

*   EAS build (both development and production profiles) completes successfully without "No Podfile" or similar native generation errors.
*   The installed app (from EAS development build and TestFlight production build) correctly displays:
    *   The "NURI" app icon.
    *   The "NURI" splash screen.
    *   The display name "Nuri Bitcoin Wallet".
    *   The version `0.0.3`.

---
## Post-Completion Documentation Sub-Tasks:
*   [ ] Update `briefing/COMPLETED_SETUP_LOG.md` with a summary of this task's completion, confirming the successful transition to managed native generation.
*   [ ] Update `briefing/tasks/006_diagnose_and_resolve_build_failures.md` to reflect this as the chosen long-term strategy.
*   [ ] Update `README.md` to describe this "managed" build workflow (i.e., native folders are gitignored, EAS handles prebuild, no local `npx expo prebuild` needed by developers routinely).
