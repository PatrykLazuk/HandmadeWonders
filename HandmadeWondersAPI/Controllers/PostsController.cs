using AutoMapper;
using HandmadeWondersAPI.Data;
using HandmadeWondersAPI.DTOs;
using HandmadeWondersAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HandmadeWondersAPI.Controllers
{
    public class PostsController : BaseApiController
    {
        private IPostRepository _postRepo;
        private IMapper _mapper;

        public PostsController(IPostRepository postRepo, IMapper mapper)
        {
            _postRepo = postRepo;
            _mapper = mapper;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("create-post")]
        public async Task<IActionResult> CreatePost(CreatedPostDTO postModel)
        {
            await _postRepo.CreatePost(postModel);

            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("update-post")]
        public async Task<IActionResult> UpdatePost(PostModel postModel)
        {
            await _postRepo.UpdatePost(postModel);

            return Ok();
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllPostsThumbinals()
        {
            var allPosts = await _postRepo.GetAllPosts();

            var postThumbinals = _mapper.Map<IEnumerable<PostThumbinalDTO>>(allPosts);

            return Ok(postThumbinals);
        }

        [HttpGet("pictures")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllPostsPictures()
        {
            var allPostsPictures = await _postRepo.GetAllPictures();

            return Ok(allPostsPictures);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPost(int id)
        {
            var post = await _postRepo.GetPost(id);

            return Ok(post);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            await _postRepo.DeletePost(id);
            return Ok();
        }
    }
}
