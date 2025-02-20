using System;
using System.Collections.Generic;
using System.Text;

namespace filmHive.Model.SearchObject
{
    public class FilmFavoriteSearchObject:BaseSearchObject
    {
        public int? FilmFavoriteId { get; set; }

        public int? MovieId { get; set; }

        public int? UserId { get; set; }

    }
}
