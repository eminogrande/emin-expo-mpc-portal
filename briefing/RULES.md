# Project Development Rules

This document outlines the agreed-upon rules for the development of this project.

**1. Task Definition Before Action:**
    All development work must be based on a task that is first defined as an issue-style document in the `/tasks` directory. This task document must include a clear description and acceptance criteria before any implementation begins.

**2. Rule Creation:**
    The AI assistant will not create or suggest new rules beyond those explicitly provided by the user. All project rules must originate from the user.

**3. Documentation Review and Assumption Avoidance:**
    Cline (the AI assistant) must not assume how functionalities work. Always check all available project documentation thoroughly before making implementation suggestions or modifications. This includes, but is not limited to:
    *   The `PROJECT_DESCRIPTION_AND_PLAN.md` document.
    *   All files within the local `briefing/portal-sdk-docs/` folder.
    *   Existing code and configurations.
    If documentation is unclear, seems contradictory, or is missing for a specific feature, this should be highlighted for discussion.
    *Clarification on Web Access: Cline does not have live, general web browsing capabilities to check external websites or URLs for documentation beyond the information provided or its training data.*

**4. Version Bumping Policy:**
    *   The application's version number (following Semantic Versioning, e.g., `MAJOR.MINOR.PATCH`) will be bumped after the completion and verification of each task that results in a meaningful change to the codebase (e.g., new feature, significant refactoring, bug fix).
    *   Cline (the AI assistant) will assist in suggesting the type of version bump (PATCH, MINOR) for user approval.
    *   Each task definition in the `/tasks` directory must include:
        *   A field: `**Version Bump on Completion:** Yes/No`
        *   If Yes, a field: `**Proposed New Version:** X.Y.Z`
        *   A sub-task: `[ ] If version bump is 'Yes', update version in package.json and app.config.ts to the new version and mark this sub-task complete.`

**5. Comprehensive Task Documentation in `COMPLETED_SETUP_LOG.md`:**
    *   Upon completion of any task defined in the `/tasks` directory, a summary of the work done, key changes, outcomes, and any important decisions made must be documented in `COMPLETED_SETUP_LOG.md`.
    *   Each task definition in the `/tasks` directory must include as a final sub-task: `[ ] Update COMPLETED_SETUP_LOG.md with a summary of this task's completion, including changes made and verification results.`

**6. Mandatory Testing, Automated Tests, & `TESTS.md` Documentation:**
    *   Every task that involves code changes or introduces new functionality must include specific testing steps, encompassing both manual verification and automated tests where applicable.
    *   These tests must pass for the task to be considered complete.
    *   Each task definition in the `briefing/tasks/` directory must clearly outline its "Testing Steps & Acceptance Criteria."
    *   **Automated Tests:**
        *   For tasks involving new or modified application logic or UI components, corresponding automated tests (e.g., unit, integration using a framework like Jest) must be written.
        *   Automated test files should reside in a dedicated `__tests__/` directory at the project root, with clear naming conventions (e.g., `FileName.test.tsx`).
        *   Automated test code must be well-commented to explain the purpose of each test suite and individual test case.
        *   The task definition in `briefing/tasks/*.md` must include a specific sub-task for writing these automated tests.
    *   **`briefing/TESTS.md` Documentation:**
        *   A separate document, `briefing/TESTS.md`, will be maintained to provide a high-level inventory and simple language explanation of all key tests defined for the project (both manual verification procedures and automated tests). This includes:
            *   The purpose of each test (what it verifies).
            *   A simple description of how the test works.
        *   Each task definition in `briefing/tasks/*.md` that introduces or modifies tests (manual or automated) must include a sub-task: `[ ] Document this task's test(s) and their workings in briefing/TESTS.md.`

---

**7. Extreme Caution with Build-Critical Configurations:**
    *   Changes to files or settings that directly impact the build process (e.g., `.gitignore` in relation to native folders, `app.config.ts` for native project generation, `eas.json`, `package.json` dependencies affecting native modules) must be approached with extreme caution.
    *   **Understand Implications:** Before making such changes, the potential impact on local development, EAS builds, and native project generation (prebuild) must be thoroughly understood.
    *   **Immediate Testing:** After any such change, an immediate test build (e.g., local `npx expo run:ios/android` or a targeted EAS development build) must be performed to verify the system remains operational and the change had the intended effect without unintended side effects.
    *   **Iterative Approach:** Prefer small, incremental changes with testing after each step over large, bundled changes to build configurations.
    *   *(Learned from Task 003/005 - `ios` directory and `.gitignore` interaction leading to "No Podfile" build errors).*
