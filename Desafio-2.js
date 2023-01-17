const fs = require('fs');

class ProductManager{

    products;

    constructor(file){
        this.products = file;
    }

    addProduct(title, description, price, thumbnail, code, stock){
        if(title && description && price && thumbnail && code && stock && this.validateCode(code)){
            const product = {
                id : this.getNewId(),
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }
            this.products.push(product);
            console.log(`Product with id ${product.id} added`);
        }else{
            console.log("ERROR: Require validate fields");
        }
    }

    getProducts(){
        return this.products;
    }
    
    getNewId(){
        return this.products.length + 1;
    }

    validateCode(code){
        const result = this.products.find(product => product.code == code);
        return result ? false : true;
    }

    getProductById(id){
        console.log(`Search product with id: ${id}`);
        // Method 1
        //return this.products.id = id ? this.products[id-1] : "Not found";
        // Method 2
        const isFound = this.products.find(product => product.id == id);
        return isFound ? this.products[id-1] : "Not found";
    }

    updateProduct(id, newValue){
        const isFound = this.products.find(product => product.id == id);
        if(isFound){
            "change value";
        }else{
            "Not found"
        }

    }

    deleteProduct(id){
        this.products = this.products.filter(product => product.id !== id) || "Not found";
    }

    
}



const PATH = './';



const readFile = async() => {
    try{
        const content = await fs.promises.readFile(PATH+'products.txt', 'utf-8');
        const contentObject = JSON.parse(content);
        return contentObject;
    }
    catch(error){
        console.log(`Error ${error}`);
    }
}

const writeFile = async(newContent) => {
    try{
        const newContentString = JSON.stringify(newContent);
        await fs.promises.writeFile(PATH+'products.txt', newContentString);
    }
    catch(error){
        console.log(`Error ${error}`);
    }
}

(
    async () => {
        //console.log(await products)
        const products = readFile();
        const instanceManager = new ProductManager(await products);

        const viewProducts = instanceManager.getProducts();
        console.log(viewProducts);

        // instanceManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
        // const viewProducts2 = instanceManager.getProducts();
        // console.log(viewProducts2);

        // const findProduct = instanceManager.getProductById(1);
        // console.log(findProduct);

        ProductsModify = instanceManager.deleteProduct(1);
        writeFile(ProductsModify);

        const viewProducts3 = instanceManager.getProducts();
        console.log(viewProducts3);

        //const viewProductsModify = instanceManager.getProducts();

        //writeFile(viewProductsModify);
    }
)()
