using System;
using System.Collections.Generic;
using System.Text;

namespace filmHive.Model
{
    public class FilmFavorite
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

        public virtual Film? Movie { get; set; }

        public virtual User? User { get; set; }
    }
}
