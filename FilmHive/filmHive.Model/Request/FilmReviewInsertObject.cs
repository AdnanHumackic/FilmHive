using System;
using System.Collections.Generic;
using System.Text;

namespace filmHive.Model.Request
{
    public class FilmReviewInsertObject
    {
        public int UserId { get; set; }
        public int MovieId { get; set; }
        public decimal? Grade { get; set; }
        public string? Comment { get; set; }
        public DateTime ReviewDate { get; set; }
        public bool IsActive { get; set; }
    }
}
