using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication3.Models
{
    public class CartModel
    {
        public List<ReceiptProductModel> Item { get; set; }
        public int Total { get; set; }
    }
}