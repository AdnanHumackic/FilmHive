import User from '../models/user';
import BaseProvider from './baseService';
import axios from 'axios';

class UserService extends BaseProvider {
    constructor() {
        super('User');
    }

    async getUsers(filter = {}) {
        const response = await this.get(filter);
        return {
            count: response.count,
            resultList: response.resultList.map(item => new User(item)),
        };
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
                return new User(response.data);
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
