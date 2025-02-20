using System;
using System.Collections.Generic;
using System.Text;

namespace filmHive.Model.Request
{
    public class FilmRoleUpdateRequest
    {
        public string Name { get; set; } 
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}
