import ProductService from '../services/productService.js';
import { sendEmail } from '../utils/sendEmail.js';

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

export const getOneProduct = async (req, res, next) => {
    try {
        const pid = req.params.pid;
        const result = await productService.getOne(pid);
        res.status(200).json({ status: "success", payload: result });
    } catch (error) {
        next(error);
    }
};

export const createProductRender = (req, res, next) => {
    try {
        res.status(200).render('create-product');
    } catch (error) {
        next(error);
    }
};

export const createProduct = async (req, res, next) => {
    try {
        let data = req.body;
        data.creator = req.session.email; 
        data.premium = false;
        if(req.session.role === 'premium') data.premium = true;
        const result = await productService.create(data);
        res.status(200).json({ status: "success", payload: result });
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
        const product = await productService.getOne(pid);
        let contentEmail = `
        <div>
            <h4>
                Se eliminó el siguiente producto premium: ${product.title}
            </h4>
        </div>`;
        if(product.premium) sendEmail(product.creator, 'Aviso - Borrado de producto premium', contentEmail);
        const result = await productService.delete(pid);
        res.status(200).json({ status: "success", payload: result });
    } catch (error) {
        next(error);
    }
};