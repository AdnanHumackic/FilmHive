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
    public class ListFilmService : BaseCRUDServiceAsync<Model.ListFilm, ListFilmSearchObject, Database.ListFilm, ListFilmInsertRequest, ListFilmUpdateRequest>, IListFilmService
    {
        public ListFilmService(FilmHiveContext context, IMapper mapper, ICurrentUserServiceAsync currentUserService) : base(context, mapper, currentUserService)
        {
        }

        public override IQueryable<ListFilm> AddFilter(ListFilmSearchObject search, IQueryable<ListFilm> query)
        {
            query = base.AddFilter(search, query);

            if (search.ListFilmId != null)
            {
                query = query.Where(x => x.ListFilmId == search.ListFilmId);
            }

            if (search.ListId != null) 
            {
                query=query.Where(x=>x.ListId==search.ListId);
            }

            if (search.FilmId != null) 
            {
                query = query.Where(x => x.FilmId == search.FilmId);
            }
            return query;
        }
    }
}
