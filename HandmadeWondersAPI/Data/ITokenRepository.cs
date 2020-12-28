using HandmadeWondersAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HandmadeWondersAPI.Data
{
    public interface ITokenRepository
    {
        string CreateToken(UserModel user);
    }
}
