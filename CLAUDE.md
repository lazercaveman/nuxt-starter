# CLAUDE.md — nuxt-starter

## Project

Nuxt 4 Starter Kit — a batteries-included template for real-world Nuxt 4 / Vue 3 applications.
MIT-licensed, maintained by Ali Soueidan (@lazercaveman).

## Tech Stack

- **Framework:** Nuxt 4 (Vue 3, `app/` directory structure)
- **Language:** TypeScript (strict mode)
- **Build:** Vite (native Nuxt integration)
- **Package Manager:** pnpm (see version in `package.json`)
- **Node:** v22.13.0 (pinned in `.nvmrc`)
- **State:** Pinia (`@pinia/nuxt`)
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`) + SCSS (Sass)
- **Linting:** ESLint v9 flat config (`eslint.config.ts`) — uses `eslint:recommended`, `typescript-eslint`, `eslint-plugin-vue`
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
├── eslint.config.ts      # ESLint v9 flat config — DO NOT create .eslintrc files
├── vitest.config.ts      # Vitest configuration
├── nuxt.config.ts        # Nuxt configuration
├── tsconfig.json         # TypeScript config
└── clean-project.js      # One-time cleanup script (removes demo content)
```

## Commands

```bash
pnpm install              # Install dependencies
pnpm dev                  # Start dev server
pnpm build                # Production build
pnpm lint                 # Run ESLint
pnpm lint:fix             # Run ESLint with auto-fix
pnpm test                 # Run Vitest
pnpm test:ui              # Run Vitest with browser UI
pnpm test:coverage        # Run Vitest with v8 coverage
pnpm script:cleanup       # Remove demo content (one-time, self-deleting)
```

Run `pnpm lint` and `pnpm test` to verify changes before committing — Husky enforces this on pre-push.

## Critical Rules

1. **ESLint v9 flat config only.** All lint config goes in `eslint.config.ts` as an array export. Never create `.eslintrc.*` files or use legacy config format.
2. **No `@apply` in SCSS.** Tailwind v4 + Sass have compatibility issues with `@apply`. Use SCSS only for things Tailwind can't do (complex animations, keyframes, third-party overrides). Use utility classes directly in templates for everything else.
3. **`app/` directory structure.** Components, pages, composables, stores, and tests live under `app/`. Do not place them in the project root.
4. **TypeScript strict.** All new code must be typed. No `any` unless explicitly justified with a comment.
5. **Vue 3 Composition API + `<script setup lang="ts">`.** Do not use Options API.
6. **Pinia for state.** No other state management. Stores go in `app/stores/`.
7. **Tests next to code or in `app/tests/`.** Use Vitest, not Jest. Test files use `.test.ts` or `.spec.ts` suffix.
8. **pnpm only.** Do not use npm or yarn. Lock file is `pnpm-lock.yaml`.

## Styling Guidelines

- Default to Tailwind utility classes in `<template>`.
- SCSS is for: animations/keyframes, complex calc logic, and third-party component overrides.
- Tailwind v4 config is CSS-based (not `tailwind.config.js`). Check existing CSS for theme customizations.
- Never mix `@apply` with SCSS. If you need a reusable utility, create a Vue component instead.

## Testing Conventions

- Vitest config is in `vitest.config.ts` — check there for aliases and setup.
- Coverage provider is `v8`, not Istanbul.
- Run `pnpm test` to verify nothing is broken before finishing any task.

## Gotchas

- `clean-project.js` deletes `.git/` — it's meant for first-time setup only. Never run it on an active project.
- The Husky pre-push hook runs lint + tests. If either fails, the push is rejected.
- `tsconfig.tsbuildinfo` is committed — don't delete it, TypeScript incremental builds depend on it.
- Nuxt auto-imports Vue APIs and composables. Don't manually import `ref`, `computed`, `useRoute`, etc. unless the auto-import fails.
