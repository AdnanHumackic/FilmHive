using filmHive.API.Controllers.BaseController;
using filmHive.Model.Request;
using filmHive.Model.SearchObject;
using filmHive.Services;
using Microsoft.AspNetCore.Mvc;

namespace filmHive.API.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class GenreController : BaseCRUDControllerAsync<Model.Genre, GenreSearchObject, GenreInsertRequest, GenreUpdateRequest>
    {
        public GenreController(IGenreService service)
          : base(service)
        {
        }
    }
}
