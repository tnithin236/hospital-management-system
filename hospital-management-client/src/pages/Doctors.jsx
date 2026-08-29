import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { isAdmin } from '../utils/auth';

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDoctors = () => {
    setLoading(true);
    api.get('/doctors')
      .then(response => {
        setDoctors(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load doctors.');
        setLoading(false);
        console.error(err);
      });
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this doctor?')) return;
    try {
      await api.delete(`/doctors/${id}`);
      loadDoctors();
    } catch (err) {
      alert('Failed to delete doctor.');
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Doctors</h3>
        <Link to="/doctors/add" className="btn btn-primary">+ Add Doctor</Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card shadow-sm">
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-5 text-muted">
              <div className="spinner-border spinner-border-sm me-2" role="status"></div>
              Loading doctors...
            </div>
          ) : doctors.length === 0 ? (
            <div className="text-center py-5 text-muted">No doctors yet. Add your first doctor above.</div>
          ) : (
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Specialization</th>
                  <th>Department</th>
                  <th>Phone</th>
                  <th className="text-end pe-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map(doc => (
                  <tr key={doc.id}>
                    <td className="text-muted">#{doc.id}</td>
                    <td className="fw-medium">{doc.firstName} {doc.lastName}</td>
                    <td>{doc.specialization}</td>
                    <td><span className="badge bg-light text-dark border">{doc.department ? doc.department.name : doc.departmentId}</span></td>
                    <td>{doc.phoneNumber}</td>
                    <td className="text-end pe-3">
                      <Link to={`/doctors/edit/${doc.id}`} className="btn btn-sm btn-outline-secondary me-2">Edit</Link>
                      {isAdmin() && (
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(doc.id)}>Delete</button>
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

export default Doctors;