using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication3.Models
{
    public class ProductModel:Product
    {
        public string BrandName { get; set; }
        public string CategoryName { get; set; }
        public string SportName { get; set; }
        public int SportId { get; set; }
    }
}