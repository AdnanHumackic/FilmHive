using System;
using System.Collections.Generic;
using System.Text;

namespace filmHive.Model.SearchObject
{
    public class FilmPersonRoleSearchObject:BaseSearchObject
    {
        public int? FilmPersonRoleId { get; set; }
        public int? FilmId { get; set; }
        public int? PersonId { get; set; }
        public int? FilmRoleId { get; set; }

    }
}
