using CmcChallenge.Core.Models;

namespace CmcChallenge.Core.Interfaces
{
    public interface IProductRepository
    {
        Task<Product?> GetAsync(int id);
        Task<List<Product>> GetAllAsync();
        Task<Product> CreateAsync(Product Product);
        Task<Product> UpdateAsync(Product Product);
        Task DeleteAsync(int id);
    }
}