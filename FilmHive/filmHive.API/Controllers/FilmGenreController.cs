using filmHive.API.Controllers.BaseController;
using filmHive.Model;
using filmHive.Model.SearchObject;
using filmHive.Services;
using Microsoft.AspNetCore.Mvc;

namespace filmHive.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FilmGenreController : BaseControllerAsync<FilmGenre, FilmGenreSearchObject>
    {
        public FilmGenreController(IFilmGenreService service)
            : base(service)
        {
        }
    }
}
