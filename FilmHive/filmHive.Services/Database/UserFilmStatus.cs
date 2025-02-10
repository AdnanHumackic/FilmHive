using System;
using System.Collections.Generic;

namespace filmHive.Services.Database;

public partial class UserFilmStatus
{
    public int UserFilmStatusId { get; set; }

    public int FilmId { get; set; }

    public int UserId { get; set; }

    public int Status { get; set; }

    public bool IsDeleted { get; set; }

    public bool IsActive { get; set; }

    public DateTime? TimeOfDeletion { get; set; }

    public DateTime CreatedAd { get; set; }

    public DateTime? ModifiedAt { get; set; }

    public int? ModifiedBy { get; set; }

    public virtual Film Film { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
