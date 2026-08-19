# Hospital Management System

A full-stack Hospital Management System built with ASP.NET Core, Entity Framework Core, PostgreSQL, and React.

## Features

- **Patient Management** — register, view, edit, and delete patient records
- **Doctor & Department Management** — organize doctors by department
- **Appointments** — schedule appointments between patients and doctors, with validation
- **Prescriptions** — create prescriptions with multiple medicines, with automatic, transactional stock reduction
- **Medicine Inventory** — track stock levels with low-stock warnings
- **Billing** — generate invoices with multiple line items and record payments, with automatic status tracking (Unpaid / Partially Paid / Paid)
- **Staff Management** — manage staff, attendance records, and doctor schedules

## Tech Stack

**Backend:**
- ASP.NET Core Web API
- Entity Framework Core
- PostgreSQL

**Frontend:**
- React (Vite)
- React Router
- Bootstrap
- Axios

## Project Structure
hospital_management/
├── HospitalManagement.Api/ # ASP.NET Core backend
│ ├── Controllers/ # API endpoints
│ ├── Models/ # Entity classes
│ ├── Data/ # DbContext
│ └── Migrations/ # EF Core migrations
└── hospital-management-client/ # React frontend
└── src/
├── pages/ # Page components
├── components/ # Shared components (Navbar)
└── api/ # Axios config


## Getting Started

### Backend
```bash
cd HospitalManagement.Api
dotnet restore
dotnet ef database update
dotnet run
```

### Frontend
```bash
cd hospital-management-client
npm install
npm run dev
```

The API runs on `http://localhost:5033` and the frontend on `http://localhost:5173`.

## Database

Requires a local PostgreSQL instance. Update the connection string in `HospitalManagement.Api/appsettings.json` with your credentials before running migrations.
