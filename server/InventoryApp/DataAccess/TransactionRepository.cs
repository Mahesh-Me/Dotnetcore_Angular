

using DataAccess.Abstract;
using Domain.Entities;

namespace DataAccess
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly ApplicationDbContext _context;
        public TransactionRepository(ApplicationDbContext context) 
        { 
            _context = context;
        }

        public bool SaveBudgetDetailsOfUser(CategoryBudget categoryBudget)
        {
            if (categoryBudget == null)
            {
                throw new ArgumentException("Invalid data");
            }
            _context.CategoryBudget.Add(categoryBudget);
            _context.SaveChanges();
            return true;
        }
        public CategoryBudget GetCategoryBudget(int categoryId, string month, int userId)
        {
            CategoryBudget budgetObj = new CategoryBudget();
            if(categoryId != 0 && !string.IsNullOrEmpty(month))
            {
                budgetObj = _context.CategoryBudget.FirstOrDefault(ct => ct.UserId == userId && ct.CategoryId == categoryId
                                                          && ct.Month.Equals(month));
            }
            return budgetObj;
        }
        public bool UpdateBudgetDetails(CategoryBudget categoryBudget)
        {
            if (categoryBudget == null)
            {
                throw new ArgumentException("Invalid data");
            }
            _context.CategoryBudget.Update(categoryBudget);
            _context.SaveChanges();
            return true;
        }
        public List<CategoryBudget> GetAllCategoryListByUserId(int userId, string month)
        {
            return _context.CategoryBudget.Where(ct => ct.UserId == userId && ct.Month == month).ToList();
        }
        public CategoryBudget GetCategoryBudget(int id)
        {
            CategoryBudget budgetObj = new CategoryBudget();
            if (id != 0)
            {
                budgetObj = _context.CategoryBudget.FirstOrDefault(ct => ct.Id == id);
            }
            return budgetObj;
        }
        public bool DeleteCategoryBudget(int id) 
        {
            CategoryBudget categoryBudgetObj = GetCategoryBudget(id);
            if (categoryBudgetObj is null)
                throw new ArgumentNullException("Invalid Budget dteails");

            _context.CategoryBudget.Remove(categoryBudgetObj);
            _context.SaveChanges(true);
            return true;
        }

        public bool SaveExpenseDetailsOfUser(ExpenseTransaction categoryBudget)
        {
            if (categoryBudget == null)
            {
                throw new ArgumentException("Invalid data");
            }
            _context.ExpenseTransaction.Add(categoryBudget);
            _context.SaveChanges();
            return true;
        }
        public List<ExpenseTransaction> GetAllExpenseListByUserId(int userId, string month)
        {
            return _context.ExpenseTransaction.Where(ct => ct.UserId == userId && ct.Month == month).ToList();
        }
        public ExpenseTransaction GetCategoryExpense(int categoryId, string month, int userId)
        {
            ExpenseTransaction budgetObj = new ExpenseTransaction();
            if (categoryId != 0 && !string.IsNullOrEmpty(month))
            {
                budgetObj = _context.ExpenseTransaction.FirstOrDefault(ct => ct.UserId == userId && ct.CategoryId == categoryId
                                                          && ct.Month.Equals(month));
            }
            return budgetObj;
        }
        public bool UpdateExpenseDetails(ExpenseTransaction categoryBudget)
        {
            if (categoryBudget == null)
            {
                throw new ArgumentException("Invalid data");
            }
            _context.ExpenseTransaction.Update(categoryBudget);
            _context.SaveChanges();
            return true;
        }
    }
}
