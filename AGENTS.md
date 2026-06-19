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

## Projects with their own AGENTS.md

- `projects/11-uigen/AGENTS.md`
