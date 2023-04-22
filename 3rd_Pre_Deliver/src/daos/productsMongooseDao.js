import productModel from "../models/productSchema.js";

class ProductsMongooseDao {

    async list() {
        const productsFound = await productModel.find({ category: "notebooks" }).lean();
        return productsFound;
    }

    async create(product) {
        const result = await this.productModel.create(product);
        return result;
    }

    async update(pid, product) {
        try {
            const result = await this.productModel.updateOne({ _id: pid }, product);
            return result;
        } catch (error) {
            console.log(error);
        }
    }
    
    async delete(pid) {
        try {
            const result = await this.productModel.deleteOne({ _id: pid });
            return result;
        } catch (error) {
            console.log(error);
        }
    }
    
}

export default ProductsMongooseDao;