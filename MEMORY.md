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

## Current state (as of 2026-06-28)

### Built and working

- Nuxt 4 scaffold: `nuxt.config.ts`, `app/app.vue`, `tsconfig.json`, `package.json`.
- Pages in `app/pages/`:
  - `index.vue` — Home. Calls `/api/hello` (see gap #2 below).
  - `about.vue` — About me, hobby list.
  - `notes.vue` — Notes page: list + add form, uses `useFetch`/`$fetch`/`refresh`.
- Server API in `server/api/`:
  - `notes.get.ts` — `GET /api/notes` — returns a hardcoded array of 3 notes.
  - `notes.post.ts` — `POST /api/notes` — creates a note, returns it.
- `server/utils/notes.ts` — leftover/duplicate POST handler, not wired in (see gap #4).
- Repo has **zero commits**. `git log` fails; only `.gitignore` and the working tree exist.

### Deliberate gaps — next teaching exercises

These are **intentional prompts, not bugs to silently fix**. Surface them, don't paper over them.

1. **Nav is incomplete.** `app/app.vue` only links to `/` and `/about`. `/notes` is unreachable from the nav.
2. **Missing endpoint.** `app/pages/index.vue` calls `/api/hello`, but there is no `hello` handler in `server/api/`.
3. **API state isn't shared.** `notes.post.ts` returns a new note but does **not** append it to the array in `notes.get.ts`. The two handlers don't share state. Data is also in-memory only — lost on every restart.
4. **Stale utility file.** `server/utils/notes.ts` duplicates the POST logic and imports from the API route files. Not wired into anything.
5. **No initial commit / no remote.** Repo is uncommitted. Good moment to teach `git init` → `.gitignore` review → first conventional commit → branch for the next change.

### Suggested next lessons (pick one)

- **Exercise A — Git fundamentals on existing code:** `git init` review, stage selectively, first commit (`chore: initial Nuxt 4 scaffold`), then branch (`feature/nav-includes-notes`) and fix gap #1 with `feat: link /notes from app nav`. Walk through `git status`, `git diff`, `git log --oneline`, `git switch`.
- **Exercise B — Fix the broken hello call:** branch `fix/home-hello-endpoint`. Decide together: add `/api/hello` (small new handler), or change `index.vue` to call something real. Conventional commit, then merge back.
- **Exercise C — Shared server state:** branch `feature/shared-notes-store`. Extract a single in-memory store, import it from both `notes.get.ts` and `notes.post.ts`. Teaches Nitro's `server/utils/` convention *and* fixes the actual data-loss bug.

## Conventions for working in this repo

- Match the existing code style: `<script setup lang="ts">`, single quotes, 4-space indent, lowercase filenames.
- Keep changes small. One logical change per commit. Don't bundle a feature + a refactor + a fix.
- When teaching, **narrate before doing**: say what we're about to do, why, and what the team-equivalent command looks like — then run it.
