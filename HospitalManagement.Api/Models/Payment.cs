namespace HospitalManagement.Api.Models
{
    public enum PaymentMethod
    {
        Cash,
        Card,
        UPI,
        Insurance
    }

    public class Payment
    {
        public int Id { get; set; }

        public int InvoiceId { get; set; }
        public Invoice? Invoice { get; set; }

        public decimal AmountPaid { get; set; }
        public PaymentMethod Method { get; set; }
        public DateTime PaidAt { get; set; } = DateTime.UtcNow;
    }
}