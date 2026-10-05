# ASTROWORLD: Claude Code Rules

Mobile-first social platform for amateur astronomers.
Current phase: frontend iteration on mock data. No backend yet.

## Project context

- Stack is scaffolded and working.
- Expo SDK 54, TypeScript (strict), Expo Router, NativeWind v4, Zustand v5, Reanimated v4, React Query (wired, not yet used by screens)
- pnpm workspace monorepo. App lives in artifacts/mobile/
- Path alias: @/ = artifacts/mobile/
- UI designs are produced in Figma Make. See "Figma Make workflow" below.

## Stack constraints (fixed, do not substitute or add libraries without asking)

- Styling: NativeWind only. No StyleSheet.create in screen files. No inline style={{}} in screens.
- Routing: Expo Router file-based only. No react-navigation.
- State: Zustand for local/mock state. React Query reserved for backend phase.
- Animation: Reanimated only. No Animated API from react-native.
- Icons: @expo/vector-icons (Feather set) only.
- Do NOT add new dependencies without asking first.

## Architecture rules (non-negotiable)

- Screens in app/ own: data access, state, navigation, composition. Nothing else.
- Presentational logic lives in components/ui/ only. Screens never contain raw styling.
- All UI imports come from the barrel: import { X } from '@/components/ui'
- Keep exported names and prop shapes in components/ui/index.ts stable.
  This barrel is the Figma Make swap point. New designs replace component internals, not the API.
- Mock data lives in mocks/ as typed TS files with synchronous accessor functions.
  These are the seams where real Supabase data plugs in later.

## Figma Make workflow

- Figma Make output is React web code. Treat it as a visual reference only. Never copy it in directly.
- Rebuild each design as NativeWind components inside components/ui/, keeping barrel exports stable.
- Match layout, spacing, hierarchy, and copy from the design. Replace any hardcoded colors with aurora-\* tokens.
- If a design conflicts with a rule in this file, follow this file and flag the conflict.

## Aurora theme (use tokens, never hardcode hex values)

- bg #000000 · surface #23313e · teal #86cdc3 · lavender #bb90e3
- blue #52a5dc · text #ecf3f2 · muted #bac7d2
- Classes: bg-aurora-bg, bg-aurora-surface, text-aurora-text, text-aurora-muted,
  text-aurora-teal, text-aurora-lavender, text-aurora-blue,
  border-aurora-teal, border-aurora-surface (opacity modifiers work: /20 /40 etc.)
- Raw color values are needed for Feather icon props and Reanimated interpolations.
  These come from a single tokens file (@/theme/tokens.ts). It is the only file where hex values may exist.

## Red Light mode (non-negotiable)

- Every aurora-\* class resolves through theme variables so Red Light mode swaps values globally.
  Screens never branch on theme.
- Red Light palette: black background, red tones only, dim red text. No white, blue, green, teal, or lavender
  anywhere, including modals, sheets, toasts, and icons.
- Theme mode (Dark, Red Light, Auto) lives in one Zustand store.
- Dark mode is the default. Red Light mode must be verified on every new screen and component.

## Offline behavior

- Every screen handles the offline state. Show an "Offline" chip when disconnected.
- Items created offline show a "Will sync" label.
- Starmap and saved session plans must render with no network.

## Feed and list behavior

- Lists use a "Load more" button. No infinite scroll, no auto pagination.
- Every list component ships with loading, empty, and error states.

## Accessibility

- Tap targets at least 44px.
- Text contrast must be accessible in both Dark and Red Light modes.

## Design principles (from PRD)

1. Built by stargazers, for stargazers. Correct astronomy vocabulary. No jargon dumbing down.
2. Field-ready. Core flows work offline. Dark mode always on. Red Light mode non-negotiable.
3. Calm, not addictive. No infinite scroll loops. Restrained animation.
4. Location and time aware. Every screen knows where the user is and what time it is.
5. Respect the gear. Equipment feels like a knowledgeable peer, not a sales pitch.

## Copy tone

- Calm, knowledgeable, peer to peer.
- No astrology framing, no salesy language, no condescension toward beginners.

## Quality gates (run after EVERY change, do not proceed until clean)

- cd artifacts/mobile && pnpm typecheck must pass with 0 errors
- No TypeScript @ts-ignore or @ts-expect-error without a comment explaining why
- No hardcoded hex colors in any file except @/theme/tokens.ts
- No console.log left in committed code (console.error/warn for real errors is fine)
- No unused imports

## Scope discipline

- Build only what the current task asks. Do not refactor adjacent code.
- If a needed UI component does not exist, create it in components/ui/ first, then consume it.
- Keep diffs small and reviewable. One logical change per response.
- End every task with: what you changed, what to look at on screen, and what is still pending.