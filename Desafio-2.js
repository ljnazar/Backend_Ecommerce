const fs = require('fs');

class ProductManager{

    pathToFile;

    constructor(pathToFile){
        this.pathToFile = pathToFile;
    }

    async addProduct(title, description, price, thumbnail, code, stock){
        try{
            const dataFile = await this.getProducts();
            if(title && description && price && thumbnail && code && stock && this.validateCode(code)){
                const product = {
                    id : await this.getNewId(),
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock
                }
                dataFile.push(product);
                await this.saveFile(this.pathToFile, dataFile);
                console.log(`Product with id ${product.id} added`);
            }else{
                console.log("ERROR: Require validate fields");
            }
        }
        catch(error){
            console.log(`Error ${error}`);
        }
    }

    async getProducts(){
        try{
            const content = await fs.promises.readFile(this.pathToFile, 'utf-8');
            const contentObject = JSON.parse(content);
            return contentObject;
        }
        catch(error){
            console.log(`Error ${error}`);
        }
    }

    async saveFile(path, newContent){
        try{
            const newContentString = JSON.stringify(newContent);
            await fs.promises.writeFile(path, newContentString);
        }
        catch(error){
            console.log(`Error ${error}`);
        }
    }
    
    async getNewId(){
        try{
            const dataFile = await this.getProducts();
            return dataFile.length + 1;
        }
        catch(error){
            console.log(`Error ${error}`);
        }
    }

    async validateCode(code){
        try{
            const dataFile = await this.getProducts();
            const result = dataFile.find(product => product.code == code);
            return result ? false : true;
        }
        catch(error){
            console.log(`Error ${error}`);
        }
    }

    async getProductById(id){
        console.log(`Search product with id: ${id}`);
        try{
            const dataFile = await this.getProducts();
            const isFound = dataFile.find(product => product.id == id);
            return isFound ? dataFile[id-1] : "Not found";
        }
        catch(error){
            console.log(`Error ${error}`);
        }
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




// const readFile = async() => {
//     try{
//         const content = await fs.promises.readFile(PATH+'products.txt', 'utf-8');
//         const contentObject = JSON.parse(content);
//         return contentObject;
//     }
//     catch(error){
//         console.log(`Error ${error}`);
//     }
// }

// const writeFile = async(newContent) => {
//     try{
//         const newContentString = JSON.stringify(newContent);
//         await fs.promises.writeFile(PATH+'products.txt', newContentString);
//     }
//     catch(error){
//         console.log(`Error ${error}`);
//     }
// }

(
    async () => {
        //console.log(await products)
        //const products = readFile();
        //const instanceManager = new ProductManager(await products);

        const instanceManager = new ProductManager('./products.txt');

        const viewProducts = await instanceManager.getProducts();
        console.log(viewProducts);

        instanceManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
        
        //const viewProducts2 = await instanceManager.getProducts();
        //console.log(viewProducts2);

        const findProduct = await instanceManager.getProductById(1);
        console.log(findProduct);

        // instanceManager.deleteProduct(1);

        // const viewProducts2 = instanceManager.getProducts();
        // console.log(viewProducts2);

        // writeFile(viewProducts2);

        //const viewProducts3 = instanceManager.getProducts();
        //console.log(viewProducts3);

        //const viewProductsModify = instanceManager.getProducts();

        //writeFile(viewProductsModify);
    }
)()
