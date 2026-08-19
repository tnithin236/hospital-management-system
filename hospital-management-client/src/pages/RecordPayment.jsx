import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';

function RecordPayment() {
  const { id } = useParams(); // invoice id
  const navigate = useNavigate();
  const [amountPaid, setAmountPaid] = useState('');
  const [method, setMethod] = useState(0);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/payments', {
        invoiceId: Number(id),
        amountPaid: Number(amountPaid),
        method: Number(method),
      });
      navigate('/invoices');
    } catch (err) {
      setError('Failed to record payment.');
      console.error(err);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth : "500px" }}>
      <h2>Record Payment</h2>
      <p className="text-muted">For Invoice #{id}</p>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Amount Paid</label>
          <input type="number" step="0.01" className="form-control" value={amountPaid} onChange={e => setAmountPaid(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Payment Method</label>
          <select className="form-select" value={method} onChange={e => setMethod(e.target.value)}>
            <option value={0}>Cash</option>
            <option value={1}>Card</option>
            <option value={2}>UPI</option>
            <option value={3}>Insurance</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success">Record Payment</button>
      </form>
    </div>
  );
}

export default RecordPayment;