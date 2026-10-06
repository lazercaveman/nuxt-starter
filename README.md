[![Nuxt 4](https://img.shields.io/badge/Nuxt-4.2.0-00DC82?logo=nuxt.js)](https://nuxt.com)
[![MIT License](https://img.shields.io/github/license/lazercaveman/nuxt-starter)](LICENSE)
![Release Badge](https://img.shields.io/github/v/release/lazercaveman/nuxt-starter)

# Nuxt 4 Starter

## 🥸 Why this template?  
Get ready to supercharge your development with this fully configured Nuxt 4 Starter Kit! Built on Vue 3, AI ready (including configured CLAUDE.md), powered by TypeScript and many other technologies (for more information see down-below or checkout package.json for even more), this setup comes preloaded with tools and libraries designed to enhance your workflow, streamline development, and maintain high-quality code. 🙌 No more wrestling with configurations—jump straight into building amazing projects! 

- **Up to date:**  Using up to date dependencies and tools to ensure a smooth development experience. (at least I try ^^)
- **Batteries-Included** The Starter Kit uses lots of well kind of "standard dependencies" fully configured and ready to go.
- **MIT License:** Allows commercial use, modification, distribution, and of course private use as well  - for more read the [MIT License](LICENSE).

--

## 🚀 What's Inside?
This starter kit is packed with carefully chosen dependencies to handle real-world scenarios. Here’s why they’re included:

### ⚡️ Vite
Why? Because it’s blazing fast. Vite ensures instant builds and on-demand compilation, making both development and production smoother and quicker.
[learn more](https://vitejs.dev/).

### 🏗️ Oxlint
Blazing-fast Rust-based linter for JavaScript and TypeScript (including Vue `<script>` blocks), with 695+ built-in rules. Ships pre-configured in `.oxlintrc.json` with the `typescript` and `vue` plugins enabled — just add your own rules on top.
[learn more](https://oxc.rs/docs/guide/usage/linter).

### 💎 Oxfmt
High-performance code formatter from the OXC project, matching Prettier's output for JS, TS, Vue, CSS, JSON, YAML, and more. Configured in `.oxfmtrc.json`. Format-on-save is enabled out of the box via the VS Code extension (`oxc.oxfmt`).
[learn more](https://oxc.rs/docs/guide/usage/formatter).

### 🧪 Vitest
To test smarter and faster. Vitest is a lightweight, Jest-compatible testing framework that ensures code reliability and helps you catching bugs early. 
[learn more](https://vitest.dev/).

### 🐶 Husky
Husky enforces pre-push hooks, ensuring quality checks are performed before code is pushed to the repository. The pre-push hook runs automated tasks like linting & tests preventing errors in the main branch. This workflow helps catch issues early, ensuring a clean and stable codebase.
[learn more](https://typicode.github.io/husky/).

### 💅 Tailwind CSS
Tailwind CSS is a highly effective utility-first CSS framework that greatly enhances the styling of a Nuxt project. Tailwind's zero-runtime feature further adds to its performance, making it a valuable addition to a Nuxt project looking to achieve high-quality and optimized styling.
[learn more](https://tailwindcss.com).

### 🤌 TypeScript
TypeScript enhances the JavaScript language by adding optional static typing and other features, for safer, smarter code - helping avoiding errors and catching bugs early in development.
[learn more](https://www.typescriptlang.org/).

### 🤖 Claude Code Ready
This starter ships with a pre-configured `CLAUDE.md` file — the instruction file read by [Claude Code](https://claude.ai/code) (Anthropic's AI coding assistant). It documents the full project setup: tech stack, directory layout, commands, critical rules, and gotchas. Any Claude Code session in this repo will pick it up automatically, so the AI already knows the conventions, the correct tools (`oxlint`, `oxfmt`, Vitest, yarn), and what not to do — no manual briefing required.
[learn more](https://docs.anthropic.com/en/docs/claude-code/memory).

--

## 🚀 Getting Started
1. Clone or download this repository
2. Ensure you have Node version v22.13.0 up an running
3. Make sure you have yarn version mentioned in the package json in use (or use the package manager of your choice it should also work - in case remove the `.npmrc` file and execute e.g. `corepack use yarn@4.10.3`).
4. Run `yarn install` to install dependencies
5. Run `yarn dev` to start the local development environment

--

## 🤝 Contributing
Feel free to fork this project and submit pull requests — contributions are very welcome!

## 📜 License
Licensed under the [MIT License](LICENSE), by [Ali Soueidan](https://alisoueidan.com).
