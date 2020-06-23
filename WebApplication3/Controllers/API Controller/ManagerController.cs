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
            data = await (from p in _db.Products.Include(s => s.Brand).Include(s => s.Category)
                          select p).ToListAsync();
            return data;
        }

        [HttpGet]
        public async Task<Product> GetProductById(int id)
        {
            Product data = await (from p in _db.Products.Include(s => s.Brand).Include(s => s.Category)
                                  where p.Id == id
                                  select p).FirstOrDefaultAsync();

            return data;
        }

        private bool ProductValidation(Product data)
        {
            if (data.BrandId == 0 || data.CategoryId == 0) return false;
            if (String.IsNullOrEmpty(data.Name) || String.IsNullOrWhiteSpace(data.Name)) return false;
            return true;
        }

        [HttpPost]
        public async Task AddProduct(Product data)
        {
            if (ProductValidation(data))
            {
                Product tmp = data;
                _db.Products.Add(tmp);
                try
                {
                    await _db.SaveChangesAsync();
                }
                catch (Exception e)
                {

                }
            }
            return;
        }

        [HttpPost]
        public async Task DeleteProduct(int id)
        {
            Product tmp = await (from p in _db.Products.Include(s => s.Brand).Include(s => s.Category)
                                 where p.Id == id
                                 select p).FirstOrDefaultAsync();
            try
            {
                _db.Products.Remove(tmp);
                await _db.SaveChangesAsync();
            }
            catch (Exception e)
            {

            }
        }

        [HttpGet]
        public List<ShopItem> SendAndGetItem()
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
