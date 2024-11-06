using Business.Abstract;
using DataAccess.Abstract;
using Domain.Dtos;

namespace Business
{
    public class CommonService : ICommonService
    {
        private readonly ICommonReposiotry _commonRepo;
        public CommonService( ICommonReposiotry commonRepo)
        {
            _commonRepo = commonRepo;
        }

        public List<CategoryMasterDto> GetCategoryMasterData()
        {
            return _commonRepo.GetAllCategoryMasterData();
        }
    }
}
