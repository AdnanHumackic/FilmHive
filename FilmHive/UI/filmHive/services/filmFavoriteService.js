import BaseProvider from './baseService';
import FilmFavorite from '../models/filmFavorite';

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
}
export default FilmFavoriteService;