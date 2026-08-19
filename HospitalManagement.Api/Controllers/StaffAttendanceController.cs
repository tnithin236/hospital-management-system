using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HospitalManagement.Api.Data;
using HospitalManagement.Api.Models;

namespace HospitalManagement.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StaffAttendanceController : ControllerBase
    {
        private readonly AppDbContext _context;

        public StaffAttendanceController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<StaffAttendance>>> GetAttendance()
        {
            return await _context.StaffAttendances.Include(a => a.Staff).ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<StaffAttendance>> MarkAttendance(StaffAttendance attendance)
        {
            var staffExists = await _context.Staff.AnyAsync(s => s.Id == attendance.StaffId);
            if (!staffExists) return BadRequest("Staff member does not exist.");

            _context.StaffAttendances.Add(attendance);
            await _context.SaveChangesAsync();
            return Ok(attendance);
        }
    }
}