

using Domain.Entities;

namespace DataAccess.Abstract
{
    public interface IUserRepository
    {
        Users GetUserByEmailId(string emailId);
        Task<Users> SaveUser(Users user);
        Task SaveChanges();
        Task SaveUserRole(UserRoles userRole);
    }
}
