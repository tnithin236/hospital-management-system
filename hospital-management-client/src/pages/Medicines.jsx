import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { isAdmin } from '../utils/auth';

function Medicines() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadMedicines = () => {
    setLoading(true);
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

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Medicines</h3>
        <Link to="/medicines/add" className="btn btn-primary">+ Add Medicine</Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card shadow-sm">
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-5 text-muted">
              <div className="spinner-border spinner-border-sm me-2" role="status"></div>
              Loading medicines...
            </div>
          ) : medicines.length === 0 ? (
            <div className="text-center py-5 text-muted">No medicines yet. Add your first medicine above.</div>
          ) : (
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Manufacturer</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th className="text-end pe-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map(m => (
                  <tr key={m.id}>
                    <td className="text-muted">#{m.id}</td>
                    <td className="fw-medium">{m.name}</td>
                    <td>{m.manufacturer}</td>
                    <td>₹{m.price}</td>
                    <td>
                      {m.stockQuantity < 10 ? (
                        <span className="badge bg-danger">{m.stockQuantity} left</span>
                      ) : (
                        <span className="badge bg-success-subtle text-success-emphasis">{m.stockQuantity}</span>
                      )}
                    </td>
                    <td className="text-end pe-3">
                      <Link to={`/medicines/edit/${m.id}`} className="btn btn-sm btn-outline-secondary me-2">Edit</Link>
                      {isAdmin() && (
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(m.id)}>Delete</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Medicines;