using System;
using System.Collections.Generic;
using System.Text;

namespace filmHive.Model.Request
{
    public class ListInsertRequest
    {
        public int? UserId { get; set; }
        public string ListName { get; set; } = null!;
        public string? ListDescription { get; set; }
        public List<int> Film { get; set; }
        public bool IsActive { get; set; }
    }
}
