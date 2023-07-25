import AdminUserService from '../services/adminUserService.js';
import { sendEmail } from '../utils/sendEmail.js';

const adminUserService = new AdminUserService();

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
        const result = await adminUserService.update(id, req.body);
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
        // Recorrer lista ids y enviar emails a cada usuario
        const result = await adminUserService.deleteMany(ids);
        res.status(200).json({ status: "success", payload: result });
    } catch (error) {
        next(error);
    }
};