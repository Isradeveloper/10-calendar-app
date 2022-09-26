import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar/pages/CalendarPage';

export function AppRouter() {

  const authStatus = 'not-authenticated';

  return (
    <Routes>
      {
        (authStatus === 'not-authenticated')
        // Si no está autenticado e ingresa a auth - se genera el login
          ? <Route path="auth/*" element={<LoginPage />} />
        // Si está autenticado e ingresa otro path - se genera calendar
          : <Route path="/*" element={<CalendarPage />} />
      }

      {/* Si no está autenticado  */}
      <Route path="/*" element={<Navigate to="auth/" />} />
    </Routes>
  );
}
