# ASTROWORLD — Agent Improvement Loop

This file drives the iterative improvement loop for Claude Code.
Work through tasks IN ORDER. Complete one task fully before starting the next.
After each task: run quality gates, summarize what changed, describe what to verify on screen.

---

## How to run this loop

Start a Claude Code session and say:
> "Read CLAUDE.md and LOOP.md. Then work through the next incomplete task in LOOP.md.
>  Mark it [x] when done. Run quality gates. Stop and summarize."

Start a fresh session for each task to keep context lean.
Commit to git after each completed task: git add -A && git commit -m "task N: <description>"
Do not proceed to the next task until the current one is verified on screen.

---

## Pre-loop: project setup (do once before starting tasks)

Before running any tasks, set up the local dev environment:

1. Clone or download the Replit project export.
2. Run: pnpm install (from monorepo root)
3. Run: cd artifacts/mobile && npx expo start
4. Open on phone via Expo Go (scan QR) or iOS Simulator (press i).
5. Confirm all 5 tabs load and the Aurora theme is visible.
6. Run: pnpm typecheck — fix any pre-existing errors before starting tasks.

---

## TASK 1 — Fix hardcoded dates and greeting [ ]

Files: app/(tabs)/index.tsx, app/(tabs)/starmap.tsx

Changes:
- Home header: replace hardcoded "Good evening" with a time-aware greeting computed
  from new Date().getHours(): Good morning (5-11), Good afternoon (12-17),
  Good evening (18-21), Good night (22-4).
- Starmap subtitle: replace hardcoded "Jun 3, 2026" with the real current date,
  formatted the same way the Log tab already formats it (use the same utility).
  Extract the date formatter to lib/utils.ts so both screens share it.

Verify on screen:
- Home header shows the correct greeting for the current time of day.
- Starmap subtitle shows today's actual date.
- pnpm typecheck passes.

---

## TASK 2 — Wire category filter on Community [ ]

Files: app/(tabs)/community.tsx, store/index.ts

Changes:
- Add a category field to the mock post objects in the Zustand store.
  Categories must match the existing filter pills: Planets / Galaxies / Nebulae / Stars / Events.
  Assign each of the 4 mock posts a category (e.g. Pleiades post → Stars, Mars post → Planets).
- In community.tsx, filter the rendered posts list by activeCategory.
  When "All" is selected, show everything. Otherwise show only posts matching the category.
- The filter pills already update activeCategory state — just make the list respect it.

Verify on screen:
- Tap "Planets" → only the Mars post shows.
- Tap "Stars" → only the Pleiades post shows.
- Tap "All" → all posts show.
- pnpm typecheck passes.

---

## TASK 3 — Fix dead buttons (bell, search, share, bookmark) [ ]

Files: app/(tabs)/index.tsx, app/(tabs)/community.tsx

Changes:
- Bell button (Home): on tap, show a bottom sheet or slide-up modal listing the 3 upcoming
  events already rendered on the Home screen (Saturn at Opposition, Perseid Meteor Shower,
  Jupiter–Venus Conjunction). Title: "Upcoming Events". Close button. No new data needed.
- Search icon (Community header): on tap, show/hide an animated search TextInput below the
  header that filters the posts list by text match on the post body. Dismiss on empty + blur.
- Share button (post cards): use React Native's built-in Share.share() API with the post
  body as the message. No external dependency needed.
- Bookmark button (post cards): toggle a bookmarked state in the Zustand store (add a
  bookmarkedPosts: Set<string> to the store). Animate the icon to teal fill when bookmarked,
  outline when not. Persist within session.

Verify on screen:
- Bell tap opens event sheet.
- Search input appears and filters posts live.
- Share tap opens native share sheet.
- Bookmark tap toggles teal fill and persists when scrolling away and back.
- pnpm typecheck passes.

---

## TASK 4 — Derive live stats from Zustand store [ ]

Files: app/(tabs)/index.tsx, app/(tabs)/profile.tsx, store/index.ts

Changes:
- "Objects" stat (Home + Profile): derive from store by counting unique celestialObject
  values across all observations. Replace hardcoded 47.
- "Most observed" (Profile): count occurrences of each celestialObject, return the one
  with the highest count. Replace observations[0] read.
- "Favorite Objects" chips (Profile): derive top 6 most-logged celestialObject values
  from store. Replace hardcoded strings. If fewer than 6 exist, show however many do.
- "Day Streak" (Home + Profile): replace hardcoded 12 with a computed streak.
  Streak = number of consecutive calendar days (ending today) that have at least one
  observation. If today has no observation, streak = 0.
- "Moon lit" (Home): leave hardcoded for now (needs ephemeris data — backend phase).
  Add a // TODO: replace with Astronomy Engine computation comment.

Verify on screen:
- Add a new observation in the Log tab. Switch to Home and Profile — Objects count
  increments, Favorite Objects may update, streak updates.
- pnpm typecheck passes.

---

## TASK 5 — Add compose post flow to Community [ ]

Files: app/(tabs)/community.tsx, store/index.ts

Changes:
- Add a floating action button (bottom-right of Community screen, 56×56 teal circle,
  feather "edit-2" icon) that opens a compose bottom sheet.
- Compose sheet: TextInput for post body (max 280 chars, character counter),
  object tag input, post button. On submit: add a new post to the Zustand posts array
  with the current user's data ("AstroExplorer", "@astroexplorer"), close sheet, scroll
  to top of feed so the new post is visible.
- New posts from the Log tab's "Share to community" toggle must also appear in this feed.
  Wire: when addObservation is called with shareToFeed: true, also push a post to the
  posts array with the observation title and celestialObject as the tag.
- Add shareToFeed: boolean to the observation type in the store.

Verify on screen:
- Tap the compose FAB → sheet opens.
- Write a post → submit → appears at top of feed immediately.
- Log an observation with "Share to community" on → appears in Community feed.
- pnpm typecheck passes.

---

## TASK 6 — Build Post Detail screen [ ]

Files: app/post/[id].tsx (new), app/(tabs)/community.tsx, store/index.ts

Changes:
- Create a new route app/post/[id].tsx.
- Post detail screen shows: full post (avatar, name, handle, date, tag, body),
  a "Replies" section with 3 mock replies per post (add to store),
  and a reply input at the bottom (writes new reply to store for that post's id).
- Wire post card taps in community.tsx to navigate to this route:
  router.push('/post/' + post.id)
- Reply input: TextInput, send button (teal), keyboard-aware scroll.
- Back navigation: use Expo Router's built-in back (stack header or manual back button).

Verify on screen:
- Tap any post in Community → navigates to Post Detail.
- Mock replies visible.
- Type a reply → submit → appears in the thread.
- Back navigates to Community.
- pnpm typecheck passes.

---

## TASK 7 — Build other-user Profile screen [ ]

Files: app/profile/[id].tsx (new), app/(tabs)/community.tsx, store/index.ts

Changes:
- Create app/profile/[id].tsx showing another user's profile.
- Reuse the same layout as the Profile tab but replace Settings section with a
  Follow/Unfollow button (teal filled when not following, ghost when following).
  Follow state stored in Zustand: followedUsers: Set<string>.
- Show mock data for the 4 community post authors (Luna Vasquez, Orion Blake,
  Stella Reyes, Cosmo Park) — add their profiles to the store with name, handle,
  stats, equipment list, and 2-3 mock observations each.
- Wire username taps in community.tsx (avatar + name row) to router.push('/profile/' + userId).

Verify on screen:
- Tap any username in Community → opens their profile.
- Follow button toggles and persists within session.
- Back navigates to Community.
- pnpm typecheck passes.

---

## TASK 8 — Fix Starmap placeholder + planet data [ ]

Files: app/(tabs)/starmap.tsx

Changes:
- Replace the decorative dots panel with a clearly labeled placeholder card.
  Content: a teal telescope icon (feather "aperture"), heading "Interactive Starmap",
  subtext "Real-time sky rendering coming soon — powered by Astronomy Engine",
  and a teal "Add to Watchlist" ghost button that saves the 3 currently-selected
  constellation objects to a watchlist in Zustand (add watchlist: string[] to store).
  This is honest about current state and still interactive.
- Remove "Tap a constellation to explore" hint from inside the placeholder (it implied
  interactivity the dots never had).
- Give each planet its own mock best-viewing-time string in the data:
  Venus: "19:30 – 22:00", Jupiter: "21:00 – 02:30", Saturn: "22:00 – 03:45",
  Mars: "23:30 – 04:00". Replace the single hardcoded string.
- Wire "Add to Watchlist" on constellation detail rows: add/remove the constellation
  name from the watchlist array in Zustand. Button label toggles
  "Add to Watchlist" / "Remove from Watchlist" based on store state.

Verify on screen:
- Starmap tab shows the placeholder card (no dot panel).
- Each planet card shows its own viewing time on tap.
- Add a constellation to watchlist → button label changes.
- pnpm typecheck passes.

---

## TASK 9 — Wire red-light mode [ ]

Files: app/(tabs)/profile.tsx, store/index.ts, constants/colors.ts,
       hooks/useColors.ts, components/ui/ (all primitives)

Changes:
- Add redLightMode: boolean + toggleRedLightMode() to the Zustand store.
  Wire the existing Notifications toggle in Profile Settings to use the store
  (or add a dedicated "Red-Light Mode" toggle row — feather "moon" icon, lavender accent).
- Add a red-light color palette to constants/colors.ts:
  bg: #0a0000, surface: #1a0505, text: #ff4444, muted: #992222, accent: #cc2222.
  All blues, teals, greens, and whites are replaced with reds.
- Update useColors() to return the red palette when store.redLightMode is true.
- Update NativeWind token usage: create a useTheme() hook in hooks/ that returns
  the correct className prefix based on mode (aurora-* vs red-*).
  Apply it in Screen, Card, ThemedText, Button, Input, Tag, Avatar.
- All screens must respond to the mode change instantly without reload.

Verify on screen:
- Toggle red-light mode in Profile → entire app switches to red-only palette.
- Toggle off → Aurora theme returns.
- No blues, whites, or greens visible in red mode.
- pnpm typecheck passes.

---

## TASK 10 — Fix Log tab UX gaps [ ]

Files: app/(tabs)/log.tsx, store/index.ts, components/ui/Button.tsx

Changes:
- Disabled button visual: update Button.tsx to apply opacity-40 and a
  not-allowed cursor (web) when disabled prop is true. Test with the Save button.
- Add a date picker row to the log form: a tappable row showing the selected date
  (defaults to today). On tap, show a date picker (use @react-native-community/datetimepicker
  — check if already installed; if not, use a simple modal with 3 number inputs for
  month/day/year as a fallback). Store the selected date on the observation.
- Add a "Seeing quality" selector row (1–5 scale, horizontal pill selector like object type).
  Label: "Seeing (1=poor, 5=excellent)". Store as seeingQuality: number on observation.
- Remove unused imports: useRef, TextInput (flagged in audit).

Verify on screen:
- Save button is visually dimmed when title or object is empty.
- Date row shows today, tap changes it, saved observation shows the chosen date.
- Seeing quality pills select correctly.
- pnpm typecheck passes.

---

## TASK 11 — Add onboarding flow [ ]

Files: app/onboarding/ (new folder), app/_layout.tsx, store/index.ts

Changes:
- Add hasOnboarded: boolean (default false) + completeOnboarding() to Zustand store.
- Create app/onboarding/_layout.tsx (stack navigator, no header, black bg).
- Create 3 screens:
  app/onboarding/index.tsx — value framing screen 1: "Plan your night" (teal starmap icon,
    headline, subtitle, progress dots 1/4, Next button)
  app/onboarding/page2.tsx — screen 2: "Log what you see" (lavender log icon, headline, subtitle,
    progress dots 2/4, Next)
  app/onboarding/page3.tsx — screen 3: "Connect with astronomers" (blue community icon,
    headline, subtitle, progress dots 3/4, Next)
  app/onboarding/setup.tsx — screen 4: location permission priming ("So we can show what's
    overhead tonight" explanation) + mock "Sign up with Apple" button + "Add your first
    telescope" flow (searchable list of 10 telescope models, select one, saves to store).
    "Get started" button calls completeOnboarding() and routes to (tabs).
- In app/_layout.tsx: check store.hasOnboarded on mount.
  If false, redirect to /onboarding. If true, show (tabs) as normal.

Verify on screen:
- Fresh install (or reset store via Sign Out): onboarding flow shows.
- Progress through all 4 screens.
- Select a telescope → "Get started" → lands on Home tab.
- Reopening app skips onboarding.
- pnpm typecheck passes.

---

## TASK 12 — Add Marketplace tab [ ]

Files: app/(tabs)/marketplace.tsx (new), app/(tabs)/_layout.tsx,
       mocks/listings.ts (new), store/index.ts, app/listing/[id].tsx (new)

Changes:
- Add Marketplace as the 4th tab (between Community and Profile). Update tab layout.
  Icon: feather "shopping-bag". 5 tabs total order: Home, Starmap, Log, Community,
  Marketplace, Profile — wait, PRD has 5 tabs. Check: current 5 are Home/Starmap/Log/
  Community/Profile. Marketplace is a 6th. Add it as a tab OR nest it inside Community
  as a top segment (tabs within the Community screen: "Feed" | "Marketplace").
  Use nested segments to avoid a 6th tab breaking the bottom bar layout.
- Create mocks/listings.ts with 6 mock listings: id, title, category, price, condition
  (Excellent/Good/Fair), seller (name, handle, sessionCount, rating), description,
  distance, imageColor (for placeholder).
- Marketplace screen: filter bar (category pills: All/Telescopes/Eyepieces/Mounts/
  Cameras/Accessories), listing grid (2 columns, Card with title, price, condition tag,
  distance, seller name).
- Tapping a listing navigates to app/listing/[id].tsx: full listing detail (title,
  price, condition, description, seller card with session count + rating + Follow button),
  "Message seller" button (opens a simple chat bottom sheet with mock reply),
  "Save listing" bookmark toggle (Zustand).

Verify on screen:
- Marketplace reachable from navigation.
- Filter pills filter the listing grid correctly.
- Tap listing → detail screen.
- Message seller → chat sheet opens.
- Save listing → bookmark toggles.
- pnpm typecheck passes.

---

## TASK 13 — Fix Profile settings navigation [ ]

Files: app/equipment-setup.tsx (new), app/privacy.tsx (new),
       app/help.tsx (new), app/(tabs)/profile.tsx

Changes:
- Equipment Setup: creates app/equipment-setup.tsx. Shows the user's current equipment
  list (from store) with a delete button per item, and an "Add equipment" button that
  opens the same telescope search from onboarding. Updates store.
  Wire "Equipment Setup" row in Profile to router.push('/equipment-setup').
- Privacy: creates app/privacy.tsx. A static screen with placeholder privacy policy text
  organized into sections (Data we collect, How we use it, Your rights).
  Wire "Privacy" row in Profile to router.push('/privacy').
- Help: creates app/help.tsx. Static screen with 5 FAQ items (expandable accordion),
  and a "Contact us" button that calls Linking.openURL('mailto:hello@astroworld.app').
  Wire "Help & Feedback" row in Profile to router.push('/help').
- Sign Out button: show Alert.alert("Sign out?", "This will reset your session.",
  [Cancel, {Sign out, destructive}]). On confirm: reset Zustand store to initial state
  (clear observations, posts back to mock defaults) and route to /onboarding.

Verify on screen:
- Each settings row navigates to its screen.
- Back works on all three.
- Sign Out shows alert and resets + reroutes to onboarding.
- pnpm typecheck passes.

---

## TASK 14 — Polish pass (run last, after all other tasks complete) [ ]

Files: all screens and components

Changes:
- Empty states: add to Community feed (when posts array is empty after filtering:
  feather "wind" icon + "No sightings found" + "Try a different filter" in muted text)
  and Marketplace (feather "package" icon + "No listings yet").
- "Load more sightings" button in Community: replace with an "All caught up" card
  (feather "check-circle" teal icon + "You've seen all recent sightings" muted text).
  Appears when the rendered list length equals the total posts array length.
- Planet "best time" modal: when a planet card is tapped, show a small tooltip/popover
  above the card (absolutely positioned, aurora-surface bg, teal border) instead of
  the inline expand, so the grid layout doesn't reflow on selection.
- Staggered entrance animations audit: verify all 5 tabs have consistent FadeIn
  stagger timing (60ms between items). Add stagger to any screen that's missing it
  (currently: Starmap planet grid has no stagger).
- Haptic audit: every tap that changes state should fire a haptic. Check all toggles,
  pills, bookmarks, likes, and log form chips. Add any missing Haptics.impactAsync calls.
- Accessibility: add accessibilityLabel to every icon-only button (bell, search, compose FAB,
  Like, Share, Bookmark). Add accessibilityRole="button" to all tappable non-Button elements.

Verify on screen:
- Community with all filters shows empty state.
- "Load more" replaced by "all caught up" card.
- Haptics fire correctly on iOS physical device (not simulator).
- pnpm typecheck passes.

---

## Loop complete

When all 14 tasks are marked [x] and committed:
1. Run pnpm typecheck one final time from artifacts/mobile.
2. Open the app on a physical phone and walk through all 6 PRD user journeys end to end.
3. Cross-reference the 21-issue audit — verify each issue is resolved.
4. The frontend is ready for: Figma design swap-in, backend wiring (Supabase/PowerSync),
   and the starmap renderer (dedicated separate loop).
