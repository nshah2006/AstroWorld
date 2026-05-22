# ASTROWORLD — Offline-First Build Spec (Agent Instructions)

You are wiring up offline-first sync for a mobile app. Follow this in order. Do not skip ahead. Do not add features not listed here.

## Stack (fixed — do not substitute)
- Client: Expo (React Native) + TypeScript
- Local DB: SQLite via PowerSync
- Sync engine: PowerSync
- Backend/DB/Auth/Storage: Supabase (Postgres)
- Conflict resolution: last-write-wins (LWW). Do NOT use CRDTs.

## Core rule (never violate)
For local-first data, the UI reads and writes ONLY the local SQLite database. It returns instantly and never waits on the network. PowerSync syncs in the background. There is NO "save to server" call in the UI for these entities.

## Data classification (enforce strictly)
- **Local-first** (in SQLite, synced via PowerSync): `sessions`, `plans`, `profile`, `equipment`
- **Server-only** (Supabase direct, network required, NOT in local DB, NOT in PowerSync): community feed, marketplace, messaging, live weather
- **Computed-local** (no network, no sync, derived on device): starmap / celestial positions

Never put server-only data into the local DB or PowerSync sync rules.

## Schema requirements (apply to every local-first table)
- Primary key: client-generated UUID (generate on device before insert). Never server auto-increment.
- Required columns on every syncable row: `id` (uuid), `user_id` (uuid), `created_at` (timestamp), `updated_at` (timestamp), `deleted` (boolean, default false)
- Deletes are soft: set `deleted = true`. Never hard-delete syncable rows.
- LWW resolves on server-side `updated_at`. Do not trust device clocks as authoritative.

## PowerSync sync rules
- Scope buckets by `user_id`: a user syncs only their own `sessions`, `plans`, `profile`, `equipment`.
- Do not sync other users' data to the device.

---

## Build order

### Step 1 — Spike (build and verify before anything else)
1. Supabase project with one table `sessions` (id uuid, user_id uuid, title text, created_at, updated_at, deleted bool).
2. Wire PowerSync to Supabase (follow PowerSync's official Supabase integration guide).
3. Bare Expo app: insert one `sessions` row into local SQLite while device is OFFLINE.
4. Go online → confirm row appears in Supabase.
5. Edit same row on a second client → confirm it syncs back.

**Do not proceed until Step 1 works on a real device in airplane mode. Report the result before continuing.**

### Step 2 — Local data layer
- Implement local-first reads: every screen for local-first data queries the local SQLite DB.
- Implement local-first writes: write to local DB, return immediately, no network wait.
- Subscribe the UI to local DB changes so it re-renders automatically (use PowerSync watched queries).
- Confirm: no UI code path for local-first data calls Supabase directly.

### Step 3 — Full local-first schema
- Create `sessions`, `plans`, `profile`, `equipment` tables in both Supabase and the local schema, following the schema requirements above.
- Configure PowerSync sync rules (user-scoped buckets).

### Step 4 — Conflict resolution
- Confirm LWW uses server `updated_at`.
- Test: edit same row on two offline devices → reconnect both → later edit wins, row not corrupted.
- Rule: if one device edits and another deletes the same row, deletion wins. Implement and test this.

### Step 5 — Real-world states (test each explicitly)
- Cold start fully offline: app opens, saved plans visible, logging works, zero network.
- Partial/flaky connectivity: requests that time out are treated as offline. UI never hangs waiting on a response.
- App killed mid-sync: on relaunch, unsynced local changes persist and retry cleanly. No data loss.
- Media offline: photos queue locally and upload on reconnect, separate from row sync.
- Reconnect storm: many queued offline records sync in one batch without choking.

### Step 6 — Observability
- Add a sync status indicator to the UI: synced / syncing / offline.
- Log sync failures and conflicts to Sentry.
- Track offline sync success rate (% of offline-created sessions that reach the server).

### Step 7 — Server-only features (only after Steps 1–6 pass)
- Build community feed, marketplace, messaging using Supabase directly + TanStack Query.
- These do NOT use PowerSync and do NOT touch the local sync DB.
- Show graceful "you're offline" empty states; do not attempt to make them work offline.

---

## Definition of done
- Logging a session works fully offline and syncs on reconnect with zero data loss.
- No local-first screen blocks on the network.
- Server-only features stay completely separate from the sync layer.
- Sync status is visible and failures are logged.

## Quality gates (run after every change)
- `tsc` (TypeScript compiler) passes with no errors.
- Linter passes.
- Do not move to the next step until both are clean.
