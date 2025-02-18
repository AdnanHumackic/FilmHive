import BaseProvider from './baseService';

class FilmService extends BaseProvider {
    constructor() {
        super('Film');
    }

    fromJson(data) {
        return {
            filmId: data.id,
            title: data.title,
            description: data.description,
            duration: data.duration,
            poster: data.poster,
            thumbnail: data.thumbnail,
            trailerUrl: data.trailerUrl,
            releaseYear: data.releaseYear,
            status: data.status,
            isDeleted: data.isDeleted,
            isActive: data.isActive,
            timeOfDeletion: data.timeOfDeletion,
            createdAt: data.createdAt,
            modifiedAt: data.modifiedAt,
            modifiedBy: data.modifiedBy,
        };
    }
    async getFilms(filter = {}) {
        const response = await this.get(filter);
        return response;
    }
}
export default FilmService;

