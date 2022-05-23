using CmcChallenge.Core.Request;

namespace CmcChallenge.Core.Interfaces
{
    public interface IOrderService
    {
        bool CreateOrder(OrderRequest orderRequest);
    }
}