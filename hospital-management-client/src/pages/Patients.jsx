import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPatients = () => {
    api.get('/patients')
      .then(response => {
        setPatients(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load patients. Is the API running?');
        setLoading(false);
        console.error(err);
      });
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this patient?')) return;
    try {
      await api.delete(`/patients/${id}`);
      loadPatients();
    } catch (err) {
      alert('Failed to delete patient.');
      console.error(err);
    }
  };

  if (loading) return <p>Loading patients...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-5">
      <h2>Patients</h2>
      <Link to="/patients/add" className="btn btn-primary mb-3">+ Add Patient</Link>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.firstName} {patient.lastName}</td>
              <td>{patient.gender}</td>
              <td>{patient.phoneNumber}</td>
              <td>{patient.email}</td>
              <td>
                <Link to={`/patients/edit/${patient.id}`} className="btn btn-sm btn-outline-secondary me-2">Edit</Link>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(patient.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Patients;