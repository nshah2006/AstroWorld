# ASTROWORLD — Audit Resolution Checklist

Cross-reference between the 21 UI/UX audit issues and the LOOP.md tasks that fix them.
Use this at the end of the loop to verify every issue is resolved.

| # | Issue | Fixed in task | Verified [ ] |
|---|---|---|---|
| 1 | Starmap is decorative (dots panel, no real data) | Task 8 | [ ] |
| 2 | Category filter doesn't actually filter posts | Task 2 | [ ] |
| 3 | No way to create a post from Community | Task 5 | [ ] |
| 4 | Hardcoded greeting ("Good evening") and dates | Task 1 | [ ] |
| 5 | Bell notification button does nothing | Task 3 | [ ] |
| 6 | Disabled "Save" button has no visual feedback | Task 10 | [ ] |
| 7 | Comment/Share/Bookmark buttons are no-ops | Tasks 3, 6 | [ ] |
| 8 | "Load more sightings" is a no-op | Task 14 | [ ] |
| 9 | Stats (streak, objects) are hardcoded | Task 4 | [ ] |
| 10 | Favorite objects are hardcoded, not derived | Task 4 | [ ] |
| 11 | No post detail screen | Task 6 | [ ] |
| 12 | No other-user profile screen | Task 7 | [ ] |
| 13 | "Add to Watchlist" renders but does nothing | Task 8 | [ ] |
| 14 | "Sign Out" does nothing | Task 13 | [ ] |
| 15 | Settings links (Equipment, Privacy, Help) go nowhere | Task 13 | [ ] |
| 16 | No empty states for Community and Marketplace | Task 14 | [ ] |
| 17 | Marketplace screen missing | Task 12 | [ ] |
| 18 | No onboarding flow | Task 11 | [ ] |
| 19 | No AR mode or Quick Share (Journey 6) | Not in this loop — next loop | [ ] |
| 20 | Planet viewing times all identical | Task 8 | [ ] |
| 21 | Red-light mode toggle not wired visually | Task 9 | [ ] |

---

## End-to-end journey verification

After all tasks complete, walk each PRD journey on a real device and check:

| Journey | What to verify | Pass [ ] |
|---|---|---|
| J1: Plan tonight's session | Home → starmap placeholder → AI planner (mock) → save site to My Sites | [ ] |
| J2: Log an observation | Log tab → fill form → share to community → appears in feed | [ ] |
| J3: Discover community content | Community → filter by category → tap post → post detail → reply → tap author → profile → follow | [ ] |
| J4: Onboarding & setup | Reset via Sign Out → onboarding shows → complete → lands on Home with equipment set | [ ] |
| J5: Browse marketplace | Marketplace → filter → listing detail → seller profile → message seller → save listing | [ ] |
| J6: Celestial event return | Push notification (mock) + AR mode: deferred to next loop | [ ] |

---

## What's intentionally deferred to the next loop

These require backend or hardware features not in scope for the frontend mock phase:

- AR starmap renderer (Astronomy Engine, device orientation, real star positions)
- Push notification delivery and deep-link into AR mode (Journey 6)
- Real location-based regional feed filtering
- Real moon phase computation (Astronomy Engine)
- Supabase / PowerSync backend wiring
- Authentication (Apple Sign In, real sessions)
