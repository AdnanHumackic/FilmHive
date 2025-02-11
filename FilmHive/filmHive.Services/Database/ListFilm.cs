using System;
using System.Collections.Generic;

namespace filmHive.Services.Database;

public partial class ListFilm:ISoftDelete
{
    public int ListFilmId { get; set; }

    public int ListId { get; set; }

    public int FilmId { get; set; }

    public bool IsDeleted { get; set; }

    public bool IsActive { get; set; }

    public DateTime? TimeOfDeletion { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? ModifiedAt { get; set; }

    public int? ModifiedBy { get; set; }

    public virtual Film Film { get; set; } = null!;

    public virtual List List { get; set; } = null!;
}
