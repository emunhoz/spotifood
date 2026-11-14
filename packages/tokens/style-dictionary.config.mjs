import { readFileSync } from 'node:fs'
import StyleDictionary from 'style-dictionary'

const HEADER = 'Generated from tokens.json — do not edit'
// Tokens Studio single-file format: one top-level key per token set.
const sets = JSON.parse(readFileSync('tokens.json', 'utf8'))

// Tokens Studio color modifiers: only "mix" in sRGB is used (primaryDark/Light follow primary).
const REFERENCE = /^\{color\.(\w+)\}$/
const toRgb = (hex) => [1, 3, 5].map((i) => Number.parseInt(hex.slice(i, i + 2), 16))
const toHex = (rgb) => `#${rgb.map((c) => Math.round(c).toString(16).padStart(2, '0')).join('').toUpperCase()}`

function mix(hex, otherHex, amount) {
  const other = toRgb(otherHex)
  return toHex(toRgb(hex).map((channel, i) => channel + (other[i] - channel) * amount))
}

function resolveColor(token, colors) {
  const ref = REFERENCE.exec(token.$value)?.[1]
  if (!ref) return token
  const modify = token.$extensions?.['studio.tokens']?.modify
  const base = colors[ref].$value
  return { ...token, $value: modify ? mix(base, modify.color, Number(modify.value)) : base }
}

// O(n) over the color group
function resolveColors(set) {
  const entries = Object.entries(set.color).map(([key, token]) =>
    key.startsWith('$') ? [key, token] : [key, resolveColor(token, set.color)]
  )
  return { ...set, color: Object.fromEntries(entries) }
}
const THEME_KEYS = { color: 'palette' }
const PX_TYPES = new Set(['dimension'])

const toKebab = (value) => value.replaceAll(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
const cssName = (token) => `--sf-${token.path.map(toKebab).join('-')}`
const rawValue = (token) => token.original.$value ?? token.original.value
const isDimension = (token) => PX_TYPES.has(token.$type ?? token.type)

function typedValue(token) {
  const value = rawValue(token)
  return isDimension(token) ? Number.parseFloat(value) : value
}

function nestTokens(tokens) {
  return tokens.reduce((tree, token) => {
    const [group, ...rest] = token.path
    const path = [THEME_KEYS[group] ?? group, ...rest]
    const parentPath = path.slice(0, -1)
    const parent = parentPath.reduce((node, key) => (node[key] ??= {}), tree)
    parent[path.at(-1)] = typedValue(token)
    return tree
  }, {})
}

function cssBlock(selector, declarations, indent) {
  const pad = ' '.repeat(indent)
  const lines = declarations.map((line) => `${pad}  ${line}`).join('\n')
  return `${pad}${selector} {\n${lines}\n${pad}}`
}

// The dark set only overrides colors, so it becomes a CSS override block.
function flatten(node, path = []) {
  return Object.entries(node)
    .filter(([key]) => !key.startsWith('$'))
    .flatMap(([key, value]) =>
      '$value' in value ? [{ path: [...path, key], value: value.$value }] : flatten(value, [...path, key])
    )
}

function darkDeclarations() {
  return flatten(resolveColors(sets.dark)).map((token) => `${cssName(token)}: ${token.value};`)
}

StyleDictionary.registerFormat({
  name: 'sf/typescript-const',
  format: ({ dictionary }) =>
    `// ${HEADER}\nexport const tokens = ${JSON.stringify(nestTokens(dictionary.allTokens), null, 2)} as const\n`
})

StyleDictionary.registerFormat({
  name: 'sf/css-variables',
  format: ({ dictionary }) => {
    const light = dictionary.allTokens.map((token) => `${cssName(token)}: ${rawValue(token)};`)
    const dark = darkDeclarations()
    return [
      `/* ${HEADER} */`,
      cssBlock(':root', light, 0),
      '@media (prefers-color-scheme: dark) {',
      cssBlock(':root:not([data-theme="light"])', dark, 2),
      '}',
      cssBlock(':root[data-theme="dark"]', dark, 0)
    ].join('\n') + '\n'
  }
})

export default {
  tokens: { ...resolveColors(sets.light), ...sets.core },
  platforms: {
    ts: {
      transforms: ['name/kebab'],
      buildPath: 'src/generated/',
      files: [{ destination: 'tokens.ts', format: 'sf/typescript-const' }]
    },
    css: {
      transforms: ['name/kebab'],
      buildPath: 'src/generated/',
      files: [{ destination: 'tokens.css', format: 'sf/css-variables' }]
    }
  }
}
