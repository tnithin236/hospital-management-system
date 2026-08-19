import { useState, useEffect } from 'react';
import api from '../api/axios';

function DoctorSchedules() {
  const [schedules, setSchedules] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState(1);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState(null);

  const loadSchedules = () => {
    api.get('/doctorschedules').then(res => setSchedules(res.data));
  };

  useEffect(() => {
    loadSchedules();
    api.get('/doctors').then(res => setDoctors(res.data));
  }, []);

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/doctorschedules', {
        doctorId: Number(doctorId),
        dayOfWeek: Number(dayOfWeek),
        startTime,
        endTime,
      });
      setDoctorId('');
      setStartTime('');
      setEndTime('');
      loadSchedules();
    } catch (err) {
      setError(err.response?.data || 'Failed to add schedule.');
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Doctor Schedules</h2>
      {error && <p className="text-danger">{JSON.stringify(error)}</p>}
      <form onSubmit={handleSubmit} className="row g-2 align-items-end mb-4">
        <div className="col-md-3">
          <label className="form-label">Doctor</label>
          <select className="form-select" value={doctorId} onChange={e => setDoctorId(e.target.value)} required>
            <option value="">-- Select --</option>
            {doctors.map(d => (
              <option key={d.id} value={d.id}>{d.firstName} {d.lastName}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Day</label>
          <select className="form-select" value={dayOfWeek} onChange={e => setDayOfWeek(e.target.value)}>
            {days.map((d, i) => (
              <option key={i} value={i}>{d}</option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <label className="form-label">Start Time</label>
          <input type="time" className="form-control" value={startTime} onChange={e => setStartTime(e.target.value)} required />
        </div>
        <div className="col-md-2">
          <label className="form-label">End Time</label>
          <input type="time" className="form-control" value={endTime} onChange={e => setEndTime(e.target.value)} required />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-primary w-100">Add</button>
        </div>
      </form>

      <table className="table table-striped">
        <thead>
          <tr><th>ID</th><th>Doctor</th><th>Day</th><th>Start</th><th>End</th></tr>
        </thead>
        <tbody>
          {schedules.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.doctor ? `${s.doctor.firstName} ${s.doctor.lastName}` : s.doctorId}</td>
              <td>{days[s.dayOfWeek]}</td>
              <td>{s.startTime}</td>
              <td>{s.endTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DoctorSchedules;