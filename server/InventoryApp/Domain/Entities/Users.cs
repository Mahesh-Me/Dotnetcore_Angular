
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    [Table("Users",Schema ="dbo")]
    public class Users
    {
        public int Id { get; set; }
        public string? EmailId { get; set; }
        public string? Password { get; set; }
        public string? FullName { get; set; }
        public string? MobileNumber { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public bool IsActive { get; set; }
    }
}
