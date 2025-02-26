using System;
using System.Collections.Generic;
using System.Text;

namespace filmHive.Model.Request
{
    public class ListFilmUpdateRequest
    {
        public int ListId { get; set; }
        public int FilmId { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }

    }
}
