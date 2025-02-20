using System;
using System.Collections.Generic;
using System.Text;

namespace filmHive.Model.SearchObject
{
    public class PersonSearchObject:BaseSearchObject
    {
        public int? PersonId { get; set; }
        public string? FirstNameGTE { get; set; }
        public string? LastNameGTE { get; set; }
        public string? FirstLastNameGTE { get; set; }

    }
}
