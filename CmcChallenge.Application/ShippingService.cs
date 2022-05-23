using CmcChallenge.Core.Interfaces;

namespace CmcChallenge.Application
{
    public class ShippingService : IShippingService
    {
        private const int _shippingCostThreshold = 50;
        private const int _lowShippingCost = 10;
        private const int _highShippingCost = 20;

        public int GetShippingCost(int total)
        {
            return total <= _shippingCostThreshold ? _lowShippingCost : _highShippingCost;
        }
    }
}