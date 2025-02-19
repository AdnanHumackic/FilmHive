class User {
    constructor(data) {
        this.userId = data.userId;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.username = data.username;
        this.email = data.email;
        this.phone = data.phone;
        this.biography = data.biography;
        this.profilePicture = data.profilePicture;
        this.profileThumbnail = data.profileThumbnail;
        this.dateOfBirth = data.dateOfBirth;
        this.isDeleted = data.isDeleted;
        this.isActive = data.isActive;
        this.timeOfDeletion = data.timeOfDeletion;
        this.createdAt = data.createdAt;
        this.modifiedAt = data.modifiedAt;
        this.modifiedBy = data.modifiedBy;
        this.roleId = data.roleId;
    }
}
export default User;