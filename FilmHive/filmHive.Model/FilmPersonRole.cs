using System;
using System.Collections.Generic;
using System.Text;

namespace filmHive.Model
{
    public class FilmPersonRole
    {
        public int FilmPersonRoleId { get; set; }

        public int FilmId { get; set; }

        public int PersonId { get; set; }

        public int FilmRoleId { get; set; }

        public bool IsDeleted { get; set; }

        public bool IsActive { get; set; }

        public DateTime? TimeOfDeletion { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime? ModifiedAt { get; set; }

        public int? ModifiedBy { get; set; }

        public virtual Film? Film { get; set; }

        public virtual FilmRole? FilmRole { get; set; }

        public virtual Person? Person { get; set; }
    }
}
