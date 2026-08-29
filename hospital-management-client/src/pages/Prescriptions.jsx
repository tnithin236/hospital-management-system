import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/prescriptions')
      .then(response => {
        setPrescriptions(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load prescriptions.');
        setLoading(false);
        console.error(err);
      });
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Prescriptions</h3>
        <Link to="/prescriptions/add" className="btn btn-primary">+ Add Prescription</Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="text-center py-5 text-muted">
          <div className="spinner-border spinner-border-sm me-2" role="status"></div>
          Loading prescriptions...
        </div>
      ) : prescriptions.length === 0 ? (
        <div className="card shadow-sm">
          <div className="card-body text-center py-5 text-muted">No prescriptions yet. Add your first one above.</div>
        </div>
      ) : (
        prescriptions.map(p => (
          <div key={p.id} className="card shadow-sm mb-3">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h5 className="card-title mb-1">
                    {p.patient ? `${p.patient.firstName} ${p.patient.lastName}` : p.patientId}
                  </h5>
                  <p className="text-muted small mb-2">
                    Prescription #{p.id} &middot; Dr. {p.doctor ? `${p.doctor.firstName} ${p.doctor.lastName}` : p.doctorId} &middot;{' '}
                    {new Date(p.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {p.notes && <p className="mb-3 fst-italic text-secondary">"{p.notes}"</p>}
              <table className="table table-sm mb-0">
                <thead>
                  <tr className="text-muted small">
                    <th>Medicine</th>
                    <th>Quantity</th>
                    <th>Dosage</th>
                  </tr>
                </thead>
                <tbody>
                  {p.items.map(item => (
                    <tr key={item.id}>
                      <td className="fw-medium">{item.medicine ? item.medicine.name : item.medicineId}</td>
                      <td><span className="badge bg-light text-dark border">{item.quantity}</span></td>
                      <td className="text-muted">{item.dosage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Prescriptions;