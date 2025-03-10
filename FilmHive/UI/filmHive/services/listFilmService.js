import BaseProvider from "./baseService";

class ListFilmService extends BaseProvider {
    constructor(){
        super('ListFilm')
    }

    async addListFilm(listFilm){
        const response = await this.insert(listFilm);
        return response;
    }
}
export default ListFilmService