using CmcChallenge.Core.Interfaces;
using CmcChallenge.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace CmcChallenge.Infrastructure.Repositories
{
    public class CountryRepository : ICountryRepository
    {
        private CmcAppDbContext Context { get; }

        public CountryRepository(CmcAppDbContext context)
        {
            Context = context;
            context.Database.EnsureCreated();
        }

        public async Task<Country?> GetAsync(int id)
        {
            return await Context.Countries.SingleOrDefaultAsync(x => x.CountryId == id);
        }

        public async Task<List<Country>> GetAllAsync()
        {
            return await Context.Countries.ToListAsync();
        }

        public async Task<Country?> GetDefaultAsync()
        {
            return await Context.Countries.SingleOrDefaultAsync(x => x.IsDefault == true);
        }
    }
}
