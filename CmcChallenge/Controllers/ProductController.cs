using CmcChallenge.Core.Interfaces;
using CmcChallenge.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace CmcChallenge.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly ILogger<ProductController> _logger;
        private readonly IProductRepository productRepository;

        public ProductController(ILogger<ProductController> logger, IProductRepository productRepository)
        {
            _logger = logger;
            this.productRepository = productRepository;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<Product>))]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await productRepository.GetAllAsync();
            return Ok(products);
        }
    }
}