

using Business.Abstract;
using DataAccess.Abstract;
using Domain.Dtos;
using Domain.Entities;
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
        private static readonly Random _random = new Random();
        private readonly IEmailService _emailService;
        public TokenService(IConfiguration configuration, IUserRepository userRepository, IEmailService emailService)
        {
            _configuration = configuration;
            _userRepository = userRepository;
            _emailService = emailService;
        }

        #region LogIn and Token Generation
        public LogInResponseDto Login(LogInDto logInDto)
        {
            LogInResponseDto responseDto = new LogInResponseDto();
            if (logInDto is null)
                throw new ArgumentNullException(nameof(logInDto));

            if (string.IsNullOrEmpty(logInDto.LoginEmail))
                throw new ArgumentException("Invalid Request");

            if (string.IsNullOrEmpty(logInDto.Password))
                throw new ArgumentException("Invalid Request");

            // Get the user from database based on Email
            var userDetailsByEmail = _userRepository.GetUserByEmailId(logInDto.LoginEmail);

            if (userDetailsByEmail is null)
                throw new ArgumentException("Email Id is not registered yet.");

            if (userDetailsByEmail is not null)
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
        #endregion

        #region Register User
        public async Task<bool> RegisterUser(RegisterUserDto userDto)
        {
            if (userDto is null)
                throw new ArgumentException("Invalid Details Received");

            var existingUser = _userRepository.GetUserByEmailId(userDto.EmailId);
            if (existingUser != null)
                throw new ArgumentException("Email Address Already Registered.");

            string password = string.Empty;
            password = GenerateRandomPassword(8);
            if (userDto != null)
            {
                Users userObj = new()
                {
                    EmailId = userDto.EmailId,
                    FullName = userDto.FullName,
                    MobileNumber = userDto.MobileNumber,
                    City = userDto.City,
                    State = userDto.State,
                    Password = password,
                    IsActive = true
                };

                var user = await _userRepository.SaveUser(userObj);
                UserRoles userRole = new()
                {
                    UserId = user.Id,
                    RoleId = 2 // for others
                };
                //await _userRepository.SaveUserRole(userRole);
            }
            await _emailService.SendMailAsync(userDto.EmailId, "New Account Created", $"Your LogIn Id: {userDto.EmailId}<br> and Your Password: {password}");
            return true;
        }
        #endregion

        private string GenerateRandomPassword(int length)
        {
            if (length < 2)
                throw new ArgumentException("Password length should be at least 2.");

            var passwordBuilder = new StringBuilder();
            for (int i = 0; i < length - 1; i++)
            {
                char uppercaseLetter = (char)_random.Next('A', 'Z' + 1);
                passwordBuilder.Append(uppercaseLetter);
            }
            int number = _random.Next(1, 11);
            passwordBuilder.Append(number);

            return passwordBuilder.ToString();
        }

        public bool ChangePasswordOfUser(ChangePasswordDto passwordDto)
        {
            if (passwordDto is null || passwordDto == default)
                throw new ArgumentNullException("Invalid parameter received");

            if (passwordDto.EmailId is null)
                throw new ArgumentNullException("Invalid Email Id");

            Users user = _userRepository.GetUserByEmailId(passwordDto.EmailId);
            if(user is null)
                throw new ArgumentNullException("User Not found.");

            if (user.Password!.Equals(passwordDto.OldPassword))
            {
                throw new Exception("Old Password is incorrect");
            }
            user.Password = passwordDto.NewPassword;
            _userRepository.UpdateUser(user);
            return true;
        }
        public bool ForgotPasswordOfUser(string email)
        {
            if (email is null)
                throw new ArgumentNullException("email", "Invalid parameter received");

            Users userObj = _userRepository.GetUserByEmailId(email);

            if (userObj is null)
                throw new ArgumentException("User not found.");

            string password = GenerateRandomPassword(8);
            userObj.Password = password;
            _userRepository.UpdateUser(userObj);
            _emailService.SendMailAsync(userObj.EmailId!,"New Password",$"Your new password is {password}");
            return true;
        }
    }
}
