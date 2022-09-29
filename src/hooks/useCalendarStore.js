import { useDispatch, useSelector } from 'react-redux'
import { calendarApi } from '../api'
import { convertEventsToDateEvent } from '../helpers'
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent, onLoadsEvents } from '../store/calendar/calendarSlice'

export const useCalendarStore = () => {
  const dispatch = useDispatch()
  const { events, activeEvent } = useSelector(state => state.calendar)
  const { user } = useSelector(state => state.auth)

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async (calendarEvent) => {
    // TODO: Update event

    // Todo bien
    if (calendarEvent.id) {
      // Actualizando
      dispatch(onUpdateEvent(calendarEvent))
    } else {
      // Creando
      const { data } = await calendarApi.post('/events/', calendarEvent)
      console.log(data)
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user })) // User autenticado
    }
  }

  const startDeletingEvent = () => {
    // LLegar al backend
    dispatch(onDeleteEvent())
  }

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/events/')
      const events = convertEventsToDateEvent(data.eventos)
      dispatch(onLoadsEvents(events))
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
