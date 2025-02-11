using System;
using System.Collections.Generic;

namespace filmHive.Services.Database;

public partial class Role:ISoftDelete
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

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
