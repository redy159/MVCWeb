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
            _db.Configuration.LazyLoadingEnabled = false;
        }

        [HttpPost]
        public async Task<int> AddSport(Sport request)
        {
            var sport = new Sport()
            {
               Id = request.Id,
               Name = request.Name,
               Categories = request.Categories,
            };
            _db.Sports.Add(sport);
            await _db.SaveChangesAsync();
            return sport.Id;
        }

        [HttpPost]
        public async Task<int> DeleteSport(int sportId)
        {
            var sport = await _db.Sports.FindAsync(sportId);
            if (sport == null)
                return 0;
            _db.Sports.Remove(sport);
            return await _db.SaveChangesAsync();
        }

        [HttpPost]
        public async Task<int> UpdateSport(Sport request)
        {
            int id = request.Id;
            var sport= await _db.Sports.FindAsync(id);
            if (sport == null)
                return 0;

            if (!string.IsNullOrEmpty(request.Name))
                sport.Name = request.Name;


            if (request.Id != 0)
                sport.Id = request.Id;

            return await _db.SaveChangesAsync();
        }


        [HttpPost]
        public async Task<int> AddCategory(Category request)
        {
            var category = new Category()
            {
                Id = request.Id,
                Name = request.Name,
                SportId = request.SportId,
            };
            _db.Categories.Add(category);
            await _db.SaveChangesAsync();
            return category.Id;
        }

        [HttpPost]
        public async Task<int> DeleteCategory(int CategoryId)
        {
            var category = await _db.Categories.FindAsync(CategoryId);
            if (category == null)
                return 0;
            _db.Categories.Remove(category);
            return await _db.SaveChangesAsync();
        }

        [HttpPost]
        public async Task<int> UpdateCategory(Category request)
        {
            int id = request.Id;
            var category = await _db.Categories.FindAsync(id);
            if (category == null)
                return 0;

            if (!string.IsNullOrEmpty(request.Name))
                category.Name = request.Name;


            if (request.SportId!= 0)
                category.SportId = request.SportId;

            return await _db.SaveChangesAsync();
        }

        [HttpGet]
        public async Task<List<Sport>> GetSportMenu()
        {
            List<Sport> data = new List<Sport>();
            //data = await (from s in _db.Sports.Include(p => p.Categories)
            //              select s).ToListAsync();
            data = new List<Sport>() {
                new Sport()
                {
                    Id = 1,
                    Name = "Bóng đá",
                    Categories = new List<Category>()
                    {
                        new Category(){ Id = 1, Name = "Banh (bóng đá)"},
                        new Category(){ Id = 2, Name = "Găng"},
                    }
                },
                new Sport()
                {
                    Id = 2,
                    Name = "Bóng rổ",
                    Categories = new List<Category>()
                    {
                        new Category(){ Id = 3, Name = "Banh (bóng rổ)"},
                        new Category(){ Id = 4, Name = "Giày"},
                    }
                },
                new Sport()
                {
                    Id = 3,
                    Name = "Bóng chuyền",
                    Categories = new List<Category>()
                    {
                        new Category(){ Id = 5, Name = "Banh (bóng chuyền)"},
                        new Category(){ Id = 6, Name = "Đồng phục"},
                    }
                },
                new Sport()
                {
                    Id = 3,
                    Name = "Bóng chuyền",
                    Categories = new List<Category>()
                    {
                        new Category(){ Id = 5, Name = "Banh (bóng chuyền)"},
                        new Category(){ Id = 6, Name = "Đồng phục"},
                    }
                }
                ,
                new Sport()
                {
                    Id = 4,
                    Name = "Bóng chuyền",
                    Categories = new List<Category>()
                    {
                        new Category(){ Id = 5, Name = "Banh (bóng chuyền)"},
                        new Category(){ Id = 6, Name = "Đồng phục"},
                    }
                }
                ,
                new Sport()
                {
                    Id = 5,
                    Name = "Bóng chuyền",
                    Categories = new List<Category>()
                    {
                        new Category(){ Id = 5, Name = "Banh (bóng chuyền)"},
                        new Category(){ Id = 6, Name = "Đồng phục"},
                    }
                }
           };
            return data;
        }

        [HttpGet]
        public async Task<List<Product>> GetNewestProduct(int pageNumber)
        {
            List<Product> data = new List<Product>();
            //data = await (from p in _db.Products
            //              orderby p.Id descending
            //              select p).Skip(pageNumber*8).Take(8).ToListAsync();

            for (int i = 0; i < 8; i++)
            {
                data.Add(new Product()
                {
                    Id = i + 1,
                    Name = "Bóng Michael Jordan " + (i + 1),
                    Brand = new Brand()
                    {
                        Id = 1,
                        Name = "Sony",
                    },
                    Price = 20000,
                    BrandId = 1,
                    CategoryId = 1,
                });
            }
            return data;
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
            //Product data = await (from p in _db.Products.Include(s => s.Brand).Include(s => s.Category)
            //                      where p.Id == id
            //                      select p).FirstOrDefaultAsync();
            Product data = new Product()
            {
                Id = id,
                Name = "Bóng Michael Jordan " + id,
                CategoryId = 2,
                BrandId = 1,
                Price = 2000,
            };
            return data;
        }

        [HttpPost]
        public async Task<List<Product>> GetProductFilter(ProductSearchModel model)
        {
            List<Product> data = new List<Product>();
            //var query = _db.Products.Select(x => x).Include(x=> x.Category.Sport).Include(x => x.Brand).AsQueryable();
            //if (!String.IsNullOrEmpty(model.Name) && !String.IsNullOrWhiteSpace(model.Name))
            //    query = query.Where(x => x.Name.Contains(model.Name)).AsQueryable();
            //if (model.SportId > 0)
            //    query = query.Where(x => x.Category.SportId == model.SportId).AsQueryable();
            //if (model.CateId > 0)
            //    query = query.Where(x => x.CategoryId == model.CateId).AsQueryable();
            //if (model.BrandId > 0)
            //    query = query.Where(x => x.BrandId == model.BrandId).AsQueryable();
            //data = await query.ToListAsync();
            for (int i = 1; i < 20; i++)
            {
                data.Add(new Product
                {
                    Id = i,
                    Name = "Test " + i,
                    Price = 2000,
                    BrandId = i % 3,
                    CategoryId = i % 4,
                    Category = new Category()
                    {
                        Id = i % 4,
                        Name = "Cate " + (i % 4),
                        Sport = new Sport()
                        {
                            Id = i % 3,
                            Name = "Bóng chuyền " + (i % 3),
                        }
                    }
                });

            }

            if (!String.IsNullOrEmpty(model.Name) && !String.IsNullOrWhiteSpace(model.Name))
                data = data.Where(x => x.Name.Contains(model.Name)).ToList();
            if (model.SportId > 0)
                data = data.Where(x => x.Category.SportId == model.SportId).ToList();
            if (model.CateId > 0)
                data = data.Where(x => x.CategoryId == model.CateId).ToList();
            if (model.BrandId > 0)
                data = data.Where(x => x.BrandId == model.BrandId).ToList();

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
