using CmcChallenge.Core.Interfaces;
using CmcChallenge.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace CmcChallenge.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CountryController : ControllerBase
    {
        private readonly ILogger<CountryController> _logger;
        private readonly ICountryRepository countryRepository;

        public CountryController(ILogger<CountryController> logger, ICountryRepository countryRepository)
        {
            _logger = logger;
            this.countryRepository = countryRepository;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<Country>))]
        public async Task<IActionResult> GetAllCountries()
        {
            var countries = await countryRepository.GetAllAsync();
            return Ok(countries);
        }

        [HttpGet]
        [Route("default")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Country))]
        public async Task<IActionResult> GetDefaultCountry()
        {
            var defaultCountry = await countryRepository.GetDefaultAsync();
            return Ok(defaultCountry);
        }
    }
}