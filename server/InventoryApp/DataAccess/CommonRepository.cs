

using DataAccess.Abstract;
using Domain.Dtos;

namespace DataAccess
{
    public class CommonRepository : ICommonReposiotry
    {
        private readonly ApplicationDbContext _context;
        public CommonRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<CategoryMasterDto> GetAllCategoryMasterData()
        {
            var allCategoryData = _context.CategoryMaster.ToList();
            List<CategoryMasterDto> categoryList = new List<CategoryMasterDto>();
            foreach (var category in allCategoryData) 
            {
                categoryList.Add(new CategoryMasterDto 
                { 
                    Id = category.Id,
                    CategoryName = category.CategoryName,
                    IconLink = category.IconLink,
                });
            }
            return categoryList;
        }
    }
}
