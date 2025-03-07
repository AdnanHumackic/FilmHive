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
    public class FilmFavoriteController : BaseCRUDControllerAsync<Model.FilmFavorite, FilmFavoriteSearchObject, FilmFavoriteInsertRequest, FilmFavoriteUpdateRequest>
    {
        public FilmFavoriteController(IFilmFavoriteService service)
          : base(service)
        {
        }

        [HttpGet("CountUsersWhoFavoritedFilm")]
        public Task<int> CountUsersWhoFavoritedFilm(int filmId, CancellationToken cancellationToken)
        {
            return (_service as IFilmFavoriteService).CountUsersWhoFavoritedFilm(filmId, cancellationToken);
        }
    }
}
