using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HandmadeWondersAPI.Models
{
    public class PostModel
    {
        public int PostId { get; set; }
        public string PostTitle { get; set; }
        public string PostText { get; set; }
        public string PostThumbinalPhotoUrl { get; set; }
        public string Category { get; set; }
    }
}
