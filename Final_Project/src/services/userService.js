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

    async updateUser(username, newPassword) {
        const userUpdate = this.userMongooseDao.updateUser(username, newPassword);
        return userUpdate
    }

}
