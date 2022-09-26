import React from 'react';
import './LoginPage.css';

export function LoginPage() {
  return (
    <div className="container-fluid login-container">

      <div className="row d-flex">

        <div className="col-md-6 login">
          <h3>Ingreso</h3>

          <form>
            <div className="mt-5">
              <input type="email" className="form-control mb-3" id="email-login" placeholder="name@example.com" />
              <input type="password" className="form-control mb-3" id="password-login" placeholder="Ingrese contraseña" />
              <button type="submit" className="btn-submit login">Login</button>
            </div>
          </form>

        </div>

        <div className="col-md-6 register">
          <h3>Registro</h3>
          <form>
            <div className="mt-5">
              <input type="text" className="form-control mb-3" id="name-register" placeholder="Ingrese nombre" />
              <input type="email" className="form-control mb-3" id="email-register" placeholder="name@example.com" />
              <input type="password" className="form-control mb-3" id="password-register" placeholder="Ingrese contraseña" />
              <input type="password" className="form-control mb-3" id="password-repeat-register" placeholder="Repita la contraseña" />
              <button type="submit" className="btn-submit register">Crear cuenta</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
