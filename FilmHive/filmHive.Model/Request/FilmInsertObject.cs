﻿using System;
using System.Collections.Generic;
using System.Text;

namespace filmHive.Model.Request
{
    public class FilmInsertObject
    {
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public int? Duration { get; set; }
        public byte[]? Poster { get; set; }
        public byte[]? Thumbnail { get; set; }
        public string? TrailerUrl { get; set; }
        public List<int> Genres { get; set; }
        public DateTime ReleaseYear { get; set; }
        public int Status { get; set; }
        public bool IsActive { get; set; }
       
    }
}
