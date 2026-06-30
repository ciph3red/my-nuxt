# MEMORY.md — project context for `/home/marco/Desktop/my-app`

Read this before doing anything in this repo. It is a **teaching project**, not a finished product.

## What this project is

A Nuxt 4 + Vue 3 notes app being used as a **teaching vehicle**. The user is learning two things in parallel:

- **Nuxt 4** — file-based routing (`app/pages/`), server routes via Nitro (`server/api/`), `useFetch` / `$fetch` from the client.
- **Git** — taught *as if the user were on a team*: real-world conventions, not playground commands.

Treat the user as beginner-to-intermediate. Show the *why* behind conventions, not just the commands.

## How to teach Git here

Whenever a code change is about to happen, frame Git like a team workflow:

- **One branch per change** — `feature/<thing>`, `fix/<thing>`, `chore/<thing>`. Never commit straight to `main`/`master`.
- **Small, atomic commits** with **Conventional Commits** messages (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`). One logical change per commit.
- **Explain *why*** — reviewability, revertability, blame-friendly history, easier code review. Don't just demo the commands.
- **Pair each Git step with its Nuxt step** so the user sees the full loop: branch → code → commit → (push → PR → review).
- **Hands-on only** — never run commands unprompted. Propose the next step with the *why*, then wait for the user to run it.

## Current state (as of 2026-07-01)

### Built and working

- Nuxt 4 scaffold: `nuxt.config.ts`, `app/app.vue`, `tsconfig.json`, `package.json`.
- Pages in `app/pages/`:
  - `index.vue` — Home. Calls `/api/hello` via `useFetch`.
  - `about.vue` — About me, hobby list.
  - `notes.vue` — Notes page: list + add form + per-note Edit and Delete buttons. Edit swaps a row into an inline input + Save/Cancel. Uses `useFetch` / `$fetch` / `refresh`.
- Server API in `server/api/`:
  - `hello.get.ts` — `GET /api/hello` — returns `{ message: 'Hello from Nuxt!' }`.
  - `notes.get.ts` — `GET /api/notes` — imports `getAllNotes()` from `server/utils/notes.ts`, returns it.
  - `notes.post.ts` — `POST /api/notes` — imports `addNote()` from `server/utils/notes.ts`, returns the new note.
  - `notes/[id].delete.ts` — `DELETE /api/notes/:id` — imports `deleteNote()`, returns 204 on success, 404 if the row doesn't exist, 400 if `:id` isn't a positive integer.
  - `notes/[id].put.ts` — `PUT /api/notes/:id` — imports `updateNote()`, returns the updated `Note` on success, 404 if the row doesn't exist, 400 on invalid id or empty/missing `text`.
- `server/utils/notes.ts` — canonical SQLite store at `.data/notes.sqlite` via `better-sqlite3`. Exports `Note` (type), `addNote(text)`, `getAllNotes()`, `deleteNote(id)`, `updateNote(id, text)` (returns `Note | null`). Schema lives inline as a `CREATE TABLE IF NOT EXISTS` in the module body. Single source of truth for all notes API routes.
- `app/app.vue` nav links: `/`, `/about`, `/notes`.
- Repo history: 8 merged PRs on `main`. Default branch on remote is `main`.

### Deliberate gaps — next teaching exercises

These are **intentional prompts, not bugs to silently fix**. Surface them, don't paper over them.

(none currently — open follow-ups live in the Session log)

### Suggested next lessons (pick one)

- **Exercise A — Git fundamentals on existing code:** ~~completed~~ (scaffold committed as `chore: Nuxt 4 scaffold`; first feature branch `feature/nav-includes-notes` merged; second PR `feat/hello-endpoint` merged; third `fix/notes-post-not-persisting` merged).
- **Exercise B — Shared server state:** ~~completed~~ as `fix/notes-post-not-persisting` (3 commits: extract store, GET reads from store, POST persists). Teaches Nitro's `server/utils/` convention *and* fixes the data-loss bug. **In-memory only — see gap #1 above.**
- **Exercise C — Persistence:** branch `feature/persist-notes-store`. Decide a storage layer (JSON file in `.data/`, SQLite via `better-sqlite3`, etc.) and a write-through pattern that survives restart. Touches more than one file and is a natural `feat:` PR.

## Conventions for working in this repo

- Match the existing code style: `<script setup lang="ts">`, single quotes, 4-space indent, lowercase filenames.
- Keep changes small. One logical change per commit. Don't bundle a feature + a refactor + a fix.
- When teaching, **narrate before doing**: say what we're about to do, why, and what the team-equivalent command looks like — then run it.
- **Conventional Commits style:** imperative mood, no trailing period in subject. (`feat: add /api/hello endpoint`, not `feat: adding /api/hello endpoint.`). Body wrapped at a reasonable width if you write one.
- **Delete branches after merge** — local with `git branch -d <name>`, remote with `git push origin --delete <name>`. Stale branch refs accumulate and `git branch -a` becomes unusable.

## Session log

### As of 2026-07-01 — end of session

**Where we stopped:** `feature/edit-note` merged as PR #8. `main` is clean and up to date. All branches cleaned up.

**Recently completed (this session and recent prior):**

- PR #1 `fix/notes-post-not-persisting` merged (3 commits + 1 follow-up docs commit `3cc58b1`).
- PR #2 `feat/hello-endpoint` merged (1 commit `5bfc4b2`).
- PR #3 `chore/sync-memory` merged (1 commit `ae50bc3`).
- PR #4 `feature/persist-notes-store` merged (2 commits: `775534e chore: added better-sqlite3 and deps`, `48a5d8c feat: persist added notes to SQLite`).
- PR #5 `feat/delete-note` (from 2026-06-28) was actually a docs-only sync, not the real delete-note code — branch reused for the lesson below.
- PR #6 `feat/delete-note` merged into `main` as `b9c0ac2` (3 commits: `df2a95a feat: added DELETE /api/notes/[id] endpoint`, `8b5ede2 feat: added Delete button to notes page`, `1dc0f49 docs: sync memory.md with newer data`).
- PR #7 `feature/exam-delete-confirm` merged into `main` (1 commit `f24a0c6 feat: confirm before deleting note`) — adds a `window.confirm()` prompt before the `$fetch` DELETE runs.
- Housekeeping commit `23548a4 housekeeping: removed duplicate .data entry in gitignore`.
- PR #8 `feature/edit-note` merged into `main` (2 commits: `feat: add PUT /api/notes/:id endpoint`, `feat: add Edit button + inline form to notes page`).

**Architectural state of `main`:**

- `server/utils/notes.ts` uses `better-sqlite3`, file at `.data/notes.sqlite`. Exports `addNote`, `getAllNotes`, `deleteNote`, `updateNote`, type `Note`. Schema lives inline as a `CREATE TABLE IF NOT EXISTS` in the module body. The notes API uses these util functions (no longer the old in-memory array).
- `app/pages/notes.vue` calls `/api/notes/`, POSTs to `/api/notes`, DELETEs per-note via `/api/notes/:id`, and PUTs per-note via `/api/notes/:id`; refreshes after each mutation. Per-row state: `editingId` (which row is in edit mode) and `editDraft` (in-flight text). One row editable at a time; `Cancel` clears both refs.
- `server/api/notes/[id].delete.ts` returns 204/404/400 per spec.
- `server/api/notes/[id].put.ts` returns the updated `Note` on success, 404 if the row doesn't exist, 400 on invalid id or empty/missing `text`.
- No tests yet.
- MEMORY.md is now synced for 2026-07-01.

**Lesson shape decisions made this session (carry forward):**

- `feature/delete-note` was committed as **2 commits** (server as one, UI as one) plus a separate `docs:` sync — user picked 2-code-commits when offered 1/2/3.
- `feature/exam-delete-confirm` was committed as **1 commit** (single small UI tweak).
- `feature/edit-note` was committed as **2 commits** (server as one, UI as one) — same shape as delete-note.
- Branch reuse: the existing `feat/delete-note` branch was reused for the lesson rather than recreated. Worked because the upstream was already gone.

**Open follow-ups noted but not started:**

- Tests via Vitest (Option 3 from an earlier planning beat).
- Tags / categories (`feature/note-tags`) — schema migration.
