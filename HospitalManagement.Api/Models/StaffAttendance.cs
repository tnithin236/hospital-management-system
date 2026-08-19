namespace HospitalManagement.Api.Models
{
    public enum AttendanceStatus
    {
        Present,
        Absent,
        HalfDay,
        OnLeave
    }

    public class StaffAttendance
    {
        public int Id { get; set; }

        public int StaffId { get; set; }
        public Staff? Staff { get; set; }

        public DateOnly Date { get; set; }
        public AttendanceStatus Status { get; set; }
    }
}