class ProductManager{

    products;

    constructor(){
        this.products = [];
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

    getData(){
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
}

const instanceManager = new ProductManager();

const viewProducts = instanceManager.getData();

console.log(viewProducts);

instanceManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);

const viewProducts2 = instanceManager.getData();

console.log(viewProducts2);

instanceManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);

const findProduct = instanceManager.getProductById(3);

console.log(findProduct);

const findProduct2 = instanceManager.getProductById(1);

console.log(findProduct2);


