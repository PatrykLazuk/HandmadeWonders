using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.Sqlite;

namespace HandmadeWondersAPI.Data
{
    public class DbConnect
    {
        public async Task<IEnumerable<T>> LoadData<T,U>(string sqlStatement, U parameters, string connectionString)
        {
            using (IDbConnection connection = new SqliteConnection(connectionString))
            {
                var rows = await connection.QueryAsync<T>(sqlStatement, parameters);
                return rows;
            }
        }

        public async Task SaveData<T>(string sqlStatement, T parameters, string connectionString)
        {
            using (IDbConnection connection = new SqliteConnection(connectionString))
            {
                await connection.ExecuteAsync(sqlStatement, parameters);
            }
        }
    }
}
