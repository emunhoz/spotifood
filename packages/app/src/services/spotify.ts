import HTTP_CLIENT from './api'

const URL_REDIRECT =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/#/callback'
    : process.env.REACT_APP_URL_PRODUCTION

export const SPOTIFY_LOGIN_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${URL_REDIRECT}`

export const featuredPlaylist = (params: {
  locale?: string
  country?: string
  timestamp?: string
  limit?: string
  offset?: string
}) => {
  let paramsWithValues = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== '')
  )

  return HTTP_CLIENT.get('/featured-playlists', {
    params: { ...paramsWithValues }
  })
}
