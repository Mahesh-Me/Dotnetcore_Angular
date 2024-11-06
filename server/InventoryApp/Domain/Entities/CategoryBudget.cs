
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    [Table("CategoryBudget",Schema ="dbo")]
    public class CategoryBudget
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public decimal ExpenseLimit { get; set; }
        public int UserId { get; set; }
        public string? Month { get; set; }
    }
}
