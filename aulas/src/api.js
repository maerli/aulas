import axios from 'axios'

const {hostname} = window.location
const port = 5000
const api = axios.create({ baseURL: `http://${hostname}:${port}` } )
export default api