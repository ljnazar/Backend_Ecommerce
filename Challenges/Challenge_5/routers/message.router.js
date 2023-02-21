const { Router } = require('express');
const messageModel = require('../models/message.model');

const messageRouter = Router();

messageRouter.get('/', async (req, res) => {
    try{
        let messages = await messageModel.find();
        //io.sockets.emit('viewProducts', messages);
        res.render('chat', { data: messages });
        //res.send({ status: "success", payload: messages });
    }
    catch(error){
        console.log(`Cannot get messages with mongoose ${error}`);
    }
});

// messageRouter.post('/', async (req, res) => {
//     let { user, message } = req.body;
//     if(!user || !message) return res.send({ status: "Error", error: "Incomplete values"});
//     try{
//         let result = await messageModel.create({
//             user,
//             message
//         });
//         res.send({ status: "success", payload: result });
//     }
//     catch(error){
//         console.log(`Cannot send message to mongoose ${error}`);
//     }
// });

module.exports = messageRouter;


