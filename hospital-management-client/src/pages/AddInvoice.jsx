import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

function AddInvoice() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [patientId, setPatientId] = useState('');
  const [items, setItems] = useState([{ description: '', amount: '' }]);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/patients').then(res => setPatients(res.data));
  }, []);

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItemRow = () => setItems([...items, { description: '', amount: '' }]);
  const removeItemRow = (index) => setItems(items.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/invoices', {
        patientId: Number(patientId),
        items: items.map(item => ({ description: item.description, amount: Number(item.amount) })),
      });
      navigate('/invoices');
    } catch (err) {
      setError('Failed to create invoice.');
      console.error(err);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth : "700px" }}>
      <h2>Add Invoice</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Patient</label>
          <select className="form-select" value={patientId} onChange={e => setPatientId(e.target.value)} required>
            <option value="">-- Select Patient --</option>
            {patients.map(p => (
              <option key={p.id} value={p.id}>{p.firstName} {p.lastName}</option>
            ))}
          </select>
        </div>

        <h5>Billing Items</h5>
        {items.map((item, index) => (
          <div key={index} className="row g-2 mb-2 align-items-center">
            <div className="col-7">
              <input
                type="text"
                className="form-control"
                placeholder="Description (e.g. Consultation Fee)"
                value={item.description}
                onChange={e => updateItem(index, 'description', e.target.value)}
                required
              />
            </div>
            <div className="col-3">
              <input
                type="number"
                step="0.01"
                className="form-control"
                placeholder="Amount"
                value={item.amount}
                onChange={e => updateItem(index, 'amount', e.target.value)}
                required
              />
            </div>
            <div className="col-2">
              {items.length > 1 && (
                <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => removeItemRow(index)}>×</button>
              )}
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-outline-secondary btn-sm mb-3" onClick={addItemRow}>
          + Add Item Row
        </button>

        <div>
          <button type="submit" className="btn btn-primary">Save Invoice</button>
        </div>
      </form>
    </div>
  );
}

export default AddInvoice;