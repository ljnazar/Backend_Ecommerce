import CartMongooseDao from '../daos/cartMongooseDao.js';

export default class CartService {

    constructor() {
        this.cartMongooseDao = new CartMongooseDao();
    }

    async getCart(cid) {
        const idFound = await this.cartMongooseDao.getCart(cid);
        return idFound
    }

    async addProductToCart({ cid, pid }) {
        const productDocument = await this.cartMongooseDao.addProductToCart({ cid, pid });
        return productDocument;
    }
    
    async deleteProductInCart({ cid, pid }) {
        const deleteProduct = await this.cartMongooseDao.deleteProductInCart({ cid, pid });
        return deleteProduct
    }
    
    async cleanCart({ cid }) {
        const deleteProduct = await this.cartMongooseDao.cleanCart({ cid });
        return deleteProduct
    }
    
    async updateQuantityProduct({ cid, pid }, { quantity }) {
        const productUpdate = await this.cartMongooseDao.updateQuantityProduct({ cid, pid }, { quantity });
        return productUpdate
    }

}