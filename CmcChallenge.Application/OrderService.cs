using CmcChallenge.Core.Interfaces;
using CmcChallenge.Core.Request;

namespace CmcChallenge.Application
{
    public class OrderService : IOrderService
    {
        public bool CreateOrder(OrderRequest orderRequest)
        {
            //Perform order creation here, calling OrderRepository for example
            return true;
        }
    }
}
