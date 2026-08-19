namespace HospitalManagement.Api.Models
{
    public enum InvoiceStatus
    {
        Unpaid,
        PartiallyPaid,
        Paid
    }

    public class Invoice
    {
        public int Id { get; set; }

        public int PatientId { get; set; }
        public Patient? Patient { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public InvoiceStatus Status { get; set; } = InvoiceStatus.Unpaid;

        public ICollection<InvoiceItem> Items { get; set; } = new List<InvoiceItem>();
        public ICollection<Payment> Payments { get; set; } = new List<Payment>();

        // Calculated, not stored in DB — total of all items
        [System.Text.Json.Serialization.JsonIgnore]
        public decimal TotalAmount => Items.Sum(i => i.Amount);
    }
}