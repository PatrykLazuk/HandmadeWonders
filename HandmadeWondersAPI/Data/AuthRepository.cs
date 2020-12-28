using HandmadeWondersAPI.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace HandmadeWondersAPI.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DbConnect _db = new DbConnect();
        private string _connectionString;

        public AuthRepository()
        {
            this._connectionString = GetConnectionString();
        }

        public async Task<bool> IsUsernameUnique(string username)
        {
            string sql = "SELECT * FROM Users WHERE UserName=@UserName;";

            var list = await _db.LoadData<UserModel, dynamic>(sql, new { UserName = username }, _connectionString);

            if (list.Any())
            {
                // if list have elements, username is already taken
                return false;
            }
            else
            {
                return true;
            }
        }

        public async Task AddUser(UserModel user)
        {
            string sql = "INSERT INTO Users (UserName, PasswordHash, PasswordSalt, Role) values (@UserName, @PasswordHash, @PasswordSalt, @Role);";

            await _db.SaveData(sql, 
                new 
                {
                    UserName = user.UserName, 
                    PasswordHash = user.PasswordHash,
                    PasswordSalt = user.PasswordSalt,
                    Role = user.Role
                    
                },
                _connectionString);
        }

        public async Task<UserModel> GetUser(string username)
        {
            string sql = "SELECT * FROM Users WHERE UserName=@UserName;";

            var list = await _db.LoadData<UserModel, dynamic>(sql, new { UserName = username }, _connectionString);

            return list.FirstOrDefault();
        }

        public async Task<UserModel> GetUser(int id)
        {
            string sql = "SELECT * FROM Users WHERE Id=@Id;";

            var list = await _db.LoadData<UserModel, dynamic>(sql, new { Id = id }, _connectionString);

            return list.FirstOrDefault();
        }

        public async Task ChangePassword(int id, byte[] newPassword)
        {
            string sql = "UPDATE Users SET PasswordHash=@PasswordHash WHERE Id=@Id";

            await _db.SaveData(sql, new { PasswordHash = newPassword, Id = id }, _connectionString);
        }

        private static string GetConnectionString(string connectionStringName = "Default")
        {
            string output = "";

            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appSettings.json");

            var config = builder.Build();

            output = config.GetConnectionString(connectionStringName);

            return output;
        }
    }
}
