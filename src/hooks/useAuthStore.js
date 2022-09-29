/* eslint-disable no-undef */
/* eslint-disable padded-blocks */
import { useDispatch, useSelector } from 'react-redux'
import { calendarApi } from '../api'
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store/auth/authSlice'
import { onLogoutCalendar } from '../store/calendar/calendarSlice'

export const useAuthStore = () => {
  const dispatch = useDispatch()
  const { status, user, errorMessage } = useSelector((state) => state.auth)

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking())
    try {
      const { data } = await calendarApi.post('/auth', { email, password })

      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime())
      dispatch(onLogin({ name: data.name, uid: data.uid }))

    } catch (error) {
      dispatch(onLogout('Credenciales incorrectas'))
      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 10)
    }
  }

  const startRegister = async ({ email, password, name }) => {
    dispatch(onChecking())
    try {
      const { data } = await calendarApi.post('/auth/register', { email, password, name })
      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime())
      dispatch(onLogin({ name: data.name, uid: data.uid }))

    } catch (error) {
      dispatch(onLogout(error.response.data?.msg || '--'))
      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 10)

    }
  }

  const checkAuthToken = async () => { // Si el token no existe, logout. Si existe, se manda el renew del backend
    const token = localStorage.getItem('token')
    if (!token) return dispatch(onLogout())

    try {
      const { data } = await calendarApi.get('/auth/renew')
      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime())
      dispatch(onLogin({ name: data.name, uid: data.uid }))
    } catch (error) {
      localStorage.clear()
      dispatch(onLogout())
    }
  }

  const startLogout = () => {
    localStorage.clear()
    dispatch(onLogout())
    dispatch(onLogoutCalendar())
  }

  return {
    //* Propiedades
    status,
    user,
    errorMessage,

    //* Metodos
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout
  }
}
