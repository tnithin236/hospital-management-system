import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { isAdmin } from '../utils/auth';

function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  const loadPatients = () => {
    setLoading(true);
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

  const filtered = patients.filter(p => {
    const q = search.toLowerCase();
    return (
      `${p.firstName} ${p.lastName}`.toLowerCase().includes(q) ||
      (p.phoneNumber || '').includes(q) ||
      (p.email || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Patients</h3>
        <Link to="/patients/add" className="btn btn-primary">+ Add Patient</Link>
      </div>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by name, phone, or email..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card shadow-sm">
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-5 text-muted">
              <div className="spinner-border spinner-border-sm me-2" role="status"></div>
              Loading patients...
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-5 text-muted">
              {patients.length === 0 ? 'No patients yet. Add your first patient above.' : 'No patients match your search.'}
            </div>
          ) : (
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th className="text-end pe-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(patient => (
                  <tr key={patient.id}>
                    <td className="text-muted">#{patient.id}</td>
                    <td className="fw-medium">{patient.firstName} {patient.lastName}</td>
                    <td>{patient.gender}</td>
                    <td>{patient.phoneNumber}</td>
                    <td>{patient.email}</td>
                    <td className="text-end pe-3">
                      <Link to={`/patients/edit/${patient.id}`} className="btn btn-sm btn-outline-secondary me-2">Edit</Link>
                      {isAdmin() && (
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(patient.id)}>Delete</button>
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

export default Patients;