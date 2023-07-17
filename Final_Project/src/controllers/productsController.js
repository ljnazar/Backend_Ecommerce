import ProductService from '../services/productService.js';

const productService = new ProductService();

export const getProducts = async (req, res, next) => {
    try {
        const result = await productService.list(req.query);
        let isAdmin = false;
        if(req.session.role === 'admin') isAdmin = true;
        res.status(200).render('home', { user: req.session.email, isAdmin: isAdmin, products: result.payload });
    } catch (error) {
        next(error);
    }
};

export const adminRender = (req, res, next) => {
    try {
        res.status(200).render('admin');
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