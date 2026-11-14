import StyleDictionary from 'style-dictionary'

const HEADER = 'Generated from tokens.json — do not edit'
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

function darkDeclarations(tokens) {
  return tokens
    .filter((token) => token.original.$extensions?.mode?.dark)
    .map((token) => `${cssName(token)}: ${token.original.$extensions.mode.dark};`)
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
    const dark = darkDeclarations(dictionary.allTokens)
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
  source: ['tokens.json'],
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
