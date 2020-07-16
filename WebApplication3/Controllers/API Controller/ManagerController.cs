using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using WebApplication3.Models;
using WebApplication3.Models.Helper;

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

        private Ack SportValidation(Sport data)
        {
            Ack ack = new Ack();
            ack.IsSuccess = true;
            if (!string.IsNullOrEmpty(data.Name) && !string.IsNullOrWhiteSpace(data.Name))
            {
                ack.IsSuccess = false;
                ack.Message.Add("Name can't be empty");
            }

            return ack;
        }

        [HttpPost]
        public async Task<Ack> AddSport(Sport request)
        {
            Ack ack = SportValidation(request);
            if (ack.IsSuccess)
            {
                var sport = new Sport()
                {
                    Id = request.Id,
                    Name = request.Name,
                };
                _db.Sports.Add(sport);
                try
                {
                    await _db.SaveChangesAsync();
                }
                catch (Exception e)
                {
                    ack.IsSuccess = false;
                    ack.Message.Add(e.Message);
                }
            }
            return ack;
        }

        [HttpPost]
        public async Task<Ack> DeleteSport(int sportId)
        {
            Ack ack = new Ack();
            ack.IsSuccess = true;
            var sport = await _db.Sports.FindAsync(sportId);
            if (sport == null)
            {
                ack.IsSuccess = false;
                ack.Message.Add("Sport not found");
            }
            _db.Sports.Remove(sport);
            try
            {
                await _db.SaveChangesAsync();
            }
            catch (Exception e)
            {
                ack.IsSuccess = false;
                ack.Message.Add(e.Message);
            }
            return ack;
        }

        [HttpPost]
        public async Task<Ack> UpdateSport(Sport request)
        {
            Ack ack = new Ack()
            {
                IsSuccess = true,
            };
            int id = request.Id;
            var sport = await _db.Sports.FindAsync(id);
            if (sport == null)
            {
                ack.IsSuccess = false;
                ack.Message.Add("Can't find sport");
            }

            if (!string.IsNullOrEmpty(request.Name) && !string.IsNullOrWhiteSpace(request.Name))
                sport.Name = request.Name;


            if (request.Id != 0)
                sport.Id = request.Id;

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (Exception e)
            {
                ack.IsSuccess = false;
                ack.Message.Add(e.Message);
            }

            return ack;
        }

        private Ack CategoryValidation(Category data)
        {
            Ack ack = new Ack();
            ack.IsSuccess = true;
            if (!string.IsNullOrEmpty(data.Name) && !string.IsNullOrWhiteSpace(data.Name))
            {
                ack.IsSuccess = false;
                ack.Message.Add("Name can't be empty");
            }
            if (data.SportId == 0)
            {
                ack.IsSuccess = false;
                ack.Message.Add("Sport not selected");
            }
            return ack;
        }

        [HttpPost]
        public async Task<Ack> AddCategory(Category request)
        {
            Ack ack = CategoryValidation(request);
            if (ack.IsSuccess)
            {
                var category = new Category()
                {
                    Id = request.Id,
                    Name = request.Name,
                    SportId = request.SportId,
                };
                _db.Categories.Add(category);
                try
                {
                    await _db.SaveChangesAsync();
                }
                catch (Exception e)
                {
                    ack.IsSuccess = false;
                    ack.Message.Add(e.Message);
                }
            }
            return ack;
        }

        [HttpPost]
        public async Task<Ack> DeleteCategory(int CategoryId)
        {
            Ack ack = new Ack() { IsSuccess = true };
            var category = await _db.Categories.FindAsync(CategoryId);
            if (category == null)
            {
                ack.IsSuccess = false;
                ack.Message.Add("Category not found");
            }
            _db.Categories.Remove(category);
            try
            {
                await _db.SaveChangesAsync();
            }
            catch (Exception e)
            {
                ack.IsSuccess = false;
                ack.Message.Add(e.Message);
            }
            return ack;
        }

        [HttpPost]
        public async Task<Ack> UpdateCategory(Category request)
        {
            Ack ack = CategoryValidation(request);
            if (ack.IsSuccess)
            {
                int id = request.Id;
                var category = await _db.Categories.FindAsync(id);
                if (category == null)
                {
                    ack.IsSuccess = false;
                    ack.Message.Add("Category not found");
                }

                if (!string.IsNullOrEmpty(request.Name))
                    category.Name = request.Name;


                if (request.SportId != 0)
                    category.SportId = request.SportId;

                try
                {
                    await _db.SaveChangesAsync();
                }
                catch (Exception e)
                {
                    ack.IsSuccess = false;
                    ack.Message.Add(e.Message);
                }
            }
            return ack;
        }

        [HttpGet]
        public async Task<List<Sport>> GetSportMenu()
        {
            List<Sport> data = new List<Sport>();
            
            data = await (from s in _db.Sports.Include(p => p.Categories)
                          select s).ToListAsync();
            return data;
        }

        [HttpGet]
        public async Task<List<Category>> GetCategoryMenu()
        {
            List<Category> data = new List<Category>();

            data = await (from c in _db.Categories.Include(x => x.Sport)
                          select c).ToListAsync();
            //for (int i = 0; i < 4; i++)
            //{
            //    data.Add(new Category()
            //    {
            //        Id = i + 1,
            //        Name = "Cate " + i,
            //        SportId = i + 1,
            //    }
            //    );
            //}
            return data;
        }

        [HttpGet]
        public async Task<List<Brand>> GetBrandMenu()
        {
            List<Brand> data = new List<Brand>();
            data = await (from b in _db.Brands
                          select b).ToListAsync();

            //for (int i = 0; i < 5; i++)
            //{
            //    data.Add(new Brand()
            //    {
            //        Id = i + 1,
            //        Name = "Bra " + i
            //    }
            //    );
            //}
            return data;
        }

        [HttpGet]
        public async Task<PagingList<ProductModel>> GetNewestProduct(int pageNumber)
        {
            List<Product> data = new List<Product>();
            var query = (from p in _db.Products.Include(x => x.Brand).Include(x => x.Category.Sport).Include(x => x.ImageFile)
                         orderby p.Id descending
                         select p).AsQueryable();
            int productCount = query.Count();
            data = await query.Skip(pageNumber * 8).Take(8).ToListAsync();
            //for (int i = 0; i < 8; i++)
            //{
            //    data.Add(new Product()
            //    {
            //        Id = i + pageNumber + 1,
            //        Name = "Bóng Michael Jordan " + pageNumber + (i + 1),
            //        Brand = new Brand()
            //        {
            //            Id = 1,
            //            Name = "Sony",
            //        },
            //        Price = 20000,
            //        BrandId = 1,
            //        CategoryId = 1,
            //        ImageId = 1,
            //        ImageFile = new ImageFile()
            //        {
            //            Id = 1,
            //            ImageUrl = ""
            //        }
            //    });
            //}
            List<ProductModel> tmp = new List<ProductModel>();
            for (int i = 0; i < data.Count; i++)
            {
                tmp.Add(data[i].Cast());
            }

            PagingList<ProductModel> res = new PagingList<ProductModel>()
            {
                Data = tmp,
                MaxNumber = productCount,
                //MaxNumber = 100,
            };

            return res;
        }

        [HttpGet]
        public async Task<List<Product>> GetAllProduct()
        {
            List<Product> data = new List<Product>();
            data = await (from p in _db.Products.Include(s => s.Brand).Include(s => s.Category.Sport).Include(x => x.ImageFile)
                          select p).ToListAsync();
            //for (int i = 0; i < 8; i++)
            //{
            //    data.Add(new Product()
            //    {
            //        Id = i,
            //        Name = "Bóng Michael Jordan " + (i + 1),
            //        Brand = new Brand()
            //        {
            //            Id = 1,
            //            Name = "Sony",
            //        },
            //        Price = 20000,
            //        BrandId = 1,
            //        CategoryId = 1,
            //        Category = new Category()
            //        {
            //            Id = 1,
            //            Name = "Basketball ball",
            //            Sport = new Sport() { Id = 1, Name = "Basketball" },
            //            SportId = 1,
            //        },
            //        ImageFile = new ImageFile()
            //        {
            //            Id = 1,
            //            ImageUrl = null
            //        }
            //    });
            //}
            return data;
        }

        [HttpGet]
        public async Task<List<User>> GetAllUser()
        {
            List<User> data = new List<User>();
            data = await (from u in _db.Users
                          select u).ToListAsync();
            //for (int i = 1; i < 9; i++)
            //{
            //    data.Add(new User()
            //    {
            //        Id = i,
            //        Email = "abc@xyc",
            //        Password = "askdj" + i,
            //        Name = "TestUser " + i,
            //        PhoneNumber = "123456789"

            //    });
            //}
            return data;
        }

        [HttpGet]
        public async Task<List<Receipt>> GetAllReceipt()
        {
            List<Receipt> data = new List<Receipt>();
            data = await (from r in _db.Receipts
                          .Include(x => x.Receipt_Product.Select(y => y.Product))
                          select r).ToListAsync();
            return data;
        }

        [HttpPost]
        public async Task<Ack> CreateReceipt(CartModel cart)
        {
            Ack ack = new Ack();
            ack.IsSuccess = true;

            List<Receipt_Product> tmp = new List<Receipt_Product>();
            for (int i = 0; i < cart.Item.Count; i++)
            {
                tmp.Add(new Receipt_Product()
                {
                    ReceiptId = 0,
                    ProductId = cart.Item[i].Product.Id,
                    ProductCount = cart.Item[i].Quantity,
                    TotalPrice = cart.Item[i].Quantity * cart.Item[i].Product.Price,
                });
            }


            Receipt data = new Receipt()
            {
                Id = 0,
                UserId = 1,
                Payment = 0,
                CreatedDate = DateTime.Now,
                Receipt_Product = tmp,
                Total = cart.Total,
            };

            _db.Receipts.Add(data);
            try
            {
                await _db.SaveChangesAsync();
            }
            catch (Exception e)
            {
                ack.IsSuccess = false;
                ack.Message.Add(e.Message);
            }
            return ack;
        }

        private Ack UserValidation(User user)
        {
            Ack ack = new Ack() { IsSuccess = true };
            if (string.IsNullOrEmpty(user.Password) || string.IsNullOrWhiteSpace(user.Name))
            {
                ack.IsSuccess = false;
                ack.Message.Add("Password missing");
            }
            if (string.IsNullOrEmpty(user.Name) || string.IsNullOrWhiteSpace(user.Name))
            {
                ack.IsSuccess = false;
                ack.Message.Add("Name missing");
            }
            return ack;
        }

        [HttpPost]
        public async Task<Ack> AddUser(User user)
        {
            Ack ack = UserValidation(user);
            if (ack.IsSuccess)
            {
                User tmp = new User()
                {
                    Name = user.Name,
                    Password = user.Password,
                    Email = user.Email,
                    PhoneNumber = user.PhoneNumber,
                    UserType = 1,
                };

                _db.Users.Add(tmp);
                try
                {
                    await _db.SaveChangesAsync();
                }
                catch (Exception e)
                {
                    ack.IsSuccess = false;
                    ack.Message.Add(e.Message);
                }
            }
            return ack;
        }

        [HttpGet]
        public async Task<ProductModel> GetProductById(int id)
        {
            Product data = await (from p in _db.Products.Include(s => s.Brand).Include(s => s.Category.Sport).Include(x => x.ImageFile)
                                  where p.Id == id
                                  select p).FirstOrDefaultAsync();
            //Product data = new Product()
            //{
            //    Id = id,
            //    Name = "Bóng Michael Jordan " + id,
            //    CategoryId = 2,
            //    BrandId = 1,
            //    Price = 2000,
            //    Brand = new Brand()
            //    {
            //        Id = 2,
            //        Name = "Bra ",
            //    },
            //    Category = new Category()
            //    {
            //        Id = 1,
            //        Name = "Cate ",
            //        Sport = new Sport()
            //        {
            //            Id = 3,
            //            Name = "Bóng chuyền ",
            //        }
            //    }
            //};

            ProductModel tmp = data.Cast();

            return tmp;
        }

        [HttpPost]
        public async Task<List<ProductModel>> GetProductFilter(ProductSearchModel model)
        {
            List<Product> data = new List<Product>();
            var query = _db.Products.Select(x => x).Include(x => x.ImageFile).Include(x => x.Category.Sport).Include(x => x.Brand).AsQueryable();
            if (!String.IsNullOrEmpty(model.Name) && !String.IsNullOrWhiteSpace(model.Name))
                query = query.Where(x => x.Name.Contains(model.Name)).AsQueryable();
            if (model.SportId > 0)
                query = query.Where(x => x.Category.SportId == model.SportId).AsQueryable();
            if (model.CateId > 0)
                query = query.Where(x => x.CategoryId == model.CateId).AsQueryable();
            if (model.BrandId > 0)
                query = query.Where(x => x.BrandId == model.BrandId).AsQueryable();
            data = await query.ToListAsync();
            //for (int i = 1; i < 20; i++)
            //{
            //    data.Add(new Product
            //    {
            //        Id = i,
            //        Name = "Test " + i,
            //        Price = 2000,
            //        BrandId = i % 3,
            //        Brand = new Brand()
            //        {
            //            Id = i % 3,
            //            Name = "Bra " + (i % 3),
            //        },
            //        CategoryId = i % 4,
            //        Category = new Category()
            //        {
            //            Id = i % 4,
            //            Name = "Cate " + (i % 4),
            //            Sport = new Sport()
            //            {
            //                Id = i % 3,
            //                Name = "Bóng chuyền " + (i % 3),
            //            }
            //        }
            //    });

            //}

            if (!String.IsNullOrEmpty(model.Name) && !String.IsNullOrWhiteSpace(model.Name))
                data = data.Where(x => x.Name.Contains(model.Name)).ToList();
            if (model.SportId > 0)
                data = data.Where(x => x.Category.SportId == model.SportId).ToList();
            if (model.CateId > 0)
                data = data.Where(x => x.CategoryId == model.CateId).ToList();
            if (model.BrandId > 0)
                data = data.Where(x => x.BrandId == model.BrandId).ToList();

            List<ProductModel> res = new List<ProductModel>();

            for (int i = 0; i < data.Count; i++)
            {
                res.Add(data[i].Cast());
            }
            return res;
        }

        private Ack ProductValidation(ProductModel data)
        {
            Ack ack = new Ack();
            ack.IsSuccess = true;
            //if (data.BrandId == 0)
            //{
            //    ack.IsSuccess = false;
            //    ack.Message.Add("Brand missing");
            //}
            //if (data.CategoryId == 0)
            //{
            //    ack.IsSuccess = false;
            //    ack.Message.Add("Category missing");
            //}
            if (String.IsNullOrEmpty(data.Name) || String.IsNullOrWhiteSpace(data.Name))
            {
                ack.IsSuccess = false;
                ack.Message.Add("Name can't be empty");
            }
            if (String.IsNullOrEmpty(data.ImageUrl) || String.IsNullOrWhiteSpace(data.ImageUrl))
            {
                ack.IsSuccess = false;
                ack.Message.Add("No image");
            }
            return ack;
        }

        [HttpPost]
        public async Task<Ack> AddProduct(ProductModel data)
        {
            Ack ack = ProductValidation(data);

            if (ack.IsSuccess)
            {
                ImageFile img = new ImageFile()
                {
                    ImageUrl = data.ImageUrl
                };

                _db.ImageFiles.Add(img);
                try
                {
                    await _db.SaveChangesAsync();
                }
                catch (Exception e)
                {

                }
                Product tmp = data.Cast();
                tmp.ImageId = img.Id;
                tmp.BrandId = 1;
                tmp.CategoryId = 1;
                _db.Products.Add(tmp);
                try
                {
                    await _db.SaveChangesAsync();
                }
                catch (Exception e)
                {
                    ack.IsSuccess = false;
                    ack.Error.Add(e.Message);
                }
            }
            return ack;
        }

        [HttpPost]
        public async Task<Ack> EditProduct(ProductModel data)
        {
            Ack ack = ProductValidation(data);

            if (ack.IsSuccess)
            {
                Product old = await (from p in _db.Products
                                     where p.Id == data.Id
                                     select p).FirstOrDefaultAsync();
                old.Name = data.Name;
                old.ImageId = data.ImageId;
                old.Price = data.Price;
                old.CategoryId = data.CategoryId;
                old.BrandId = data.CategoryId;

                try
                {
                    await _db.SaveChangesAsync();
                }
                catch (Exception e)
                {
                    ack.IsSuccess = false;
                    ack.Message.Add(e.Message);
                }
            }
            return ack;
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
