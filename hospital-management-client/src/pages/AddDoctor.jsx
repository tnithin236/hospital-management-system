import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

function AddDoctor() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    specialization: '',
    phoneNumber: '',
    email: '',
    departmentId: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/departments').then(res => setDepartments(res.data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/doctors', { ...form, departmentId: Number(form.departmentId) });
      navigate('/doctors');
    } catch (err) {
      setError('Failed to create doctor.');
      console.error(err);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth : "600px" }}>
      <h2>Add Doctor</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input type="text" name="firstName" className="form-control" value={form.firstName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input type="text" name="lastName" className="form-control" value={form.lastName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Specialization</label>
          <input type="text" name="specialization" className="form-control" value={form.specialization} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input type="text" name="phoneNumber" className="form-control" value={form.phoneNumber} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Department</label>
          <select name="departmentId" className="form-select" value={form.departmentId} onChange={handleChange} required>
            <option value="">-- Select Department --</option>
            {departments.map(dept => (
              <option key={dept.id} value={dept.id}>{dept.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Save Doctor</button>
      </form>
    </div>
  );
}

export default AddDoctor;