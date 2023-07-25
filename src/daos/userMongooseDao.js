import { userModel } from "../models/userSchema.js";

export default class UserMongooseDao {

    async create(newUser) {
        const userDocument = await userModel.create(newUser);
        return userDocument;
    }

    async getUserById(id) {
        const idFound = await userModel.findOne({ _id: id }).lean();
        return idFound;
    }

    async getUserByUsername(username) {
        const userFound = await userModel.findOne({ email: username }).lean();
        return userFound;
    }

    async updatePassword(username, newPassword) {
        const userUpdate = userModel.updateOne({ email: username }, { $set: { password: newPassword }});
        return userUpdate;
    }

    async updateTimestamp(username, newTimestamp) {
        const userUpdate = userModel.updateOne({ email: username }, { $set: { lastLogin: newTimestamp }});
        return userUpdate;
    }

}
