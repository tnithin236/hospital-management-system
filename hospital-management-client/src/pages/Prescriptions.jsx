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

  if (loading) return <p>Loading prescriptions...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-5">
      <h2>Prescriptions</h2>
      <Link to="/prescriptions/add" className="btn btn-primary mb-3">+ Add Prescription</Link>
      {prescriptions.map(p => (
        <div key={p.id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">
              Prescription #{p.id} — {p.patient ? `${p.patient.firstName} ${p.patient.lastName}` : p.patientId}
            </h5>
            <p className="card-subtitle mb-2 text-muted">
              Doctor: {p.doctor ? `${p.doctor.firstName} ${p.doctor.lastName}` : p.doctorId} |{' '}
              {new Date(p.createdAt).toLocaleDateString()}
            </p>
            {p.notes && <p>{p.notes}</p>}
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>Medicine</th>
                  <th>Quantity</th>
                  <th>Dosage</th>
                </tr>
              </thead>
              <tbody>
                {p.items.map(item => (
                  <tr key={item.id}>
                    <td>{item.medicine ? item.medicine.name : item.medicineId}</td>
                    <td>{item.quantity}</td>
                    <td>{item.dosage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Prescriptions;