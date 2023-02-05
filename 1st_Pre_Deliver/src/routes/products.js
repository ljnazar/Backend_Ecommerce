const { Router } = require('express');
const productsRouter = Router();
const { ProductManager } = require('../ProductManager');

productsRouter.get('/', async (req, res) => {
    const instanceManager = new ProductManager('./src/products.json');
    const viewProducts = await instanceManager.getData();
    if(viewProducts){
        const { limit } = req.query;
        limit ? res.status(200).send(viewProducts.filter(element => element.id <= limit)) : res.status(200).send(viewProducts);
    }
    else{
        res.status(404).send('Not Found');
    }
});

productsRouter.get('/:pid', async (req, res) => {
    const instanceManager = new ProductManager('./src/products.json');
    const viewProducts = await instanceManager.getData();
    const { pid } = req.params;
    const idFound = viewProducts.find(element => element.id == pid);
    idFound ? res.status(200).send(idFound) : res.status(404).send('Not Found');
});

productsRouter.post('/', async (req, res) => {
    const data = req.body;
    const instanceManager = new ProductManager('./src/products.json');
    const flagValidator = await instanceManager.addProduct(data.title, data.description, data.code, data.price, data.status, data.stock, data.category, data.thumbnail);
    flagValidator ? res.status(200).send('Product added successfully') : res.status(400).send('Error in uploaded data');
});

productsRouter.put('/:pid', async (req, res) => {
    let { pid } = req.params;
    pid = parseInt(pid);
    const data = req.body;
    const instanceManager = new ProductManager('./src/products.json');
    const flagFound = await instanceManager.updateProduct(pid, data);
    flagFound ? res.status(200).send('Product modified successfully') : res.status(404).send('Not Found');
});

productsRouter.delete('/:pid', async (req, res) => {
    const { pid } = req.params;
    const instanceManager = new ProductManager('./src/products.json');
    const flagFound = await instanceManager.deleteProduct(pid);
    flagFound ? res.status(200).send('Product deleted successfully') : res.status(404).send('Not Found');
});

module.exports = productsRouter;