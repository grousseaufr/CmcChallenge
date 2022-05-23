using CmcChallenge.Application;
using NUnit.Framework;

namespace CmcChallenge.UnitTests
{
    public class ShippingServiceTests
    {
        private ShippingService shippingService;

        [SetUp]
        public void Setup()
        {
            shippingService = new ShippingService();
        }

        [TestCase(10)]
        [TestCase(20)]
        [TestCase(50)]   
        public void OrderTotalLessThan50ShouldReturn10(int total)
        {
            //Arrange
            var expectedCost = 10;

            //Act
            var shippingCost = shippingService.GetShippingCost(total);

            //Assert
            Assert.IsTrue(shippingCost == expectedCost);
        }

        [TestCase(60)]
        [TestCase(100)]
        [TestCase(500)]
        public void OrderTotalMoreThan50ShouldReturn20(int total)
        {
            //Arrange
            var expectedCost = 20;

            //Act
            var shippingCost = shippingService.GetShippingCost(total);

            //Assert
            Assert.IsTrue(shippingCost == expectedCost);
        }
    }
}