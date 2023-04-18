// import { createHash } from '../utils/bcrypt.js';
// import { generateToken} from '../utils/jwt.js';
// import UserService from '../services/userService.js';
import ProductsMongooseDao from '../daos/productsMongooseDao.js'

// DATOS

export const getAllProducts = async (req, res) => {

    const productsMongooseDao = new ProductsMongooseDao();
    const products = await productsMongooseDao.list();

    res.render('datos', { user: req.user.email, role: req.user.role, products});

};