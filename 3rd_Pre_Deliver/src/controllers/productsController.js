//import ProductsMongooseDao from '../daos/productsMongooseDao.js'
import ProductService from '../services/productService.js';

export const getAllProducts = async (req, res) => {
    const productService = new ProductService();
    try {
        const products = await productService.list();
        //res.render('datos', { user: req.user.email, role: req.user.role, products});
        res.render('datos', { user: 'asd', role: 'asd', products});
    } catch (error) {
        res.status(400).send({ status: "error", payload: error.message });
    }
};

export const createProduct = async (req, res) => {
    const productService = new ProductService();
    try {
        const result = await productService.create(req.body);
        res.status(201).send({ status: "success", payload: result });
    } catch (error) {
        res.status(400).send({ status: "error", payload: error.message });
    }
};

export const updateProduct = async (req, res) => {
    const productService = new ProductService();
    try {
        const result = await productService.update(req.params, req.body);
        res.status(200).send({ status: "success", payload: result });
    } catch (error) {
        res.status(400).send({ status: "error", payload: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    const productService = new ProductService();
    try {
        const result = await productService.delete(req.params);
        res.status(200).json({ status: "success", payload: result });
    } catch (error) {
        res.status(400).send({ status: "error", payload: error.message });
    }
};