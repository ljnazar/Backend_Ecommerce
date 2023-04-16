import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true },
    age: Number,
    role: {type: String, default: 'user'},
    password: String
});

const userModel = mongoose.model('usuarios', userSchema);

export default userModel;