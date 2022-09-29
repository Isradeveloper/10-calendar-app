import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { calendarApi } from '../api'
import { convertEventsToDateEvent } from '../helpers'
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent, onLoadEvents } from '../store/calendar/calendarSlice'

export const useCalendarStore = () => {
  const dispatch = useDispatch()
  const { events, activeEvent } = useSelector(state => state.calendar)
  const { user } = useSelector(state => state.auth)

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async (calendarEvent) => {
    try {
      // TODO: Update event

      // Todo bien
      if (calendarEvent.id) {
      // Actualizando
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
        dispatch(onUpdateEvent({ ...calendarEvent, user }))
      } else {
      // Creando
        const { data } = await calendarApi.post('/events/', calendarEvent)
        console.log(data)
        dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user })) // User autenticado
      }
    } catch (error) {
      console.log(error)
      Swal.fire('Error al guardar', error.response.data.msg, 'error')
    }
  }

  const startDeletingEvent = async () => {
    // LLegar al backend
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`)
      dispatch(onDeleteEvent())
    } catch (error) {
      console.log(error)
      Swal.fire('Error al eliminar evento', error.response.data.msg, 'error')
    }
  }

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/events/')
      const events = convertEventsToDateEvent(data.eventos)
      dispatch(onLoadEvents(events))
    } catch (error) {
      console.log('Error al cargar eventos ')
    }
  }

  return {
    // propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    // Metodos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents
  }
}
