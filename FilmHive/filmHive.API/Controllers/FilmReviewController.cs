using filmHive.API.Controllers.BaseController;
using filmHive.Model;
using filmHive.Model.Request;
using filmHive.Model.SearchObject;
using filmHive.Services;
using filmHive.Services.BaseServices.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace filmHive.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FilmReviewController : BaseCRUDControllerAsync<Model.FilmReview, FilmReviewSearchObject, FilmReviewInsertObject, FilmReviewUpdateObject>
    {
        public FilmReviewController(IFilmReviewService service)
          : base(service)
        {
        }

        [HttpGet("CountUsersWhoReviewedFilm")]
        public Task<int> CountUsersWhoReviewedFilm(int filmId, CancellationToken cancellationToken)
        {
            return (_service as IFilmReviewService).CountUsersWhoReviewedFilm(filmId, cancellationToken);
        }
    }
}
