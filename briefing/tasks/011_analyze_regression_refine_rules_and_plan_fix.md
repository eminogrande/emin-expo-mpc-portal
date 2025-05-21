# Task 011: Analyze Regression (Task 009/010), Refine Rules, and Plan Fix

**ID:** 011
**Status:** Done
**Priority:** Highest
**Assignee:** Cline & User
**Related Task(s):** 009 (Add "Create Wallet" Button), 010 (Call `portal.createWallet` SDK)
**Relevant Documentation:** `briefing/RULES.md`
**Touches Areas:** `briefing/RULES.md`, `briefing/tasks/010_call_create_wallet_sdk.md` (for re-definition)

---

## Description

A regression occurred where the "Create Wallet" button UI, implemented in Task 009, was inadvertently removed or broken during the attempted implementation of Task 010 (calling the `portal.createWallet` SDK). This task is to:
1.  Formally document the root cause of this regression.
2.  Ensure project rules (`briefing/RULES.md`) are updated to prevent similar issues. (This part was completed collaboratively before this task file's creation).
3.  Refine the definition of Task 010 to be more robust against such regressions.
4.  Outline a clear and precise plan to correctly re-implement Task 010, ensuring Task 009's UI is preserved.

## Objective

1.  Ensure `briefing/RULES.md` reflects the latest process improvements regarding task granularity, AI diligence, non-regression clauses, and diff precision.
2.  Create an updated, highly precise definition for Task 010 that includes safeguards against UI regression.
3.  Establish a clear plan for the safe re-implementation of the `portal.createWallet` SDK call.

## Detailed Sub-Tasks:

1.  **Confirm `briefing/RULES.md` Updates:**
    *   [x] Verify that `briefing/RULES.md` has been updated with:
        *   Enhanced Rule #1 (Comprehensive & Self-Contained Task Definition, including AI dependency checks).
        *   Enhanced Rule #6 (Mandatory Testing, including Immediate Post-Change Verification).
        *   Enhanced Rule #11 (Small, Digestible Tasks, including Non-Regression Clause).
        *   New Rule #13 (Cline's Operational Ethos).
        *   New Rule #14 (Precision in Code Modification Tools).
        *   *(This step was completed prior to the creation of this task file based on user feedback and collaboration).*

2.  **Analyze Regression (Brief Summary for Log):**
    *   [x] Documented: The `replace_in_file` diff for the initial Task 010 attempt was likely imprecise, affecting Task 009's button JSX. Lack of immediate UI re-verification compounded this. Learnings incorporated into Rules.

3.  **Refine Definition of Task 010 (`briefing/tasks/010_call_create_wallet_sdk.md`):**
    *   [x] **Explicit Non-Regression:** Added acceptance criterion regarding Task 009 UI preservation.
    *   [x] **Careful `onPress` Modification:** Emphasized in sub-tasks.
    *   [x] **Testing:** Re-iterated manual verification of button presence post-change.
    *   *(This was completed by saving the updated `briefing/tasks/010_call_create_wallet_sdk.md` file).*

4.  **Plan for Re-implementation of Task 010:**
    *   [x] **Prerequisite:** `App.tsx` currently reflects the state *after* the corrected implementation of Task 010's logic (SDK call added to the button from Task 009).
    *   [x] **Execution:** The next step is to test this current `App.tsx` against the refined Task 010's acceptance criteria.

## Acceptance Criteria for Task 011:

*   [x] `briefing/RULES.md` is confirmed to be updated with the new/enhanced rules.
*   [x] The root cause of the Task 009 regression is understood and learnings applied to rules and future task definitions.
*   [x] The task definition for `briefing/tasks/010_call_create_wallet_sdk.md` is updated to be more robust.
*   [x] A clear plan to test the current implementation of Task 010 is established (which is the immediate next step).

---
## Post-Completion Documentation Sub-Tasks:
*   [ ] Update `briefing/COMPLETED_SETUP_LOG.md` with a summary of this task's completion (documenting the process improvements).
*   [ ] No new tests in `briefing/TESTS.md` for this process-improvement task itself.

## Versioning:
*   **Version Bump on Completion:** No
*   **Proposed New Version:** N/A
