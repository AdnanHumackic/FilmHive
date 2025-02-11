using System;
using System.Collections.Generic;

namespace filmHive.Services.Database;

public partial class Person:ISoftDelete
{
    public int PersonId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public byte[]? ProfilePicture { get; set; }

    public DateTime? BirthDate { get; set; }

    public bool IsDeleted { get; set; }

    public bool IsActive { get; set; }

    public DateTime? TimeOfDeletion { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? ModifiedAt { get; set; }

    public int? ModifiedBy { get; set; }

    public virtual ICollection<FilmPersonRole> FilmPersonRoles { get; set; } = new List<FilmPersonRole>();
}
