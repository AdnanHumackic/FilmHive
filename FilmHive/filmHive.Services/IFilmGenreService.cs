﻿using filmHive.Model;
using filmHive.Model.SearchObject;
using filmHive.Services.BaseServices.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace filmHive.Services
{
    public interface IFilmGenreService : IServiceAsync<FilmGenre, FilmGenreSearchObject>
    {
    }
}
