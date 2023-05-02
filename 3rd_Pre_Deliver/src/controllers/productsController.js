import ProductService from '../services/productService.js';

const productService = new ProductService();

export const getAllProducts = async (req, res, next) => {
    try {
        const products = await productService.list();
        res.status(200).render('datos', { user: req.session.email, role: req.session.role, products});
    } catch (error) {
        next(error);
    }
};

export const adminRender = (req, res, next) => {
    try {
        res.render('admin');
    } catch (error) {
        next(error);
    }
};

export const createProduct = async (req, res, next) => {
    try {
        const result = await productService.create(req.body);
        res.status(201).json({ status: "success", payload: result });
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        const pid = req.params.pid;
        const result = await productService.update(pid, req.body);
        res.status(200).json({ status: "success", payload: result });
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const pid = req.params.pid;
        const result = await productService.delete(pid);
        res.status(200).json({ status: "success", payload: result });
    } catch (error) {
        next(error);
    }
};