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
    public class FilmFavoriteService : BaseCRUDServiceAsync<Model.FilmFavorite, FilmFavoriteSearchObject, Database.FilmFavorite, FilmFavoriteInsertRequest, FilmFavoriteUpdateRequest>, IFilmFavoriteService
    {
        public FilmFavoriteService(FilmHiveContext context, IMapper mapper, ICurrentUserServiceAsync currentUserService) : base(context, mapper, currentUserService)
        {
        }

        public override IQueryable<FilmFavorite> AddFilter(FilmFavoriteSearchObject search, IQueryable<FilmFavorite> query)
        {
            query = base.AddFilter(search, query);

            if (search.FilmFavoriteId != null)
            {
                query=query.Where(x=>x.FilmFavoriteId==search.FilmFavoriteId);
            }

            if (search.MovieId != null)
            {
                query = query.Where(x => x.MovieId == search.MovieId);
            }

            if (search.UserId != null)
            {
                query=query.Where(x=>x.UserId==search.UserId);
            }

            return query;
        }
    }
}
