import Film from "./film";
import User from "./user";

class FilmFavorite{

    constructor(data){
        this.filmFavoriteId = data.filmFavoriteId;
        this.movieId = data.movieId;
        this.userId = data.userId;
        this.addedAt = data.addedAt;
        this.isDeleted = data.isDeleted;
        this.isActive = data.isActive;
        this.timeOfDeletion = data.timeOfDeletion;
        this.createdAt = data.createdAt;
        this.modifiedAt = data.modifiedAt;
        this.modifiedBy = data.modifiedBy;
        this.movie= data.movie?new Film(data.movie):null;
        this.user = data.user ? new User(data.user) : null;
    }
}
export default FilmFavorite;