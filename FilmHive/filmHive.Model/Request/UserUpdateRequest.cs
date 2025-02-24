using System;
using System.Collections.Generic;
using System.Text;

namespace filmHive.Model.Request
{
    public class UserUpdateRequest
    {
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string Username { get; set; } = null!;
        public string? Biography { get; set; }
        public string? NewPassword { get; set; }
        public string? PasswordConfirmation { get; set; }
        public byte[]? ProfilePicture { get; set; }
        public byte[]? ProfileThumbnail { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsActive { get; set; }
      
    }
}
