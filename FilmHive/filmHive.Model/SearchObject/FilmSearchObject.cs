using System;
using System.Collections.Generic;
using System.Text;

namespace filmHive.Model.SearchObject
{
    public class FilmSearchObject:BaseSearchObject
    {
        public int? FilmId { get; set; }    
        public string? TitleGTE { get; set; } 
        public int? DurationGTE { get; set; }
        public int? DurationLTE { get; set; }
        public DateTime? ReleaseYearGTE { get; set; }
        public DateTime? ReleaseYearLTE { get; set; }
        public int? Status { get; set; }

    }
}
