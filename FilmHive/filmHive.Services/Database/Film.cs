using System;
using System.Collections.Generic;

namespace filmHive.Services.Database;

public partial class Film:ISoftDelete, ICreated, IModified
{
    public int FilmId { get; set; }

    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public int? Duration { get; set; }

    public byte[]? Poster { get; set; }

    public byte[]? Thumbnail { get; set; }

    public string? TrailerUrl { get; set; }

    public DateTime ReleaseYear { get; set; }

    public int Status { get; set; }

    public bool IsDeleted { get; set; }

    public bool IsActive { get; set; }

    public DateTime? TimeOfDeletion { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? ModifiedAt { get; set; }

    public int? ModifiedBy { get; set; }

    public virtual ICollection<FilmFavorite> FilmFavorites { get; set; } = new List<FilmFavorite>();

    public virtual ICollection<FilmGenre> FilmGenres { get; set; } = new List<FilmGenre>();

    public virtual ICollection<FilmPersonRole> FilmPersonRoles { get; set; } = new List<FilmPersonRole>();

    public virtual ICollection<FilmReview> FilmReviews { get; set; } = new List<FilmReview>();

    public virtual ICollection<ListFilm> ListFilms { get; set; } = new List<ListFilm>();

    public virtual ICollection<UserFilmStatus> UserFilmStatuses { get; set; } = new List<UserFilmStatus>();
}
