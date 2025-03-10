import BaseProvider from './baseService';
import List from '../models/list';

class ListService extends BaseProvider {
    constructor() {
        super('List');
    }

    async getList({filter}){
        const response = await this.get(filter);
        return {
            count: response.count,
            resultList: response.resultList.map(item => new List(item)),
        };
    }
    
    async addList(list){
        const response = await this.insert(list);
        return response;
    }
}
export default ListService;