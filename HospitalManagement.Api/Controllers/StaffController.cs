using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HospitalManagement.Api.Data;
using HospitalManagement.Api.Models;

namespace HospitalManagement.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StaffController : ControllerBase
    {
        private readonly AppDbContext _context;

        public StaffController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Staff>>> GetStaff()
        {
            return await _context.Staff.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Staff>> GetStaffMember(int id)
        {
            var staff = await _context.Staff.FindAsync(id);
            if (staff == null) return NotFound();
            return staff;
        }

        [HttpPost]
        public async Task<ActionResult<Staff>> CreateStaff(Staff staff)
        {
            _context.Staff.Add(staff);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetStaffMember), new { id = staff.Id }, staff);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStaff(int id, Staff staff)
        {
            if (id != staff.Id) return BadRequest();
            _context.Entry(staff).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStaff(int id)
        {
            var staff = await _context.Staff.FindAsync(id);
            if (staff == null) return NotFound();
            _context.Staff.Remove(staff);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}