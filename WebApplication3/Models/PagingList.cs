using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication3.Models
{
    public class PagingList<T>
    {
        public List<T> Data { get; set; }
        public int MaxNumber { get; set; }
    }
}