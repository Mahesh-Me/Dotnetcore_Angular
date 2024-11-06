
namespace Domain.Dtos
{
    public class CategoryBudgetDto
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public decimal ExpenseLimit { get; set; }
        public string? EmailId { get; set; }
        public string? Month { get; set; }
    }
}
