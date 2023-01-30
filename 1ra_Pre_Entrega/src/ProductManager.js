const fs = require('fs');

class ProductManager{
    pathToFile;
    constructor(pathToFile){
        this.pathToFile = pathToFile;
    }
    async addProduct(title, description, code, price, status=true, stock, category, thumbnail){
        let flagValidator;
        try{
            const dataFile = await this.getProducts();
            if(title && description && code && price && stock && category && this.validateCode(code)){
                flagValidator = true;
                const product = {
                    id : await this.getNewId(),
                    title,
                    description,
                    code,
                    price,
                    status,
                    stock,
                    category,
                    thumbnail,
                }
                dataFile.push(product);
                await this.saveFile(this.pathToFile, dataFile);
                console.log(`Product with id ${product.id} added`);
            }else{
                flagValidator = false;
                console.log("ERROR: Require validate fields");
            }
        }
        catch(error){
            console.log(`Error ${error}`);
        }
        finally{
            return flagValidator;
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
            let idMax = 0;
            const dataFile = await this.getProducts();
            dataFile.forEach(product => {
                if (product.id > idMax) {
                    idMax = product.id;
                }
            });
            return idMax + 1;
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
    async updateProduct(id, newProduct){
        let flagFound;
        try{
            const dataFile = await this.getProducts();
            const isFound = dataFile.find(product => product.id == id);
            if(isFound){
                flagFound = true;
                const newObj = { "id":id, ...newProduct }
                //newProduct.id = id;
                dataFile[dataFile.findIndex(element => element.id == id)] = newObj;
                await this.saveFile(this.pathToFile, dataFile);
            }else{
                flagFound = false;
                console.log("Update operation: Not found");
            }
        }
        catch(error){
            console.log(`Error ${error}`);
        }
        finally{
            return flagFound;
        }
    }
    async deleteProduct(id){
        let flagFound;
        try {
            const dataFile = await this.getProducts();
            const isFound = dataFile.find(product => product.id == id);
            if(isFound){
                flagFound = true;
                const filterData = dataFile.filter(product => product.id != id) || null;
                await this.saveFile(this.pathToFile, filterData);
            }
            else{
                flagFound = false;
                console.log("Delete operation: Not found");
            }
        }
        catch(error){
            console.log(`Error ${error}`);
        }
        finally{
            return flagFound;
        }
    }
}

module.exports = { ProductManager };