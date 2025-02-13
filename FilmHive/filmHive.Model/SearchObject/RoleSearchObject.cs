using System;
using System.Collections.Generic;
using System.Text;

namespace filmHive.Model.SearchObject
{
    public class RoleSearchObject:BaseSearchObject
    {
        public int? RoleId { get; set; }
        public string? NameGTE { get; set; }
    }
}
