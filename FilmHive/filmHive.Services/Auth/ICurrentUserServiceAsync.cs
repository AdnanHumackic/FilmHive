using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace filmHive.Services.Auth
{
    public interface ICurrentUserServiceAsync
    {
        int? GetActiveUserId();
        string? GetActiveUsername();
        string? GetActiveUserRole();
    }
}
