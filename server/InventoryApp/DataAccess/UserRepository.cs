
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
        public async Task<Users> SaveUser(Users user)
        {
            if (user is null)
                throw new ArgumentException("Invalid data");

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }
        public async Task SaveUserRole(UserRoles userRole)
        {
            await _context.UserRoles.AddAsync(userRole);
            await _context.SaveChangesAsync();
        }
        public async Task SaveChanges()
        {
            await _context.SaveChangesAsync();
        }
        public bool UpdateUser(Users user)
        {
            _context.Users.Update(user);
            _context.SaveChanges();
            return true;
        }
    }
}
