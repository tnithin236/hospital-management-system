using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HospitalManagement.Api.Data;
using HospitalManagement.Api.Models;

namespace HospitalManagement.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DoctorSchedulesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DoctorSchedulesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DoctorSchedule>>> GetSchedules()
        {
            return await _context.DoctorSchedules.Include(s => s.Doctor).ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<DoctorSchedule>> CreateSchedule(DoctorSchedule schedule)
        {
            var doctorExists = await _context.Doctors.AnyAsync(d => d.Id == schedule.DoctorId);
            if (!doctorExists) return BadRequest("Doctor does not exist.");

            if (schedule.EndTime <= schedule.StartTime)
                return BadRequest("EndTime must be after StartTime.");

            _context.DoctorSchedules.Add(schedule);
            await _context.SaveChangesAsync();
            return Ok(schedule);
        }
    }
}