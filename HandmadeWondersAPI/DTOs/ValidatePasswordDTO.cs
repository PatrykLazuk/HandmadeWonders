using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HandmadeWondersAPI.DTOs
{
    public class ValidatePasswordDTO
    {
        public int Id { get; set; }
        public string PasswordToValidate { get; set; }
    }
}
