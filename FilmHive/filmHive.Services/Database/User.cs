using System;
using System.Collections.Generic;

namespace filmHive.Services.Database;

public partial class User:ISoftDelete, ICreated, IModified
{
    public int UserId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string Username { get; set; } = null!;

    public string? Biography { get; set; }

    public string PasswordHash { get; set; } = null!;

    public string PasswordSalt { get; set; } = null!;

    public byte[]? ProfilePicture { get; set; }

    public byte[]? ProfileThumbnail { get; set; }

    public bool IsDeleted { get; set; }

    public bool IsActive { get; set; }

    public DateTime? TimeOfDeletion { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? ModifiedAt { get; set; }

    public int? ModifiedBy { get; set; }

    public int RoleId { get; set; }

    public virtual ICollection<FilmFavorite> FilmFavorites { get; set; } = new List<FilmFavorite>();

    public virtual ICollection<FilmReview> FilmReviews { get; set; } = new List<FilmReview>();

    public virtual ICollection<List> Lists { get; set; } = new List<List>();

    public virtual Role Role { get; set; } = null!;

    public virtual ICollection<UserFilmStatus> UserFilmStatuses { get; set; } = new List<UserFilmStatus>();
}
