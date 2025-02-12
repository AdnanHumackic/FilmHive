using System;
using System.Collections.Generic;
using System.Text;

namespace filmHive.Model
{
    public class Role
    {
        public int RoleId { get; set; }

        public string Name { get; set; } = null!;

        public string? Description { get; set; }

        public bool IsDeleted { get; set; }

        public bool IsActive { get; set; }

        public DateTime? TimeOfDeletion { get; set; }

        public DateTime CreatedAt { get; set; }

        public int? ModifiedAt { get; set; }

        public int? ModifiedBy { get; set; }
    }
}
