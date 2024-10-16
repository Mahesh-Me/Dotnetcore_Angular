

using Domain.Entities;

namespace DataAccess.Abstract
{
    public interface IUserRepository
    {
        Users GetUserByEmailId(string emailId);
    }
}
