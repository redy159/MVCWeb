using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication3.Models.Helper
{
    public static class CastHelper
    {
        public static ProductModel Cast(this Product obj)
        {
            ProductModel data = new ProductModel()
            {
                BrandId = obj.BrandId,
                BrandName = obj.Brand.Name,
                CategoryId = obj.CategoryId,
                CategoryName = obj.Category != null ? obj.Category.Name : "",
                Name = obj.Name,
                Id = obj.Id,
                Price = obj.Price,
                SportId = obj.Category.SportId,
                SportName = obj.Category != null ? (obj.Category.Sport != null ? obj.Category.Sport.Name : "" ): "",
                ImageUrl = obj.ImageFile != null ? obj.ImageFile.ImageUrl : null,
            };
            return data;
        }

        public static Product Cast(this ProductModel obj)
        {
            Product data = new Product()
            {
                BrandId = obj.BrandId,
                CategoryId = obj.CategoryId,
                Name = obj.Name,
                Id = obj.Id,
                Price = obj.Price,
                ImageId = obj.Id,
            };
            return data;
        }
    }
}