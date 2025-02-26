using System;
using System.Collections.Generic;

namespace filmHive.Services.Database;

public partial class FilmPersonRole: ISoftDelete, ICreated, IModified
{
    public int FilmPersonRoleId { get; set; }

    public int FilmId { get; set; }

    public int PersonId { get; set; }

    public int FilmRoleId { get; set; }

    public bool IsDeleted { get; set; }

    public bool IsActive { get; set; }

    public DateTime? TimeOfDeletion { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? ModifiedAt { get; set; }

    public int? ModifiedBy { get; set; }

    public virtual Film Film { get; set; } = null!;

    public virtual FilmRole FilmRole { get; set; } = null!;

    public virtual Person Person { get; set; } = null!;
}
