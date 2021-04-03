const URL_REDIRECT = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/#/' : process.env.REACT_APP_URL_PRODUCTION
export const SPOTIFY_LOGIN_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${URL_REDIRECT}`;
