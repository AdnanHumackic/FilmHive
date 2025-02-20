using System;
using System.Collections.Generic;
using System.Text;

namespace filmHive.Model
{
    public class FilmGenre
    {
        public int FilmGenreId { get; set; }

        public int FilmId { get; set; }

        public int GenreId { get; set; }

        public bool IsDeleted { get; set; }

        public bool IsActive { get; set; }

        public DateTime? TimeOfDeletion { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime? ModifiedAt { get; set; }

        public int? ModifiedBy { get; set; }

        public virtual Film? Film { get; set; }

        public virtual Genre? Genre { get; set; }
    }
}
