using Business.Abstract;
using Microsoft.AspNetCore.Mvc;

namespace InventoryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommonController : ControllerBase
    {
        private readonly ILogger<TokenController> _logger;
        private readonly ICommonService _commonService;
        public CommonController(ILogger<TokenController> logger, ICommonService commonService)
        {
            _logger = logger;
            _commonService = commonService;
        }

        [HttpGet]
        [Route("GetAllCategoryMaster")]
        public IActionResult GetAllCategoryMasterData()
        {
            try
            {
                var result = _commonService.GetCategoryMasterData();
                return Ok(result);
            }
            catch (Exception ex) 
            {
                _logger.LogError(ex.Message, ex);
                return BadRequest(ex.InnerException?.Message);
            }
        }
    }
}
