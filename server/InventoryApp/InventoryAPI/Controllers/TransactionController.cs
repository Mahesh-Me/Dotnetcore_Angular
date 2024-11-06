
using Business.Abstract;
using Domain.Dtos;
using Domain.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InventoryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly ILogger<TransactionController> _logger;
        private readonly ITransactionService _transactionService;
        public TransactionController(ILogger<TransactionController> logger, ITransactionService transactionService)
        {
            _logger = logger;
            _transactionService = transactionService;
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost]
        [Route("SaveBudgetDetailsOfUser")]
        public IActionResult SaveBudgetDetails(CategoryBudgetDto categoryudgetDto)
        {
            try
            {
                var result = _transactionService.SaveBudgetDetailsOfUser(categoryudgetDto);
                return Ok(result);
            }

            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex.Message, ex);
                return BadRequest(ex.Message);
            }
            catch (ArgumentException ex)
            {
                _logger.LogError(ex.Message, ex);
                return BadRequest(ex.Message);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return BadRequest(ex.Message);
            }
        }
        [Authorize]
        [HttpGet]
        [Route("GetAllBudgetListByUser/{emailId}/{selectedMonth}")]
        public IActionResult GetAllBudgetDetails(string emailId, string selectedMonth)
        {
            try
            {
                var result = _transactionService.GetAllBudgetDetails(emailId, selectedMonth);
                return Ok(result);
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex.Message, ex);
                return BadRequest(ex.Message);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return BadRequest(ex.Message);
            }
        }
        [Authorize]
        [HttpPost]
        [Route("UpdateBudgetDetails")]
        public IActionResult UpdateBudgetDetails(CategoryBudget categoryBudget)
        {
            try
            {
                var result = _transactionService.UpdateBudgetDetails(categoryBudget);
                return Ok(result);
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex.Message, ex);
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return BadRequest(ex.Message);
            }
        }
        [Authorize]
        [HttpPost]
        [Route("DeleteBudgetDetails/{id}")]
        public IActionResult DeleteBudgetDetails(int id)
        {
            try
            {
                var result = _transactionService.DeleteBudgetDetails(id);
                return Ok(result);
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex.Message, ex);
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return BadRequest(ex.Message);
            }
        }
    }
}
