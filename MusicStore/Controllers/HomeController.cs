using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.Ajax.Utilities;
using MusicStore.Models.MusicStore;
using MusicStore.ViewModel;

namespace MusicStore.Controllers
{
    [RequireHttps]
    public class HomeController : Controller
    {
        private MusicStoreDbContext db = new MusicStoreDbContext();

        public ActionResult Index()
        {
            ModelsViewModel viewModel = new ModelsViewModel();
            viewModel.Artists = db.Artists.ToList();
            viewModel.Albums = db.Albums.ToList();
            viewModel.Songs = db.Songs.Distinct().ToList();


            return View(viewModel);
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}