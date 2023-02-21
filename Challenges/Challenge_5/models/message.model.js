const mongosse = require('mongoose');

const messageCollection = 'messages';

const messageSchema = new mongosse.Schema({
    user: String,
    message: String
}, {versionKey: false});

const messageModel = mongosse.model(messageCollection, messageSchema);

module.exports =  messageModel;