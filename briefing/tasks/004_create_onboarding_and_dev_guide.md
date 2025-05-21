# Task 004: Create Comprehensive Onboarding & Development Guide

**ID:** 004
**Status:** To Do
**Priority:** High
**Assignee:** Cline & User
**Related Section in PROJECT_DESCRIPTION_AND_PLAN.md:** This task will create a new major section in this document.

---

## Description

To ensure the project is easily understandable and maintainable, and to facilitate onboarding for new developers, a comprehensive guide covering project setup, development workflow, key configurations, build processes, and deployment needs to be created. This guide will reside primarily within `briefing/PROJECT_DESCRIPTION_AND_PLAN.md`.

The guide should be clear, concise, and provide actionable steps for someone new to the project. It should also clarify the dependencies between key project components and the overall workflow from development to deployment.

## Objective

1.  Create a new detailed section in `briefing/PROJECT_DESCRIPTION_AND_PLAN.md` titled (e.g.) "Project Setup, Development Workflow, & Deployment Guide".
2.  Document the initial project setup steps.
3.  Clearly list all required environment variables and API keys (e.g., Portal keys) and where to obtain/configure them.
4.  Detail how to run the application locally for development on both iOS and Android simulators/emulators, including troubleshooting common issues (like icon caching).
5.  Provide step-by-step instructions for creating production builds using EAS Build (`eas build -p ios --profile production` and Android equivalent).
6.  Explain the process of downloading the `.ipa`/`.aab` and deploying to TestFlight (iOS) or Google Play Console (Android).
7.  Include a simple flowchart (Mermaid in Markdown) illustrating the overall development-to-deployment workflow.
8.  (Optional but Recommended) Add a subsection explaining the project's high-level architecture and the dependencies/interactions between key files/modules (e.g., `App.tsx`, `WalletContext`, `portal.ts`).

## Detailed Sub-Tasks:

1.  **Draft "Project Setup, Development Workflow, & Deployment Guide" Section:**
    *   [ ] Define subsections for:
        *   Prerequisites (Node, Yarn/NPM, Expo CLI, EAS CLI, platform-specific SDKs like Xcode/Android Studio).
        *   Initial Project Setup (Cloning, `npm install`/`yarn install`).
        *   Environment Configuration (Setting up `.env` with `PORTAL_CLIENT_API_KEY`, `PORTAL_CLIENT_ID`).
        *   Running Locally (Commands for `expo start`, `run:ios`, `run:android`, debugging tips).
        *   Building for Distribution with EAS Build (iOS and Android commands, profiles).
        *   Deployment to TestFlight (iOS: downloading IPA, using Transporter).
        *   (Optional) Deployment to Google Play Console (Android).
    *   [ ] Create a Mermaid flowchart for the dev-to-deployment workflow. Example:
        ```mermaid
        graph TD
            A[Clone Repository] --> B[Install Dependencies];
            B --> C[Setup .env with API Keys];
            C --> D{Local Development?};
            D -- Yes --> E[Run with 'npx expo start' or 'run:platform'];
            E --> F[Test on Simulator/Emulator/Device];
            F --> D;
            D -- No --> G[Commit Changes];
            G --> H[Run 'eas build -p [platform] --profile production'];
            H --> I[EAS Cloud Build];
            I --> J[Download .ipa/.aab];
            J --> K{Deploy to TestFlight/Play Console?};
            K -- Yes --> L[Upload via Transporter/Console];
            L --> M[Distribute to Testers];
        ```
    *   [ ] (Optional) Draft the "Project Architecture Overview" subsection, explaining key file interactions.

2.  **Integrate Guide into `briefing/PROJECT_DESCRIPTION_AND_PLAN.md`:**
    *   [ ] Add the newly drafted section to the main project planning document. Ensure formatting is clear and consistent.

3.  **Review and Refine:**
    *   [ ] User and Cline to review the guide for clarity, completeness, and accuracy.

## Testing Steps & Acceptance Criteria:

*   **Verification:**
    *   [ ] The new guide section is present in `briefing/PROJECT_DESCRIPTION_AND_PLAN.md`.
    *   [ ] All specified topics (setup, keys, local dev, EAS build, deployment, flowchart) are covered.
    *   [ ] The information is clear, actionable, and easy for a new developer to follow.
    *   [ ] The Mermaid flowchart correctly represents the workflow.
    *   [ ] (If implemented) The project architecture overview is understandable.

## Acceptance Criteria:

*   [ ] A comprehensive "Project Setup, Development Workflow, & Deployment Guide" section is added to `briefing/PROJECT_DESCRIPTION_AND_PLAN.md`.
*   [ ] The guide accurately reflects the project's current setup and recommended procedures.
*   [ ] The guide is deemed sufficient for onboarding a new developer.

---
## Post-Completion Documentation Sub-Tasks:
*   [ ] Update `briefing/COMPLETED_SETUP_LOG.md` with a summary of this task's completion (i.e., onboarding guide created/updated).
*   [ ] Document this task's test(s) and their workings in `briefing/TESTS.md`. (Test for this task is primarily a review of the documentation's completeness and clarity).
*   [ ] Write automated tests (e.g., Jest) for any new/modified logic/components and store in `__tests__/`. (Marked N/A for this documentation task).
*   [ ] If version bump is 'Yes', update version in package.json and app.config.ts to the new version and mark this sub-task complete.

## Versioning:
*   **Version Bump on Completion:** Yes (PATCH, as it's a significant documentation improvement)
*   **Proposed New Version:** (To be determined based on current version, e.g., if current is 0.0.2, this would be 0.0.3)
