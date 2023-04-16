import productModel from "../models/productSchema.js";

class ProductsMongooseDao {

    async list() {

        const productsFound = await productModel.find({category: "notebooks"}).lean();

        return productsFound;

    }
}

export default ProductsMongooseDao;