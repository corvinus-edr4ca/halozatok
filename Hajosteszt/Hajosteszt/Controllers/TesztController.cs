using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hajosteszt.Controllers
{
    
    public class TesztController : ControllerBase
    {
        [HttpGet]
        [Route("corvinus/nagybetus/{szoveg}")]
        public IActionResult M2(string szoveg)
        {
            string pontosIdo = DateTime.Now.ToShortTimeString();
            return new ContentResult
            {
                ContentType = System.Net.Mime.MediaTypeNames.Text.Plain,
                Content = szoveg.ToUpper()
            };
        }
    }
}
