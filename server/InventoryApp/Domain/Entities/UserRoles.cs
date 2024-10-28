
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    [Table("UserRoles",Schema ="dbo")]
    public class UserRoles
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int RoleId { get; set; }
    }
}
