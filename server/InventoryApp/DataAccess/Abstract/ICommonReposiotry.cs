
using Domain.Dtos;

namespace DataAccess.Abstract
{
    public interface ICommonReposiotry
    {
        List<CategoryMasterDto> GetAllCategoryMasterData();
    }
}
