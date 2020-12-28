using HandmadeWondersAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HandmadeWondersAPI.Data
{
    public interface IUsersRepository
    {
        Task<IEnumerable<UserModel>> GetAll();
        Task<UserModel> GetUser(int id);
        Task CreateUser(string username);
        Task UpdateUser(int id, string username);
        Task DeleteUser(int id);
    }
}