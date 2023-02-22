const { Router } = require('express');
const messageModel = require('../models/message.model');

const messageRouter = Router();

messageRouter.get('/', async (req, res) => {
    try{
        let messages = await messageModel.find();
        res.render('chat', { data: messages });
    }
    catch(error){
        console.log(`Cannot get messages with mongoose ${error}`);
    }
});

module.exports = messageRouter;


