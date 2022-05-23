using CmcChallenge.Application;
using CmcChallenge.Controllers;
using CmcChallenge.Core.Interfaces;
using CmcChallenge.Core.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using NUnit.Framework;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CmcChallenge.UnitTests
{
    public class ProductControllerTest
    {

        [SetUp]
        public void Setup()
        {
        }

        [Test] 
        public async Task GetAllProductsShouldReturnAListOfProducts()
        {
            // Arrange
            var mockLogger = new Mock<ILogger<ProductController>>();
            var mockRepo = new Mock<IProductRepository>();
            mockRepo.Setup(repo => repo.GetAllAsync())
                .ReturnsAsync(GetTestData());
            var controller = new ProductController(mockLogger.Object, mockRepo.Object);

            //Act
            var result = await controller.GetAllProducts();

            //Assert
            var okObjectResult = result as OkObjectResult;
            Assert.IsNotNull(okObjectResult);
            var products = okObjectResult?.Value as List<Product>;
            Assert.IsTrue(products?.Count == 6);

        }

        private List<Product> GetTestData()
        {
            var sessions = new List<Product>()
            {
               new Product { ProductId = 1, Name = "Blue Tee shirt", Description = "Ultra soft and high quality T-shirts for men", ImagePath = "../../assets/img/teeshirt-blue.jpg", Price= 20 },
               new Product { ProductId = 2, Name = "Red Tee shirt", Description = "Super soft and confortable", ImagePath = "../../assets/img/teeshirt-red.jpg", Price = 20},
               new Product { ProductId = 3, Name = "Green Tee shirt", Description = "Custom T-shirt 100% coton", ImagePath = "../../assets/img/teeshirt-green.jpg", Price = 30},
               new Product { ProductId = 4, Name = "Orange Tee shirt", Description = "Super soft and confortable", ImagePath = "../../assets/img/teeshirt-orange.jpg", Price = 20 },
               new Product { ProductId = 5, Name = "Blue pants", Description = "100% coton", ImagePath = "../../assets/img/blue-pants.jpg", Price = 30 },
               new Product { ProductId = 6, Name = "Green pants", Description = "Super soft and confortable", ImagePath = "../../assets/img/green-pants.jpg", Price = 20 }
            };
            
            return sessions;
        }
    }
}