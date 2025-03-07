import BaseProvider from './baseService';
import FilmFavorite from '../models/filmFavorite';
import axios from 'axios';

class FilmFavoriteService extends BaseProvider {
    constructor() {
        super('FilmFavorite');
    }

    async getFilmFavorites(filter = {}) {
        const response = await this.get(filter);
        return {
            count: response.count,
            resultList: response.resultList.map(item => new FilmFavorite(item)),
        };
    }

    async addFilmFavorite(filmFavorite) {
        const response = await this.insert(filmFavorite);
        return response;
    }

    async updateFilmFavorite(id, filmFavorite) {
        const response = await this.update(id, filmFavorite);
        return response;
    }

    async deleteFilmFavorite(id) {
        const response = await this.delete(id);
        return response;
    }

    async countUsersWhoFavoritedFilm(filmId){
        const url = `${BaseProvider.baseUrl}FilmFavorite/CountUsersWhoFavoritedFilm?filmId=${filmId}`;
        const headers = this.createHeaders();
        const response = await axios.get(url, { headers });
        return response.data;
    }
}
export default FilmFavoriteService;