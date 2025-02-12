using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace filmHive.Services.Auth
{
    public interface IPasswordService
    {
        string GenerateSalt();
        string GenerateHash(string salt, string password);
    }
}
