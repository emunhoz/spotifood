import axios from 'axios'

export const filterData = () =>
  axios.get('http://www.mocky.io/v2/5a25fade2e0000213aa90776')
