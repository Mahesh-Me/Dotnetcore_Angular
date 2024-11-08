
using Business.Abstract;
using Domain.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InventoryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly ITokenService _tokenService;
        private readonly ILogger<TokenController> _logger;
        public TokenController(ITokenService tokenService, ILogger<TokenController> logger) 
        {
            _tokenService = tokenService;
            _logger = logger;
        }

        [HttpPost]
        [Route("Login")]
        public IActionResult Login([FromBody] LogInDto logInDtos)
        {
            try
            {
                var result = _tokenService.Login(logInDtos);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                _logger.LogError(ex, "Error Occured");
                return BadRequest(ex.Message);
            }
            catch (UnauthorizedAccessException ex) 
            {
                _logger.LogError(ex, "Error during login");
                return BadRequest(ex.Message);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "Error occured");
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterUserDto registerUserDto)
        {
            try
            {
                var result = await _tokenService.RegisterUser(registerUserDto);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                _logger.LogError(ex, "Error Occured");
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occured");
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPost]
        [Route("ChangePassword")]
        public IActionResult ChangePassword(ChangePasswordDto changePasswordDto) 
        {
            try
            {
                var result = _tokenService.ChangePasswordOfUser(changePasswordDto);
                return Ok(result);
            }
            catch(ArgumentNullException ex)
            {
                _logger.LogError(ex, "Error Occured");
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occured");
                return BadRequest(ex.Message);
            }
        }
    }
}
