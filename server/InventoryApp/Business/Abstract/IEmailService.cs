﻿

namespace Business.Abstract
{
    public interface IEmailService
    {
        Task SendMailAsync(string toEmail, string subject, string body);
    }
}
