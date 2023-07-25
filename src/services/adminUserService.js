import AdminUsersMongooseDao from '../daos/adminUsersMongooseDao.js';

export default class AdminUserService {

    constructor() {
        this.adminUsersMongooseDao = new AdminUsersMongooseDao();
    }

    async list(filters) {
        const usersDocument = await this.adminUsersMongooseDao.list(filters);
        return usersDocument;
    }

    async update(pid, product) {
        const userUpdate = await this.adminUsersMongooseDao.update(pid, product);
        return userUpdate;
    }

    async deleteOne(pid) {
        const deleteOneUser = await this.adminUsersMongooseDao.delete(pid);
        return deleteOneUser;
    }

    async deleteMany(pid) {
        const deleteManyUser = await this.adminUsersMongooseDao.delete(pid);
        return deleteManyUser;
    }

}