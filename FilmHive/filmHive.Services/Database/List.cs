using System;
using System.Collections.Generic;

namespace filmHive.Services.Database;

public partial class List: ISoftDelete, ICreated, IModified
{
    public int ListId { get; set; }

    public int UserId { get; set; }

    public string ListName { get; set; } = null!;

    public string? ListDescription { get; set; }

    public bool IsDeleted { get; set; }

    public bool IsActive { get; set; }

    public DateTime? TimeOfDeletion { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? ModifiedAt { get; set; }

    public int? ModifiedBy { get; set; }

    public virtual ICollection<ListFilm> ListFilms { get; set; } = new List<ListFilm>();

    public virtual User User { get; set; } = null!;
}
