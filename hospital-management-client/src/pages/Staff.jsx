import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { isAdmin } from '../utils/auth';

function Staff() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  const loadStaff = () => {
    setLoading(true);
    api.get('/staff')
      .then(response => {
        setStaff(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load staff.');
        setLoading(false);
        console.error(err);
      });
  };

  useEffect(() => {
    loadStaff();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this staff member?')) return;
    try {
      await api.delete(`/staff/${id}`);
      loadStaff();
    } catch (err) {
      alert('Failed to delete staff member.');
      console.error(err);
    }
  };

  const filtered = staff.filter(s => {
    const q = search.toLowerCase();
    return (
      `${s.firstName} ${s.lastName}`.toLowerCase().includes(q) ||
      (s.role || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Staff</h3>
        <Link to="/staff/add" className="btn btn-primary">+ Add Staff</Link>
      </div>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by name or role..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card shadow-sm">
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-5 text-muted">
              <div className="spinner-border spinner-border-sm me-2" role="status"></div>
              Loading staff...
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-5 text-muted">
              {staff.length === 0 ? 'No staff yet. Add your first staff member above.' : 'No staff match your search.'}
            </div>
          ) : (
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th className="text-end pe-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(s => (
                  <tr key={s.id}>
                    <td className="text-muted">#{s.id}</td>
                    <td className="fw-medium">{s.firstName} {s.lastName}</td>
                    <td><span className="badge bg-light text-dark border">{s.role}</span></td>
                    <td>{s.phoneNumber}</td>
                    <td>{s.email}</td>
                    <td className="text-end pe-3">
                      <Link to={`/staff/edit/${s.id}`} className="btn btn-sm btn-outline-secondary me-2">Edit</Link>
                      {isAdmin() && (
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(s.id)}>Delete</button>
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

export default Staff;