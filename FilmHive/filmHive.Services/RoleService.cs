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
    public class RoleService : BaseCRUDServiceAsync<Model.Role, RoleSearchObject, Database.Role, RoleInsertRequest, RoleUpdateRequest>, IRoleService
    {
        public RoleService(FilmHiveContext context, IMapper mapper, ICurrentUserServiceAsync currentUserService) : base(context, mapper, currentUserService)
        {
        }

        public override IQueryable<Role> AddFilter(RoleSearchObject search, IQueryable<Role> query)
        {
            query = base.AddFilter(search, query);

            if (search.RoleId != null) 
            {
                query = query.Where(x => x.RoleId == search.RoleId);
            }

            if (!string.IsNullOrWhiteSpace(search.NameGTE))
            {
                query=query.Where(x=>x.Name.StartsWith(search.NameGTE));
            }

            return query;
        }
    }
}
