using System;
using System.Collections.Generic;
using System.Text;

namespace filmHive.Model.Request
{
    public class UserInsertRequest
    {
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string Username { get; set; } = null!;
        public string? Biography { get; set; }
        public string Password { get; set; }
        public string PasswordConfirmation { get; set; }
        public DateTime DateOfBirth { get; set; }
        public bool IsActive { get; set; }
        public int RoleId { get; set; }
    }
}
