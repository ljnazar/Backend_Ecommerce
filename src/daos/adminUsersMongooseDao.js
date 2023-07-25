import { userModel } from '../models/userSchema.js';

export default class AdminUsersMongooseDao {

    async list(filters) {

        const { limit, page, sort, query } = filters;

        //const setLimit = limit ? limit : 12;
        const setLimit = 100;
        //const setPage = page ? Number(page) : 1;
        //const setSort = sort ? { name: sort } : {};
        const setSort = { first_name: 1 };
        const setQuery = query ? { email: query } : {};

        const options = {
            lean: true,
            limit: setLimit,
            //page: setPage,
            sort: setSort,
        };

        const result = await userModel.paginate( setQuery, options );

        const setStringQuery = query ? "&query=" + query : "";

        let resultFormatted = {
            status: 200,
            payload : result.docs,
            totalResults: result.totalDocs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `http://localhost:8080/api/meetings?page=${setPage-1}&limit=${setLimit}${setStringQuery}` : null,
            nextLink: result.hasNextPage ? `http://localhost:8080/api/meetings?page=${setPage+1}&limit=${setLimit}${setStringQuery}` : null
        }

        return resultFormatted;

    }

    async update(id, newRole) {
        const result = await userModel.updateOne({ _id: id }, { $set: { role: newRole }});
        return result;
    }

    async deleteOne(id) {
        const result = await userModel.deleteOne({ _id: id });
        return result;
    }

    async deleteMany(ids) {
        const result = await userModel.deleteMany({ _id: { $in: ids } });
        return result;
    }
    
}