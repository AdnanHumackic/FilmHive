using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace filmHive.Services.Database
{
    internal interface ISoftDelete
    {
        public bool IsDeleted { get; set; }
        public DateTime? TimeOfDeletion { get; set; }

        public void Undo()
        {
            IsDeleted = false;
            TimeOfDeletion = null;
        }
    }
}
