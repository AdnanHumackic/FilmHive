using System;
using System.Collections.Generic;

namespace filmHive.Services.Database;

public partial class FilmFavorite:ISoftDelete
{
    public int FilmFavoriteId { get; set; }

    public int MovieId { get; set; }

    public int UserId { get; set; }

    public DateTime? AddedAt { get; set; }

    public bool IsDeleted { get; set; }

    public bool IsActive { get; set; }

    public DateTime? TimeOfDeletion { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? ModifiedAt { get; set; }

    public int? ModifiedBy { get; set; }

    public virtual Film Movie { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
