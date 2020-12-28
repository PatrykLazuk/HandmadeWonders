using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HandmadeWondersAPI.DTOs
{
    public class CreatedPostDTO
    {
        public string PostTitle { get; set; }
        public string PostText { get; set; }
        public string PostThumbinalPhotoUrl { get; set; }
        public string Category { get; set; }
    }
}
