using HandmadeWondersAPI.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace HandmadeWondersAPI.Data
{
    public class UsersRepository : IUsersRepository
    {
        private readonly DbConnect _db = new DbConnect();
        private string _connectionString;
        public UsersRepository()
        {
            this._connectionString = GetConnectionString();
        }

        public async Task<IEnumerable<UserModel>> GetAll()
        {
            string sql = "SELECT Id, UserName FROM Users";

            var list = await _db.LoadData<UserModel,dynamic>(sql, new { }, _connectionString);

            return list;
        }

        public async Task<UserModel> GetUser(int id)
        {
            string sql = "SELECT Id, UserName FROM Users where Id = @Id";

            var student = await _db.LoadData<UserModel, dynamic>(sql, new { Id = id }, _connectionString);

            return student.FirstOrDefault();
        }

        public async Task CreateUser(string username)
        {
            string sql = "INSERT INTO Users (UserName) values (@UserName);";

            await _db.SaveData(sql, new { UserName = username}, _connectionString);
        }

        public async Task UpdateUser(int id, string username)
        {
            string sql = "UPDATE Users SET UserName = @UserName WHERE Id = @Id;";

            await _db.SaveData(sql, new { UserName = username, Id = id }, _connectionString);
        }

        public async Task DeleteUser(int id)
        {
            string sql = "DELETE FROM Users WHERE Id = @Id;";

            await _db.SaveData(sql, new { Id = id }, _connectionString);
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
