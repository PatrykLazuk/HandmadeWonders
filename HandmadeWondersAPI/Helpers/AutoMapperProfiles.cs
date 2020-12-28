using AutoMapper;
using HandmadeWondersAPI.DTOs;
using HandmadeWondersAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HandmadeWondersAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<UserModel,UserToShow>();

            CreateMap<PostModel,PostThumbinalDTO>();
        }
    }
}
