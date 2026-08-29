import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAppointments = () => {
    setLoading(true);
    api.get('/appointments')
      .then(response => {
        setAppointments(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load appointments.');
        setLoading(false);
        console.error(err);
      });
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this appointment?')) return;
    try {
      await api.delete(`/appointments/${id}`);
      loadAppointments();
    } catch (err) {
      alert('Failed to delete appointment.');
      console.error(err);
    }
  };

  const statusBadge = (status) => {
    const map = { 0: 'bg-primary', 1: 'bg-success', 2: 'bg-secondary' };
    const labels = { 0: 'Scheduled', 1: 'Completed', 2: 'Cancelled' };
    return <span className={`badge ${map[status]}`}>{labels[status]}</span>;
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Appointments</h3>
        <Link to="/appointments/add" className="btn btn-primary">+ Add Appointment</Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card shadow-sm">
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-5 text-muted">
              <div className="spinner-border spinner-border-sm me-2" role="status"></div>
              Loading appointments...
            </div>
          ) : appointments.length === 0 ? (
            <div className="text-center py-5 text-muted">No appointments yet. Add your first appointment above.</div>
          ) : (
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Date &amp; Time</th>
                  <th>Status</th>
                  <th>Notes</th>
                  <th className="text-end pe-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map(appt => (
                  <tr key={appt.id}>
                    <td className="text-muted">#{appt.id}</td>
                    <td className="fw-medium">{appt.patient ? `${appt.patient.firstName} ${appt.patient.lastName}` : appt.patientId}</td>
                    <td>{appt.doctor ? `${appt.doctor.firstName} ${appt.doctor.lastName}` : appt.doctorId}</td>
                    <td>{new Date(appt.appointmentDateTime).toLocaleString()}</td>
                    <td>{statusBadge(appt.status)}</td>
                    <td className="text-muted small">{appt.notes}</td>
                    <td className="text-end pe-3">
                      <Link to={`/appointments/edit/${appt.id}`} className="btn btn-sm btn-outline-secondary me-2">Edit</Link>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(appt.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Appointments;