// Generated gradient covers: real album art is copyrighted, and inline SVG costs zero requests.
export function coverDataUrl ([from, to]: [string, string]): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="1" height="1" fill="url(#g)"/></svg>`

  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

export function listenUrl (playlistName: string): string {
  return `https://open.spotify.com/search/${encodeURIComponent(playlistName)}`
}
