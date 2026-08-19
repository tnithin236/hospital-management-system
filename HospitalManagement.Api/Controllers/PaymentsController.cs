using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HospitalManagement.Api.Data;
using HospitalManagement.Api.Models;

namespace HospitalManagement.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PaymentsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Payment>>> GetPayments()
        {
            return await _context.Payments.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Payment>> CreatePayment(Payment payment)
        {
            var invoice = await _context.Invoices
                .Include(i => i.Items)
                .Include(i => i.Payments)
                .FirstOrDefaultAsync(i => i.Id == payment.InvoiceId);

            if (invoice == null) return BadRequest("Invoice does not exist.");

            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                _context.Payments.Add(payment);
                await _context.SaveChangesAsync();

                // Recalculate total paid so far (including this new payment)
                var totalPaid = invoice.Payments.Sum(p => p.AmountPaid) + payment.AmountPaid;
                var totalDue = invoice.Items.Sum(i => i.Amount);

                if (totalPaid >= totalDue)
                    invoice.Status = InvoiceStatus.Paid;
                else if (totalPaid > 0)
                    invoice.Status = InvoiceStatus.PartiallyPaid;

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return Ok(payment);
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }
    }
}