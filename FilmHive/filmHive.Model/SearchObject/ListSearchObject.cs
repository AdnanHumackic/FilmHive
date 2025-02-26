using System;
using System.Collections.Generic;
using System.Text;

namespace filmHive.Model.SearchObject
{
    public class ListSearchObject:BaseSearchObject
    {
        public int? ListId { get; set; }
        public int? UserId { get; set; }
        public string? ListNameGTE { get; set; } 
    }
}
