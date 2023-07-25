import ProductsMongooseDao from '../daos/productsMongooseDao.js';

export default class ProductService {

    constructor() {
        this.productsMongooseDao = new ProductsMongooseDao();
    }

    async list(filters) {
        const productsDocument = await this.productsMongooseDao.list(filters);
        return productsDocument;
    }

    async getOne(pid) {
        const productDocument = await this.productsMongooseDao.getOne(pid);
        return productDocument;
    }

    async create(newProduct) {
        const productDocument = await this.productsMongooseDao.create(newProduct);
        return productDocument;
    }

    async update(pid, product) {
        const productUpdate = await this.productsMongooseDao.update(pid, product);
        return productUpdate;
    }

    async delete(pid) {
        const deleteProduct = await this.productsMongooseDao.delete(pid);
        return deleteProduct;
    }


}