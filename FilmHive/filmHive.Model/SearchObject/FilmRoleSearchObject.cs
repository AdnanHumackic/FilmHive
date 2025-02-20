using System;
using System.Collections.Generic;
using System.Text;

namespace filmHive.Model.SearchObject
{
    public class FilmRoleSearchObject:BaseSearchObject
    {
        public int? FilmRoleId { get; set; }

        public string? NameGTE { get; set; } 
    }
}
