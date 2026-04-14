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
- **State:** Pinia (`@pinia/nuxt`)
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`) + SCSS (Sass)
- **Linting:** Oxlint (`oxlint`) — configured in `.oxlintrc.jsonc` with `typescript` and `vue` plugins
- **Formatting:** Oxfmt (`oxfmt`) — configured in `.oxfmtrc.jsonc`
- **Testing:** Vitest + `@vitest/coverage-v8` + `@vitest/ui`
- **Git Hooks:** Husky (pre-push: lint + test)

## Directory Layout

```
├── app/                  # Nuxt 4 app directory (components, pages, composables, assets, stores, tests)
│   ├── components/
│   ├── pages/
│   ├── composables/
│   ├── assets/
│   │   └── scss/         # SCSS files (animations, non-Tailwind styles)
│   ├── stores/           # Pinia stores
│   └── tests/            # Vitest unit tests
├── server/               # Nitro server routes & API
│   └── api/
├── public/               # Static assets
├── .oxlintrc.jsonc       # Oxlint config — DO NOT create .eslintrc files
├── .oxfmtrc.jsonc        # Oxfmt formatter config
├── vitest.config.ts      # Vitest configuration
├── nuxt.config.ts        # Nuxt configuration
├── tsconfig.json         # TypeScript config
└── clean-project.js      # One-time cleanup script (removes demo content)
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
yarn script:cleanup       # Remove demo content (one-time, self-deleting)
```

Run `yarn type-check`, `yarn lint`, and `yarn test:coverage` before pushing — Husky enforces all three on pre-push.

## Critical Rules

1. **Oxlint** All lint config goes in `.oxlintrc.jsonc`. All formatter config goes in `.oxfmtrc.jsonc`.
2. **No `@apply` in SCSS.** Tailwind v4 + Sass have compatibility issues with `@apply`. Use SCSS only for things Tailwind can't do (complex animations, keyframes, third-party overrides). Use utility classes directly in templates for everything else.
3. **`app/` directory structure.** Components, pages, composables, stores, and tests live under `app/`. Do not place them in the project root.
4. **TypeScript strict.** All new code must be typed. No `any` unless explicitly justified with a comment.
5. **Vue 3 Composition API + `<script setup lang="ts">`.** Do not use Options API.
6. **Pinia for state.** No other state management. Stores go in `app/stores/`.
7. **Tests next to code or in `app/tests/`.** Use Vitest, not Jest. Test files use `.test.ts` or `.spec.ts` suffix.
8. **yarn only.** Do not use npm or pnpm. Lock file is `yarn.lock`.

## Styling Guidelines

- Default to Tailwind utility classes in `<template>`.
- SCSS is for: animations/keyframes, complex calc logic, and third-party component overrides.
- Tailwind v4 config is CSS-based (not `tailwind.config.js`). Check existing CSS for theme customizations.
- Never mix `@apply` with SCSS. If you need a reusable utility, create a Vue component instead.

## Formatting Conventions

- Oxfmt is the sole formatter — never use Prettier or Biome alongside it.
- Config is in `.oxfmtrc.jsonc`: `printWidth: 100`, single quotes, semicolons, 2-space indent.
- Run `yarn format` to format in place, `yarn format:check` to verify without writing (used in pre-push).
- VS Code auto-formats on save via the `oxc.oxfmt` extension (`editor.defaultFormatter`).

## Testing Conventions

- Vitest config is in `vitest.config.ts` — check there for aliases and setup.
- Coverage provider is `v8`, not Istanbul.
- Run `yarn test` to verify nothing is broken before finishing any task.

## Gotchas

- `clean-project.js` deletes `.git/` — it's meant for first-time setup only. Never run it on an active project.
- The Husky pre-push hook runs: type-check (`vue-tsc`) → lint (oxlint) → format check (oxfmt) → `test:coverage`. If any step fails, the push is rejected.
- `tsconfig.tsbuildinfo` is committed — don't delete it, TypeScript incremental builds depend on it.
- Nuxt auto-imports Vue APIs and composables. Don't manually import `ref`, `computed`, `useRoute`, etc. unless the auto-import fails.


## Boundaries

### Do not modify or index

`.nuxt/`, `.output/`, `dist/`, `coverage/`, `.yarn/`, `node_modules/`, `localcerts/`

### Do not propose

- Alternative frameworks, build tools, or package managers.
- Removing or bypassing Husky hooks.
- New dependencies unless there is a clear, justified need that existing tools (`@vueuse/core`, Pinia, etc.) cannot cover.
