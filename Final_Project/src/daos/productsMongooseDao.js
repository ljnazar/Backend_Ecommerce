import { productModel } from "../models/productSchema.js";

export default class ProductsMongooseDao {

    async list(filters) {

        const { limit, page, sort, query } = filters;

        const setLimit = limit ? limit : 100;
        const setPage = page ? Number(page) : 1;
        const setSort = sort ? { price: sort } : {};
        const setQuery = query ? { category: query } : {};

        const options = {
            lean: true,
            limit: setLimit,
            page: setPage,
            sort: setSort,
        };

        const result = await productModel.paginate( setQuery, options );

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
            prevLink: result.hasPrevPage ? `http://localhost:8080/api/products?page=${setPage-1}&limit=${setLimit}${setStringQuery}` : null,
            nextLink: result.hasNextPage ? `http://localhost:8080/api/products?page=${setPage+1}&limit=${setLimit}${setStringQuery}` : null
        }

        return resultFormatted;

    }

    async getOne(pid) {
        const result = await productModel.findById(pid);
        return result;
    }

    async create(product) {
        const result = await productModel.create(product);
        return result;
    }

    async update(pid, product) {
        const result = await productModel.updateOne({ _id: pid }, product);
        return result;
    }
    
    async delete(pid) {
        const result = await productModel.deleteOne({ _id: pid });
        return result;
    }
    
}
