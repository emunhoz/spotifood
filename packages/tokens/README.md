# @monorepo/design-tokens

`tokens.json` (W3C DTCG format) is the source of truth. Do not edit `src/generated/`.

- Build: `bun run build:tokens` (Style Dictionary v4) writes `src/generated/tokens.ts` and `tokens.css`.
  `libbuild` runs it before `tsc`. Commit the generated files; CI fails on drift.
- TS: default export is the theme object, named export `typography`.
- CSS custom properties (`--sf-*`, light on `:root`, dark via `prefers-color-scheme` or
  `[data-theme="dark"]`): `@monorepo/design-tokens/src/generated/tokens.css`
- Dark values live in `$extensions.mode.dark` and are a placeholder until redesigned in Figma.
- Figma (Tokens Studio) will sync to `tokens.json`.
