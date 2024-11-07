
using Business.Abstract;
using DataAccess.Abstract;
using Domain.Dtos;
using Domain.Entities;

namespace Business
{
    public class TransactionService : ITransactionService
    {
        private readonly ITransactionRepository _transactionRepository;
        private readonly IUserRepository _userRepository;
        public TransactionService(ITransactionRepository transactionRepository, IUserRepository userRepository)
        {
            _transactionRepository = transactionRepository;
            _userRepository = userRepository;
        }

        public bool SaveBudgetDetailsOfUser(CategoryBudgetDto categoryBudgetDto)
        {
            if (categoryBudgetDto is null)
                throw new ArgumentNullException("Invalid Details Recieved");

            if (categoryBudgetDto.EmailId == null)
                throw new ArgumentNullException("An Error Occured....");

            Users userByEmailId = _userRepository.GetUserByEmailId(categoryBudgetDto.EmailId);

            if (userByEmailId is null)
                throw new ArgumentException("Not Authorized....");

            //check if against the same category and same month already exist budget
            CategoryBudget budgetObj = _transactionRepository.GetCategoryBudget(categoryBudgetDto.CategoryId, categoryBudgetDto.Month!, userByEmailId.Id);
            if (budgetObj != default)
            {
                budgetObj.ExpenseLimit = Convert.ToInt32(budgetObj.ExpenseLimit + categoryBudgetDto.ExpenseLimit);
                _transactionRepository.UpdateBudgetDetails(budgetObj);
            }
            else
            {
                CategoryBudget categoryBudgetObj = new CategoryBudget();
                categoryBudgetObj.CategoryId = categoryBudgetDto.CategoryId;
                categoryBudgetObj.UserId = userByEmailId.Id;
                categoryBudgetObj.ExpenseLimit = categoryBudgetDto.ExpenseLimit;
                categoryBudgetObj.Month = categoryBudgetDto.Month;

                _transactionRepository.SaveBudgetDetailsOfUser(categoryBudgetObj);
            }
            return true;
        }
        public List<CategoryBudget> GetAllBudgetDetails(string emailId, string month)
        {
            if (emailId is null && month is null)
                throw new ArgumentNullException("Invalid parameter recieved.");

            Users userByEmail = _userRepository.GetUserByEmailId(emailId!);
            if (userByEmail is null)
                throw new ArgumentNullException("Not Authorized...");

            List<CategoryBudget> allBudgets = new List<CategoryBudget>();
            allBudgets = _transactionRepository.GetAllCategoryListByUserId(userByEmail.Id, month);
            return allBudgets;
        }
        public bool UpdateBudgetDetails(CategoryBudget categoryBudget)
        {
            if (categoryBudget is null)
                throw new ArgumentNullException("Invalid parameter recieved");

            CategoryBudget categoryBudgetObj = _transactionRepository.GetCategoryBudget(categoryBudget.Id);

            if (categoryBudgetObj is null)
                throw new ArgumentNullException("Record Not found");

            categoryBudgetObj.ExpenseLimit = categoryBudget.ExpenseLimit;
            categoryBudgetObj.CategoryId = categoryBudget.CategoryId;
            _transactionRepository.UpdateBudgetDetails(categoryBudgetObj);
            return true;
        }
        public bool DeleteBudgetDetails(int id)
        {
            if (id == 0)
                throw new ArgumentNullException("Invalid parameter recieved");

            _transactionRepository.DeleteCategoryBudget(id);
            return true;
        }
        public bool SaveExpenseDetailsOfUser(TransactionExpenseDto expenseDto)
        {
            if (expenseDto is null)
                throw new ArgumentNullException("Invalid Details Recieved");

            if (expenseDto.EmailId == null)
                throw new ArgumentNullException("An Error Occured....");

            Users userByEmailId = _userRepository.GetUserByEmailId(expenseDto.EmailId);

            if (userByEmailId is null)
                throw new ArgumentException("Not Authorized....");

            //check if against the same category and same month already exist budget
            ExpenseTransaction budgetObj = _transactionRepository.GetCategoryExpense(expenseDto.CategoryId, expenseDto.Month!, userByEmailId.Id);
            if (budgetObj != default)
            {
                budgetObj.ExpenseAmount = Convert.ToInt32(budgetObj.ExpenseAmount + expenseDto.ExpenseAmount);
                _transactionRepository.UpdateExpenseDetails(budgetObj);
            }
            else
            {
                ExpenseTransaction expenseObj = new ExpenseTransaction();
                expenseObj.CategoryId = expenseDto.CategoryId;
                expenseObj.UserId = userByEmailId.Id;
                expenseObj.ExpenseAmount = expenseDto.ExpenseAmount;
                expenseObj.Month = expenseDto.Month;

                _transactionRepository.SaveExpenseDetailsOfUser(expenseObj);
            }
            return true;
        }
        public List<ExpenseTransaction> GetAllExpenseDetails(string emailId, string month)
        {
            if (emailId is null && month is null)
                throw new ArgumentNullException("Invalid parameter recieved.");

            Users userByEmail = _userRepository.GetUserByEmailId(emailId!);
            if (userByEmail is null)
                throw new ArgumentNullException("Not Authorized...");

            List<ExpenseTransaction> allBudgets = new List<ExpenseTransaction>();
            allBudgets = _transactionRepository.GetAllExpenseListByUserId(userByEmail.Id, month);
            return allBudgets;
        }
    }
}
