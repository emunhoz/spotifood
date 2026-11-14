# @monorepo/design-tokens

`tokens.json` (W3C DTCG, Tokens Studio single-file format: one top-level key per set) is the source of truth for Figma and code. Do not edit `src/generated/`.

- `core`: typography, radii, shadows, breakpoints
- `light` / `dark`: color per theme (dark is a placeholder until redesigned in Figma)

### Color roles

Each color has one job, so no color reads as two things (the old red brand also read as "error").

| Token | Role | Rule |
| --- | --- | --- |
| `primary` (basil `#C5E34A`) | main action: primary button, active filter | Text on it is always `onPrimary`; white fails contrast (1.45:1) |
| `primaryDark` / `primaryLight` | hover / soft fill | Derived from `primary` with a Tokens Studio mix (27% black / 40% white); change only `primary` |
| `onPrimary` (`#141414`) | text and icons on `primary` | 12.7:1 on `primary`, 6.8:1 on `primaryDark` |
| `brand` (aubergine `#4A2C6E`, lavender `#C9B6F0` in dark) | logo, outline buttons, spinner | 11.2:1 on white |
| `negative` | errors only | Never used for actions |
- Build: `bun run build:tokens` (Style Dictionary v4) writes `src/generated/tokens.ts` and `tokens.css`.
  `libbuild` runs it before `tsc`. Commit the generated files; CI fails on drift.
- TS: default export is the theme object (light values), named export `typography`.
- CSS custom properties (`--sf-*`, light on `:root`, dark via `prefers-color-scheme` or
  `[data-theme="dark"]`): `@monorepo/design-tokens/src/generated/tokens.css`

## Figma ↔ code workflow

```
Figma (Tokens Studio) ──push──▶ design/tokens ──CI──▶ PR to main ──review + Vercel preview──▶ merge
        ▲                                                                                    │
        └──────────────────────────── Pull from GitHub ◀─────────────────────────────────────┘
```

**Why a PR and not a live sync.** A token change restyles every component and screen at once. Going through a PR means the change is diffed (tokens, generated files, snapshots), tested, and previewed on Vercel before it reaches production. Figma's own Variables REST API, which would allow a direct sync, requires the Enterprise plan.

### Change a token from Figma (the usual path)

When: any visual decision (color, type scale, radius, shadow) made in the [Figma file](https://www.figma.com/design/ZYNcMs2B7uDiFCmw9mBvZQ).

1. In Tokens Studio, **Pull from GitHub** first, so you edit the latest tokens.
2. Edit the token. Keep `core` and `light` active; edit `dark` for the dark theme.
3. **Push to GitHub** with a short commit message. This commits `tokens.json` to `design/tokens`.
4. The **Design tokens** workflow (`.github/workflows/design-tokens.yml`) then:
   rebuilds `src/generated/`, rewrites snapshots (styled-components class hashes change with any style),
   runs the tests, commits the result, and opens the PR "chore(tokens): sync from Figma" (or updates the open one).
5. Review the PR: the `tokens.json` diff, the generated diff, and the Vercel previews of the app and Storybook.
6. Merge with **Create a merge commit**, never squash. `design/tokens` is a long-lived branch; a squash gives
   `main` different commits and the next PR conflicts.
7. Optional: **Styles & Variables → Export to Figma** in Tokens Studio to refresh the Figma variables.

Lint and Coverage fail on the plugin's own commit (tokens without generated files). That is expected; the CI commit right after it is the one that counts.

### Change a token from code

When: a refactor or a new token a component needs before it exists in Figma.

1. Edit `tokens.json` on a feature branch, run `bun run build:tokens` and `bun run test:update`, and open a PR as usual.
2. After it merges, bring `design/tokens` up to date so Tokens Studio sees it:
   `git switch design/tokens && git pull && git merge origin/main && git push`
3. In Tokens Studio, **Pull from GitHub**, then **Export to Figma**.

### One-time setup

Already done for this repo; repeat only for a new Figma file, a new GitHub token or a fork.

| Where | What |
| --- | --- |
| GitHub → Settings → Developer settings | Fine-grained token: only this repo, **Contents: Read and write** |
| Figma → Actions → Plugins | Run **Tokens Studio for Figma** in the design file |
| Tokens Studio → Settings → Sync → GitHub | Repo `emunhoz/spotifood`, branch `design/tokens`, file `packages/tokens/tokens.json` |
| GitHub → Settings → Actions → General | **Read and write permissions** + **Allow GitHub Actions to create and approve pull requests** |
| GitHub → Settings → General → Pull Requests | Allow **merge commits** |

### Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| Tokens Studio: "no commit found for ref design/tokens" | Branch was deleted (e.g. "delete branch after merge") | `git push origin origin/main:refs/heads/design/tokens` |
| PR "has conflicts" | A previous tokens PR was squash-merged | `git switch design/tokens && git merge origin/main`, keep the newer files, push |
| Workflow red on tests | A real test broke (snapshots are rewritten automatically) | Read the run log; fix in a code PR |
| Figma shows Light and Dark as two collections | Figma's free plan allows one mode per collection | Expected; components bind to `Light` |

Tokens Studio's free plan syncs a single file only; that is why the sets live in one `tokens.json` instead of one file per set.
