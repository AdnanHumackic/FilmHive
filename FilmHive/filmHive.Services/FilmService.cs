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
    public class FilmService : BaseCRUDServiceAsync<Model.Film, FilmSearchObject, Database.Film, FilmInsertObject, FilmUpdateObject>, IFilmService
    {
        public FilmService(FilmHiveContext context, IMapper mapper, ICurrentUserServiceAsync currentUserService) : base(context, mapper, currentUserService)
        {
        }

        public override IQueryable<Film> AddFilter(FilmSearchObject search, IQueryable<Film> query)
        {
            query = base.AddFilter(search, query);

            if(search.FilmId != null)
            {
                query = query.Where(x => x.FilmId == search.FilmId);
            }

            if (!string.IsNullOrWhiteSpace(search.TitleGTE))
            {
                query = query.Where(x => x.Title.StartsWith(search.TitleGTE));
            }

            if (search.DurationGTE != null)
            {
                query = query.Where(x => x.Duration > search.DurationGTE);
            }

            if (search.DurationLTE != null)
            {
                query = query.Where(x => x.Duration < search.DurationLTE);
            }

            if(search?.ReleaseYearGTE!=null)
            {
                query=query.Where(x=>x.ReleaseYear > search.ReleaseYearGTE);
            }

            if(search?.ReleaseYearLTE !=null)
            {
                query = query.Where(x => x.ReleaseYear < search.ReleaseYearLTE);
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
