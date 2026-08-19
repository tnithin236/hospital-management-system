import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

function AddDepartment() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', description: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/departments', form);
      navigate('/departments');
    } catch (err) {
      setError('Failed to create department.');
      console.error(err);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth : "600px" }}>
      <h2>Add Department</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" name="name" className="form-control" value={form.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input type="text" name="description" className="form-control" value={form.description} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Save Department</button>
      </form>
    </div>
  );
}

export default AddDepartment;