using System;
using System.Collections.Generic;

namespace filmHive.Services.Database;

public partial class Genre:ISoftDelete
{
    public int GenreId { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public bool IsDeleted { get; set; }

    public bool IsActive { get; set; }

    public DateTime? TimeOfDeletion { get; set; }

    public bool CreatedAt { get; set; }

    public DateTime? ModifiedAt { get; set; }

    public int? ModifiedBy { get; set; }

    public virtual ICollection<FilmGenre> FilmGenres { get; set; } = new List<FilmGenre>();
}
