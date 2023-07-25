import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const userSchema = new Schema({
    first_name: { type: Schema.Types.String, require: true },
    last_name: { type: Schema.Types.String, require: true },
    email: { type: Schema.Types.String, require: true, unique: true },
    role: { type: Schema.Types.String, default: 'user'},
    password: { type: Schema.Types.String, require: true },
    cartId: { type: Schema.Types.ObjectId },
    lastLogin: { type: Schema.Types.Date }
});

userSchema.plugin(mongoosePaginate);

export const userModel = mongoose.model('users', userSchema);
