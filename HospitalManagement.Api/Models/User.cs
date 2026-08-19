namespace HospitalManagement.Api.Models
{
    public enum UserRole
    {
        Admin,
        Doctor,
        Staff,
        Receptionist
    }

    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public UserRole Role { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}