using filmHive.Model.Request;
using filmHive.Model.SearchObject;
using filmHive.Services.Auth;
using filmHive.Services.BaseServices.Implementation;
using filmHive.Services.Database;
using MapsterMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace filmHive.Services
{
    public class GenreService : BaseCRUDServiceAsync<Model.Genre, GenreSearchObject, Database.Genre, GenreInsertRequest, GenreUpdateRequest>, IGenreService
    {
        public GenreService(FilmHiveContext context, IMapper mapper, ICurrentUserServiceAsync currentUserService) : base(context, mapper, currentUserService)
        {
        }

        public override IQueryable<Genre> AddFilter(GenreSearchObject search, IQueryable<Genre> query)
        {
            query = base.AddFilter(search, query);

            if (search.GenreId != null)
            {
                query=query.Where(x=>x.GenreId==search.GenreId);
            }

            if (!string.IsNullOrWhiteSpace(search.NameGTE))
            {
                query = query.Where(x => x.Name.StartsWith(search.NameGTE));
            }

            if (search?.IsDeleted != null)
            {
                if (search.IsDeleted == false)
                {
                    query = query.Where(x => x.IsDeleted == false || x.IsDeleted == null);
                }
                else
                {
                    query = query.Where(x => x.IsDeleted == true);
                }
            }

            if (search?.IsActive != null)
            {
                if (search.IsActive == false)
                {
                    query = query.Where(x => x.IsActive == false || x.IsActive == null);
                }
                else
                {
                    query = query.Where(x => x.IsActive == true);
                }
            }

            return query;
        }
    }
}
