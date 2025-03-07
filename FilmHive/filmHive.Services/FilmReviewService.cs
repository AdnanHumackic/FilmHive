using filmHive.Model.Request;
using filmHive.Model.SearchObject;
using filmHive.Services.Auth;
using filmHive.Services.BaseServices.Implementation;
using filmHive.Services.Database;
using MapsterMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace filmHive.Services
{
    public class FilmReviewService : BaseCRUDServiceAsync<Model.FilmReview, FilmReviewSearchObject, Database.FilmReview, FilmReviewInsertObject, FilmReviewUpdateObject>, IFilmReviewService
    {
        public FilmReviewService(FilmHiveContext context, IMapper mapper, ICurrentUserServiceAsync currentUserService) : base(context, mapper, currentUserService)
        {
        }

        public override IQueryable<FilmReview> AddFilter(FilmReviewSearchObject search, IQueryable<FilmReview> query)
        {
            query = base.AddFilter(search, query);

            if (search.FilmReviewId != null)
            {
                query=query.Where(x=>x.FilmReviewId==search.FilmReviewId);
            }

            if (search.UserId != null)
            {
                query=query.Where(x=>x.UserId==search.UserId);
            }

            if (search.MovieId != null)
            {
                query=query.Where(x=>x.MovieId==search.MovieId);
            }

            if (search.GradeGTE != null)
            {
                query = query.Where(x => x.Grade > search.GradeGTE);
            }

            if (search.GradeLTE != null)
            {
                query = query.Where(x => x.Grade < search.GradeLTE);
            }

            if (search.ReviewDateGTE != null)
            {
                query = query.Where(x => x.ReviewDate > search.ReviewDateGTE);
            }

            if (search.ReviewDateLTE != null)
            {
                query = query.Where(x => x.ReviewDate < search.ReviewDateLTE);
            }

            return query;
        }

        public override async Task BeforeInsertAsync(FilmReviewInsertObject request, FilmReview entity, CancellationToken cancellationToken = default)
        {
            entity.ReviewDate=DateTime.Now;
            await base.BeforeInsertAsync(request, entity, cancellationToken);
        }

        public override async Task BeforeUpdateAsync(FilmReviewUpdateObject request, FilmReview entity, CancellationToken cancellationToken = default)
        {
            entity.ReviewDate=DateTime.Now;
            await base.BeforeUpdateAsync(request, entity, cancellationToken);
        }

        public async Task<int> CountUsersWhoReviewedFilm(int filmId, CancellationToken cancellationToken)
        {
            var numberOfUsers = await Context.FilmReviews
                .Where(x => x.MovieId == filmId && x.IsActive==true)
                .CountAsync(cancellationToken);

            return numberOfUsers;
        }
    }
}
