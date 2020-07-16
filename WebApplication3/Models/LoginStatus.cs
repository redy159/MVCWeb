using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication3.Models
{
    public class LoginStatus
    {
        public string Name { get; set; }
        public int UserType { get; set; }
        public bool IsLogin { get; set; }
        public int UserId { get; set; }
    }
}