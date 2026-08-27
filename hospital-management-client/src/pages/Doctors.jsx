import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { isAdmin } from '../utils/auth';

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDoctors = () => {
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

  if (loading) return <p>Loading doctors...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-5">
      <h2>Doctors</h2>
      <Link to="/doctors/add" className="btn btn-primary mb-3">+ Add Doctor</Link>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Specialization</th>
            <th>Department</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map(doc => (
            <tr key={doc.id}>
              <td>{doc.id}</td>
              <td>{doc.firstName} {doc.lastName}</td>
              <td>{doc.specialization}</td>
              <td>{doc.department ? doc.department.name : doc.departmentId}</td>
              <td>{doc.phoneNumber}</td>
              <td>
                <Link to={`/doctors/edit/${doc.id}`} className="btn btn-sm btn-outline-secondary me-2">Edit</Link>
                {isAdmin() && (
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(doc.id)}>Delete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Doctors;