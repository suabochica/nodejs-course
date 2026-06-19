# AGENTS.md — 11-uigen

See also root `AGENTS.md` for workspace-wide conventions (pnpm, Prettier, ESLint, commits).

## Commands

| What | Command |
|------|---------|
| Dev server | `pnpm dev` |
| All tests | `pnpm test` |
| Single test | `pnpm test -- src/lib/__tests__/file-system.test.ts` |
| Setup | `pnpm run setup` (install + prisma generate + migrate) |
| Reset DB | `pnpm run db:reset` |
| Lint | `pnpm lint` |

## Turbopack + pnpm gotcha

If you see `FATAL: Turbopack Error: Next.js package not found`, the project's `node_modules` is missing its `.pnpm/` virtual store. Fix:

```bash
rm -rf node_modules package-lock.json && pnpm install
```

Then verify `ls node_modules/.pnpm` exists.

## Prisma

- SQLite database at `prisma/dev.db`
- Generated client at `src/generated/prisma` (non-default output path in `schema.prisma`)
- After any schema change, run `prisma generate`

## Path alias

`@/*` maps to `./src/*` in `tsconfig.json`. Applies to imports and tests.

## AI provider

`@ai-sdk/anthropic` with Claude Haiku 4.5. Falls back to a bundled `MockLanguageModel` (canned counter/form/card responses) when `ANTHROPIC_API_KEY` is unset or `"your-api-key-here"`.

## Node 25+ compat

`node-compat.cjs` deletes `globalThis.localStorage`/`sessionStorage` on the server to prevent SSR crashes. It's imported at the top of `next.config.ts` — don't remove that import.

## Testing

- **Vitest** with `jsdom` environment
- Test files live in `__tests__/` directories next to source files
- Import style: `import { test, expect } from "vitest"`

## Tech stack

Next.js 15.3.9 (App Router + Turbopack), React 19, Tailwind CSS v4 (via `@tailwindcss/postcss`), shadcn/ui (New York style), Prisma + SQLite, Vercel AI SDK.
