import BaseProvider from './baseService';
import axios from 'axios';

class UserService extends BaseProvider {
    constructor() {
        super('User');
    }
    fromJson(data) {
        return {
            userId: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
            email: data.email,
            phone: data.phone,
            biography: data.biography,
            profilePicture: data.profilePicture,
            profileThumbnail: data.profileThumbnail,
            dateOfBirth: data.dateOfBirth,
            isDeleted: data.isDeleted,
            isActive: data.isActive,
            timeOfDeletion: data.timeOfDeletion,
            createdAt: data.createdAt,
            modifiedAt: data.modifiedAt,
            modifiedBy: data.modifiedBy,
            roleId: data.roleId,
        };
    }
    async getUsers(filter = {}) {
        const response = await this.get(filter);
        return response;
    }

    async addUser(user) {
        const response = await this.insert(user);
        return response;
    }

    async login(username, password) {
        const url = `${BaseProvider.baseUrl}User/login?username=${username}&password=${password}`;
        const headers = this.createHeaders();

        try {
            if (!username || !password) {
                throw new Error("Please enter username and password.");
            }

            const response = await axios.post(url, null, { headers });

            if (!response.data) {
                throw new Error("Wrong username or password..");
            }

            if (this.isValidResponse(response)) {
                const data = response.data;
                return this.fromJson(data);
            } else {
                throw new Error("Unknown error.");
            }
        } catch (error) {
            console.error('LOGIN request error:', error);
            throw new Error(error.message || "Error during login.");
        }
    }


}

export default UserService;
