using filmHive.Services.Database;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace filmHive.Services.Auth
{
    public class CurrentUserServiceAsync : ICurrentUserServiceAsync
    {
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly FilmHiveContext context;
        public CurrentUserServiceAsync(IHttpContextAccessor httpContextAccessor,
            FilmHiveContext context)
        {
            this.httpContextAccessor = httpContextAccessor;
            this.context = context;
        }

        public int? GetActiveUserId()
        {
            var activeUser = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var role = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Role)?.Value;
            var roleDb = context.Roles.Select(x => x.Name).ToList();

            if (roleDb.Contains(role))
            {
                var activeUserDb = context.Users.Where(x => x.Username == activeUser).FirstOrDefault();

                return activeUserDb.UserId;
            }

            return null;
        }

        public string? GetActiveUsername()
        {
            var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return username;
        }

        public string? GetActiveUserRole()
        {
            var role = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Role)?.Value;

            var roleDb = context.Roles.Select(x => x.Name).ToList();

            if (roleDb.Contains(role))
            {
                return role;
            }
            return null;
        }
    }
}
