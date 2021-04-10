import HTTP_CLIENT from './api'

const URL_REDIRECT =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/#/callback'
    : process.env.REACT_APP_URL_PRODUCTION

export const SPOTIFY_LOGIN_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${URL_REDIRECT}`

export const featuredPlaylist = () => HTTP_CLIENT.get('/featured-playlists')
