# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` / `npm start` — build then launch Electron. There is no HMR; you must rebuild after changes.
- `npm run build` — runs `build:css` (Tailwind) then `build:js` (Rollup). Both must succeed for the app to load.
- `npm run build:css` / `npm run build:js` — run stages individually when iterating on just styles or just TS/Svelte.
- `npm run watch` — only watches Tailwind CSS. Rollup has no watch script wired up; use `ROLLUP_WATCH=true rollup -c -w` if you need JS watch.
- `npm run electron` — launch Electron against the already-built `public/build/` output (skips build).
- `npm run dist` / `dist-mac` / `dist-win` / `dist-linux` — build then package via `electron-builder`. Output goes to `dist/`.
- `npm run clean` — remove `public/build` and `dist`.

There is **no test runner, linter, or typechecker script** configured. `svelte-check` and `typescript` are installed as devDeps but not wired into `package.json` scripts — invoke them directly (`npx svelte-check`, `npx tsc --noEmit`) if needed.

## Architecture

This is an Electron desktop app with a Svelte 4 + TypeScript + Tailwind renderer. The codebase is small but spans three distinct execution contexts that must be understood together:

1. **Electron main process** (`main.js`, CommonJS, Node) — creates the `BrowserWindow`, builds the native menu, and exposes two IPC handlers: `open-external` (validates http/https before calling `shell.openExternal`) and `get-app-version`. Loads `public/index.html` directly from disk; no dev server is involved even in "dev" mode.
2. **Preload bridge** (`preload.js`) — runs with `contextIsolation: true` and exposes a minimal `window.electronAPI` surface (`openExternal`, `getVersion`) to the renderer. All renderer→main communication must be added here; the renderer has `nodeIntegration: false`.
3. **Renderer** (`src/`, Svelte + TS) — entry `src/main.ts` mounts `App.svelte`. `src/lib/resources.ts` fetches `./resources.json` relative to the loaded HTML file (so the data file must be shipped alongside `public/` in the packaged app — see `build.files` in `package.json`). The `Category`/`Resource` types and the `Window.electronAPI` ambient declaration also live in `resources.ts`.

### Build pipeline

Two independent bundlers feed `public/build/`:

- **Rollup** (`rollup.config.js`) compiles `src/main.ts` → `public/build/bundle.js` (IIFE). It uses `rollup-plugin-svelte` with `emitCss: true` but routes component CSS through `rollup-plugin-css-only` with `output: false` — i.e. component styles are **dropped**. All styling must go through Tailwind utility classes or `:global()` blocks; component `<style>` blocks will not ship.
- **Tailwind** compiles `src/global.css` → `public/build/bundle.css` (minified). `src/app.css` exists but is not part of the build — `global.css` is the canonical entry.

Note: `rollup.config.js` has a `serve()` helper that spawns `npm run start:electron`, but that script does not exist in `package.json`, so `ROLLUP_WATCH` mode will fail to launch Electron unless that script is added.

### Data model

`resources.json` at the repo root is the shipped data. `loadResources()` fetches it and falls back to a hardcoded default list inside `resources.ts` if the fetch fails — keep the two shapes in sync when editing the schema. Resources are grouped into categories with `{id, name, icon, resources[]}`; each resource is `{id, title, description, url, tags[], thumbnail?}`.

### Packaging

`electron-builder` config lives inline in `package.json` under `build`. Only `main.js`, `preload.js`, `public/**/*`, and `resources.json` are bundled — **nothing from `src/` ships**; the compiled artifacts in `public/build/` are what get packaged. App ID is `me.davidcanhelp.historian`.

### Release flow

Pushing a `v*` git tag triggers `.github/workflows/release.yml`, which creates a GitHub Release from the tag. The workflow does **not** build or attach binaries — distributables must be built locally with `npm run dist-*` and uploaded manually if desired.
