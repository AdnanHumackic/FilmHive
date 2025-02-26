using System;
using System.Collections.Generic;
using System.Text;

namespace filmHive.Model.Request
{
    public class ListUpdateRequest
    {
        public string ListName { get; set; } = null!;
        public string? ListDescription { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsActive { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedAt { get; set; }
    }
}
