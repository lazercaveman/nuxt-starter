# CLAUDE.md — nuxt-starter

## Project

Nuxt 4 Starter Kit — a batteries-included template for real-world Nuxt 4 / Vue 3 applications.
MIT-licensed, maintained by Ali Soueidan (@lazercaveman).

## Tech Stack

- **Framework:** Nuxt 4 (Vue 3, `app/` directory structure)
- **Language:** TypeScript (strict mode)
- **Build:** Vite (native Nuxt integration)
- **Package Manager:** yarn (see version in `package.json`)
- **Node:** Version can be found in Package.json (enforced via `engines`)
- **Scraping:** cheerio (server-side HTML parsing of the court pages)
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Linting:** Oxlint (`oxlint`) — configured in `.oxlintrc.jsonc` with `typescript` and `vue` plugins
- **Formatting:** Oxfmt (`oxfmt`) — configured in `.oxfmtrc.jsonc`
- **Testing:** Vitest + `@vitest/coverage-v8` + `@vitest/ui`
- **Git Hooks:** Husky (pre-push: lint + test)

## Directory Layout

```
├── app/                  # Nuxt 4 app directory (components, pages, composables, assets, tests)
│   ├── components/
│   ├── pages/
│   ├── composables/
│   ├── assets/
│   │   └── style/        # tailwind.css (Tailwind v4 entry + theme)
│   └── testing/          # Vitest unit tests
├── server/               # Nitro server routes & API
│   ├── api/
│   └── utils/            # Scrapers, source registry, JSON store
├── shared/               # Types and utils used by both app and server (`#shared/...`)
├── public/               # Static assets
├── .oxlintrc.jsonc       # Oxlint config — DO NOT create .eslintrc files
├── .oxfmtrc.jsonc        # Oxfmt formatter config
├── vitest.config.ts      # Vitest configuration
├── nuxt.config.ts        # Nuxt configuration
└── tsconfig.json         # TypeScript config
```

## Commands

```bash
yarn install              # Install dependencies
yarn dev                  # Start dev server
yarn build                # Production build
yarn generate             # Static site generation
yarn preview              # Preview production build
yarn start                # Start production server
yarn type-check           # Run vue-tsc type checking
yarn lint                 # Run oxlint
yarn lint:fix             # Run oxlint with auto-fix
yarn format               # Format with oxfmt
yarn format:check         # Check formatting (used in CI/pre-push)
yarn test                 # Run Vitest (watch mode)
yarn test:ui              # Run Vitest with browser UI
yarn test:coverage        # Run Vitest with v8 coverage (used in pre-push)
yarn analyze              # Bundle analysis via nuxi analyze
```

Run `yarn type-check`, `yarn lint`, and `yarn test:coverage` before pushing — Husky enforces all three on pre-push.

## Critical Rules

1. **Oxlint** All lint config goes in `.oxlintrc.jsonc`. All formatter config goes in `.oxfmtrc.jsonc`.
2. **Tailwind utilities only.** Style with utility classes directly in templates. Sass is not installed — custom keyframes or theme tokens go into `app/assets/style/tailwind.css`.
3. **`app/` directory structure.** Components, pages, composables, and tests live under `app/`. Do not place them in the project root.
4. **TypeScript strict.** All new code must be typed. No `any` unless explicitly justified with a comment.
5. **Vue 3 Composition API + `<script setup lang="ts">`.** Do not use Options API.
6. **No state library.** The app has no Pinia store; page state lives in `ref`/`computed`. Add Pinia only if state really has to be shared across pages.
7. **Tests next to code (e.g. `server/utils/*.test.ts`) or in `app/testing/`.** Use Vitest, not Jest. Test files use `.test.ts` or `.spec.ts` suffix.
8. **yarn only.** Do not use npm or pnpm. Lock file is `yarn.lock`.

## Styling Guidelines

- Default to Tailwind utility classes in `<template>`.
- Tailwind v4 config is CSS-based (not `tailwind.config.js`) — see `app/assets/style/tailwind.css`.
- If you need a reusable utility, create a Vue component instead of `@apply`.

## Formatting Conventions

- Oxfmt is the sole formatter — never use Prettier or Biome alongside it.
- Config is in `.oxfmtrc.jsonc`: `printWidth: 100`, single quotes, semicolons, 2-space indent.
- Run `yarn format` to format in place, `yarn format:check` to verify without writing (used in pre-push).
- VS Code auto-formats on save via the `oxc.oxfmt` extension (`editor.defaultFormatter`).

## Testing Conventions

- Vitest config is in `vitest.config.ts` — plain Vitest (node environment) with the `#shared` and `@` aliases. There is no DOM environment; add `jsdom` + `@vue/test-utils` only once component tests are needed.
- Coverage provider is `v8`, not Istanbul.
- Run `yarn test` to verify nothing is broken before finishing any task.

## Gotchas

- The Husky pre-push hook runs: type-check (`vue-tsc`) → lint (oxlint) → format check (oxfmt) → `test:coverage`. If any step fails, the push is rejected.
- TypeScript stays on 6.x: `vue-tsc` (Volar) cannot run on TypeScript 7 until it ships a programmatic API (planned for 7.1).
- `@types/node` tracks the runtime major (Node 24, see `engines`), not the latest release.
- `tsconfig.tsbuildinfo` is committed — don't delete it, TypeScript incremental builds depend on it.
- Nuxt auto-imports Vue APIs and composables. Don't manually import `ref`, `computed`, `useRoute`, etc. unless the auto-import fails.


## Boundaries

### Do not modify or index

`.nuxt/`, `.output/`, `dist/`, `coverage/`, `.yarn/`, `node_modules/`, `localcerts/`

### Do not propose

- Alternative frameworks, build tools, or package managers.
- Removing or bypassing Husky hooks.
- New dependencies unless there is a clear, justified need that existing tools cannot cover.
