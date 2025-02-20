using filmHive.Model.Request;
using filmHive.Model.SearchObject;
using filmHive.Services.Auth;
using filmHive.Services.BaseServices.Implementation;
using filmHive.Services.Database;
using MapsterMapper;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace filmHive.Services
{
    public class PersonService : BaseCRUDServiceAsync<Model.Person, PersonSearchObject, Database.Person, PersonInsertRequest, PersonUpdateRequest>, IPersonService
    {
        public PersonService(FilmHiveContext context, IMapper mapper, ICurrentUserServiceAsync currentUserService) : base(context, mapper, currentUserService)
        {
        }

        public override IQueryable<Person> AddFilter(PersonSearchObject search, IQueryable<Person> query)
        {
            query = base.AddFilter(search, query);

            if (search.PersonId != null)
            {
                query=query.Where(x=>x.PersonId==search.PersonId);
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
            return query;
        }

        public override async Task AfterInsertAsync(PersonInsertRequest request, Person entity, CancellationToken cancellationToken = default)
        {
            if (request.FilmId != null && request.FilmRoleId!=null)
            {
                Context.FilmPersonRoles.Add(new Database.FilmPersonRole
                {
                    FilmId=request.FilmId,
                    FilmRoleId=request.FilmRoleId,
                    PersonId=entity.PersonId,
                    IsActive=true,
                    IsDeleted=false,
                    CreatedAt=DateTime.Now,
                });

                await Context.SaveChangesAsync(cancellationToken);
            }

            await base.AfterInsertAsync(request, entity, cancellationToken);
        }
    }
}
