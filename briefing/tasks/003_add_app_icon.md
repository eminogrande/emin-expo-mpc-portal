# Task 003: Add Application Icon

**ID:** 003
**Status:** Done (iOS), Android Deferred
**Priority:** Medium
**Assignee:** (To be assigned)
**Related Section in PROJECT_DESCRIPTION_AND_PLAN.md:** General App Polish/Branding

---

## Description

The application currently uses placeholder icons. This task is to add a custom application icon that will be used for iOS and Android builds.

**Note on Initial Attempt:** An initial attempt to configure the app icon was unsuccessful. This was likely due to underlying project configuration issues identified by `npx expo doctor` (see Task 005: Fix Expo Doctor Errors). Specifically, the presence of native `ios/` and `android/` directories can conflict with icon configuration in `app.config.ts` when using EAS Build. Resolving Task 005 is a prerequisite for the successful completion of this task.

## Objective

1.  Define the specifications for the required app icon image.
2.  Integrate the provided app icon into the Expo project.
3.  Ensure the new icon is correctly displayed on devices/simulators after a build.

## Image Specifications Required:

*   **Primary Icon (`icon`):**
    *   **Format:** PNG (ideally with transparency if the icon shape is not a full square, though it will likely be placed on a solid background by the OS unless adaptive icons are fully configured).
    *   **Size:** A single high-resolution square image, recommended **1024x1024 pixels**. Expo will use this to generate all necessary smaller sizes for different platforms and device resolutions.
    *   **File Path:** To be placed in the `./assets/` directory (e.g., `./assets/app-icon.png`).

*   **Android Adaptive Icon (Optional but Recommended):**
    *   Android Oreo and later versions use adaptive icons, which can display a variety of shapes across different device models. This typically consists of a foreground layer and a background layer.
    *   **Foreground Layer (`adaptiveIcon.foregroundImage`):** A PNG image (e.g., 1024x1024 pixels, with the central icon motif occupying about the inner 2/3 to allow for masking). This is the part of your icon that will be visible.
    *   **Background Color (`adaptiveIcon.backgroundColor`):** A hex color string (e.g., "#FFFFFF") for the background layer. Alternatively, a `adaptiveIcon.backgroundImage` (PNG) can be used, but a solid color is simpler.
    *   **File Path:** Foreground image to be placed in `./assets/` (e.g., `./assets/adaptive-icon-foreground.png`).
    *   **Note:** Android adaptive icon setup will be deferred. Current focus is iOS.

## Detailed Sub-Tasks:

1.  **User Provides Icon Asset(s):**
    *   [x] User provided primary icon image (`assets/icon.png`).
    *   [x] User provided splash screen image (`assets/splash-icon.png`).
    *   [ ] (DEFERRED) User to provide the foreground image for the Android adaptive icon (1024x1024 PNG) to be placed at `./assets/adaptive-icon-foreground.png` (or similar) and specify a background color.

2.  **Integrate Icon into Project:**
    *   [x] Primary icon image (`./assets/icon.png`) is present in the `./assets/` directory.
    *   [x] Splash screen image (`./assets/splash-icon.png`) is present in the `./assets/` directory.
    *   [x] Open `app.config.ts`.
    *   [x] The `expo.icon` property correctly points to `'./assets/icon.png'`.
    *   [x] The `expo.splash.image` property correctly points to `'./assets/splash-icon.png'`.
    *   [ ] (DEFERRED) Add/update the `expo.android.adaptiveIcon` object.
    *   [x] Ensure the `expo.ios.icon` is not separately defined if the main `expo.icon` is intended for both, or update it specifically if needed. (Current `expo.icon` suffices for iOS).

## Testing Steps & Acceptance Criteria:

1.  **Build and Run the Application:**
    *   [x] After updating `app.config.ts` and adding the image files, ran `npx expo prebuild --platform ios --clean`.
    *   [x] User committed changes and ran EAS Build.
    *   [x] User ran `npx expo run:ios` locally.
    *   [ ] (DEFERRED) Run the app on an Android emulator/device.
2.  **Verify Icon Display:**
    *   [x] **iOS:** User confirmed the new app icon and splash icon are displayed correctly on the home screen and in App Store Connect listing.
    *   [ ] (DEFERRED) **Android:** Confirm the new app icon displays correctly.
    *   [x] The icon is clear and not pixelated on various device resolutions.

## Acceptance Criteria:

*   [x] The `app.config.ts` is updated to reference the new icon and splash image files (`./assets/icon.png`, `./assets/splash-icon.png`).
*   [x] The new app icon and splash icon are correctly displayed on iOS.
*   [ ] (DEFERRED) Android adaptive icons display correctly.

---
## Post-Completion Documentation Sub-Tasks:
*   [ ] Update `briefing/COMPLETED_SETUP_LOG.md` with a summary of this task's completion, including the paths to the new icon files and verification of their display.
*   [ ] Document this task's test(s) (visual verification on devices/simulators) and their workings in `briefing/TESTS.md`.
*   [ ] Write automated tests (e.g., Jest) for any new/modified logic/components and store in `__tests__/`. (Marked N/A for this asset update task unless specific logic is involved).
*   [ ] If version bump is 'Yes', update version in package.json and app.config.ts to the new version and mark this sub-task complete.

## Versioning:
*   **Version Bump on Completion:** Yes (Likely PATCH, as it's a visual asset update)
*   **Proposed New Version:** (To be determined based on current version, e.g., if current is 0.0.2, this would be 0.0.3)
