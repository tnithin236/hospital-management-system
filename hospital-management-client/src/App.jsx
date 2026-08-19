import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Patients from './pages/Patients';
import AddPatient from './pages/AddPatient';
import EditPatient from './pages/EditPatient';
import Doctors from './pages/Doctors';
import AddDoctor from './pages/AddDoctor';
import EditDoctor from './pages/EditDoctor';
import Departments from './pages/Departments';
import AddDepartment from './pages/AddDepartment';
import EditDepartment from './pages/EditDepartment';
import Appointments from './pages/Appointments';
import AddAppointment from './pages/AddAppointment';
import Medicines from './pages/Medicines';
import AddMedicine from './pages/AddMedicine';
import EditMedicine from './pages/EditMedicine';
import Prescriptions from './pages/Prescriptions';
import AddPrescription from './pages/AddPrescription';
import EditAppointment from './pages/EditAppointment';
import Invoices from './pages/Invoices';
import AddInvoice from './pages/AddInvoice';
import RecordPayment from './pages/RecordPayment';
import Staff from './pages/Staff';
import AddStaff from './pages/AddStaff';
import EditStaff from './pages/EditStaff';
import StaffAttendance from './pages/StaffAttendance';
import DoctorSchedules from './pages/DoctorSchedules';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Patients />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/patients/add" element={<AddPatient />} />
        <Route path="/patients/edit/:id" element={<EditPatient />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/add" element={<AddDoctor />} />
        <Route path="/doctors/edit/:id" element={<EditDoctor />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/departments/add" element={<AddDepartment />} />
        <Route path="/departments/edit/:id" element={<EditDepartment />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/appointments/add" element={<AddAppointment />} />
        <Route path="/medicines" element={<Medicines />} />
        <Route path="/medicines/add" element={<AddMedicine />} />
        <Route path="/medicines/edit/:id" element={<EditMedicine />} />
        <Route path="/prescriptions" element={<Prescriptions />} />
        <Route path="/prescriptions/add" element={<AddPrescription />} />
        <Route path="/appointments/edit/:id" element={<EditAppointment />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/invoices/add" element={<AddInvoice />} />
        <Route path="/invoices/:id/pay" element={<RecordPayment />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/staff/add" element={<AddStaff />} />
        <Route path="/staff/edit/:id" element={<EditStaff />} />
        <Route path="/attendance" element={<StaffAttendance />} />
        <Route path="/schedules" element={<DoctorSchedules />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;