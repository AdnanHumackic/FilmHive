using System;
using System.Collections.Generic;
using System.Text;

namespace filmHive.Model.SearchObject
{
    public class GenreSearchObject:BaseSearchObject
    {
        public int? GenreId { get; set; }
        public string? NameGTE { get; set; }
        public bool? IsDeleted { get; set; }
        public bool? IsActive { get; set; }
    }
}
