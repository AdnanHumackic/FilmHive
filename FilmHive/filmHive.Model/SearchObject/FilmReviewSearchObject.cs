using System;
using System.Collections.Generic;
using System.Text;

namespace filmHive.Model.SearchObject
{
    public class FilmReviewSearchObject:BaseSearchObject
    {
        public int? FilmReviewId { get; set; }
        public int? UserId { get; set; }
        public int? MovieId { get; set; }
        public decimal? GradeGTE { get; set; }
        public decimal? GradeLTE { get; set; }
        public DateTime? ReviewDateGTE { get; set; }
        public DateTime? ReviewDateLTE { get; set; }
        public bool? IsFilmIncluded { get; set; }
        public bool? IsUserIncluded { get; set; }
    }
}
