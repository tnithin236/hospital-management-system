import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

function AddAppointment() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    patientId: '',
    doctorId: '',
    appointmentDateTime: '',
    notes: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/patients').then(res => setPatients(res.data));
    api.get('/doctors').then(res => setDoctors(res.data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/appointments', {
        ...form,
        patientId: Number(form.patientId),
        doctorId: Number(form.doctorId),
      });
      navigate('/appointments');
    } catch (err) {
      setError(err.response?.data || 'Failed to create appointment.');
      console.error(err);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth : "600px" }}>
      <h2>Add Appointment</h2>
      {error && <p className="text-danger">{JSON.stringify(error)}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Patient</label>
          <select name="patientId" className="form-select" value={form.patientId} onChange={handleChange} required>
            <option value="">-- Select Patient --</option>
            {patients.map(p => (
              <option key={p.id} value={p.id}>{p.firstName} {p.lastName}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Doctor</label>
          <select name="doctorId" className="form-select" value={form.doctorId} onChange={handleChange} required>
            <option value="">-- Select Doctor --</option>
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
          <label className="form-label">Notes</label>
          <textarea name="notes" className="form-control" value={form.notes} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Save Appointment</button>
      </form>
    </div>
  );
}

export default AddAppointment;