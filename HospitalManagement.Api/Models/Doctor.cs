namespace HospitalManagement.Api.Models
{
    public class Doctor
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Specialization { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string? Email { get; set; }

        // Foreign key
        public int DepartmentId { get; set; }
        // Navigation property: many doctors belong to one department
        public Department? Department { get; set; }
    }
}