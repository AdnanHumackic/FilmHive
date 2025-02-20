using filmHive.Model.Request;
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
    public class FilmRoleService : BaseCRUDServiceAsync<Model.FilmRole, FilmRoleSearchObject, Database.FilmRole, FilmRoleInsertRequest, FilmRoleUpdateRequest>, IFilmRoleService
    {
        public FilmRoleService(FilmHiveContext context, IMapper mapper, ICurrentUserServiceAsync currentUserService) : base(context, mapper, currentUserService)
        {
        }

        public override IQueryable<FilmRole> AddFilter(FilmRoleSearchObject search, IQueryable<FilmRole> query)
        {
            query = base.AddFilter(search, query);

            if(search.FilmRoleId!= null)
            {
                query=query.Where(x=>x.FilmRoleId==search.FilmRoleId);
            }

            if(!string.IsNullOrWhiteSpace(search.NameGTE))
            {
                query = query.Where(x => x.Name.StartsWith(search.NameGTE));
            }

            return query;
        }
    }
}
