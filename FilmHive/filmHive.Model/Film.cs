using System;
using System.Collections.Generic;
using System.Text;

namespace filmHive.Model
{
    public class Film
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

    }
}
