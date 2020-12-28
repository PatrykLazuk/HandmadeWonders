using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using HandmadeWondersAPI.Data;
using HandmadeWondersAPI.DTOs;
using HandmadeWondersAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SQLitePCL;

namespace HandmadeWondersAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : BaseApiController
    {
        private IUsersRepository _crud;
        private IMapper _mapper;

        public UsersController(IUsersRepository crud, IMapper mapper)
        {
            _crud = crud;
            _mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Get()
        {

            var usersFromDb = await _crud.GetAll();

            var usersToShow = _mapper.Map<IEnumerable<UserToShow>>(usersFromDb);

            return Ok(usersToShow.ToList());

        }


        [Authorize(Roles = "Admin")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var userFromDb = await _crud.GetUser(id);

            var userForShow = _mapper.Map<UserToShow>(userFromDb);

            return Ok(userForShow);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateUser(UserToCreate user)
        {
            await _crud.CreateUser(user.UserName);

            return Ok();
        }

        [HttpPut]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateUser(UserToUpdate user)
        {
            await _crud.UpdateUser(user.Id, user.UserName);

            return Ok();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            await _crud.DeleteUser(id);
            return Ok();
        }


    }
}
