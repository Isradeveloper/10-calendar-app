import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useState } from 'react'
import { localizer, getMessagesEs } from '../../helpers'
import { useUiStore, useCalendarStore } from '../../hooks'
import { CalendarEventBox, CalendarModal, NavBar, FabAddNew } from '../components'
import { FabDelete } from '../components/FabDelete'

export function CalendarPage () {
  const { events, setActiveEvent, hasEventSelected } = useCalendarStore()
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

  const { openDateModal } = useUiStore()

  const eventStyleGetter = (event, start, isSelected) => {
    const style = {
      backgroundColor: '#4A0DD8',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }

  const onDoubleClick = (event) => {
    openDateModal()
  }

  const onSelect = (event) => {
    setActiveEvent(event)
  }

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event)
  }

  return (
    <>
      <NavBar />

      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 'calc( 100vh - 80px )' }}
        messages={getMessagesEs()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEventBox
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      {/* <FabAddNew />
      {
        (hasEventSelected)
          ? <FabDelete />
          : ''
      } */}

      <FabAddNew />
      <FabDelete />

      <CalendarModal />
    </>

  )
}
