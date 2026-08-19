import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

function AddPrescription() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [patientId, setPatientId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState([{ medicineId: '', quantity: 1, dosage: '' }]);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/patients').then(res => setPatients(res.data));
    api.get('/doctors').then(res => setDoctors(res.data));
    api.get('/medicines').then(res => setMedicines(res.data));
  }, []);

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItemRow = () => {
    setItems([...items, { medicineId: '', quantity: 1, dosage: '' }]);
  };

  const removeItemRow = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/prescriptions', {
        patientId: Number(patientId),
        doctorId: Number(doctorId),
        notes,
        items: items.map(item => ({
          medicineId: Number(item.medicineId),
          quantity: Number(item.quantity),
          dosage: item.dosage,
        })),
      });
      navigate('/prescriptions');
    } catch (err) {
      setError(err.response?.data || 'Failed to create prescription. Check medicine stock.');
      console.error(err);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth : "700px" }}>
      <h2>Add Prescription</h2>
      {error && <p className="text-danger">{JSON.stringify(error)}</p>}
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
        <div className="mb-3">
          <label className="form-label">Doctor</label>
          <select className="form-select" value={doctorId} onChange={e => setDoctorId(e.target.value)} required>
            <option value="">-- Select Doctor --</option>
            {doctors.map(d => (
              <option key={d.id} value={d.id}>{d.firstName} {d.lastName}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Notes</label>
          <textarea className="form-control" value={notes} onChange={e => setNotes(e.target.value)} />
        </div>

        <h5>Medicines</h5>
        {items.map((item, index) => (
          <div key={index} className="row g-2 mb-2 align-items-center">
            <div className="col-5">
              <select
                className="form-select"
                value={item.medicineId}
                onChange={e => updateItem(index, 'medicineId', e.target.value)}
                required
              >
                <option value="">-- Medicine --</option>
                {medicines.map(m => (
                  <option key={m.id} value={m.id}>{m.name} (stock: {m.stockQuantity})</option>
                ))}
              </select>
            </div>
            <div className="col-2">
              <input
                type="number"
                min="1"
                className="form-control"
                placeholder="Qty"
                value={item.quantity}
                onChange={e => updateItem(index, 'quantity', e.target.value)}
                required
              />
            </div>
            <div className="col-4">
              <input
                type="text"
                className="form-control"
                placeholder="Dosage (e.g. 1 tab twice a day)"
                value={item.dosage}
                onChange={e => updateItem(index, 'dosage', e.target.value)}
              />
            </div>
            <div className="col-1">
              {items.length > 1 && (
                <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => removeItemRow(index)}>×</button>
              )}
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-outline-secondary btn-sm mb-3" onClick={addItemRow}>
          + Add Medicine Row
        </button>

        <div>
          <button type="submit" className="btn btn-primary">Save Prescription</button>
        </div>
      </form>
    </div>
  );
}

export default AddPrescription;