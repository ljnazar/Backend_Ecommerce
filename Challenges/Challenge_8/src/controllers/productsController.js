import ProductsMongooseDao from '../daos/productsMongooseDao.js'

// DATOS

export const getAllProducts = async (req, res) => {

    const productsMongooseDao = new ProductsMongooseDao();
    const products = await productsMongooseDao.list();

    //res.render('datos', { user: req.user.email, role: req.user.role, products});
    res.render('datos', {products});

};