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

    /////////////////////////////////

    async updateProduct(id, newProduct){
        //console.log(`TEST ${newProduct}`);
        try{
            const dataFile = await this.getProducts();
            const isFound = dataFile.find(product => product.id == id);
            //console.log(`TEST ${isFound}`);
            if(isFound){
                const index = dataFile.findIndex(productId => productId.id === id);
                //console.log(`TEST ${index}`);
                newProduct.id = id;
                dataFile.splice(index, 1, newProduct);
                //console.log(`TEST ${asd}`);
                await this.saveFile(this.pathToFile, dataFile);
            }else{
                "Not found";
            }
        }
        catch(error){
            console.log(`Error ${error}`);
        }


    }

    async deleteProduct(id){
        try {
            const dataFile = await this.getProducts();
            const filterData = dataFile.filter(product => product.id !== id) || null;
            await this.saveFile(this.pathToFile, filterData);
        }
        catch(error){
            console.log(`Error ${error}`);
        }
    }

    
}




(
    async () => {

        const instanceManager = new ProductManager('./products.txt');

        const viewProducts = await instanceManager.getProducts();
        console.log(viewProducts);

        instanceManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);

        const findProduct = await instanceManager.getProductById(1);
        console.log(findProduct);

        instanceManager.updateProduct(3,{"id":3,"title":"producto prueba 3","description":"Este es un producto prueba","price":500,"thumbnail":"Sin imagen","code":"abc123","stock":80});

        instanceManager.deleteProduct(4);
        
    }
)()
