import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

function AddStaff() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: '', lastName: '', role: '', phoneNumber: '', email: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/staff', form);
      navigate('/staff');
    } catch (err) {
      setError('Failed to create staff member.');
      console.error(err);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth : "600px" }}>
      <h2>Add Staff</h2>
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
          <label className="form-label">Role</label>
          <select name="role" className="form-select" value={form.role} onChange={handleChange} required>
            <option value="">-- Select Role --</option>
            <option value="Nurse">Nurse</option>
            <option value="Receptionist">Receptionist</option>
            <option value="Lab Technician">Lab Technician</option>
            <option value="Pharmacist">Pharmacist</option>
            <option value="Cleaner">Cleaner</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input type="text" name="phoneNumber" className="form-control" value={form.phoneNumber} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Save Staff</button>
      </form>
    </div>
  );
}

export default AddStaff;