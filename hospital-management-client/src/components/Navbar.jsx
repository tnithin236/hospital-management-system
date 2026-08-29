import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const linkClass = (path) =>
    `nav-link ${location.pathname.startsWith(path) ? 'fw-bold text-white' : 'text-white-50'}`;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark px-4 shadow-sm" style={{ backgroundColor: '#1e3a5f' }}>
      <Link className="navbar-brand fw-bold" to="/">🏥 Hospital Management</Link>
      <div className="navbar-nav flex-row flex-wrap gap-1">
        <Link className={linkClass('/patients')} to="/patients">Patients</Link>
        <Link className={linkClass('/doctors')} to="/doctors">Doctors</Link>
        <Link className={linkClass('/appointments')} to="/appointments">Appointments</Link>
        <Link className={linkClass('/departments')} to="/departments">Departments</Link>
        <Link className={linkClass('/medicines')} to="/medicines">Medicines</Link>
        <Link className={linkClass('/prescriptions')} to="/prescriptions">Prescriptions</Link>
        <Link className={linkClass('/invoices')} to="/invoices">Invoices</Link>
        <Link className={linkClass('/staff')} to="/staff">Staff</Link>
        <Link className={linkClass('/attendance')} to="/attendance">Attendance</Link>
        <Link className={linkClass('/schedules')} to="/schedules">Schedules</Link>
      </div>
      <button
        className="btn btn-sm btn-outline-light ms-auto"
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