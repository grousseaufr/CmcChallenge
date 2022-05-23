using Microsoft.EntityFrameworkCore;
using CmcChallenge.Infrastructure;
using CmcChallenge.Core.Interfaces;
using CmcChallenge.Infrastructure.Repositories;
using CmcChallenge.Application;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<CmcAppDbContext>(
        options => options.UseInMemoryDatabase("CmcAppDb"));

builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<ICountryRepository, CountryRepository>();

builder.Services.AddScoped<IShippingService, ShippingService>();
builder.Services.AddScoped<IOrderService, OrderService>();

builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
