import { tokens } from './generated/tokens'

export type Theme = typeof tokens
export type Palette = Theme['palette']
export type Typography = Theme['typography']
export type Attributes = Theme['attributes']
export type Breakpoints = Theme['breakpoints']

const createTheme = ({ palette, typography, attributes, breakpoints }: Theme): Theme => ({ palette, typography, attributes, breakpoints })

const { typography } = tokens

export default createTheme(tokens)
export { typography }
