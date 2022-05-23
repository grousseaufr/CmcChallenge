using CmcChallenge.Core.Interfaces;
using CmcChallenge.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace CmcChallenge.Infrastructure.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private CmcAppDbContext Context { get; }

        public ProductRepository(CmcAppDbContext context)
        {
            Context = context;
            context.Database.EnsureCreated();
        }

        public async Task<Product?> GetAsync(int id)
        {
            return await Context.Products.SingleOrDefaultAsync(x => x.ProductId == id);
        }

        public async Task<List<Product>> GetAllAsync()
        {
            return await Context.Products.ToListAsync();
        }

        public async Task<Product> CreateAsync(Product Product)
        {
            Context.Add(Product);
            await Context.SaveChangesAsync();

            return Product;
        }

        public async Task<Product> UpdateAsync(Product Product)
        {
            Context.Update(Product);
            await Context.SaveChangesAsync();

            return Product;
        }

        public async Task DeleteAsync(int id)
        {
            var Product = await Context.Products.SingleOrDefaultAsync(x => x.ProductId == id);

            if (Product != null)
            {
                Context.Remove(Product);
                Context.SaveChangesAsync();
            }
        }
    }
}
