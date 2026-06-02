# Todoer

A minimal desktop todo app with **zones** — each zone is its own colored list.

Built with **Tauri 2 + React + TypeScript** for a lightweight native app on macOS and Windows.

## Features

- Centered todo list UI with colored zones
- Switch zones with the dots below or `←` / `→` keys
- Create and edit zones (name + color)
- Tasks persist locally after closing the app
- Dark mode support

## Development

**Prerequisites:** [Node.js](https://nodejs.org/) 18+, [Rust](https://rustup.rs/)

```bash
npm install
npm run tauri dev
```

For UI-only work in the browser:

```bash
npm run dev
```

## Build locally

```bash
npm run tauri build
```

Installers appear in `src-tauri/target/release/bundle/`:

| Platform | What you get |
| --- | --- |
| macOS | `Todoer.app` and a `.dmg` installer |
| Windows | `.msi` and/or `.exe` in the bundle folder |

---

## Publish on GitHub (for others to download)

This repo includes a GitHub Actions workflow that builds Mac + Windows installers automatically.

### One-time setup

1. Push this project to a GitHub repository.
2. No extra secrets needed — `GITHUB_TOKEN` is provided automatically.

### Cut a release

1. Update the version in `package.json` and `src-tauri/tauri.conf.json` if needed.
2. Commit and push your changes.
3. Create and push a version tag:

```bash
git tag v0.1.0
git push origin v0.1.0
```

4. GitHub Actions runs `.github/workflows/release.yml` and builds installers for:
   - macOS Apple Silicon (`aarch64`)
   - macOS Intel (`x86_64`)
   - Windows

5. Open **Actions** → the workflow run → when it finishes, open the **Draft release** it created under **Releases**.
6. Review the attached `.dmg`, `.msi`, etc., then click **Publish release**.

Users can then go to **Releases** on your repo and download the file for their platform.

### Manual release (without CI)

Build on your Mac, upload the `.dmg` from `src-tauri/target/release/bundle/dmg/` to a GitHub Release by hand. Build Windows installers on a Windows machine (or use the CI workflow above).

## Usage

1. Add tasks in the input field
2. Click the dots at the bottom to switch zones (or use arrow keys)
3. **+** (top right) to add a zone, pencil (top left) to edit the current one
