using CmcChallenge.Core.Interfaces;
using CmcChallenge.Core.Request;
using CmcChallenge.Web.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using NUnit.Framework;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CmcChallenge.UnitTests
{
    public class OrderControllerTest
    {

        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public async Task WhenValidRequestShouldReturnOkResult()
        {
            // Arrange
            var orderRequest = new OrderRequest
            {
                CurrencyCode = "AUD",
                UserId = 1,
                Items = new List<OrderItemRequest>
                {
                    new OrderItemRequest
                    {
                        ProductId = 1,
                        Quantity = 1
                    }
                }
            };

            var mockLogger = new Mock<ILogger<OrderController>>();
            var mockService = new Mock<IOrderService>();
            mockService.Setup(service => service.CreateOrder(orderRequest))
                .Returns(true);
            var controller = new OrderController(mockLogger.Object, mockService.Object);

            //Act
            var result = await controller.PlaceOrder(orderRequest);

            //Assert
            var okResult = result as OkResult;
            Assert.IsNotNull(okResult);

        }

        [Test] 
        public async Task WhenUserIdIsNullShouldReturnBadRequest()
        {
            // Arrange
            var mockLogger = new Mock<ILogger<OrderController>>();
            var mockService = new Mock<IOrderService>();
            var controller = new OrderController(mockLogger.Object, mockService.Object);
            var orderRequest = new OrderRequest
            {
                CurrencyCode = "AUD",
                Items = new List<OrderItemRequest>
                {
                    new OrderItemRequest
                    {
                        ProductId = 1,
                        Quantity = 1
                    }
                }
            };
            controller.ModelState.AddModelError("UserId", "Required");

            //Act
            var result = await controller.PlaceOrder(orderRequest);

            //Assert
            var badRequesResult = result as BadRequestResult;
            Assert.IsNotNull(badRequesResult);

        }

        [Test]
        public async Task WhenCurrencyIsNullShouldReturnBadRequest()
        {
            // Arrange
            var mockLogger = new Mock<ILogger<OrderController>>();
            var mockService = new Mock<IOrderService>();
            var controller = new OrderController(mockLogger.Object, mockService.Object);
            var orderRequest = new OrderRequest
            {
                UserId = 1,
                CurrencyCode = "AUD"
            };
            controller.ModelState.AddModelError("Items", "Required");

            //Act
            var result = await controller.PlaceOrder(orderRequest);

            //Assert
            var badRequesResult = result as BadRequestResult;
            Assert.IsNotNull(badRequesResult);

        }

        [Test]
        public async Task WhenItemsIsNullShouldReturnBadRequest()
        {
            // Arrange
            var mockLogger = new Mock<ILogger<OrderController>>();
            var mockService = new Mock<IOrderService>();
            var controller = new OrderController(mockLogger.Object, mockService.Object);
            var orderRequest = new OrderRequest
            {
                UserId = 1,

                Items = new List<OrderItemRequest>
                {
                    new OrderItemRequest
                    {
                        ProductId = 1,
                        Quantity = 1
                    }
                }
            };
            controller.ModelState.AddModelError("Currency", "Required");

            //Act
            var result = await controller.PlaceOrder(orderRequest);

            //Assert
            var badRequesResult = result as BadRequestResult;
            Assert.IsNotNull(badRequesResult);

        }
    }
}