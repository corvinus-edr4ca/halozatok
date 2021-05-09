﻿using HajosTeszt.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hajosteszt.Controllers
{
    public class BoatController : Controller
    {
        [HttpGet]
        [Route("questions/all")]
        public ActionResult M1()
        {
            HajostesztContext context = new HajostesztContext();
            var kérdések = from x in context.Questions
                           select x.QuestionText;

            return new JsonResult(kérdések);
        }

        [HttpGet]
        [Route("questions/count")]
        public ActionResult M2()
        {
            HajostesztContext context = new HajostesztContext();
            var összkerdes = context.Questions.Count();

            return new JsonResult(összkerdes);
        }

        [HttpGet]
        [Route("questions/{sorszám}")]
        public ActionResult M3(int sorszám)
        {
            HajostesztContext context = new HajostesztContext();
            var kérdés = (from x in context.Questions
                          where x.QuestionId == sorszám
                          select x).FirstOrDefault();
            
            if (kérdés == null) return BadRequest("Nincs ilyen sorszámú kérdés!");
            
            return new JsonResult(kérdés);
        }
    }
}
