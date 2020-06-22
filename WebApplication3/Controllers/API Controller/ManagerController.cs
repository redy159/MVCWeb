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
        public ShopItem SendAndGetItem([FromBody]ShopItem item)
        {
            ShopItem demo = item;
            return new ShopItem
            {
                Id = 2,
                Name = "XBox X",
                Price = 10000,
            };
        }
    }
}
