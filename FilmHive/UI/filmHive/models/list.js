import User from "./user";

class List{
    constructor(data) {
        this.listId = data.listId;
        this.userId = data.userId;
        this.listName = data.listName;
        this.listDescription = data.listDescription;
        this.isDeleted = data.isDeleted;
        this.isActive = data.isActive;
        this.timeOfDeletion = data.timeOfDeletion; 
        this.createdAt = data.createdAt;
        this.modifiedAt = data.modifiedAt;
        this.modifiedBy = data.modifiedBy;
        // this.listFilms = data.listFilms || [];
        this.user = data.user ? new User(data.user) : null;
    }
}
export default List;