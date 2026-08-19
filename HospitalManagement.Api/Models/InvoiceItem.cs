namespace HospitalManagement.Api.Models
{
    public class InvoiceItem
    {
        public int Id { get; set; }

        public int InvoiceId { get; set; }
        public Invoice? Invoice { get; set; }

        public string Description { get; set; } = string.Empty; // e.g. "Consultation Fee"
        public decimal Amount { get; set; }
    }
}