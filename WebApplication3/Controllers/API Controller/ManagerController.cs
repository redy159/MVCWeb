using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication3.Models;

namespace WebApplication3.Controllers.API_Controller
{
    public class ManagerController : ApiController
    {
        [HttpGet]
        public ShopItem GetShopItem()
        {
            return new ShopItem
            {
                Id = 1,
                Name = "PS5",
                Price = 15000
            };
        }

        [HttpPost]
        public List<ShopItem> SendAndGetItem(ShopItem item)
        {
            List<ShopItem> Items = new List<ShopItem>();
            Items.Add(new ShopItem
            {
                Id = 4,
                Name = "Yo",
                Price = 1
            });
            Items.Add(new ShopItem
            {
                Id = 6,
                Name = "Hey",
                Price = 2
            });
            return Items;
        }
    }
}
