using System;
using System.Collections.Generic;
using System.Text;

namespace filmHive.Model
{
    public class User
    {
        public int UserId { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string Username { get; set; } = null!;
        public string? Biography { get; set; }
        public byte[]? ProfilePicture { get; set; }
        public byte[]? ProfileThumbnail { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsActive { get; set; }
        public DateTime? TimeOfDeletion { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? ModifiedAt { get; set; }
        public int? ModifiedBy { get; set; }
        public int RoleId { get; set; }
        public virtual Role Role { get; set; }
    }
}
