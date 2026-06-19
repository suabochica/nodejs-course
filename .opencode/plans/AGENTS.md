# Plan: Create AGENTS.md at repo root

Write `/home/suabochica/Development/nodejs-course/AGENTS.md` with the content below.

---

```
# AGENTS.md

## Package manager

- **pnpm only.** This is a pnpm workspace (`pnpm-workspace.yaml`). Never use npm.
- Install/restore from root: `pnpm install`
- If a project has a stale `package-lock.json`, delete it.
- `pnpm list -r` lists all workspace packages.

## Monorepo layout

```
projects/
  01-notes-app .. 07-web-scrapping  # vanilla Node
  08-deno-cli, 09-deno-shortener-url # Deno (no pnpm)
  10-dev-match                       # NestJS
  11-uigen                           # Next.js 15 App Router + Turbopack
```

Root `package.json` has **only** dev tooling shared across projects — no app code.

## Code style (root)

- **Prettier**: `singleQuote`, `noSemi`, `trailingComma: "all"`, `arrowParens: "avoid"`
- **ESLint**: `@typescript-eslint` parser/plugin, node/es2021 env
- **Commits**: conventional commits (enforced via commitlint + husky)

## Project 11-uigen

### Commands

| What | Command (run from `projects/11-uigen/`) |
|------|---------|
| Dev server | `pnpm dev` |
| All tests | `pnpm test` |
| Single test | `pnpm test -- src/lib/__tests__/file-system.test.ts` |
| Setup | `pnpm run setup` (install + prisma generate + migrate) |
| Reset DB | `pnpm run db:reset` |
| Lint | `pnpm lint` |

### Turbopack + pnpm gotcha

If you see `FATAL: Turbopack Error: Next.js package not found`, the project's `node_modules` is missing its `.pnpm/` virtual store. Fix:

```bash
rm -rf node_modules package-lock.json && pnpm install
```

Then verify `ls node_modules/.pnpm` exists.

### Prisma

- SQLite database at `prisma/dev.db`
- Generated client at `src/generated/prisma` (non-default output path in `schema.prisma`)
- After any schema change, run `prisma generate`

### Path alias

`@/*` maps to `./src/*` in `tsconfig.json`. Applies to imports and tests.

### AI provider

`@ai-sdk/anthropic` with Claude Haiku 4.5. Falls back to a bundled `MockLanguageModel` (canned counter/form/card responses) when `ANTHROPIC_API_KEY` is unset or `"your-api-key-here"`.

### Node 25+ compat

`node-compat.cjs` deletes `globalThis.localStorage`/`sessionStorage` on the server to prevent SSR crashes. It's imported at the top of `next.config.ts` — don't remove that import.

### Testing

- **Vitest** with `jsdom` environment
- Test files live in `__tests__/` directories next to source files
- Import style: `import { test, expect } from "vitest"`

### Tech stack (11-uigen)

Next.js 15.3.9 (App Router + Turbopack), React 19, Tailwind CSS v4 (via `@tailwindcss/postcss`), shadcn/ui (New York style), Prisma + SQLite, Vercel AI SDK.
```
