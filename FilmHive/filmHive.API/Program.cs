using filmHive.API.Authentication;
using filmHive.API.Filters;
using filmHive.Services;
using filmHive.Services.Auth;
using filmHive.Services.Database;
using Mapster;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("basicAuth", new Microsoft.OpenApi.Models.OpenApiSecurityScheme()
    {
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
        Scheme = "basic"
    });

    c.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement()
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference{Type = ReferenceType.SecurityScheme, Id = "basicAuth"}
            },
            new string[]{}
    } });

});

var connectionString = builder.Configuration.GetConnectionString("filmHiveConnection");

builder.Services.AddDbContext<FilmHiveContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddTransient<IPasswordService, PasswordService>();
builder.Services.AddTransient<ICurrentUserServiceAsync, CurrentUserServiceAsync>();


builder.Services.AddTransient<IRoleService, RoleService>();
builder.Services.AddTransient<IGenreService, GenreService>();
builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<IFilmService, FilmService>();
builder.Services.AddTransient<IFilmReviewService, FilmReviewService>(); 
builder.Services.AddTransient<IFilmRoleService, FilmRoleService>(); 
builder.Services.AddTransient<IPersonService, PersonService>();
builder.Services.AddTransient<IFilmPersonRoleService, FilmPersonRoleService>();
builder.Services.AddTransient<IFilmGenreService, FilmGenreService>();
builder.Services.AddTransient<IFilmFavoriteService, FilmFavoriteService>();
builder.Services.AddTransient<IListService, ListService>();
builder.Services.AddTransient<IListFilmService, ListFilmService>();



builder.Services.AddHttpContextAccessor();
builder.Services.AddMapster();
builder.Services.AddAuthentication("BasicAuthentication")
    .AddScheme<AuthenticationSchemeOptions, BasicAuthenticationHandler>("BasicAuthentication", null);
builder.Services.AddControllers(x =>
{
    x.Filters.Add<ExceptionFilter>();
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var dataContext = scope.ServiceProvider.GetRequiredService<FilmHiveContext>();
    dataContext.Database.Migrate();
}

app.Run();
