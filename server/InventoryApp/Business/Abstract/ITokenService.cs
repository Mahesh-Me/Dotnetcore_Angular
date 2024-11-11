﻿using Domain.Dtos;

namespace Business.Abstract
{
    public interface ITokenService
    {
        LogInResponseDto Login(LogInDto loginDto);
        Task<bool> RegisterUser(RegisterUserDto userDto);
        bool ChangePasswordOfUser(ChangePasswordDto passwordDto);
        bool ForgotPasswordOfUser(string email);
    }
}
