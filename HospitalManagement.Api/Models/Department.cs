namespace HospitalManagement.Api.Models
{
    public class Department
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }

        // Navigation property: one department has many doctors
        public ICollection<Doctor> Doctors { get; set; } = new List<Doctor>();
    }
}