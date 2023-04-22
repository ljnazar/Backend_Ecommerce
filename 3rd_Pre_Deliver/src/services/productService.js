import ProductsMongooseDao from '../daos/productsMongooseDao.js';

class ProductService {

    constructor() {
        this.productMongooseDao = new ProductsMongooseDao();
    }

    async list() {
        const idFound = await this.productMongooseDao.list();
        return idFound
    }

    async create(newProduct) {
        const productDocument = await this.productMongooseDao.create(newProduct);
        return productDocument;
    }

    async update(pid, product) {
        const productUpdate = this.productMongooseDao.update(pid, product);
        return productUpdate
    }

    async delete(pid) {
        const deleteProduct = await this.productMongooseDao.delete(pid);
        return deleteProduct
    }


}

export default ProductService;