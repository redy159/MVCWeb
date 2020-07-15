using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication3.Models
{
    public class Ack
    {
        public List<string> Message { get; set; }
        public List<string> Error { get; set; }
        public bool IsSuccess { get; set; }
    }

    public class Ack<T> : Ack
    {
        public T Data { get; set; }
    }
}