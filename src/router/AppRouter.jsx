import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../auth'
import { CalendarPage } from '../calendar/pages/CalendarPage'
import { useAuthStore } from '../hooks'
import { Spinner } from '../ui/components/Spinner'

export function AppRouter () {
  const { status, checkAuthToken } = useAuthStore()
  // const authStatus = 'not-authenticated' // 'authenticated' // not-authenticated;

  useEffect(() => {
    checkAuthToken()
  }, [])

  if (status === 'checking') {
    return (
      <Spinner />
    )
  }

  return (
    <Routes>
      {
        (status === 'not-authenticated')
          // Si no está autenticado e ingresa a auth - se genera el login
          ? (
            <>
              <Route path='/auth/*' element={<LoginPage />} />
              <Route path='/*' element={<Navigate to='auth/login' />} />
            </>
            )
          // Si está autenticado e ingresa otro path - se genera calendar
          : (
            <>
              <Route path='/' element={<CalendarPage />} />
              <Route path='/*' element={<Navigate to='/' />} />
            </>
            )
      }

      {/* Si no está autenticado  */}
      {/* <Route path='/*' element={<Navigate to='auth/' />} /> */}
    </Routes>
  )
}
