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
    public class FilmController : BaseCRUDControllerAsync<Model.Film, FilmSearchObject, FilmInsertObject, FilmUpdateObject>
    {
        public FilmController(IFilmService service)
          : base(service)
        {
        }
    }
}
