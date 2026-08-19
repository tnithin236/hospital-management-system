import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

function AddPatient() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 'Male',
    phoneNumber: '',
    email: '',
    address: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/patients', form);
      navigate('/patients');
    } catch (err) {
      setError('Failed to create patient. Check the form and try again.');
      console.error(err);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth : "600px" }}>
      <h2>Add Patient</h2>
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
          <label className="form-label">Date of Birth</label>
          <input type="date" name="dateOfBirth" className="form-control" value={form.dateOfBirth} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Gender</label>
          <select name="gender" className="form-select" value={form.gender} onChange={handleChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
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
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input type="text" name="address" className="form-control" value={form.address} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Save Patient</button>
      </form>
    </div>
  );
}

export default AddPatient;