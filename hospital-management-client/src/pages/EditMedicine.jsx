import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';

function EditMedicine() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get(`/medicines/${id}`).then(res => setForm(res.data));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/medicines/${id}`, {
        ...form,
        id: Number(id),
        price: Number(form.price),
        stockQuantity: Number(form.stockQuantity),
      });
      navigate('/medicines');
    } catch (err) {
      setError('Failed to update medicine.');
      console.error(err);
    }
  };

  if (!form) return <p className="mt-5 text-center">Loading...</p>;

  return (
    <div className="container mt-5" style={{ maxWidth : "600px" }}>
      <h2>Edit Medicine</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" name="name" className="form-control" value={form.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Manufacturer</label>
          <input type="text" name="manufacturer" className="form-control" value={form.manufacturer || ''} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="number" step="0.01" name="price" className="form-control" value={form.price} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Stock Quantity</label>
          <input type="number" name="stockQuantity" className="form-control" value={form.stockQuantity} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Update Medicine</button>
      </form>
    </div>
  );
}

export default EditMedicine;