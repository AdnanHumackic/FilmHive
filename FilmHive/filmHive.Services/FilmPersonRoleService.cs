using filmHive.Model.SearchObject;
using filmHive.Services.Auth;
using filmHive.Services.BaseServices.Implementation;
using filmHive.Services.Database;
using MapsterMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace filmHive.Services
{
    public class FilmPersonRoleService : BaseServiceAsync<Model.FilmPersonRole, FilmPersonRoleSearchObject, Database.FilmPersonRole>, IFilmPersonRoleService
    {
        public FilmPersonRoleService(FilmHiveContext context, IMapper mapper, ICurrentUserServiceAsync currentUserService) : base(context, mapper, currentUserService)
        {
        }

        public override IQueryable<FilmPersonRole> AddFilter(FilmPersonRoleSearchObject search, IQueryable<FilmPersonRole> query)
        {
            query = base.AddFilter(search, query);

            if (search.FilmPersonRoleId != null)
            {
                query = query.Where(x => x.FilmPersonRoleId == search.FilmPersonRoleId);
            }

            if (search.FilmId != null)
            {
                query=query.Where(x=>x.FilmId==search.FilmId);
            }

            if (search.PersonId != null)
            {
                query=query.Where(x=>x.PersonId==search.PersonId);
            }

            if (search.FilmRoleId != null)
            {
                query = query.Where(x => x.FilmRoleId == search.FilmRoleId);
            }

            return query;
        }
    }
}
