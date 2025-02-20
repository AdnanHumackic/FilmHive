using filmHive.Model.Request;
using filmHive.Model.SearchObject;
using filmHive.Services.Auth;
using filmHive.Services.BaseServices.Implementation;
using filmHive.Services.Database;
using filmHive.Services.ExceptionFilter;
using MapsterMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace filmHive.Services
{
    public class UserService : BaseCRUDServiceAsync<Model.User, UserSearchObject, Database.User, UserInsertRequest, UserUpdateRequest>, IUserService
    {
        private readonly IPasswordService _passwordService;

        public UserService(FilmHiveContext context, IMapper mapper, IPasswordService passwordService, ICurrentUserServiceAsync currentUserService) : base(context, mapper, currentUserService)
        {
            _passwordService = passwordService;
        }

        public override IQueryable<User> AddFilter(UserSearchObject search, IQueryable<User> query)
        {
            query = base.AddFilter(search, query);

            if (search.UserId != null) 
            {
                query=query.Where(x=>x.UserId==search.UserId);
            }

            if (!string.IsNullOrWhiteSpace(search.FirstNameGTE))
            {
                query = query.Where(x => x.FirstName.StartsWith(search.FirstNameGTE));
            }

            if (!string.IsNullOrWhiteSpace(search.LastNameGTE))
            {
                query = query.Where(x => x.LastName.StartsWith(search.LastNameGTE));
            }

            if (!string.IsNullOrWhiteSpace(search.FirstLastNameGTE)
                && string.IsNullOrWhiteSpace(search.FirstNameGTE)
                && string.IsNullOrWhiteSpace(search.LastNameGTE))
            {
                query = query.Where(x => (x.FirstName + " " + x.LastName).StartsWith(search.FirstLastNameGTE));
            }

            if (!string.IsNullOrWhiteSpace(search.EmailGTE))
            {
                query = query.Where(x => x.Email.StartsWith(search.EmailGTE));
            }

            if (!string.IsNullOrWhiteSpace(search.PhoneGTE))
            {
                query = query.Where(x => x.Phone.StartsWith(search.PhoneGTE));
            }

            if (!string.IsNullOrWhiteSpace(search.UsernameGTE))
            {
                query = query.Where(x => x.Username.StartsWith(search.UsernameGTE));
            }

            if (search.RoleId != null)
            {
                query = query.Where(x => x.Role.RoleId == search.RoleId);
            }

            return query;
        }

        public override async Task BeforeInsertAsync(UserInsertRequest request, User entity, CancellationToken cancellationToken = default)
        {
            if(request.Password!=request.PasswordConfirmation)
            {
                throw new UserException("Password and PasswordConfirmation fields must match.");
            }

            entity.PasswordSalt = _passwordService.GenerateSalt();
            entity.PasswordHash = _passwordService.GenerateHash(entity.PasswordSalt, request.Password);

            await base.BeforeInsertAsync(request, entity, cancellationToken);
        }

        public override async Task BeforeUpdateAsync(UserUpdateRequest request, User entity, CancellationToken cancellationToken = default)
        {
            await base.BeforeUpdateAsync(request, entity, cancellationToken);

            if (request.NewPassword != null)
            {
                if (request.NewPassword != request.PasswordConfirmation)
                {
                    throw new UserException("NewPassword and PasswordConfirmation fields must match.");
                }

                entity.PasswordSalt = _passwordService.GenerateSalt();
                entity.PasswordHash = _passwordService.GenerateHash(entity.PasswordSalt, request.NewPassword);
            }

        }

        public Model.User Login(string username, string password)
        {
            var entity = Context.Users.Include(x => x.Role).FirstOrDefault(x => x.Username == username);

            if (entity == null) 
            {
                return null;
            }

            var hash = _passwordService.GenerateHash(entity.PasswordSalt, password);

            if (hash != entity.PasswordHash)
            {
                return null;
            }

            return Mapper.Map<Model.User>(entity);
        }
    }
}
