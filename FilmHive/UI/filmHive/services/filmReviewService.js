import BaseProvider from './baseService';
import FilmReview from '../models/filmReview';
import axios from 'axios';

class FilmReviewService extends BaseProvider {
    constructor() {
        super('FilmReview');
    }

    async getReviews(filter = {}) {
        const response = await this.get(filter);
        return {
            count: response.count,
            resultList: response.resultList.map(item => new FilmReview(item)),
        };
    }

    async addReview(review) {
        const response = await this.insert(review);
        return response;
    }

    async updateReview(id, review) {
        const response = await this.update(id, review);
        return response;
    }

    async countUsersWhoReviewedFilm(filmId) 
    {
        const url = `${BaseProvider.baseUrl}FilmReview/CountUsersWhoReviewedFilm?filmId=${filmId}`;
        const headers = this.createHeaders();
        const response = await axios.get(url, { headers });
        return response.data;
 
    }

}
export default FilmReviewService;
