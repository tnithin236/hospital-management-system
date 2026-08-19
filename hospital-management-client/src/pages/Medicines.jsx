import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

function Medicines() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadMedicines = () => {
    api.get('/medicines')
      .then(response => {
        setMedicines(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load medicines.');
        setLoading(false);
        console.error(err);
      });
  };

  useEffect(() => {
    loadMedicines();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this medicine?')) return;
    try {
      await api.delete(`/medicines/${id}`);
      loadMedicines();
    } catch (err) {
      alert('Failed to delete medicine.');
      console.error(err);
    }
  };

  if (loading) return <p>Loading medicines...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-5">
      <h2>Medicines</h2>
      <Link to="/medicines/add" className="btn btn-primary mb-3">+ Add Medicine</Link>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map(m => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.name}</td>
              <td>{m.manufacturer}</td>
              <td>₹{m.price}</td>
              <td className={m.stockQuantity < 10 ? 'text-danger fw-bold' : ''}>{m.stockQuantity}</td>
              <td>
                <Link to={`/medicines/edit/${m.id}`} className="btn btn-sm btn-outline-secondary me-2">Edit</Link>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(m.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Medicines;