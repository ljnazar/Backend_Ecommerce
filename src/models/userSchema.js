import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    first_name: { type: Schema.Types.String, require: true },
    last_name: { type: Schema.Types.String, require: true },
    email: { type: Schema.Types.String, require: true, unique: true },
    role: { type: Schema.Types.String, default: 'user'},
    password: { type: Schema.Types.String, require: true },
    cartId: { type: Schema.Types.ObjectId },
    lastLogin: { type: Schema.Types.Date }
});

export const userModel = mongoose.model('users', userSchema);
