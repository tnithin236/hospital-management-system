import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/invoices')
      .then(response => {
        setInvoices(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load invoices.');
        setLoading(false);
        console.error(err);
      });
  }, []);

  if (loading) return <p>Loading invoices...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  const statusBadge = (status) => {
    const map = { 0: 'bg-danger', 1: 'bg-warning text-dark', 2: 'bg-success' };
    const labels = { 0: 'Unpaid', 1: 'Partially Paid', 2: 'Paid' };
    return <span className={`badge ${map[status]}`}>{labels[status]}</span>;
  };

  return (
    <div className="container mt-5">
      <h2>Invoices</h2>
      <Link to="/invoices/add" className="btn btn-primary mb-3">+ Add Invoice</Link>
      {invoices.map(inv => {
        const total = inv.items.reduce((sum, item) => sum + item.amount, 0);
        const paid = inv.payments.reduce((sum, p) => sum + p.amountPaid, 0);
        return (
          <div key={inv.id} className="card mb-3">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">
                  Invoice #{inv.id} — {inv.patient ? `${inv.patient.firstName} ${inv.patient.lastName}` : inv.patientId}
                </h5>
                {statusBadge(inv.status)}
              </div>
              <p className="card-subtitle mb-2 text-muted mt-1">{new Date(inv.createdAt).toLocaleDateString()}</p>
              <table className="table table-sm">
                <thead>
                  <tr><th>Description</th><th>Amount</th></tr>
                </thead>
                <tbody>
                  {inv.items.map(item => (
                    <tr key={item.id}>
                      <td>{item.description}</td>
                      <td>₹{item.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mb-1"><strong>Total:</strong> ₹{total} &nbsp; <strong>Paid:</strong> ₹{paid} &nbsp; <strong>Balance:</strong> ₹{total - paid}</p>
              {inv.status !== 2 && (
                <Link to={`/invoices/${inv.id}/pay`} className="btn btn-sm btn-success mt-2">Record Payment</Link>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Invoices;