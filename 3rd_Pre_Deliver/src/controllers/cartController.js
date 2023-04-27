import CartService from '../services/cartService.js';

const cartService = new CartService();

export const getCart = async (req, res) => {
    const cart = await cartService.getCart(req.params);
    res.status(200).send(cart);
};

export const addProductToCart = async (req, res) => {
    try {
        const result = await cartService.addProduct(req.params);
        res.status(200).send({ status: "success", payload: result });
    } catch (error) {
        res.status(400).send({ status: "error", payload: error.message });
    }
};

export const deleteProductInCart = async (req, res) => {
    try {
        const result = await cartService.deleteProduct(req.params);
        res.status(200).send({ status: "success", payload: result });
    } catch (error) {
        res.status(400).send({ status: "error", payload: error.message });
    }
};

export const cleanCart = async (req, res) => {
    try {
        const result = await cartService.cleanCart(req.params);
        res.status(200).send({ status: "success", payload: result });
    } catch (error) {
        res.status(400).send({ status: "error", payload: error.message });
    }
};

export const updateQuantityProduct = async (req, res) => {
    try {
        const result = await cartService.updateQuantityProduct(req.params, req.body);
        res.status(200).send({ status: "success", payload: result });
    } catch (error) {
        res.status(400).send({ status: "error", payload: error.message });
    }
};