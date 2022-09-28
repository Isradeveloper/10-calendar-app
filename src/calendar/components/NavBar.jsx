import { useAuthStore } from '../../hooks'

export function NavBar () {
  const { startLogout, user } = useAuthStore()
  return (

    <div className='navbar navbar-dark bg-black mb-4 px-4'>

      <span className='navbar-brand'>
        <i className='fas fa-calendar-alt' />
        &nbsp;
        {user.name}
      </span>

      <button type='button' className='btn btn-outline-danger' onClick={(e) => { startLogout() }}>
        <i className='fas fa-sign-out' />
        &nbsp;
        <span>Salir</span>
      </button>

    </div>
  )
}
