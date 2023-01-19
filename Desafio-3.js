const express = require('express');
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
        try{
            const dataFile = await this.getProducts();
            const isFound = dataFile.find(product => product.id == id);
            if(isFound){
                newProduct.id = id;
                dataFile[dataFile.findIndex(element => element.id == id)] = newProduct;
                await this.saveFile(this.pathToFile, dataFile);
            }else{
                console.log("Update operation: Not found");
            }
        }
        catch(error){
            console.log(`Error ${error}`);
        }
    }
    async deleteProduct(id){
        try {
            const dataFile = await this.getProducts();
            const isFound = dataFile.find(product => product.id == id);
            if(isFound){
                const filterData = dataFile.filter(product => product.id !== id) || null;
                await this.saveFile(this.pathToFile, filterData);
            }
            else{
                console.log("Delete operation: Not found");
            }
        }
        catch(error){
            console.log(`Error ${error}`);
        }
    }
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res) => {
    const instanceManager = new ProductManager('./products.json');
    const viewProducts = await instanceManager.getProducts();
    if(viewProducts){
        const { limit } = req.query;
        limit ? res.status(200).send(viewProducts.filter(element => element.id <= limit)) : res.status(200).send(viewProducts);
    }
    else{
        res.status(404).send('Not Found');
    }
});

app.get('/products/:pid', async (req, res) => {
    const instanceManager = new ProductManager('./products.json');
    const viewProducts = await instanceManager.getProducts();
    const { pid } = req.params;
    idFound = viewProducts.find(element => element.id == pid);
    idFound ? res.status(200).send(idFound) : res.status(404).send('Not Found');
});

const server = app.listen(8080, ()=> console.log('Server running on port 8080'));
server.on('error', error => console.log(error));