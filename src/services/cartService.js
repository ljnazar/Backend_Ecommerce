import CartMongooseDao from '../daos/cartMongooseDao.js';

export default class CartService {

    constructor() {
        this.cartMongooseDao = new CartMongooseDao();
    }

    async create(){
        const cart = await this.cartMongooseDao.create();
        return cart;
    }

    async getCart({ cid }) {
        const idFound = await this.cartMongooseDao.getCart(cid);
        return idFound;
    }

    async addProduct({ cid, pid }, { quantity }) {
        const productDocument = await this.cartMongooseDao.addProduct(cid, pid, quantity);
        return productDocument;
    }
    
    async deleteProduct({ cid, pid }) {
        const deleteProduct = await this.cartMongooseDao.deleteProduct(cid, pid);
        return deleteProduct;
    }
    
    async cleanCart({ cid }) {
        const deleteProduct = await this.cartMongooseDao.cleanCart(cid);
        return deleteProduct;
    }
    
    // async updateQuantityProduct({ cid, pid }, { quantity }) {
    //     const productUpdate = await this.cartMongooseDao.updateQuantityProduct(cid, pid, quantity);
    //     return productUpdate;
    // }

}