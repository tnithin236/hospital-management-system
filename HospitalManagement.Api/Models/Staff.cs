namespace HospitalManagement.Api.Models
{
    public class Staff
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty; // e.g. "Nurse", "Receptionist", "Lab Technician"
        public string PhoneNumber { get; set; } = string.Empty;
        public string? Email { get; set; }
        public DateTime HiredAt { get; set; } = DateTime.UtcNow;

        public ICollection<StaffAttendance> AttendanceRecords { get; set; } = new List<StaffAttendance>();
    }
}