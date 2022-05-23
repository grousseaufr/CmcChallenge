using CmcChallenge.Core.Models;

namespace CmcChallenge.Core.Interfaces
{
    public interface ICountryRepository
    {
        Task<List<Country>> GetAllAsync();
        Task<Country?> GetAsync(int id);
        Task<Country?> GetDefaultAsync();
    }
}