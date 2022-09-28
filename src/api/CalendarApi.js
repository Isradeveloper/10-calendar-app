/* eslint-disable padded-blocks */
import axios from 'axios'

const calendarApi = axios.create({
  baseURL: 'https://mern-calendar-israel-trujillo.herokuapp.com/api'
})

// Todo: configurar interceptores
calendarApi.interceptors.request.use(config => {

  config.headers = {
    ...config.headers,
    'x-token': localStorage.getItem('token')
  }

  return config
})

export default calendarApi
