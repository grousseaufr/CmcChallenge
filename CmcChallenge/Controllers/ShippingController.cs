using CmcChallenge.Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CmcChallenge.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ShippingController : ControllerBase
    {
        private readonly IShippingService shippingService;

        public ShippingController(IShippingService shippingService)
        {
            this.shippingService = shippingService;
        }

        [HttpGet]
        public IActionResult Get(int totalPrice)
        {
            if(totalPrice == 0)
            {
                return BadRequest("Please provide total price");
            }

            return Ok(shippingService.GetShippingCost(totalPrice));
        }
    }
}
