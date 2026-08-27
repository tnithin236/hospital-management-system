import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { isAdmin } from '../utils/auth';

function Staff() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadStaff = () => {
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

  if (loading) return <p>Loading staff...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-5">
      <h2>Staff</h2>
      <Link to="/staff/add" className="btn btn-primary mb-3">+ Add Staff</Link>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staff.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.firstName} {s.lastName}</td>
              <td>{s.role}</td>
              <td>{s.phoneNumber}</td>
              <td>{s.email}</td>
              <td>
                <Link to={`/staff/edit/${s.id}`} className="btn btn-sm btn-outline-secondary me-2">Edit</Link>
               {isAdmin() && (
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(s.id)}>Delete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Staff;