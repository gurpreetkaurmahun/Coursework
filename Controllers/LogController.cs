using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;

namespace CourseWork.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class LogController : ControllerBase
    {
        private readonly ILogger<LogController> _logger;

        public LogController(ILogger<LogController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Get()
        {
           string logMessage = $"GET request received at {DateTime.UtcNow}";
            _logger.LogInformation(logMessage);
            return Ok(logMessage);
        }
    }
}
