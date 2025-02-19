class Film {
    constructor(data) {
        this.filmId = data.filmId;
        this.title = data.title;
        this.description = data.description;
        this.duration = data.duration;
        this.releaseYear = data.releaseYear;
        this.poster = data.poster;
        this.thumbnail = data.thumbnail;
        this.trailerUrl = data.trailerUrl;
        this.releaseYear = data.releaseYear;
        this.status = data.status;
        this.isDeleted = data.isDeleted;
        this.isActive = data.isActive;
        this.timeOfDeletion = data.timeOfDeletion;
        this.createdAt = data.createdAt;
        this.modifiedAt = data.modifiedAt;
        this.modifiedBy = data.modifiedBy;
    }
}
export default Film;