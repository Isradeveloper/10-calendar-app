import React from 'react'
import { useForm } from '../../hooks'
import './LoginPage.css'

const loginFormFields = {
  loginEmail: '',
  loginPassword: ''
}

const registerFormFields = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerPassword2: ''
}

export function LoginPage () {
  const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields)
  const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange: onRegisterInputChange } = useForm(registerFormFields)

  const loginSubmit = (event) => {
    event.preventDefault()
    console.log({ loginEmail, loginPassword })
  }

  const registerSubmit = (event) => {
    event.preventDefault()
    console.log({ registerName, registerEmail, registerPassword, registerPassword2 })
  }

  return (
    <div className='container-fluid login-container'>

      <div className='row d-flex'>

        <div className='col-md-6 login'>
          <h3>Ingreso</h3>

          <form onSubmit={loginSubmit}>
            <div className='mt-5'>
              <input type='email' name='loginEmail' value={loginEmail} onChange={onLoginInputChange} className='form-control mb-3' id='email-login' placeholder='name@example.com' />
              <input type='password' name='loginPassword' value={loginPassword} onChange={onLoginInputChange} className='form-control mb-3' id='password-login' placeholder='Ingrese contraseña' />
              <button type='submit' className='btn-submit login'>Login</button>
            </div>
          </form>

        </div>

        <div className='col-md-6 register'>
          <h3>Registro</h3>
          <form onSubmit={registerSubmit}>
            <div className='mt-5'>
              <input type='text' name='registerName' value={registerName} onChange={onRegisterInputChange} className='form-control mb-3' id='name-register' placeholder='Ingrese nombre' />
              <input type='email' name='registerEmail' value={registerEmail} onChange={onRegisterInputChange} className='form-control mb-3' id='email-register' placeholder='name@example.com' />
              <input type='password' name='registerPassword' value={registerPassword} onChange={onRegisterInputChange} className='form-control mb-3' id='password-register' placeholder='Ingrese contraseña' />
              <input type='password' name='registerPassword2' value={registerPassword2} onChange={onRegisterInputChange} className='form-control mb-3' id='password-repeat-register' placeholder='Repita la contraseña' />
              <button type='submit' className='btn-submit register'>Crear cuenta</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
