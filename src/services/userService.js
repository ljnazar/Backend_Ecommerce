import UserMongooseDao from '../daos/userMongooseDao.js'

export default class UserService {

    constructor() {
        this.userMongooseDao = new UserMongooseDao();
    }

    async create(newUser) {
        const userDocument = await this.userMongooseDao.create(newUser);
        return userDocument;
    }

    async getUserById(id) {
        const idFound = await this.userMongooseDao.getUserById(id);
        return idFound
    }

    async getUserByUsername(username) {
        const userFound = await this.userMongooseDao.getUserByUsername(username);
        return userFound
    }

    async updatePassword(username, newPassword) {
        const userUpdate = this.userMongooseDao.updatePassword(username, newPassword);
        return userUpdate
    }

    async updateTimestamp(username, newTimestamp) {
        const userUpdate = this.userMongooseDao.updateTimestamp(username, newTimestamp);
        return userUpdate
    }

}
