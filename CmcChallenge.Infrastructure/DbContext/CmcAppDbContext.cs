using CmcChallenge.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace CmcChallenge.Infrastructure
{
    public class CmcAppDbContext : DbContext
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<Country> Countries { get; set; }
        //public DbSet<Enrolment> Enrolments { get; set; }

        public CmcAppDbContext(DbContextOptions<CmcAppDbContext> options)
        : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>(b =>
            {
                b.HasKey(s => s.ProductId);
                b.Property(s => s.ProductId).ValueGeneratedOnAdd();
            });

            modelBuilder.Entity<Country>(b =>
            {
                b.HasKey(s => s.CountryId);
                b.Property(s => s.CountryId).ValueGeneratedOnAdd();
            });

            modelBuilder.Entity<Product>()
              .HasData(
               new Product { ProductId = 1, Name = "Blue Tee shirt", Description = "Ultra soft and high quality T-shirts for men", ImagePath = "../../assets/img/teeshirt-blue.jpg", Price= 20 },
               new Product { ProductId = 2, Name = "Red Tee shirt", Description = "Super soft and confortable", ImagePath = "../../assets/img/teeshirt-red.jpg", Price = 20},
               new Product { ProductId = 3, Name = "Green Tee shirt", Description = "Custom T-shirt 100% coton", ImagePath = "../../assets/img/teeshirt-green.jpg", Price = 30},
               new Product { ProductId = 4, Name = "Orange Tee shirt", Description = "Super soft and confortable", ImagePath = "../../assets/img/teeshirt-orange.jpg", Price = 20 },
               new Product { ProductId = 5, Name = "Blue pants", Description = "100% coton", ImagePath = "../../assets/img/blue-pants.jpg", Price = 30 },
               new Product { ProductId = 6, Name = "Green pants", Description = "Super soft and confortable", ImagePath = "../../assets/img/green-pants.jpg", Price = 20 }
              );

            modelBuilder.Entity<Country>()
              .HasData(
               new Country { CountryId = 1, Name = "Australia", CurrencyCode = "AUD", CurrencyName = "Australian dollar", ConversionRateFromAud = 1, IsDefault = true },
               new Country { CountryId = 2, Name = "United Kingdom", CurrencyCode = "GBP", CurrencyName = "Sterling", ConversionRateFromAud = 0.56m },
               new Country { CountryId = 3, Name = "France", CurrencyCode = "EUR", CurrencyName = "Euro", ConversionRateFromAud = 0.67m });
        }

    }
}