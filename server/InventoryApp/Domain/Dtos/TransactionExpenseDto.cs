
namespace Domain.Dtos
{
    public class TransactionExpenseDto
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public decimal ExpenseAmount { get; set; }
        public string? EmailId { get; set; }
        public string? Month { get; set; }
    }
}
