using System;
using System.Collections.Generic;
using System.Text;

namespace filmHive.Model.SearchObject
{
    public class FilmGenreSearchObject:BaseSearchObject
    {
        public int? FilmGenreId { get; set; }
        public int? FilmId { get; set; }
        public int? GenreId { get; set; }

    }
}
