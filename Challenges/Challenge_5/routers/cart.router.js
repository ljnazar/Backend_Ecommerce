const { Router } = require('express');
const cartModel = require('../models/cart.model');

const cartRouter = Router();

cartRouter.get('/', async (req, res) => {
    try{
        let carts = await cartModel.find();
        res.render('carts', { data: carts });
    }
    catch(error){
        console.log(`Cannot get carts with mongoose ${error}`);
    }
});

cartRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    try{
        let cart = await cartModel.find({_id: id});
        res.render('carts', { data: cart });
    }
    catch(error){
        console.log(`Cannot get cart with mongoose ${error}`);
    }
});

cartRouter.post('/', async (req, res) => {
    const data = req.body;
    let {product, quantity} = data;
    if(!product || !quantity) return res.send({ status: "Error", error: "Incomplete values"});
    try{
        await cartModel.create({
            product,
            quantity,
        });
    }
    catch(error){
        console.log(`Cannot send cart to mongoose ${error}`);
    }
});

cartRouter.put('/:id', async (req, res) => {
    let { id } = req.params;
    const data = req.body;
    let {product, quantity} = data;
    if(!product || !quantity) return res.send({ status: "Error", error: "Incomplete values"});
    await cartModel.updateOne({_id: id}, data);
});

cartRouter.delete('/:id', async (req, res) => {
    let { id } = req.params;
    await cartModel.deleteOne({_id: id});
});

module.exports = cartRouter;


