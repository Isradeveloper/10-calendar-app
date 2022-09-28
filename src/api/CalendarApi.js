import axios from 'axios'

const calendarApi = axios.create({
  baseURL: 'https://mern-calendar-israel-trujillo.herokuapp.com/api'
})

// Todo: configurar interceptores

export default calendarApi
