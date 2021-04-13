import HTTP_CLIENT from './api'
import objectWithValues from '../helpers/object-with-values'

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
  return HTTP_CLIENT.get('/browse/featured-playlists', {
    params: { ...objectWithValues(params) }
  })
}
