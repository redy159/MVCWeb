using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using WebApplication3.Models;

namespace WebApplication3.Controllers.API_Controller
{
    public class ManagerController : ApiController
    {
        ShoppingWebEntities _db;
        public ManagerController()
        {
            _db = new ShoppingWebEntities();
        }

        [HttpGet]
        public async Task<List<Product>> GetAll()
        {
            List<Product> data = new List<Product>();
            data = await (from p in _db.Products
                    select p).ToListAsync();
            return data;
        }

        [HttpGet]
        public async Task<Product> GetProductById(int id)
        {
            Product data = await (from p in _db.Products
                                  where p.Id == id
                                  select p).FirstOrDefaultAsync();
            return data;
        }

        [HttpPost]
        public async void AddProduct(Product data)
        {
            Product tmp = data;
            try
            {
                _db.Products.Add(tmp);
                await _db.SaveChangesAsync();
            }
            catch (Exception e)
            {

            }
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
