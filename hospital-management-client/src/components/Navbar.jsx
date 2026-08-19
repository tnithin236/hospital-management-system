import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">Hospital Management</Link>
      <div className="navbar-nav">
        <Link className="nav-link" to="/patients">Patients</Link>
        <Link className="nav-link" to="/doctors">Doctors</Link>
        <Link className="nav-link" to="/appointments">Appointments</Link>
        <Link className="nav-link" to="/departments">Departments</Link>
        <Link className="nav-link" to="/medicines">Medicines</Link>
        <Link className="nav-link" to="/prescriptions">Prescriptions</Link>
        <Link className="nav-link" to="/invoices">Invoices</Link>
        <Link className="nav-link" to="/staff">Staff</Link>
        <Link className="nav-link" to="/attendance">Attendance</Link>
        <Link className="nav-link" to="/schedules">Schedules</Link>
      </div>
      <button
        className="btn btn-outline-light ms-auto"
        onClick={() => {
          localStorage.clear();
          window.location.href = '/login';
        }}
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;