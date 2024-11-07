

using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    [Table("Transaction_Expense", Schema ="dbo")]
    public class ExpenseTransaction
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public decimal ExpenseAmount { get; set; }
        public int UserId { get; set; }
        public string? Month { get; set; }
    }
}
