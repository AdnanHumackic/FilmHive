using System;
using System.Collections.Generic;
using System.Text;

namespace filmHive.Model.SearchObject
{
    public class UserSearchObject:BaseSearchObject
    {
        public int? UserId { get; set; }
        public string? FirstNameGTE { get; set; }
        public string? LastNameGTE { get; set; }
        public string? FirstLastNameGTE { get; set; }
        public string? EmailGTE { get; set; } 
        public string? PhoneGTE { get; set; } 
        public string? UsernameGTE { get; set; } 
        public int? RoleId { get; set; }
        public bool? IsUserRoleIncluded { get; set; }
    }
}
