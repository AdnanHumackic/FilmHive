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
    public class ListService : BaseCRUDServiceAsync<Model.List, ListSearchObject, Database.List, ListInsertRequest, ListUpdateRequest>, IListService
    {
        private readonly ICurrentUserServiceAsync currentUserService;
        public ListService(FilmHiveContext context, IMapper mapper, ICurrentUserServiceAsync currentUserService) : base(context, mapper, currentUserService)
        {
            this.currentUserService= currentUserService;
        }

        public override IQueryable<List> AddFilter(ListSearchObject search, IQueryable<List> query)
        {
            query = base.AddFilter(search, query);

            if (search.ListId != null)
            {
                query=query.Where(x=>x.ListId==search.ListId);
            }

            if (search.UserId != null)
            {
                query=query.Where(x=>x.UserId==search.UserId);
            }

            if (!string.IsNullOrWhiteSpace(search.ListNameGTE))
            {
                query = query.Where(x => x.ListName.StartsWith(search.ListNameGTE));
            }

            return query;
        }
       
        public override async Task AfterInsertAsync(ListInsertRequest request, List entity, CancellationToken cancellationToken = default)
        {
            if (request.Film!= null)
            {
                foreach (var film in request.Film)
                {
                    Context.ListFilms.Add(new Database.ListFilm
                    {
                        ListId = entity.ListId,
                        FilmId = film,
                        IsDeleted = false,
                        IsActive = true,
                        CreatedAt = DateTime.Now,
                    });

                    await Context.SaveChangesAsync(cancellationToken);
                }
            }
            await base.AfterInsertAsync(request, entity, cancellationToken);
        }

    }
}
