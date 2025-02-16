using filmHive.API.Controllers.BaseController;
using filmHive.Model;
using filmHive.Model.Request;
using filmHive.Model.SearchObject;
using filmHive.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace filmHive.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : BaseCRUDControllerAsync<Model.User, UserSearchObject, UserInsertRequest, UserUpdateRequest>
    {
        public UserController(IUserService service)
         : base(service)
        {
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public Model.User Login(string username, string password)
        {
            return (_service as IUserService).Login(username, password);
        }
        [AllowAnonymous]
        public override Task<User> Insert(UserInsertRequest request, CancellationToken cancellationToken = default)
        {
            return base.Insert(request, cancellationToken);
        }
    }
}
