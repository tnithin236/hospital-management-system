import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';

function EditDepartment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get(`/departments/${id}`).then(res => setForm(res.data));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/departments/${id}`, { ...form, id: Number(id) });
      navigate('/departments');
    } catch (err) {
      setError('Failed to update department.');
      console.error(err);
    }
  };

  if (!form) return <p className="mt-5 text-center">Loading...</p>;

  return (
    <div className="container mt-5" style={{ maxWidth : "600px" }}>
      <h2>Edit Department</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" name="name" className="form-control" value={form.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input type="text" name="description" className="form-control" value={form.description || ''} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Update Department</button>
      </form>
    </div>
  );
}

export default EditDepartment;