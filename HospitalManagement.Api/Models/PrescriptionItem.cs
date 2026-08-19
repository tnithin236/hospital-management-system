namespace HospitalManagement.Api.Models
{
    public class PrescriptionItem
    {
        public int Id { get; set; }

        public int PrescriptionId { get; set; }
        public Prescription? Prescription { get; set; }

        public int MedicineId { get; set; }
        public Medicine? Medicine { get; set; }

        public int Quantity { get; set; }
        public string? Dosage { get; set; } // e.g. "1 tablet twice a day"
    }
}