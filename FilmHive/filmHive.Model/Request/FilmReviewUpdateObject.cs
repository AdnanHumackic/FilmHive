using System;
using System.Collections.Generic;
using System.Text;

namespace filmHive.Model.Request
{
    public class FilmReviewUpdateObject
    {
        public int UserId { get; set; }
        public int MovieId { get; set; }
        public decimal? Grade { get; set; }
        public string? Comment { get; set; }
        public DateTime ReviewDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedAt { get; set; }
    }
}
