using HandmadeWondersAPI.DTOs;
using HandmadeWondersAPI.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace HandmadeWondersAPI.Data
{
    public class PostRepository : IPostRepository
    {
        private readonly DbConnect _db = new DbConnect();
        private string _connectionString;

        public PostRepository()
        {
            this._connectionString = GetConnectionString();
        }

        public async Task CreatePost(CreatedPostDTO postModel)
        {
            string sql = "Insert Into Posts (PostTitle, PostText, PostThumbinalPhotoUrl, Category) Values (@PostTitle, @PostText, @PostThumbinalPhotoUrl, @Category);";

            await _db.SaveData(sql, new { PostTitle = postModel.PostTitle, PostText = postModel.PostText, PostThumbinalPhotoUrl = postModel.PostThumbinalPhotoUrl, Category = postModel.Category }, _connectionString);
        }

        public async Task<IEnumerable<PostModel>> GetAllPosts()
        {
            string sql = "SELECT PostId, PostTitle, PostText, PostThumbinalPhotoUrl, Category FROM Posts";

            var postsList = await _db.LoadData<PostModel, dynamic>(sql, new { }, _connectionString);

            return postsList;
        }

        public async Task<PostModel> GetPost(int id)
        {
            string sql = "SELECT PostId, PostTitle, PostText, PostThumbinalPhotoUrl, Category FROM Posts where PostId = @PostId";

            var post = await _db.LoadData<PostModel, dynamic>(sql, new { PostId = id }, _connectionString);

            return post.FirstOrDefault();
        }

        public async Task UpdatePost(PostModel postModel)
        {
            string sql = "UPDATE Posts SET PostTitle = @PostTitle, PostText = @PostText, PostThumbinalPhotoUrl = @PostThumbinalPhotoUrl, Category = @Category WHERE PostId = @PostId";

            await _db.SaveData(sql, 
                new 
                {
                    PostId = postModel.PostId,
                    PostTitle = postModel.PostTitle, 
                    PostText = postModel.PostText, 
                    PostThumbinalPhotoUrl = postModel.PostThumbinalPhotoUrl,  
                    Category = postModel.Category 
                }, 
                _connectionString);
        }

        public async Task DeletePost(int id)
        {
            string sql = "DELETE FROM Posts WHERE PostId = @Id;";

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

        public async Task<IEnumerable<PostPictureModelDTO>> GetAllPictures()
        {
            string sql = "SELECT PostThumbinalPhotoUrl FROM Posts";

            var postPictures = await _db.LoadData<PostPictureModelDTO, dynamic>(sql, new { }, _connectionString);

            return postPictures;

        }
    }
}
