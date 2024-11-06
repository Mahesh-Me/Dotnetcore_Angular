

using Domain.Entities;

namespace DataAccess.Abstract
{
    public interface ITransactionRepository
    {
        bool SaveBudgetDetailsOfUser(CategoryBudget categoryBudget);
        CategoryBudget GetCategoryBudget(int categoryId, string month, int userId);
        bool UpdateBudgetDetails(CategoryBudget categoryBudget);
        List<CategoryBudget> GetAllCategoryListByUserId(int userId, string month);
        CategoryBudget GetCategoryBudget(int id);
        bool DeleteCategoryBudget(int id);
    }
}
