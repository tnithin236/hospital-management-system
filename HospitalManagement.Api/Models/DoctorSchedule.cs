namespace HospitalManagement.Api.Models
{
    public class DoctorSchedule
    {
        public int Id { get; set; }

        public int DoctorId { get; set; }
        public Doctor? Doctor { get; set; }

        public DayOfWeek DayOfWeek { get; set; } // e.g. Monday
        public TimeOnly StartTime { get; set; }
        public TimeOnly EndTime { get; set; }
    }
}