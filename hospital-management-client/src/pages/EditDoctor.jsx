import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';

function EditDoctor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get(`/doctors/${id}`).then(res => setForm(res.data));
    api.get('/departments').then(res => setDepartments(res.data));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/doctors/${id}`, { ...form, id: Number(id), departmentId: Number(form.departmentId) });
      navigate('/doctors');
    } catch (err) {
      setError('Failed to update doctor.');
      console.error(err);
    }
  };

  if (!form) return <p className="mt-5 text-center">Loading...</p>;

  return (
    <div className="container mt-5" style={{ maxWidth : "600px" }}>
      <h2>Edit Doctor</h2>
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
          <input type="email" name="email" className="form-control" value={form.email || ''} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Department</label>
          <select name="departmentId" className="form-select" value={form.departmentId} onChange={handleChange} required>
            {departments.map(dept => (
              <option key={dept.id} value={dept.id}>{dept.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Update Doctor</button>
      </form>
    </div>
  );
}

export default EditDoctor;