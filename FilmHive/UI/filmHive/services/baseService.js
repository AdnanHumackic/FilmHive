import axios from 'axios';
import { Buffer } from 'buffer';
import AuthProvider from './authProvider';

class BaseProvider {
    static baseUrl = 'http://10.0.2.2:5200/';
    endpoint = '';

    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    async get({ filter, page, pageSize, orderBy, sortDirection } = {}) {
        let url = `${BaseProvider.baseUrl}${this.endpoint}`;

        let queryParams = {};
        if (filter) {
            queryParams = { ...queryParams, ...filter };
        }
        if (page) {
            queryParams.page = page;
        }
        if (pageSize) {
            queryParams.pageSize = pageSize;
        }
        if (orderBy) {
            queryParams.orderBy = orderBy;
        }
        if (sortDirection) {
            queryParams.sortDirection = sortDirection;
        }

        if (Object.keys(queryParams).length > 0) {
            const queryString = this.getQueryString(queryParams);
            url = `${url}?${queryString}`;
        }

        try {
            const headers = this.createHeaders();
            const response = await axios.get(url, { headers });

            if (this.isValidResponse(response)) {
                const data = response.data;
                const result = {
                    count: data.count,
                    resultList: data.resultList.map(item => this.fromJson(item)),
                };
                return result;
            } else {
                throw new Error('Unknown error');
            }
        } catch (error) {
            console.error('GET request error:', error);
            throw new Error('Something went wrong');
        }
    }

    async delete(id) {
        const url = `${BaseProvider.baseUrl}${this.endpoint}/${id}`;
        try {
            const headers = this.createHeaders();
            await axios.delete(url, { headers });
        } catch (error) {
            console.error('DELETE request error:', error);
            throw new Error('Unknown error');
        }
    }

    async insert(request) {
        const url = `${BaseProvider.baseUrl}${this.endpoint}`;
        try {
            const headers = this.createHeaders();
            const response = await axios.post(url, request, { headers });

            if (this.isValidResponse(response)) {
                return this.fromJson(response.data);
            } else {
                throw new Error('Unknown error');
            }
        } catch (error) {
            console.error('INSERT request error:', error);
            throw new Error('Unknown error');
        }
    }

    async update(id, request) {
        const url = `${BaseProvider.baseUrl}${this.endpoint}/${id}`;
        try {
            const headers = this.createHeaders();
            const response = await axios.put(url, request, { headers });

            if (this.isValidResponse(response)) {
                return this.fromJson(response.data);
            } else {
                throw new Error('Unknown error');
            }
        } catch (error) {
            console.error('UPDATE request error:', error);
            throw new Error('Unknown error');
        }
    }

    fromJson(data) {
        throw new Error('Method not implemented');
    }

    isValidResponse(response) {
        if (response.status < 299) {
            return true;
        } else if (response.status === 401) {
            throw new Error('Unauthorized');
        } else {
            console.error('Response error:', response.data);
            throw new Error('Something bad happened, please try again');
        }
    }

    createHeaders() {
        const username = AuthProvider.username ?? '';
        const password = AuthProvider.password ?? '';

        const basicAuth = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;

        return {
            'Content-Type': 'application/json',
            Authorization: basicAuth,
        };
    }

    getQueryString(params, prefix = '&', inRecursion = false) {
        let query = '';
        for (let key in params) {
            if (inRecursion) {
                if (Number.isInteger(+key)) {
                    key = `[${key}]`;
                } else if (typeof params[key] === 'object') {
                    key = `.${key}`;
                } else {
                    key = `.${key}`;
                }
            }
            const value = params[key];
            if (
                typeof value === 'string' ||
                typeof value === 'number' ||
                typeof value === 'boolean'
            ) {
                query += `${prefix}${key}=${encodeURIComponent(value)}`;
            } else if (value instanceof Date) {
                query += `${prefix}${key}=${value.toISOString()}`;
            } else if (Array.isArray(value) || typeof value === 'object') {
                const newParams = Array.isArray(value) ? value : { ...value };
                query += this.getQueryString(newParams, `${prefix}${key}`, true);
            }
        }
        return query;
    }
}

export default BaseProvider;
