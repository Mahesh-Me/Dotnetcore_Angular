﻿using Domain.Dtos;

namespace Business.Abstract
{
    public interface ITokenService
    {
        LogInResponseDto Login(LogInDto loginDto);
    }
}