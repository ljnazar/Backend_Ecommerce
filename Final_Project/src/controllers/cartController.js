import CartService from '../services/cartService.js';

const cartService = new CartService();

export const getCart = async (req, res, next) => {
    try {
        const result = await cartService.getCart(req.params);
        res.status(200).json({ status: "success", payload: result });
    } catch (error) {
        next(error);
    }
};

export const addProduct = async (req, res, next) => {
    try {
        //const result = await cartService.addProduct(req.params);
        const result = await cartService.addProduct(req.params, req.body);
        res.status(200).json({ status: "success", payload: result });
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const result = await cartService.deleteProduct(req.params);
        res.status(200).send({ status: "success", payload: result });
    } catch (error) {
        next(error);
    }
};

export const cleanCart = async (req, res, next) => {
    try {
        const result = await cartService.cleanCart(req.params);
        res.status(200).send({ status: "success", payload: result });
    } catch (error) {
        next(error);
    }
};

// export const updateQuantityProduct = async (req, res, next) => {
//     try {
//         const result = await cartService.updateQuantityProduct(req.params, req.body);
//         res.status(200).send({ status: "success", payload: result });
//     } catch (error) {
//         next(error);
//     }
// };