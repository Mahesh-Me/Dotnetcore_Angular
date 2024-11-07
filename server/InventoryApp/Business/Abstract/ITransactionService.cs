
using Domain.Dtos;
using Domain.Entities;

namespace Business.Abstract
{
    public interface ITransactionService
    {
        bool SaveBudgetDetailsOfUser(CategoryBudgetDto categoryBudgetDto);
        List<CategoryBudget> GetAllBudgetDetails(string emailId, string month);
        bool UpdateBudgetDetails(CategoryBudget categoryBudget);
        bool DeleteBudgetDetails(int id);
        bool SaveExpenseDetailsOfUser(TransactionExpenseDto expenseDto);
        List<ExpenseTransaction> GetAllExpenseDetails(string emailId, string month);
    }
}
