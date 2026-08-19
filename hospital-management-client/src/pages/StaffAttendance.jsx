import { useState, useEffect } from 'react';
import api from '../api/axios';

function StaffAttendance() {
  const [records, setRecords] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [staffId, setStaffId] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState(0);
  const [error, setError] = useState(null);

  const loadRecords = () => {
    api.get('/staffattendance').then(res => setRecords(res.data));
  };

  useEffect(() => {
    loadRecords();
    api.get('/staff').then(res => setStaffList(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/staffattendance', {
        staffId: Number(staffId),
        date,
        status: Number(status),
      });
      setStaffId('');
      setDate('');
      setStatus(0);
      loadRecords();
    } catch (err) {
      setError('Failed to mark attendance.');
      console.error(err);
    }
  };

  const statusLabel = (s) => ['Present', 'Absent', 'Half Day', 'On Leave'][s];

  return (
    <div className="container mt-5">
      <h2>Staff Attendance</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit} className="row g-2 align-items-end mb-4">
        <div className="col-md-4">
          <label className="form-label">Staff Member</label>
          <select className="form-select" value={staffId} onChange={e => setStaffId(e.target.value)} required>
            <option value="">-- Select --</option>
            {staffList.map(s => (
              <option key={s.id} value={s.id}>{s.firstName} {s.lastName}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Date</label>
          <input type="date" className="form-control" value={date} onChange={e => setDate(e.target.value)} required />
        </div>
        <div className="col-md-3">
          <label className="form-label">Status</label>
          <select className="form-select" value={status} onChange={e => setStatus(e.target.value)}>
            <option value={0}>Present</option>
            <option value={1}>Absent</option>
            <option value={2}>Half Day</option>
            <option value={3}>On Leave</option>
          </select>
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-primary w-100">Mark</button>
        </div>
      </form>

      <table className="table table-striped">
        <thead>
          <tr><th>ID</th><th>Staff</th><th>Date</th><th>Status</th></tr>
        </thead>
        <tbody>
          {records.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.staff ? `${r.staff.firstName} ${r.staff.lastName}` : r.staffId}</td>
              <td>{r.date}</td>
              <td>{statusLabel(r.status)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StaffAttendance;