

using Business.Abstract;
using Domain.Dtos;
using Microsoft.Extensions.Configuration;

namespace Business
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _configuration;
        public TokenService(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        public LogInResponseDto Login(LogInDto logInDto)
        {
            LogInResponseDto responseDto = new LogInResponseDto();   
            if(logInDto is null)
                throw new ArgumentNullException(nameof(logInDto));

            if (string.IsNullOrEmpty(logInDto.LoginEmail))
                throw new ArgumentException("Invalid Request");

            if (string.IsNullOrEmpty(logInDto.Password))
                throw new ArgumentException("Invalid Request");

            // Get the user from database based on Email


            return responseDto;
        }
    }
}
