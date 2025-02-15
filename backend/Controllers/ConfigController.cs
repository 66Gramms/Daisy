using backend.Data;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConfigController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        
        public ConfigController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetConfiguration()
        {
            var partyName = _context.Party.FirstOrDefault();
            return Ok(partyName);
        }

        // [HttpPost]
        // public IActionResult SetupConfiguration()
        // {
            
        // }
    }
}