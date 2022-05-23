using System.ComponentModel.DataAnnotations;

namespace CmcChallenge.Core.Request
{
    public class OrderItemRequest
    {
        [Required(ErrorMessage = "Please provide a product id")]
        public int? ProductId { get; set; }

        [Required(ErrorMessage = "Please provide a product quantity")]
        public int? Quantity { get; set; }
    }
}
