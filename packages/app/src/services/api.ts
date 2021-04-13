import axios from 'axios'

const HTTP_CLIENT = axios.create({
  baseURL: 'https://api.spotify.com/v1/'
})

HTTP_CLIENT.interceptors.request.use(
  config => {
    const token = localStorage.getItem('@app:token')

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  error => {
    Promise.reject(error)
  }
)

HTTP_CLIENT.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      localStorage.removeItem('@app:token')
      window.location.href = '/'
    }
  }
)

export default HTTP_CLIENT
