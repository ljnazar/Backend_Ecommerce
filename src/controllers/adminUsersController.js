import AdminUserService from '../services/adminUserService.js';
import UserService from '../services/userService.js';
import { sendEmail } from '../utils/sendEmail.js';

const adminUserService = new AdminUserService();
const userService = new UserService();

export const getUsers = async (req, res, next) => {
    try {
        const result = await adminUserService.list(req.query);
        res.status(200).render('admin-users', { users: result.payload });
    } catch (error) {
        next(error);
    }
};

export const updateRole = async (req, res, next) => {
    try {
        const id = req.params.id;
        const newRole = req.body.role;
        const result = await adminUserService.update(id, newRole);
        res.status(200).json({ status: "success", payload: result });
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await adminUserService.deleteOne(id);
        res.status(200).json({ status: "success", payload: result });
    } catch (error) {
        next(error);
    }
};

export const cleanupInactiveUsers = async (req, res, next) => {
    try {
        const ids = req.params.ids;

        const hasPassedTwoDays = (timestamp) => {
            const timestampDate = new Date(timestamp);
            const currentDate = new Date();
            const timeDifferenceInMilliseconds = currentDate - timestampDate;
            const twoDaysInMilliseconds = 2 * 24 * 60 * 60 * 1000;
            return timeDifferenceInMilliseconds >= twoDaysInMilliseconds;
        }

        let usersToRemove = [];

        for (let index = 0; index < ids.length; index++) {
            let id = ids[index];
            let user = userService.getUserById(id);
            let lastLogin = user.lastLogin;
            const hasPassed = hasPassedTwoDays(lastLogin);
            if(hasPassed){
                usersToRemove.push(id);
                let content = `
                <div>
                    <h4>
                        Se eliminó el usuario ${user.email} por inactividad.
                    </h4>
                </div>`
                await sendEmail(user.email, 'Usuario eliminado', content);
            }
        }

        const result = await adminUserService.deleteMany(usersToRemove);
        res.status(200).json({ status: "success", payload: result });
        
    } catch (error) {
        next(error);
    }
};