import { cartModel } from "../models/cartSchema.js";

export default class CartMongooseDao {

    async getCart(cid) {
        const result = await cartModel.findOne({ _id: cid }).populate("products.product").lean();
        return result;
    }

    async addProductToCart({ cid, pid }) {
        const cart = await cartModel.findOne({ _id: cid });
        const productId = new mongoose.Types.ObjectId(pid);
        const findProduct = cart.products.find((product) =>
            product.product.equals(productId)
        );
        if (findProduct) {
            findProduct.quantity++;
        } else {
            cart.products.push({ product: pid });
        }
        await cart.save();
        return cart;
    }

    async deleteProductInCart({ cid, pid }) {
        let cart = await cartModel.findOne({ _id: cid });
        const productId = new mongoose.Types.ObjectId(pid);
        const index = cart.products.findIndex((product) =>
            product.product.equals(productId)
        );
        cart.products.splice(index, 1);
        cart.save();
        return cart;
    }

    async cleanCart({ cid }) {
        const cart = await cartModel.findOne({ _id: cid });
        cart.products = [];
        cart.save();
        return cart;
    }

    async updateQuantityProduct({ cid, pid }, { quantity }) {
        const cart = await cartModel.findOne({ _id: cid });
        const productId = new mongoose.Types.ObjectId(pid);
        if (quantity === 0) {
            const index = cart.products.findIndex((product) =>
                product.product.equals(productId)
            );
            cart.products.splice(index, 1);
        } else {
            const findProduct = cart.products.find((product) =>
                product.product.equals(productId)
            );
            findProduct.quantity = quantity;
        }
        await cart.save();
        return cart;
    }

}