using System;
using System.Collections.Generic;
using System.Text;

namespace filmHive.Model.Request
{
    public class PersonUpdateRequest
    {
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public byte[]? ProfilePicture { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsActive { get; set; }
    }
}
