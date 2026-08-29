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

  const statusBadge = (status) => {
    const map = { 0: 'bg-danger', 1: 'bg-warning text-dark', 2: 'bg-success' };
    const labels = { 0: 'Unpaid', 1: 'Partially Paid', 2: 'Paid' };
    return <span className={`badge ${map[status]}`}>{labels[status]}</span>;
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Invoices</h3>
        <Link to="/invoices/add" className="btn btn-primary">+ Add Invoice</Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="text-center py-5 text-muted">
          <div className="spinner-border spinner-border-sm me-2" role="status"></div>
          Loading invoices...
        </div>
      ) : invoices.length === 0 ? (
        <div className="card shadow-sm">
          <div className="card-body text-center py-5 text-muted">No invoices yet. Add your first one above.</div>
        </div>
      ) : (
        invoices.map(inv => {
          const total = inv.items.reduce((sum, item) => sum + item.amount, 0);
          const paid = inv.payments.reduce((sum, p) => sum + p.amountPaid, 0);
          return (
            <div key={inv.id} className="card shadow-sm mb-3">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <h5 className="card-title mb-0">
                    {inv.patient ? `${inv.patient.firstName} ${inv.patient.lastName}` : inv.patientId}
                  </h5>
                  {statusBadge(inv.status)}
                </div>
                <p className="text-muted small mb-3">Invoice #{inv.id} &middot; {new Date(inv.createdAt).toLocaleDateString()}</p>
                <table className="table table-sm mb-3">
                  <thead>
                    <tr className="text-muted small">
                      <th>Description</th>
                      <th className="text-end">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inv.items.map(item => (
                      <tr key={item.id}>
                        <td>{item.description}</td>
                        <td className="text-end">₹{item.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="d-flex justify-content-between align-items-center border-top pt-3">
                  <div className="small">
                    <span className="text-muted me-3">Total: <strong className="text-dark">₹{total}</strong></span>
                    <span className="text-muted me-3">Paid: <strong className="text-dark">₹{paid}</strong></span>
                    <span className="text-muted">Balance: <strong className={total - paid > 0 ? 'text-danger' : 'text-success'}>₹{total - paid}</strong></span>
                  </div>
                  {inv.status !== 2 && (
                    <Link to={`/invoices/${inv.id}/pay`} className="btn btn-sm btn-success">Record Payment</Link>
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Invoices;