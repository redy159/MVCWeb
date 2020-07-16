using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication3.Models
{
    public class Ack
    {
        public List<string> Message = new List<string>();
        public List<string> Error = new List<string>();
        public bool IsSuccess { get; set; }
    }

    public class Ack<T> : Ack
    {
        public T Data { get; set; }
    }
}