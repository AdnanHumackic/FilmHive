using System;
using System.Collections.Generic;

namespace filmHive.Services.Database;

public partial class FilmReview: ISoftDelete, ICreated, IModified
{
    public int FilmReviewId { get; set; }

    public int UserId { get; set; }

    public int MovieId { get; set; }

    public decimal? Grade { get; set; }

    public string? Comment { get; set; }

    public DateTime ReviewDate { get; set; }

    public bool IsDeleted { get; set; }

    public bool IsActive { get; set; }

    public DateTime? TimeOfDeletion { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? ModifiedAt { get; set; }

    public int? ModifiedBy { get; set; }

    public virtual Film Movie { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
