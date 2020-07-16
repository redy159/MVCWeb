using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication3.Models;

namespace WebApplication3.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ProductDetail(int id=0)
        {
            ViewBag.paras = id;
            return View();
        }

        public ActionResult ProductByCategory(int cateId=0,int sportId=0)
        {
            ViewBag.param = new ProductSearchModel()
            {
                CateId = cateId,
                SportId = sportId,
            };
            return View();
        }
        public ActionResult Cart()
        {
            return View();
        }
    }
}