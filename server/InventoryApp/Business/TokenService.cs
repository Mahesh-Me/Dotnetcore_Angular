

using Business.Abstract;
using DataAccess.Abstract;
using Domain.Dtos;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Business
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _configuration;
        private readonly IUserRepository _userRepository;
        public TokenService(IConfiguration configuration, IUserRepository userRepository)
        {
            _configuration = configuration;
            _userRepository = userRepository;
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
            var userDetailsByEmail = _userRepository.GetUserByEmailId(logInDto.LoginEmail);

            if (userDetailsByEmail is null)
                throw new ArgumentException("Email Id is not registered yet.");

            if(userDetailsByEmail is not null)
            {
                if (userDetailsByEmail.EmailId is null)
                    throw new ArgumentException("Invalid User");
            }

            if (userDetailsByEmail.EmailId.ToLower().Equals(logInDto.LoginEmail.ToLower())
                && userDetailsByEmail.Password.Equals(logInDto.Password))
            {
                // generate jwt token
                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, logInDto.LoginEmail),
                    new Claim(JwtRegisteredClaimNames.Name, userDetailsByEmail.FullName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken
                    (
                        issuer: _configuration["Jwt:Issuer"],
                        audience: _configuration["Jwt:Audience"],
                        claims: claims,
                        signingCredentials: creds,
                        expires: DateTime.Now.AddMinutes(30)
                    );
                responseDto.Token = new JwtSecurityTokenHandler().WriteToken(token);
                responseDto.UserId = userDetailsByEmail.Id;
                responseDto.UserEmail = logInDto.LoginEmail;
                return responseDto;
            }
            else
            {
                throw new ArgumentException("LoginId and Password is not valid.");
            }
        }
    }
}
