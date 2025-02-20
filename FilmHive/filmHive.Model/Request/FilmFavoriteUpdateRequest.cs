using System;
using System.Collections.Generic;
using System.Text;

namespace filmHive.Model.Request
{
    public class FilmFavoriteUpdateRequest
    {
        public int MovieId { get; set; }
        public int UserId { get; set; }
        public DateTime? AddedAt { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}
