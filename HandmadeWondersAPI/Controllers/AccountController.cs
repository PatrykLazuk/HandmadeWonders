using AutoMapper;
using HandmadeWondersAPI.Data;
using HandmadeWondersAPI.DTOs;
using HandmadeWondersAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace HandmadeWondersAPI.Controllers
{
    
    public class AccountController : BaseApiController
    {
        private IAuthRepository _context;
        private IMapper _mapper;
        private ITokenRepository _tokenRepo;
        public AccountController(IAuthRepository context, IMapper mapper, ITokenRepository tokenRepo)
        {
            _context = context;
            _mapper = mapper;
            _tokenRepo = tokenRepo;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDTO)
        {
            if(await _context.IsUsernameUnique(registerDTO.UserName.ToLower()) == false)
            {
                return BadRequest("Username already taken");
            }

            using var hmac = new HMACSHA512();

            var user = new UserModel
            {
                UserName = registerDTO.UserName,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.Password)),
                PasswordSalt = hmac.Key
            };

            //just for testing
            user.Role = user.UserName == "patryk" ? "Admin" : "User";

            await _context.AddUser(user);

            return new UserDTO
            {
                Username = user.UserName,
                Token = _tokenRepo.CreateToken(user)
            };

        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
        {
            var user = await _context.GetUser(loginDTO.UserName);

            if (user == null)
            {
                return Unauthorized("Invalid username");
            }

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computetHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Password));

            for(int i =0; i < computetHash.Length; i++)
            {
                if (computetHash[i] != user.PasswordHash[i])
                {
                    return Unauthorized("Invalid password");
                }
            }

            return new UserDTO
            {
                Username = user.UserName,
                Token = _tokenRepo.CreateToken(user)
            };
        }

        [HttpPost("validate-password")]
        [Authorize]
        public async Task<bool> ValidatePassword(ValidatePasswordDTO validatePassword)
        {
            var user = await _context.GetUser(validatePassword.Id);

            if (user == null)
            {
                return false;
            }

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computetHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(validatePassword.PasswordToValidate));

            for (int i = 0; i < computetHash.Length; i++)
            {
                if (computetHash[i] != user.PasswordHash[i])
                {
                    return false;
                }
            }

            return true;
        }

        [HttpPost("change-password")]
        [Authorize]
        public async Task<IActionResult> ChangePassword(ChangePasswordDTO changePassword)
        {
            if (await ValidatePassword(new ValidatePasswordDTO {Id=changePassword.Id, PasswordToValidate=changePassword.OldPassword }))
            {
                var user = await _context.GetUser(changePassword.Id);

                if (user == null)
                {
                    return Unauthorized();
                }

                using var hmac = new HMACSHA512(user.PasswordSalt);

                var newPasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(changePassword.NewPassword));

                await _context.ChangePassword(changePassword.Id, newPasswordHash);

                return Ok();
            }
            return Unauthorized();
        }
    }
}
