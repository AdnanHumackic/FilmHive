using filmHive.Model;
using filmHive.Model.Request;
using filmHive.Model.SearchObject;
using filmHive.Services.BaseServices.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace filmHive.Services
{
    public interface IFilmReviewService:ICRUDServiceAsync<FilmReview, FilmReviewSearchObject, FilmReviewInsertObject, FilmReviewUpdateObject>
    {
        Task<int> CountUsersWhoReviewedFilm(int filmId, CancellationToken cancellationToken);
    }
}
