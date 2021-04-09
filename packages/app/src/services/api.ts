import axios from 'axios'

const HTTP_CLIENT = axios.create({
  baseURL: 'https://api.spotify.com/v1/browse'
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

export default HTTP_CLIENT
