import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAppointments = () => {
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

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-5">
      <h2>Appointments</h2>
      <Link to="/appointments/add" className="btn btn-primary mb-3">+ Add Appointment</Link>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Date &amp; Time</th>
            <th>Status</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appt => (
            <tr key={appt.id}>
              <td>{appt.id}</td>
              <td>{appt.patient ? `${appt.patient.firstName} ${appt.patient.lastName}` : appt.patientId}</td>
              <td>{appt.doctor ? `${appt.doctor.firstName} ${appt.doctor.lastName}` : appt.doctorId}</td>
              <td>{new Date(appt.appointmentDateTime).toLocaleString()}</td>
              <td>{appt.status}</td>
              <td>{appt.notes}</td>
              <td>
                <Link to={`/appointments/edit/${appt.id}`} className="btn btn-sm btn-outline-secondary me-2">Edit</Link>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(appt.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Appointments;