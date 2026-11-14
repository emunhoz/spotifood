# @monorepo/design-tokens

`tokens/*.json` (W3C DTCG format, one file per Tokens Studio set) is the source of truth. Do not edit `src/generated/`.

- `tokens/core.json`: typography, radii, shadows, breakpoints
- `tokens/light.json` / `tokens/dark.json`: color per theme (dark is a placeholder until redesigned in Figma)
- Build: `bun run build:tokens` (Style Dictionary v4) writes `src/generated/tokens.ts` and `tokens.css`.
  `libbuild` runs it before `tsc`. Commit the generated files; CI fails on drift.
- TS: default export is the theme object (light values), named export `typography`.
- CSS custom properties (`--sf-*`, light on `:root`, dark via `prefers-color-scheme` or
  `[data-theme="dark"]`): `@monorepo/design-tokens/src/generated/tokens.css`
- Figma: Tokens Studio syncs these sets with GitHub on the `design/tokens` branch.
