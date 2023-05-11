import CustomError from '../utils/customError.js';
import { errorDictionary } from '../utils/errorDictionary.js';

export const isAdmin = async (req, res, next) => {
  try{
    if (req.session?.role === "admin") next();
    CustomError.createError({
      name: 'Authorization Error',
      cause: 'Requires administrator user',
      message: 'Error trying to access',
      code: errorDictionary.AUTHORIZATION_ERROR
    });
  }catch(error){
    next(error);
  }
    // //res.status(401).json({ error: 'Not authenticated' });
    // //throw new Error('Not authorized');
}
