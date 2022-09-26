export function NavBar() {
  return (

    <div className="navbar navbar-dark bg-black mb-4 px-4">

      <span className="navbar-brand">
        <i className="fas fa-calendar-alt" />
        &nbsp;
        Isra
      </span>

      <button type="button" className="btn btn-outline-danger">
        <i className="fas fa-sign-out" />
        <span>Salir</span>
      </button>

    </div>
  );
}
