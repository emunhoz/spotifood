import type { Playlist } from './filter-playlists'

// Generated covers: real album art is copyrighted, and inline SVG costs zero requests.
// Each genre gets a motif; the playlist id seeds the layout, so every cover is unique and stable.

type CoverInput = Pick<Playlist, 'id' | 'genre' | 'cover'>
type Random = () => number
type Motif = (random: Random) => string

const INK = '#fff'

// FNV-1a: turns the id into a 32-bit seed
function hashSeed (text: string): number {
  let hash = 2166136261
  for (const char of text) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619)
  return hash >>> 0
}

// mulberry32: a 4-line seeded PRNG, random-looking but identical on every render
function createRandom (seed: number): Random {
  let state = seed
  return () => {
    state = (state + 0x6d2b79f5) | 0
    let mixed = Math.imul(state ^ (state >>> 15), 1 | state)
    mixed = (mixed + Math.imul(mixed ^ (mixed >>> 7), 61 | mixed)) ^ mixed
    return ((mixed ^ (mixed >>> 14)) >>> 0) / 4294967296
  }
}

const n = (value: number): string => value.toFixed(1)
const range = (count: number): number[] => Array.from({ length: count }, (_, index) => index)

const waves: Motif = (random) => range(5).map((index) => {
  const y = 22 + index * 14 + random() * 6
  const amplitude = 4 + random() * 7
  return `<path d="M-5 ${n(y)} Q22.5 ${n(y - amplitude)} 50 ${n(y)} T105 ${n(y)}" fill="none" stroke="${INK}" stroke-opacity="${n(0.15 + index * 0.06)}" stroke-width="${n(1.5 + random() * 2)}" stroke-linecap="round"/>`
}).join('')

const rings: Motif = (random) => {
  const cx = 30 + random() * 40
  const cy = 30 + random() * 40
  return range(6).map((index) =>
    `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(8 + index * 11)}" fill="none" stroke="${INK}" stroke-opacity="${n(0.4 - index * 0.05)}" stroke-width="1.5"/>`
  ).join('')
}

const grid: Motif = (random) => {
  const angle = -20 + random() * 40
  const dots = range(49).map((index) => {
    const x = 2 + (index % 7) * 16
    const y = 2 + Math.floor(index / 7) * 16
    return `<circle cx="${x}" cy="${y}" r="${n(0.8 + random() * 1.4)}" fill="${INK}" fill-opacity="0.45"/>`
  }).join('')
  return `<g transform="rotate(${n(angle)} 50 50)">${dots}</g>`
}

const stripes: Motif = (random) => {
  const bars = range(7).map((index) =>
    `<rect x="${n(-40 + index * 24 + random() * 6)}" y="-40" width="${n(5 + random() * 8)}" height="180" fill="${INK}" fill-opacity="0.18"/>`
  ).join('')
  return `<g transform="rotate(${n(25 + random() * 20)} 50 50)">${bars}</g>`
}

const dots: Motif = (random) => range(14).map(() =>
  `<circle cx="${n(random() * 100)}" cy="${n(random() * 100)}" r="${n(1.5 + random() * 8)}" fill="${INK}" fill-opacity="${n(0.15 + random() * 0.3)}"/>`
).join('')

const confetti: Motif = (random) => range(18).map(() => {
  const x = random() * 100
  const y = random() * 100
  return `<rect x="${n(x)}" y="${n(y)}" width="3" height="7" rx="1" fill="${INK}" fill-opacity="0.55" transform="rotate(${n(random() * 180)} ${n(x)} ${n(y)})"/>`
}).join('')

const MOTIFS: Record<string, Motif> = {
  Jazz: waves,
  Soul: waves,
  'Lo-fi': rings,
  Electronic: grid,
  Rock: stripes,
  Pop: confetti,
  Samba: dots,
  'Bossa Nova': dots,
  Latin: dots
}

export function coverSvg ({ id, genre, cover: [from, to] }: CoverInput): string {
  const random = createRandom(hashSeed(id))
  const motif = (MOTIFS[genre] ?? dots)(random)
  const glow = `<circle cx="${n(15 + random() * 30)}" cy="${n(10 + random() * 25)}" r="55" fill="url(#l)"/>`

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient><radialGradient id="l"><stop stop-color="${INK}" stop-opacity="0.35"/><stop offset="1" stop-color="${INK}" stop-opacity="0"/></radialGradient></defs><rect width="100" height="100" fill="url(#g)"/>${glow}${motif}</svg>`
}

export function coverDataUrl (playlist: CoverInput): string {
  return `data:image/svg+xml,${encodeURIComponent(coverSvg(playlist))}`
}

export function listenUrl (playlistName: string): string {
  return `https://open.spotify.com/search/${encodeURIComponent(playlistName)}`
}
