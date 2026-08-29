import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { isAdmin } from '../utils/auth';

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDepartments = () => {
    setLoading(true);
    api.get('/departments')
      .then(response => {
        setDepartments(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load departments.');
        setLoading(false);
        console.error(err);
      });
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this department?')) return;
    try {
      await api.delete(`/departments/${id}`);
      loadDepartments();
    } catch (err) {
      alert('Failed to delete department. It may still have doctors linked to it.');
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Departments</h3>
        <Link to="/departments/add" className="btn btn-primary">+ Add Department</Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card shadow-sm">
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-5 text-muted">
              <div className="spinner-border spinner-border-sm me-2" role="status"></div>
              Loading departments...
            </div>
          ) : departments.length === 0 ? (
            <div className="text-center py-5 text-muted">No departments yet. Add your first department above.</div>
          ) : (
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th className="text-end pe-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {departments.map(dept => (
                  <tr key={dept.id}>
                    <td className="text-muted">#{dept.id}</td>
                    <td className="fw-medium">{dept.name}</td>
                    <td>{dept.description}</td>
                    <td className="text-end pe-3">
                      <Link to={`/departments/edit/${dept.id}`} className="btn btn-sm btn-outline-secondary me-2">Edit</Link>
                      {isAdmin() && (
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(dept.id)}>Delete</button>
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

export default Departments;