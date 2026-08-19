import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

function AddMedicine() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', manufacturer: '', price: '', stockQuantity: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/medicines', {
        ...form,
        price: Number(form.price),
        stockQuantity: Number(form.stockQuantity),
      });
      navigate('/medicines');
    } catch (err) {
      setError('Failed to create medicine.');
      console.error(err);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth : "600px" }}>
      <h2>Add Medicine</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" name="name" className="form-control" value={form.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Manufacturer</label>
          <input type="text" name="manufacturer" className="form-control" value={form.manufacturer} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="number" step="0.01" name="price" className="form-control" value={form.price} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Stock Quantity</label>
          <input type="number" name="stockQuantity" className="form-control" value={form.stockQuantity} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Save Medicine</button>
      </form>
    </div>
  );
}

export default AddMedicine;