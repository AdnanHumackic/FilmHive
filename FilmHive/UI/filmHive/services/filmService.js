import BaseProvider from './baseService';
import Film from '../models/film';
class FilmService extends BaseProvider {
    constructor() {
        super('Film');
    }

    async getFilms(filter = {}) {
        const response = await this.get(filter);
        return {
            count: response.count,
            resultList: response.resultList.map(item => new Film(item)),
        };
    }
}
export default FilmService;

