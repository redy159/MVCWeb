using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication3.Models
{
    public class ReceiptProductModel
    {
        public ProductModel Product { get; set; }
        public int Quantity { get; set; }
    }
}