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

## Current state (as of 2026-06-28)

### Built and working

- Nuxt 4 scaffold: `nuxt.config.ts`, `app/app.vue`, `tsconfig.json`, `package.json`.
- Pages in `app/pages/`:
  - `index.vue` — Home. Calls `/api/hello` via `useFetch`.
  - `about.vue` — About me, hobby list.
  - `notes.vue` — Notes page: list + add form, uses `useFetch`/`$fetch`/`refresh`.
- Server API in `server/api/`:
  - `hello.get.ts` — `GET /api/hello` — returns `{ message: 'Hello from Nuxt!' }`.
  - `notes.get.ts` — `GET /api/notes` — imports `notes` from `server/utils/notes.ts`, returns it.
  - `notes.post.ts` — `POST /api/notes` — imports `addNote()` from `server/utils/notes.ts`, returns the new note.
- `server/utils/notes.ts` — canonical in-memory store. Exports `notes`, `nextId`, `addNote()`. Single source of truth for both notes API routes.
- `app/app.vue` nav links: `/`, `/about`, `/notes`.
- Repo history (as of last sync): 8 commits on `main`; default branch on remote is `main`. Two PRs merged so far (notes fix, hello endpoint). One previous branch (`feature/nav-includes-notes`) merged in via a local merge commit, not a PR.

### Deliberate gaps — next teaching exercises

These are **intentional prompts, not bugs to silently fix**. Surface them, don't paper over them.

1. **In-memory persistence.** Both notes API routes share state, but the array is process-memory only — every server restart wipes it. Notes added during a session disappear on the next `npm run dev`. Persistence (JSON file in `.data/`, SQLite, etc.) is a real bug for a notes app and a natural `feature/persist-notes-store` PR.

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
