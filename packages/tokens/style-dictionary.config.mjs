import { readFileSync } from 'node:fs'
import StyleDictionary from 'style-dictionary'

const HEADER = 'Generated from tokens.json — do not edit'
// Tokens Studio single-file format: one top-level key per token set.
const sets = JSON.parse(readFileSync('tokens.json', 'utf8'))
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
  return flatten(sets.dark).map((token) => `${cssName(token)}: ${token.value};`)
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
  tokens: { ...sets.light, ...sets.core },
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
