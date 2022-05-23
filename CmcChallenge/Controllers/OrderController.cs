using CmcChallenge.Core.Interfaces;
using CmcChallenge.Core.Request;
using Microsoft.AspNetCore.Mvc;

namespace CmcChallenge.Web.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ILogger<OrderController> _logger;
        private readonly IOrderService orderService;

        public OrderController(ILogger<OrderController> logger, IOrderService orderService)
        {
            _logger = logger;
            this.orderService = orderService;
        }

        [HttpPost]
        public async Task<IActionResult> PlaceOrder(OrderRequest orderRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var orderResult = orderService.CreateOrder(orderRequest);
            if (!orderResult)
            {
                return BadRequest("An error occured during the placement of order");
            }
            return Ok();
        }
    }
}
