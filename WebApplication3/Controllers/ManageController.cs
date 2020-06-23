using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;
using WebApplication3.Controllers.API_Controller;

namespace WebApplication3.Controllers
{
    public class ManageController : Controller
    {
        // GET: Manage
        public ActionResult Index()
        {
            List<Product> dataInfo = new List<Product>();
            HttpClient hc = new HttpClient();
            hc.BaseAddress = new Uri("http://localhost:51511/api/");

            var apiControl = hc.GetAsync("manager/getall");
            apiControl.Wait();

            var res = apiControl.Result;
            if (res.IsSuccessStatusCode)
            {
                var read = res.Content.ReadAsAsync<List<Product>>();
                read.Wait();

                dataInfo = read.Result;
            }
            return View(dataInfo);
        }

        public ActionResult CreateNew(int id)
        {
            return View();
        }

        public ActionResult Edit(int id)
        {
            Product dataInfo = new Product();
            HttpClient hc = new HttpClient();
            hc.BaseAddress = new Uri("http://localhost:51511/api/");

            var apiControl = hc.GetAsync("manager/GetProductById?id="+id);
            apiControl.Wait();

            var res = apiControl.Result;
            if (res.IsSuccessStatusCode)
            {
                var read = res.Content.ReadAsAsync<Product>();
                read.Wait();

                dataInfo = read.Result;
            }
            return View(dataInfo);
        }
        
    }
}