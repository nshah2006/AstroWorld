# SESSION PROMPT — copy and paste this to start each Claude Code session

---

Read CLAUDE.md for the project rules and LOOP.md for the task list.

Find the next incomplete task in LOOP.md (the first one marked [ ]).

Complete that task only. Follow every rule in CLAUDE.md while doing it.
Do not touch files outside the scope of this task.
Do not start the next task.

When done:
1. Run: cd artifacts/mobile && pnpm typecheck
2. Fix any type errors before finishing.
3. Mark the task [x] in LOOP.md.
4. Tell me:
   - What files you changed and why
   - What I should see on screen to verify it worked
   - The git commit command to run

Then stop.

---

# DRIFT CHECK PROMPT — paste this if the agent goes off-track mid-session

Stop what you're doing. Read CLAUDE.md again.
Check: are there any hardcoded hex colors in screen files? Any inline style={{}} in app/?
Any imports not from @/components/ui for UI components?
Any changes outside the current task's file scope?
Fix any violations first, then continue.

---

# RECOVERY PROMPT — paste this if something breaks

Do not make new changes.
Run: cd artifacts/mobile && pnpm typecheck
List every error. Then fix them one by one, smallest change possible per fix.
Do not refactor. Do not improve. Just fix the type errors.
When typecheck passes, stop and tell me what you fixed.
