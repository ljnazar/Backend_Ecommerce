import mongoose from 'mongoose';
import { cartModel } from "../models/cartSchema.js";

export default class CartMongooseDao {

    async create() {
        const cart = await cartModel.create({});
        return cart;
    }

    async getCart(cid) {
        const cart = await cartModel.findOne({ _id: cid }).populate("products.product").lean();
        return cart;
    }

    async addProduct(cid, pid, quantity) {
        const cart = await cartModel.findOne({ _id: cid });
        const productId = new mongoose.Types.ObjectId(pid);
        const findProduct = cart.products.find((product) =>
            product.product.equals(productId)
        );
        if (findProduct) {
            const currentQuantity = findProduct.quantity;
            findProduct.quantity = parseInt(currentQuantity) + parseInt(quantity);
        } else {
            cart.products.push({ product: pid, quantity: parseInt(quantity) });
        }
        await cart.save();
        return cart;
    }

    async deleteProduct(cid, pid) {
        const cart = await cartModel.findOne({ _id: cid });
        const productId = new mongoose.Types.ObjectId(pid);
        const index = cart.products.findIndex((product) =>
            product.product.equals(productId)
        );
        cart.products.splice(index, 1);
        cart.save();
        return cart;
    }

    async cleanCart(cid) {
        const cart = await cartModel.findOne({ _id: cid });
        cart.products = [];
        cart.save();
        return cart;
    }

    // async updateQuantityProduct(cid, pid, quantity) {
    //     const cart = await cartModel.findOne({ _id: cid });
    //     const productId = new mongoose.Types.ObjectId(pid);
    //     if (quantity === 0) {
    //         const index = cart.products.findIndex((product) =>
    //             product.product.equals(productId)
    //         );
    //         cart.products.splice(index, 1);
    //     } else {
    //         const findProduct = cart.products.find((product) =>
    //             product.product.equals(productId)
    //         );
    //         findProduct.quantity = quantity;
    //     }
    //     await cart.save();
    //     return cart;
    // }

}