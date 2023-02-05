const { Router } = require('express');
const cartsRouter = Router();
const { ProductManager } = require('../ProductManager');

cartsRouter.post('/', async (req, res) => {
    const data = req.body;
    const instanceManager = new ProductManager('./src/carts.json');
    const flagFound = await instanceManager.addCart(data);
    flagFound ? res.status(200).send('Product added successfully') : res.status(400).send('Error in uploaded data');
});

cartsRouter.get('/:cid', async (req, res) => {
    const instanceManager = new ProductManager('./src/carts.json');
    const viewCart = await instanceManager.getData();
    const { cid } = req.params;
    const idFound = viewCart.find(element => element.id == cid);
    idFound ? res.status(200).send(idFound) : res.status(404).send('Not Found');
});

// Example of format to send data body -> {"product":10,"quantity":1}
cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    let productsCart = req.body;
    let { cid } = req.params;
    cid = parseInt(cid);
    let { pid } = req.params;
    pid = parseInt(pid);
    const instanceManager = new ProductManager('./src/carts.json');
    const viewCart = await instanceManager.getData();
    const cartFound = viewCart.find(element => element.id == cid);
    if(cartFound){
        const productFound = cartFound.products.find(element => element.product == pid);
        let newProductCart = [];
        if(productFound){
            let newQuantity = productsCart.quantity + productFound.quantity
            newProductCart.push( ...cartFound.products );
            newProductCart.map(element => {
                if(element.product == productsCart.product){
                    element.quantity = newQuantity;
                }
            });
        }
        else{
            newProductCart.push( ...cartFound.products );
            newProductCart.push( productsCart );
        }
        const flagFound = await instanceManager.updateProduct(cid, { "products": newProductCart });
        flagFound ? res.status(200).send('Product added/modified successfully') : res.status(404).send('Not Found');
    }
    else{
        res.status(404).send('Not Found');
    }
});

module.exports = cartsRouter;