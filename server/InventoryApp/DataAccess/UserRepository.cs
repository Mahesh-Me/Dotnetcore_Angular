
using DataAccess.Abstract;
using Domain.Entities;

namespace DataAccess
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;
        public UserRepository( ApplicationDbContext context)
        { 
            _context = context;
        }

        public Users GetUserByEmailId(string emailId) 
        {
            if (emailId is null)
                throw new ArgumentException("Invalid data recieved");

            return _context?.Users.FirstOrDefault(u => u.EmailId.Equals(emailId) && u.IsActive);
        }
    }
}
