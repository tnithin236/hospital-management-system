namespace HospitalManagement.Api.Models
{
    public class Medicine
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Manufacturer { get; set; }
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }
    }
}