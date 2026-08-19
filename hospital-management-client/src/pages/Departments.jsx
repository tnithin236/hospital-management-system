import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDepartments = () => {
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

  if (loading) return <p>Loading departments...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-5">
      <h2>Departments</h2>
      <Link to="/departments/add" className="btn btn-primary mb-3">+ Add Department</Link>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map(dept => (
            <tr key={dept.id}>
              <td>{dept.id}</td>
              <td>{dept.name}</td>
              <td>{dept.description}</td>
              <td>
                <Link to={`/departments/edit/${dept.id}`} className="btn btn-sm btn-outline-secondary me-2">Edit</Link>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(dept.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Departments;