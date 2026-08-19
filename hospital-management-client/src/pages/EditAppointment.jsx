import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';

function EditAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get(`/appointments/${id}`).then(res => {
      const data = res.data;
      setForm({
        patientId: data.patientId,
        doctorId: data.doctorId,
        // Convert ISO datetime to the format datetime-local inputs expect
        appointmentDateTime: data.appointmentDateTime.slice(0, 16),
        status: data.status,
        notes: data.notes || '',
      });
    });
    api.get('/patients').then(res => setPatients(res.data));
    api.get('/doctors').then(res => setDoctors(res.data));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/appointments/${id}`, {
        ...form,
        id: Number(id),
        patientId: Number(form.patientId),
        doctorId: Number(form.doctorId),
        status: Number(form.status),
      });
      navigate('/appointments');
    } catch (err) {
      setError('Failed to update appointment.');
      console.error(err);
    }
  };

  if (!form) return <p className="mt-5 text-center">Loading...</p>;

  return (
    <div className="container mt-5" style={{ maxWidth : "600px" }}>
      <h2>Edit Appointment</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Patient</label>
          <select name="patientId" className="form-select" value={form.patientId} onChange={handleChange} required>
            {patients.map(p => (
              <option key={p.id} value={p.id}>{p.firstName} {p.lastName}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Doctor</label>
          <select name="doctorId" className="form-select" value={form.doctorId} onChange={handleChange} required>
            {doctors.map(d => (
              <option key={d.id} value={d.id}>{d.firstName} {d.lastName} ({d.specialization})</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Date &amp; Time</label>
          <input type="datetime-local" name="appointmentDateTime" className="form-control" value={form.appointmentDateTime} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select name="status" className="form-select" value={form.status} onChange={handleChange}>
            <option value={0}>Scheduled</option>
            <option value={1}>Completed</option>
            <option value={2}>Cancelled</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Notes</label>
          <textarea name="notes" className="form-control" value={form.notes} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Update Appointment</button>
      </form>
    </div>
  );
}

export default EditAppointment;