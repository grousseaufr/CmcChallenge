namespace CmcChallenge.Core.Models
{
    public class Country
    {
        public int CountryId { get; set; }
        public string Name { get; set; }
        public string CurrencyName { get; set; }
        public string CurrencyCode { get; set; }
        public decimal ConversionRateFromAud { get; set; }
        public bool IsDefault { get; set; }
    }
}