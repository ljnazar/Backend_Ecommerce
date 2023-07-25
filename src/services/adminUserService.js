import AdminUsersMongooseDao from '../daos/adminUsersMongooseDao.js';

export default class AdminUserService {

    constructor() {
        this.adminUsersMongooseDao = new AdminUsersMongooseDao();
    }

    async list(filters) {
        const usersDocument = await this.adminUsersMongooseDao.list(filters);
        return usersDocument;
    }

    async update(id, newRole) {
        const userUpdate = await this.adminUsersMongooseDao.update(id, newRole);
        return userUpdate;
    }

    async deleteOne(id) {
        const deleteOneUser = await this.adminUsersMongooseDao.deleteOne(id);
        return deleteOneUser;
    }

    async deleteMany(ids) {
        const deleteManyUser = await this.adminUsersMongooseDao.deleteMany(ids);
        return deleteManyUser;
    }

}