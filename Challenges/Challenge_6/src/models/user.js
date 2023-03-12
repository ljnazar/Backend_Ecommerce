const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true },
    age: Number,
    role: {type: String, default: 'user'},
    password: String
});

const usuarioModel = mongoose.model('usuarios', usuarioSchema);

module.exports = usuarioModel;