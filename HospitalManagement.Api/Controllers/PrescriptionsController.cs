using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HospitalManagement.Api.Data;
using HospitalManagement.Api.Models;

namespace HospitalManagement.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PrescriptionsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PrescriptionsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Prescription>>> GetPrescriptions()
        {
            return await _context.Prescriptions
                .Include(p => p.Patient)
                .Include(p => p.Doctor)
                .Include(p => p.Items).ThenInclude(i => i.Medicine)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Prescription>> GetPrescription(int id)
        {
            var prescription = await _context.Prescriptions
                .Include(p => p.Patient)
                .Include(p => p.Doctor)
                .Include(p => p.Items).ThenInclude(i => i.Medicine)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (prescription == null) return NotFound();
            return prescription;
        }

        [HttpPost]
        public async Task<ActionResult<Prescription>> CreatePrescription(Prescription prescription)
        {
            // Validate patient and doctor exist
            var patientExists = await _context.Patients.AnyAsync(p => p.Id == prescription.PatientId);
            if (!patientExists) return BadRequest("Patient does not exist.");

            var doctorExists = await _context.Doctors.AnyAsync(d => d.Id == prescription.DoctorId);
            if (!doctorExists) return BadRequest("Doctor does not exist.");

            // Use a transaction so prescription + stock updates succeed or fail together
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                foreach (var item in prescription.Items)
                {
                    var medicine = await _context.Medicines.FindAsync(item.MedicineId);
                    if (medicine == null)
                        return BadRequest($"Medicine with id {item.MedicineId} does not exist.");

                    if (medicine.StockQuantity < item.Quantity)
                        return BadRequest($"Insufficient stock for {medicine.Name}. Available: {medicine.StockQuantity}, Requested: {item.Quantity}");

                    medicine.StockQuantity -= item.Quantity;
                }

                _context.Prescriptions.Add(prescription);
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return CreatedAtAction(nameof(GetPrescription), new { id = prescription.Id }, prescription);
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }
    }
}