using HandmadeWondersAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HandmadeWondersAPI.Data
{
    public interface IAuthRepository
    {
        Task AddUser(UserModel user);
        Task<bool> IsUsernameUnique(string username);
        Task<UserModel> GetUser(string username);
        Task<UserModel> GetUser(int id);
        Task ChangePassword(int id, byte[] newPassword);
    }
}
