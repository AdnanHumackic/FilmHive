using System;
using System.Collections.Generic;
using System.Text;

namespace filmHive.Model.Request
{
    public class PersonInsertRequest
    {
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public byte[]? ProfilePicture { get; set; }
        public DateTime? BirthDate { get; set; }
        public bool IsActive { get; set; }
        public int FilmId { get; set; }
        public int FilmRoleId { get; set; }
    }
}
