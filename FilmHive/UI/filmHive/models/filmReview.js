import User from "./user";

class FilmReview {
    constructor(data) {
        this.filmReviewId = data.filmReviewId;
        this.userId = data.userId;
        this.movieId = data.movieId;
        this.grade = data.grade;
        this.comment = data.comment;
        this.reviewDate = data.reviewDate;
        this.isDeleted = data.isDeleted;
        this.isActive = data.isActive;
        this.timeOfDeletion = data.timeOfDeletion;
        this.createdAt = data.createdAt;
        this.modifiedAt = data.modifiedAt;
        this.modifiedBy = data.modifiedBy;
        this.user = data.user ? new User(data.user) : null;
    }
}

export default FilmReview;
