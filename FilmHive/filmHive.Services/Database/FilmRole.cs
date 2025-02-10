using System;
using System.Collections.Generic;

namespace filmHive.Services.Database;

public partial class FilmRole
{
    public int FilmRoleId { get; set; }

    public string Name { get; set; } = null!;

    public bool IsDeleted { get; set; }

    public bool IsActive { get; set; }

    public DateTime? TimeOfDeletion { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? ModifiedAt { get; set; }

    public int? ModifiedBy { get; set; }

    public virtual ICollection<FilmPersonRole> FilmPersonRoles { get; set; } = new List<FilmPersonRole>();
}
