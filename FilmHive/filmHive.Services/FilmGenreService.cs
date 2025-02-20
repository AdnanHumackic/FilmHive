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
    public class FilmGenreService : BaseServiceAsync<Model.FilmGenre, FilmGenreSearchObject, Database.FilmGenre>, IFilmGenreService
    {
        public FilmGenreService(FilmHiveContext context, IMapper mapper, ICurrentUserServiceAsync currentUserService) : base(context, mapper, currentUserService)
        {
        }

        public override IQueryable<FilmGenre> AddFilter(FilmGenreSearchObject search, IQueryable<FilmGenre> query)
        {
            query = base.AddFilter(search, query);

            if (search.FilmGenreId != null)
            {
                query=query.Where(x=>x.FilmGenreId==search.FilmGenreId);
            }

            if (search.FilmId != null)
            {
                query=query.Where(x=>x.FilmId==search.FilmId);
            }

            if (search.GenreId != null)
            {
                query = query.Where(x => x.GenreId == search.GenreId);
            }

            return query;
        }
    }
}
