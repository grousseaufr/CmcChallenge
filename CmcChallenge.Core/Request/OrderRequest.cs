using System.ComponentModel.DataAnnotations;

namespace CmcChallenge.Core.Request
{
    public class OrderRequest
    {
        [Required(ErrorMessage = "Please provide a currency code")]
        public string CurrencyCode { get; set; }

        [Required(ErrorMessage = "User id is missing")]
        public int? UserId { get; set; }

        [Required(ErrorMessage = "No items in cart")]

        public List<OrderItemRequest>? Items { get; set; }
    }
}
