const mongoose = require('mongoose');

const messageCollection = 'messages';

const messageSchema = new mongoose.Schema({
    user: String,
    message: String
}, {versionKey: false});

const messageModel = mongoose.model(messageCollection, messageSchema);

module.exports = messageModel;