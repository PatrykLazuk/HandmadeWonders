using HandmadeWondersAPI.DTOs;
using HandmadeWondersAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HandmadeWondersAPI.Data
{
    public interface IPostRepository
    {
        Task CreatePost(CreatedPostDTO postModel);
        Task<IEnumerable<PostModel>> GetAllPosts();
        Task<PostModel> GetPost(int id);
        Task UpdatePost(PostModel postModel);
        Task DeletePost(int id);
        Task <IEnumerable<PostPictureModelDTO>>GetAllPictures();
    }
}
