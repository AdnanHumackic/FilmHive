using System;
using System.Collections.Generic;
using System.Text;

namespace filmHive.Model.SearchObject
{
    public class BaseSearchObject
    {
        public bool? IsDeleted { get; set; }
        public bool? IsActive { get; set; }
        public int? Page { get; set; }
        public int? PageSize { get; set; }
        public string? OrderBy { get; set; }
        public string? SortDirection { get; set; }
        public string? IncludeTables { get; set; }

    }
}
