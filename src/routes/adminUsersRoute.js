import { Router } from 'express';
import { authToken } from '../utils/jwt.js';
import {
    getUsers,
    updateRole,
    deleteUser,
    cleanupInactiveUsers
} from '../controllers/adminUsersController.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const adminUsersRoute = Router();

adminUsersRoute.get('/', authToken, isAdmin, getUsers);
adminUsersRoute.put('/:id', authToken, isAdmin, updateRole);
adminUsersRoute.delete('/:id', authToken, isAdmin, deleteUser);
adminUsersRoute.delete('/:id', authToken, isAdmin, cleanupInactiveUsers);

export default adminUsersRoute;