
using Domain.Dtos;

namespace DataAccess.Abstract
{
    interface ICommonReposiotry
    {
        List<CategoryMasterDto> GetAllCategoryMasterData();
    }
}
