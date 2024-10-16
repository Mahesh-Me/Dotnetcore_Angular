

namespace Domain.Dtos
{
    public class LogInResponseDto
    {
        public string? Token { get; set; }
        public int? UserId { get; set; }
        public string? UserEmail { get; set; }
    }
}
