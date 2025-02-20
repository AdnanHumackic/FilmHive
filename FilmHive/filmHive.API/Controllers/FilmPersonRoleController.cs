using filmHive.API.Controllers.BaseController;
using filmHive.Model;
using filmHive.Model.SearchObject;
using filmHive.Services;
using Microsoft.AspNetCore.Mvc;

namespace filmHive.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FilmPersonRoleController : BaseControllerAsync<FilmPersonRole, FilmPersonRoleSearchObject>
    {
        public FilmPersonRoleController(IFilmPersonRoleService service)
      : base(service)
        {
        }
    }
}
