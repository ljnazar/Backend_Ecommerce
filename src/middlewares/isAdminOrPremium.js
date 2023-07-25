import CustomError from '../utils/customError.js';
import { errorDictionary } from '../utils/errorDictionary.js';

export const isAdminOrPremium = async (req, res, next) => {
  try{
    if (req.session?.role === 'admin' || req.session?.role === 'premium') return next();
    CustomError.createError({
      name: 'Authorization Error',
      cause: 'Se requiere usuario administrador o premium',
      message: 'Error trying to access',
      code: errorDictionary.AUTHORIZATION_ERROR
    });
  }catch(error){
    next(error);
  }

}
