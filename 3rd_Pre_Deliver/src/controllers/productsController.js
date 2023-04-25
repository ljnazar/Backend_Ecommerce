import ProductService from '../services/productService.js';

const productService = new ProductService();

export const getAllProducts = async (req, res) => {
    try {
        const products = await productService.list();
        res.render('datos', { user: req.session.email, role: req.session.role, products});
    } catch (error) {
        res.status(400).send({ status: "error", payload: error.message });
    }
};

export const adminRender = (req, res) => {
    try {
        res.render('admin');
    } catch (error) {
        res.status(400).send({ status: "error", payload: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const result = await productService.create(req.body);
        res.status(201).send({ status: "success", payload: result });
    } catch (error) {
        res.status(400).send({ status: "error", payload: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const pid = req.params.pid;
        const result = await productService.update(pid, req.body);
        res.status(200).send({ status: "success", payload: result });
    } catch (error) {
        res.status(400).send({ status: "error", payload: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const pid = req.params.pid;
        const result = await productService.delete(pid);
        res.status(200).send({ status: "success", payload: result });
    } catch (error) {
        res.status(400).send({ status: "error", payload: error.message });
    }
};